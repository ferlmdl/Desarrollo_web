// Funcionalidades para eliminar del carrito, agregar al carrito y eliminar producto (para la tienda y carrito)
const eliminarDelCarrito = (id) => {
    fetch(`/api/carrito/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => window.location.reload())
    .catch(error => {
        console.error('Error al eliminar el producto del carrito:', error);
    });
};

const agregarProducto = (id) => {
    fetch(`/api/carrito/${id}`, {
        method: "POST",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => window.location.reload())
    .catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
    });
};

const eliminarProducto = (id) => {
    fetch(`/api/producto/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => window.location.reload())
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
    });
};

// Funcionalidades para el formulario de inicio de sesión y registro
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/ingresar"]');
    const registerForm = document.querySelector('form[action="/registro"]');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
            fetch('/ingresar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.location.href = '/';
                } else {
                    alert(result.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());
            fetch('/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.location.href = '/';
                } else {
                    alert(result.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Funcionalidades para la página de pagos
    const payButton = document.querySelector('.btn-primary[href="/pagoExitoso"]');
    if (payButton) {
        payButton.addEventListener('click', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const address = document.getElementById('address').value;

            if (!username || !address) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            fetch('/pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, address })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.location.href = '/pagoExitoso';
                } else {
                    alert(result.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});

// Funcionalidades para los botones en la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    const eliminarButtons = document.querySelectorAll('.eliminar-del-carrito');
    eliminarButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            eliminarDelCarrito(productId);
        });
    });

    const agregarButtons = document.querySelectorAll('.agregar-al-carrito');
    agregarButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.closest('form').getAttribute('data-product-id');
            agregarProducto(productId);
        });
    });

    const buyButton = document.getElementById('buyButton');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            alert('Compra realizada con éxito!');
        });
    }
});
