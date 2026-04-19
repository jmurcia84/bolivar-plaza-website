# Bolívar Plaza — Sitio Web Oficial

Sitio web del Centro Comercial Bolívar Plaza, Pereira, Colombia.  
Construido con Next.js 16 (static export), Tailwind CSS y Decap CMS.

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 16.2 | Framework React con App Router |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos utilitarios |
| shadcn/ui | Componentes UI accesibles |
| Lucide React | Íconos SVG |
| Decap CMS | Panel de administración de contenido |
| Netlify | Hosting + Identity + Git Gateway |

---

## Desarrollo local

### Requisitos

- Node.js 18 o superior
- npm 9 o superior

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Build de producción

```bash
npm run build
```

Genera los archivos estáticos en la carpeta `out/`.

---

## Estructura del proyecto

```
site/
├── content/                  # Contenido gestionado por el CMS
│   ├── config/
│   │   ├── general.json      # Info general: nombre, dirección, horarios, redes
│   │   ├── slider.json       # Diapositivas del hero slider
│   │   ├── marcas.json       # Logos de marcas en el marquee
│   │   └── popup.json        # Configuración del pop-up de bienvenida
│   ├── tiendas/              # Una tienda por archivo JSON
│   └── eventos/              # Un evento por archivo JSON
├── public/
│   ├── admin/
│   │   ├── index.html        # Panel Decap CMS
│   │   └── config.yml        # Configuración de colecciones del CMS
│   └── images/
│       └── uploads/          # Imágenes subidas desde el CMS
└── src/
    ├── app/                  # Rutas Next.js (App Router)
    │   ├── page.tsx          # Página principal
    │   ├── tiendas/          # Directorio de tiendas
    │   └── eventos/          # Calendario de eventos
    ├── components/           # Componentes React
    └── lib/
        └── content.ts        # Utilidades para leer archivos JSON
```

---

## Despliegue en Netlify

### 1. Conectar el repositorio

1. Ve a [app.netlify.com](https://app.netlify.com) e inicia sesión
2. Haz clic en **Add new site → Import an existing project**
3. Selecciona **GitHub** y autoriza el acceso
4. Elige el repositorio `bolivar-plaza-website`

### 2. Configurar el build

Netlify detecta automáticamente la configuración desde `netlify.toml`. Verifica que los valores sean:

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |

### 3. Activar Netlify Identity

El CMS requiere autenticación para que solo personas autorizadas puedan editar contenido.

1. En el dashboard de tu sitio, ve a **Site configuration → Identity**
2. Haz clic en **Enable Identity**
3. En **Registration** selecciona **Invite only** (recomendado)
4. En **Services → Git Gateway**, haz clic en **Enable Git Gateway**

### 4. Invitar usuarios al CMS

1. Ve a **Identity → Invite users**
2. Ingresa el correo del administrador del contenido
3. El usuario recibirá un correo con un enlace para crear su contraseña

### 5. Acceder al panel CMS

Una vez desplegado, el panel estará disponible en:

```
https://tu-sitio.netlify.app/admin
```

---

## Configuración de Decap CMS

El archivo `public/admin/config.yml` define todas las colecciones editables.

### Colecciones disponibles

#### Configuración general (`content/config/general.json`)
Nombre del mall, slogan, dirección, teléfono, email, horarios y URLs de redes sociales.

#### Slider principal (`content/config/slider.json`)
Lista de diapositivas. Cada diapositiva tiene: imagen de fondo, título, subtítulo, texto del botón CTA y enlace.

#### Logos de marcas (`content/config/marcas.json`)
Lista de marcas que aparecen en el marquee animado. Cada marca tiene nombre y logo (imagen opcional).

#### Pop-up de bienvenida (`content/config/popup.json`)
Configura el pop-up que aparece al cargar la página:
- **Activo** — Activa o desactiva el pop-up sin tocar código
- **Imagen** — Imagen que muestra el pop-up
- **Tamaño** — Pequeño (360px) / Mediano (480px) / Grande (640px) / Panorámico (800px)
- **Enlace** — URL al hacer clic (opcional)
- **Texto del botón** — CTA del pop-up (por defecto "Ver más")

#### Tiendas (`content/tiendas/`)
Un archivo JSON por tienda. Campos: nombre, categoría, descripción, número de local, piso, logo, foto, redes sociales y sitio web.

**Categorías disponibles:** Moda, Gastronomía, Entretenimiento, Servicios

#### Eventos (`content/eventos/`)
Un archivo JSON por evento. Campos: título, fecha, hora, lugar, descripción, imagen y enlace externo.

---

## Actualizar contenido sin el CMS

También puedes editar directamente los archivos JSON en `content/` y hacer commit al repositorio. Netlify detectará el cambio y reconstruirá el sitio automáticamente.

---

## Variables de entorno

Este proyecto no requiere variables de entorno. La autenticación del CMS se gestiona completamente a través de Netlify Identity.

---

## Créditos

Construido con [Claude Web Builder](https://tododeia.com) by [Tododeia](https://tododeia.com).
