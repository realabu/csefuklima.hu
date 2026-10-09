'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
  }
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.product').forEach(product => {
    product.hidden = button.dataset.filter !== 'all' && product.dataset.power !== button.dataset.filter;
  });
}));
let selectedProduct = '';
const productSelection = document.querySelector('#selected-product');
const topic = document.querySelector('#topic');
const status = document.querySelector('#form-status');
function selectProduct(value) {
  selectedProduct = value;
  productSelection.hidden = !value;
  productSelection.querySelector('strong').textContent = value;
  status.textContent = '';
}
document.querySelectorAll('.product-select').forEach(button => button.addEventListener('click', () => {
  selectProduct(button.dataset.product); topic.value = 'Készülékvásárlás';
  document.querySelector('#kapcsolat').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  topic.focus({preventScroll: true});
}));
document.querySelector('#clear-product').addEventListener('click', () => selectProduct(''));
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  selectProduct(''); topic.value = link.dataset.interest;
}));
topic.addEventListener('change', () => { if (topic.value !== 'Készülékvásárlás') selectProduct(''); });
function inquiryText() {
  const place = document.querySelector('#place').value.trim();
  const message = document.querySelector('#message').value.trim();
  return ['Jó napot kívánok! A Csefu Klíma weboldaláról érdeklődöm.', 'Téma: ' + topic.value,
    selectedProduct ? 'Készülék: ' + selectedProduct : '', place ? 'Helyszín: ' + place : '',
    message ? 'Elképzelés: ' + message : '', 'Kérem, egyeztessünk a lehetőségekről és az ajánlatról. Köszönöm!']
    .filter(Boolean).join('\n');
}
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const separator = /iPad|iPhone|iPod/.test(navigator.userAgent) ? '&' : '?';
  window.location.href = 'sms:+36302662852' + separator + 'body=' + encodeURIComponent(inquiryText());
  status.textContent = 'Az üzenetet az SMS-alkalmazásban küldheti el. Ha az nem nyílt meg, másolja a szöveget Messengerhez, vagy hívjon minket.';
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  const text = inquiryText();
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'A szöveget kimásoltuk. Nyissa meg a Facebook-oldalt, válassza az Üzenet gombot, és illessze be.';
  } catch {
    let fallback = document.querySelector('#copy-fallback');
    if (!fallback) {
      const label = document.createElement('label'); label.htmlFor = 'copy-fallback'; label.textContent = 'Másolja ki ezt az üzenetet:';
      fallback = document.createElement('textarea'); fallback.id = 'copy-fallback'; fallback.rows = 7; fallback.readOnly = true;
      document.querySelector('#inquiry-form').append(label, fallback);
    }
    fallback.value = text; fallback.focus(); fallback.select();
    status.textContent = 'Az automatikus másolás nem elérhető. Jelölje ki és másolja az alábbi szöveget.';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
