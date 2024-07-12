# Desarrollo_web
Este proyecto es una página web de compras que permite a los usuarios explorar, ver detalles y comprar productos. Utilizamos una serie herramientas para desarrollar este proyecto, las cuales se describen a continuación.

Node.js: Plataforma de desarrollo para ejecutar JavaScript en el servidor.
Express: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.
Handlebars: Motor de plantillas para generar vistas dinámicas en HTML.
MongoDB: Base de datos NoSQL para almacenar la información de productos y usuarios.
Mongoose: Biblioteca de modelado de objetos para MongoDB y Node.js.
JWT (JSON Web Tokens): Utilizado para la autenticación y autorización de usuarios.
Bootstrap: Framework CSS para el diseño responsivo y estilización de la página.
Funcionalidades Principales
Visualización de Productos:

En la página principal, se muestra una lista de productos con sus respectivas imágenes, nombres, descripciones y precios.
Cada producto tiene un enlace que redirige a una página de detalles del producto (producto.hbs) donde se muestra información más detallada del producto.

Detalles del Producto:
Al hacer clic en un producto, el usuario es redirigido a la página de detalles del producto (producto.hbs) que muestra el nombre, descripción, imágenes, precio y stock del producto.
Si el usuario está autenticado, puede agregar el producto a su carrito de compras desde esta página.

Carrito de Compras:
Los usuarios pueden agregar productos a su carrito de compras.
En el carrito de compras, los usuarios pueden ver los productos añadidos, modificar las cantidades o eliminar productos.

Autenticación y Autorización:
Los usuarios deben iniciar sesión para agregar productos al carrito y realizar compras.
Se utiliza JWT para autenticar a los usuarios y verificar permisos de administrador para ciertas acciones (como crear, actualizar o eliminar productos).

Administración de Productos:
Los administradores pueden crear, actualizar y eliminar productos a través de la API.
Estas operaciones están protegidas por middleware que verifica los permisos de administrador.
