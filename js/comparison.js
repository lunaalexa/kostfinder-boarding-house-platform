// ============================================
// COMPARISON PAGE JS
// ============================================

const allKosts = [
  { id: 1, name: 'Kost Melati Res.',  price: 1500000, loc: 'Syahdan',      rating: 4.28, ratingCount: 124, type: 'Single', facilities: ['AC', 'WiFi', 'Laundry'] },
  { id: 2, name: 'Griya Pelajar',     price: 800000,  loc: 'Kemanggisan',  rating: 4.5,  ratingCount: 89,  type: 'Single', facilities: ['Parking', 'WiFi'] },
  { id: 3, name: 'The Urban Suite',   price: 3200000, loc: 'Haji Makmur',  rating: 4.9,  ratingCount: 201, type: 'Suite',  facilities: ['AC', 'WiFi', 'Cinema', 'Laundry', 'Private bath'] },
  { id: 4, name: 'Kost Harmoni',      price: 2000000, loc: 'West Jakarta',  rating: 4.6,  ratingCount: 156, type: 'Double', facilities: ['AC', 'WiFi', 'Kitchen'] },
  { id: 5, name: 'Casa de Estrella',  price: 1800000, loc: 'Bintaro',       rating: 4.3,  ratingCount: 70,  type: 'Single', facilities: ['WiFi', 'Laundry'] },
  { id: 6, name: 'Pondok Ceria',      price: 950000,  loc: 'Depok',        rating: 4.1,  ratingCount: 44,  type: 'Single', facilities: ['WiFi'] },
];

let selected = [];

function renderOptions(filter = '') {
  const container = document.getElementById('kostOptions');
  const filtered = filter
    ? allKosts.filter(k => k.name.toLowerCase().includes(filter.toLowerCase()) || k.loc.toLowerCase().includes(filter.toLowerCase()))
    : allKosts;

  container.innerHTML = filtered.map(k => `
    <button class="kost-option-chip ${selected.includes(k.id) ? 'selected' : ''}" data-id="${k.id}">
      ${selected.includes(k.id) ? '✓ ' : ''}${k.name}
    </button>
  `).join('');

  container.querySelectorAll('.kost-option-chip').forEach(btn => {
    btn.addEventListener('click', () => toggleSelect(parseInt(btn.dataset.id)));
  });
}

function toggleSelect(id) {
  if (selected.includes(id)) {
    selected = selected.filter(s => s !== id);
  } else {
    if (selected.length >= 3) { alert('Maximum 3 boarding houses to compare.'); return; }
    selected.push(id);
  }
  renderOptions(document.getElementById('compareSearch').value);
  renderTable();
}

function renderTable() {
  const result = document.getElementById('compareResult');
  if (selected.length < 2) {
    result.innerHTML = `
      <div class="compare-placeholder animate-in">
        <div class="ph-icon">⊞</div>
        <p>Choose ${2 - selected.length} another kost to compare</p>
      </div>
    `;
    return;
  }

  const kosts = selected.map(id => allKosts.find(k => k.id === id));

  const lowestPrice = Math.min(...kosts.map(k => k.price));
  const highestRating = Math.max(...kosts.map(k => k.rating));

  result.innerHTML = `
    <div class="compare-table-wrap animate-in">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${kosts.map(k => `<th>${k.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            ${kosts.map(k => `<td class="${k.price === lowestPrice ? 'best-value' : ''}">Rp ${k.price.toLocaleString('id-ID')}</td>`).join('')}
          </tr>
          <tr>
            <td>Location</td>
            ${kosts.map(k => `<td>${k.loc}</td>`).join('')}
          </tr>
          <tr>
            <td>Rating</td>
            ${kosts.map(k => `<td class="${k.rating === highestRating ? 'best-value' : ''}">${k.rating} (${k.ratingCount})</td>`).join('')}
          </tr>
          <tr>
            <td>Type</td>
            ${kosts.map(k => `<td>${k.type}</td>`).join('')}
          </tr>
          <tr>
            <td>Facilities</td>
            ${kosts.map(k => `<td>${k.facilities.map(f => `<span class="compare-tag">${f}</span>`).join('')}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// SEARCH
document.getElementById('compareSearch').addEventListener('input', function () {
  renderOptions(this.value);
});

// INIT
renderOptions();
renderTable();
