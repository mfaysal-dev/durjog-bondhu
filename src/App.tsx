import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity, Backpack, BookOpen, Check, ChevronRight, Copy, Download, House, Languages, LocateFixed, MapPin,
  MessageSquare, Navigation, Phone, Printer, Radio, ShieldCheck, Siren, Sun, Tornado, Users, Waves, WifiOff, Wifi, X, Zap,
} from 'lucide-react'
import { hazards, hotlines, kitItems, maritimeSignals, riverSignals, shelters, type Signal, type T } from './data/content'
import { bearing, compassDir, haversine, num, tr, useOnline, useStored, type Lang } from './lib'

type Tab = 'home' | 'signals' | 'guide' | 'shelter' | 'kit'
type Plan = { name: string; phone: string; meet: string; shelter: string; medical: string }
const emptyPlan: Plan = { name: '', phone: '', meet: '', shelter: '', medical: '' }

const ui = {
  appName: { bn: 'দুর্যোগ বন্ধু', en: 'Durjog Bondhu' },
  tagline: { bn: 'ইন্টারনেট ছাড়াই দুর্যোগে আপনার পাশে', en: 'Your disaster companion — works offline' },
  home: { bn: 'হোম', en: 'Home' }, signals: { bn: 'সংকেত', en: 'Signals' }, guide: { bn: 'করণীয়', en: 'Guide' },
  shelter: { bn: 'আশ্রয়', en: 'Shelter' }, kit: { bn: 'প্রস্তুতি', en: 'Prepare' },
  online: { bn: 'অনলাইন', en: 'Online' }, offline: { bn: 'অফলাইন — সব তথ্য এখনও কাজ করছে', en: 'Offline — everything still works' },
  sos: { bn: 'SOS জরুরি সাহায্য', en: 'SOS Emergency' },
  sosHint: { bn: 'সাইরেন + আলোর সংকেত + আপনার লোকেশন শেয়ার', en: 'Siren + light signal + share your location' },
  ready: { bn: 'আপনার পরিবারের প্রস্তুতি', en: 'Your family readiness' },
  hotlines: { bn: 'জরুরি হটলাইন (ট্যাপ করে কল)', en: 'Emergency hotlines (tap to call)' },
  install: { bn: 'অ্যাপ ইনস্টল করুন', en: 'Install app' },
}

const levelStyle: Record<Signal['level'], string> = {
  low: 'bg-emerald-500', mid: 'bg-amber-500', high: 'bg-orange-600', extreme: 'bg-red-600', comm: 'bg-slate-700',
}
const levelLabel: Record<Signal['level'], T> = {
  low: { bn: 'সতর্কতা', en: 'Caution' }, mid: { bn: 'হুঁশিয়ারি', en: 'Warning' }, high: { bn: 'বিপদ', en: 'Danger' },
  extreme: { bn: 'মহাবিপদ', en: 'Great danger' }, comm: { bn: 'যোগাযোগ বিচ্ছিন্ন', en: 'Comms lost' },
}
const hazardIcon: Record<string, typeof Waves> = { Waves, Tornado, Zap, Sun, Activity }
const hazardColor: Record<string, string> = {
  sky: 'from-sky-500 to-cyan-600', violet: 'from-violet-500 to-indigo-600', amber: 'from-amber-400 to-yellow-600',
  orange: 'from-orange-400 to-red-500', rose: 'from-rose-500 to-pink-600',
}

type BIPEvent = Event & { prompt: () => Promise<void> }

