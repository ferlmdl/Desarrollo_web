document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.add-to-cart-form');
    const cartCountElement = document.getElementById('cart-count');
    const alertContainer = document.getElementById('alert-container');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const productId = form.getAttribute('data-product-id');
            try {
                const response = await fetch(`/api/carrito/${productId}`, {
                    method: 'POST',
                });
                const data = await response.json();

                if (data.success) {
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-success';
                    alert.role = 'alert';
                    alert.innerText = data.message;
                    alertContainer.appendChild(alert);
                    setTimeout(() => {
                        alert.remove();
                    }, 3000);
                    cartCountElement.innerText = data.productosCount;
                } else {
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-danger';
                    alert.role = 'alert';
                    alert.innerText = data.message;
                    alertContainer.appendChild(alert);
                    setTimeout(() => {
                        alert.remove();
                    }, 3000);
                }
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error);
                const alert = document.createElement('div');
                alert.className = 'alert alert-danger';
                alert.role = 'alert';
                alert.innerText = 'Error al agregar producto al carrito';
                alertContainer.appendChild(alert);
                setTimeout(() => {
                    alert.remove();
                }, 3000);
            }
        });
    });
});
