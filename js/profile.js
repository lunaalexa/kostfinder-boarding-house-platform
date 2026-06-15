// ============================================
// PROFILE PAGE JS
// ============================================

function loadProfile() {
  const user = JSON.parse(localStorage.getItem('kf_current') || '{}');
  if (user.name)    document.getElementById('profileName').value    = user.name;
  if (user.email)   document.getElementById('profileEmail').value   = user.email;
  if (user.contact) document.getElementById('profileContact').value = user.contact;
  if (user.name)    document.getElementById('profileUsername').childNodes[0].textContent = user.name.replace(' ', '') + '211';
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('profileToast');
  t.textContent = msg;
  t.className = `toast toast-${type}`;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

document.getElementById('saveBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');
  const contactInput = document.getElementById('profileContact');
  const passInput = document.getElementById('profilePass');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();
  const pass = passInput.value;

  if (!name || !email || !contact) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Email format invalid', 'error');
    return;
  }

  if (contact.length < 10 || !/^\d+$/.test(contact)) {
    showToast('Contact number invalid.', 'error');
    return;
  }

  if (pass && pass.length < 6) {
    showToast('Password must contain at least 6 characters.', 'error');
    return;
  }

  const user = JSON.parse(localStorage.getItem('kf_current') || '{}');
  user.name = name;
  user.email = email;
  user.contact = contact;
  if (pass) user.password = pass;

  localStorage.setItem('kf_current', JSON.stringify(user));

  let users = JSON.parse(localStorage.getItem('kf_users') || '[]');
  const idx = users.findIndex(u => u.email === user.email);
  if (idx > -1) {
    users[idx] = user;
    localStorage.setItem('kf_users', JSON.stringify(users));
    showToast('Profile saved successfully!', 'success');
  } else {
    showToast('A data error occurred.', 'error');
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('kf_current');
  window.location.href = 'login.html';
});

loadProfile();