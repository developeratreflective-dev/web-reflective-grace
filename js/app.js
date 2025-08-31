// Core app utilities: storage, cart, UI helpers

const STORAGE_KEYS = {
  CART: 'goldsmith_cart'
};

const PRODUCTS = [
  { 
    id: 'ring-1', 
    title: 'Aurora Diamond Ring', 
    price: 299, 
    compareAt: 349, 
    rating: 4.8, 
    category: 'rings', 
    reviewCount: 127,
    material: '18K Gold with VS1 Diamond',
    weight: '3.2g',
    purity: '91.6%',
    certification: 'BIS Hallmarked',
    warranty: 'Lifetime',
    images: [
      './images/ring-1.jpg',
      './images/ring-1-2.jpg'
    ]
  },
  { 
    id: 'ring-2', 
    title: 'Eternal Gold Band', 
    price: 199, 
    compareAt: 229, 
    rating: 4.6, 
    category: 'rings', 
    reviewCount: 89,
    material: '22K Pure Gold',
    weight: '2.8g',
    purity: '99.9%',
    certification: 'BIS Hallmarked',
    warranty: 'Lifetime',
    images: [
      './images/ring-2.jpg',
      './images/ring-2-2.jpg'
    ]
  },
  { 
    id: 'necklace-1', 
    title: 'Starlight Necklace', 
    price: 259, 
    compareAt: 299, 
    rating: 4.7, 
    category: 'necklaces', 
    reviewCount: 156,
    material: '18K Gold with Precious Stones',
    weight: '4.5g',
    purity: '91.6%',
    certification: 'BIS Hallmarked',
    warranty: 'Lifetime',
    images: [
      './images/necklace-1.jpg',
      './images/necklace-1-2.jpg'
    ]
  },
  { 
    id: 'necklace-2', 
    title: 'Luna Pearl Pendant', 
    price: 189, 
    compareAt: 219, 
    rating: 4.5, 
    category: 'necklaces', 
    reviewCount: 94,
    images: [
      './images/necklace-2.jpg',
      './images/necklace-2-2.jpg'
    ]
  },
  { 
    id: 'bracelet-1', 
    title: 'Serenity Bracelet', 
    price: 149, 
    compareAt: 179, 
    rating: 4.4, 
    category: 'bracelets', 
    reviewCount: 67,
    images: [
      './images/bracelet-1.jpg',
      './images/bracelet-1-2.jpg'
    ]
  },
  { 
    id: 'earrings-1', 
    title: 'Gleam Stud Earrings', 
    price: 129, 
    compareAt: 149, 
    rating: 4.3, 
    category: 'earrings', 
    reviewCount: 203,
    images: [
      './images/earrings-1.jpg',
      './images/earrings-1-2.jpg'
    ]
  },
  { 
    id: 'mangalsutra-1', 
    title: 'Traditional Gold Mangalsutra', 
    price: 899, 
    compareAt: 1099, 
    rating: 4.9, 
    category: 'mangalsutra', 
    reviewCount: 156,
    images: [
      './images/necklace-1.jpg',
      './images/necklace-1-2.jpg',
      './images/necklace-1-3.jpg',
      './images/necklace-1-4.jpg'
    ]
  },
  { 
    id: 'mangalsutra-2', 
    title: 'Modern Diamond Mangalsutra', 
    price: 1299, 
    compareAt: 1499, 
    rating: 4.7, 
    category: 'mangalsutra', 
    reviewCount: 89,
    images: [
      './images/necklace-2.jpg',
      './images/necklace-2-2.jpg'
    ]
  },
];

