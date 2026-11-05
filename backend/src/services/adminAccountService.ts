import { supabaseAdmin } from '../config/supabase.js';
import { env, isDev } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../utils/apiError.js';
import { EmailService } from './emailService.js';
import { AuditService } from './auditService.js';

export const FIRM_ADMIN_EMAIL = 'justicealliencelaw@gmail.com';
export const PRIMARY_ADMIN_EMAIL = 'advshiv43@gmail.com';
export const TEMPORARY_ADMIN_EMAIL = 'spandey5368@gmail.com';
const DEFAULT_SEED_PASSWORD = 'Shiv@1234';

export class AdminAccountService {
  /**
   * Initializes permanent firm, advocate and temporary development accounts in Supabase Auth and admin_profiles
   */
  static async seedDefaultAdmins(): Promise<void> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return;
    }

    try {
      const { data: usersData, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
      if (listErr || !usersData) {
        logger.warn({ listErr }, 'Could not list Supabase auth users during startup seed');
        return;
      }

      // 1. Ensure justicealliencelaw@gmail.com exists (Firm Administrator)
      let firmAdmin = usersData.users.find((u) => u.email?.toLowerCase() === FIRM_ADMIN_EMAIL);
      if (!firmAdmin) {
        const { data: createdFirm, error: firmErr } = await supabaseAdmin.auth.admin.createUser({
          email: FIRM_ADMIN_EMAIL,
          password: DEFAULT_SEED_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: 'JUSTICE ALLIANCE Associates & Law Firm' },
        });

        if (!firmErr && createdFirm?.user) {
          firmAdmin = createdFirm.user;
          logger.info(`[Auth-Seed] Initialized firm administration account: ${FIRM_ADMIN_EMAIL}`);
        }
      } else {
        // Ensure password is set to Shiv@1234
        await supabaseAdmin.auth.admin.updateUserById(firmAdmin.id, {
          password: DEFAULT_SEED_PASSWORD,
        }).catch(() => {});
      }

      if (firmAdmin) {
        await supabaseAdmin.from('admin_profiles').upsert(
          {
            user_id: firmAdmin.id,
            display_name: 'JUSTICE ALLIANCE Associates & Law Firm',
            role: 'super_admin',
          },
          { onConflict: 'user_id' }
        );
      }

      // 2. Ensure advshiv43@gmail.com exists
      let advshiv = usersData.users.find((u) => u.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL);
      if (!advshiv) {
        const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
          email: PRIMARY_ADMIN_EMAIL,
          password: DEFAULT_SEED_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: 'JUSTICE ALLIANCE Associates & Law Firm' },
        });

        if (!createErr && created?.user) {
          advshiv = created.user;
          logger.info(`[Auth-Seed] Initialized primary chamber account: ${PRIMARY_ADMIN_EMAIL}`);
        }
      } else {
        await supabaseAdmin.auth.admin.updateUserById(advshiv.id, {
          password: DEFAULT_SEED_PASSWORD,
        }).catch(() => {});
      }

      if (advshiv) {
        await supabaseAdmin.from('admin_profiles').upsert(
          {
            user_id: advshiv.id,
            display_name: 'JUSTICE ALLIANCE Associates & Law Firm',
            role: 'super_admin',
          },
          { onConflict: 'user_id' }
        );
      }

      // 2. Ensure spandey5368@gmail.com exists (temporary development account)
      let spandey = usersData.users.find((u) => u.email?.toLowerCase() === TEMPORARY_ADMIN_EMAIL);
      if (!spandey) {
        const { data: createdDev, error: devErr } = await supabaseAdmin.auth.admin.createUser({
          email: TEMPORARY_ADMIN_EMAIL,
          password: DEFAULT_SEED_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: 'Developer Admin (Temporary)' },
        });

        if (!devErr && createdDev?.user) {
          spandey = createdDev.user;
          logger.info(`[Auth-Seed] Initialized temporary developer account: ${TEMPORARY_ADMIN_EMAIL}`);
        }
      }

      if (spandey) {
        await supabaseAdmin.from('admin_profiles').upsert(
          {
            user_id: spandey.id,
            display_name: 'Developer Admin (Temporary)',
            role: 'super_admin',
          },
          { onConflict: 'user_id' }
        );
      }
    } catch (err) {
      logger.warn({ err }, 'Error checking admin seeding on boot');
    }
  }

  /**
   * Returns list of chamber administrators with their active emails and roles
   */
  static async listAdmins() {
    const { data: profiles, error: profErr } = await supabaseAdmin
      .from('admin_profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (profErr || !profiles) {
      return [];
    }

    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const userMap = new Map((usersData?.users || []).map((u) => [u.id, u.email]));

    return profiles.map((p) => {
      const email = userMap.get(p.user_id) || 'Unknown';
      const isPrimary = email.toLowerCase() === PRIMARY_ADMIN_EMAIL;
      const isTemporary = email.toLowerCase() === TEMPORARY_ADMIN_EMAIL;

      return {
        id: p.id,
        user_id: p.user_id,
        display_name: p.display_name,
        role: p.role,
        email,
        isPrimary,
        isTemporary,
        created_at: p.created_at,
      };
    });
  }

  /**
   * Updates an administrator's password in Supabase Auth
   */
  static async changePassword(userId: string, newPassword: string): Promise<void> {
    if (newPassword.length < 8) {
      throw ApiError.badRequest('Password must be at least 8 characters long');
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      logger.error({ error }, 'Failed to update administrator password in Supabase Auth');
      throw ApiError.internal('Failed to update password. Please try again.');
    }

    await AuditService.log({
      actorUserId: userId,
      action: 'ADMIN_PASSWORD_CHANGED',
      resourceType: 'auth',
      resourceId: userId,
      details: { timestamp: new Date().toISOString() },
    });
  }

  /**
   * Revokes and permanently deletes a temporary administrator account
   */
  static async revokeAdmin(actorUserId: string, targetEmail: string): Promise<void> {
    const normalized = targetEmail.trim().toLowerCase();

    if (normalized === PRIMARY_ADMIN_EMAIL || normalized === FIRM_ADMIN_EMAIL) {
      throw ApiError.badRequest('Security Policy: Primary firm and advocate administrator accounts cannot be deleted or revoked.');
    }

    // 1. Find user in auth
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const targetUser = usersData?.users.find((u) => u.email?.toLowerCase() === normalized);

    if (!targetUser) {
      throw ApiError.notFound(`User with email '${targetEmail}' not found`);
    }

    // 2. Delete from admin_profiles
    await supabaseAdmin.from('admin_profiles').delete().eq('user_id', targetUser.id);

    // 3. Delete from Supabase Auth
    const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(targetUser.id);
    if (delErr) {
      logger.error({ delErr }, 'Failed to delete user from Supabase Auth');
      throw ApiError.internal('Failed to delete user from authentication service');
    }

    await AuditService.log({
      actorUserId,
      action: 'TEMPORARY_DEVELOPER_ACCESS_REVOKED',
      resourceType: 'admin_profile',
      resourceId: targetUser.id,
      details: { revokedEmail: normalized },
    });

    logger.info({ targetEmail: normalized, byUser: actorUserId }, 'Temporary administrator account revoked successfully');
  }

  /**
   * Generates and dispatches a secure Email OTP for authorized chamber administrators
   */
  static async dispatchOtp(email: string): Promise<{ success: boolean; message: string; devOtp?: string }> {
    const normalized = email.trim().toLowerCase();

    // Verify the email is an active admin in admin_profiles
    const admins = await this.listAdmins();
    const isAdmin = admins.some((a) => a.email.toLowerCase() === normalized);

    if (!isAdmin) {
      logger.warn({ email: normalized }, 'Unauthorized OTP request for non-admin email');
      throw ApiError.forbidden('Access Denied: This email address is not registered as an authorized chamber administrator.');
    }

    // Generate link/OTP using Supabase Admin (bypasses Supabase client rate limits)
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: normalized,
    });

    if (error || !data?.properties?.email_otp) {
      logger.error({ error }, 'Failed to generate OTP via Supabase Admin');
      throw ApiError.internal('Unable to generate verification code. Please try again.');
    }

    const otpCode = data.properties.email_otp;

    // Send via email service
    await EmailService.sendEmail({
      to: [{ email: normalized, name: 'Chamber Administrator' }],
      subject: '[Chamber Security] Your Practice Portal One-Time Verification Passcode',
      htmlContent: `
        <div style="font-family: serif; color: #111C2B; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #C5A35A;">
          <h2 style="color: #111C2B; margin-bottom: 8px;">Advocate Practice Management Portal</h2>
          <p style="color: #C5A35A; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Chamber Security Authentication</p>
          <hr style="border: 0; border-top: 1px solid #E5E1D8; margin: 16px 0;" />
          <p>You have requested a secure One-Time Passcode (OTP) to authenticate into the practice administration dashboard.</p>
          <div style="background-color: #F5F1E8; padding: 18px; text-align: center; margin: 24px 0; border-radius: 4px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111C2B; font-family: monospace;">${otpCode}</span>
          </div>
          <p style="font-size: 13px; color: #666;">This passcode is valid for 10 minutes. If you did not request this login code, please review chamber security immediately.</p>
        </div>
      `,
      textContent: `Your Chamber Portal OTP is: ${otpCode}. Valid for 10 minutes.`,
    });

    logger.info(
      `\n======================================================\n[CHAMBER SECURITY OTP] Login Passcode for ${normalized}: [ ${otpCode} ]\n======================================================\n`
    );

    return {
      success: true,
      message: `A verification passcode has been dispatched to ${normalized}.`,
      devOtp: isDev ? otpCode : undefined,
    };
  }
}

