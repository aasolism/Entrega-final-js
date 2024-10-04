renderCarrito();

// Vaciar el carrito al hacer clic en el botón
document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
document.getElementById('volverInicio').addEventListener('click', function() {
    location.href = '../index.html';
});

// Confirmar la compra
document.getElementById('confirmarCompra').addEventListener('click', function() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.length > 0) {
        vaciarCarrito();
        Swal.fire('¡Gracias!', 'Tu compra fue confirmada', 'success');
    } else {
        Swal.fire('Error', 'El carrito está vacío', 'error');
    }
});

// Renderizar el carrito
function renderCarrito() {
  const cartItemsContainer = document.getElementById('cart-items');
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  cartItemsContainer.innerHTML = '';

  if (storedCart.length > 0) {
      storedCart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.innerHTML = `
              <h3>${item.partido}</h3>
              <p>Cantidad: <button class="btn-decrementar" data-index="${index}">-</button> ${item.cantidad} <button class="btn-incrementar" data-index="${index}">+</button> - Tipo: ${item.tipo} - Total: $${item.total}</p>
              <button class="btn-eliminar" data-index="${index}">Eliminar</button>
          `;
          cartItemsContainer.appendChild(cartItem);
      });

      document.querySelectorAll('.btn-incrementar').forEach(btn => {
          btn.addEventListener('click', function() {
              modificarCantidad(this.dataset.index, 1);
          });
      });

      document.querySelectorAll('.btn-decrementar').forEach(btn => {
          btn.addEventListener('click', function() {
              modificarCantidad(this.dataset.index, -1);
          });
      });

      document.querySelectorAll('.btn-eliminar').forEach(btn => {
          btn.addEventListener('click', function() {
              eliminarProducto(this.dataset.index);
          });
      });

      mostrarTotal();
  } else {
      cartItemsContainer.innerHTML = "<p>Tu carrito está vacío</p>";
      document.getElementById('total').textContent = "Total: $0"; 
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('cart');
  renderCarrito();
}

// Mostrar el total del carrito
function mostrarTotal() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = storedCart.reduce((acc, item) => acc + item.total, 0);
  document.getElementById('total').textContent = `Total: $${total}`;
}
