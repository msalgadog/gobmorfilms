# 📁 Carpeta Labuena - Cuadrícula Responsiva de Cards

Esta carpeta contiene todos los archivos necesarios para implementar la cuadrícula responsiva de cards con SwiperJS en Webflow.

---

## 📄 Archivos Incluidos

### `locacionesfinales.html`
**Archivo principal de ejemplo funcional**

Este HTML contiene:
- ✅ Todas las 23 cards del catálogo original
- ✅ CSS integrado (con variables por defecto)
- ✅ SwiperJS CDN incluido
- ✅ JavaScript de inicialización
- ✅ Ejemplo de función de filtrado

**Cómo usar:**
1. Abre `locacionesfinales.html` en tu navegador
2. Prueba en diferentes tamaños de ventana
3. En móvil (<768px) verás el carrusel SwiperJS
4. En desktop (≥768px) verás el grid de 4 columnas

---

### `locaciones-cards-swiper.css`
**CSS completo para la cuadrícula**

Incluye:
- Estilos de desktop (Grid 4 columnas)
- Estilos de tablet (Grid 3 columnas)
- Estilos de móvil (SwiperJS)
- Variables CSS con valores por defecto
- Animaciones y transiciones

**Para Webflow:**
Copia todo el contenido en `Project Settings > Custom Code > Head Code`

---

### `locaciones-cards-swiper.js`
**JavaScript de inicialización de SwiperJS**

Funcionalidades:
- Detecta automáticamente móvil/desktop
- Inicializa SwiperJS solo en móvil
- Destruye Swiper cuando cambia a desktop
- Compatible con Webflow
- Funciones para actualizar después de filtrar

**Para Webflow:**
Copia todo el contenido en `Project Settings > Custom Code > Footer Code` (después del CDN de SwiperJS)

---

## 🚀 Implementación en Webflow

### Paso 1: Agregar SwiperJS CDN

**Head Code:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
```

**Footer Code:**
```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### Paso 2: Agregar CSS

**Head Code:** Copia todo el contenido de `locaciones-cards-swiper.css`

### Paso 3: Agregar JavaScript

**Footer Code:** Copia todo el contenido de `locaciones-cards-swiper.js`

### Paso 4: Agregar Clases en el Diseñador

1. **Contenedor** (`.morv3-film-mini-cards-container`): Agrega clase `swiper`
2. **Cards** (`.morv3-film-mini-card`): Agrega clase `swiper-slide` a cada una

---

## ✅ Características

- ✅ **Desktop**: Grid de 4 columnas × 6 filas
- ✅ **Tablet**: Grid de 3 columnas
- ✅ **Móvil**: Carrusel SwiperJS horizontal (2 cards visibles)
- ✅ **Móvil pequeño**: 1 card centrada
- ✅ **Filtrado**: Compatible con ocultar/mostrar cards
- ✅ **Responsive**: Cambio automático entre grid y carrusel

---

## 🧪 Probar Localmente

1. Abre `locacionesfinales.html` en tu navegador
2. Redimensiona la ventana para ver los diferentes breakpoints
3. En móvil, prueba deslizar el carrusel
4. Verifica que todas las cards se vean correctamente

---

## 📚 Documentación Completa

Para más detalles, consulta:
- `INSTRUCCIONES-SWIPER-CARDS.md` (en la carpeta principal)
- `GUIA-DISEÑADOR-WEBFLOW.md` (en la carpeta principal)
- `RESUMEN-IMPLEMENTACION.md` (en la carpeta principal)

---

## 🐛 Solución de Problemas

### El carrusel no funciona en móvil
→ Verifica que las clases `swiper` y `swiper-slide` estén agregadas

### El grid no funciona en desktop
→ Verifica que el CSS esté cargado correctamente

### Las cards no tienen el mismo tamaño
→ Verifica que todas tengan `width: 100%` en desktop

---

**¡Listo para usar!** 🎉
