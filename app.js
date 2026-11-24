{
/* ============================ Негізгі баптаулар ============================ */
const cfg = window.SITE_CONFIG || {};
const DEMO = !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || !window.supabase;
const sb = DEMO ? null : window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => (Number(n) || 0).toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₸';

/* ============================ Тілдер ============================ */
const T = {
  kk: {
    catalog: 'Бағалар', cabinet: 'Кабинет', admin: 'Админ', login: 'Кіру', logout: 'Шығу', register: 'Тіркелу',
    heroT: 'Презентация, реферат, сабақ жоспары — жасап береміз',
    heroP: 'Мұғалімдерге, оқушыларға, студенттерге және магистранттарға сапалы жұмыс. WhatsApp-қа жазасыз, Kaspi арқылы төлейсіз — дайын жұмыс жеке кабинетіңізде ашылады.',
    toCatalog: 'Бағаларды көру', order: 'Тапсырыс беру', pricesP: 'Тапсырыс WhatsApp арқылы қабылданады. Тақырыбын, мерзімін жазыңыз — бәрін келісеміз.', deal: 'Келісім бойынша', calcQ: 'Неше керек?', askWa: 'WhatsApp-қа жазу', waHi: 'Сәлеметсіз бе! Тапсырыс бергім келеді:', start: 'Тіркелу — тегін',
    whoT: 'Сіз кімсіз?', whoP: 'Таңдаңыз — сізге лайықты жұмыс жасауға көмектеседі.', from: 'бастап',
    newT: 'Бағалар', all: 'Толығырақ',
    s1T: 'WhatsApp-қа жазыңыз', s1P: 'Не керек екенін, тақырыбын және мерзімін айтыңыз.',
    s2T: 'Kaspi-ге төлеңіз', s2P: 'Бағасын келісіп, Kaspi арқылы аударым жасайсыз.',
    s3T: 'Кабинеттен ашыңыз', s3P: 'Сайтқа тіркеліңіз — дайын жұмыс жеке кабинетіңізде ашылады.',
    search: 'Іздеу: тақырып, пән…', anyKind: 'Барлық түрі', anyLevel: 'Барлық деңгей', anySubject: 'Барлық пән',
    sortNew: 'Алдымен жаңалары', sortCheap: 'Арзанынан', sortExp: 'Қымбатынан',
    nothing: 'Ештеңе табылмады', back: 'Артқа',
    buy: 'Сатып алу', open: 'Ашу', pending: 'Төлем тексерілуде', paid: 'Ашық', rejected: 'Қабылданбады',
    pages: 'бет', pagesL: 'Бет саны', forWhom: 'Кімге арналған', subject: 'Пән',
    email: 'Email', password: 'Құпиясөз', name: 'Аты-жөніңіз', phone: 'Телефон (міндетті емес)',
    noAcc: 'Аккаунтыңыз жоқ па?', haveAcc: 'Аккаунтыңыз бар ма?', forgot: 'Құпиясөзді ұмыттыңыз ба?',
    checkMail: 'Поштаңызды тексеріңіз — растау сілтемесі жіберілді.', resetSent: 'Құпиясөзді қалпына келтіру сілтемесі жіберілді.',
    welcome: 'Қош келдіңіз!', saved: 'Сақталды', err: 'Қате шықты',
    roleT: 'Сіз кімсіз?', roleP: 'Бір рет таңдаңыз — кейін кабинетте өзгертуге болады.',
    payT: 'Kaspi арқылы төлеу', payP: 'Осы нөмірге аударым жасаңыз:', payNote: 'Аударымдағы атыңыз (тексеру үшін)',
    payDone: 'Төледім', payAfter: 'Рахмет! Төлем тексерілген соң жұмыс кабинетіңізде ашылады.',
    myWorks: 'Менің жұмыстарым', noWorks: 'Әзірге жұмыс жоқ. Тапсырыс берсеңіз, дайын жұмыс осында ашылады.', profile: 'Профиль', save: 'Сақтау', role: 'Мәртебе',
    reqs: 'Өтінімдер', works: 'Жұмыстар', users: 'Қолданушылар', add: 'Жаңа жұмыс', edit: 'Өзгерту', del: 'Өшіру',
    approve: 'Төленді', reject: 'Бас тарту', grant: 'Доступ беру', choose: 'Жұмысты таңдаңыз',
    tKk: 'Атауы (қазақша)', tRu: 'Атауы (орысша)', dKk: 'Сипаттама (қазақша)', dRu: 'Сипаттама (орысша)',
    kind: 'Түрі', price: 'Бағасы, ₸', levels: 'Кімге', cover: 'Мұқаба суреті', link: 'Жұмыс сілтемесі (Canva, Google Drive, т.б.)',
    file: 'немесе файл (PDF, PPTX, DOCX)', published: 'Каталогта көрінеді', hidden: 'Жасырын',
    confirmDel: 'Шынымен өшіресіз бе?', newPw: 'Жаңа құпиясөз', setPw: 'Құпиясөзді жаңарту',
    demo: 'Демо режим: база әлі қосылмаған. Кез келген email-мен кіріңіз; «admin» деп басталса — админ панель ашылады.', works2: 'Тапсырыс жұмыстары', worksHint: 'Мұнда клиенттерге арналған дайын жұмыстарды қосасыз. Олар ешкімге көрінбейді — тек «Қолданушылар» бөлімінде доступ берген адамның кабинетінде ашылады.',
    foot: 'Сұрақтар бойынша WhatsApp:', loginFirst: 'Алдымен аккаунтқа кіріңіз', noContent: 'Жұмыс әлі жүктелмеген, админге жазыңыз.',
    date: 'Күні', who: 'Кім', work: 'Жұмыс', status: 'Күйі', bought: 'Сатып алғаны'
  },
  ru: {
    catalog: 'Цены', cabinet: 'Кабинет', admin: 'Админ', login: 'Войти', logout: 'Выйти', register: 'Регистрация',
    heroT: 'Презентации, рефераты, планы уроков — сделаем для вас',
    heroP: 'Качественные работы для учителей, школьников, студентов и магистрантов. Пишете в WhatsApp, оплачиваете через Kaspi — готовая работа откроется в личном кабинете.',
    toCatalog: 'Посмотреть цены', order: 'Заказать', pricesP: 'Заказы принимаем в WhatsApp. Напишите тему и срок — всё обсудим.', deal: 'Договорная', calcQ: 'Сколько нужно?', askWa: 'Написать в WhatsApp', waHi: 'Здравствуйте! Хочу заказать:', start: 'Регистрация — бесплатно',
    whoT: 'Кто вы?', whoP: 'Выберите — так мы сделаем работу под ваш уровень.', from: 'от',
    newT: 'Цены', all: 'Подробнее',
    s1T: 'Напишите в WhatsApp', s1P: 'Расскажите, что нужно: тема и срок.',
    s2T: 'Оплатите через Kaspi', s2P: 'Согласуем цену, вы переводите на Kaspi.',
    s3T: 'Откройте в кабинете', s3P: 'Зарегистрируйтесь — готовая работа откроется в личном кабинете.',
    search: 'Поиск: тема, предмет…', anyKind: 'Все типы', anyLevel: 'Все уровни', anySubject: 'Все предметы',
    sortNew: 'Сначала новые', sortCheap: 'Сначала дешёвые', sortExp: 'Сначала дорогие',
    nothing: 'Ничего не найдено', back: 'Назад',
    buy: 'Купить', open: 'Открыть', pending: 'Оплата проверяется', paid: 'Открыто', rejected: 'Отклонено',
    pages: 'стр.', pagesL: 'Кол-во страниц', forWhom: 'Для кого', subject: 'Предмет',
    email: 'Email', password: 'Пароль', name: 'Имя и фамилия', phone: 'Телефон (необязательно)',
    noAcc: 'Нет аккаунта?', haveAcc: 'Уже есть аккаунт?', forgot: 'Забыли пароль?',
    checkMail: 'Проверьте почту — мы отправили ссылку для подтверждения.', resetSent: 'Ссылка для восстановления пароля отправлена.',
    welcome: 'Добро пожаловать!', saved: 'Сохранено', err: 'Произошла ошибка',
    roleT: 'Кто вы?', roleP: 'Выберите один раз — потом можно изменить в кабинете.',
    payT: 'Оплата через Kaspi', payP: 'Переведите на этот номер:', payNote: 'Ваше имя в переводе (для проверки)',
    payDone: 'Я оплатил(а)', payAfter: 'Спасибо! После проверки оплаты работа откроется в кабинете.',
    myWorks: 'Мои работы', noWorks: 'Пока нет работ. Когда закажете, готовая работа появится здесь.', profile: 'Профиль', save: 'Сохранить', role: 'Статус',
    reqs: 'Заявки', works: 'Работы', users: 'Пользователи', add: 'Новая работа', edit: 'Изменить', del: 'Удалить',
    approve: 'Оплачено', reject: 'Отклонить', grant: 'Дать доступ', choose: 'Выберите работу',
    tKk: 'Название (на казахском)', tRu: 'Название (на русском)', dKk: 'Описание (на казахском)', dRu: 'Описание (на русском)',
    kind: 'Тип', price: 'Цена, ₸', levels: 'Для кого', cover: 'Обложка', link: 'Ссылка на работу (Canva, Google Drive и т.д.)',
    file: 'или файл (PDF, PPTX, DOCX)', published: 'Видно в каталоге', hidden: 'Скрыто',
    confirmDel: 'Точно удалить?', newPw: 'Новый пароль', setPw: 'Обновить пароль',
    demo: 'Демо-режим: база ещё не подключена. Войдите с любым email; если он начинается с «admin» — откроется админ-панель.', works2: 'Работы клиентов', worksHint: 'Здесь вы добавляете готовые работы для клиентов. Их никто не видит — работа открывается только в кабинете того, кому вы дали доступ во вкладке «Пользователи».',
    foot: 'Вопросы в WhatsApp:', loginFirst: 'Сначала войдите в аккаунт', noContent: 'Работа ещё не загружена, напишите админу.',
    date: 'Дата', who: 'Кто', work: 'Работа', status: 'Статус', bought: 'Покупки'
  }
};
const ROLES = [
  { k: 'teacher', kk: 'Мұғалім', ru: 'Учитель', ic: 'board' },
  { k: 'school', kk: 'Мектеп оқушысы', ru: 'Школьник', ic: 'book' },
  { k: 'college', kk: 'Колледж студенті', ru: 'Студент колледжа', ic: 'pen' },
  { k: 'university', kk: 'ЖОО студенті', ru: 'Студент вуза', ic: 'cap' },
  { k: 'master', kk: 'Магистрант', ru: 'Магистрант', ic: 'scroll' },
  { k: 'phd', kk: 'Докторант', ru: 'Докторант', ic: 'star' }
];
const KINDS = [
  { k: 'presentation', kk: 'Презентация', ru: 'Презентация', c: ['#0a9fbf', '#36c3d9'] },
  { k: 'essay', kk: 'Реферат', ru: 'Реферат', c: ['#3157d5', '#6f8ff0'] },
  { k: 'lesson', kk: 'Сабақ жоспары', ru: 'План урока', c: ['#1f9d6b', '#55c793'] },
  { k: 'other', kk: 'Басқа', ru: 'Другое', c: ['#d9822b', '#f6b51e'] }
];
const ICONS = {
  board: '<path d="M3 4h18v12H3z"/><path d="M8 20l4-4 4 4"/>',
  book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  scroll: '<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V5"/><path d="M9 8h6M9 12h6"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  cart: '<path d="M3 4h2l2 12h11l2-8H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/>',
  open: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>'
};
const icon = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

let lang = 'kk';
try { lang = localStorage.getItem('lang') || 'kk' } catch (e) {}
const t = k => (T[lang] && T[lang][k]) || T.kk[k] || k;
const L = o => (o && (o[lang] || o.kk)) || '';
const titleOf = p => (lang === 'ru' && p.title_ru) ? p.title_ru : p.title_kk;
const descOf = p => (lang === 'ru' && p.desc_ru) ? p.desc_ru : (p.desc_kk || '');
const kindOf = k => KINDS.find(x => x.k === k) || KINDS[3];
const roleOf = k => ROLES.find(x => x.k === k);

/* ============================ Деректер қабаты ============================ */
function raise(r) { if (r.error) throw r.error; return r.data }
const real = {
  async user() { const { data } = await sb.auth.getSession(); return data.session ? data.session.user : null },
  async profile(id) { return raise(await sb.from('profiles').select('*').eq('id', id).maybeSingle()) },
  async updateProfile(id, patch) { raise(await sb.from('profiles').update(patch).eq('id', id)) },
  async signIn(email, password) { return raise(await sb.auth.signInWithPassword({ email, password })).user },
  async signUp(email, password, full_name) {
    return raise(await sb.auth.signUp({ email, password, options: { data: { full_name }, emailRedirectTo: location.origin + location.pathname } }));
  },
  async signOut() { await sb.auth.signOut() },
  async reset(email) { raise(await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname })) },
  async setPassword(password) { raise(await sb.auth.updateUser({ password })) },
  async products() { return raise(await sb.from('products').select('*').order('created_at', { ascending: false })) },
  async myPurchases(uid) { return raise(await sb.from('purchases').select('*, products(*)').eq('user_id', uid).order('created_at', { ascending: false })) },
  async request(uid, pid, note) { raise(await sb.from('purchases').insert({ user_id: uid, product_id: pid, payer_note: note })) },
  async content(pid) { return raise(await sb.from('product_content').select('*').eq('product_id', pid).maybeSingle()) },
  async fileUrl(path) { return raise(await sb.storage.from('works').createSignedUrl(path, 3600)).signedUrl },
  async allPurchases() { return raise(await sb.from('purchases').select('*, products(title_kk,title_ru,price), profiles(email,full_name,phone)').order('created_at', { ascending: false })) },
  async setStatus(id, status) { raise(await sb.from('purchases').update({ status }).eq('id', id)) },
  async users() { return raise(await sb.from('profiles').select('*').order('created_at', { ascending: false })) },
  async grant(uid, pid) { raise(await sb.from('purchases').upsert({ user_id: uid, product_id: pid, status: 'paid' }, { onConflict: 'user_id,product_id' })) },
  async upload(bucket, path, file) { raise(await sb.storage.from(bucket).upload(path, file, { upsert: true })); return bucket === 'covers' ? sb.storage.from(bucket).getPublicUrl(path).data.publicUrl : path },
  async saveProduct(p) {
    if (p.id) { const id = p.id; const rest = Object.assign({}, p); delete rest.id; raise(await sb.from('products').update(rest).eq('id', id)); return id }
    return raise(await sb.from('products').insert(p).select('id').single()).id;
  },
  async saveContent(c) { raise(await sb.from('product_content').upsert(c)) },
  async deleteProduct(id) { raise(await sb.from('products').delete().eq('id', id)) }
};

