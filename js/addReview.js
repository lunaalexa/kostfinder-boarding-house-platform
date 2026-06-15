document.getElementById('submitReview')
.addEventListener('click', () => {

    const rating =
        document.getElementById('rating').value;

    const review =
        document.getElementById('review').value.trim();

    if (!rating) {
        alert("Please select a rating.");
        return;
    }

    if (!review) {
        alert("Please write a review.");
        return;
    }

    alert("Review submitted successfully!");

    window.location.href = "index.html";
});