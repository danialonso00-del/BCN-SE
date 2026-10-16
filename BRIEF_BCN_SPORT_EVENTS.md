# BCN Sport Events — Instrucciones para Claude

## Entorno: Claude en VS Code

Este briefing se ejecutará con Claude dentro de VS Code, sobre la carpeta de trabajo abierta por el usuario. Lee este archivo y el logo de esa carpeta, crea o modifica los archivos del proyecto y utiliza el terminal integrado para instalar dependencias, ejecutar el servidor de desarrollo y comprobar el build, según los permisos disponibles.

Revisa las instrucciones locales aplicables, por ejemplo `CLAUDE.md`, y las skills instaladas que realmente estén disponibles. Puedes utilizar skills de diseño frontend, recursos visuales y animación si ayudan. No supongas que existen conectores, herramientas de ChatGPT o skills que no estén presentes en este entorno. No instales skills ni plugins adicionales sin necesidad.

No te limites a explicar cómo se haría: implementa la web en esta carpeta. Conserva cualquier trabajo existente y reutiliza su configuración. Si falta acceso a imágenes o al navegador, continúa con lo disponible y explica la limitación concreta al entregar.

Al finalizar, indica los comandos exactos para arrancar la web y la URL local que devuelva el servidor. El objetivo es una implementación local revisable en VS Code; no se solicita despliegue.

## 1. Tu misión

Diseña e implementa una web corporativa excepcional para **BCN Sport Events**, una empresa establecida en **Dubái con operaciones en Barcelona**, especializada en **consultoría de eventos deportivos, transferencia de conocimiento y diseño y puesta en marcha de programas de formación en el ámbito deportivo**.

Construye la web completa, no solo un wireframe o una propuesta. El resultado debe parecer el trabajo de un estudio de diseño con criterio: moderno, internacional, elegante, deportivo y con personalidad. Debe transmitir confianza para iniciar una conversación comercial.

La web y sus textos deben estar **en inglés**. Estas instrucciones están en español para facilitar su revisión.

Tienes libertad creativa para buscar fotografías, utilizar las skills instaladas que sean relevantes, incorporar animaciones y crear elementos 3D si aportan valor. Inspecciona primero los archivos, instrucciones y herramientas disponibles en el proyecto. Ejecuta el trabajo de principio a fin y toma decisiones razonables sin pedir aprobación para cada detalle.

## 2. Hechos confirmados y límites de contenido

- Marca: **BCN Sport Events**. Conserva la escritura del logo: SPORT en singular.
- Empresa de Dubái con operaciones en Barcelona.
- Ámbito: deporte.
- Servicios: event consulting, knowledge transfer and training setup.
- Contacto: **contact@bcnsportsevents.com**. El dominio del correo lleva **sports**, aunque la marca utilice **Sport**.
- No se han facilitado clientes, proyectos anteriores, equipo, certificaciones, cifras, direcciones físicas, teléfonos, premios ni redes sociales.

No inventes experiencia, colaboraciones, estadísticas, testimonios, logos de clientes ni casos de éxito. Las imágenes de estadios son ilustrativas: no sugieras que hemos trabajado en ellos. No presentes como comprobado ningún vínculo con clubes, federaciones o instituciones. Puedes describir tipos de clientes potenciales y propuestas de servicio sin afirmar contratos existentes.

### Referencia de actividad: Akaw Sports

El propietario aporta **https://akawsports.com/** como inspiración de contenido y actividad, **no de diseño**. Se han revisado su home y **https://akawsports.com/eventos-y-actividades/**.

La referencia presenta eventos deportivos y experiencias internacionales de forma concreta, junto con otras áreas de marketing e imagen. Lo útil para este proyecto es ese enfoque tangible: explicar qué iniciativa quiere desarrollar el cliente y cómo podemos ayudarle a estructurarla. No copies textos, proyectos, imágenes, marcas, clientes ni estructura visual de Akaw.

Para BCN Sport Events, mantén los tres pilares confirmados —consultoría de eventos, transferencia de conocimiento y puesta en marcha de formación— y preséntalos con lenguaje ligado al deporte real. No incorpores representación de deportistas, gestión de imagen, patrocinios, viajes turísticos o producción integral como servicios confirmados.