// Sample review data for products
const PRODUCT_REVIEWS = {
  'ring-1': [
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Absolutely stunning! The quality is exceptional and it looks even better in person. Highly recommend!', date: '2024-01-15', verified: true },
    { id: 2, user: 'Michael R.', rating: 5, comment: 'Perfect craftsmanship and beautiful design. My wife loves it!', date: '2024-01-10', verified: true },
    { id: 3, user: 'Emma L.', rating: 4, comment: 'Beautiful piece, very elegant. The only reason I didn\'t give 5 stars is because it arrived a day late.', date: '2024-01-08', verified: true },
    { id: 4, user: 'David K.', rating: 5, comment: 'Exceeded my expectations. The attention to detail is remarkable.', date: '2024-01-05', verified: true },
    { id: 5, user: 'Jennifer A.', rating: 5, comment: 'Gorgeous jewelry! I\'ve received so many compliments. Worth every penny!', date: '2024-01-02', verified: true }
  ],
  'ring-2': [
    { id: 1, user: 'Robert T.', rating: 4, comment: 'Simple and elegant design. Perfect for everyday wear.', date: '2024-01-12', verified: true },
    { id: 2, user: 'Lisa P.', rating: 5, comment: 'Love the minimalist style. Great quality for the price.', date: '2024-01-08', verified: true },
    { id: 3, user: 'James W.', rating: 4, comment: 'Good value, nice finish. Would recommend.', date: '2024-01-05', verified: true }
  ],
  'necklace-1': [
    { id: 1, user: 'Amanda S.', rating: 5, comment: 'This necklace is absolutely gorgeous! The sparkle is incredible.', date: '2024-01-14', verified: true },
    { id: 2, user: 'Chris M.', rating: 5, comment: 'Bought this for my girlfriend and she loves it. Great quality!', date: '2024-01-11', verified: true },
    { id: 3, user: 'Rachel L.', rating: 4, comment: 'Beautiful design, very elegant. Perfect for special occasions.', date: '2024-01-07', verified: true }
  ],
  'necklace-2': [
    { id: 1, user: 'Sophie K.', rating: 5, comment: 'Delicate and beautiful. The pearl has such a lovely luster.', date: '2024-01-13', verified: true },
    { id: 2, user: 'Tom B.', rating: 4, comment: 'Nice piece, good quality pearl. Happy with the purchase.', date: '2024-01-09', verified: true }
  ],
  'bracelet-1': [
    { id: 1, user: 'Maria G.', rating: 4, comment: 'Elegant bracelet, comfortable to wear. Good craftsmanship.', date: '2024-01-11', verified: true },
    { id: 2, user: 'Alex R.', rating: 5, comment: 'Love the design! It\'s both delicate and sturdy.', date: '2024-01-06', verified: true }
  ],
  'earrings-1': [
    { id: 1, user: 'Jessica H.', rating: 5, comment: 'These earrings are perfect! They go with everything.', date: '2024-01-15', verified: true },
    { id: 2, user: 'Daniel L.', rating: 5, comment: 'Excellent quality and beautiful sparkle. Highly recommend!', date: '2024-01-12', verified: true },
    { id: 3, user: 'Natalie P.', rating: 4, comment: 'Very pretty earrings. Good value for money.', date: '2024-01-08', verified: true }
  ],
  'mangalsutra-1': [
    { id: 1, user: 'Priya S.', rating: 5, comment: 'Beautiful traditional design. Perfect for my wedding!', date: '2024-01-14', verified: true },
    { id: 2, user: 'Rajesh K.', rating: 5, comment: 'Excellent craftsmanship. My wife loves it!', date: '2024-01-10', verified: true },
    { id: 3, user: 'Anjali M.', rating: 4, comment: 'Very elegant and traditional. Great quality.', date: '2024-01-06', verified: true }
  ],
  'mangalsutra-2': [
    { id: 1, user: 'Meera P.', rating: 5, comment: 'Modern yet traditional. Perfect blend!', date: '2024-01-13', verified: true },
    { id: 2, user: 'Vikram S.', rating: 4, comment: 'Beautiful design and good quality diamonds.', date: '2024-01-09', verified: true }
  ]
};

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
  } catch {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  updateCartCountUI();
}

function addToCart(productId, quantity = 1) {
  const cart = readCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.quantity += quantity; else cart.push({ id: productId, quantity });
  writeCart(cart);
  showToast('Added to Cart', 'Item has been added to your cart.');
}

function removeFromCart(productId) {
  const cart = readCart().filter(i => i.id !== productId);
  writeCart(cart);
}

function setQuantity(productId, quantity) {
  const cart = readCart().map(i => i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i);
  writeCart(cart);
}

function getProduct(productId) {
  return PRODUCTS.find(p => p.id === productId);
}

function money(value) {
  return `₹${value.toFixed(2)}`;
}

function updateCartCountUI() {
  const count = readCart().reduce((sum, i) => sum + i.quantity, 0);
  const el = document.getElementById('cart-count');
  const elM = document.getElementById('cart-count-mobile');
  if (el) el.textContent = String(count);
  if (elM) elM.textContent = String(count);
}

function bindMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

