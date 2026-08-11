import { useState, useEffect } from 'react';
import { Eye, EyeOff, Leaf, Mail, Lock, User, ArrowLeft, Check } from 'lucide-react';

import carouselImg1 from '../assets/carousel-1.jpg';
import carouselImg2 from '../assets/carousel-2.jpg';
import carouselImg3 from '../assets/carousel-3.jpg';

type Mode = 'login' | 'register' | 'forgot';

const carouselImages = [
  { src: carouselImg1, title: 'Monitoramento inteligente', subtitle: 'Acompanhe o sequestro de carbono das suas propriedades com dados de satélite em tempo real.' },
  { src: carouselImg2, title: 'Do plantio à colheita', subtitle: 'Veja como cada etapa do cultivo impacta o balanço de carbono da sua terra.' },
  { src: carouselImg3, title: 'Decisões baseadas em dados', subtitle: 'Relatórios claros para transformar monitoramento em resultado.' },
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(i => (i + 1) % carouselImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#3a4a2c]">
      {carouselImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/25" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#9ab16f] from-20% via-[#9ab16f]/90 via-45% to-transparent" />

      {carouselImages.map((img, i) => (
        <div
          key={img.title}
          className={`absolute top-10 right-10 text-right max-w-sm transition-opacity duration-[1800ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2 leading-snug text-white">{img.title}</h2>
          <p className="text-zinc-100 text-sm leading-relaxed">{img.subtitle}</p>
        </div>
      ))}

      <div className="absolute bottom-10 left-10 flex gap-2">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Ir para imagem ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AuthScreen() {
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
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 bg-[#9ab16f] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#5f7443] flex items-center justify-center mb-3">
              <Leaf size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Sulflux</h1>
            <p className="text-sm text-emerald-950/70 mt-1">Monitoramento agrícola</p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6">

            {mode === 'login' && (
              <>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">Entrar na sua conta</h2>
                <p className="text-sm text-zinc-500 mb-6">Acesse o monitoramento das suas propriedades</p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} /> E-mail
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Lock size={13} /> Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-zinc-300 rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="rounded border-zinc-300 text-[#9ab16f] focus:ring-[#9ab16f]"
                      />
                      Lembrar de mim
                    </label>
                    <button onClick={() => setMode('forgot')} className="text-[#9ab16f] hover:underline">
                      Esqueceu a senha?
                    </button>
                  </div>

                  <button className="w-full bg-[#9ab16f] hover:bg-[#7c9459] text-white font-medium py-2.5 rounded-xl transition-colors mt-2">
                    Entrar
                  </button>
                </div>

                <p className="text-center text-sm text-zinc-500 mt-6">
                  Não tem uma conta?{' '}
                  <button onClick={() => setMode('register')} className="text-[#9ab16f] font-medium hover:underline">
                    Cadastre-se
                  </button>
                </p>
              </>
            )}

            {mode === 'register' && (
              <>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">Criar conta</h2>
                <p className="text-sm text-zinc-500 mb-6">Comece a monitorar suas propriedades</p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <User size={13} /> Nome completo
                    </label>
                    <input
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Seu nome"
                      className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} /> E-mail
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Lock size={13} /> Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-zinc-300 rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {showPasswordHint && (
                      <ul className="mt-2 flex flex-col gap-0.5">
                        <li className={`text-xs flex items-center gap-1.5 ${hasMinLength ? 'text-[#9ab16f]' : 'text-zinc-400'}`}>
                          <Check size={12} className={hasMinLength ? 'opacity-100' : 'opacity-30'} />
                          Pelo menos 8 caracteres
                        </li>
                        <li className={`text-xs flex items-center gap-1.5 ${hasLetter ? 'text-[#9ab16f]' : 'text-zinc-400'}`}>
                          <Check size={12} className={hasLetter ? 'opacity-100' : 'opacity-30'} />
                          Pelo menos 1 letra
                        </li>
                        <li className={`text-xs flex items-center gap-1.5 ${hasNumber ? 'text-[#9ab16f]' : 'text-zinc-400'}`}>
                          <Check size={12} className={hasNumber ? 'opacity-100' : 'opacity-30'} />
                          Pelo menos 1 número
                        </li>
                      </ul>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Lock size={13} /> Confirmar senha
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={e => update('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        className={`w-full border rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 ${
                          showMismatch
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-zinc-300 focus:border-[#9ab16f] focus:ring-[#9ab16f]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {showMismatch && (
                      <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
                    )}
                  </div>

                  <button
                    disabled={!passwordsMatch || !isPasswordStrongEnough}
                    className="w-full bg-[#9ab16f] hover:bg-[#7c9459] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-colors mt-2"
                  >
                    Criar conta
                  </button>
                </div>

                <p className="text-center text-sm text-zinc-500 mt-6">
                  Já tem uma conta?{' '}
                  <button onClick={() => setMode('login')} className="text-[#9ab16f] font-medium hover:underline">
                    Entrar
                  </button>
                </p>
              </>
            )}

            {mode === 'forgot' && (
              <>
                <button onClick={() => setMode('login')} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 mb-4">
                  <ArrowLeft size={14} /> Voltar
                </button>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">Recuperar senha</h2>
                <p className="text-sm text-zinc-500 mb-6">Enviaremos um link de redefinição para seu e-mail</p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-600 mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} /> E-mail
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#9ab16f] focus:ring-1 focus:ring-[#9ab16f]"
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

      <div className="hidden lg:block lg:w-1/2">
        <ImageCarousel />
      </div>
    </div>
  );
}