**Interpretación editorial para esta web:** una empresa que ayuda a convertir una iniciativa deportiva en un programa con objetivos, participantes, contenidos y una preparación clara; conecta la dimensión del evento con el aprendizaje y el desarrollo de personas. Evita que parezca una consultora abstracta de estrategia o una empresa de formación corporativa genérica.

Ejemplos de formatos para orientar una conversación comercial: un evento deportivo, un intercambio de conocimiento entre organizaciones o un programa de formación deportiva. Workshops, sesiones prácticas, visitas de aprendizaje o formatos tipo campus pueden mencionarse como posibilidades a explorar según el encargo, nunca como proyectos realizados ni como un catálogo operativo ya confirmado. No prometas acceso a clubes, entrenadores, recintos o deportistas concretos.

La referencia es una instrucción interna para ti. No añadas una sección sobre Akaw, su enlace o comparaciones con ella en la web pública.

## 3. Logo y sistema de marca

En esta carpeta se incluirá el logo adjunto, cuyo nombre original es **WhatsApp Image 2026-10-16 at 18.48.16.jpeg**. Localízalo también por extensión si se ha renombrado.

El logo tiene fondo blanco, un monograma deportivo a la izquierda, una línea vertical granate y el nombre a la derecha. Las letras son gruesas, geométricas y dinámicas. Los dos colores principales son azul intenso y granate.

### Uso del logo

- Usa el archivo real. No lo sustituyas por una composición tipográfica aproximada ni rediseñes la marca.
- Mantén proporciones, márgenes y legibilidad; nunca lo estires.
- Funciona especialmente bien sobre un header blanco limpio o una superficie clara que se integre con su fondo.
- No uses `mix-blend-mode` ni filtros que alteren los colores para ocultar el fondo.
- Si creas una versión transparente, conserva fielmente las letras y bordes; revisa que no queden halos. Si no puedes hacerlo con calidad, usa el original sobre blanco.
- Si el archivo no está disponible, no bloquees toda la implementación: utiliza provisionalmente el nombre como texto e indica claramente en la entrega dónde incorporar el archivo. No inventes un logo.

### Paleta inicial

Extrae los colores de zonas interiores del logo, evitando los bordes comprimidos del JPEG. Los siguientes valores son **aproximaciones de partida**, no valores oficiales:

```css
:root {
  --brand-blue: #073F80;
  --brand-burgundy: #AF0041;
  --ink: #091524;
  --paper: #F5F5F2;
  --white: #FFFFFF;
  --muted: #647084;
}
```

El azul y el granate deben reconocerse en todo el sitio. Usa blanco y tonos oscuros para dar espacio y contraste. Nada de sustituir la marca por el habitual degradado violeta de una plantilla tecnológica. No introduzcas amarillo o dorado como protagonista.

## 4. Dirección creativa

Concepto: **“The architecture behind great sporting experiences.”**

Combina la escala emocional de un estadio con la precisión de una consultoría internacional. La web debe hablar de lo que hace posible un gran evento: estrategia, preparación, conocimiento y personas.

### Lenguaje visual

- Fotografía de estadios a gran formato, luces, estructuras arquitectónicas, gradas y geometrías de pistas o campos.
- Composiciones editoriales con jerarquía clara, espacios generosos y cambios de escala.
- Titulares contundentes, con cortes de línea deliberados; textos cortos y fáciles de leer.
- Contraste entre una apertura cinematográfica oscura y secciones claras de contenido.
- Líneas finas y recorridos inspirados en planos de estadios, pistas y conexiones entre ciudades.
- Detalles granate para acciones y azul para estructura, enlaces o acentos.
- Una composición propia; evita resolver toda la página con tarjetas idénticas.

Tipografía sugerida: una sans geométrica con carácter para titulares y otra muy legible para cuerpo. Puedes usar, por ejemplo, **Barlow Condensed + Inter** o una combinación de calidad similar con licencia adecuada. No uses más de dos familias. Descarga y sirve localmente las fuentes cuando sea viable.

Evita apariencia de tienda deportiva, web de apuestas, club de fútbol o venta de entradas. Somos una empresa B2B de servicios profesionales para el deporte.

## 5. Estructura y textos de partida

