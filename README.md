# Kiosco.lv

Aplicación web de kiosco digital: catálogo de productos, carrito de compras y envío de pedidos por WhatsApp.

No requiere registro, login, backend ni base de datos. Toda la información se lee desde archivos JSON locales.

## Tecnologías

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React

## Cómo instalar

Necesitás [Node.js](https://nodejs.org/) 18 o superior.

```bash
npm install
```

## Cómo ejecutar

Modo desarrollo:

```bash
npm run dev
```

Abrí la URL que muestra Vite (por lo general `http://localhost:5173`).

Build de producción:

```bash
npm run build
npm run preview
```

## Cómo agregar productos

1. Copiá la imagen del producto en `public/images/`.
2. Agregá un objeto nuevo en `src/data/products.json`.
3. Volvé a desplegar (o recargá en desarrollo).

Ejemplo:

```json
{
  "id": 43,
  "name": "Coca Cola 500ml",
  "description": "Botella descartable",
  "price": 1800,
  "category": "Gaseosas",
  "image": "/images/coca500.jpg",
  "available": true,
  "featured": true,
  "bestSeller": false,
  "badge": "OFERTA"
}
```

Campos:

| Campo | Obligatorio | Descripción |
| --- | --- | --- |
| `id` | Sí | Número único |
| `name` | Sí | Nombre del producto |
| `description` | Sí | Descripción corta |
| `price` | Sí | Precio en pesos, sin símbolo |
| `category` | Sí | Debe coincidir con el `name` de una categoría |
| `image` | Sí | Ruta pública, por ejemplo `/images/mi-producto.jpg` |
| `available` | Sí | `false` oculta el producto del catálogo |
| `featured` | No | `true` lo muestra en Destacados |
| `bestSeller` | No | `true` lo muestra en Más vendidos |
| `badge` | No | `OFERTA`, `NUEVO` o `DESTACADO` |

No hace falta modificar componentes ni código.

## Cómo cambiar precios

Editá el campo `price` del producto en `src/data/products.json` y desplegá de nuevo.

## Cómo agregar categorías

1. Agregá un objeto en `src/data/categories.json`.
2. Usá exactamente el mismo `name` en los productos de esa categoría.

```json
{
  "id": "alfajores",
  "name": "Alfajores",
  "emoji": "🍪"
}
```

## Cómo cambiar el número de WhatsApp

Editá `src/data/store.json`:

```json
"whatsapp": "54911XXXXXXXX"
```

Usá el número en formato internacional, sin `+` ni espacios. Ejemplo Argentina: `54911XXXXXXXX`.

También podés cambiar:

- `storeName`
- `address`
- `deliveryCost` (costo de envío)
- `minimumOrder` (pedido mínimo; `0` para desactivarlo)
- `businessHours`
- `banners` (textos del banner promocional)

## Cómo agregar imágenes

1. Guardá el archivo en `public/images/` (JPG, PNG, WebP o SVG).
2. En el producto, apuntá `image` a esa ruta, por ejemplo `"/images/coca500.jpg"`.
3. El dueño del kiosco solo necesita copiar la imagen, actualizar el JSON y hacer deploy.

Si una imagen falta, se muestra un placeholder automático.

## Despliegue

El proyecto es un sitio estático listo para Vercel o Netlify.

### GitHub

```bash
git init
git add .
git commit -m "Initial commit: Kiosco.lv"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/kiosco-lv.git
git push -u origin main
```

### Vercel

1. Importá el repositorio.
2. Framework: Vite.
3. Build: `npm run build`.
4. Output: `dist`.

### Netlify

1. Importá el repositorio.
2. Build: `npm run build`.
3. Publish: `dist`.

El archivo `netlify.toml` ya incluye la redirección SPA.

## Flujo del pedido

1. El cliente navega el catálogo y agrega productos.
2. El carrito se guarda en `localStorage`.
3. Completa nombre, teléfono, tipo de pedido y (si aplica) dirección.
4. Presiona **Enviar Pedido por WhatsApp**.
5. Se abre `wa.me` con el detalle del pedido.

No hay panel de administración ni login: el catálogo se gestiona editando JSON e imágenes.