const demoDb = {
  products: [],
  content: {},
  purchases: [], users: [], me: null
};
const demo = {
  async user() { return demoDb.me },
  async profile(id) { return demoDb.users.find(u => u.id === id) || null },
  async updateProfile(id, patch) { Object.assign(demoDb.users.find(u => u.id === id), patch) },
  async signIn(email) { let u = demoDb.users.find(x => x.email === email); if (!u) { u = { id: 'u' + Date.now(), email, full_name: email.split('@')[0], role: null, is_admin: /^admin/i.test(email), created_at: new Date().toISOString() }; demoDb.users.push(u) } demoDb.me = { id: u.id, email }; return demoDb.me },
  async signUp(email, pw, name) { const u = await demo.signIn(email); demoDb.users.find(x => x.id === u.id).full_name = name; return { session: true } },
  async signOut() { demoDb.me = null },
  async reset() {}, async setPassword() {},
  async products() { return demoDb.products.slice() },
  async myPurchases(uid) { return demoDb.purchases.filter(p => p.user_id === uid).map(p => Object.assign({}, p, { products: demoDb.products.find(x => x.id === p.product_id) })) },
  async request(uid, pid, note) { if (demoDb.purchases.some(p => p.user_id === uid && p.product_id === pid)) throw new Error('duplicate'); demoDb.purchases.unshift({ id: 'p' + Date.now(), user_id: uid, product_id: pid, payer_note: note, status: 'pending', created_at: new Date().toISOString() }) },
  async content(pid) { return demoDb.content[pid] || null },
  async fileUrl() { return 'https://example.com' },
  async allPurchases() { return demoDb.purchases.map(p => Object.assign({}, p, { products: demoDb.products.find(x => x.id === p.product_id), profiles: demoDb.users.find(u => u.id === p.user_id) })) },
  async setStatus(id, status) { demoDb.purchases.find(p => p.id === id).status = status },
  async users() { return demoDb.users.slice() },
  async grant(uid, pid) { const e = demoDb.purchases.find(p => p.user_id === uid && p.product_id === pid); if (e) e.status = 'paid'; else demoDb.purchases.unshift({ id: 'p' + Date.now(), user_id: uid, product_id: pid, status: 'paid', created_at: new Date().toISOString() }) },
  async upload(bucket, path, file) { return bucket === 'covers' ? URL.createObjectURL(file) : path },
  async saveProduct(p) { if (p.id) { Object.assign(demoDb.products.find(x => x.id === p.id), p); return p.id } const id = 'd' + Date.now(); demoDb.products.unshift(Object.assign({ id, created_at: new Date().toISOString() }, p)); return id },
  async saveContent(c) { demoDb.content[c.product_id] = c },
  async deleteProduct(id) { demoDb.products = demoDb.products.filter(p => p.id !== id) }
};
const api = DEMO ? demo : real;

