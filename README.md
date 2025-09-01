# 🌌 Portafolio Personal --- Andrea Elena Hernández Peyro

![Portfolio Preview](./public/preview.png)
`<!-- puedes cambiar por tu screenshot -->`{=html}

Este es mi **portafolio personal** desarrollado con **React +
TypeScript** y desplegado en **Cloudflare Pages**.\
El objetivo principal es **mostrar quién soy, mis proyectos,
certificaciones y habilidades**, integrando secciones dinámicas y datos
en tiempo real.

------------------------------------------------------------------------

## 🚀 Características

-   🎨 **Diseño limpio y moderno** con soporte para temas (dark,
    twilight, sunset, earthen).
-   📚 **Sección de Certificaciones** conectada a **Firebase Storage**,
    con estadísticas de skills y progreso.
-   📝 **Notas & Random Stuff** con integración a Notion API.
-   🏗 **Educación y Experiencia** cargadas desde archivos Markdown
    (`/content`).
-   🖼 **Grid de Certificados** con vista previa, tarjetas estilizadas y
    opción de *Load More*.
-   🔐 **Autenticación con cookies** para links privados o anónimos.
-   📊 **Resumen visual de habilidades** con barras de progreso.
-   🎶 Sección "Random Stuff" con hobbies (leer, dibujar, tocar violín
    🎻) y animaciones en íconos.

------------------------------------------------------------------------

## 🛠️ Tecnologías

-   **React 18** ⚛️
-   **TypeScript** 📘
-   **Firebase Storage** 🔥
-   **Astro** (estructura de contenidos en `content/`)
-   **Cloudflare Pages** ☁️ para el deploy
-   **CSS puro** 🎨 (tema oscuro en tonos morados y azules, sin
    Tailwind)

------------------------------------------------------------------------

## 📂 Estructura principal del proyecto

    /public         # Imágenes, íconos y assets estáticos
    /src
      /components   # Componentes reutilizables (Cards, Grids, Navbar, etc.)
      /pages        # Secciones del portafolio (About, Certificates, Notes, etc.)
      /services     # Integraciones (Firebase, Notion, etc.)
      /styles       # Estilos en CSS puro
    /content
      /DataEducation   # Datos de educación en Markdown
      /DataExperience  # Datos de experiencia en Markdown

------------------------------------------------------------------------

## ⚡ Instalación y ejecución en local

``` bash
# 1. Clonar el repo
git clone https://github.com/ORYEPA/Portfolio_TSX.git
cd Portfolio_TSX

# 2. Instalar dependencias
npm install

# 3. Ejecutar en local
npm run dev

# 4. Abrir en el navegador
http://localhost:3000
```

------------------------------------------------------------------------

## 🌍 Deploy

El proyecto está desplegado en **Cloudflare Pages**\
👉 [Portafolio en vivo](https://andrea-peyro-portfolio.pages.dev)

------------------------------------------------------------------------

## 📸 Screenshots

  ------------------------------------------------------------------------------------------------------------------
  Home                                 Certificates                           Notes
  ------------------------------------ -------------------------------------- --------------------------------------
  ![Home](./public/screens/home.png)   ![Certs](./public/screens/certs.png)   ![Notes](./public/screens/notes.png)

  ------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🗺️ Roadmap

-   [x] Sección de educación y experiencia
-   [x] Estadísticas de certificaciones y skills más repetidas
-   [x] Integración con Notion API para notas
-   [ ] Agregar un blog técnico ✍️
-   [ ] Sección de proyectos con filtros dinámicos
-   [ ] Modo offline con PWA

------------------------------------------------------------------------

## 📬 Contacto

📧 **andreaelenapeyro@gmail.com**\
🔗 [LinkedIn](https://www.linkedin.com/in/andrea-peyro)\
🖥 [GitHub](https://github.com/ORYEPA)\
🗂 [Portafolio en vivo](https://andrea-peyro-portfolio.pages.dev)

------------------------------------------------------------------------

💜 Creado con pasión por **Andrea Elena Hernández Peyro**
