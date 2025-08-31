// Home page: render filters and product grid

function renderFilters() {
  const tabs = document.getElementById('filterTabs');
  if (!tabs) return;
  const categories = ['all', 'rings', 'necklaces', 'bracelets', 'earrings', 'mangalsutra'];
  const fragment = document.createDocumentFragment();
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-tab${cat === 'all' ? ' active' : ''}`;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.dataset.category = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(cat);
    });
    fragment.appendChild(btn);
  });
  tabs.appendChild(fragment);
}

function productCard(product) {
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const filled = i < Math.round(product.rating);
    return `<span class="star ${filled ? 'filled' : 'empty'}">★</span>`;
  }).join('');

  const features = ['Premium', 'Handcrafted'];
  const featuresHtml = features.map(feature => `<span class="product-feature">${feature}</span>`).join('');

  // Only use 2 images: main image and hover image
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0]; // Fallback to main image if no second image

  return `
  <div class="card product-card" data-product-id="${product.id}" style="cursor: pointer;">
    <div class="product-badges">
      <span class="badge badge-primary">Premium</span>
    </div>
    <div class="product-actions">
      <button class="btn btn-icon btn-outline" data-add="${product.id}" title="Add to Cart">＋</button>
      <button class="btn btn-icon btn-outline" data-view="${product.id}" title="View Details">👁</button>
      <button class="btn btn-icon btn-outline" data-review="${product.id}" title="View Reviews">⭐</button>
    </div>
    <div class="product-image-container">
      <img class="product-image" src="${mainImage}" alt="${product.title}" />
      <img class="product-image hover-image" src="${hoverImage}" alt="${product.title}" />
      <div class="product-image-overlay"></div>
    </div>
    <div class="product-info">
      <div class="product-header">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          ${stars}
          <span class="review-count-small">(${product.reviewCount || 0})</span>
        </div>
      </div>
      <div class="product-features">
        ${featuresHtml}
      </div>
      <div class="product-price">
        <span class="price-current">${GS.money(product.price)}</span>
        <span class="price-original">${GS.money(product.compareAt)}</span>
      </div>
      <button class="btn btn-luxury" data-add="${product.id}">Add to Cart</button>
    </div>
  </div>`;
}

function bindAddToCart(container) {
  container.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-add');
      GS.addToCart(id);
    });
  });
  
  container.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-view');
      GS.showProductModal(id);
    });
  });
  
  container.querySelectorAll('[data-review]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-review');
      GS.showReviewModal(id);
    });
  });
  
  // Make entire product card clickable
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-product-id');
      GS.showProductModal(id);
    });
  });
}

function renderProducts(category = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const list = category === 'all' ? GS.PRODUCTS : GS.PRODUCTS.filter(p => p.category === category);
  grid.innerHTML = list.map(productCard).join('');
  bindAddToCart(grid);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderProducts('all');
  
  // Add category card click functionality
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      // Update filter tabs
      document.querySelectorAll('.filter-tab').forEach(el => el.classList.remove('active'));
      document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
      // Render products for selected category
      renderProducts(category);
      // Scroll to products section
      document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
});


