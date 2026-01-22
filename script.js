document.addEventListener('DOMContentLoaded', () => {
    // TU NOMBRE AQUÍ
    const text = "Roberto";
    
    const typingElement = document.getElementById('typing-name');
    const typingDelay = 100; // Velocidad de escritura (ms)
    const startDelay = 500;  // Retraso antes de empezar

    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Opcional: Detener el parpadeo del cursor al terminar
            // document.querySelector('.cursor').style.display = 'none';
        }
    }

    // Iniciar la animación después del retraso inicial
    setTimeout(type, startDelay);

    // --- Lógica Modo Claro / Oscuro ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Cambiar icono
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // --- Animación de Aparición al hacer Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Lógica de la Galería (Modal) ---
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    // Modal de Instrucciones
    const instructionsModal = document.getElementById('instructionsModal');
    const instructionsBody = document.getElementById('instructionsBody');

    // Datos de las galerías (REEMPLAZA CON TUS FOTOS REALES)
    const galleries = {
        "restaurante_qr": [
            { src: "img/41.png", caption: "Escaneo de QR con cámara integrada" },
            { src: "img/42.png", caption: "Vista de la Carta Digital" },
            { src: "img/43.png", caption: "Login de Usuarios (Mozo/Chef/Admin)" },
            { src: "img/44.png", caption: "Panel de Mozo: Gestión de Pedidos" },
            { src: "img/45.png", caption: "Panel de Cocina (KDS): Estado de platos" },
            { src: "img/46.png", caption: "Panel Admin: Balance y Ganancias" },
            { src: "img/47.png", caption: "Admin: Agregar productos al menú" },
            { src: "img/48.png", caption: "Admin: Gestión de Personal" },
            { src: "img/49.png", caption: "Admin: Gestión de Mesas y QRs" },
            { src: "img/50.png", caption: "Configuraciones del Sistema" },
            { src: "img/51.png", caption: "Selección de plato y detalles" },
            { src: "img/52.png", caption: "Confirmación de pedido exitoso" }
        ],
        "restobar_qr_moderno": [
            { src: "img/53.png", caption: "Acceso restringido (Requiere escaneo de QR)" },
            { src: "img/54.png", caption: "Carta digital con buscador y filtrado" },
            { src: "img/55.png", caption: "Registro de cliente y selección (Visualización de stock agotado)" },
            { src: "img/56.png", caption: "Confirmación de pedido registrado exitosamente" },
            { src: "img/57.png", caption: "Acceso de personal mediante código de seguridad" },
            { src: "img/58.png", caption: "Panel Mozo: Gestión de pedidos y notificaciones" },
            { src: "img/59.png", caption: "Panel Mozo: Pedido aceptado y en proceso" },
            { src: "img/60.png", caption: "Panel Mozo: Pedido marcado como terminado" },
            { src: "img/61.png", caption: "Panel Mozo: Solicitud de cuenta recibida" },
            { src: "img/62.png", caption: "Panel Admin: Gestión de carta y control de stock" },
            { src: "img/63.png", caption: "Dashboard Trabajadores: Visualización de ganancias" },
            { src: "img/64.png", caption: "Login de Jefe (Acceso Administrativo)" },
            { src: "img/65.png", caption: "Dashboard Jefe: Ganancias totales y plato favorito" }
        ],
        "landing_servicios": [
            { src: "img/37.png", caption: "Quién soy y Servicios Técnicos" },
            { src: "img/38.png", caption: "Portafolio de Páginas y Bots" },
            { src: "img/39.png", caption: "Testimonios y Preguntas Frecuentes" },
            { src: "img/40.png", caption: "Visualización de TikTok" }
        ],
        "convenciones": [
            { src: "img/1.png", caption: "Vista Principal" },
            { src: "img/2.png", caption: "Vista Principal - Super Sentai" },
            { src: "img/3.png", caption: "Efecto interactivo al pasar el mouse" },
            { src: "img/4.png", caption: "Vista Principal - Power Rangers" },
            { src: "img/5.png", caption: "Efecto interactivo al pasar el mouse" },
            { src: "img/6.png", caption: "Vista Principal - Comic-Con" }
        ],
        "navidad": [
            { src: "img/7.png", caption: "Pantalla de bienvenida con botón de acción" },
            { src: "img/8.png", caption: "Revelación del mensaje y reproducción de música" }
        ],
        "repositorio": [
            { src: "img/9.png", caption: "Vista principal con cuadrícula de 6 categorías" },
            { src: "img/10.png", caption: "Vista principal con cuadrícula de 6 categorías" },
            { src: "img/11.png", caption: "Vista principal de Películas" },
            { src: "img/12.png", caption: "Vista principal de Servicios" },
            { src: "img/13.png", caption: "Vista Principal de Sobre Mi" },
            { src: "img/14.png", caption: "Vista Principal sobre información de la página" }
        ],
        "cumpleanos": [
            { src: "img/15.png", caption: "Vista general con fotos y mensaje lado a lado" },
            { src: "img/16.png", caption: "Primer plano del mensaje de felicitación" }
        ],
        "libros": [
            { src: "img/17.png", caption: "Vista principal con categorías del 1 al 5" },
            { src: "img/18.png", caption: "Visualización de libros disponibles por tipo" },
            { src: "img/19.png", caption: "Visualización de libros disponibles por tipo" }
        ],
        "serie": [
            { src: "img/20.png", caption: "Inicio con efecto de escritura de directores" },
            { src: "img/21.png", caption: "Sección de Actores " },
            { src: "img/22.png", caption: "Sección de Banda Sonora" },
            { src: "img/23.png", caption: "Sección de Seguidores" },
            { src: "img/24.png", caption: "Galería de fotos detrás de cámaras" },
            { src: "img/25.png", caption: "Sección de Directores" },
            { src: "img/26.png", caption: "Lista de episodios" },
            { src: "img/27.png", caption: "Formulario de contacto" }
        ],
        "novia": [
            { src: "img/28.png", caption: "Interfaz con botones de Sí y No" },
            { src: "img/29.png", caption: "Mensaje en movimiento al precionar presionar No" },
            { src: "img/30.png", caption: "Mensaje de confirmación al lograr presionar Sí" }
        ],
        "cv_moderno": [
            { src: "img/31.png", caption: "Navegación con secciones" },
            { src: "img/32.png", caption: "Vista de Sobre Mí" },
            { src: "img/33.png", caption: "Vista de Habilidades" },
            { src: "img/34.png", caption: "Vista de Experiencia" },
            { src: "img/35.png", caption: "Vista de Portafolio" },
            { src: "img/36.png", caption: "Formulario de Contacto" }
        ]
    };

    // Datos de Instrucciones (Credenciales)
    const projectInstructions = {
        "restaurante_qr": `
            <p>Puedes ver cómo funciona ahora mismo:</p>
            <ul>
                <li><strong>👉 Demo de cliente:</strong> <a href="https://pedidos-qr-demo.page.gd/" target="_blank">https://pedidos-qr-demo.page.gd/</a></li>
                <li><strong>👉 Menú directo:</strong> <a href="https://pedidos-qr-demo.page.gd/menu.php?mesa=1" target="_blank">Ver Menú (Mesa 1)</a></li>
                <li><strong>👉 Panel de Administrador:</strong> <a href="https://pedidos-qr-demo.page.gd/admin.php" target="_blank">Ir al Panel</a> <br>Usuario: <code>admin</code> • Clave: <code>admin</code></li>
                <li><strong>👉 Panel de Mozo:</strong> <a href="https://pedidos-qr-demo.page.gd/mozo.php" target="_blank">Ir al Panel</a> <br>Usuario: <code>mozo</code> • Clave: <code>mozo</code></li>
                <li><strong>👉 Cocina/KDS:</strong> <a href="https://pedidos-qr-demo.page.gd/cocina.php" target="_blank">Ir al Panel</a> <br>Usuario: <code>chef</code> • Clave: <code>chef</code></li>
            </ul>
        `,
        "restobar_qr_moderno": `
            <p>Credenciales de acceso para los diferentes paneles:</p>
            <ul>
                <li><strong>👉 Panel de Mozo:</strong> <a href="https://restobar-app-ruby.vercel.app/mozo" target="_blank">Ir al Panel</a> <br>Clave: <code>1234</code></li>
                <li><strong>👉 Panel de Cocina:</strong> <a href="https://restobar-app-ruby.vercel.app/cocina" target="_blank">Ir al Panel</a> <br>Clave: <code>1234</code></li>
                <li><strong>👉 Dashboard:</strong> <a href="https://restobar-app-ruby.vercel.app/dashboard" target="_blank">Ir al Panel</a> <br>Clave: <code>1234</code></li>
                <li><strong>👉 Panel Admin:</strong> <a href="https://restobar-app-ruby.vercel.app/admin" target="_blank">Ir al Panel</a> <br>Clave: <code>1234</code></li>
                <li><strong>👉 Panel Jefe:</strong> <a href="https://restobar-app-ruby.vercel.app/jefe" target="_blank">Ir al Panel</a> <br>Clave: <code>9999</code></li>
            </ul>
        `
    };

    let currentProject = [];
    let currentIndex = 0;

    // Abrir Modal
    document.querySelectorAll('.open-gallery').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (galleries[projectId]) {
                currentProject = galleries[projectId];
                currentIndex = 0;
                showImage(currentIndex);
                modal.style.display = "block";
            }
        });
    });

    // Abrir Modal de Instrucciones
    document.querySelectorAll('.open-instructions').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (projectInstructions[projectId]) {
                instructionsBody.innerHTML = projectInstructions[projectId];
                instructionsModal.style.display = "block";
            }
        });
    });

    function showImage(index) {
        modalImg.src = currentProject[index].src;
        captionText.innerHTML = currentProject[index].caption;
    }

    // Controles Siguiente / Anterior
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentProject.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentProject.length) % currentProject.length;
        showImage(currentIndex);
    });

    // Cerrar Modales (Cualquiera)
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.style.display = "none");
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) { e.target.style.display = "none"; }
    });
});
