import { useEffect, useState } from 'react'
import type { T } from './data/content'

export type Lang = 'bn' | 'en'

const bnDigits = '০১২৩৪৫৬৭৮৯'
export const num = (v: number | string, lang: Lang) =>
  lang === 'bn' ? String(v).replace(/\d/g, (d) => bnDigits[+d]) : String(v)

export const tr = (o: T, lang: Lang) => o[lang]

export function useStored<V>(key: string, initial: V) {
  const [v, setV] = useState<V>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as V) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(v))
  }, [key, v])
  return [v, setV] as const
}

export function useOnline() {
  const [on, setOn] = useState(navigator.onLine)
  useEffect(() => {
    const a = () => setOn(true)
    const b = () => setOn(false)
    window.addEventListener('online', a)
    window.addEventListener('offline', b)
    return () => {
      window.removeEventListener('online', a)
      window.removeEventListener('offline', b)
    }
  }, [])
  return on
}

// Great-circle distance in km (Haversine formula)
export function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const toR = (d: number) => (d * Math.PI) / 180
  const dLat = toR(lat2 - lat1)
  const dLon = toR(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Initial compass bearing in degrees from point 1 to point 2
export function bearing(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toR = (d: number) => (d * Math.PI) / 180
  const y = Math.sin(toR(lon2 - lon1)) * Math.cos(toR(lat2))
  const x = Math.cos(toR(lat1)) * Math.sin(toR(lat2)) - Math.sin(toR(lat1)) * Math.cos(toR(lat2)) * Math.cos(toR(lon2 - lon1))
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

const dirs: T[] = [
  { bn: 'উত্তর', en: 'N' }, { bn: 'উত্তর-পূর্ব', en: 'NE' }, { bn: 'পূর্ব', en: 'E' }, { bn: 'দক্ষিণ-পূর্ব', en: 'SE' },
  { bn: 'দক্ষিণ', en: 'S' }, { bn: 'দক্ষিণ-পশ্চিম', en: 'SW' }, { bn: 'পশ্চিম', en: 'W' }, { bn: 'উত্তর-পশ্চিম', en: 'NW' },
]
export const compassDir = (deg: number) => dirs[Math.round(deg / 45) % 8]
