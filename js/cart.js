function renderCart() {
  const container = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  if (!container || !empty) return;
  const cart = GS.readCart();
  if (cart.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    updateSummary(0);
    return;
  }
  empty.style.display = 'none';
  const html = cart.map(item => {
    const p = GS.getProduct(item.id);
    const total = p.price * item.quantity;
    console.log(p.images);
    
    return `
    <div class="card cart-item">
      <div class="cart-item-image"><img src="${p.images[0]}" alt="${p.title}" /></div>
      <div class="cart-item-details">
        <div class="cart-item-header">
          <div>
            <div class="cart-item-title">${p.title}</div>
            <div class="cart-item-size text-muted">Category: ${p.category}</div>
          </div>
          <button class="btn btn-outline" data-remove="${p.id}">Remove</button>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button class="quantity-btn" data-dec="${p.id}">−</button>
            <span class="quantity-display" id="qty-${p.id}">${item.quantity}</span>
            <button class="quantity-btn" data-inc="${p.id}">＋</button>
          </div>
          <div class="cart-item-price">
            <div class="cart-item-total">${GS.money(total)}</div>
            <div class="cart-item-unit text-muted">${GS.money(p.price)} each</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
  container.innerHTML = html;

  bindCartActions();
  updateTotals();
}

function bindCartActions() {
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    GS.removeFromCart(btn.getAttribute('data-remove'));
    renderCart();
  }));
  document.querySelectorAll('[data-inc]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-inc');
    const cart = GS.readCart();
    const item = cart.find(i => i.id === id);
    GS.setQuantity(id, (item?.quantity || 1) + 1);
    renderCart();
  }));
  document.querySelectorAll('[data-dec]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-dec');
    const cart = GS.readCart();
    const item = cart.find(i => i.id === id);
    GS.setQuantity(id, Math.max(1, (item?.quantity || 1) - 1));
    renderCart();
  }));
}

function updateTotals() {
  const cart = GS.readCart();
  const subtotal = cart.reduce((sum, i) => {
    const p = GS.getProduct(i.id);
    return sum + p.price * i.quantity;
  }, 0);
  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const total = subtotal; // no tax, shipping free
  const $ = (id) => document.getElementById(id);
  if ($('subtotal')) $('subtotal').textContent = GS.money(subtotal);
  if ($('total')) $('total').textContent = GS.money(total);
}

document.addEventListener('DOMContentLoaded', () => {
  const checkout = document.getElementById('checkoutBtn');
  if (checkout) checkout.addEventListener('click', () => {
    GS.showToast('Checkout', 'This is a static demo – no backend.');
  });
  
  // WhatsApp integration
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) whatsappBtn.addEventListener('click', () => {
    const cart = GS.readCart();
    if (cart.length === 0) {
      GS.showToast('Cart Empty', 'Please add items to cart first', 'error');
      return;
    }
    
    // Create WhatsApp message with cart details
    let message = `*🛒 Cart Inquiry - Reflective Graces Jewelry*\n\n`;
    message += `*Cart Items:*\n`;
    
    let total = 0;
    cart.forEach(item => {
      const product = GS.getProduct(item.id);
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      message += `• ${product.title} x${item.quantity} - ${GS.money(itemTotal)}\n`;
    });
    
    message += `\n*Total Amount:* ${GS.money(total)}\n`;
    message += `*Shipping:* Free\n`;
    message += `\n*Customer Message:* Hi! I'm interested in these items from your jewelry collection. Please provide more details about availability and sizing options.\n\n`;
    message += `Thank you! 🙏`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918866644502?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear the cart after WhatsApp is opened
    localStorage.removeItem('goldsmith_cart');
    
    // Show success message
    GS.showToast('Order Submitted!', 'Your cart has been cleared and WhatsApp opened with order details.');
    
    // Re-render cart to show empty state
    renderCart();
  });
  
  renderCart();
});


