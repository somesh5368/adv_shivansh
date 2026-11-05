# Brevo (Sendinblue) Integration Guide

This application integrates Brevo in two complementary capacities:
1. **Custom SMTP Provider for Supabase Auth:** Powers administrator authentication OTPs, magic links, email verifications, and password resets.
2. **Transactional REST API in Express Backend:** Powers immediate transactional notifications for content publications, administrative security alerts, and client website inquiries.

---

## 1. Domain Verification & DNS Records (SPF / DKIM / DMARC)

To guarantee 100% inbox deliverability without falling into spam filters:
1. In your Brevo account, navigate to **Senders & IP > Domains**.
2. Click **Add Domain** (e.g. `advshivpandey.in`).
3. Add the TXT records provided by Brevo to your DNS registrar (e.g. GoDaddy, Cloudflare, Namecheap):
   - **SPF Record:**
     ```text
     Type: TXT
     Host: @
     Value: v=spf1 include:spf.brevo.com ~all
     ```
   - **DKIM Key:**
     ```text
     Type: TXT
     Host: mail._domainkey
     Value: <Provided by Brevo>
     ```
   - **DMARC Record:**
     ```text
     Type: TXT
     Host: _dmarc
     Value: v=DMARC1; p=none; rua=mailto:dmarc-reports@advshivpandey.in
     ```
4. Click **Verify Domain** in Brevo.

---

## 2. Supabase Custom SMTP Configuration

Configure Supabase Auth to route all verification emails through Brevo's SMTP server:
1. In the [Supabase Dashboard](https://supabase.com/dashboard), navigate to **Authentication > Email Settings**.
2. Toggle on **Enable Custom SMTP**.
3. Enter the following parameters:
   - **Sender Email:** `advshiv43@gmail.com` (or your verified domain address, e.g. `chambers@advshivpandey.in`)
   - **Sender Name:** `Adv. Shivansh Kumar Pandey`
   - **Host:** `smtp-relay.brevo.com`
   - **Port:** `587`
   - **User:** Your Brevo account email
   - **Password:** Your Brevo SMTP key (obtained under *SMTP & API > SMTP*)
4. Click **Save Changes**.

---

## 3. Backend Transactional Email Integration

The Express backend initializes the `@getbrevo/brevo` SDK in `backend/src/config/brevo.ts` and provides reusable luxury branded email layouts in `backend/src/services/emailService.ts`.

### Trigger Events Supported:
1. **Enquiry Received (`EmailService.sendEnquiryNotification`):** Dispatched to the advocate when a visitor submits a contact request.
2. **Content Published (`EmailService.sendContentUpdateNotice`):** Dispatched to the administrator when an article is published live or modified.
3. **Security Alert (`EmailService.sendSecurityAlert`):** Dispatched upon administrative session activities or security anomalies.

### Testing the Pipeline:
- In the Admin Dashboard, navigate to `/admin/security`.
- Under **Brevo Transactional Email Pipeline Tester**, enter your email and click **Send Transactional Test**.
- The Express backend calls `POST /api/admin/notifications/test` and delivers the test notification.
- In development mode (or if `BREVO_API_KEY` is not yet configured), the backend safely logs the simulated dispatch without interrupting the application flow.