Implementa una landing page completa con navegación por anclas. Puedes mejorar los textos para que encajen con el diseño sin cambiar los hechos. Usa inglés natural, preciso y sin superlativos vacíos.

### A. Header

- Logo a la izquierda.
- Navegación: **About / Expertise / Approach / Contact**.
- CTA: **Let’s talk** → `#contact`.
- Header sticky discreto, con cambio suave de estado al hacer scroll.
- Menú móvil accesible, funcional con teclado y con cierre correcto al seleccionar una sección.

### B. Hero

Composición de impacto con un estadio como protagonista. Integra un tratamiento oscuro que permita leer el texto sin perder la fotografía.

**Eyebrow:**
> DUBAI · BARCELONA

**H1:**
> Shaping what’s next in sport.

**Supporting copy:**
> Sports events. Shared expertise. Training programmes. Based in Dubai, with operations in Barcelona, we help organisations shape sporting initiatives that bring people together and put knowledge into practice.

**Primary CTA:** Let’s talk → `#contact`

**Secondary CTA:** Explore our expertise → `#expertise`

**Small descriptor:**
> Strategy. Knowledge. People.

No añadas cifras ficticias para llenar el hero. Su fuerza debe venir de la composición, la imagen y el mensaje.

### C. About — Dos ciudades, una perspectiva internacional

**Eyebrow:** ABOUT BCN SPORT EVENTS

**Heading:**
> Two cities. A shared ambition for sport.

**Body:**
> BCN Sport Events is a Dubai-based consultancy with operations in Barcelona. We help organisations shape sports events, share expertise and set up training programmes around clear objectives and the people taking part.
>
> From defining an event concept to structuring a learning initiative, our focus is on connecting ideas, people and practical preparation.

Diseño sugerido: texto editorial acompañado de fotografía arquitectónica de un estadio y una composición tipográfica Dubai / Barcelona. Una línea animada entre ambos nombres puede expresar la conexión. No es necesario usar mapas externos ni coordenadas inventadas.

### D. Expertise — Tres líneas de servicio

**Eyebrow:** OUR EXPERTISE

**Heading:**
> From the first idea to lasting capability.

Presenta tres bloques con identidad propia. Puedes usar filas editoriales numeradas o paneles amplios; evita tres tarjetas genéricas con iconos de stock.

**01 — Sports Event Consulting**
> Turn a sporting idea into a clear event plan. We help define the concept, audience, format and planning priorities, aligning the people involved around a shared direction.

Temas: event concept & format / planning priorities / stakeholder coordination.

**02 — Knowledge Transfer**
> Make sporting expertise easier to share and apply. We help shape exchanges of knowledge around relevant topics, clear learning goals and practical takeaways for the people involved.

Temas: exchange of sporting know-how / learning formats / practical takeaways.

**03 — Training & Programme Setup**
> Give your sports training initiative a clear structure. We help define who it is for, what participants should learn and how the programme should be organised, from its content and schedule to its practical setup.

Temas: participant needs / programme content & schedule / practical setup.

Estos temas desarrollan las tres áreas comunicadas por el propietario; no añadas servicios técnicos especializados, titulaciones acreditadas, producción integral o gestión de instalaciones como si estuvieran confirmados.

### D.2. Aplicaciones — Una sección breve y concreta

Incluye después de los servicios un bloque editorial compacto para que el visitante se reconozca en una necesidad real. No lo presentes como portfolio ni añadas fotografías con captions que impliquen trabajo realizado.

**Heading:**
> What are you looking to build?

- **A sports event** — Shape the concept, define the audience and organise the planning priorities.
- **An exchange of expertise** — Bring a clear purpose and structure to the knowledge you want to share.
- **A training programme** — Connect participants’ needs with relevant content and a practical learning format.

**Closing line / link:**
> Tell us about your idea. → `#contact`

Este bloque aterriza los tres servicios. Mantén el texto breve y evita repetir sus descripciones completas. Puedes integrarlo en la sección Expertise si así funciona mejor el diseño.

### E. Approach — Proceso sencillo

**Eyebrow:** HOW WE WORK

**Heading:**
> A clear process. A practical outcome.

- **Understand** — We start with your context, objectives and the people involved.
- **Structure** — We shape a focused approach, with clear priorities and a shared direction.
- **Prepare** — We translate the approach into practical plans, learning formats and next steps.
- **Transfer** — We focus on knowledge and tools your team can carry forward.