export default function App() {
  const [lang, setLang] = useStored<Lang>('db.lang', 'bn')
  const [tab, setTab] = useState<Tab>('home')
  const [kit, setKit] = useStored<string[]>('db.kit', [])
  const [plan, setPlan] = useStored<Plan>('db.plan', emptyPlan)
  const [sos, setSos] = useState(false)
  const [installEvt, setInstallEvt] = useState<BIPEvent | null>(null)
  const online = useOnline()
  const L = (o: T) => tr(o, lang)
  const N = (v: number | string) => num(v, lang)

  useEffect(() => {
    const h = (e: Event) => { e.preventDefault(); setInstallEvt(e as BIPEvent) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  useEffect(() => { window.scrollTo({ top: 0 }) }, [tab])

  const planFilled = Object.values(plan).filter((v) => v.trim()).length
  const score = Math.round((kit.length / kitItems.length) * 60 + (planFilled / 5) * 40)

  const tabs: { id: Tab; label: T; icon: typeof House }[] = [
    { id: 'home', label: ui.home, icon: House }, { id: 'signals', label: ui.signals, icon: Radio },
    { id: 'guide', label: ui.guide, icon: BookOpen }, { id: 'shelter', label: ui.shelter, icon: MapPin },
    { id: 'kit', label: ui.kit, icon: Backpack },
  ]

  return (
    <div className="min-h-dvh pb-24 text-slate-800">
      <header className="sticky top-0 z-30 bg-teal-700 text-white shadow-md no-print">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-xl bg-white/10" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold leading-tight">{L(ui.appName)}</h1>
            <p className="truncate text-xs text-teal-100">{L(ui.tagline)}</p>
          </div>
          {installEvt && (
            <button onClick={() => { installEvt.prompt(); setInstallEvt(null) }} className="hidden items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25 sm:flex">
              <Download size={14} /> {L(ui.install)}
            </button>
          )}
          <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} aria-label="Switch language" className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-teal-800 shadow">
            <Languages size={16} /> {lang === 'bn' ? 'EN' : 'বাংলা'}
          </button>
        </div>
        <div className={`flex items-center justify-center gap-1.5 py-1 text-xs font-medium ${online ? 'bg-teal-800/60 text-teal-100' : 'bg-amber-400 text-amber-950'}`}>
          {online ? <Wifi size={12} /> : <WifiOff size={12} />} {online ? L(ui.online) : L(ui.offline)}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-4">
        {tab === 'home' && <Home L={L} N={N} score={score} onSos={() => setSos(true)} go={setTab} />}
        {tab === 'signals' && <Signals L={L} N={N} />}
        {tab === 'guide' && <Guide L={L} />}
        {tab === 'shelter' && <Shelters L={L} N={N} lang={lang} />}
        {tab === 'kit' && <Prepare L={L} N={N} kit={kit} setKit={setKit} plan={plan} setPlan={setPlan} score={score} />}
        <footer className="mt-10 pb-4 text-center text-xs text-slate-500">
          {lang === 'bn' ? 'তৈরি করেছেন' : 'Built by'} <a className="font-semibold text-teal-700" href="https://mfaysal.com">Mahir Faysal</a> ·{' '}
          <a className="underline" href="https://github.com/mfaysal-dev/durjog-bondhu">GitHub</a>
          <br />
          {lang === 'bn' ? 'শিক্ষামূলক প্রকল্প। সর্বদা সরকারি নির্দেশনা (BMD, DDM, CPP) মেনে চলুন।' : 'Educational project. Always follow official guidance (BMD, DDM, CPP).'}
        </footer>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold transition ${tab === id ? 'text-teal-700' : 'text-slate-500'}`}>
              <span className={`rounded-full px-4 py-1 ${tab === id ? 'bg-teal-100' : ''}`}><Icon size={20} /></span>
              {L(label)}
            </button>
          ))}
        </div>
      </nav>

      {sos && <SosOverlay L={L} plan={plan} onClose={() => setSos(false)} />}
    </div>
  )
}

type LP = { L: (o: T) => string; N: (v: number | string) => string }

function Home({ L, N, score, onSos, go }: LP & { score: number; onSos: () => void; go: (t: Tab) => void }) {
  return (
    <div className="space-y-5">
      <button onClick={onSos} className="relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 p-5 text-left text-white shadow-lg shadow-red-200 active:scale-[.99]">
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <span className="pulse-ring absolute inset-0 rounded-full bg-white/40" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-red-600"><Siren size={32} /></span>
        </span>
        <span>
          <span className="block text-2xl font-bold">{L(ui.sos)}</span>
          <span className="text-sm text-red-100">{L(ui.sosHint)}</span>
        </span>
      </button>

      <button onClick={() => go('kit')} className="flex w-full items-center gap-4 rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100">
        <Ring value={score} label={N(score) + '%'} />
        <span className="flex-1">
          <span className="block font-bold">{L(ui.ready)}</span>
          <span className="text-sm text-slate-500">
            {L(score >= 80 ? { bn: 'চমৎকার! আপনার পরিবার প্রস্তুত।', en: 'Excellent! Your family is prepared.' } : score >= 40 ? { bn: 'ভালো শুরু — কিট ও পরিকল্পনা শেষ করুন।', en: 'Good start — finish your kit and plan.' } : { bn: 'জরুরি কিট ও পারিবারিক পরিকল্পনা তৈরি করুন।', en: 'Build your emergency kit and family plan.' })}
          </span>
        </span>
        <ChevronRight className="text-slate-400" />
      </button>

      <div className="grid grid-cols-2 gap-3">
        {[
          { t: ui.signals, d: { bn: '১–১১ নম্বর সংকেতের মানে', en: 'What signals 1–11 mean' }, icon: Radio, to: 'signals' as Tab, c: 'bg-violet-50 text-violet-700' },
          { t: ui.shelter, d: { bn: 'নিকটতম আশ্রয়কেন্দ্র', en: 'Nearest shelter' }, icon: MapPin, to: 'shelter' as Tab, c: 'bg-sky-50 text-sky-700' },
          { t: { bn: 'বজ্রপাত', en: 'Lightning' }, d: { bn: '৩০-৩০ নিয়ম', en: 'The 30-30 rule' }, icon: Zap, to: 'guide' as Tab, c: 'bg-amber-50 text-amber-700' },
          { t: { bn: 'পারিবারিক পরিকল্পনা', en: 'Family plan' }, d: { bn: 'কোথায় মিলবেন, কাকে ফোন', en: 'Where to meet, who to call' }, icon: Users, to: 'kit' as Tab, c: 'bg-emerald-50 text-emerald-700' },
        ].map((c) => (
          <button key={c.d.en} onClick={() => go(c.to)} className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 active:scale-[.98]">
            <span className={`mb-2 inline-flex rounded-xl p-2 ${c.c}`}><c.icon size={20} /></span>
            <span className="block font-semibold">{L(c.t)}</span>
            <span className="text-xs text-slate-500">{L(c.d)}</span>
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-2 font-bold text-slate-700">{L(ui.hotlines)}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {hotlines.map((h) => (
            <a key={h.num} href={`tel:${h.num}`} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 active:bg-teal-50">
              <span className="flex h-12 min-w-14 items-center justify-center rounded-xl bg-teal-700 px-2 text-lg font-bold text-white">{N(h.num)}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{L(h.name)}</span>
                <span className="block truncate text-xs text-slate-500">{L(h.desc)}</span>
              </span>
              <Phone size={18} className="text-teal-700" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

function Ring({ value, label }: { value: number; label: string }) {
  const r = 26, c = 2 * Math.PI * r
  const col = value >= 80 ? '#059669' : value >= 40 ? '#d97706' : '#dc2626'
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="shrink-0">
      <circle cx="34" cy="34" r={r} stroke="#e2e8f0" strokeWidth="7" fill="none" />
      <circle cx="34" cy="34" r={r} stroke={col} strokeWidth="7" fill="none" strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} strokeLinecap="round" transform="rotate(-90 34 34)" style={{ transition: 'stroke-dashoffset .6s' }} />
      <text x="34" y="39" textAnchor="middle" fontSize="15" fontWeight="700" fill={col}>{label}</text>
    </svg>
  )
}

function Signals({ L, N }: LP) {
  const [kind, setKind] = useState<'sea' | 'river'>('sea')
  const list = kind === 'sea' ? maritimeSignals : riverSignals
  const [sel, setSel] = useState(1)
  const cur = list.find((s) => s.n === sel) ?? list[0]
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{L({ bn: 'সতর্ক সংকেত বুঝুন', en: 'Understand warning signals' })}</h2>
        <p className="text-sm text-slate-500">{L({ bn: 'বাংলাদেশ আবহাওয়া অধিদপ্তরের (BMD) সংকেতের সহজ ব্যাখ্যা। একটি নম্বর ট্যাপ করুন।', en: 'Simplified Bangladesh Meteorological Department (BMD) signals. Tap a number.' })}</p>
      </div>
      <div className="flex rounded-full bg-slate-200 p-1 text-sm font-semibold">
        {(['sea', 'river'] as const).map((k) => (
          <button key={k} onClick={() => { setKind(k); setSel(1) }} className={`flex-1 rounded-full py-2 ${kind === k ? 'bg-white text-teal-800 shadow' : 'text-slate-600'}`}>
            {L(k === 'sea' ? { bn: 'সমুদ্রবন্দর (১–১১)', en: 'Sea ports (1–11)' } : { bn: 'নদীবন্দর (১–৪)', en: 'River ports (1–4)' })}
          </button>
        ))}
      </div>
      <div className={`grid gap-2 ${kind === 'sea' ? 'grid-cols-6 sm:grid-cols-11' : 'grid-cols-4'}`}>
        {list.map((s) => (
          <button key={s.n} onClick={() => setSel(s.n)} className={`aspect-square rounded-xl text-lg font-bold text-white transition ${levelStyle[s.level]} ${sel === s.n ? 'scale-110 ring-4 ring-teal-300' : 'opacity-80'}`}>
            {N(s.n)}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className={`${levelStyle[cur.level]} flex items-center gap-4 p-5 text-white`}>
          <span className="text-5xl font-bold">{N(cur.n)}</span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider opacity-80">{L(levelLabel[cur.level])}</span>
            <span className="text-xl font-bold">{L(cur.name)}</span>
          </span>
        </div>
        <div className="space-y-3 p-5">
          <p><b>{L({ bn: 'অর্থ: ', en: 'Meaning: ' })}</b>{L(cur.meaning)}</p>
          <p className="rounded-2xl bg-teal-50 p-3 text-teal-900"><b>{L({ bn: 'আপনার করণীয়: ', en: 'What you should do: ' })}</b>{L(cur.action)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">{L({ bn: 'সূত্র: বাংলাদেশ আবহাওয়া অধিদপ্তর (bmd.gov.bd) ও ঘূর্ণিঝড় প্রস্তুতি কর্মসূচি (CPP)। সংকেতের বিস্তারিত সংজ্ঞা সরকারি বুলেটিন অনুযায়ী।', en: 'Source: Bangladesh Meteorological Department (bmd.gov.bd) and Cyclone Preparedness Programme (CPP). Official bulletins prevail.' })}</p>
    </div>
  )
}

function Guide({ L }: { L: (o: T) => string }) {
  const [id, setId] = useState(hazards[0].id)
  const [phase, setPhase] = useState<'before' | 'during' | 'after'>('before')
  const h = hazards.find((x) => x.id === id)!
  const Icon = hazardIcon[h.icon]
  const phases = { before: { bn: 'আগে', en: 'Before' }, during: { bn: 'চলাকালীন', en: 'During' }, after: { bn: 'পরে', en: 'After' } }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{L({ bn: 'দুর্যোগে করণীয়', en: 'What to do in a disaster' })}</h2>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {hazards.map((x) => {
          const I = hazardIcon[x.icon]
          return (
            <button key={x.id} onClick={() => setId(x.id)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${id === x.id ? 'bg-teal-700 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>
              <I size={16} /> {L(x.name)}
            </button>
          )
        })}
      </div>
      <div className={`flex items-center gap-4 rounded-3xl bg-gradient-to-br ${hazardColor[h.color]} p-5 text-white`}>
        <Icon size={44} />
        <span className="text-2xl font-bold">{L(h.name)}</span>
      </div>
      <div className="flex rounded-full bg-slate-200 p-1 text-sm font-semibold">
        {(Object.keys(phases) as (keyof typeof phases)[]).map((p) => (
          <button key={p} onClick={() => setPhase(p)} className={`flex-1 rounded-full py-2 ${phase === p ? 'bg-white text-teal-800 shadow' : 'text-slate-600'}`}>{L(phases[p])}</button>
        ))}
      </div>
      <ol className="space-y-2">
        {h[phase].map((tip, i) => (
          <li key={i} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">{i + 1}</span>
            <span>{L(tip)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Shelters({ L, N, lang }: LP & { lang: Lang }) {
  const [pos, setPos] = useState<{ lat: number; lng: number; src: 'gps' | 'manual' } | null>(null)
  const [err, setErr] = useState('')
  const [type, setType] = useState<'all' | 'cyclone' | 'flood'>('all')
  const locate = () => {
    setErr('')
    if (!navigator.geolocation) return setErr(L({ bn: 'এই ডিভাইসে GPS নেই।', en: 'GPS not available on this device.' }))
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude, src: 'gps' }),
      () => setErr(L({ bn: 'লোকেশন পাওয়া যায়নি — নিচ থেকে আপনার উপজেলা বেছে নিন।', en: 'Could not get location — pick your upazila below.' })),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }
  const ranked = useMemo(() => {
    const list = shelters.filter((s) => type === 'all' || s.type === type)
    if (!pos) return list.map((s) => ({ s, d: NaN, b: 0 }))
    return list.map((s) => ({ s, d: haversine(pos.lat, pos.lng, s.lat, s.lng), b: bearing(pos.lat, pos.lng, s.lat, s.lng) })).sort((a, b) => a.d - b.d)
  }, [pos, type])
  const nearest = pos ? ranked[0] : null
  const maxD = pos ? Math.max(...ranked.slice(0, 6).map((r) => r.d), 1) : 1

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{L({ bn: 'নিকটতম আশ্রয়কেন্দ্র', en: 'Nearest shelter' })}</h2>
        <p className="text-sm text-slate-500">{L({ bn: 'GPS ইন্টারনেট ছাড়াই কাজ করে। দূরত্ব ও দিক ডিভাইসেই হিসাব হয় (Haversine সূত্র)।', en: 'GPS works without internet. Distance & direction are computed on-device (Haversine formula).' })}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={locate} className="flex items-center gap-2 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow"><LocateFixed size={16} /> {L({ bn: 'আমার লোকেশন ব্যবহার করুন', en: 'Use my location' })}</button>
        <select aria-label="Pick upazila" className="rounded-full border border-slate-300 bg-white px-3 py-2.5 text-sm" value="" onChange={(e) => { const s = shelters.find((x) => x.id === e.target.value); if (s) setPos({ lat: s.lat + 0.03, lng: s.lng + 0.02, src: 'manual' }) }}>
          <option value="">{L({ bn: 'অথবা উপজেলা বেছে নিন…', en: 'Or pick an upazila…' })}</option>
          {shelters.map((s) => <option key={s.id} value={s.id}>{L(s.upazila)}, {L(s.district)}</option>)}
        </select>
      </div>
      {err && <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{err}</p>}
      <div className="flex gap-2 text-sm">
        {(['all', 'cyclone', 'flood'] as const).map((t) => (
          <button key={t} onClick={() => setType(t)} className={`rounded-full px-3 py-1.5 font-semibold ${type === t ? 'bg-slate-800 text-white' : 'bg-white ring-1 ring-slate-200'}`}>
            {L(t === 'all' ? { bn: 'সব', en: 'All' } : t === 'cyclone' ? { bn: 'ঘূর্ণিঝড়', en: 'Cyclone' } : { bn: 'বন্যা', en: 'Flood' })}
          </button>
        ))}
      </div>

      {nearest && pos && (
        <div className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:grid-cols-[1fr_220px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">{L({ bn: 'সবচেয়ে কাছে', en: 'Closest' })}</p>
            <p className="text-lg font-bold">{L(nearest.s.name)}</p>
            <p className="text-sm text-slate-500">{L(nearest.s.upazila)}, {L(nearest.s.district)}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 ring-2 ring-teal-200">
                <Navigation size={34} className="text-teal-700" style={{ transform: `rotate(${nearest.b - 45}deg)` }} />
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-800">{N(nearest.d.toFixed(1))} <span className="text-base">{L({ bn: 'কিমি', en: 'km' })}</span></p>
                <p className="text-sm text-slate-600">{L(compassDir(nearest.b))} ({N(Math.round(nearest.b))}°) · {L({ bn: 'হেঁটে প্রায়', en: 'walk ≈' })} {N(Math.round((nearest.d / 4.5) * 60))} {L({ bn: 'মিনিট', en: 'min' })}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">{pos.src === 'gps' ? 'GPS' : L({ bn: 'আনুমানিক অবস্থান', en: 'Approximate position' })}: {N(pos.lat.toFixed(4))}, {N(pos.lng.toFixed(4))}</p>
          </div>
          <Radar items={ranked.slice(0, 6)} maxD={maxD} lang={lang} />
        </div>
      )}

      <ul className="space-y-2">
        {ranked.map(({ s, d, b }) => (
          <li key={s.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.type === 'cyclone' ? 'bg-violet-100 text-violet-700' : 'bg-sky-100 text-sky-700'}`}>{s.type === 'cyclone' ? <Tornado size={18} /> : <Waves size={18} />}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{L(s.name)}</span>
              <span className="text-xs text-slate-500">{L(s.district)}</span>
            </span>
            {!isNaN(d) && <span className="text-right text-sm font-bold text-teal-800">{N(d.toFixed(1))} {L({ bn: 'কিমি', en: 'km' })}<span className="block text-xs font-normal text-slate-500">{L(compassDir(b))}</span></span>}
          </li>
        ))}
      </ul>
      <p className="rounded-xl bg-slate-100 p-3 text-xs text-slate-600">{L({ bn: '⚠️ ডেমো ডেটাসেট: অবস্থানগুলো উপজেলা সদরের আনুমানিক স্থানাঙ্ক। বাস্তব ব্যবহারের আগে দুর্যোগ ব্যবস্থাপনা অধিদপ্তর/ইউনিয়ন পরিষদের সরকারি তালিকা দিয়ে হালনাগাদ করতে হবে (src/data/content.ts)।', en: '⚠️ Demo dataset: points are approximate upazila HQ coordinates. Replace with official DDM / Union Parishad lists before real use (src/data/content.ts).' })}</p>
    </div>
  )
}

