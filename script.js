const INR_CONVERSION = 83;

const products = [
  { id: 1, name: 'iPhone 14', price: 999, image: 'https://via.placeholder.com/200?text=iPhone+14' },
  { id: 2, name: 'MacBook Pro', price: 1999, image: 'https://via.placeholder.com/200?text=MacBook+Pro' },
  { id: 3, name: 'AirPods Pro', price: 249, image: 'https://via.placeholder.com/200?text=AirPods+Pro' },
  { id: 4, name: 'Samsung Galaxy', price: 899, image: 'https://via.placeholder.com/200?text=Galaxy' },
  { id: 5, name: 'Sony Headphones', price: 199, image: 'https://via.placeholder.com/200?text=Sony+Headphones' },
  { id: 6, name: 'Dell XPS 13', price: 1499, image: 'https://via.placeholder.com/200?text=Dell+XPS+13' },
  { id: 7, name: 'Amazon Echo', price: 99, image: 'https://via.placeholder.com/200?text=Echo' },
  { id: 8, name: 'Logitech Mouse', price: 49, image: 'https://via.placeholder.com/200?text=Mouse' }
];

const cart = [];

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    const inrPrice = (product.price * INR_CONVERSION).toFixed(0);
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${inrPrice}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    const itemTotal = (item.price * item.qty * INR_CONVERSION).toFixed(0);
    div.innerHTML = `
      <span>${item.name}</span>
      <select class="quantity" onchange="changeQty(${index}, this.value)">
        ${[1,2,3,4,5].map(q => `<option value="${q}" ${q === item.qty ? 'selected' : ''}>${q}</option>`).join('')}
      </select>
      <span>₹${itemTotal}</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(div);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = (total * INR_CONVERSION).toFixed(0);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function changeQty(index, qty) {
  cart[index].qty = parseInt(qty);
  updateCart();
}

function toggleCart() {
  const cartEl = document.getElementById('cart');
  cartEl.style.display = cartEl.style.display === 'none' ? 'block' : 'none';
}

renderProducts();
