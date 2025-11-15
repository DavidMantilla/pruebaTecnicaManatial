# Eventos – Calendario y Vista de Próximos Eventos

Este proyecto muestra un calendario interactivo de eventos junto con una tarjeta informativa del evento seleccionado. Está diseñado para ser simple, rápido y fácil de integrar en cualquier sitio web institucional, parroquial o de comunidad.

## 📌 Características
- Calendario interactivo usando **FullCalendar**.
- Vista de tarjeta con imagen y descripción del evento.
- Diseño adaptable y sencillo.
- Estructura lista para conectar con APIs o datos dinámicos.
- Código limpio y separado en HTML, CSS y JavaScript.

## 🗂 Estructura del Proyecto

/ 

├── index.html 

├── assets/ 

│ ├── css/

│ │ └── main.css

│ ├── js/

│ │ └── main.js

│ └── imagen/

│ └── ImageRef.png


## 📄 index.html
El archivo principal contiene:

- Cabecera con FullCalendar y los recursos del proyecto.
- Sección **Banner** con título e introducción.
- Sección **Próximos eventos**.
- Sección **Calendario + Tarjeta de Evento**.
- La tarjeta se actualiza dinámicamente desde `main.js`.

## 🎨 Estilos
Los estilos están ubicados en:

assets/css/main.css


Allí puedes ajustar:

- Colores
- Tipografías
- Responsividad
- Estilos del calendario y la tarjeta

## 🧠 Lógica del Proyecto
Toda la lógica está en:


Allí puedes ajustar:

- Colores
- Tipografías
- Responsividad
- Estilos del calendario y la tarjeta

## 🧠 Lógica del Proyecto
Toda la lógica está en:


Allí puedes ajustar:

- Colores
- Tipografías
- Responsividad
- Estilos del calendario y la tarjeta

## 🧠 Lógica del Proyecto
Toda la lógica está en:

assets/js/main.js


Incluye:

- Configuración de FullCalendar.
- Manejo del evento `eventClick`.
- Render de la tarjeta con datos del evento.
- Control de estilos y contenido dinámico.

## 📦 Librerías Usadas
- **FullCalendar v6** (CDN)
- JavaScript nativo
- HTML5 + CSS3

## 🚀 Cómo Ejecutarlo
1. Descarga el proyecto.
2. Asegúrate de mantener la estructura de carpetas.
3. Abre `index.html` en tu navegador.
4. El calendario aparecerá inmediatamente.

> No requiere servidor para funcionar (opcional si usas rutas relativas).

## 📝 Requisitos
- Navegador moderno.
- Conexión a internet para cargar FullCalendar vía CDN.

