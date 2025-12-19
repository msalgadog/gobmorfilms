# Guía: Publicar en jcdn - GitHub

## 📚 Contexto

Necesitas publicar los archivos del sistema de filtrado dinámico en el repositorio de GitHub `gobmorfilms` para que se sirvan a través de jcdn.

## 📁 Archivos a Publicar

Los siguientes archivos están listos para publicar en jcdn:

```
labuena/
├── loading-overlay.js ⭐ NUEVO
├── locaciones-cards-swiper.js 📝 ACTUALIZADO
├── locaciones-cards-swiper.css ✓ Sin cambios
├── locacionesfinales.html 📝 ACTUALIZADO
├── IMPLEMENTACION-DINAMICA.md ⭐ NUEVO
└── RESUMEN-SOLUCION.md ⭐ NUEVO
```

## 🔗 URLs de jcdn

Una vez publicados, los archivos estarán disponibles en:

```
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/loading-overlay.js
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/locaciones-cards-swiper.js
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/locaciones-cards-swiper.css
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/locacionesfinales.html
```

## 📝 Pasos para Publicar

### Opción 1: Mediante GitHub (Recomendado)

1. **Accede a tu repositorio**
   - URL: `https://github.com/msalgadog/gobmorfilms`

2. **Navega a la carpeta `labuena`**
   - Click en `labuena` en el árbol de archivos

3. **Sube `loading-overlay.js`**
   - Click en "Add file" → "Upload files"
   - Arrastra `loading-overlay.js`
   - Escribe commit message: "Add loading overlay system for dynamic filtering"
   - Click "Commit changes"

4. **Actualiza `locaciones-cards-swiper.js`**
   - Click en el archivo actual
   - Click en el ícono de edición (lápiz)
   - Reemplaza el contenido con la versión actualizada
   - Commit message: "Update category filter with Finsweet dynamic loading support"
   - Click "Commit changes"

5. **Actualiza `locacionesfinales.html`**
   - Click en el archivo
   - Click en editar
   - Agrega las líneas de script al final
   - Commit message: "Update HTML with dynamic filtering scripts"

### Opción 2: Git desde Terminal (CLI)

```bash
# 1. Navega a tu repositorio
cd /ruta/a/gobmorfilms

# 2. Asegúrate de estar en la rama correcta
git checkout main  # o master, según tu rama por defecto

# 3. Copia los archivos a la carpeta labuena
cp "d:\DEV\DEV\filmaciones\labuena\loading-overlay.js" labuena/
cp "d:\DEV\DEV\filmaciones\labuena\locaciones-cards-swiper.js" labuena/
cp "d:\DEV\DEV\filmaciones\labuena\locacionesfinales.html" labuena/
cp "d:\DEV\DEV\filmaciones\labuena\IMPLEMENTACION-DINAMICA.md" labuena/
cp "d:\DEV\DEV\filmaciones\labuena\RESUMEN-SOLUCION.md" labuena/

# 4. Añade los cambios
git add labuena/

# 5. Commit
git commit -m "Add dynamic filtering system with Finsweet support"

# 6. Push
git push origin main
```

## ✅ Verificación Post-Publicación

Después de publicar, verifica que los archivos estén disponibles:

```bash
# Prueba descargar mediante jcdn
curl -I https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/loading-overlay.js

# Deberías recibir: HTTP/1.1 200 OK
```

O simplemente abre en el navegador:
```
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/loading-overlay.js
```

## 🔄 Actualizar en tu Webflow

Una vez publicado, actualiza los URLs en tu página de Webflow:

```html
<!-- Cambiar de rutas locales a jcdn -->
<script src="https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/loading-overlay.js"></script>
<script src="https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/locaciones-cards-swiper.js"></script>

<!-- Opcional: también el CSS si lo necesitas remoto -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms/labuena/locaciones-cards-swiper.css">
```

## 📋 Checklist Final

- [ ] Archivos copiados a carpeta labuena en el repositorio
- [ ] Commit realizado con mensaje descriptivo
- [ ] Push completado
- [ ] URLs de jcdn están accesibles (HTTP 200)
- [ ] Webflow está cargando scripts desde jcdn
- [ ] Overlay de carga aparece al cargar la página
- [ ] Filtrado por categoría funciona correctamente

## 🆘 Problemas Comunes

### "404 Not Found" en jcdn
- **Causa**: Archivo no está en GitHub aún
- **Solución**: Verifica que el push fue exitoso con `git log`

### Cambios no reflejan en la página
- **Causa**: Cache del navegador
- **Solución**: Limpia cache o usa Ctrl+Shift+Delete

### Script de Webflow no carga
- **Causa**: URL incorrecta
- **Solución**: Verifica que la ruta sea exacta: `/labuena/archivo.js`

## 📞 Referencia Rápida

**Repositorio**: https://github.com/msalgadog/gobmorfilms  
**Branch**: main (o verifica cuál es tu rama por defecto)  
**Carpeta destino**: `/labuena/`  
**CDN**: jsdelivr.net

---

**Nota**: Una vez publicado, jcdn cachea los archivos. Si necesitas forzar actualización inmediata, puedes usar:
```
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms@latest/labuena/archivo.js
```

Para versión específica:
```
https://cdn.jsdelivr.net/gh/msalgadog/gobmorfilms@v1.0.0/labuena/archivo.js
```

(Nota: Esto requiere tags de versión en GitHub)
