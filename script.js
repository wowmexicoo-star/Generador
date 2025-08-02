document.addEventListener("DOMContentLoaded", () => {
  const btnContinuarLogin = document.getElementById("btnContinuarLogin");
  const consentimiento = document.getElementById("consentimiento");
  const secciones = document.querySelectorAll("section");
  const btnIrYoutube = document.getElementById("btnIrYoutube");
  const btnContinuarYoutube = document.getElementById("btnContinuarYoutube");
  const btnProgramaBodycam = document.getElementById("btnProgramaBodycam");
  const wizardContent = document.getElementById("wizard-content");
  const btnAtrasWizard = document.getElementById("btnAtrasWizard");
  const btnSiguienteWizard = document.getElementById("btnSiguienteWizard");

  let paginaActual = 0;

  const wizardPaginas = [
    "¿Quieres monetizar tu contenido sin complicaciones? Únete a Bodycam México: buscamos 10 creadores comprometidos con contenido ético y viral. ¡Confianza, comunidad y resultados!",
    "Todo el programa opera bajo ética legal, sin infringir normas de YouTube ni políticas de monetización. Seguridad y transparencia ante todo.",
    "Como fundador, entendí que no basta con crear contenido: hay que expandirlo estratégicamente en redes según el nicho. Aquí lo hacemos por ti.",
    "Proponemos que tu contenido se publique en el canal principal de Bodycam México, organizado y optimizado con herramientas exclusivas.",
    "Te damos acceso a herramientas de IA para títulos, descripciones, hashtags, miniaturas y revisión legal del contenido. Todo listo para monetizar.",
    "Usaremos Google Workspace u otra plataforma colaborativa para que subas tus videos con toda la info. Yo me encargo de publicarlos y organizarlos.",
    "Todo está respaldado por contrato legal, con cláusulas claras, ética y transparencia. Nada se improvisa.",
    "La monetización se asegura por la diversificación del contenido y el trabajo estratégico en marketing digital.",
    "Cada colaborador tendrá seguimiento personalizado y estimado de ingresos una vez alcanzada la monetización.",
    "Ideal para quienes solo quieren crear: no necesitas cuenta en AdSense ni equipo especial. Yo gestiono todo. Monetizas sin complicarte.",
    "Al diversificar el contenido, se maximiza la posibilidad de monetización. Todo está estructurado para cumplir las políticas de YouTube.",
    "Somos un proyecto legal, transparente y ético. Los pagos se depositan directamente en tu cuenta de PayPal. Requisito indispensable.",
    "Al ser un equipo pequeño, la información es clara y no se cruza. Cada quien sabe qué le corresponde.",
    "Regístrate en el formulario. Si eres aceptado, recibirás notificación por correo electrónico. ¡Bienvenido al programa!"
  ];

  consentimiento.addEventListener("change", () => {
    btnContinuarLogin.disabled = !consentimiento.checked;
  });

  btnContinuarLogin.addEventListener("click", () => {
    mostrarSeccion("seccion-youtube");
  });

  btnIrYoutube.addEventListener("click", () => {
    window.open("https://www.youtube.com/@BodycamFilesMx?sub_confirmation=1", "_blank");
  });

  btnContinuarYoutube.addEventListener("click", () => {
    mostrarSeccion("seccion-generador");
  });

  btnProgramaBodycam.addEventListener("click", () => {
    mostrarSeccion("seccion-programa");
    cargarPaginaWizard();
  });

  btnSiguienteWizard.addEventListener("click", () => {
    if (paginaActual < wizardPaginas.length - 1) {
      paginaActual++;
      cargarPaginaWizard();
    } else {
      mostrarSeccion("seccion-formulario");
    }
  });

  btnAtrasWizard.addEventListener("click", () => {
    if (paginaActual > 0) {
      paginaActual--;
      cargarPaginaWizard();
    }
  });

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.add("seccion-oculta"));
    document.getElementById(id).classList.remove("seccion-oculta");
  }

  function cargarPaginaWizard() {
    wizardContent.innerHTML = `<p>${wizardPaginas[paginaActual]}</p>`;
    btnAtrasWizard.disabled = paginaActual === 0;
    btnSiguienteWizard.textContent = paginaActual === wizardPaginas.length - 1 ? "Ir al formulario" : "Siguiente";
  }
});