Muéstralo como un recorrido visual elegante. Una animación de progreso al entrar en pantalla es suficiente; no obligues al visitante a hacer scroll horizontal para leerlo.

### F. Imagen de transición / statement

Utiliza otra gran imagen de estadio con un encuadre distinto al hero. Puede ser una vista aérea, un túnel o una estructura de cubierta. Superpone este mensaje con contraste suficiente:

> Great sporting experiences begin long before the first whistle.

Este bloque debe aportar ritmo y emoción. No lo conviertas en una sección de texto corporativo extensa.

### G. Contact — Última sección principal

La página debe terminar con un **Contact us** claro y visible.

**Eyebrow:** CONTACT US

**Heading:**
> Let’s move your next sports project forward.

**Body:**
> Tell us what you’re planning — an event, a knowledge-sharing initiative or a training programme. Let’s explore how we can help.

**Email, grande y visible:**
> contact@bcnsportsevents.com

Enlace funcional:
```text
mailto:contact@bcnsportsevents.com
```

**Location line:**
> Based in Dubai. Operating in Barcelona.

Puedes añadir un botón para copiar el correo con feedback accesible. No hace falta formulario: prioriza el contacto directo. No simules un envío, una reserva de reunión o un backend inexistente.

### H. Footer

Logo o nombre, copyright con año actual y enlace para volver arriba. No añadas enlaces muertos, perfiles sociales inventados ni páginas legales vacías. No inventes datos societarios ni textos que afirmen cumplimiento legal sin revisión.

## 6. Fotografía y recursos

Busca imágenes reales y de alta calidad de estadios y arquitectura deportiva. Puedes recurrir a bibliotecas como Unsplash o Pexels, verificando la licencia concreta y los derechos de uso disponibles. No presupongas que cualquier imagen encontrada en Google se puede reutilizar.

Direcciones de búsqueda útiles:
- stadium architecture night lights
- football stadium aerial geometry
- stadium tunnel architecture
- sports venue roof structure

Elige un conjunto coherente, no un collage de fotografías con tratamientos incompatibles. Prioriza encuadres que permitan situar titulares sin tapar el elemento principal.

Los estadios siguen siendo el elemento visual principal solicitado. Para conectar las imágenes con la actividad, puedes añadir alguna fotografía secundaria de una sesión de formación deportiva o trabajo en equipo, con derechos adecuados y sin implicar que muestra a nuestro equipo o a nuestros clientes. Evita que todas las imágenes sean edificios vacíos: la web también habla de personas y aprendizaje.

- Descarga los archivos permitidos al proyecto y optimízalos; evita hotlinks frágiles.
- Registra autor, URL de origen, licencia y atribución necesaria en un pequeño archivo de créditos.
- No uses escudos o marcas de clubes como prueba de relación comercial.
- No etiquetes una fotografía como Barcelona o Dubái sin verificar su ubicación.
- No atribuyas un estadio a nuestra empresa ni lo presentes como proyecto realizado.
- Si no hay acceso a recursos externos, usa assets locales adecuados o una composición original de geometrías deportivas. No dejes imágenes rotas ni placeholders visibles.

## 7. Movimiento y posibles elementos 3D

Quiero animaciones con intención y calidad, no efectos por todas partes.

### Base recomendada

- Entrada breve del titular por líneas y aparición suave del subtítulo y botones.
- Revelado de secciones al entrar en viewport.
- Parallax muy sutil en fotografías, solo cuando el dispositivo lo permita.
- Interacciones de enlaces y botones con buen tacto visual.
- Líneas de recorrido que conecten bloques del proceso.
- Transiciones de aproximadamente 300–800 ms, ajustadas al contexto.

### 3D opcional

Puedes crear una estructura abstracta inspirada en un estadio, una cubierta o un campo mediante Three.js / React Three Fiber o CSS 3D. Debe aportar una firma visual y respetar azul y granate. No debe competir con la fotografía ni convertir la web en una demo técnica.

Usa carga diferida, limita el consumo de GPU, pausa al salir de pantalla y ofrece fallback estático para dispositivos modestos o sin WebGL. No es obligatorio usar 3D: una gran dirección de arte y fotografía es preferible a un modelo mediocre.

