/**
 * =====================================================
 * SWIPERJS PARA CARDS MINI - MÓVIL
 * =====================================================
 * 
 * Inicializa SwiperJS solo en móvil (< 768px)
 * En desktop mantiene el CSS Grid
 */

(function() {
  'use strict';

  let swiperInstance = null;
  let isMobile = false;

  /**
   * Detecta si estamos en móvil (a partir de 480px se activa el carrusel)
   */
  function checkMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Inicializa SwiperJS en móvil
   */
  function initSwiper() {
    // Verificar que estemos en móvil
    if (!checkMobile()) {
      console.log('Swiper Cards: No es móvil, no se inicializa Swiper');
      return null;
    }
    
    const container = document.querySelector('.morv3-cfm-mini-cards-container.swiper');
    
    if (!container) {
      console.warn('Swiper Cards: Contenedor no encontrado');
      return null;
    }

    // Verificar que Swiper esté disponible
    if (typeof Swiper === 'undefined') {
      console.error('SwiperJS no está cargado. Asegúrate de incluir el CDN de Swiper.');
      return null;
    }

    // Verificar que haya slides
    const slides = container.querySelectorAll('.swiper-slide');
    if (!slides || slides.length === 0) {
      console.warn('Swiper Cards: No se encontraron slides');
      return null;
    }

    // Verificar que todos los slides sean elementos válidos
    for (let i = 0; i < slides.length; i++) {
      if (!(slides[i] instanceof Element)) {
        console.warn('Swiper Cards: Slide no es un elemento válido en índice', i);
        return null;
      }
    }

    // Destruir instancia anterior si existe
    if (swiperInstance) {
      try {
        swiperInstance.destroy(true, true);
      } catch (e) {
        console.warn('Error al destruir Swiper anterior:', e);
      }
      swiperInstance = null;
    }

    // Asegurarse de que el contenedor esté visible y tenga dimensiones
    if (container.offsetParent === null) {
      console.warn('Swiper Cards: El contenedor no está visible');
      return null;
    }

    // Verificar que el contenedor tenga dimensiones
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      console.warn('Swiper Cards: El contenedor no tiene dimensiones');
      return null;
    }
    
    // Verificar que el contenedor sea un elemento válido
    if (!(container instanceof Element)) {
      console.error('Swiper Cards: El contenedor no es un elemento válido');
      return null;
    }
    
    // Esperar a que el DOM esté completamente renderizado y los estilos aplicados
    // Usar requestAnimationFrame para asegurar que el layout esté completo
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        setTimeout(function() {
      try {
        // Verificar nuevamente que el contenedor y slides existan
        const currentContainer = document.querySelector('.morv3-cfm-mini-cards-container.swiper');
        if (!currentContainer || !currentContainer.parentNode) {
          console.error('Swiper Cards: El contenedor ya no existe');
          return;
        }
        
        // Obtener todas las cards - buscar en diferentes lugares posibles
        let currentCards = null;
        const existingWrapper = currentContainer.querySelector('.swiper-wrapper');
        
        // Estrategia 1: Si ya hay wrapper con slides agrupados, usar esas
        if (existingWrapper) {
          const cardsInSlides = existingWrapper.querySelectorAll('.swiper-slide > .morv3-cfm-mini-card');
          if (cardsInSlides && cardsInSlides.length > 0) {
            currentCards = cardsInSlides;
            console.log('Swiper Cards: Encontradas', currentCards.length, 'cards en slides existentes');
          }
        }
        
        // Estrategia 2: Buscar cards directamente en el contenedor (hijos directos, no dentro de wrapper)
        if (!currentCards || currentCards.length === 0) {
          // Buscar todas las cards que son hijos directos del contenedor
          const directChildren = Array.from(currentContainer.children);
          const cardsFound = directChildren.filter(function(child) {
            // Excluir el wrapper si existe
            if (child.classList.contains('swiper-wrapper')) {
              return false;
            }
            return child.classList.contains('morv3-cfm-mini-card');
          });
          
          if (cardsFound && cardsFound.length > 0) {
            currentCards = cardsFound;
            console.log('Swiper Cards: Encontradas', currentCards.length, 'cards como hijos directos');
          }
        }
        
        // Estrategia 3: Buscar todas las cards en el contenedor (querySelectorAll busca en todo el árbol)
        if (!currentCards || currentCards.length === 0) {
          const allCardsInContainer = currentContainer.querySelectorAll('.morv3-cfm-mini-card');
          if (allCardsInContainer && allCardsInContainer.length > 0) {
            currentCards = allCardsInContainer;
            console.log('Swiper Cards: Encontradas', currentCards.length, 'cards con querySelectorAll en contenedor');
          }
        }
        
        if (!currentCards || currentCards.length === 0) {
          console.error('Swiper Cards: No hay cards disponibles');
          console.error('Contenedor:', currentContainer);
          console.error('Clases del contenedor:', currentContainer.className);
          console.error('Número de hijos:', currentContainer.children.length);
          console.error('Hijos:', Array.from(currentContainer.children).map(c => c.className));
          console.error('HTML del contenedor (primeros 1000 chars):', currentContainer.innerHTML.substring(0, 1000));
          return;
        }
        
        console.log('Swiper Cards: Total encontradas', currentCards.length, 'cards para agrupar');
        
        // Verificar que todos los cards sean elementos válidos y estén en el DOM
        for (let i = 0; i < currentCards.length; i++) {
          const card = currentCards[i];
          if (!card || !(card instanceof Element) || !card.parentNode) {
            console.error('Swiper Cards: Card inválida en índice', i);
            return;
          }
        }
        
        // Agrupar cards en slides de 4 (columnas verticales)
        // Obtener todas las cards
        const cardsArray = Array.from(currentCards);
        const groupedSlides = [];
        
        // Agrupar en grupos de 4
        for (let i = 0; i < cardsArray.length; i += 4) {
          const group = cardsArray.slice(i, i + 4);
          groupedSlides.push(group);
        }
        
        // Verificar si ya hay un wrapper con slides agrupados
        let wrapper = currentContainer.querySelector('.swiper-wrapper');
        const existingSlides = wrapper ? wrapper.querySelectorAll('.swiper-slide') : null;
        
        // Si ya hay slides agrupados, no necesitamos reagrupar
        if (existingSlides && existingSlides.length > 0) {
          console.log('Swiper Cards: Ya hay slides agrupados, usando estructura existente');
        } else {
          // Crear o limpiar el wrapper
          if (wrapper) {
            wrapper.innerHTML = '';
          } else {
            wrapper = document.createElement('div');
            wrapper.className = 'swiper-wrapper';
            currentContainer.appendChild(wrapper);
          }
          
          // Crear slides agrupados (cada slide contiene 4 cards en columna)
          groupedSlides.forEach(function(group, groupIndex) {
            const slideContainer = document.createElement('div');
            slideContainer.className = 'swiper-slide';
            
            // Mover las cards del grupo al contenedor del slide
            group.forEach(function(card) {
              // Quitar la clase swiper-slide de la card si la tiene (ahora el contenedor es el slide)
              card.classList.remove('swiper-slide');
              slideContainer.appendChild(card);
            });
            
            wrapper.appendChild(slideContainer);
          });
          
          console.log('Swiper Cards: Creados', groupedSlides.length, 'slides con cards agrupadas');
        }
        
        console.log('Swiper Cards: Agrupadas', cardsArray.length, 'cards en', groupedSlides.length, 'slides de 4');
        
        // Inicializar Swiper usando el selector string (más seguro)
        // Configuración para mostrar 1 slide a la vez (cada slide tiene 4 cards en columna)
        swiperInstance = new Swiper('.morv3-cfm-mini-cards-container.swiper', {
          // Configuración básica - 1 slide visible (que contiene 4 cards en columna)
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: false,
          loop: false,
          grabCursor: true,
          
          // Transiciones
          speed: 400,
          effect: 'slide',
          
          // Desactivar observadores que pueden causar problemas
          watchSlidesProgress: false,
          watchSlidesVisibility: false,
          observer: false,
          observeParents: false,
          
          // Prevenir errores
          watchOverflow: true,
          
          // Navegación con botones
          navigation: {
            nextEl: '.swiper-button-next-cards',
            prevEl: '.swiper-button-prev-cards',
          },
          
          // Breakpoints
          breakpoints: {
            // Todos los tamaños muestran 1 slide (4 cards en columna)
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
              centeredSlides: false,
            },
          },
          
          // Eventos
          on: {
            init: function(swiper) {
              console.log('Swiper Cards: Inicializado correctamente con', swiper.slides.length, 'slides');
              console.log('Cards por slide:', swiper.params.slidesPerView);
            },
            slideChange: function(swiper) {
              // Aquí puedes agregar lógica adicional si es necesario
            },
            error: function(swiper, error) {
              console.error('Error en Swiper:', error);
            },
          },
        });
        
        // Mostrar botones de navegación cuando Swiper está activo
        const navButtons = document.querySelector('.swiper-navigation-buttons');
        if (navButtons) {
          navButtons.style.display = 'flex';
        }
        
        console.log('Swiper Cards: Inicializado exitosamente');
      } catch (error) {
        console.error('Error al inicializar Swiper:', error);
        console.error('Detalles del error:', error.message);
        if (error.stack) {
          console.error('Stack trace:', error.stack);
        }
        swiperInstance = null;
      }
        });
      });
    }, 200);
    
    // Retornar null por ahora, la instancia se asignará en el setTimeout
    return null;
  }

  /**
   * Destruye Swiper cuando cambiamos a desktop
   */
  function destroySwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      console.log('Swiper Cards: Destruido (cambio a desktop)');
    }
    
    // Ocultar botones de navegación cuando Swiper no está activo
    const navButtons = document.querySelector('.swiper-navigation-buttons');
    if (navButtons) {
      navButtons.style.display = 'none';
    }
  }

  /**
   * Maneja el cambio entre móvil y desktop
   */
  function handleResize() {
    const nowMobile = checkMobile();
    
    if (nowMobile !== isMobile) {
      isMobile = nowMobile;
      
      if (isMobile) {
        // Cambiamos a móvil: inicializar Swiper
        initSwiper();
      } else {
        // Cambiamos a desktop: destruir Swiper
        destroySwiper();
      }
    } else if (isMobile && swiperInstance) {
      // Si seguimos en móvil, actualizar Swiper
      swiperInstance.update();
    }
  }

  /**
   * Inicialización compatible con Webflow
   */
  function init() {
    // Verificar estado inicial
    isMobile = checkMobile();
    
    // Ocultar botones de navegación por defecto si no estamos en móvil
    if (!isMobile) {
      const navButtons = document.querySelector('.swiper-navigation-buttons');
      if (navButtons) {
        navButtons.style.display = 'none';
      }
    }
    
    if (isMobile) {
      // Esperar a que el DOM esté completamente cargado
      function tryInit() {
        const container = document.querySelector('.morv3-cfm-mini-cards-container.swiper');
        if (!container) {
          return false;
        }
        
        const slides = container.querySelectorAll('.swiper-slide');
        if (!slides || slides.length === 0) {
          return false;
        }
        
        // Verificar que el contenedor esté visible y tenga dimensiones
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          return false;
        }
        
        // Verificar que Swiper esté cargado
        if (typeof Swiper === 'undefined') {
          return false;
        }
        
        // Todo está listo, inicializar
        setTimeout(function() {
          initSwiper();
        }, 300);
        return true;
      }
      
      // Intentar inicializar inmediatamente si todo está listo
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        if (!tryInit()) {
          // Si no está listo, esperar
          const checkReady = setInterval(function() {
            if (tryInit()) {
              clearInterval(checkReady);
            }
          }, 100);
          
          // Timeout de seguridad
          setTimeout(function() {
            clearInterval(checkReady);
            tryInit();
          }, 3000);
        }
      } else {
        // Esperar a que el DOM esté listo
        document.addEventListener('DOMContentLoaded', function() {
          const checkReady = setInterval(function() {
            if (tryInit()) {
              clearInterval(checkReady);
            }
          }, 100);
          
          setTimeout(function() {
            clearInterval(checkReady);
            tryInit();
          }, 3000);
        });
      }
    }

    // Manejar resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    });
  }

  // Inicializar
  init();

  // Exponer funciones globales para uso manual si es necesario
  window.Morv3CfmSwiper = {
    init: initSwiper,
    destroy: destroySwiper,
    update: function() {
      if (swiperInstance) {
        swiperInstance.update();
      }
    },
    getInstance: function() {
      return swiperInstance;
    },
  };
})();

