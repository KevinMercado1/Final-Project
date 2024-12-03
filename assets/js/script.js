// Variables globales para manejar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Manejo de productos dinámico
const products = [
  { id: 1, name: "Laptop", price: 800, img: "pantalla-de-portatil.png" },
  { id: 2, name: "Smartphone", price: 600, img: "smartphone.jpg" },
  { id: 3, name: "Sofá", price: 300, img: "sofa.jpg" },
  { id: 4, name: "Lámpara", price: 50, img: "lamp.jpg" },
  { id: 5, name: "Bicicleta", price: 150, img: "bike.jpg" },
  { id: 6, name: "Balón de fútbol", price: 30, img: "football.jpg" },
];

// Formato de moneda
const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'USD',
});

// Agregar producto al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  // Validar duplicados
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    alert(`${product.name} ya está en el carrito.`);
    return;
  }

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} añadido al carrito.`);
}

// Cargar productos del carrito
function loadCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = ''; // Limpiar contenedor
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name} - ${currencyFormatter.format(item.price)}</p>
      <button onclick="removeFromCart(${index})" aria-label="Eliminar ${item.name} del carrito">Eliminar</button>
    `;
    cartItemsContainer.appendChild(div);
    total += parseFloat(item.price);
  });

  cartTotal.textContent = currencyFormatter.format(total);
}

// Eliminar producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartItems();
}

// Cargar resumen de la compra
function loadPurchaseDetails() {
  const purchaseDetails = document.querySelector('.purchase-details');
  purchaseDetails.innerHTML = ''; // Limpiar contenedor
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} - ${currencyFormatter.format(item.price)}</p>`;
    purchaseDetails.appendChild(div);
    total += parseFloat(item.price);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p>Total: ${currencyFormatter.format(total)}</p>`;
  purchaseDetails.appendChild(totalDiv);
}

// Delegación de eventos para añadir productos
document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const productId = parseInt(event.target.dataset.id, 10);
    addToCart(productId);
  }
});

// Proceder al pago
const checkoutButton = document.querySelector('.proceed-to-checkout');
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    window.location.href = 'compra.html';
  });
}

// Cargar dinámicamente contenido según la página
if (document.querySelector('.cart-items')) {
  loadCartItems();
}

if (document.querySelector('.purchase-details')) {
  loadPurchaseDetails();
}
