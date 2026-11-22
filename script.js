/* ==========================================================
   Wetsly Media · Landing de videografía
   - Configuración del agente 24/7 (WhatsApp y llamada)
   - Menú móvil, animaciones y carga diferida de videos
   ========================================================== */

/* ---------- CONFIGURACIÓN DEL AGENTE 24/7 ----------
   Cambia aquí el número o el mensaje y se actualizan TODOS los botones.
   - whatsappNumber: código de país + número, solo dígitos (EE. UU. = 1).
   - agentUrl: si conectas un chat en vivo o agente IA con su propio enlace
     (ej. Tidio, ManyChat, Telegram https://t.me/usuario), ponlo aquí y los
     botones de WhatsApp abrirán ese enlace en su lugar. Déjalo vacío para usar WhatsApp.
*/
const AGENT_CONFIG = {
  whatsappNumber: "14013629364",
  phoneNumber: "+14013629364",
  message: "Hola, quiero cotizar un video para mi negocio local",
  agentUrl: ""
};

(function () {
  "use strict";

  /* ----- Enlaces del agente 24/7 ----- */
  const waLink = AGENT_CONFIG.agentUrl ||
    `https://wa.me/${AGENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(AGENT_CONFIG.message)}`;

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = waLink;
    el.addEventListener("click", () => track("click_whatsapp_agente"));
  });
  document.querySelectorAll("[data-call]").forEach((el) => {
    el.href = `tel:${AGENT_CONFIG.phoneNumber}`;
    el.addEventListener("click", () => track("click_llamada"));
  });

  // Envía eventos a Google Analytics / Meta Pixel si los agregas al sitio.
  function track(name) {
    if (typeof window.gtag === "function") window.gtag("event", name);
    if (typeof window.fbq === "function") window.fbq("track", "Contact", { method: name });
  }

  /* ----- Navegación: fondo al hacer scroll y menú móvil ----- */
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  document.querySelectorAll("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ----- Animaciones de aparición ----- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----- Portafolio: carga diferida de videos (lazy) ----- */
  const reels = document.querySelectorAll(".reel");
  const loadVideo = (video) => {
    if (video.dataset.src && !video.src) {
      video.src = video.dataset.src;
      video.preload = "metadata";
    }
  };
  if ("IntersectionObserver" in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const video = e.target.querySelector("video");
        if (!video) return;
        if (e.isIntersecting) {
          loadVideo(video);
        } else if (!video.paused) {
          video.pause();
          e.target.classList.remove("is-playing");
        }
      });
    }, { rootMargin: "200px 0px" });
    reels.forEach((r) => vio.observe(r));
  } else {
    reels.forEach((r) => { const v = r.querySelector("video"); if (v) loadVideo(v); });
  }

  // Tocar para reproducir / pausar (con sonido al reproducir)
  reels.forEach((reel) => {
    const video = reel.querySelector("video");
    if (!video) return;
    reel.addEventListener("click", () => {
      loadVideo(video);
      if (video.paused) {
        reels.forEach((other) => {
          const ov = other.querySelector("video");
          if (ov && ov !== video && !ov.paused) { ov.pause(); other.classList.remove("is-playing"); }
        });
        video.muted = false;
        video.play().catch(() => { video.muted = true; video.play(); });
        reel.classList.add("is-playing");
      } else {
        video.pause();
        reel.classList.remove("is-playing");
      }
    });
  });

  /* ----- Filtros del portafolio ----- */
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      reels.forEach((r) => r.classList.toggle("is-hidden", f !== "all" && r.dataset.cat !== f));
    });
  });

  /* ----- Año del footer ----- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
