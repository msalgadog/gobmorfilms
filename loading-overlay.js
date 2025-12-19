/**
 * Sistema de Overlay de Carga para Morv3
 * Gestiona la visualización de un overlay con spinner mientras se cargan elementos
 */
(function() {
  'use strict';

  // Crear estilos del overlay
  function crearEstilosOverlay() {
    if (document.getElementById('morv3-loading-overlay-styles')) {
      return; // Ya existen los estilos
    }

    const style = document.createElement('style');
    style.id = 'morv3-loading-overlay-styles';
    style.textContent = `
      .morv3-loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }

      .morv3-loading-overlay.active {
        display: flex;
      }

      .morv3-loading-overlay-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      .morv3-loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #e5e5e5;
        border-top-color: #2E3B2B;
        border-radius: 50%;
        animation: morv3-spin 0.8s linear infinite;
      }

      @keyframes morv3-spin {
        to { transform: rotate(360deg); }
      }

      .morv3-loading-text {
        font-size: 16px;
        color: #2E3B2B;
        font-weight: 500;
        text-align: center;
      }

      .morv3-loading-subtext {
        font-size: 14px;
        color: #888;
        text-align: center;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .morv3-loading-spinner {
          width: 40px;
          height: 40px;
          border-width: 3px;
        }

        .morv3-loading-text {
          font-size: 14px;
        }

        .morv3-loading-subtext {
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Crear el elemento del overlay
  function crearElementoOverlay() {
    if (document.getElementById('morv3-loading-overlay')) {
      return document.getElementById('morv3-loading-overlay');
    }

    const overlay = document.createElement('div');
    overlay.id = 'morv3-loading-overlay';
    overlay.className = 'morv3-loading-overlay';
    overlay.innerHTML = `
      <div class="morv3-loading-overlay-content">
        <div class="morv3-loading-spinner"></div>
        <div class="morv3-loading-text">Cargando locaciones...</div>
        <div class="morv3-loading-subtext">Por favor espera mientras se cargan los datos</div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  // API del overlay
  const LoadingOverlay = {
    init: function() {
      crearEstilosOverlay();
      crearElementoOverlay();
      return this;
    },

    show: function(message, subtext) {
      const overlay = document.getElementById('morv3-loading-overlay');
      if (!overlay) {
        this.init();
        return this.show(message, subtext);
      }

      // Actualizar textos si se proporcionan
      if (message) {
        const textEl = overlay.querySelector('.morv3-loading-text');
        if (textEl) textEl.textContent = message;
      }

      if (subtext) {
        const subtextEl = overlay.querySelector('.morv3-loading-subtext');
        if (subtextEl) subtextEl.textContent = subtext;
      }

      overlay.classList.add('active');
      return this;
    },

    hide: function() {
      const overlay = document.getElementById('morv3-loading-overlay');
      if (overlay) {
        overlay.classList.remove('active');
      }
      return this;
    },

    isVisible: function() {
      const overlay = document.getElementById('morv3-loading-overlay');
      return overlay ? overlay.classList.contains('active') : false;
    },

    setMessage: function(message, subtext) {
      const overlay = document.getElementById('morv3-loading-overlay');
      if (!overlay) return this;

      if (message) {
        const textEl = overlay.querySelector('.morv3-loading-text');
        if (textEl) textEl.textContent = message;
      }

      if (subtext) {
        const subtextEl = overlay.querySelector('.morv3-loading-subtext');
        if (subtextEl) subtextEl.textContent = subtext;
      }

      return this;
    },
  };

  // Inicializar cuando el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      LoadingOverlay.init();
    });
  } else {
    LoadingOverlay.init();
  }

  // Exponer globalmente
  window.Morv3LoadingOverlay = LoadingOverlay;
})();
