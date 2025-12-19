# 📋 Resumen Rápido de Implementación

## 🎯 Objetivo
Cuadrícula responsiva de cards que:
- **Desktop**: Grid de 4 columnas × 6 filas
- **Móvil**: Carrusel SwiperJS horizontal

---

## ⚡ Implementación Rápida (3 pasos)

### 1️⃣ Agregar SwiperJS CDN

**Head Code** (Project Settings > Custom Code):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
```

**Footer Code** (Project Settings > Custom Code):
```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 2️⃣ Agregar CSS y JavaScript

**Head Code**: Copia todo el contenido de `locaciones-cards-swiper.css`

**Footer Code** (después del script de Swiper): Copia todo el contenido de `locaciones-cards-swiper.js`

### 3️⃣ Agregar Clases en el Diseñador

1. **Contenedor** (`.morv3-film-mini-cards-container`): Agrega clase `swiper`
2. **Cards** (`.morv3-film-mini-card`): Agrega clase `swiper-slide` a cada una

---

## 📁 Archivos Necesarios

- ✅ `locaciones-cards-swiper.css` → Head Code
- ✅ `locaciones-cards-swiper.js` → Footer Code
- ✅ CDN de SwiperJS → Head Code (CSS) y Footer Code (JS)

---

## 🎨 Aplicar Estilos en el Diseñador (Opcional)

Si quieres aplicar los estilos manualmente en desktop, usa:
- `GUIA-DISEÑADOR-WEBFLOW.md` → Guía paso a paso
- `VALORES-RAPIDOS-WEBFLOW.md` → Valores para copiar/pegar

**Nota**: Los estilos de móvil se manejan automáticamente con SwiperJS.

---

## ✅ Checklist

- [ ] SwiperJS CDN agregado (CSS en Head, JS en Footer)
- [ ] CSS de `locaciones-cards-swiper.css` en Head Code
- [ ] JavaScript de `locaciones-cards-swiper.js` en Footer Code
- [ ] Clase `swiper` agregada al contenedor
- [ ] Clase `swiper-slide` agregada a cada card
- [ ] Estilos de desktop aplicados (opcional, desde el diseñador)

---

## 🐛 Problemas Comunes

### El carrusel no funciona en móvil
→ Verifica que las clases `swiper` y `swiper-slide` estén agregadas

### El grid no funciona en desktop
→ Verifica que el CSS esté cargado correctamente

### Necesito actualizar después de filtrar
→ Llama a `window.Morv3CardsSwiper.update()` después de ocultar/mostrar cards

---

## 📚 Documentación Completa

- **`INSTRUCCIONES-SWIPER-CARDS.md`** → Guía completa de implementación
- **`GUIA-DISEÑADOR-WEBFLOW.md`** → Aplicar estilos en el diseñador
- **`VALORES-RAPIDOS-WEBFLOW.md`** → Valores para copiar/pegar

---

**¡Listo para implementar!** 🚀