/* ============================ Күй ============================ */
const S = { user: null, profile: null, products: null, mine: [], filter: { q: '', kind: '', level: '', subject: '', sort: 'new' } };
const myStatus = pid => { const p = S.mine.find(x => x.product_id === pid); return p ? p.status : null };

async function loadMe() {
  S.user = await api.user();
  S.profile = S.user ? await api.profile(S.user.id) : null;
  S.mine = S.user ? await api.myPurchases(S.user.id) : [];
  if (S.profile && !S.filter.level && S.profile.role) S.filter.level = S.profile.role;
}
async function loadProducts(force) { if (!S.products || force) S.products = await api.products(); return S.products }

/* ============================ Көмекші UI ============================ */
function toast(msg, err) {
  const d = document.createElement('div'); d.className = 'toast' + (err ? ' err' : ''); d.textContent = msg;
  $('#toasts').appendChild(d); setTimeout(() => { d.style.transition = 'opacity .4s'; d.style.opacity = 0; setTimeout(() => d.remove(), 400) }, 3200);
}
function fail(e) { console.error(e); toast((e && e.message) ? e.message : t('err'), true) }
function openModal(html, onMount) {
  $('#modalCard').innerHTML = '<button class="x" data-close aria-label="×">×</button>' + html;
  $('#modal').hidden = false; document.body.style.overflow = 'hidden';
  if (onMount) onMount($('#modalCard'));
  const f = $('#modalCard input, #modalCard button:not(.x)'); if (f) f.focus();
}
function closeModal() { $('#modal').hidden = true; document.body.style.overflow = '' }
$('#modal').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal() });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal() });

