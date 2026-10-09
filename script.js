'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
  }
});
const mobilePhone = /iPhone|iPod|Android.*Mobile/i.test(navigator.userAgent);
const phone = '+36308842875';
async function copyText(text, host, status) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    let fallback = host.querySelector('.copy-fallback');
    if (!fallback) {
      const label = document.createElement('label');
      fallback = document.createElement('textarea'); fallback.className = 'copy-fallback';
      fallback.id = 'copy-' + (host.id || 'phone'); fallback.readOnly = true; fallback.rows = 5;
      label.htmlFor = fallback.id; label.textContent = 'Másolja ki az alábbi szöveget:';
      host.append(label, fallback);
    }
    fallback.value = text; fallback.focus(); fallback.select();
    status.textContent = 'Az automatikus másolás nem elérhető. A kijelölt szöveget kézzel másolhatja.';
    return false;
  }
}
document.querySelectorAll('[data-phone]').forEach(button => {
  button.title = mobilePhone ? 'Telefonhívás indítása' : 'Telefonszám másolása';
  button.setAttribute('aria-label', '+36 30 884 2875 — ' + button.title);
  button.addEventListener('click', async () => {
    if (mobilePhone) { window.location.href = 'tel:' + phone; return; }
    const status = document.querySelector('#phone-status');
    status.hidden = false;
    if (await copyText('+36 30 884 2875', status, status)) status.textContent = 'Telefonszám kimásolva: +36 30 884 2875';
  });
});
let selectedProduct = '';
const selection = document.querySelector('#selected-product');
const topic = document.querySelector('#topic');
const status = document.querySelector('#form-status');
function selectProduct(value) {
  selectedProduct = value; if (!selection) return;
  selection.hidden = !value; selection.querySelector('strong').textContent = value;
  status.textContent = ''; document.querySelector('#send-options').hidden = true;
}
if (topic) {
  const product = new URLSearchParams(window.location.search).get('keszulek');
  if (product) { selectProduct(product.slice(0,250)); topic.value = 'Készülékvásárlás'; }
  document.querySelector('#clear-product').addEventListener('click', () => selectProduct(''));
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => { selectProduct(''); topic.value = link.dataset.interest; }));
  topic.addEventListener('change', () => { if (topic.value !== 'Készülékvásárlás') selectProduct(''); document.querySelector('#send-options').hidden = true; status.textContent = ''; });
  function inquiryText() {
    const place = document.querySelector('#place').value.trim();
    const message = document.querySelector('#message').value.trim();
    return ['Kedves Gyuri! A Csefu Klíma weboldaláról érdeklődöm.', 'Téma: ' + topic.value,
      selectedProduct ? 'Készülék: ' + selectedProduct : '', place ? 'Helyszín: ' + place : '',
      message ? 'Elképzelés: ' + message : '', 'Kérem, egyeztessünk a lehetőségekről és az ajánlatról. Köszönöm!'].filter(Boolean).join('\n');
  }
  document.querySelector('#inquiry-form').addEventListener('submit', async event => {
    event.preventDefault();
    if (await copyText(inquiryText(), event.currentTarget, status)) status.textContent = 'Az üzenetet kimásoltuk. Nyissa meg a Messengert, illessze be, majd küldje el Gyurinak a Csefu Klíma oldalán.';
    document.querySelector('#send-options').hidden = false;
  });
  const sms = document.querySelector('#sms-inquiry'); sms.hidden = !mobilePhone;
  sms.addEventListener('click', () => {
    const separator = /iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
    window.location.href = 'sms:' + phone + separator + 'body=' + encodeURIComponent(inquiryText());
    status.textContent = 'Az üzenetet a telefon SMS-alkalmazásában küldheti el.';
  });
  document.querySelectorAll('#inquiry-form input, #inquiry-form textarea').forEach(field => field.addEventListener('input', () => { document.querySelector('#send-options').hidden = true; status.textContent = ''; }));
}
const search = document.querySelector('#catalog-search');
if (search) {
  const group = document.querySelector('#catalog-group');
  const family = document.querySelector('#catalog-family');
  const power = document.querySelector('#catalog-power');
  const products = [...document.querySelectorAll('.catalog-product')];
  const normalize = value => value.toLocaleLowerCase('hu').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function filterCatalog() {
    const query = normalize(search.value.trim()); let count = 0;
    products.forEach(product => {
      const show = (!query || normalize(product.dataset.search).includes(query)) && (group.value === 'all' || product.dataset.group === group.value) && (family.value === 'all' || product.dataset.family === family.value) && (power.value === 'all' || product.dataset.power === power.value);
      product.hidden = !show; if (show) count++;
    });
    document.querySelector('#catalog-count').textContent = count + ' készülékváltozat';
    document.querySelector('#catalog-empty').hidden = count !== 0;
  }
  [search, group, family, power].forEach(input => input.addEventListener(input === search ? 'input' : 'change', filterCatalog));
  document.querySelector('#catalog-reset').addEventListener('click', () => { search.value = ''; group.value = 'all'; family.value = 'all'; power.value = 'all'; filterCatalog(); });
  const requested = new URLSearchParams(window.location.search).get('tipus');
  if (requested && [...group.options].some(o => o.value === requested)) group.value = requested;
  filterCatalog();
}
document.querySelectorAll('[data-load-form]').forEach(button => button.addEventListener('click', () => {
  const frame = document.querySelector('#booking-frame'); frame.src = frame.dataset.src; frame.hidden = false;
  button.hidden = true; document.querySelector('#booking-status').textContent = 'A Google időpontfoglaló betöltése elindult. Ha nem jelenik meg, használja a külön megnyitási linket.';
}));
document.querySelectorAll('[data-year],#year').forEach(el => el.textContent = String(new Date().getFullYear()));
