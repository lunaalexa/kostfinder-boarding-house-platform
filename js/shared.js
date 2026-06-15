// ============================================
// KOSTFINDER – SHARED JS
// ============================================

// ── FAVORITES STORAGE ──
function getFavs() {
  try { return JSON.parse(localStorage.getItem('kf_favs') || '[]'); }
  catch { return []; }
}

function saveFavs(favs) {
  localStorage.setItem('kf_favs', JSON.stringify(favs));
}

function isFav(id) {
  return getFavs().includes(Number(id));
}

function toggleFav(btn, id) {
  id = Number(id);
  let favs = getFavs();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    favs.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
  }
  saveFavs(favs);
}

// ── 3 garis ──
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (menuBtn && dropdownMenu) {
  menuBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (
      !menuBtn.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownMenu.classList.remove("show");
    }
  });
}

// ── INIT FAV BUTTONS ──
function initFavButtons() {
  document.querySelectorAll('.fav-btn[data-id]').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (isFav(id)) {
      btn.textContent = '♥';
      btn.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initFavButtons);