function cover(p) {
  if (p.cover_url) return `<img src="${esc(p.cover_url)}" alt="" loading="lazy">`;
  const k = kindOf(p.kind);
  return `<div class="gcover" style="background:linear-gradient(135deg,${k.c[0]},${k.c[1]})"><small>${esc(L(k))}${p.subject ? ' · ' + esc(p.subject) : ''}</small><b>${esc(titleOf(p))}</b></div>`;
}
function statusTag(st) {
  if (st === 'paid') return `<span class="tag ok">${t('paid')}</span>`;
  if (st === 'pending') return `<span class="tag wait">${t('pending')}</span>`;
  if (st === 'rejected') return `<span class="tag no">${t('rejected')}</span>`;
  return '';
}
function card(p) {
  const st = myStatus(p.id);
  return `<a class="card rise" href="#/p/${encodeURIComponent(p.id)}">
    <div class="cv">${cover(p)}</div>
    <div class="bd">
      <div class="tags"><span class="tag sky">${esc(L(kindOf(p.kind)))}</span>${p.subject ? `<span class="tag">${esc(p.subject)}</span>` : ''}${p.published === false ? `<span class="tag no">${t('hidden')}</span>` : ''}</div>
      <h3>${esc(titleOf(p))}</h3>
      <div class="ft"><span class="price">${money(p.price)}</span>${statusTag(st) || `<span class="muted">${p.pages ? esc(p.pages) + ' ' + t('pages') : ''}</span>`}</div>
    </div></a>`;
}
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .08 }) : null;
function reveal() { $$('.rise:not(.in)').forEach((el, i) => { el.style.transitionDelay = Math.min(i, 8) * 60 + 'ms'; io ? io.observe(el) : el.classList.add('in') }) }
function mount(html) { const v = $('#view'); v.classList.remove('enter'); void v.offsetWidth; v.innerHTML = html; v.classList.add('enter'); window.scrollTo({ top: 0, behavior: 'smooth' }); reveal() }

/* ============================ Шапка ============================ */
function renderChrome() {
  document.documentElement.lang = lang;
  const name = cfg.SITE_NAME || 'Tez Kömek';
  const sp = name.indexOf(' ');
  $('#siteName').innerHTML = sp > 0 ? `<span class="tz">${esc(name.slice(0, sp))}</span>${esc(name.slice(sp))}` : esc(name); $('#footName').textContent = '© ' + new Date().getFullYear() + ' ' + name; document.title = name;
  $('#footText').innerHTML = cfg.WHATSAPP ? `${t('foot')} <a href="https://wa.me/${esc(cfg.WHATSAPP)}" target="_blank" rel="noopener">${esc(cfg.WHATSAPP_SHOW || '+' + cfg.WHATSAPP)}</a>` : '';
  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  const r = location.hash || '#/';
  const links = [['#/prices', t('catalog')]];
  if (S.user) links.push(['#/cabinet', t('cabinet')]);
  if (S.profile && S.profile.is_admin) links.push(['#/admin', t('admin')]);
  const nav = links.map(([h, l]) => `<a href="${h}" class="${r.startsWith(h) ? 'act' : ''}">${esc(l)}</a>`).join('');
  $('#nav').innerHTML = nav;
  let m = $('.mnav'); if (!m) { m = document.createElement('nav'); m.className = 'mnav'; document.body.appendChild(m) }
  m.innerHTML = `<a href="#/" class="${r === '#/' ? 'act' : ''}">⌂</a>` + nav;
  $('#authBox').innerHTML = S.user
    ? `<a class="av" href="#/cabinet" title="${esc(S.profile && S.profile.full_name || S.user.email)}">${esc(((S.profile && S.profile.full_name) || S.user.email || '?').trim().charAt(0).toUpperCase())}</a> <button class="btn ghost sm" id="outBtn">${t('logout')}</button>`
    : `<a class="btn sm" href="#/login">${t('login')}</a>`;
  const ob = $('#outBtn'); if (ob) ob.onclick = async () => { await api.signOut(); S.user = null; S.profile = null; S.mine = []; renderChrome(); location.hash = '#/' };
  const bar = $('#demoBar'); bar.hidden = !DEMO; bar.textContent = DEMO ? t('demo') : '';
}
$$('.lang button').forEach(b => b.onclick = () => { lang = b.dataset.lang; try { localStorage.setItem('lang', lang) } catch (e) {} route() });

/* ============================ Беттер ============================ */

