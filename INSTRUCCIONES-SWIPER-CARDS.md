# 🎠 Instrucciones: Carrusel SwiperJS para Cards Mini en Móvil

## 📋 Resumen

Implementación de SwiperJS para las cards mini que:
- **Desktop (≥768px)**: Mantiene CSS Grid con 4 columnas
- **Móvil (<768px)**: Convierte el grid en un carrusel SwiperJS horizontal
- **Móvil pequeño (<480px)**: 1 card por vista, centrada

---

## 🔧 Paso 1: Agregar SwiperJS CDN

### En Webflow: `Project Settings > Custom Code > Head Code`

Agrega el CSS de Swiper:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
```

### En Webflow: `Project Settings > Custom Code > Footer Code` (o Before </body>)

Agrega el JavaScript de Swiper:

```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

---

## 🎨 Paso 2: Agregar CSS Personalizado

### En Webflow: `Project Settings > Custom Code > Head Code`

Copia TODO el contenido del archivo `locaciones-cards-swiper.css`

---

## 📝 Paso 3: Agregar JavaScript de Inicialización

### En Webflow: `Project Settings > Custom Code > Footer Code` (después del script de Swiper)

Copia TODO el contenido del archivo `locaciones-cards-swiper.js`

---

## 🔧 Paso 4: Agregar Clases en el Diseñador de Webflow

### 4.1. Contenedor Principal

1. Selecciona el elemento `.morv3-film-mini-cards-container`
2. En el panel derecho, pestaña **Settings**
3. En **Custom Attributes** o directamente en **Class**, agrega: `swiper`
4. **Resultado**: El elemento debe tener ambas clases: `morv3-film-mini-cards-container swiper`

⚠️ **IMPORTANTE**: No elimines la clase original, solo agrega `swiper`.

### 4.2. Cards Individuales

1. Selecciona una card (`.morv3-film-mini-card`)
2. O selecciona todas las cards (Shift + Click)
3. Agrega la clase: `swiper-slide`
4. **Resultado**: `morv3-film-mini-card swiper-slide`

⚠️ **IMPORTANTE**: No elimines la clase original, solo agrega `swiper-slide`.

---

## 🎯 Estructura HTML Esperada

Tu estructura en Webflow debe verse así:

```
.morv3-film-mini-cards-container.swiper
  ├── .morv3-film-mini-card.swiper-slide
  │   └── .morv3-film-mini-card-content
  │       ├── .morv3-film-mini-card-icon
  │       └── .morv3-film-mini-card-title
  ├── .morv3-film-mini-card.swiper-slide
  ├── .morv3-film-mini-card.swiper-slide
  └── ... (más cards)
```

**Nota**: En móvil, SwiperJS automáticamente crea un `.swiper-wrapper` interno, pero no necesitas agregarlo manualmente.

---

## ✅ Verificación

### Desktop (≥768px):
- ✅ Debe mostrar un grid de 4 columnas
- ✅ Las cards tienen el mismo tamaño
- ✅ Gap de 24px entre cards
- ✅ No debe haber scroll horizontal

### Tablet (768px - 1200px):
- ✅ Debe mostrar un grid de 3 columnas
- ✅ Gap de 20px entre cards

### Móvil (<768px):
- ✅ Debe mostrar un carrusel horizontal
- ✅ 2 cards visibles por vista (50vw cada una)
- ✅ Se puede deslizar horizontalmente
- ✅ Scroll suave con snap

### Móvil Pequeño (<480px):
- ✅ 1 card visible y centrada
- ✅ Ancho completo (100vw - 48px)

---

## 🎨 Aplicar Estilos en el Diseñador (Opcional)

Si prefieres aplicar los estilos manualmente en el diseñador, sigue la guía en `GUIA-DISEÑADOR-WEBFLOW.md`, pero **NO** apliques los estilos de móvil manualmente. SwiperJS los manejará automáticamente.

---

## 🐛 Solución de Problemas

### El carrusel no aparece en móvil
1. Verifica que las clases `swiper` y `swiper-slide` estén agregadas
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que SwiperJS esté cargado: escribe `typeof Swiper` en la consola (debe ser "function")
4. Verifica que el JavaScript de inicialización esté en el Footer Code

### El grid no funciona en desktop
1. Verifica que el CSS de `locaciones-cards-swiper.css` esté cargado
2. Asegúrate de que el contenedor tenga `display: grid` en desktop
3. Inspecciona el elemento en el navegador y verifica los estilos

### Las cards no tienen el mismo tamaño
1. Verifica que todas las cards tengan `width: 100%` en desktop
2. Asegúrate de que el grid esté configurado correctamente
3. Verifica que no haya estilos que sobrescriban el tamaño

### El carrusel se ve raro en móvil
1. Verifica que SwiperJS esté inicializado (consola: `window.Morv3CardsSwiper.getInstance()`)
2. Asegúrate de que las cards tengan la clase `swiper-slide`
3. Verifica que el breakpoint de 768px esté funcionando

### El filtrado no funciona
1. Verifica que las cards ocultas tengan `display: none` o la clase `filtered-out`
2. Si usas Swiper, llama a `window.Morv3CardsSwiper.update()` después de filtrar
3. Ejemplo:
   ```javascript
   // Después de ocultar/mostrar cards
   if (window.Morv3CardsSwiper && window.Morv3CardsSwiper.getInstance()) {
     window.Morv3CardsSwiper.update();
   }
   ```

---

## 🔄 Actualizar Swiper Después de Filtrar

Si ocultas/muestras cards dinámicamente, necesitas actualizar Swiper:

```javascript
// Ejemplo de función de filtrado
function filtrarCards(categoria) {
  const cards = document.querySelectorAll('.morv3-film-mini-card');
  
  cards.forEach(card => {
    const cardCategoria = card.getAttribute('data-categoria');
    
    if (categoria === 'all' || cardCategoria === categoria) {
      card.style.display = '';
      card.classList.remove('filtered-out');
    } else {
      card.style.display = 'none';
      card.classList.add('filtered-out');
    }
  });
  
  // Actualizar Swiper si está activo
  if (window.Morv3CardsSwiper && window.Morv3CardsSwiper.getInstance()) {
    setTimeout(() => {
      window.Morv3CardsSwiper.update();
    }, 100);
  }
}
```

---

## 🎯 Características Implementadas

✅ SwiperJS v11 por CDN  
✅ CSS Grid en desktop (4 columnas)  
✅ Carrusel SwiperJS en móvil  
✅ Responsive automático (detecta cambio móvil/desktop)  
✅ 2 cards visibles en móvil (1 en móvil pequeño)  
✅ Scroll suave con snap  
✅ Compatible con filtrado dinámico  
✅ Compatible con Webflow CMS  
✅ Sin conflictos entre grid y carrusel  

---

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que todas las clases estén agregadas
2. Verifica que el código esté en los lugares correctos
3. Abre la consola del navegador (F12) y busca errores
4. Verifica que la estructura HTML sea la correcta
5. Prueba en diferentes dispositivos/tamaños de ventana

---

**¡Listo! Tu cuadrícula responsiva con carrusel debería estar funcionando perfectamente.** 🎉

