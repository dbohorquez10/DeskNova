# DeskNova — Tecnología que inspira

**DeskNova** es una tienda virtual de accesorios tecnológicos para escritorios y espacios de trabajo. Ofrece una experiencia de compra moderna e intuitiva que permite explorar productos, filtrar el catálogo, comparar opciones y gestionar un carrito de compras.

El proyecto está desarrollado con tecnologías web estándar: HTML5, CSS3 y JavaScript, sin necesidad de frameworks ni herramientas de compilación.

## ✨ Características principales

- **Página de inicio:** presentación de la marca, accesos rápidos y categorías destacadas.
- **Catálogo de productos:** 15 productos con imágenes, descripciones, precios y valoraciones.
- **Búsqueda y filtros:** búsqueda por nombre y filtros combinables por categoría, rango de precios, marca, tipo de conexión y disponibilidad, con botón para limpiar filtros. Las categorías de la página de inicio abren el catálogo ya filtrado.
- **Ordenamiento:** organización de productos por precio, nombre y valoración.
- **Detalle de producto:** al seleccionar un producto se muestran nombre, imagen, descripción, precio final, especificaciones técnicas, compatibilidad, disponibilidad y opciones de entrega. Los productos agotados no se pueden agregar al carrito.
- **Comparador de productos:** comparación de dos o tres productos según precio, categoría, marca, tipo de sensor, tipo de conexión, disponibilidad, características técnicas, compatibilidad y valoración, con la opción "Comprar ahora". Si hay menos de dos productos seleccionados se muestra un mensaje de error.
- **Carrito de compras:** agregar y eliminar productos, modificar cantidades y consultar el subtotal y el total.
- **Entrega sin costo adicional:** el envío a domicilio y la recogida en tienda no modifican el precio final.
- **Inicio y cierre de sesión (opcional):** interfaz de autenticación con credenciales de demostración. No es obligatoria para comprar.
- **Proceso de compra simulado:** resumen del pedido, elección entre envío a domicilio o recogida en tienda, datos de entrega, método de pago simulado (tarjeta, PSE o contra entrega), validación de campos obligatorios y confirmación visual con número de pedido.
- **Diseño adaptable:** interfaz pensada para ofrecer una experiencia cómoda en distintos tamaños de pantalla.
- **Notificaciones interactivas:** mensajes visuales para informar sobre las acciones realizadas.

## 🛍️ Categorías de productos

El catálogo incluye las siguientes categorías:

| Categoría | Descripción |
|---|---|
| Teclados | Teclados mecánicos, compactos y silenciosos. |
| Ratones | Ratones ergonómicos y dispositivos para gaming. |
| Audio | Auriculares, micrófonos y monitores de estudio. |
| Iluminación | Lámparas de escritorio e iluminación RGB. |
| Monitores | Monitores para productividad y entretenimiento. |
| Accesorios | Hubs USB-C, alfombrillas y complementos. |

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura y organización del contenido.
- **CSS3:** estilos, diseño visual, animaciones y adaptación de la interfaz.
- **JavaScript (ES6+):** navegación entre vistas, renderizado dinámico del catálogo, filtros, comparación de productos, autenticación de demostración y lógica del carrito.
- **Google Fonts:** tipografías Inter y Space Grotesk.
- **Unsplash:** imágenes utilizadas en la interfaz y el catálogo.

## 📂 Estructura del proyecto

```text
DeskNova/
├── index.html    # Estructura principal de la aplicación
├── styles.css    # Estilos y diseño visual
├── app.js        # Lógica e interactividad
└── README.md     # Documentación del proyecto
```

## 🚀 Instalación y ejecución

### Requisitos previos

- Un navegador web moderno.
- Git, si deseas clonar el repositorio.
- Conexión a Internet para cargar las fuentes y las imágenes externas.

### 1. Clonar el repositorio

```bash
git clone https://github.com/dbohorquez10/DeskNova.git
```

### 2. Entrar en el directorio

```bash
cd DeskNova
```

### 3. Ejecutar el proyecto

Abre el archivo `index.html` directamente en tu navegador.

También puedes utilizar la extensión **Live Server** de Visual Studio Code para ejecutar el proyecto mediante un servidor de desarrollo local.

No es necesario instalar dependencias ni ejecutar comandos de compilación.

## 🔑 Acceso de demostración

El inicio de sesión es opcional. Para probarlo, utiliza las siguientes credenciales:

| Campo | Valor |
|---|---|
| Correo electrónico | `demo@desknova.com` |
| Contraseña | `demo` |

Estas credenciales están destinadas exclusivamente a la demostración de la interfaz.

## 🧭 Cómo utilizar DeskNova

1. **Explorar:** accede a la página de inicio y descubre las categorías destacadas.
2. **Buscar productos:** entra en la tienda y utiliza la búsqueda, los filtros y las opciones de ordenamiento.
3. **Comparar:** selecciona al menos dos productos y abre el comparador para revisar sus características.
4. **Agregar al carrito:** incorpora productos y ajusta las cantidades según tus necesidades.
5. **Revisar el pedido:** consulta el subtotal y el total; la entrega no tiene costo adicional.
6. **Pagar:** selecciona la modalidad de entrega, completa tus datos y elige un método de pago simulado.
7. **Confirmar:** confirma el pedido y observa la confirmación con su número; el carrito se vacía automáticamente.

## ⚙️ Consideraciones técnicas

DeskNova es un prototipo funcional de comercio electrónico desarrollado en el lado del cliente.

- Los productos y sus datos están definidos en el código JavaScript.
- La gestión del carrito y de la sesión utiliza almacenamiento del navegador.
- La autenticación utiliza credenciales predefinidas y no representa un sistema de usuarios real.
- La confirmación del pedido es una simulación visual.
- No se encuentra implementada una integración real con pasarelas de pago, bases de datos ni servicios de inventario.
- Las imágenes y las fuentes externas requieren conexión a Internet.

**Importante:** el proyecto está pensado para demostración y aprendizaje. No debe utilizarse para procesar compras reales ni almacenar información sensible sin implementar previamente una infraestructura de seguridad adecuada.

## 🎯 Objetivo del proyecto

Desarrollar una experiencia de comercio electrónico que integre diseño de interfaces, organización de productos, interactividad y gestión básica de un flujo de compra, utilizando tecnologías web fundamentales.

## 👨‍💻 Autores

-**Darwing Yailang Bohórquez Jaimes**
-**Laura Sofia Mantilla Hernandez**
-**Jenny Carolina Perez Montañez**

