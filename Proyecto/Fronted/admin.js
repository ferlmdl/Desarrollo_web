const eliminarProducto = (id) => {
    fetch(`/api/${id}`, {
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

const eliminarDelCarrito = (id) => {
    fetch(`/api/carrito/${id}`, {
        method: "PUT",
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