const waLink = text => `https://wa.me/${encodeURIComponent(cfg.WHATSAPP || '')}?text=${encodeURIComponent(text)}`;
function priceBlocks() {
  return `<div class="prices">${(cfg.PRICES || []).map(g => `
    <div class="pblock rise">
      <div class="ph"><span class="pic">${icon(g.ic || 'book', 24)}</span><h3>${esc(L(g))}</h3></div>
      <ul>${(g.rows || []).map(r => `<li>
        <span class="pn">${esc(L(r))}</span>
        <b class="pp">${typeof r.price === 'number' ? money(r.price) : t('deal')}</b>
        <a class="btn sm ghost" href="${esc(waLink(t('waHi') + ' ' + L(g) + ' — ' + L(r)))}" target="_blank" rel="noopener">${t('order')}</a>
      </li>`).join('')}</ul>
      ${g.unit ? `<div class="calc"><label>${t('calcQ')} <input class="input" type="number" min="1" max="500" value="${esc(g.calcDefault || 1)}" data-unit="${esc(g.unit)}" data-g="${esc(L(g))}" data-u="${esc(lang === 'ru' ? (g.unitRu || '') : (g.unitKk || ''))}"></label><b class="calc-sum">${money((g.calcDefault || 1) * g.unit)}</b><a class="btn sm calc-go" target="_blank" rel="noopener" href="#">${t('order')}</a></div>` : ''}
      ${g.note ? `<p class="muted pnote">${esc(L(g.note))}</p>` : ''}
    </div>`).join('')}</div>`;
}

function bindCalc() {
  $$('.calc input').forEach(inp => {
    const box = inp.closest('.calc'), sum = $('.calc-sum', box), go = $('.calc-go', box);
    const upd = () => {
      const n = Math.max(1, Math.min(500, parseInt(inp.value, 10) || 1)), total = n * Number(inp.dataset.unit);
      sum.textContent = money(total);
      go.href = waLink(`${t('waHi')} ${inp.dataset.g} — ${n} ${inp.dataset.u} (${money(total)})`);
    };
    inp.oninput = upd; upd();
  });
}

async function pageHome() {
  const sel = S.filter.level;
  const three = (cfg.PRICES || []).slice(0, 3).map((g, i) => {
    const k = KINDS[i] || KINDS[3], nums = (g.rows || []).map(r => r.price).filter(n => typeof n === 'number');
    return `<div class="gcover" style="background:linear-gradient(135deg,${k.c[0]},${k.c[1]})"><small>${nums.length ? (lang === 'kk' ? money(Math.min(...nums)) + ' ' + t('from') : t('from') + ' ' + money(Math.min(...nums))) : t('deal')}</small><b>${esc(L(g))}</b></div>`;
  });
  mount(`
  <section class="hero">
    <div>
      <h1>${t('heroT')}</h1>
      <p>${t('heroP')}</p>
      <div class="cta"><a class="btn" href="#/prices">${t('toCatalog')}</a><a class="btn ghost" href="${esc(waLink(t('waHi')))}" target="_blank" rel="noopener">${t('askWa')}</a></div>
    </div>
    <div class="stack3" aria-hidden="true">${three.map(h => `<div class="cover">${h}</div>`).join('')}</div>
  </section>
  <section class="who rise">
    <h2>${t('whoT')}</h2><p class="muted" style="margin:0 0 16px">${t('whoP')}</p>
    <div class="chips">${ROLES.map(r => `<button class="chip ${sel === r.k ? 'on' : ''}" data-role="${r.k}">${icon(r.ic, 18)} ${esc(L(r))}</button>`).join('')}</div>
  </section>
  <section>
    <div class="sec-h"><h2>${t('newT')}</h2><a class="btn ghost sm" href="#/prices">${t('all')} →</a></div>
    ${priceBlocks()}
  </section>
  <section class="steps">
    ${[['user', 's1'], ['cart', 's2'], ['open', 's3']].map(([ic, k]) => `<div class="step rise"><div class="ic">${icon(ic)}</div><h3>${t(k + 'T')}</h3><p>${t(k + 'P')}</p></div>`).join('')}
  </section>`);
  bindCalc();
  $$('[data-role]').forEach(b => b.onclick = async () => {
    S.filter.level = S.filter.level === b.dataset.role ? '' : b.dataset.role;
    if (S.user && S.filter.level) { try { await api.updateProfile(S.user.id, { role: S.filter.level }); S.profile.role = S.filter.level } catch (e) {} }
    pageHome();
  });
}

async function pagePrices() {
  mount(`
  <div class="sec-h"><div><h1>${t('catalog')}</h1><p class="muted" style="margin:10px 0 0;max-width:60ch">${t('pricesP')}</p></div>
  <a class="btn" href="${esc(waLink(t('waHi')))}" target="_blank" rel="noopener">${t('askWa')}</a></div>
  ${priceBlocks()}`);
  bindCalc();
}

async function pageItem(id) {
  const p = (await loadProducts()).find(x => String(x.id) === id);
  if (!p) { mount(`<a class="back" href="#/cabinet">← ${t('back')}</a><div class="empty">${t('nothing')}</div>`); return }
  const st = myStatus(p.id);
  const isAdmin = S.profile && S.profile.is_admin;
  let action = `<button class="btn sun" id="buy">${icon('cart', 18)} ${t('buy')} · ${money(p.price)}</button>`;
  if (st === 'paid' || isAdmin) action = `<button class="btn" id="openW">${icon('open', 18)} ${t('open')}</button>`;
  else if (st === 'pending') action = `<span class="tag wait" style="align-self:flex-start;padding:10px 14px">${t('pending')}</span>`;
  mount(`
  <a class="back" href="#/cabinet">← ${t('back')}</a>
  <div class="item">
    <div class="big-cv">${cover(p)}</div>
    <div class="panel">
      <div class="tags"><span class="tag sky">${esc(L(kindOf(p.kind)))}</span>${p.subject ? `<span class="tag">${esc(p.subject)}</span>` : ''}${p.pages ? `<span class="tag">${esc(p.pages)} ${t('pages')}</span>` : ''}</div>
      <h1 style="font-size:clamp(26px,3.4vw,40px)">${esc(titleOf(p))}</h1>
      <div class="price">${money(p.price)}</div>
      ${action}
      ${descOf(p) ? `<p class="desc">${esc(descOf(p))}</p>` : ''}
      ${(p.levels || []).length ? `<div><div class="muted" style="font-size:14px;margin-bottom:6px">${t('forWhom')}</div><div class="tags">${p.levels.map(l => roleOf(l) ? `<span class="tag">${esc(L(roleOf(l)))}</span>` : '').join('')}</div></div>` : ''}
    </div>
  </div>`);
  const b = $('#buy'); if (b) b.onclick = () => buy(p);
  const o = $('#openW'); if (o) o.onclick = () => openWork(p.id);
}

