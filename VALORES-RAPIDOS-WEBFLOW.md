# ⚡ Valores Rápidos para Webflow - Copiar y Pegar

## 📦 CONTENEDOR PRINCIPAL (.morv3-film-mini-cards-container)

### Desktop (por defecto):
```
Display: Grid
Grid Template Columns: repeat(4, 1fr)
Gap: 24px
Width: 100%
Max Width: 100%
Align Items: Start
```

---

## 🎴 CARD INDIVIDUAL (.morv3-film-mini-card)

### Layout:
```
Display: Flex
Flex Direction: Column
Justify Content: Center
Align Items: Center
Gap: 10px
```

### Size:
```
Width: 100%
Min Height: 55px
Height: Auto
```

### Spacing:
```
Padding Top: var(--_morv3-sizes---space--morv3-gap-sm)
Padding Right: var(--_morv3-sizes---space--morv3-gap-lg)
Padding Bottom: var(--_morv3-sizes---space--morv3-gap-sm)
Padding Left: var(--_morv3-sizes---space--morv3-gap-lg)
```

### Border:
```
Border Style: Solid
Border Width: 1px (todos los lados)
Border Color: var(--_morv3-themes---border--morv3-border-low)
```

### Border Radius:
```
Todos los lados: var(--_morv3-global---border-radius--morv3-border-radius-round)
```

### Background:
```
Background Color: var(--_morv3-themes---background--morv3-bg-surface-low)
```

### Effects:
```
Box Shadow: 
  X: 0px
  Y: 2px
  Blur: 2px
  Spread: 0px
  Color: rgba(0, 0, 0, 0.03)
```

### Transitions:
```
Property: Opacity, Transform, Box Shadow
Duration: 0.3s
Easing: Ease
```

### Hover State:
```
Transform: translateY(-2px)
Box Shadow:
  X: 0px
  Y: 4px
  Blur: 8px
  Spread: 0px
  Color: rgba(0, 0, 0, 0.08)
```

---

## 📄 CONTENIDO DE CARD (.morv3-film-mini-card-content)

```
Display: Flex
Align Items: Center
Align Self: Stretch
Gap: 10px
Width: 100%
```

---

## 🖼️ ICONO (.morv3-film-mini-card-icon)

```
Width: 30px
Height: 30px
Flex Shrink: 0
```

---

## 📝 TÍTULO (.morv3-film-mini-card-title)

```
Font Family: var(--_morv3-sizes---fontfamily--morv3-title)
Font Size: 22px
Line Height: 120%
Font Weight: 400
Font Style: Normal
Text Color: rgb(68, 72, 55) o #444837
Flex: 1
```

---

## 📱 RESPONSIVE - TABLET (768px - 1200px)

### Contenedor:
```
Grid Template Columns: repeat(3, 1fr)
Gap: 20px
```

---

## 📱 RESPONSIVE - MÓVIL (< 767px)

### Contenedor:
```
Display: Flex
Flex Direction: Row
Overflow X: Auto
Overflow Y: Hidden
Gap: 16px
Padding Bottom: 10px
```

### Custom CSS para contenedor (si es necesario):
```css
scroll-snap-type: x mandatory;
-webkit-overflow-scrolling: touch;
scrollbar-width: thin;
scrollbar-color: rgba(68, 72, 55, 0.3) transparent;
```

### Card en Móvil:
```
Flex Shrink: 0
Width: calc(50vw - 32px)
Min Width: calc(50vw - 32px)
Max Width: calc(50vw - 32px)
Min Height: 55px
Padding Right: 16px
Padding Left: 16px
```

### Custom CSS para card:
```css
scroll-snap-align: start;
```

### Título en Móvil:
```
Font Size: 18px
```

### Icono en Móvil:
```
Width: 28px
Height: 28px
```

---

## 📱 RESPONSIVE - MÓVIL PEQUEÑO (< 480px)

### Card:
```
Width: calc(100vw - 48px)
Min Width: calc(100vw - 48px)
Max Width: calc(100vw - 48px)
```

---

## 🎨 Orden de Aplicación Recomendado

1. ✅ Contenedor Principal (Desktop)
2. ✅ Card Individual (Desktop)
3. ✅ Contenido de Card
4. ✅ Icono
5. ✅ Título
6. ✅ Hover en Card
7. ✅ Tablet Breakpoint
8. ✅ Móvil Breakpoint
9. ✅ Móvil Pequeño Breakpoint

---

## 💡 Tips

- **Para aplicar a múltiples elementos**: Selecciona el primero, luego Shift + Click en los demás
- **Para usar variables**: Escribe directamente `var(--nombre-variable)` en los campos
- **Para Custom CSS**: Panel de estilos → Custom Code → Custom CSS

