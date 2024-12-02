// Productos disponibles
const products = [
  { id: 1, name: 'Laptop', price: 800, img: 'pantalla-de-portatil.png' },
  { id: 2, name: 'Smartphone', price: 600, img: 'smartphone.jpg' },
  { id: 3, name: 'Sofá', price: 300, img: 'sofa.jpg' },
  { id: 4, name: 'Lámpara', price: 50, img: 'lamp.jpg' },
  { id: 5, name: 'Bicicleta', price: 150, img: 'bike.jpg' },
  { id: 6, name: 'Balón de fútbol', price: 30, img: 'football.jpg' },
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar lista de productos
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Limpia los productos anteriores

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Precio: $${product.price.toFixed(2)}</p>
      <button class="btn add-to-cart" data-id="${product.id}">
        Añadir al carrito
      </button>
    `;
    productList.appendChild(productDiv);
  });
}

// Renderizar carrito
function loadCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Limpia el contenedor
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)}</p>
      <button class="btn remove-from-cart" data-index="${index}">
        Eliminar
      </button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Agregar producto al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!cart.some((item) => item.id === productId)) {
    cart.push(product);
    updateLocalStorage();
    alert(`${product.name} añadido al carrito.`);
  } else {
    alert(`${product.name} ya está en el carrito.`);
  }
  loadCartItems();
}

// Eliminar producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateLocalStorage();
  loadCartItems();
}

// Actualizar localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Delegación de eventos
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = parseInt(e.target.dataset.id, 10);
    addToCart(productId);
  }

  if (e.target.classList.contains('remove-from-cart')) {
    const index = parseInt(e.target.dataset.index, 10);
    removeFromCart(index);
  }
});

// Proceder al pago
const checkoutButton = document.querySelector('.proceed-to-checkout');
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    window.location.href = 'compra.html';
  });
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  loadCartItems();
});

// recordar que tenemos que montar las imagenes para que carguen 
