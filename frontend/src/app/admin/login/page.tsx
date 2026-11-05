'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Mail, Key, ArrowRight, AlertCircle, Info } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('advshiv43@gmail.com');
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
        // Verify token with backend
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
    <div className="min-h-screen bg-navy-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-12 h-12 bg-navy border border-gold/40 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={28} className="text-gold" />
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-wider text-white">
          Chamber Administration
        </h2>
        <p className="text-xs uppercase tracking-widest text-gold font-mono">
          Advocate Practice Management Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-modal border-t-4 border-gold">
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs flex items-start space-x-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-6 p-3 bg-emerald-50 border-l-2 border-emerald-500 text-emerald-800 text-xs flex items-start space-x-2">
              <Info size={16} className="shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Toggle between Password and OTP Mode */}
          <div className="flex border-b border-ivory-dark mb-6">
            <button
              type="button"
              onClick={() => {
                setUseOtpMode(false);
                setErrorMsg(null);
              }}
              className={`flex-1 pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                !useOtpMode
                  ? 'border-gold text-navy font-bold'
                  : 'border-transparent text-charcoal/50 hover:text-navy'
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
              className={`flex-1 pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                useOtpMode
                  ? 'border-gold text-navy font-bold'
                  : 'border-transparent text-charcoal/50 hover:text-navy'
              }`}
            >
              Email OTP
            </button>
          </div>

          {!useOtpMode ? (
            /* Password Authentication Form */
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <Input
                label="Administrator Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="advshiv43@gmail.com"
              />

              <Input
                label="Admin Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={loading}
                  className="w-full flex justify-center items-center"
                >
                  <span>Authenticate Session</span>
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </form>
          ) : (
            /* Email OTP Authentication Form */
            <div className="space-y-5">
              <Input
                label="Administrator Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="advshiv43@gmail.com"
                disabled={otpSent}
              />

              {!otpSent ? (
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    isLoading={loading}
                    onClick={handleSendOtp}
                    className="w-full"
                  >
                    Send One-Time Passcode (OTP)
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <Input
                    label="6-Digit OTP Code"
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="font-mono text-center tracking-widest text-lg"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={loading}
                    className="w-full"
                  >
                    Verify OTP & Enter
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-charcoal/60 hover:text-navy underline"
                  >
                    Change Email or Resend
                  </button>
                </form>
              )}
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