function buy(p) {
  if (!S.user) { toast(t('loginFirst')); try { sessionStorage.setItem('after', location.hash) } catch (e) {} location.hash = '#/login'; return }
  openModal(`
    <h2>${t('payT')}</h2>
    <p class="muted">${esc(titleOf(p))}</p>
    <div class="kaspi"><span>${t('payP')}</span><b>${esc(cfg.KASPI_PHONE || '')}</b><span>${esc(cfg.KASPI_NAME || '')} · <strong>${money(p.price)}</strong></span></div>
    <form class="form" id="payF">
      <label>${t('payNote')}<input class="input" name="note" required maxlength="120" value="${esc(S.profile && S.profile.full_name || '')}"></label>
      <button class="btn sun" type="submit">${t('payDone')}</button>
    </form>`, c => {
    $('#payF', c).onsubmit = async e => {
      e.preventDefault(); const btn = $('button[type=submit]', c); btn.disabled = true;
      try { await api.request(S.user.id, p.id, e.target.note.value.trim()); S.mine = await api.myPurchases(S.user.id); closeModal(); toast(t('payAfter')); pageItem(String(p.id)) }
      catch (er) { btn.disabled = false; fail(er) }
    };
  });
}

async function openWork(pid) {
  try {
    const c = await api.content(pid);
    if (!c || (!c.link_url && !c.file_path)) { toast(t('noContent'), true); return }
    const url = c.link_url || await api.fileUrl(c.file_path);
    window.open(url, '_blank', 'noopener') || (location.href = url);
  } catch (e) { fail(e) }
}

function pageLogin(mode) {
  if (S.user) { location.hash = '#/cabinet'; return }
  const reg = mode === 'register';
  mount(`
  <div class="auth panel">
    <h1 style="font-size:32px">${reg ? t('register') : t('login')}</h1>
    <form class="form" id="authF">
      ${reg ? `<label>${t('name')}<input class="input" name="name" required autocomplete="name"></label>` : ''}
      <label>${t('email')}<input class="input" name="email" type="email" required autocomplete="email"></label>
      <label>${t('password')}<input class="input" name="pw" type="password" required minlength="6" autocomplete="${reg ? 'new-password' : 'current-password'}"></label>
      <button class="btn" type="submit">${reg ? t('register') : t('login')}</button>
    </form>
    ${reg ? '' : `<button class="btn ghost sm" id="forgot" style="align-self:center">${t('forgot')}</button>`}
    <p class="alt">${reg ? t('haveAcc') + ` <a href="#/login">${t('login')}</a>` : t('noAcc') + ` <a href="#/register">${t('register')}</a>`}</p>
  </div>`);
  $('#authF').onsubmit = async e => {
    e.preventDefault(); const f = e.target, btn = $('button[type=submit]', f); btn.disabled = true;
    try {
      if (reg) {
        const r = await api.signUp(f.email.value.trim(), f.pw.value, f.name.value.trim());
        if (!r.session) { btn.disabled = false; mount(`<div class="auth panel"><h2>${t('welcome')}</h2><p>${t('checkMail')}</p><a class="btn" href="#/login">${t('login')}</a></div>`); return }
      } else await api.signIn(f.email.value.trim(), f.pw.value);
      await afterAuth();
    } catch (er) { btn.disabled = false; fail(er) }
  };
  const fg = $('#forgot'); if (fg) fg.onclick = async () => {
    const em = $('#authF').email.value.trim(); if (!em) { $('#authF').email.focus(); return }
    try { await api.reset(em); toast(t('resetSent')) } catch (er) { fail(er) }
  };
}

async function afterAuth() {
  await loadMe(); toast(t('welcome'));
  let next = null; try { next = sessionStorage.getItem('after'); sessionStorage.removeItem('after') } catch (e) {}
  location.hash = next || '#/cabinet'; route();
}

function askRole() {
  openModal(`<h2>${t('roleT')}</h2><p class="muted">${t('roleP')}</p>
    <div class="roles">${ROLES.map(r => `<button data-r="${r.k}">${icon(r.ic, 26)}<span>${esc(L(r))}</span></button>`).join('')}</div>`, c => {
    $$('[data-r]', c).forEach(b => b.onclick = async () => {
      try { await api.updateProfile(S.user.id, { role: b.dataset.r }); S.profile.role = b.dataset.r; S.filter.level = b.dataset.r; closeModal(); toast(t('saved')); route() } catch (e) { fail(e) }
    });
  });
}

async function pageCabinet() {
  if (!S.user) { location.hash = '#/login'; return }
  S.mine = await api.myPurchases(S.user.id);
  const pr = S.profile || {};
  mount(`
  <div class="sec-h"><h1>${t('cabinet')}</h1></div>
  <div class="cab">
    <form class="panel form" id="profF">
      <h3>${t('profile')}</h3>
      <label>${t('name')}<input class="input" name="name" value="${esc(pr.full_name || '')}"></label>
      <label>${t('phone')}<input class="input" name="phone" type="tel" value="${esc(pr.phone || '')}"></label>
      <label>${t('role')}<select class="input" name="role"><option value="">—</option>${ROLES.map(r => `<option value="${r.k}" ${pr.role === r.k ? 'selected' : ''}>${esc(L(r))}</option>`).join('')}</select></label>
      <div class="muted" style="font-size:14px">${esc(S.user.email || '')}</div>
      <button class="btn" type="submit">${t('save')}</button>
    </form>
    <section>
      <h2 style="margin-bottom:16px">${t('myWorks')}</h2>
      <div class="list">${S.mine.map((m, i) => { const p = m.products || {}; return `
        <div class="li" style="animation-delay:${i * 60}ms">
          <div class="th">${cover(p)}</div>
          <div class="tx"><b>${esc(titleOf(p))}</b><span class="muted" style="font-size:14px">${money(p.price)} · ${new Date(m.created_at).toLocaleDateString()}</span></div>
          <div class="ac">${statusTag(m.status)}${m.status === 'paid' ? `<button class="btn sm" data-open="${esc(m.product_id)}">${t('open')}</button>` : ''}</div>
        </div>` }).join('') || `<div class="empty">${t('noWorks')}<br><br><a class="btn sm" href="#/prices">${t('catalog')}</a></div>`}</div>
    </section>
  </div>`);
  $('#profF').onsubmit = async e => {
    e.preventDefault(); const f = e.target;
    const patch = { full_name: f.name.value.trim(), phone: f.phone.value.trim(), role: f.role.value || null };
    try { await api.updateProfile(S.user.id, patch); Object.assign(S.profile, patch); toast(t('saved')); renderChrome() } catch (er) { fail(er) }
  };
  $$('[data-open]').forEach(b => b.onclick = () => openWork(b.dataset.open));
}