### Reglas de uso

- Respeta `prefers-reduced-motion`; muestra todo el contenido también sin animación.
- Nada de scroll hijacking, cursores personalizados que sustituyan el sistema, sonido automático o pantallas de carga largas.
- Nunca bloquees la lectura o los CTA esperando a que termine una animación.
- Evita vídeo pesado si una fotografía excelente resuelve mejor el hero. Si hay vídeo, debe ser silenciado, con poster y fallback.

## 8. Implementación, accesibilidad y rendimiento

Reutiliza el stack si ya hay un proyecto. Si la carpeta está vacía, elige una base sencilla y mantenible; React + Vite + TypeScript es una opción adecuada. No incorpores un framework pesado sin necesidad.

- Componentes reutilizables y estilos consistentes mediante tokens.
- Sitio responsive desde 360 px; revisa también 390, 768, 1024 y 1440 px.
- Sin desbordamiento horizontal; presta especial atención al logo y al correo.
- Jerarquía semántica con un H1 y headings ordenados.
- Navegación por teclado, foco visible, skip link y menú móvil accesible.
- Contraste WCAG AA, incluyendo textos sobre imágenes y estados interactivos.
- Imágenes con dimensiones definidas y textos alternativos adecuados; decoración fuera del árbol accesible.
- Hero prioritario y optimizado; lazy loading para fotografías inferiores; formatos WebP/AVIF y tamaños responsive cuando sea posible.
- Evita dependencias redundantes y animaciones que provoquen layout shifts.
- El contenido esencial debe ser legible si falla una librería de animación.
- No añadas analítica, trackers, cookies no esenciales ni servicios externos de captura de leads por defecto.

SEO básico:
- Title: **BCN Sport Events | Sports Consulting, Knowledge Transfer & Training**
- Meta description: **Dubai-based sports consultancy with operations in Barcelona. Event consulting, knowledge transfer and training programmes for sports organisations.**
- Open Graph coherente con la identidad; usa una imagen local adecuada.
- `lang="en"`.
- No inventes dominio público, dirección, teléfono o datos estructurados empresariales. Configura canonical y URL social cuando exista la URL real de publicación.
- Genera un favicon sencillo y legible a partir de un detalle fiel del logo, si la resolución lo permite.

## 9. Lo que no debe aparecer

- Lorem ipsum o textos de plantilla.
- Métricas inventadas como “20+ years”, “100+ events” o “50 partners”.
- Testimonios ficticios, clientes o proyectos no facilitados.
- Aspecto de template SaaS con degradados brillantes y tarjetas repetidas.
- Exceso de balones, trofeos, iconos deportivos o escudos.
- CTAs sin función, formularios falsos o botones de idiomas sin traducción.
- Recursos rotos, marcas de agua o assets con derechos desconocidos.
- Teléfonos, redes sociales, direcciones o claims legales inventados.

## 10. Verificación y entrega

Antes de terminar:

1. Ejecuta la instalación y el build que correspondan al proyecto; resuelve los errores.
2. Abre la web y revisa el diseño real en escritorio y móvil si dispones de navegador. No declares una revisión visual que no hayas realizado.
3. Comprueba navegación por anclas, menú móvil, contacto por email y copia del correo si existe.
4. Comprueba foco, contraste, reduced motion, carga de imágenes y ausencia de scroll horizontal.
5. Revisa que el logo conserve su proporción y que el correo sea exactamente **contact@bcnsportsevents.com**.
6. Revisa que ninguna fotografía o texto sugiera clientes, proyectos o credenciales no confirmados.
7. Entrega el código completo, los assets utilizados, sus créditos y un README breve con instrucciones de instalación, ejecución y build.
8. Incluye una explicación breve de decisiones visuales y cualquier limitación real pendiente. No publiques en servicios externos ni configures dominios salvo que se te solicite expresamente.

**Criterio de éxito:** al abrir la página se debe entender de inmediato que BCN Sport Events conecta consultoría, conocimiento y formación en deporte entre Dubái y Barcelona. Debe sentirse contemporánea, sólida y memorable, con los colores del logo, fotografía de estadios y un contacto final inequívoco.
