// ============================================
// LOGIN PAGE JS
// ============================================

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('registered') === '1') {
  document.getElementById('loginToast').style.display = 'block';
}

document.getElementById('loginBtn').addEventListener('click', () => {
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPass');
  const errEl = document.getElementById('loginError');

  const email = emailInput.value.trim();
  const pass = passInput.value;

  errEl.style.display = 'none';

  if (!email || !pass) {
    errEl.textContent = 'Mohon isi email dan password.';
    errEl.style.display = 'block';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errEl.textContent = 'Format email tidak valid.';
    errEl.style.display = 'block';
    return;
  }

  if (pass.length < 6) {
    errEl.textContent = 'Password must contain at least 6 characters.';
    errEl.style.display = 'block';
    return;
  }

  const users = JSON.parse(localStorage.getItem('kf_users') || '[]');
  const user = users.find(u => u.email === email && u.password === pass);

  if (!user) {
    errEl.textContent = 'Incorrect email or password.';
    errEl.style.display = 'block';
    return;
  }

  localStorage.setItem('kf_current', JSON.stringify(user));
  localStorage.setItem('loggedInUser', user.email);
  window.location.href = 'index.html';
});