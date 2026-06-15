// ============================================
// HOME PAGE JS
// ============================================

const kostData = [
  { id: 1, name: 'Kost Melati Residence', price: 'Rp. 1700K', loc: 'Kemanggisan · Near Binus Kemanggisan Campus', tags: ['wifi', 'ac', 'laundry'], room: 'Single Room' },
  { id: 2, name: 'The Urban Suite',       price: 'Rp. 3600K', loc: 'Jakarta Selatan · Kuningan',                  tags: ['wifi', 'ac', 'laundry', 'parking'], room: 'Suite Room' },
  { id: 3, name: 'Kost Harmoni',          price: 'Rp. 2350K', loc: 'West Jakarta · Near Central Park',            tags: ['wifi', 'ac', 'laundry', 'kitchen'], room: 'Double Room' },
  { id: 4, name: 'Kost Mayrooms',         price: 'Rp. 2000K', loc: 'Depok · Near UI Campus',                     tags: ['wifi', 'parking'], room: 'Single Room' },
];

// FILTER CHIPS
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filterCards(chip.dataset.filter);
  });
});

function filterCards(filter) {
  const cards = document.querySelectorAll('#kostList .kost-card');
  cards.forEach((card, i) => {
    const item = kostData[i];
    if (!item) return;
    const show = filter === 'all' || item.tags.includes(filter);
    card.style.display = show ? 'block' : 'none';
  });
}

// SEARCH
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  const cards = document.querySelectorAll('#kostList .kost-card');
  cards.forEach((card, i) => {
    const item = kostData[i];
    if (!item) return;
    const match = item.name.toLowerCase().includes(q) || item.loc.toLowerCase().includes(q);
    card.style.display = match ? 'block' : 'none';
  });
});

// MIC BUTTON (mock)
document.getElementById('micBtn').addEventListener('click', () => {
  const input = document.getElementById('searchInput');
  input.focus();
  input.placeholder = 'Mendengarkan...';
  setTimeout(() => { input.placeholder = 'Search'; }, 2000);
});