/**
 * =====================================================
 * OVERLAY DE CARGA CON SPINNER
 * =====================================================
 */

(function() {
  'use strict';

  function crearOverlayCarga() {
    const overlay = document.createElement('div');
    overlay.id = 'morv3-loading-overlay';
    overlay.innerHTML = `
      <div class="morv3-loading-content">
        <div class="morv3-spinner"></div>
        <p>Cargando información...</p>
      </div>
    `;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(2px);
    `;

    const content = overlay.querySelector('.morv3-loading-content');
    content.style.cssText = `
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;

    const spinner = overlay.querySelector('.morv3-spinner');
    spinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 4px solid #e4e3d6;
      border-top-color: #444837;
      border-radius: 50%;
      animation: morv3-spin 0.8s linear infinite;
      margin: 0 auto 20px;
    `;

    const p = overlay.querySelector('p');
    p.style.cssText = `
      font-size: 16px;
      color: #444837;
      margin: 0;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes morv3-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return overlay;
  }

  function mostrarOverlayCarga() {
    let overlay = document.getElementById('morv3-loading-overlay');
    if (!overlay) {
      overlay = crearOverlayCarga();
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
  }

  function ocultarOverlayCarga() {
    const overlay = document.getElementById('morv3-loading-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  window.Morv3LoadingOverlay = {
    show: mostrarOverlayCarga,
    hide: ocultarOverlayCarga,
  };
})();

/**
 * =====================================================
 * SISTEMA DE FILTRADO POR CATEGORÍA
 * =====================================================
 * 
 * Filtra las cards principales basándose en la categoría
 * seleccionada en las mini cards
 * 
 * Soporta carga dinámica de elementos vía Finsweet Attributes
 */

(function() {
  'use strict';

  // Mapeo entre data-categoria (mini cards) y data-fs-catid (cards principales)
  // Se usa como fallback si no está definido globalmente
  let categoriaMap = window.categoriaMap || {
    'agricultura': 'Agricultura',
    'casas': 'Casas',
    'edificios': 'Edificios',
    'haciendas': 'Haciendas',
    'mercados': 'Mercados',
    'panteones': 'Panteones',
    'aeropuertos': 'Aeropuertos',
    'bosques': 'Bosques',
    'colonias': 'Colonias Populares',
    'espacios_coloniales': 'Espacios coloniales',
    'iglesias_templos': 'Iglesias / Templos',
    'zonas': 'Zonas arqueológicas',
    'balnearios': 'Balnearios',
    'carreteras_calles': 'Carreteras / Calles',
    'espacios_deportivos': 'Espacios deportivos',
    'paisajes': 'Paisajes',
    'museos': 'Museos',
    'teatros': 'Teatros',
    'bibliotecas': 'Bibliotecas',
    'cuerpos_de_agua': 'Cuerpos de agua',
    'alojamientos': 'Alojamientos',
    'plazas_publicas': 'Plazas públicas',
    'parques': 'Parques'
  };

  // Variable para guardar la categoría activa
  let categoriaActiva = null;

  // MutationObserver para detectar nuevos elementos
  let mutationObserver = null;
  let finsweetCheckInterval = null;

  /**
   * Filtra las cards principales por categoría
   */
  let locacionesSwiper = null;

  function normalizarNombreLocacion(nombre) {
    return (nombre || '').trim().toLowerCase();
  }

  function asegurarEstructuraLocacionesSwiper() {
    // Contenedor ya viene como swiper
    const container = document.querySelector('.morv3-cards-locaciones-swiper-col.swiper');
    const wrapper = container ? container.querySelector('.morv3-cards-locaciones-wrapper.swiper-wrapper') : null;

    if (!container || !wrapper) {
      return null;
    }

    // Asegurar que cada item tenga clase de slide
    const items = wrapper.querySelectorAll('.morv3-cards-locaciones-item');
    items.forEach(function(item) {
      item.classList.add('swiper-slide');
    });

    return { container, wrapper };
  }

  function destruirLocacionesSwiper() {
    if (locacionesSwiper) {
      try {
        locacionesSwiper.destroy(true, true);
      } catch (e) {
        console.warn('Locaciones Swiper: error al destruir instancia previa', e);
      }
      locacionesSwiper = null;
    }
  }

  function initOrUpdateLocacionesSwiper() {
    const structure = asegurarEstructuraLocacionesSwiper();
    if (!structure) {
      return;
    }

    // Siempre reinstanciar para reflejar el estado filtrado actual
    destruirLocacionesSwiper();

    // Verificar que Swiper esté disponible
    if (typeof Swiper === 'undefined') {
      console.warn('SwiperJS no está cargado para locaciones');
      return;
    }

    locacionesSwiper = new Swiper('.morv3-cards-locaciones-swiper-col', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      watchOverflow: true,
      grabCursor: true,
      speed: 350,
      breakpoints: {
        0: { spaceBetween: 12 },
        768: { spaceBetween: 14 },
        1200: { spaceBetween: 16 },
      },
    });
  }

  function aplicarFiltroLocaciones(categoriaFiltro) {
    const structure = asegurarEstructuraLocacionesSwiper();
    if (!structure) {
      return;
    }

    const allCards = Array.from(structure.wrapper.querySelectorAll('.morv3-cards-locaciones-item'));
    const seen = new Set();

    allCards.forEach(function(card) {
      const cardCategoria = card.getAttribute('data-fs-catid');
      const locName = normalizarNombreLocacion(card.getAttribute('locacion-nombre'));

      const matchesCategoria = !categoriaFiltro || cardCategoria === categoriaFiltro;
      const isDup = locName && seen.has(locName);

      if (matchesCategoria && !isDup) {
        card.style.display = '';
        if (locName) {
          seen.add(locName);
        }
      } else {
        card.style.display = 'none';
      }
    });

    initOrUpdateLocacionesSwiper();
  }

  function mostrarTodasLasLocaciones() {
    const structure = asegurarEstructuraLocacionesSwiper();
    if (!structure) {
      return;
    }
    const allCards = structure.wrapper.querySelectorAll('.morv3-cards-locaciones-item');
    allCards.forEach(function(card) {
      card.style.display = '';
    });
    initOrUpdateLocacionesSwiper();
  }

  function ocultarTodasLasLocaciones() {
    const structure = asegurarEstructuraLocacionesSwiper();
    if (!structure) {
      return;
    }
    const allCards = structure.wrapper.querySelectorAll('.morv3-cards-locaciones-item');
    allCards.forEach(function(card) {
      card.style.display = 'none';
    });
    destruirLocacionesSwiper();
  }

  /**
   * Detecta si Finsweet terminó de cargar todos los elementos
   * Busca por la presencia de elemento de paginación o por cambios en el DOM
   */
  function detectarFinsweetComplete() {
    // Verificar si hay elemento de paginación
    const paginationWrapper = document.querySelector('.w-pagination-wrapper');
    if (!paginationWrapper) {
      return false;
    }

    // Verificar si el atributo fs-list-load existe (significa que aún está cargando)
    const listElement = document.querySelector('[fs-list-load]');
    if (!listElement) {
      return true; // No hay elemento con fs-list-load, completó
    }

    // Si fs-list-load es "all", ya debería haber cargado todo
    if (listElement.getAttribute('fs-list-load') === 'all') {
      // Esperar un poco más para asegurar que inyectó los últimos elementos
      return true;
    }

    return false;
  }

  /**
   * Inicia monitoreo de carga de Finsweet
   */
  function iniciarMonitoreoFinsweet() {
    // Usar el overlay de carga si está disponible
    if (window.Morv3LoadingOverlay) {
      window.Morv3LoadingOverlay.show();
    }
    
    // Detectar cambios en el DOM
    const targetNode = document.querySelector('[fs-list-element="list"]') || 
                       document.querySelector('.w-dyn-list');
    
    if (!targetNode) {
      console.warn('No se encontró elemento para monitorear');
      if (window.Morv3LoadingOverlay) {
        window.Morv3LoadingOverlay.hide();
      }
      return;
    }

    // MutationObserver para detectar cuando Finsweet inyecta nuevos elementos
    const config = {
      childList: true,
      subtree: true,
      characterData: false
    };

    mutationObserver = new MutationObserver(function(mutations) {
      // Aplicar filtro actual a nuevos elementos inyectados
      if (categoriaActiva) {
        const categoriaFiltro = categoriaMap[categoriaActiva];
        if (categoriaFiltro) {
          aplicarFiltroLocaciones(categoriaFiltro);
        }
      }
    });

    mutationObserver.observe(targetNode, config);

    // Intervalo para verificar si terminó la carga
    let checkCount = 0;
    const maxChecks = 300; // 30 segundos máximo
    
    finsweetCheckInterval = setInterval(function() {
      checkCount++;
      
      if (checkCount > maxChecks) {
        clearInterval(finsweetCheckInterval);
        finsweetCheckInterval = null;
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
        console.log('Finsweet: Timeout - Se detuvo el monitoreo');
        if (window.Morv3LoadingOverlay) {
          window.Morv3LoadingOverlay.hide();
        }
        return;
      }

      // Verificar si Finsweet terminó
      const listItems = document.querySelectorAll('[fs-list-instance="cards"] .morv3-cards-locaciones-item');
      const paginationNext = document.querySelector('[aria-label="Next Page"]');
      
      // Si no hay botón Next o está deshabilitado, probablemente terminó
      if (!paginationNext || paginationNext.getAttribute('aria-disabled') === 'true') {
        if (listItems.length > 0) {
          console.log('Finsweet: Carga completada -', listItems.length, 'elementos cargados');
          clearInterval(finsweetCheckInterval);
          finsweetCheckInterval = null;
          if (mutationObserver) {
            mutationObserver.disconnect();
            mutationObserver = null;
          }
          if (window.Morv3LoadingOverlay) {
            window.Morv3LoadingOverlay.hide();
          }
          
          // Reaplicar filtro final
          if (categoriaActiva) {
            const categoriaFiltro = categoriaMap[categoriaActiva];
            aplicarFiltroLocaciones(categoriaFiltro);
          }
        }
      }
    }, 100); // Chequear cada 100ms
  }

  function filtrarCardsPorCategoria(categoria) {
    // Mapear la categoría al formato correcto (texto de cat principal)
    const categoriaFiltro = categoria ? categoriaMap[categoria] : null;

    if (categoria && !categoriaFiltro) {
      console.warn('Categoría no encontrada:', categoria);
      return;
    }

    // Mostrar overlay de carga
    if (window.Morv3LoadingOverlay) {
      window.Morv3LoadingOverlay.show();
    }

    // Actualizar la categoría activa
    if (categoriaActiva === categoria) {
      categoriaActiva = null; // Toggle off
      // Remover clase activa de todas las mini cards
      document.querySelectorAll('.morv3-cfm-mini-card').forEach(function(miniCard) {
        miniCard.classList.remove('active-category');
      });
      mostrarTodasLasLocaciones();
    } else {
      categoriaActiva = categoria;
      // Agregar clase activa a la clickeada
      document.querySelectorAll('.morv3-cfm-mini-card').forEach(function(card) {
        card.classList.remove('active-category');
        if (card.getAttribute('data-categoria') === categoria) {
          card.classList.add('active-category');
        }
      });
      // Filtrar las cards
      aplicarFiltroLocaciones(categoriaFiltro);
    }

    // Ocultar overlay después de un delay mínimo
    setTimeout(function() {
      if (window.Morv3LoadingOverlay) {
        window.Morv3LoadingOverlay.hide();
      }
    }, 300);
  }

  /**
   * Inicializar event listeners para las mini cards
   */
  function initCategoryFilter() {
    const miniCards = document.querySelectorAll('.morv3-cfm-mini-card');
    
    if (!miniCards || miniCards.length === 0) {
      console.warn('Sistema de filtrado: No se encontraron mini cards');
      return;
    }
    
    miniCards.forEach(function(miniCard) {
      miniCard.addEventListener('click', function() {
        const categoria = this.getAttribute('data-categoria');
        
        if (!categoria) {
          console.warn('Mini card sin atributo data-categoria');
          return;
        }
        
        filtrarCardsPorCategoria(categoria);
      });
    });

    // Estado inicial: mantener oculto hasta que se seleccione categoría
    ocultarTodasLasLocaciones();

    // Iniciar monitoreo de Finsweet
    iniciarMonitoreoFinsweet();

    console.log('Sistema de filtrado de categorías inicializado con', miniCards.length, 'mini cards');
  }

  /**
   * Inicialización
   */
  function init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCategoryFilter);
    } else {
      // DOM ya está listo
      initCategoryFilter();
    }
  }

  // Inicializar
  init();

  // Exponer funciones globalmente
  window.Morv3CfmCategoryFilter = {
    filter: filtrarCardsPorCategoria,
    reset: function() {
      categoriaActiva = null;
      const miniCards = document.querySelectorAll('.morv3-cfm-mini-card');
      miniCards.forEach(function(card) {
        card.classList.remove('active-category');
      });
      mostrarTodasLasLocaciones();
      console.log('Sistema de filtrado: Reset completado');
    },
    getActiveCategory: function() {
      return categoriaActiva;
    },
  };
})();
