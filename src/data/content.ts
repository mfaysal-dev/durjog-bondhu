export type T = { bn: string; en: string }

export const hotlines: { num: string; name: T; desc: T }[] = [
  { num: '999', name: { bn: 'জাতীয় জরুরি সেবা', en: 'National Emergency Service' }, desc: { bn: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স — টোল ফ্রি', en: 'Police, fire service & ambulance — toll free' } },
  { num: '1090', name: { bn: 'দুর্যোগের আগাম বার্তা', en: 'Disaster Early Warning' }, desc: { bn: 'দুর্যোগ ব্যবস্থাপনা অধিদপ্তরের আবহাওয়া ও সতর্কবার্তা (IVR)', en: 'DDM weather & warning messages (IVR)' } },
  { num: '16163', name: { bn: 'ফায়ার সার্ভিস', en: 'Fire Service & Civil Defence' }, desc: { bn: 'আগুন, উদ্ধার ও দুর্ঘটনা', en: 'Fire, rescue & accidents' } },
  { num: '16263', name: { bn: 'স্বাস্থ্য বাতায়ন', en: 'Shasthyo Batayon (Health)' }, desc: { bn: 'ডাক্তারের পরামর্শ, ২৪ ঘণ্টা', en: '24/7 doctor advice line' } },
  { num: '333', name: { bn: 'জাতীয় তথ্য বাতায়ন', en: 'National Info Service' }, desc: { bn: 'সরকারি তথ্য ও সেবা, ত্রাণ সংক্রান্ত তথ্য', en: 'Govt information & services, relief info' } },
  { num: '109', name: { bn: 'নারী ও শিশু সহায়তা', en: 'Women & Child Helpline' }, desc: { bn: 'নির্যাতন প্রতিরোধ — আশ্রয়কেন্দ্রেও প্রযোজ্য', en: 'Violence prevention — also inside shelters' } },
]

export type Signal = { n: number; level: 'low' | 'mid' | 'high' | 'extreme' | 'comm'; name: T; meaning: T; action: T }

export const maritimeSignals: Signal[] = [
  { n: 1, level: 'low', name: { bn: 'দূরবর্তী সতর্ক সংকেত', en: 'Distant Cautionary' }, meaning: { bn: 'দূর সাগরে একটি ঝড়ো হাওয়ার অঞ্চল তৈরি হয়েছে, যা ঝড়ে পরিণত হতে পারে।', en: 'A squally area has formed far out at sea and may become a storm.' }, action: { bn: 'আবহাওয়ার খবর নিয়মিত শুনুন। মাছ ধরার নৌকা উপকূলের কাছাকাছি থাকুক।', en: 'Follow weather news. Fishing boats should stay near the coast.' } },
  { n: 2, level: 'low', name: { bn: 'দূরবর্তী হুঁশিয়ারি সংকেত', en: 'Distant Warning' }, meaning: { bn: 'গভীর সাগরে ঝড় সৃষ্টি হয়েছে। বন্দর ছেড়ে যাওয়া জাহাজ পথে বিপদে পড়তে পারে।', en: 'A storm has formed in the deep sea. Departing ships may meet danger.' }, action: { bn: 'জরুরি কিট পরীক্ষা করুন, মোবাইল ও পাওয়ার ব্যাংক চার্জ দিন।', en: 'Check your emergency kit, charge phone and power bank.' } },
  { n: 3, level: 'mid', name: { bn: 'স্থানীয় সতর্ক সংকেত', en: 'Local Cautionary' }, meaning: { bn: 'বন্দর ঝড়ো আবহাওয়ার কবলে পড়তে পারে; ঝড়ো হাওয়া ঘণ্টায় ৪০–৫০ কিমি।', en: 'Port may face squally weather; gusts of 40–50 km/h.' }, action: { bn: 'মাছ ধরার নৌকা ও ট্রলার নিরাপদ আশ্রয়ে ফিরুন। শুকনো খাবার ও পানি সংরক্ষণ করুন।', en: 'Boats and trawlers return to safe shelter. Store dry food and water.' } },
  { n: 4, level: 'mid', name: { bn: 'স্থানীয় হুঁশিয়ারি সংকেত', en: 'Local Warning' }, meaning: { bn: 'বন্দর ঝড়ের কবলে পড়তে পারে; বাতাসের গতি ঘণ্টায় ৫১–৬১ কিমি।', en: 'Port is threatened by a storm; wind 51–61 km/h.' }, action: { bn: 'নিকটতম আশ্রয়কেন্দ্রের পথ জেনে নিন। গুরুত্বপূর্ণ কাগজ পলিথিনে মুড়িয়ে রাখুন।', en: 'Know the route to your nearest shelter. Wrap important documents in plastic.' } },
  { n: 5, level: 'high', name: { bn: 'বিপদ সংকেত (৫)', en: 'Danger Signal (5)' }, meaning: { bn: 'অল্প বা মাঝারি তীব্রতার ঘূর্ণিঝড় (ঘণ্টায় ৬২–৮৮ কিমি) বন্দরের দক্ষিণ/পূর্ব দিক দিয়ে উপকূল অতিক্রম করতে পারে।', en: 'Storm of 62–88 km/h may cross the coast south/east of the port.' }, action: { bn: 'শিশু, বয়স্ক, গর্ভবতী ও প্রতিবন্ধী ব্যক্তিদের আগে আশ্রয়কেন্দ্রে নিন।', en: 'Move children, elderly, pregnant women and persons with disabilities to shelter first.' } },
  { n: 6, level: 'high', name: { bn: 'বিপদ সংকেত (৬)', en: 'Danger Signal (6)' }, meaning: { bn: 'একই তীব্রতার ঘূর্ণিঝড় বন্দরের উত্তর/পশ্চিম দিক দিয়ে উপকূল অতিক্রম করতে পারে।', en: 'Storm of similar strength may cross the coast north/west of the port.' }, action: { bn: 'স্থানীয় প্রশাসন ও CPP স্বেচ্ছাসেবকদের নির্দেশ মেনে আশ্রয়ের প্রস্তুতি নিন।', en: 'Follow local authority and CPP volunteer instructions; prepare to evacuate.' } },
  { n: 7, level: 'high', name: { bn: 'বিপদ সংকেত (৭)', en: 'Danger Signal (7)' }, meaning: { bn: 'ঘূর্ণিঝড় বন্দরের উপর বা কাছ দিয়ে উপকূল অতিক্রম করতে পারে।', en: 'Storm may cross the coast over or near the port.' }, action: { bn: 'দেরি না করে আশ্রয়কেন্দ্রে যান। গবাদিপশু উঁচু স্থানে/মাটির কিল্লায় রাখুন।', en: 'Go to shelter without delay. Move livestock to high ground / mati’r killa.' } },
  { n: 8, level: 'extreme', name: { bn: 'মহাবিপদ সংকেত (৮)', en: 'Great Danger (8)' }, meaning: { bn: 'প্রবল ঘূর্ণিঝড় (ঘণ্টায় ৮৯ কিমি বা বেশি) বন্দরের দক্ষিণ/পূর্ব দিক দিয়ে অতিক্রম করবে।', en: 'Severe cyclone (89+ km/h) will cross south/east of the port.' }, action: { bn: 'অবিলম্বে আশ্রয়কেন্দ্রে অবস্থান করুন। জলোচ্ছ্বাসের ঝুঁকি — কেউ বাড়িতে থাকবেন না।', en: 'Stay in a cyclone shelter now. Storm-surge risk — nobody stays home.' } },
  { n: 9, level: 'extreme', name: { bn: 'মহাবিপদ সংকেত (৯)', en: 'Great Danger (9)' }, meaning: { bn: 'প্রবল ঘূর্ণিঝড় বন্দরের উত্তর/পশ্চিম দিক দিয়ে অতিক্রম করবে।', en: 'Severe cyclone will cross north/west of the port.' }, action: { bn: 'আশ্রয়কেন্দ্রের ভিতরে থাকুন, ঝড় থেমে গেলেও ঘোষণা না পাওয়া পর্যন্ত বের হবেন না (চোখ অতিক্রমের পর আবার বাতাস আসে)।', en: 'Stay inside the shelter until the all-clear — winds return after the eye passes.' } },
  { n: 10, level: 'extreme', name: { bn: 'মহাবিপদ সংকেত (১০)', en: 'Great Danger (10)' }, meaning: { bn: 'প্রবল ঘূর্ণিঝড় বন্দরের উপর বা খুব কাছ দিয়ে অতিক্রম করবে।', en: 'Severe cyclone will cross over or very near the port.' }, action: { bn: 'সর্বোচ্চ সতর্কতা। আশ্রয়কেন্দ্রে থাকুন, ৯৯৯-এ জরুরি প্রয়োজনে কল দিন।', en: 'Highest alert. Stay sheltered; call 999 in an emergency.' } },
  { n: 11, level: 'comm', name: { bn: 'যোগাযোগ বিচ্ছিন্ন সংকেত', en: 'Communication Failure' }, meaning: { bn: 'আবহাওয়া অফিসের সাথে যোগাযোগ বিচ্ছিন্ন; স্থানীয় কর্মকর্তা আবহাওয়াকে দুর্যোগপূর্ণ মনে করছেন।', en: 'Contact with the Met office is lost; local officials judge the weather dangerous.' }, action: { bn: 'সবচেয়ে খারাপ পরিস্থিতি ধরে নিয়ে নিরাপদ আশ্রয়ে থাকুন।', en: 'Assume the worst and stay in a safe shelter.' } },
]

export const riverSignals: Signal[] = [
  { n: 1, level: 'mid', name: { bn: 'নৌ সতর্ক সংকেত', en: 'River Cautionary' }, meaning: { bn: 'নদীবন্দর এলাকায় ঝড়ো হাওয়ার সম্ভাবনা।', en: 'Squally winds possible in the river port area.' }, action: { bn: 'নৌযান সাবধানে চলাচল করুক; লাইফ জ্যাকেট পরুন।', en: 'Vessels move with caution; wear life jackets.' } },
  { n: 2, level: 'high', name: { bn: 'নৌ হুঁশিয়ারি সংকেত', en: 'River Warning' }, meaning: { bn: 'ঝড়ের সম্ভাবনা; ছোট নৌযানের জন্য বিপজ্জনক।', en: 'Storm likely; dangerous for small vessels.' }, action: { bn: '৬৫ ফুট বা তার ছোট লঞ্চ/নৌকা নিরাপদ আশ্রয়ে যাবে।', en: 'Launches/boats 65 ft or shorter must go to shelter.' } },
  { n: 3, level: 'extreme', name: { bn: 'নৌ বিপদ সংকেত', en: 'River Danger' }, meaning: { bn: 'ঝড় শিগগিরই এলাকায় আঘাত হানবে।', en: 'A storm will soon hit the area.' }, action: { bn: 'সব ধরনের নৌযান নিরাপদ আশ্রয়ে যাবে; নদী পারাপার বন্ধ।', en: 'All vessels take shelter; stop river crossings.' } },
  { n: 4, level: 'extreme', name: { bn: 'নৌ মহাবিপদ সংকেত', en: 'River Great Danger' }, meaning: { bn: 'প্রবল ঘূর্ণিঝড় শিগগিরই আঘাত হানবে।', en: 'A violent storm will strike soon.' }, action: { bn: 'সব নৌযান অবিলম্বে নিরাপদ আশ্রয়ে; যাত্রীরা তীরে নিরাপদ স্থানে যান।', en: 'All vessels take shelter immediately; passengers move to safe ground.' } },
]

export type Hazard = { id: string; icon: string; name: T; color: string; before: T[]; during: T[]; after: T[] }

export const hazards: Hazard[] = [
  {
    id: 'flood', icon: 'Waves', color: 'sky', name: { bn: 'বন্যা', en: 'Flood' },
    before: [
      { bn: 'টিউবওয়েলের মুখ উঁচু করুন, যাতে বন্যার পানি না ঢোকে।', en: 'Raise your tubewell platform so floodwater cannot enter.' },
      { bn: 'চিড়া, মুড়ি, গুড়, বিস্কুট ও খাবার স্যালাইন ৭ দিনের জন্য রাখুন।', en: 'Store 7 days of chira, muri, molasses, biscuits and ORS.' },
      { bn: 'জন্মনিবন্ধন, জমির দলিল, সার্টিফিকেট পলিথিনে মুড়ে উঁচুতে রাখুন।', en: 'Seal birth certificates, land deeds and certificates in plastic, keep them high.' },
      { bn: 'বাড়ির পাশে উঁচু স্থান/আশ্রয়কেন্দ্র ও যাওয়ার পথ চিনে রাখুন।', en: 'Identify nearby high ground / shelter and the route to it.' },
    ],
    during: [
      { bn: 'বিদ্যুতের মেইন সুইচ বন্ধ করুন; ভেজা হাতে সুইচ ধরবেন না।', en: 'Switch off the mains; never touch switches with wet hands.' },
      { bn: 'স্রোতের পানিতে হাঁটবেন না — ৬ ইঞ্চি স্রোতও মানুষকে ফেলে দিতে পারে।', en: 'Never walk in moving water — 6 inches of current can knock you down.' },
      { bn: 'শিশুদের চোখে চোখে রাখুন; বাংলাদেশে বন্যায় শিশু মৃত্যুর বড় কারণ পানিতে ডোবা।', en: 'Watch children constantly — drowning is a leading cause of child deaths in floods.' },
      { bn: 'পানি ফুটিয়ে বা পানি বিশুদ্ধকরণ ট্যাবলেট দিয়ে পান করুন।', en: 'Drink only boiled water or water treated with purification tablets.' },
    ],
    after: [
      { bn: 'টিউবওয়েল ও কুয়া জীবাণুমুক্ত না করে পানি পান করবেন না।', en: 'Disinfect tubewells and wells before drinking.' },
      { bn: 'ডায়রিয়া হলে সাথে সাথে খাবার স্যালাইন খাওয়ান, ১৬২৬৩-এ পরামর্শ নিন।', en: 'For diarrhoea give ORS immediately and call 16263 for advice.' },
      { bn: 'সাপ ও বিচ্ছু থেকে সাবধান — পানি নামার পর ঘরে লুকিয়ে থাকতে পারে।', en: 'Beware of snakes hiding indoors as water recedes.' },
    ],
  },
  {
    id: 'cyclone', icon: 'Tornado', color: 'violet', name: { bn: 'ঘূর্ণিঝড় ও জলোচ্ছ্বাস', en: 'Cyclone & Storm Surge' },
    before: [
      { bn: 'সংকেত বুঝুন: ৫–৭ বিপদ, ৮–১০ মহাবিপদ। “সংকেত” ট্যাবে বিস্তারিত দেখুন।', en: 'Know the signals: 5–7 Danger, 8–10 Great Danger. See the Signals tab.' },
      { bn: 'ঘরের চাল দড়ি দিয়ে খুঁটির সাথে শক্ত করে বাঁধুন।', en: 'Tie your roof firmly to the posts with rope.' },
      { bn: 'শুকনো খাবার, পানি, টর্চ, রেডিও ও ওষুধ একটি ব্যাগে রাখুন।', en: 'Pack dry food, water, torch, radio and medicine in one bag.' },
    ],
    during: [
      { bn: 'আশ্রয়কেন্দ্রে যান — পথে গাছ ও বিদ্যুতের খুঁটি থেকে দূরে থাকুন।', en: 'Go to the shelter — keep away from trees and power poles on the way.' },
      { bn: 'ঝড় থেমে গেলেই বের হবেন না; চোখ অতিক্রমের পর উল্টো দিক থেকে প্রবল বাতাস আসে।', en: 'A sudden calm may be the eye — strong winds return from the opposite side.' },
      { bn: 'রেডিও/মোবাইলে সরকারি ঘোষণা শুনুন; গুজবে কান দেবেন না।', en: 'Listen to official announcements on radio/phone; ignore rumours.' },
    ],
    after: [
      { bn: 'ঝুলে থাকা বিদ্যুতের তার ছোঁবেন না, ৯৯৯ বা পল্লী বিদ্যুৎ অফিসে জানান।', en: 'Never touch fallen power lines; report to 999 or the power office.' },
      { bn: 'আহতদের প্রাথমিক চিকিৎসা দিন, নিখোঁজদের তথ্য স্বেচ্ছাসেবকদের দিন।', en: 'Give first aid and report missing persons to volunteers.' },
      { bn: 'লবণাক্ত পানি পুকুরে ঢুকলে সেই পানি পান করবেন না।', en: 'Do not drink pond water contaminated by salt-water surge.' },
    ],
  },
  {
    id: 'lightning', icon: 'Zap', color: 'amber', name: { bn: 'বজ্রপাত', en: 'Lightning' },
    before: [
      { bn: 'এপ্রিল–জুন বজ্রপাতের মৌসুম — আকাশে কালো মেঘ দেখলে খোলা মাঠ থেকে সরে যান।', en: 'April–June is peak season — leave open fields when dark clouds gather.' },
      { bn: '৩০-৩০ নিয়ম: বিদ্যুৎ চমকানোর ৩০ সেকেন্ডের মধ্যে গর্জন শুনলে ঘরে যান; শেষ গর্জনের ৩০ মিনিট পর বের হন।', en: '30-30 rule: if thunder follows the flash within 30 s, go indoors; wait 30 min after the last thunder.' },
    ],
    during: [
      { bn: 'পাকা দালানে আশ্রয় নিন; গাছের নিচে, টিনের চালার নিচে বা পানিতে থাকবেন না।', en: 'Shelter in a concrete building; avoid trees, tin sheds and water bodies.' },
      { bn: 'খোলা জায়গায় আটকে গেলে পায়ের আঙুলে ভর দিয়ে কানে হাত চেপে নিচু হয়ে বসুন।', en: 'If caught outside, crouch low on the balls of your feet and cover your ears.' },
      { bn: 'মোবাইল চার্জে লাগিয়ে কথা বলবেন না; টিভি-ফ্রিজের প্লাগ খুলে রাখুন।', en: 'Don’t use a phone while charging; unplug TV and fridge.' },
    ],
    after: [
      { bn: 'বজ্রাহত ব্যক্তিকে ধরলে বিদ্যুতায়িত হবেন না — দ্রুত CPR দিন ও হাসপাতালে নিন।', en: 'Lightning victims carry no charge — start CPR quickly and take them to hospital.' },
    ],
  },
  {
    id: 'heat', icon: 'Sun', color: 'orange', name: { bn: 'তাপপ্রবাহ', en: 'Heatwave' },
    before: [
      { bn: 'ঘরে বাতাস চলাচলের ব্যবস্থা রাখুন, পর্যাপ্ত পানি সংরক্ষণ করুন।', en: 'Keep rooms ventilated and store enough drinking water.' },
    ],
    during: [
      { bn: 'দুপুর ১২টা–৩টা রোদে কাজ এড়িয়ে চলুন; হালকা রঙের ঢিলা সুতি কাপড় পরুন।', en: 'Avoid outdoor work 12–3 pm; wear light, loose cotton clothes.' },
      { bn: 'তৃষ্ণা না পেলেও বারবার পানি ও খাবার স্যালাইন পান করুন।', en: 'Drink water and ORS often, even if not thirsty.' },
      { bn: 'হিটস্ট্রোকের লক্ষণ: মাথা ঘোরা, ত্বক গরম ও শুকনো, বিভ্রান্তি — দ্রুত ছায়ায় নিয়ে শরীর ভেজান।', en: 'Heatstroke signs: dizziness, hot dry skin, confusion — move to shade, cool the body.' },
    ],
    after: [
      { bn: 'শিশু, বয়স্ক ও রিকশাচালকদের মতো ঝুঁকিপূর্ণ মানুষদের খোঁজ নিন।', en: 'Check on children, elderly and outdoor workers like rickshaw pullers.' },
    ],
  },
  {
    id: 'quake', icon: 'Activity', color: 'rose', name: { bn: 'ভূমিকম্প', en: 'Earthquake' },
    before: [
      { bn: 'ভারী আলমারি দেয়ালের সাথে আটকে রাখুন; গ্যাসের চুলা বন্ধ রাখার অভ্যাস করুন।', en: 'Anchor heavy furniture to walls; keep the gas stove off when not used.' },
      { bn: 'পরিবারের সাথে “Drop, Cover, Hold On” মহড়া দিন।', en: 'Practise “Drop, Cover, Hold On” with your family.' },
    ],
    during: [
      { bn: 'নিচু হোন, মজবুত টেবিলের নিচে ঢুকুন, শক্ত করে ধরে থাকুন।', en: 'Drop, take cover under a sturdy table, and hold on.' },
      { bn: 'লিফট ব্যবহার করবেন না; উঁচু ভবন থেকে লাফ দেবেন না।', en: 'Never use the lift; never jump from tall buildings.' },
    ],
    after: [
      { bn: 'গ্যাসের গন্ধ পেলে আগুন জ্বালাবেন না, খোলা মাঠে চলে যান।', en: 'If you smell gas, no flames — move to an open space.' },
      { bn: 'আফটারশকের জন্য প্রস্তুত থাকুন; ফাটল ধরা ভবনে ঢুকবেন না।', en: 'Expect aftershocks; do not enter cracked buildings.' },
    ],
  },
]

export const kitItems: { id: string; t: T; cat: 'food' | 'health' | 'tools' | 'docs' }[] = [
  { id: 'water', cat: 'food', t: { bn: 'খাবার পানি (জনপ্রতি দিনে ৩ লিটার)', en: 'Drinking water (3 L per person/day)' } },
  { id: 'dryfood', cat: 'food', t: { bn: 'চিড়া, মুড়ি, গুড়, বিস্কুট', en: 'Chira, muri, molasses, biscuits' } },
  { id: 'babyfood', cat: 'food', t: { bn: 'শিশুখাদ্য (প্রয়োজনে)', en: 'Baby food (if needed)' } },
  { id: 'tablet', cat: 'food', t: { bn: 'পানি বিশুদ্ধকরণ ট্যাবলেট', en: 'Water purification tablets' } },
  { id: 'ors', cat: 'health', t: { bn: 'খাবার স্যালাইন (ORS)', en: 'Oral saline (ORS)' } },
  { id: 'meds', cat: 'health', t: { bn: 'প্রয়োজনীয় ওষুধ ও প্রেসক্রিপশন', en: 'Regular medicines & prescriptions' } },
  { id: 'firstaid', cat: 'health', t: { bn: 'প্রাথমিক চিকিৎসা বাক্স', en: 'First-aid box' } },
  { id: 'pads', cat: 'health', t: { bn: 'স্যানিটারি প্যাড ও সাবান', en: 'Sanitary pads & soap' } },
  { id: 'torch', cat: 'tools', t: { bn: 'টর্চ ও অতিরিক্ত ব্যাটারি', en: 'Torch & spare batteries' } },
  { id: 'radio', cat: 'tools', t: { bn: 'ব্যাটারিচালিত রেডিও', en: 'Battery-powered radio' } },
  { id: 'powerbank', cat: 'tools', t: { bn: 'চার্জ দেওয়া পাওয়ার ব্যাংক', en: 'Charged power bank' } },
  { id: 'whistle', cat: 'tools', t: { bn: 'বাঁশি (উদ্ধারকারীর দৃষ্টি আকর্ষণে)', en: 'Whistle (to alert rescuers)' } },
  { id: 'rope', cat: 'tools', t: { bn: 'দড়ি, ম্যাচ/লাইটার, পলিথিন', en: 'Rope, matches/lighter, polythene sheet' } },
  { id: 'nid', cat: 'docs', t: { bn: 'NID/জন্মনিবন্ধনের ফটোকপি (পলিথিনে)', en: 'NID/birth certificate copies (sealed)' } },
  { id: 'cash', cat: 'docs', t: { bn: 'নগদ টাকা ও বিকাশ/নগদ পিন মনে রাখা', en: 'Cash, and remember mobile-wallet PIN' } },
  { id: 'contacts', cat: 'docs', t: { bn: 'কাগজে লেখা জরুরি ফোন নম্বর', en: 'Emergency numbers written on paper' } },
]

export type Shelter = { id: string; name: T; district: T; upazila: T; lat: number; lng: number; type: 'cyclone' | 'flood' }

const s = (id: string, bnU: string, enU: string, bnD: string, enD: string, lat: number, lng: number, type: 'cyclone' | 'flood'): Shelter => ({
  id, lat, lng, type,
  upazila: { bn: bnU, en: enU }, district: { bn: bnD, en: enD },
  name: type === 'cyclone'
    ? { bn: `${bnU} উপজেলা সদর বহুমুখী ঘূর্ণিঝড় আশ্রয়কেন্দ্র`, en: `${enU} Upazila Sadar Multipurpose Cyclone Shelter` }
    : { bn: `${bnU} উপজেলা সদর বন্যা আশ্রয়কেন্দ্র`, en: `${enU} Upazila Sadar Flood Shelter` },
})

// Demo dataset: points are approximate upazila-headquarter coordinates, NOT verified shelter
// addresses. Replace with official DDM / Union Parishad lists before real-world use.
export const shelters: Shelter[] = [
  s('cxb', 'কক্সবাজার সদর', "Cox's Bazar Sadar", 'কক্সবাজার', "Cox's Bazar", 21.4272, 92.0058, 'cyclone'),
  s('tek', 'টেকনাফ', 'Teknaf', 'কক্সবাজার', "Cox's Bazar", 20.8624, 92.298, 'cyclone'),
  s('mhk', 'মহেশখালী', 'Maheshkhali', 'কক্সবাজার', "Cox's Bazar", 21.55, 91.95, 'cyclone'),
  s('ktb', 'কুতুবদিয়া', 'Kutubdia', 'কক্সবাজার', "Cox's Bazar", 21.8167, 91.8583, 'cyclone'),
  s('bns', 'বাঁশখালী', 'Banshkhali', 'চট্টগ্রাম', 'Chattogram', 22.03, 91.95, 'cyclone'),
  s('snd', 'সন্দ্বীপ', 'Sandwip', 'চট্টগ্রাম', 'Chattogram', 22.49, 91.46, 'cyclone'),
  s('hty', 'হাতিয়া', 'Hatiya', 'নোয়াখালী', 'Noakhali', 22.36, 91.11, 'cyclone'),
  s('bhl', 'ভোলা সদর', 'Bhola Sadar', 'ভোলা', 'Bhola', 22.6859, 90.6482, 'cyclone'),
  s('chf', 'চরফ্যাশন', 'Char Fasson', 'ভোলা', 'Bhola', 22.19, 90.76, 'cyclone'),
  s('mnp', 'মনপুরা', 'Manpura', 'ভোলা', 'Bhola', 22.28, 90.95, 'cyclone'),
  s('klp', 'কলাপাড়া', 'Kalapara', 'পটুয়াখালী', 'Patuakhali', 21.99, 90.24, 'cyclone'),
  s('glc', 'গলাচিপা', 'Galachipa', 'পটুয়াখালী', 'Patuakhali', 22.16, 90.42, 'cyclone'),
  s('brg', 'বরগুনা সদর', 'Barguna Sadar', 'বরগুনা', 'Barguna', 22.15, 90.12, 'cyclone'),
  s('ptg', 'পাথরঘাটা', 'Patharghata', 'বরগুনা', 'Barguna', 22.04, 89.97, 'cyclone'),
  s('mtb', 'মঠবাড়িয়া', 'Mathbaria', 'পিরোজপুর', 'Pirojpur', 22.29, 89.96, 'cyclone'),
  s('srk', 'শরণখোলা', 'Sharankhola', 'বাগেরহাট', 'Bagerhat', 22.31, 89.78, 'cyclone'),
  s('mng', 'মোংলা', 'Mongla', 'বাগেরহাট', 'Bagerhat', 22.49, 89.6, 'cyclone'),
  s('kyr', 'কয়রা', 'Koyra', 'খুলনা', 'Khulna', 22.34, 89.3, 'cyclone'),
  s('dcp', 'দাকোপ', 'Dacope', 'খুলনা', 'Khulna', 22.57, 89.51, 'cyclone'),
  s('shy', 'শ্যামনগর', 'Shyamnagar', 'সাতক্ষীরা', 'Satkhira', 22.33, 89.1, 'cyclone'),
  s('sun', 'সুনামগঞ্জ সদর', 'Sunamganj Sadar', 'সুনামগঞ্জ', 'Sunamganj', 25.0658, 91.395, 'flood'),
  s('cmp', 'কোম্পানীগঞ্জ', 'Companiganj', 'সিলেট', 'Sylhet', 25.06, 91.75, 'flood'),
  s('kur', 'কুড়িগ্রাম সদর', 'Kurigram Sadar', 'কুড়িগ্রাম', 'Kurigram', 25.8054, 89.6362, 'flood'),
  s('chl', 'চিলমারী', 'Chilmari', 'কুড়িগ্রাম', 'Kurigram', 25.56, 89.69, 'flood'),
  s('flc', 'ফুলছড়ি', 'Fulchhari', 'গাইবান্ধা', 'Gaibandha', 25.18, 89.62, 'flood'),
  s('isl', 'ইসলামপুর', 'Islampur', 'জামালপুর', 'Jamalpur', 25.08, 89.8, 'flood'),
  s('kzp', 'কাজীপুর', 'Kazipur', 'সিরাজগঞ্জ', 'Sirajganj', 24.63, 89.65, 'flood'),
  s('prs', 'পরশুরাম', 'Parshuram', 'ফেনী', 'Feni', 23.21, 91.44, 'flood'),
]