/* ============================ Админ панель ============================ */
async function pageAdmin(tab) {
  if (!S.profile || !S.profile.is_admin) { location.hash = '#/'; return }
  tab = tab || 'reqs';
  const [reqs, prods, users] = await Promise.all([api.allPurchases(), loadProducts(true), api.users()]);
  const pend = reqs.filter(r => r.status === 'pending').length;
  const tabs = `<div class="tabs">${[['reqs', t('reqs') + (pend ? `<span class="badge">${pend}</span>` : '')], ['works', t('works2')], ['users', t('users')]].map(([k, l]) => `<button data-tab="${k}" class="${tab === k ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  let body = '';
  if (tab === 'reqs') {
    body = `<div class="scroll"><table class="t"><thead><tr><th>${t('date')}</th><th>${t('who')}</th><th>${t('work')}</th><th>${t('payNote')}</th><th>${t('status')}</th><th></th></tr></thead><tbody>
    ${reqs.map(r => `<tr><td>${new Date(r.created_at).toLocaleString()}</td><td>${esc((r.profiles && (r.profiles.full_name || r.profiles.email)) || '')}<br><span class="muted">${esc(r.profiles && r.profiles.email || '')}${r.profiles && r.profiles.phone ? ' · ' + esc(r.profiles.phone) : ''}</span></td>
      <td>${esc(r.products ? titleOf(r.products) : '')}<br><b>${money(r.products && r.products.price)}</b></td><td>${esc(r.payer_note || '')}</td><td>${statusTag(r.status)}</td>
      <td style="white-space:nowrap">${r.status !== 'paid' ? `<button class="btn sm" data-ok="${esc(r.id)}">${t('approve')}</button>` : ''} ${r.status === 'pending' ? `<button class="btn danger sm" data-no="${esc(r.id)}">${t('reject')}</button>` : ''}</td></tr>`).join('') || `<tr><td colspan="6" class="muted">${t('nothing')}</td></tr>`}
    </tbody></table></div>`;
  } else if (tab === 'works') {
    body = `<div class="sec-h"><p class="muted" style="margin:0;max-width:60ch">${t('worksHint')}</p><button class="btn sun" id="addW">+ ${t('add')}</button></div>
    <div class="list">${prods.map(p => `<div class="li"><div class="th">${cover(p)}</div><div class="tx"><b>${esc(titleOf(p))}</b><span class="muted" style="font-size:14px">${esc(L(kindOf(p.kind)))} · ${money(p.price)}</span></div>
      <div class="ac"><button class="btn ghost sm" data-edit="${esc(p.id)}">${t('edit')}</button><button class="btn danger sm" data-del="${esc(p.id)}">${t('del')}</button></div></div>`).join('') || `<div class="empty">${t('nothing')}</div>`}</div>`;
  } else {
    body = `<div class="scroll"><table class="t"><thead><tr><th>${t('who')}</th><th>${t('role')}</th><th>${t('bought')}</th><th>${t('grant')}</th></tr></thead><tbody>
    ${users.map(u => { const n = reqs.filter(r => r.user_id === u.id && r.status === 'paid').length; return `<tr><td>${esc(u.full_name || '—')}${u.is_admin ? ' <span class="tag sky">admin</span>' : ''}<br><span class="muted">${esc(u.email || '')}${u.phone ? ' · ' + esc(u.phone) : ''}</span></td>
      <td>${esc(roleOf(u.role) ? L(roleOf(u.role)) : '—')}</td><td>${n}</td>
      <td><div style="display:flex;gap:8px"><select class="input" style="min-width:200px" data-gsel="${esc(u.id)}"><option value="">${t('choose')}</option>${prods.map(p => `<option value="${esc(p.id)}">${esc(titleOf(p))}</option>`).join('')}</select><button class="btn sm" data-grant="${esc(u.id)}">${t('grant')}</button></div></td></tr>` }).join('')}
    </tbody></table></div>`;
  }
  mount(`<div class="sec-h"><h1>${t('admin')}</h1></div>${tabs}${body}`);
  $$('[data-tab]').forEach(b => b.onclick = () => { location.hash = '#/admin/' + b.dataset.tab });
  $$('[data-ok]').forEach(b => b.onclick = async () => { try { await api.setStatus(b.dataset.ok, 'paid'); toast(t('saved')); pageAdmin('reqs') } catch (e) { fail(e) } });
  $$('[data-no]').forEach(b => b.onclick = async () => { try { await api.setStatus(b.dataset.no, 'rejected'); pageAdmin('reqs') } catch (e) { fail(e) } });
  $$('[data-grant]').forEach(b => b.onclick = async () => {
    const pid = $(`[data-gsel="${CSS.escape(b.dataset.grant)}"]`).value; if (!pid) return;
    try { await api.grant(b.dataset.grant, pid); toast(t('saved')); pageAdmin('users') } catch (e) { fail(e) }
  });
  const aw = $('#addW'); if (aw) aw.onclick = () => editWork(null);
  $$('[data-edit]').forEach(b => b.onclick = () => editWork(prods.find(p => String(p.id) === b.dataset.edit)));
  $$('[data-del]').forEach(b => b.onclick = () => openModal(`<h2>${t('confirmDel')}</h2><div class="cta" style="display:flex;gap:10px;margin-top:18px"><button class="btn danger" id="yes">${t('del')}</button><button class="btn ghost" data-close>${t('back')}</button></div>`, c => {
    $('#yes', c).onclick = async () => { try { await api.deleteProduct(b.dataset.del); closeModal(); S.products = null; pageAdmin('works') } catch (e) { fail(e) } };
  }));
}

