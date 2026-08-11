import { useState } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, User, ArrowLeft, Check } from 'lucide-react';

import backgroundImg from '../assets/agricultura.jpg';

type Mode = 'login' | 'register' | 'forgot';

export default function AuthScreenCentered() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const passwordsMatch = form.password === form.confirmPassword;
  const showMismatch = mode === 'register' && form.confirmPassword.length > 0 && !passwordsMatch;

  const hasMinLength = form.password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const isPasswordStrongEnough = hasMinLength && hasLetter && hasNumber;
  const showPasswordHint = mode === 'register' && form.password.length > 0;

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <img
        src={backgroundImg}
        alt="Campo agrícola visto de cima"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#9ab16f] flex items-center justify-center mb-3 shadow-lg">
            <Leaf size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white drop-shadow-sm">Sulflux</h1>
          <p className="text-sm text-white/80 mt-1">Monitoramento agrícola</p>
        </div>

        <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-2xl p-6">

          {mode === 'login' && (
            <>
              <h2 className="text-lg font-semibold text-white mb-1">Entrar na sua conta</h2>
              <p className="text-sm text-white/70 mb-6">Acesse o monitoramento das suas propriedades</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Mail size={13} /> E-mail
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Lock size={13} /> Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-white/40 bg-white/10 text-[#9ab16f] focus:ring-[#9ab16f]"
                    />
                    Lembrar de mim
                  </label>
                  <button onClick={() => setMode('forgot')} className="text-white/90 hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>

                <button className="w-full bg-[#9ab16f] hover:bg-[#7c9459] text-white font-medium py-2.5 rounded-xl transition-colors mt-2">
                  Entrar
                </button>
              </div>

              <p className="text-center text-sm text-white/70 mt-6">
                Não tem uma conta?{' '}
                <button onClick={() => setMode('register')} className="text-white font-medium hover:underline">
                  Cadastre-se
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <h2 className="text-lg font-semibold text-white mb-1">Criar conta</h2>
              <p className="text-sm text-white/70 mb-6">Comece a monitorar suas propriedades</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <User size={13} /> Nome completo
                  </label>
                  <input
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Mail size={13} /> E-mail
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Lock size={13} /> Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {showPasswordHint && (
                    <ul className="mt-2 flex flex-col gap-0.5">
                      <li className={`text-xs flex items-center gap-1.5 ${hasMinLength ? 'text-[#c3d9a6]' : 'text-white/40'}`}>
                        <Check size={12} className={hasMinLength ? 'opacity-100' : 'opacity-30'} />
                        Pelo menos 8 caracteres
                      </li>
                      <li className={`text-xs flex items-center gap-1.5 ${hasLetter ? 'text-[#c3d9a6]' : 'text-white/40'}`}>
                        <Check size={12} className={hasLetter ? 'opacity-100' : 'opacity-30'} />
                        Pelo menos 1 letra
                      </li>
                      <li className={`text-xs flex items-center gap-1.5 ${hasNumber ? 'text-[#c3d9a6]' : 'text-white/40'}`}>
                        <Check size={12} className={hasNumber ? 'opacity-100' : 'opacity-30'} />
                        Pelo menos 1 número
                      </li>
                    </ul>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Lock size={13} /> Confirmar senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className={`w-full bg-white/10 border rounded-xl px-3 py-2 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 ${
                        showMismatch
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
                          : 'border-white/25 focus:border-[#9ab16f] focus:ring-[#9ab16f]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {showMismatch && (
                    <p className="text-xs text-red-300 mt-1">As senhas não coincidem</p>
                  )}
                </div>

                <button
                  disabled={!passwordsMatch || !isPasswordStrongEnough}
                  className="w-full bg-[#9ab16f] hover:bg-[#7c9459] disabled:bg-white/20 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-colors mt-2"
                >
                  Criar conta
                </button>
              </div>

              <p className="text-center text-sm text-white/70 mt-6">
                Já tem uma conta?{' '}
                <button onClick={() => setMode('login')} className="text-white font-medium hover:underline">
                  Entrar
                </button>
              </p>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <button onClick={() => setMode('login')} className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4">
                <ArrowLeft size={14} /> Voltar
              </button>
              <h2 className="text-lg font-semibold text-white mb-1">Recuperar senha</h2>
              <p className="text-sm text-white/70 mb-6">Enviaremos um link de redefinição para seu e-mail</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-white/80 mb-1.5 flex items-center gap-1.5">
                    <Mail size={13} /> E-mail
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                  />
                </div>

                <button className="w-full bg-[#9ab16f] hover:bg-[#7c9459] text-white font-medium py-2.5 rounded-xl transition-colors mt-2">
                  Enviar link de recuperação
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}