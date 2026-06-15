// ============================================
// BOOKING PAGE JS
// ============================================

const kostDB = {
  1: { name: 'Kost Melati Residence', price: 1700000 },
  2: { name: 'The Urban Suite',       price: 3600000 },
  3: { name: 'Kost Harmoni',          price: 2350000 },
  4: { name: 'Kost Mayrooms',         price: 2000000 },
};

const params  = new URLSearchParams(window.location.search);
const kostId  = parseInt(params.get('id')) || 1;
const kost    = kostDB[kostId] || kostDB[1];

let currentStep = 1;
let selectedPayment = '';
let timerInterval;
let bookingDuration = 1;

function setStep(n) {
  currentStep = n;
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('step' + i);
    el.classList.remove('active', 'done');
    if (i < n) el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }
  for (let i = 1; i <= 2; i++) {
    const line = document.getElementById('line' + i);
    line.classList.toggle('done', i < n);
  }
  renderStep(n);
}

function fmt(num) {
  return 'Rp. ' + num.toLocaleString('id-ID') + ',00';
}

function renderStep(n) {
  const el = document.getElementById('bookingContent');
  if (n === 1) {
    el.innerHTML = `
      <div class="booking-section animate-in">
        <h3>Booking Details</h3>
        <p class="booking-sub">${kost.name} &ndash; ${fmt(kost.price)}/mo</p>

        <div class="form-group">
          <label>Full Name</label>
          <input class="form-control" type="text" id="bName" placeholder="YourName" />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input class="form-control" type="tel" id="bPhone" placeholder="+62" />
        </div>
        <div class="form-group">
          <label>Duration (month)</label>
          <input class="form-control" type="number" id="bDuration" placeholder="1" min="1" value="1" />
        </div>
        <div class="form-group">
          <label>Move In</label>
          <input class="form-control" type="date" id="bDate" />
        </div>
      </div>
      <div class="booking-actions">
        <button class="btn btn-primary" id="toStep2">Payment</button>
      </div>
    `;
    document.getElementById('toStep2').addEventListener('click', () => {
      const name = document.getElementById('bName').value.trim();
      const phone = document.getElementById('bPhone').value.trim();
      const duration = document.getElementById('bDuration').value.trim();
      bookingDuration = parseInt(duration);

      if (isNaN(bookingDuration) || bookingDuration <= 0) {
        alert('Duration must be a valid number.');
        return;
      }
      const date = document.getElementById('bDate').value;

      if (!name || !phone || !duration || !date) {
        alert('Make sure to fill in all booking details.');
        return;
      }
      if (!phone.startsWith('+62')) {
        alert('Phone number must start with +62.');
        return;
      }

      const digits = phone.replace(/\D/g, ''); // ambil angka saja

      if (digits.length < 10 || digits.length > 13) {
        alert('Phone number must be between 10 and 13 digits.');
        return;
      }     

      setStep(2);
    });
  }

  if (n === 2) {
    const duration = bookingDuration;
    const adminFee = 100000;
    const total = kost.price * duration + adminFee;

    el.innerHTML = `
      <div class="booking-section animate-in">
        <h3>Payment Method</h3>
        <p class="booking-sub">Select a suitable payment method</p>

        ${[
          { id: 'va',     label: 'Virtual Account', icon: '$' },
          { id: 'ewallet',label: 'E - Wallet',       icon: '💳' },
          { id: 'qris',   label: 'QRIS',             icon: '⊞' },
          { id: 'credit', label: 'Credit',            icon: '💰' },
        ].map(p => `
          <label class="payment-option ${selectedPayment === p.id ? 'selected' : ''}" data-id="${p.id}">
            <input type="radio" name="payment" value="${p.id}" ${selectedPayment === p.id ? 'checked' : ''} />
            <span class="payment-option-label">${p.label}</span>
            <span class="payment-icon">${p.icon}</span>
          </label>
        `).join('')}

        <div class="price-summary">
          <div class="price-row"><span>Total Rent</span><span>${fmt(kost.price * duration)}</span></div>
          <div class="price-row"><span>Admin Fee</span><span>${fmt(adminFee)}</span></div>
          <div class="price-row total"><span>Total</span><span>${fmt(total)}</span></div>
        </div>
      </div>
      <div class="booking-actions">
        <button class="btn btn-outline" id="backBtn">Back</button>
        <button class="btn btn-primary" id="payNowBtn">Pay Now</button>
      </div>
    `;

    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.addEventListener('click', () => {
        selectedPayment = opt.dataset.id;
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.querySelector('input[type="radio"]').checked = true;
      });
    });

    document.getElementById('backBtn').addEventListener('click', () => setStep(1));
    document.getElementById('payNowBtn').addEventListener('click', () => {
      if (!selectedPayment) { alert('Select the payment method first.'); return; }
      if (selectedPayment === 'qris') {
        setStep(3);
      } else {
        setStepConfirmed();
      }
    });
  }

  if (n === 3) {
    // QR CODE STEP
    let secs = 339; // 05:39
    el.innerHTML = `
      <div class="qr-section animate-in">
        <div class="qr-timer" id="qrTimer">${formatTime(secs)}</div>
        <div class="confirmed-icon">⏳</div>
        <p>Please pay before the time ends</p><br>
      </div>
      <div class="booking-actions" style="flex-direction:column;">
        <button class="btn btn-primary" id="checkBtn">Check Payment Status</button>
      </div>
    `;
    timerInterval = setInterval(() => {
      secs--;
      if (secs <= 0) { clearInterval(timerInterval); }
      const el2 = document.getElementById('qrTimer');
      if (el2) el2.textContent = formatTime(secs);
    }, 1000);
    document.getElementById('checkBtn').addEventListener('click', () => {
      clearInterval(timerInterval);
      setStepConfirmed();
    });
  }
}

function setStepConfirmed() {
  // SAVE BOOKING HISTORY
  const currentUser = localStorage.getItem("loggedInUser");
  if(currentUser){
    const bookingHistory =
      JSON.parse(localStorage.getItem("bookingHistory")) || [];

    bookingHistory.push({
      user: currentUser,
      kostId: kostId,
      kostName: kost.name,
      paymentStatus: "Paid",
      bookingDate: new Date().toISOString()
    });

    localStorage.setItem(
      "bookingHistory",
      JSON.stringify(bookingHistory)
    );
  }

  // Mark all steps done
  ['step1','step2','step3'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active');
    el.classList.add('done');
  });
  ['line1','line2'].forEach(id => document.getElementById(id).classList.add('done'));

  const el = document.getElementById('bookingContent');
  el.innerHTML = `
    <div class="confirmed-section animate-in">
      <div class="confirmed-icon">✓</div>
      <h3>Booking Confirmed</h3>
      <p>Payment to kost ${kost.name} has been successful</p>
      <br/>
      <a href="index.html" class="btn btn-primary" style="display:inline-block;margin-top:16px;">Back to Home Page</a>
    </div>
  `;
}

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// INIT
setStep(1);