function showToast(title, description, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.remove('success', 'error');
  toast.classList.add(type);
  const t = document.getElementById('toast-title');
  const d = document.getElementById('toast-description');
  if (t) t.textContent = title;
  if (d) d.textContent = description;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Modal functionality
function showProductModal(productId) {
  const product = getProduct(productId);
  if (!product) return;
  
  const modal = document.getElementById('productModal');
  if (!modal) return;
  
  // Set modal content
  document.getElementById('modalImage').src = product.images[0];
  document.getElementById('modalImage').alt = product.title;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalPrice').textContent = money(product.price);
  document.getElementById('modalCompare').textContent = money(product.compareAt);
  
  // Set additional images for slider (if available)
  if (product.images[1]) {
    document.getElementById('modalImage2').src = product.images[1];
    document.getElementById('modalImage2').alt = product.title;
  }
  if (product.images[2]) {
    document.getElementById('modalImage3').src = product.images[2];
    document.getElementById('modalImage3').alt = product.title;
  }
  
  // Set product highlights
  if (product.material) document.getElementById('modalMaterial').textContent = product.material;
  if (product.weight) document.getElementById('modalWeight').textContent = product.weight;
  if (product.purity) document.getElementById('modalPurity').textContent = product.purity;
  if (product.certification) document.getElementById('modalCertification').textContent = product.certification;
  if (product.warranty) document.getElementById('modalWarranty').textContent = product.warranty;
  
  // Reset quantity
  let modalQty = 1;
  const updateModalQty = () => document.getElementById('modalQtyDisplay').textContent = String(modalQty);
  
  // Bind modal quantity controls
  document.getElementById('modalIncQty').onclick = () => { modalQty++; updateModalQty(); };
  document.getElementById('modalDecQty').onclick = () => { modalQty = Math.max(1, modalQty - 1); updateModalQty(); };
  
  // Bind add to cart
  document.getElementById('modalAddBtn').onclick = () => {
    addToCart(productId, modalQty);
    hideProductModal();
  };
  
  // Bind close
  document.getElementById('modalClose').onclick = hideProductModal;
  modal.onclick = (e) => { if (e.target === modal) hideProductModal(); };
  
  // Initialize image slider
  initializeImageSlider();
  
  // Show modal
  modal.classList.add('active');
  updateModalQty();
}

function hideProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

// Image slider functionality
function initializeImageSlider() {
  let currentSlide = 0;
  const images = document.querySelectorAll('.modal-image');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = images.length;
  
  function showSlide(index) {
    // Hide all images
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current image and dot
    if (images[index]) images[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }
  
  // Bind slider controls
  const nextBtn = document.getElementById('nextImage');
  const prevBtn = document.getElementById('prevImage');
  
  if (nextBtn) nextBtn.onclick = nextSlide;
  if (prevBtn) prevBtn.onclick = prevSlide;
  
  // Bind dot navigation
  dots.forEach((dot, index) => {
    dot.onclick = () => showSlide(index);
  });
  
  // Auto-slide every 5 seconds
  const autoSlideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-slide on hover
  const sliderContainer = document.querySelector('.image-slider');
  if (sliderContainer) {
    sliderContainer.onmouseenter = () => clearInterval(autoSlideInterval);
    sliderContainer.onmouseleave = () => setInterval(nextSlide, 5000);
  }
  
  // Show first slide
  showSlide(0);
}

// Review modal functionality
function showReviewModal(productId) {
  const product = getProduct(productId);
  if (!product) return;
  
  const modal = document.getElementById('reviewModal');
  if (!modal) return;
  
  const reviews = PRODUCT_REVIEWS[productId] || [];
  
  // Set modal content
  document.getElementById('reviewProductImage').src = product.images[0];
  document.getElementById('reviewProductImage').alt = product.title;
  document.getElementById('reviewProductName').textContent = product.title;
  
  // Set product rating
  const starsHtml = Array.from({ length: 5 }).map((_, i) => {
    const filled = i < Math.round(product.rating);
    return `<span class="star ${filled ? 'filled' : 'empty'}">★</span>`;
  }).join('');
  document.getElementById('reviewProductStars').innerHTML = starsHtml;
  document.getElementById('reviewRatingText').textContent = `${product.rating} out of 5`;
  document.getElementById('reviewCount').textContent = `${product.reviewCount} reviews`;
  
  // Generate rating breakdown
  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    ratingDistribution[review.rating]++;
  });
  
  const ratingBarsHtml = [5, 4, 3, 2, 1].map(rating => {
    const count = ratingDistribution[rating];
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return `
      <div class="rating-bar">
        <span class="rating-label">${rating} stars</span>
        <div class="rating-progress">
          <div class="rating-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="rating-count">${count}</span>
      </div>
    `;
  }).join('');
  document.getElementById('ratingBars').innerHTML = ratingBarsHtml;
  
  // Generate reviews list
  if (reviews.length > 0) {
    const reviewsHtml = reviews.map(review => `
      <div class="review-item">
        <div class="review-header-row">
          <div class="review-user">
            <div class="review-avatar">${review.user.charAt(0)}</div>
            <div class="review-user-info">
              <div class="review-username">${review.user}</div>
              ${review.verified ? '<span class="review-verified">Verified Purchase</span>' : ''}
            </div>
          </div>
          <div class="review-rating">
            ${Array.from({ length: 5 }).map((_, i) => 
              `<span class="star ${i < review.rating ? 'filled' : 'empty'}">★</span>`
            ).join('')}
          </div>
        </div>
        <div class="review-comment">${review.comment}</div>
        <div class="review-date">
          📅 ${new Date(review.date).toLocaleDateString()}
        </div>
      </div>
    `).join('');
    document.getElementById('reviewsContainer').innerHTML = reviewsHtml;
  } else {
    document.getElementById('reviewsContainer').innerHTML = `
      <div class="review-item">
        <p style="text-align: center; color: var(--muted-foreground);">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    `;
  }
  
  // Bind close button
  document.getElementById('reviewModalClose').onclick = hideReviewModal;
  modal.onclick = (e) => { if (e.target === modal) hideReviewModal(); };
  
  // Bind write review button
  document.getElementById('writeReviewBtn').onclick = () => {
    const reviewForm = document.getElementById('reviewForm');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    
    if (reviewForm.style.display === 'none') {
      reviewForm.style.display = 'block';
      writeReviewBtn.textContent = 'Hide Review Form';
    } else {
      reviewForm.style.display = 'none';
      writeReviewBtn.textContent = 'Write a Review';
    }
  };
  
  // Bind review form functionality
  bindReviewForm(product);
  
  // Show modal
  modal.classList.add('active');
}

function hideReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.remove('active');
}

// Bind review form functionality
function bindReviewForm(product) {
  let selectedRating = 0;
  
  // Star rating selection
  document.querySelectorAll('.star-input').forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-rating'));
      selectedRating = rating;
      
      // Update star display
      document.querySelectorAll('.star-input').forEach((s, index) => {
        if (index < rating) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });
  
  // Cancel button
  document.getElementById('cancelReview').onclick = () => {
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('writeReviewBtn').textContent = 'Write a Review';
    // Reset form
    selectedRating = 0;
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewComment').value = '';
    document.querySelectorAll('.star-input').forEach(s => s.classList.remove('selected'));
  };
  
  // Submit button - WhatsApp integration
  document.getElementById('submitReview').onclick = () => {
    const name = document.getElementById('reviewName').value.trim();
    if (!name) {
      showToast('Please enter your name', 'Name is required', 'error');
      return;
    }
    
    if (selectedRating === 0) {
      showToast('Please select a rating', 'Rating is required', 'error');
      return;
    }
    
    const comment = document.getElementById('reviewComment').value.trim();
    if (!comment) {
      showToast('Please write a review', 'Review comment is required', 'error');
      return;
    }
    
    // Create WhatsApp message
    const message = `*Product Review for ${product.title}*\n\n` +
                   `*Customer Name:* ${name}\n\n` +
                   `*Rating:* ${'⭐'.repeat(selectedRating)} (${selectedRating}/5)\n\n` +
                   `*Review:* ${comment}\n\n` +
                   `*Product Details:*\n` +
                   `- Price: ${money(product.price)}\n` +
                   `- Category: ${product.category}\n` +
                   `- Current Rating: ${product.rating}/5\n` +
                   `- Total Reviews: ${product.reviewCount}\n\n` +
                   `Thank you for your feedback! 🙏`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918866644502?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showToast('Review Submitted!', 'Thank you for your feedback. Redirecting to WhatsApp...');
    
    // Reset form
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('writeReviewBtn').textContent = 'Write a Review';
    selectedRating = 0;
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewComment').value = '';
    document.querySelectorAll('.star-input').forEach(s => s.classList.remove('selected'));
  };
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCountUI();
  bindMobileMenu();
  setYear();
});

// Expose minimal API for other scripts
window.GS = {
  PRODUCTS,
  addToCart,
  removeFromCart,
  setQuantity,
  readCart,
  getProduct,
  money,
  showToast,
  showProductModal,
  hideProductModal,
  showReviewModal,
  hideReviewModal,
};


