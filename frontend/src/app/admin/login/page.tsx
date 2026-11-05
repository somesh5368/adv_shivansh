'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';
import { ShieldCheck, ArrowRight, AlertCircle, Info, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('justicealliencelaw@gmail.com');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [useOtpMode, setUseOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const supabase = getSupabaseClient();

  // 1. Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        await adminApi.verifySession(data.session.access_token);
        localStorage.setItem('advocate_admin_token', data.session.access_token);
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Dispatch Secure Chamber Email OTP via Backend
  const handleSendOtp = async () => {
    if (!email) {
      setErrorMsg('Please enter your administrator email address.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const res = await adminApi.sendOtp(email);
      setOtpSent(true);
      if (res.devOtp) {
        setInfoMsg(`${res.message} [Development Passcode: ${res.devOtp}]`);
      } else {
        setInfoMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch email OTP. Please verify administrator email address.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP & Authenticate Session
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      let { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode.trim(),
        type: 'email',
      });

      if (error) {
        const retry = await supabase.auth.verifyOtp({
          email,
          token: otpCode.trim(),
          type: 'magiclink',
        });
        if (!retry.error) {
          data = retry.data;
          error = null;
        }
      }

      if (error) throw error;

      if (data.session) {
        await adminApi.verifySession(data.session.access_token);
        localStorage.setItem('advocate_admin_token', data.session.access_token);
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone flex flex-col justify-center py-12 sm:px-6 lg:px-8 pillar-lines-bg relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="w-14 h-14 bg-oxblood border-2 border-brass/60 rounded-xs flex items-center justify-center mx-auto shadow-md">
          <ScalesEmblem size={28} className="text-brass" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-oxblood">
          JUSTICE ALLIANCE
        </h2>
        <p className="text-xs uppercase tracking-widest text-charcoal/70 font-semibold">
          Associates &amp; Law Firm &bull; Chambers Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card border-2 border-brass/50 rounded-xs">
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-50 border-l-3 border-red-600 text-red-800 text-xs flex items-start space-x-2 rounded-xs">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-6 p-3.5 bg-emerald-50 border-l-3 border-emerald-600 text-emerald-800 text-xs flex items-start space-x-2 rounded-xs">
              <Info size={16} className="shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Toggle between Password and OTP Mode */}
          <div className="flex border-b border-bone-dark mb-6">
            <button
              type="button"
              onClick={() => {
                setUseOtpMode(false);
                setErrorMsg(null);
              }}
              className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-colors ${
                !useOtpMode
                  ? 'border-brass text-oxblood'
                  : 'border-transparent text-charcoal/40 hover:text-charcoal'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => {
                setUseOtpMode(true);
                setErrorMsg(null);
              }}
              className={`flex-1 pb-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-colors ${
                useOtpMode
                  ? 'border-brass text-oxblood'
                  : 'border-transparent text-charcoal/40 hover:text-charcoal'
              }`}
            >
              Email OTP
            </button>
          </div>

          {!useOtpMode ? (
            /* Password Authentication Form */
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="justicealliencelaw@gmail.com"
                  className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md rounded-xs flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  <span>{loading ? 'Authenticating...' : 'Authenticate Session'}</span>
                  <ArrowRight size={14} className="ml-1 text-brass" />
                </button>
              </div>
            </form>
          ) : (
            /* Email OTP Authentication Form */
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="justicealliencelaw@gmail.com"
                  disabled={otpSent}
                  className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                />
              </div>

              {!otpSent ? (
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSendOtp}
                    className="w-full py-3 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md rounded-xs flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    <span>{loading ? 'Dispatching OTP...' : 'Send Verification OTP'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                      6-Digit Security Passcode
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest text-lg font-bold py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md rounded-xs flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify OTP & Enter'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-charcoal/60 hover:text-oxblood underline"
                  >
                    Change Email or Resend
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-bone-dark text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-charcoal/60 hover:text-oxblood transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
