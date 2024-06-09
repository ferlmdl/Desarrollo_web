const eliminarProducto = (id) => {
    fetch(`/api/productos/${id}`, {
        method: "DELETE",
    }).then(() => window.location.reload());
};

const agregarProducto = (id) => {
    fetch(`/api/carrito/${id}`, {
        method: "POST",
    }).then(() => window.location.reload());
};

const eliminarDelCarrito = (id) => {
    fetch(`/api/carrito/${id}`, {
        method: "PUT",
    }).then(() => window.location.reload());
}