// ============================================
// SIGNUP PAGE JS
// ============================================

document.getElementById('signupBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('signupName');
  const emailInput = document.getElementById('signupEmail');
  const passInput = document.getElementById('signupPass');
  const confirmInput = document.getElementById('signupConfirm');
  const errEl = document.getElementById('signupError');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const pass = passInput.value;
  const confirm = confirmInput.value;

  errEl.style.display = 'none';

  if (!name || !email || !pass || !confirm) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }

  if (name.length < 3) {
    errEl.textContent = 'Name must contain at least 3 characters.';
    errEl.style.display = 'block';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errEl.textContent = 'Email format invalid.';
    errEl.style.display = 'block';
    return;
  }

  if (pass.length < 6) {
    errEl.textContent = 'Password must contain at least 6 characters.';
    errEl.style.display = 'block';
    return;
  }

  if (pass !== confirm) {
    errEl.textContent = 'Passwords do not match.';
    errEl.style.display = 'block';
    return;
  }

  const users = JSON.parse(localStorage.getItem('kf_users') || '[]');
  if (users.find(u => u.email === email)) {
    errEl.textContent = 'Email already registered.';
    errEl.style.display = 'block';
    return;
  }

  const newUser = { name, email, password: pass, contact: '' };
  users.push(newUser);
  localStorage.setItem('kf_users', JSON.stringify(users));
  localStorage.setItem('kf_current', JSON.stringify(newUser));

  window.location.href = 'login.html?registered=1';
});