// Reuse home rendering for shop
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderFilters === 'function' && typeof renderProducts === 'function') {
    // functions are in home.js, but on shop we include only shop.js.
  }
  // Inline minimal replicas to avoid dependency on home.js
  const categories = ['all', 'rings', 'necklaces', 'bracelets', 'earrings', 'mangalsutra'];
  const tabs = document.getElementById('filterTabs');
  const grid = document.getElementById('productsGrid');
  if (!tabs || !grid) return;

  function money(v){ return GS.money(v); }
  function render(list) {
    grid.innerHTML = list.map(p => {
      const features = ['Premium', 'Handcrafted'];
      const featuresHtml = features.map(feature => `<span class="product-feature">${feature}</span>`).join('');
      
      // Only use 2 images: main image and hover image
      const mainImage = p.images[0];
      const hoverImage = p.images[1] || p.images[0]; // Fallback to main image if no second image
      
      // Generate star rating
      const stars = Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(p.rating);
        return `<span class="star ${filled ? 'filled' : 'empty'}">★</span>`;
      }).join('');

      return `
      <div class="card product-card" data-product-id="${p.id}" style="cursor: pointer;">
        <div class="product-badges">
          <span class="badge badge-primary">Premium</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-icon btn-outline" data-add="${p.id}" title="Add to Cart">＋</button>
          <button class="btn btn-icon btn-outline" data-view="${p.id}" title="View Details">👁</button>
          <button class="btn btn-icon btn-outline" data-review="${p.id}" title="View Reviews">⭐</button>
        </div>
        <div class="product-image-container">
          <img class="product-image" src="${mainImage}" alt="${p.title}" />
          <img class="product-image hover-image" src="${hoverImage}" alt="${p.title}" />
          <div class="product-image-overlay"></div>
        </div>
        <div class="product-info">
          <div class="product-header">
            <h3 class="product-title">${p.title}</h3>
            <div class="product-rating">
              ${stars}
              <span class="review-count-small">(${p.reviewCount || 0})</span>
            </div>
          </div>
          <div class="product-features">
            ${featuresHtml}
          </div>
          <div class="product-price">
            <span class="price-current">${money(p.price)}</span>
            <span class="price-original">${money(p.compareAt)}</span>
          </div>
          <button class="btn btn-luxury" data-add="${p.id}">Add to Cart</button>
        </div>
      </div>`;
    }).join('');
    
    // Bind events
    grid.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      GS.addToCart(b.getAttribute('data-add'));
    }));
    
    grid.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      GS.showProductModal(b.getAttribute('data-view'));
    }));
    
    grid.querySelectorAll('[data-review]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      GS.showReviewModal(b.getAttribute('data-review'));
    }));
    
    // Make entire product card clickable
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-product-id');
        GS.showProductModal(id);
      });
    });
  }

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-tab${cat === 'all' ? ' active' : ''}`;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      const list = cat === 'all' ? GS.PRODUCTS : GS.PRODUCTS.filter(p => p.category === cat);
      render(list);
    });
    tabs.appendChild(btn);
  });

  render(GS.PRODUCTS);
});


