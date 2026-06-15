

const kostDB = {
  1: {
    name: 'Kost Melati Residence',
    available: true,
    loc: 'Kemanggisan · Near Binus Kemanggisan Campus',
    price: 'Rp 1700K',
    rating: 4.8,
    reviewCount: 124,
    room: 'Single Room',
    desc: 'Modern kost with excellent facilities near Binus University. Clean rooms, friendly staff, and great community.',
    amenities: ['WiFi', 'AC', 'Laundry'],
    img1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    reviews: [
      { author: 'Sarah M.', date: '2 weeks ago', stars: 5, text: 'Amazing kost! Very clean and the staff is super friendly. WiFi is fast too.' },
      { author: 'Budi P.',  date: '1 month ago', stars: 4, text: 'Good location, close to campus. Room is comfortable. Would recommend.' },
      { author: 'Ayu R.',   date: '2 months ago', stars: 5, text: "Best kost I've stayed at. Great value for the price!" },
    ]
  },
  2: {
    name: 'The Urban Suite',
    available: true,
    loc: 'Jakarta Selatan · Kuningan',
    price: 'Rp 3600K',
    rating: 4.9,
    reviewCount: 201,
    room: 'Suite Room',
    desc: 'Premium living space in South Jakarta\'s business district. Fully furnished with modern amenities.',
    amenities: ['WiFi', 'AC', 'Laundry', 'Parking', 'Kitchen', 'Pool'],
    img1: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    reviews: [
      { author: 'Karen J.',   date: '2 weeks ago', stars: 5, text: 'Amazing kost! Very clean and the staff is super friendly. WiFi is fast too.' },
      { author: 'Michael F.', date: '1 month ago', stars: 4, text: 'Good location, close to office buildings. Room is comfortable. Would recommend.' },
      { author: 'Listia',     date: '2 months ago', stars: 5, text: "Best kost I've stayed at. Great value for the price!" },
    ]
  },
  3: {
    name: 'Kost Harmoni',
    available: true,
    loc: 'West Jakarta · Near Central Park',
    price: 'Rp 2350K',
    rating: 4.6,
    reviewCount: 156,
    room: 'Double Room',
    desc: 'Cozy and efficient kost near Central Park Mall.',
    amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen'],
    img1: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    reviews: [
      { author: 'Michelle L.', date: '2 weeks ago', stars: 5, text: 'Amazing kost! Very clean and the staff is super friendly. WiFi is fast too.' },
      { author: 'Lala L.',     date: '1 month ago', stars: 4, text: 'Good location, close to Malls. Room is comfortable. Would recommend.' },
      { author: 'Chinthia U.', date: '2 months ago', stars: 5, text: "Best kost I've stayed at. Great value for the price!" },
    ]
  },
  4: {
    name: 'Kost Mayrooms',
    available: false,
    loc: 'Depok · Near UI Campus',
    price: 'Rp 2000K',
    rating: 4.5,
    reviewCount: 88,
    room: 'Single Room',
    desc: 'Affordable and clean kost near Universitas Indonesia campus. Popular among students.',
    amenities: ['WiFi', 'Parking'],
    img1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    reviews: [
      { author: 'Rizky A.',  date: '2 weeks ago', stars: 5, text: 'Sangat strategis dekat kampus. Bersih dan harga terjangkau!' },
      { author: 'Siti N.',   date: '1 month ago', stars: 4, text: 'Pemiliknya ramah, kamar nyaman. Parkir luas.' },
      { author: 'Dinda W.',  date: '2 months ago', stars: 4, text: 'Recommended buat anak kos UI!' },
    ]
  },
};

function starsHtml(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function render() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const k = kostDB[id];
  if (!k) return;

  document.title = `KostFinder – ${k.name}`;
  document.getElementById('img1').src = k.img1;
  document.getElementById('img1').alt = k.name;
  document.getElementById('img2').src = k.img2;
  document.getElementById('img2').alt = k.name;
  document.getElementById('detailName').textContent = k.name;
  document.getElementById('detailLoc').textContent = '📍 ' + k.loc;
  document.getElementById('detailPrice').textContent = k.price;
  document.getElementById('detailRating').textContent = k.rating;
  document.getElementById('detailStars').textContent = starsHtml(k.rating);
  document.getElementById('detailReviewCount').textContent = k.reviewCount + ' reviews';
  document.getElementById('detailRoomBadge').textContent = k.room;
  document.getElementById('detailDesc').textContent = k.desc;
  document.getElementById('bigRating').textContent = k.rating;

  document.getElementById('detailAmenities').innerHTML = k.amenities
    .map(a => `<span class="amenity">${a}</span>`).join('');

  document.getElementById('reviewList').innerHTML = k.reviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-author">${r.author}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join('');

  document.getElementById('bookBtn').addEventListener('click', () => {
    const currentUser = localStorage.getItem("loggedInUser");
    // cek login
    if (!currentUser) {
        alert("Please login before booking.");
        window.location.href = "login.html";
        return;
    }

    // cek availability
    if (!k.available) {
        alert("This room is currently unavailable.");
        return;
    }

    window.location.href = `booking.html?id=${id}`;});

    document.getElementById('addReviewBtn').addEventListener('click', () => {

    const currentUser =
        localStorage.getItem("loggedInUser");

    // harus login
    if (!currentUser) {
        alert("Please login to write a review.");
        window.location.href = "login.html";
        return;
    }

    const bookingHistory =
        JSON.parse(localStorage.getItem("bookingHistory")) || [];

    const hasBooked = bookingHistory.some(
        booking =>
            booking.user === currentUser &&
            booking.kostId === id&&
            booking.paymentStatus === "Paid"
    );

    // harus pernah booking
    if (!hasBooked) {
        alert(
            "You can only review a kost that you have booked."
        );
        return;
    }

    window.location.href =
        `addReview.html?id=${id}`;});

    const currentUser =
        localStorage.getItem("loggedInUser");

    const reviewBtn =
        document.getElementById('addReviewBtn');

    if (!currentUser) {
        reviewBtn.style.display = "none";
    }
}

render();
