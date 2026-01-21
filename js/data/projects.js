// Datos de proyectos
const projectsData = [
    {
        id: 1,
        title: "Gym Control",
        description: "Aplicación Android profesional para la gestión integral de gimnasios y centros deportivos. Permite administrar clientes, membresías, pagos y promociones, con control de acceso por roles y notificaciones automáticas.",
        images: [
            "assets/images/projects/gymcontrol/gymcontrol1.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol2.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol3.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol4.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol5.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol6.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol7.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol8.jpeg",   
            "assets/images/projects/gymcontrol/gymcontrol9.jpeg",
            "assets/images/projects/gymcontrol/gymcontrol10.jpeg",
        ],
        category: "android",
        tags: [
            "Kotlin",
            "Jetpack Compose",
            "Clean Architecture",
            "Firebase",
            "Hilt",
            "Material 3"
        ],
        github: "https://github.com/jesusrivero/gym",
        demo: null,
        features: [
            "Gestión de clientes, membresías y pagos",
            "Autenticación con roles (Dueño y Administrador)",
            "Generación de reportes e historial de pagos en PDF",
            "Escaneo y generación de códigos QR",
            "Notificaciones push por vencimiento de membresías",
            "Sincronización en tiempo real con Firebase Firestore",
            "Modo claro / oscuro con diseño Material 3"
        ]
    },
    {
        id: 2,
        title: "MonitorWidget",
        description: "Widget Android 2x1 que muestra el precio del dólar BCV en Venezuela directamente en la pantalla de inicio. Se actualiza automáticamente cada hora.",
        images: [
            "assets/images/projects/monitorwidget/monitorwidget1.jpeg",
            "assets/images/projects/monitorwidget/monitorwidget2.jpeg",
            "assets/images/projects/monitorwidget/monitorwidget3.jpeg",
            "assets/images/projects/monitorwidget/monitorwidget4.jpeg",
            "assets/images/projects/monitorwidget/monitorwidget5.jpeg",
            "assets/images/projects/monitorwidget/monitorwidget6.jpeg",

        ],
        category: "android",
        tags: [
            "Kotlin",
            "Jetpack Compose",
            "AppWidget",
            "WorkManager",
            "Clean Architecture",
            "Hilt",
            "DataStore",
            "Material 3"
        ],
        github: "https://github.com/jesusrivero/MonitorWidget",
        demo: null,
        features: [
            "Widget 2x1 con actualización automática cada hora",
            "Obtención de la tasa BCV desde API externa",
            "Persistencia local con DataStore para uso offline",
            "Notificaciones inteligentes cuando cambia la tasa",
            "Ejecución en segundo plano con WorkManager",
            "Diseño moderno con Material 3 y modo claro/oscuro"
        ]
    },
    {
        id: 3,
        title: "Studivo",
        description: "Aplicación Android gamificada para la gestión y ejecución de rutinas de estudio. Permite crear, reproducir y compartir rutinas, visualizar estadísticas de progreso y mantener la motivación mediante rachas y seguimiento diario.",
        images: [
            "assets/images/projects/studivo/studivo1.jpeg",
            "assets/images/projects/studivo/studivo2.jpeg",
            "assets/images/projects/studivo/studivo3.jpeg",
            "assets/images/projects/studivo/studivo4.jpeg",
            "assets/images/projects/studivo/studivo5.jpeg",
        ],
        category: "android",
        tags: [
            "Kotlin",
            "Jetpack Compose",
            "Clean Architecture",
            "Hilt",
            "Material 3",
            "Room",
            "DataStore",
            "QR Code",
            "Audio"
        ],
        github: "https://github.com/jesusrivero/Studivo",
        demo: null,
        features: [
            "Creación, edición y eliminación de rutinas de estudio",
            "Organización de rutinas por fases con duración personalizada",
            "Reproducción de rutinas con temporizador y metrónomo",
            "Pausar, reanudar y reiniciar rutinas en ejecución",
            "Seguimiento de progreso diario con estadísticas y calendario",
            "Sistema de rachas para mantener la motivación",
            "Compartir rutinas mediante códigos QR",
            "Modo claro y oscuro con diseño moderno basado en Material 3"
        ]
    },
    {
        id: 4,
        title: "Pal-Plato",
        description: "Sistema compuesto por dos aplicaciones Android conectadas entre sí que permiten a clientes y dueños de negocios gestionar pedidos y ventas de forma digital. Incluye búsqueda de negocios cercanos, gestión de carrito y control completo del ciclo de pedidos.",
        images: [
            "assets/images/projects/palplato/palplato1.jpeg",
            "assets/images/projects/palplato/palplato2.jpeg",
           "assets/images/projects/palplato/palplato3.jpeg",
            "assets/images/projects/palplato/palplato4.jpeg",
            "assets/images/projects/palplato/palplato5.jpeg",
            "assets/images/projects/palplato/palplato6.jpeg",
        ],
        category: "android",
        tags: [
            "Kotlin",
            "Jetpack Compose",
            "Google Maps",
            "Clean Architecture",
            "Firebase",
            "Estados de Pedidos",
            "Geolocalización"
        ],
        github: "https://github.com/jesusrivero/Pal-Plato-Customer",
        demo: null,
        features: [
            "Aplicación para clientes y aplicación para dueños de negocios",
            "Listado de negocios cercanos usando geolocalización",
            "Filtrado de negocios por ubicación",
            "Visualización de menús y productos por negocio",
            "Gestión de carrito de compras y creación de pedidos",
            "Creación y administración de negocios digitales",
            "Gestión de menús, productos y precios",
            "Control de estados de pedidos (pendiente, en preparación, entregado)",
            "Seguimiento de ventas desde la app del negocio"
        ]
    }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}