// ============================================
// FAVORITE PAGE JS
// ============================================

const allKosts = [
  { id: 1, name: 'Kost Melati Residence', price: 'Rp. 1700K', loc: 'Kemanggisan · Near Binus Kemanggisan Campus', tags: ['WiFi', 'AC', 'Laundry'], img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80' },
  { id: 2, name: 'The Urban Suite',       price: 'Rp. 3600K', loc: 'Jakarta Selatan · Kuningan',                  tags: ['WiFi', 'AC', 'Laundry', 'More'], img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80' },
  { id: 3, name: 'Kost Harmoni',          price: 'Rp. 2350K', loc: 'West Jakarta · Near Central Park',            tags: ['WiFi', 'AC', 'Laundry', 'Kitchen'], img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80' },
  { id: 4, name: 'Kost Mayrooms',         price: 'Rp. 2000K', loc: 'Depok · Near UI Campus',                     tags: ['WiFi', 'Parking'], img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
];

let editMode = false;

function renderFavs() {
  const favList = document.getElementById('favList');
  const emptyFav = document.getElementById('emptyFav');
  const favIds = getFavs();

  const favKosts = allKosts.filter(k => favIds.includes(k.id));

  if (favKosts.length === 0) {
    favList.innerHTML = '';
    emptyFav.style.display = 'block';
    return;
  }

  emptyFav.style.display = 'none';

  favList.innerHTML = favKosts.map(k => `
    <a class="kost-card kost-card-fav animate-in" href="detail.html?id=${k.id}">
      <div class="kost-card-img">
        <img src="${k.img}" alt="${k.name}" />
        <span class="fav-heart">♥</span>
        <button class="remove-btn" data-id="${k.id}" onclick="event.preventDefault(); removeFav(${k.id})">✕</button>
      </div>
      <div class="kost-card-body">
        <div class="kost-card-top">
          <span class="kost-card-name">${k.name}</span>
          <span class="kost-card-price">${k.price}</span>
        </div>
        <div class="kost-card-loc">📍 ${k.loc}</div>
        <div class="kost-tags">
          ${k.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');

  if (editMode) {
    favList.classList.add('edit-mode');
  }
}

function removeFav(id) {
  let favs = getFavs().filter(f => f !== id);
  saveFavs(favs);
  renderFavs();
}

document.getElementById('editBtn').addEventListener('click', () => {
  editMode = !editMode;
  document.getElementById('favList').classList.toggle('edit-mode', editMode);
  document.getElementById('editBtn').textContent = editMode ? '✅' : '✏️';
});

// Init
renderFavs();
