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
  const btnIrFormulario = document.getElementById("btnIrFormulario");

  let paginaActual = 0;
  let correoUsuario = null;

  const wizardPaginas = [
    "¿Quieres monetizar tu contenido sin complicaciones? Únete a Bodycam México...",
    "Todo el programa opera bajo ética legal...",
    "Como fundador, entendí que no basta con crear contenido...",
    "Proponemos que tu contenido se publique en el canal principal...",
    "Te damos acceso a herramientas de IA...",
    "Usaremos Google Workspace u otra plataforma colaborativa...",
    "Todo está respaldado por contrato legal...",
    "La monetización se asegura por la diversificación...",
    "Cada colaborador tendrá seguimiento personalizado...",
    "Ideal para quienes solo quieren crear...",
    "Al diversificar el contenido, se maximiza la posibilidad...",
    "Somos un proyecto legal, transparente y ético...",
    "Al ser un equipo pequeño, la información es clara...",
    "Regístrate en el formulario..."
  ];

  window.onGoogleSignIn = function (response) {
    const credential = response.credential;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    correoUsuario = payload.email;

    console.log("Correo del usuario:", correoUsuario);
    btnContinuarLogin.disabled = false;

    registrarCorreo(correoUsuario);
  };

  function registrarCorreo(email) {
    fetch("https://script.google.com/macros/s/AKfycbwJyHjIEtR2vwRb5-xSiqCaar4AK2oaL6lapolMrNF1PDdpVFnEJ6trWjC2IYwXmPOj/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "email=" + encodeURIComponent(email)
    })
    .then(response => response.text())
    .then(data => console.log("Registro:", data))
    .catch(error => console.error("Error al registrar:", error));
  }

  btnContinuarLogin.addEventListener("click", () => {
    if (!consentimiento.checked) {
      alert("Por favor acepta recibir notificaciones para continuar.");
      return;
    }
    mostrarSeccion("seccion-youtube");
  });

  btnIrYoutube?.addEventListener("click", () => {
    window.open("https://www.youtube.com/@BodycamFilesMx?sub_confirmation=1", "_blank");
  });

  btnContinuarYoutube?.addEventListener("click", () => {
    mostrarSeccion("seccion-generador");
  });

  btnProgramaBodycam?.addEventListener("click", () => {
    mostrarSeccion("seccion-programa");
    cargarPaginaWizard();
  });

  btnSiguienteWizard?.addEventListener("click", () => {
    if (paginaActual < wizardPaginas.length - 1) {
      paginaActual++;
      cargarPaginaWizard();
    } else {
      mostrarSeccion("seccion-formulario");
    }
  });

  btnAtrasWizard?.addEventListener("click", () => {
    if (paginaActual > 0) {
      paginaActual--;
      cargarPaginaWizard();
    }
  });

  btnIrFormulario?.addEventListener("click", () => {
    window.open("https://forms.gle/6izFAo3w5L2GU3SN8", "_blank");
  });

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.add("seccion-oculta"));
    document.getElementById(id)?.classList.remove("seccion-oculta");
  }

  function cargarPaginaWizard() {
    wizardContent.innerHTML = `<p>${wizardPaginas[paginaActual]}</p>`;
    btnAtrasWizard.disabled = paginaActual === 0;
    btnSiguienteWizard.textContent = paginaActual === wizardPaginas.length - 1 ? "Ir al formulario" : "Siguiente";
  }
});
