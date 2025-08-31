function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  const p = id ? GS.getProduct(id) : null;
  if (!p) {
    document.getElementById('productPage').innerHTML = '<p>Product not found.</p>';
    return;
  }
  const $ = (id) => document.getElementById(id);
  $('productImage').src = p.images[0];
  $('productImage').alt = p.title;
  $('productTitle').textContent = p.title;
  $('productPrice').textContent = GS.money(p.price);
  $('productCompare').textContent = GS.money(p.compareAt);

  let qty = 1;
  const updateQty = () => $('qtyDisplay').textContent = String(qty);
  $('incQty').addEventListener('click', () => { qty += 1; updateQty(); });
  $('decQty').addEventListener('click', () => { qty = Math.max(1, qty - 1); updateQty(); });
  updateQty();

  $('addBtn').addEventListener('click', () => {
    GS.addToCart(p.id, qty);
  });
});


