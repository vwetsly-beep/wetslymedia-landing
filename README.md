# Wetsly Media · Landing de videografía para negocios locales

Página de una sola sección (one page) para vender servicios de video a negocios locales en Rhode Island y Massachusetts, con acceso directo 24/7 por WhatsApp y llamada al **(401) 362-9364**.

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | Página principal en **inglés**, SEO local (meta tags + datos estructurados LocalBusiness) |
| `es/index.html` | Versión en **español** (botón EN/ES en el menú para cambiar de idioma) |
| `styles.css` | Diseño oscuro responsivo, botón flotante 24/7 con pulso verde |
| `script.js` | Configuración del agente 24/7, menú móvil, animaciones, carga diferida de videos |
| `netlify.toml` | Configuración de despliegue en Netlify (sitio estático, sin build) |

## Cambiar el número de WhatsApp, el teléfono o el mensaje

Abre `script.js` y edita el bloque `AGENT_CONFIG` al inicio:

```js
const AGENT_CONFIG = {
  whatsappNumber: "14013629364",   // código de país + número, solo dígitos
  phoneNumber: "+14013629364",     // para el botón de llamar
  message: "Hola, quiero cotizar un video para mi negocio local",
  agentUrl: ""                     // opcional: enlace de otro chat/agente
};
```

El mensaje de WhatsApp de cada idioma está en la etiqueta `<html data-wa-message="...">` de cada página (inglés en `index.html`, español en `es/index.html`).

Todos los botones con `data-whatsapp` (menú, hero, servicios, CTA final, pie y botón flotante) y con `data-call` se actualizan solos. Los enlaces en el HTML ya traen el número por si JavaScript está desactivado; si cambias el número, búscalo también en `index.html` y `es/index.html` (`14013629364`).

**Si cambias un texto, cámbialo en los dos idiomas.**

### Conectar un agente que responda en WhatsApp

Los botones abren tu WhatsApp directamente (`wa.me/14013629364`). El agente automático que responde los mensajes vive en tu cuenta de WhatsApp Business, no en la página, así que la página no necesita cambios cuando lo actives.

Si prefieres que los botones abran otro chat (widget de chat en vivo, agente IA, Telegram `https://t.me/tuusuario`, ManyChat, etc.), pega su enlace en `agentUrl` y todos los botones de WhatsApp abrirán ese enlace.

Si el proveedor te da un **webhook** o un **script de widget**, pega su `<script>` justo antes de `</body>` en `index.html`.

## Cambiar los videos del portafolio

En `index.html`, sección `id="portafolio"`, cada video es así:

```html
<figure class="reel" data-cat="restaurante">
  <video data-src="https://wetslymedia.com/media/c8.mp4" muted loop playsinline preload="none"></video>
  <figcaption><span>Restaurante</span>El Azteca: el ambiente</figcaption>
</figure>
```

- `data-src`: el archivo `.mp4` (se carga solo cuando el usuario llega a esa parte, para no hacer lenta la página en el celular).
- `data-cat`: filtro (`restaurante`, `auto`, `realestate`, `servicios`).
- Los videos actuales se cargan desde `wetslymedia.com/media/`. Si mueves la página a otro dominio y ese sitio se apaga, copia los `.mp4` a una carpeta `media/` de este proyecto y cambia la ruta a `media/c8.mp4`.

### Usar YouTube, Vimeo o Instagram en lugar de .mp4

Reemplaza la etiqueta `<video>` por un iframe con `loading="lazy"`:

```html
<!-- YouTube Shorts / video -->
<figure class="reel" data-cat="restaurante">
  <iframe src="https://www.youtube.com/embed/ID_DEL_VIDEO" loading="lazy" title="Nombre del video"
    allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen
    style="width:100%;height:100%;border:0"></iframe>
  <figcaption><span>Restaurante</span>Título</figcaption>
</figure>

<!-- Vimeo -->
<iframe src="https://player.vimeo.com/video/ID_DEL_VIDEO" loading="lazy" ...></iframe>

<!-- Instagram Reel -->
<iframe src="https://www.instagram.com/reel/CODIGO_DEL_REEL/embed" loading="lazy" ...></iframe>
```

### Video de fondo del hero

En `index.html`, sección `hero`, cambia el `src` de `<source>` (ahora `media/c1.mp4`, el promo de agencia). Usa un video corto (10 a 20 s) y liviano (menos de 5 MB).

## Subir a GitHub

```bash
cd landing-videografia
git init
git add .
git commit -m "feat: landing page videografia y agente 24/7"
git branch -M main

# Opción A: con GitHub CLI
gh repo create wetslymedia-landing --public --source=. --remote=origin --push

# Opción B: crea el repo vacío en github.com/new y luego:
git remote add origin https://github.com/TU_USUARIO/wetslymedia-landing.git
git push -u origin main
```

## Publicar en Netlify

**Opción rápida (sin GitHub):** entra a https://app.netlify.com/drop y arrastra la carpeta `landing-videografia`. Queda en línea en segundos.

**Opción con GitHub (se actualiza sola cada vez que haces push):**
1. Entra a https://app.netlify.com → **Add new site** → **Import an existing project**.
2. Elige **GitHub** y autoriza Netlify.
3. Selecciona el repo `wetslymedia-landing`.
4. Build command: vacío. Publish directory: `.` (Netlify lo lee de `netlify.toml`).
5. **Deploy site**.
6. Para usar tu dominio: **Domain management** → **Add a domain** → sigue los pasos de DNS.

**Opción con Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```