async function editWork(p) {
  const c = p ? (await api.content(p.id) || {}) : {};
  p = p || { kind: 'presentation', levels: [], price: 0, published: false };
  openModal(`<h2>${p.id ? t('edit') : t('add')}</h2>
  <form class="form" id="wf">
    <label>${t('tKk')}<input class="input" name="title_kk" required value="${esc(p.title_kk || '')}"></label>
    <label>${t('tRu')}<input class="input" name="title_ru" value="${esc(p.title_ru || '')}"></label>
    <div class="row2">
      <label>${t('kind')}<select class="input" name="kind">${KINDS.map(k => `<option value="${k.k}" ${p.kind === k.k ? 'selected' : ''}>${esc(L(k))}</option>`).join('')}</select></label>
      <label>${t('subject')}<select class="input" name="subject"><option value=""></option>${(cfg.SUBJECTS || []).map(s => `<option ${p.subject === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></label>
    </div>
    <div class="row2">
      <label>${t('price')}<input class="input" name="price" type="number" min="0" step="100" required value="${esc(p.price)}"></label>
      <label>${t('pagesL')}<input class="input" name="pages" type="number" min="0" value="${esc(p.pages || '')}"></label>
    </div>
    <div><div style="font-weight:500;font-size:14px;margin-bottom:6px">${t('levels')}</div><div class="checks">${ROLES.map(r => `<label><input type="checkbox" name="lv" value="${r.k}" ${(p.levels || []).includes(r.k) ? 'checked' : ''}> ${esc(L(r))}</label>`).join('')}</div></div>
    <label>${t('dKk')}<textarea class="input" name="desc_kk">${esc(p.desc_kk || '')}</textarea></label>
    <label>${t('dRu')}<textarea class="input" name="desc_ru">${esc(p.desc_ru || '')}</textarea></label>
    <label>${t('cover')}<input class="input" name="cover" type="file" accept="image/*"></label>
    <label>${t('link')}<input class="input" name="link" type="url" placeholder="https://" value="${esc(c.link_url || '')}"></label>
    <label>${t('file')}<input class="input" name="file" type="file" accept=".pdf,.ppt,.pptx,.doc,.docx,.zip">${c.file_path ? `<span class="muted" style="font-size:13px">${esc(c.file_path)}</span>` : ''}</label>
    <button class="btn" type="submit">${t('save')}</button>
  </form>`, m => {
    $('#wf', m).onsubmit = async e => {
      e.preventDefault(); const f = e.target, btn = $('button[type=submit]', f); btn.disabled = true;
      try {
        const rec = {
          title_kk: f.title_kk.value.trim(), title_ru: f.title_ru.value.trim() || null, kind: f.kind.value, subject: f.subject.value || null,
          price: parseInt(f.price.value, 10) || 0, pages: parseInt(f.pages.value, 10) || null,
          levels: $$('input[name=lv]:checked', f).map(x => x.value), desc_kk: f.desc_kk.value.trim() || null, desc_ru: f.desc_ru.value.trim() || null,
          published: false
        };
        if (p.id) rec.id = p.id;
        const cf = f.cover.files[0];
        if (cf) rec.cover_url = await api.upload('covers', `${Date.now()}-${cf.name.replace(/[^\w.\-]/g, '_')}`, cf);
        const id = await api.saveProduct(rec);
        const wf = f.file.files[0];
        const content = { product_id: id, link_url: f.link.value.trim() || null, file_path: c.file_path || null };
        if (wf) content.file_path = await api.upload('works', `${id}/${Date.now()}-${wf.name.replace(/[^\w.\-]/g, '_')}`, wf);
        await api.saveContent(content);
        S.products = null; closeModal(); toast(t('saved')); pageAdmin('works');
      } catch (er) { btn.disabled = false; fail(er) }
    };
  });
}

/* ============================ Маршруттар ============================ */
async function route() {
  renderChrome();
  const h = (location.hash || '#/').slice(1).split('/').filter(Boolean);
  try {
    if (!h.length) await pageHome();
    else if (h[0] === 'prices' || h[0] === 'catalog') await pagePrices();
    else if (h[0] === 'p') await pageItem(decodeURIComponent(h[1] || ''));
    else if (h[0] === 'login') pageLogin('login');
    else if (h[0] === 'register') pageLogin('register');
    else if (h[0] === 'cabinet') await pageCabinet();
    else if (h[0] === 'admin') await pageAdmin(h[1]);
    else await pageHome();
  } catch (e) { fail(e); mount(`<div class="empty">${t('err')}</div>`) }
  $('#view').focus({ preventScroll: true });
  if (S.user && S.profile && !S.profile.role && $('#modal').hidden) askRole();
}
addEventListener('hashchange', () => { if (!$('#modal').hidden) closeModal(); route() });

(async () => {
  $('#view').innerHTML = '<div class="grid"><div class="skel"></div><div class="skel"></div><div class="skel"></div></div>';
  if (sb) sb.auth.onAuthStateChange(async (ev) => {
    if (ev === 'PASSWORD_RECOVERY') {
      openModal(`<h2>${t('setPw')}</h2><form class="form" id="npF"><label>${t('newPw')}<input class="input" name="pw" type="password" minlength="6" required autocomplete="new-password"></label><button class="btn" type="submit">${t('save')}</button></form>`, c => {
        $('#npF', c).onsubmit = async e => { e.preventDefault(); try { await api.setPassword(e.target.pw.value); closeModal(); toast(t('saved')) } catch (er) { fail(er) } };
      });
    }
    if (ev === 'SIGNED_IN' && !S.user) { await loadMe(); route() }
  });
  try { await loadMe() } catch (e) { fail(e) }
  route();
})();
}
