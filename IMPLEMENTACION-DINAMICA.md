# Documentación: Sistema de Filtrado Dinámico con Finsweet

## 📋 Resumen de la Solución

Este sistema implementa un filtrado inteligente de locaciones que funciona correctamente con la carga dinámica de Finsweet Attributes. El problema principal era que Finsweet carga elementos de 3 en 3 desde la API de Webflow, pero el código de filtrado se ejecutaba antes de que todos estuvieran cargados.

## ✅ Características Principales

### 1. **Overlay de Carga con Spinner**
- Archivo: `loading-overlay.js`
- Muestra un overlay visual mientras se cargan los elementos
- Incluye spinner animado y mensaje de estado
- Se automáticamente al cargar la página

### 2. **Detección Inteligente de Finsweet**
- Monitorea el DOM usando `MutationObserver`
- Detecta cuando Finsweet inyecta nuevos elementos
- Reaaplica filtros automáticamente a elementos nuevos
- Verifica la paginación para determinar cuándo terminó la carga

### 3. **Filtrado Dinámico por Categoría**
- Mapeo entre categorías de mini-cards y categorías de locaciones
- Soporta filtrado por categoría con toggle on/off
- Mantiene el estado activo visualmente con clase `active-category`

### 4. **Swiper.js Reactivo**
- Reinicializa el Swiper cada vez que el filtro cambia
- Actualiza dinámicamente el carrusel con los elementos visibles
- Responsive en móvil y desktop

## 📁 Archivos Modificados

### 1. `locacionesfinales.html`
```html
<!-- Al final del body, antes de </html> -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="loading-overlay.js"></script>
<script>
  const categoriaMap = {
    'agricultura': 'Agricultura',
    'haciendas': 'Haciendas',
    // ... más categorías
  };
</script>
<script src="locaciones-cards-swiper.js"></script>
```

### 2. `loading-overlay.js` (NUEVO)
Sistema independiente para gestionar el overlay de carga:
- `window.Morv3LoadingOverlay.show()` - Muestra el overlay
- `window.Morv3LoadingOverlay.hide()` - Oculta el overlay
- Estilos CSS incluidos automáticamente

### 3. `locaciones-cards-swiper.js` (ACTUALIZADO)
Reemplazado el módulo de filtrado con:
- Detección de Finsweet mediante `MutationObserver`
- Monitoreo continuo cada 100ms para detectar finalización
- Filtrado dinámico que se aplica a nuevos elementos
- Interfaz global: `window.Morv3CfmCategoryFilter`

## 🔄 Flujo de Funcionamiento

```
1. Página carga → loading-overlay.js se inicializa
2. locaciones-cards-swiper.js inicia → muestra overlay
3. MutationObserver monitorea cambios en el DOM
4. Finsweet carga elementos (3 en 3)
5. MutationObserver detecta nuevos elementos
6. Si hay categoría activa → aplica filtro a nuevos elementos
7. Monitor detecta que la paginación está deshabilitada
8. Termina monitoreo → oculta overlay
```

## 🎯 Mapeo de Categorías

En `locacionesfinales.html`, define el mapeo entre categorías:

```javascript
const categoriaMap = {
  'agricultura': 'Agricultura',
  'casas': 'Casas',
  'edificios': 'Edificios',
  'haciendas': 'Haciendas',
  'mercados': 'Mercados',
  // ... etc
};
```

**Importante**: Las claves son los valores de `data-categoria` en las mini-cards, y los valores son los `data-fs-catid` en las cards de locación.

## 📱 HTML Requerido

### Mini Cards (Filtros)
```html
<div class="morv3-cfm-mini-card" data-categoria="agricultura">
  <div>Agricultura</div>
</div>
```

### Cards de Locación
```html
<div class="morv3-cards-locaciones-item" 
     data-fs-catid="Agricultura"
     locacion-nombre="ejemplo-locacion">
  <!-- Contenido -->
</div>
```

### Contenedor del Swiper
```html
<div class="morv3-cards-locaciones-swiper-col swiper">
  <div class="morv3-cards-locaciones-wrapper swiper-wrapper">
    <!-- Cards se insertan aquí -->
  </div>
</div>
```

## 🐛 Solución de Problemas

### Overlay no se muestra
- Verifica que `loading-overlay.js` se cargue antes de `locaciones-cards-swiper.js`
- Revisa la consola del navegador para errores

### Filtros no funcionan
- Verifica que el `categoriaMap` tenga las claves correctas
- Asegúrate que `data-categoria` en mini-cards coincida con claves del mapa
- Verifica que `data-fs-catid` en cards coincida con los valores del mapa

### Swiper no se inicializa
- Verifica que Swiper.js esté cargado (desde CDN)
- Asegúrate que los elementos tengan las clases correctas

### MutationObserver no detecta cambios
- Verifica que `fs-list-element="list"` esté en el contenedor correcto
- Revisa la consola para mensajes de depuración

## 💻 Interfaz Global

```javascript
// Filtrar por categoría
window.Morv3CfmCategoryFilter.filter('agricultura');

// Reset a estado inicial
window.Morv3CfmCategoryFilter.reset();

// Obtener categoría activa
const actual = window.Morv3CfmCategoryFilter.getActiveCategory();

// Control del overlay
window.Morv3LoadingOverlay.show('Cargando...');
window.Morv3LoadingOverlay.hide();
window.Morv3LoadingOverlay.setMessage('Nuevo mensaje');
```

## 📊 Estructura CSS Importante

Las clases CSS clave que el sistema usa:

- `.morv3-cfm-mini-cards-container` - Contenedor de mini-cards
- `.morv3-cfm-mini-card` - Mini-card individual
- `.morv3-cfm-mini-card.active-category` - Mini-card activa (agregado por JS)
- `.morv3-cards-locaciones-item` - Card de locación individual
- `.morv3-cards-locaciones-swiper-col` - Contenedor del Swiper
- `.morv3-cards-locaciones-wrapper` - Wrapper interno del Swiper

## 🚀 Próximos Pasos

1. **Publicar en jcdn**: Una vez verificado que funciona, el archivo se publicará en el repositorio de GitHub
2. **Testing**: Prueba con diferentes categorías y en móvil/desktop
3. **Optimización**: Ajusta los tiempos de espera si es necesario en `iniciarMonitoreoFinsweet()`

## 📝 Notas de Implementación

- El sistema usa IIFE (Immediately Invoked Function Expression) para evitar contaminación global
- Los observadores se limpian automáticamente cuando se detecta la finalización
- El overlay es responsive y funciona en todos los tamaños de pantalla
- La carga dinámica está optimizada para el máximo de 30 segundos

---

**Última actualización**: Implementación completa del sistema de filtrado dinámico con Finsweet
