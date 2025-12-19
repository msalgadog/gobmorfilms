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
