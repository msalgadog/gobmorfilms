# 🎨 Guía Paso a Paso: Aplicar Estilos en el Diseñador de Webflow

Esta guía te ayudará a aplicar los estilos de la cuadrícula responsiva usando el diseñador visual de Webflow, sin necesidad de escribir código manualmente.

---

## 📋 Índice

1. [Contenedor Principal](#1-contenedor-principal)
2. [Cards Individuales](#2-cards-individuales)
3. [Contenido de la Card](#3-contenido-de-la-card)
4. [Icono](#4-icono)
5. [Título](#5-título)
6. [Responsive - Tablet](#6-responsive---tablet)
7. [Responsive - Móvil](#7-responsive---móvil)
8. [Responsive - Móvil Pequeño](#8-responsive---móvil-pequeño)
9. [Estados de Hover](#9-estados-de-hover)

---

## 1. Contenedor Principal

### Seleccionar:
- Busca y selecciona el elemento con la clase `.morv3-film-mini-cards-container`

### Aplicar en el Panel de Estilos:

#### **Layout**
- **Display**: `Grid` (en el dropdown)
- **Grid Template Columns**: 
  - Click en el ícono de grid
  - Selecciona "4 columns" o escribe `repeat(4, 1fr)` en Custom
- **Gap**: `24px`
- **Align Items**: `Start`

#### **Size**
- **Width**: `100%`
- **Max Width**: `100%`

---

## 2. Cards Individuales

### Seleccionar:
- Selecciona una card individual (`.morv3-film-mini-card`)
- O selecciona todas las cards y aplica los estilos

### Aplicar en el Panel de Estilos:

#### **Layout**
- **Display**: `Flex`
- **Flex Direction**: `Column`
- **Justify Content**: `Center`
- **Align Items**: `Center`
- **Gap**: `10px`

#### **Size**
- **Width**: `100%`
- **Min Height**: `55px`
- **Height**: `Auto`

#### **Spacing**
- **Padding Top**: Usa tu variable `var(--_morv3-sizes---space--morv3-gap-sm)`
- **Padding Right**: Usa tu variable `var(--_morv3-sizes---space--morv3-gap-lg)`
- **Padding Bottom**: Usa tu variable `var(--_morv3-sizes---space--morv3-gap-sm)`
- **Padding Left**: Usa tu variable `var(--_morv3-sizes---space--morv3-gap-lg)`

#### **Border**
- **Border Style**: `Solid`
- **Border Width**: `1px` (todos los lados)
- **Border Color**: Usa tu variable `var(--_morv3-themes---border--morv3-border-low)`

#### **Border Radius**
- Usa tu variable `var(--_morv3-global---border-radius--morv3-border-radius-round)` para todos los lados

#### **Background**
- **Background Color**: Usa tu variable `var(--_morv3-themes---background--morv3-bg-surface-low)`

#### **Effects**
- **Box Shadow**: 
  - Click en "Add Shadow"
  - X: `0px`
  - Y: `2px`
  - Blur: `2px`
  - Spread: `0px`
  - Color: `rgba(0, 0, 0, 0.03)`

#### **Transitions**
- Click en "Add Transition"
- **Property**: `Opacity, Transform, Box Shadow`
- **Duration**: `0.3s`
- **Easing**: `Ease`

---

## 3. Contenido de la Card

### Seleccionar:
- Selecciona el elemento `.morv3-film-mini-card-content` dentro de cada card

### Aplicar en el Panel de Estilos:

#### **Layout**
- **Display**: `Flex`
- **Align Items**: `Center`
- **Align Self**: `Stretch`
- **Gap**: `10px`

#### **Size**
- **Width**: `100%`

---

## 4. Icono

### Seleccionar:
- Selecciona el elemento `.morv3-film-mini-card-icon` (la imagen del icono)

### Aplicar en el Panel de Estilos:

#### **Size**
- **Width**: `30px`
- **Height**: `30px`

#### **Layout**
- **Flex Shrink**: `0`

---

## 5. Título

### Seleccionar:
- Selecciona el elemento `.morv3-film-mini-card-title`

### Aplicar en el Panel de Estilos:

#### **Typography**
- **Font Family**: Usa tu variable `var(--_morv3-sizes---fontfamily--morv3-title)`
- **Font Size**: `22px`
- **Line Height**: `120%` o `1.2`
- **Font Weight**: `400`
- **Font Style**: `Normal`

#### **Colors**
- **Text Color**: `rgb(68, 72, 55)` o `#444837`

#### **Layout**
- **Flex**: `1`

---

## 6. Responsive - Tablet

### Cambiar Breakpoint:
1. En la barra superior, selecciona el breakpoint de **Tablet** (768px o 992px)
2. Selecciona el contenedor `.morv3-film-mini-cards-container`

### Aplicar Cambios:

#### **Layout**
- **Grid Template Columns**: Cambia a `repeat(3, 1fr)` o selecciona "3 columns"
- **Gap**: Cambia a `20px`

---

## 7. Responsive - Móvil

### Cambiar Breakpoint:
1. Selecciona el breakpoint de **Móvil** (767px o menor)
2. Selecciona el contenedor `.morv3-film-mini-cards-container`

### Aplicar Cambios:

#### **Layout**
- **Display**: Cambia a `Flex`
- **Flex Direction**: `Row`
- **Gap**: `16px`

#### **Overflow**
- **Overflow X**: `Auto`
- **Overflow Y**: `Hidden`

#### **Spacing**
- **Padding Bottom**: `10px`

#### **Custom CSS** (si es necesario):
En el panel de estilos, en la sección de código personalizado, agrega:
```css
scroll-snap-type: x mandatory;
-webkit-overflow-scrolling: touch;
scrollbar-width: thin;
scrollbar-color: rgba(68, 72, 55, 0.3) transparent;
```

### Para las Cards en Móvil:
1. Selecciona `.morv3-film-mini-card` en el breakpoint móvil

#### **Layout**
- **Flex Shrink**: `0`

#### **Size**
- **Width**: `calc(50vw - 32px)`
- **Min Width**: `calc(50vw - 32px)`
- **Max Width**: `calc(50vw - 32px)`
- **Min Height**: `55px`

#### **Spacing**
- **Padding Right**: `16px`
- **Padding Left**: `16px`

#### **Custom CSS**:
```css
scroll-snap-align: start;
```

### Para el Título en Móvil:
1. Selecciona `.morv3-film-mini-card-title` en el breakpoint móvil

#### **Typography**
- **Font Size**: `18px`

### Para el Icono en Móvil:
1. Selecciona `.morv3-film-mini-card-icon` en el breakpoint móvil

#### **Size**
- **Width**: `28px`
- **Height**: `28px`

---

## 8. Responsive - Móvil Pequeño

### Cambiar Breakpoint:
1. Selecciona el breakpoint de **Móvil Pequeño** (480px o menor)
2. Selecciona `.morv3-film-mini-card`

### Aplicar Cambios:

#### **Size**
- **Width**: `calc(100vw - 48px)`
- **Min Width**: `calc(100vw - 48px)`
- **Max Width**: `calc(100vw - 48px)`

---

## 9. Estados de Hover

### Seleccionar:
1. Selecciona `.morv3-film-mini-card`
2. En el panel de estilos, haz click en el estado **Hover** (o presiona `H`)

### Aplicar en Hover:

#### **Effects**
- **Box Shadow**: 
  - X: `0px`
  - Y: `4px`
  - Blur: `8px`
  - Spread: `0px`
  - Color: `rgba(0, 0, 0, 0.08)`

#### **Transform**
- **Transform**: `translateY(-2px)`
  - O usa el panel de transformación visual de Webflow

---

## ✅ Checklist Final

Antes de publicar, verifica:

- [ ] Contenedor tiene Grid con 4 columnas en desktop
- [ ] Cards tienen tamaño uniforme (width: 100%, min-height: 55px)
- [ ] Gap de 24px entre cards en desktop
- [ ] Tablet muestra 3 columnas
- [ ] Móvil muestra carrusel horizontal (flex row)
- [ ] Cards en móvil tienen ancho de `calc(50vw - 32px)`
- [ ] Hover funciona en las cards
- [ ] Transiciones están aplicadas
- [ ] Todos los breakpoints están configurados

---

## 🎯 Tips Adicionales

### Para Aplicar Estilos a Múltiples Elementos:
1. Selecciona el primer elemento
2. Mantén `Shift` y selecciona los demás
3. Aplica los estilos (se aplicarán a todos)

### Para Usar Variables CSS:
- En los campos de color, tamaño, etc., puedes escribir directamente: `var(--nombre-variable)`
- Webflow reconocerá las variables si están definidas en el proyecto

### Para Custom CSS:
- Si algún estilo no está disponible en el panel visual, ve a:
  - Panel de estilos → Sección "Custom Code" → Campo "Custom CSS"
  - Agrega el código CSS necesario

---

## 🐛 Solución de Problemas

### El Grid no se aplica:
- Verifica que el contenedor tenga `display: grid`
- Asegúrate de que no haya otros estilos que lo sobrescriban

### Las cards no tienen el mismo tamaño:
- Verifica que todas tengan `width: 100%`
- Asegúrate de que el grid esté configurado correctamente

### El carrusel no funciona en móvil:
- Verifica que en móvil el contenedor tenga `display: flex` y `flex-direction: row`
- Asegúrate de que `overflow-x: auto` esté aplicado

---

¿Necesitas ayuda con algún paso específico? Revisa el archivo `locaciones-cards-webflow-designer.css` para ver todos los estilos organizados.

