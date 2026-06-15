document.getElementById('sendBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const msgInput = document.getElementById('contactMsg');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg = msgInput.value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }

  if (name.length < 3) {
    alert('Name must be longer than 3 characters');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Email format invalid');
    return;
  }

  if (msg.length < 10) {
    alert('Pesan minimal 10 karakter.');
    return;
  }

  const toast = document.getElementById('contactToast');
  toast.style.display = 'block';

  nameInput.value = '';
  emailInput.value = '';
  msgInput.value = '';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
});