function Radar({ items, maxD, lang }: { items: { s: (typeof shelters)[number]; d: number; b: number }[]; maxD: number; lang: Lang }) {
  const R = 95
  return (
    <svg viewBox="-110 -110 220 220" className="w-full max-w-[220px] justify-self-center" role="img" aria-label="Offline shelter radar">
      <circle r={R} fill="#f0fdfa" stroke="#99f6e4" />
      <circle r={R * 0.66} fill="none" stroke="#ccfbf1" />
      <circle r={R * 0.33} fill="none" stroke="#ccfbf1" />
      <line x1={-R} x2={R} stroke="#ccfbf1" /><line y1={-R} y2={R} stroke="#ccfbf1" />
      <text y={-R + 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">{lang === 'bn' ? 'উ' : 'N'}</text>
      {items.map(({ s, d, b }, i) => {
        const r = 14 + (d / maxD) * (R - 26)
        const a = ((b - 90) * Math.PI) / 180
        return (
          <g key={s.id}>
            <circle cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={i === 0 ? 7 : 5} fill={i === 0 ? '#dc2626' : s.type === 'cyclone' ? '#7c3aed' : '#0284c7'} stroke="#fff" strokeWidth="2" />
          </g>
        )
      })}
      <circle r="6" fill="#0f766e" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

function Prepare({ L, N, kit, setKit, plan, setPlan, score }: LP & { kit: string[]; setKit: (v: string[]) => void; plan: Plan; setPlan: (p: Plan) => void; score: number }) {
  const cats = { food: { bn: 'খাবার ও পানি', en: 'Food & water' }, health: { bn: 'স্বাস্থ্য', en: 'Health' }, tools: { bn: 'সরঞ্জাম', en: 'Tools' }, docs: { bn: 'কাগজপত্র ও টাকা', en: 'Documents & money' } }
  const toggle = (id: string) => setKit(kit.includes(id) ? kit.filter((k) => k !== id) : [...kit, id])
  const fields: { k: keyof Plan; t: T; ph: T }[] = [
    { k: 'name', t: { bn: 'জরুরি যোগাযোগ (নাম)', en: 'Emergency contact (name)' }, ph: { bn: 'যেমন: বড় চাচা', en: 'e.g. Uncle Karim' } },
    { k: 'phone', t: { bn: 'তার ফোন নম্বর', en: 'Their phone number' }, ph: { bn: '01XXXXXXXXX', en: '01XXXXXXXXX' } },
    { k: 'meet', t: { bn: 'পরিবার আলাদা হলে কোথায় মিলবেন', en: 'Meeting point if separated' }, ph: { bn: 'যেমন: প্রাথমিক বিদ্যালয়ের মাঠ', en: 'e.g. primary school field' } },
    { k: 'shelter', t: { bn: 'আমাদের আশ্রয়কেন্দ্র', en: 'Our shelter' }, ph: { bn: 'যেমন: ইউনিয়ন পরিষদ আশ্রয়কেন্দ্র', en: 'e.g. Union Parishad shelter' } },
    { k: 'medical', t: { bn: 'বিশেষ চাহিদা / ওষুধ', en: 'Special needs / medicine' }, ph: { bn: 'যেমন: দাদুর ইনসুলিন', en: 'e.g. grandpa’s insulin' } },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <Ring value={score} label={N(score) + '%'} />
        <div>
          <p className="font-bold">{L(ui.ready)}</p>
          <p className="text-sm text-slate-500">{L({ bn: 'কিট', en: 'Kit' })}: {N(kit.length)}/{N(kitItems.length)} · {L({ bn: 'পরিকল্পনা', en: 'Plan' })}: {N(Object.values(plan).filter((v) => v.trim()).length)}/{N(5)}</p>
          <p className="text-xs text-slate-400">{L({ bn: 'সব তথ্য শুধু আপনার ফোনেই সংরক্ষিত থাকে।', en: 'All data stays on your phone only.' })}</p>
        </div>
      </div>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold"><Backpack size={20} className="text-teal-700" /> {L({ bn: 'জরুরি কিট চেকলিস্ট', en: 'Emergency kit checklist' })}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(cats) as (keyof typeof cats)[]).map((c) => (
            <div key={c} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <p className="mb-1 px-1 text-xs font-bold uppercase tracking-wider text-slate-500">{L(cats[c])}</p>
              {kitItems.filter((k) => k.cat === c).map((k) => {
                const on = kit.includes(k.id)
                return (
                  <button key={k.id} onClick={() => toggle(k.id)} className="flex w-full items-center gap-3 rounded-xl px-1 py-2 text-left text-sm hover:bg-slate-50">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${on ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                    <span className={on ? 'text-slate-400 line-through' : ''}>{L(k.t)}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-lg font-bold"><Users size={20} className="text-teal-700" /> {L({ bn: 'পারিবারিক জরুরি পরিকল্পনা', en: 'Family emergency plan' })}</h2>
        <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          {fields.map((f) => (
            <label key={f.k} className="block">
              <span className="text-sm font-semibold text-slate-600">{L(f.t)}</span>
              <input value={plan[f.k]} inputMode={f.k === 'phone' ? 'tel' : 'text'} onChange={(e) => setPlan({ ...plan, [f.k]: e.target.value })} placeholder={L(f.ph)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
            </label>
          ))}
          <button onClick={() => window.print()} className="no-print flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white"><Printer size={16} /> {L({ bn: 'প্রিন্ট করে ঘরে টাঙিয়ে রাখুন', en: 'Print & stick it on the wall' })}</button>
        </div>
      </section>
    </div>
  )
}

function SosOverlay({ L, plan, onClose }: { L: (o: T) => string; plan: Plan; onClose: () => void }) {
  const [loc, setLoc] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const ctx = useRef<AudioContext | null>(null)
  useEffect(() => {
    const ac = new AudioContext()
    ctx.current = ac
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    gain.gain.value = 0.25
    osc.type = 'sawtooth'
    osc.connect(gain).connect(ac.destination)
    const t0 = ac.currentTime
    for (let i = 0; i < 120; i++) {
      osc.frequency.setValueAtTime(650, t0 + i)
      osc.frequency.linearRampToValueAtTime(1250, t0 + i + 0.5)
      osc.frequency.linearRampToValueAtTime(650, t0 + i + 1)
    }
    osc.start()
    navigator.vibrate?.([500, 200, 500, 200, 500])
    navigator.geolocation?.getCurrentPosition((p) => setLoc(`${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)}`), () => setLoc(''), { enableHighAccuracy: true, timeout: 10000 })
    return () => { osc.stop(); ac.close() }
  }, [])
  const msg = `SOS! ${L({ bn: 'আমি বিপদে আছি, সাহায্য দরকার।', en: 'I am in danger and need help.' })}${loc ? ` ${L({ bn: 'আমার লোকেশন', en: 'My location' })}: https://maps.google.com/?q=${loc}` : ''} — ${L(ui.appName)}`
  return (
    <div className="sos-flash fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm space-y-3 rounded-3xl bg-white p-5 text-center shadow-2xl">
        <Siren size={48} className="mx-auto text-red-600" />
        <p className="text-2xl font-bold text-red-700">SOS</p>
        <p className="text-sm text-slate-600">{L({ bn: 'সাইরেন বাজছে ও স্ক্রিন জ্বলছে — উদ্ধারকারীরা আপনাকে দেখতে/শুনতে পাবে।', en: 'Siren and flashing screen help rescuers see and hear you.' })}</p>
        <p className="rounded-xl bg-slate-100 p-2 font-mono text-xs">{loc || L({ bn: 'লোকেশন খোঁজা হচ্ছে…', en: 'Finding location…' })}</p>
        <a href="tel:999" className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 text-lg font-bold text-white"><Phone size={20} /> 999</a>
        <a href={`sms:${plan.phone}?body=${encodeURIComponent(msg)}`} className="flex items-center justify-center gap-2 rounded-2xl bg-teal-700 py-3 font-semibold text-white"><MessageSquare size={18} /> {L({ bn: 'SMS-এ লোকেশন পাঠান', en: 'Send location by SMS' })}{plan.name ? ` (${plan.name})` : ''}</a>
        <button onClick={() => { navigator.clipboard?.writeText(msg); setCopied(true) }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-2.5 text-sm font-semibold">{copied ? <ShieldCheck size={16} /> : <Copy size={16} />} {copied ? L({ bn: 'কপি হয়েছে', en: 'Copied' }) : L({ bn: 'বার্তা কপি করুন', en: 'Copy message' })}</button>
        <button onClick={onClose} className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500"><X size={16} /> {L({ bn: 'বন্ধ করুন', en: 'Stop' })}</button>
      </div>
    </div>
  )
}
