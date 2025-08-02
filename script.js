document.addEventListener("DOMContentLoaded", () => {
  const btnContinuarLogin = document.getElementById("btnContinuarLogin");
  const consentimiento = document.getElementById("consentimiento");
  const secciones = document.querySelectorAll("section");
  const btnIrYoutube = document.getElementById("btnIrYoutube");
  const btnContinuarYoutube = document.getElementById("btnContinuarGenerador");
  const btnProgramaBodycam = document.getElementById("btnProgramaBodycam");
  const wizardContent = document.getElementById("wizard-content");
  const btnAtrasWizard = document.getElementById("btnAtrasWizard");
  const btnSiguienteWizard = document.getElementById("btnSiguienteWizard");
  const btnIrFormulario = document.getElementById("btnIrFormularioFinal");
  const btnShopify = document.getElementById("btnShopify");
  const inputUrlCanal = document.getElementById("inputUrlCanal");
  const btnGenerarEnlace = document.getElementById("btnGenerarEnlace");
  const outputEnlace = document.getElementById("outputEnlace");
  const btnCopiarEnlace = document.getElementById("btnCopiarEnlace");
  const resultadoGenerador = document.getElementById("resultadoGenerador");

  let paginaActual = 0;
  let correoUsuario = null;

  const wizardPaginas = Array.from(document.querySelectorAll(".wizard-page"));

  window.onGoogleSignIn = function (response) {
    const credential = response.credential;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    correoUsuario = payload.email;
    console.log("Correo del usuario:", correoUsuario);
    btnContinuarLogin.disabled = false;

    if (consentimiento.checked) {
      registrarCorreo(correoUsuario, "Sí");
    } else {
      registrarCorreo(correoUsuario, "No");
    }
  };

  function registrarCorreo(email, consentimiento) {
    fetch("https://script.google.com/macros/s/AKfycbwJyHjIEtR2vwRb5-xSiqCaar4AK2oaL6lapolMrNF1PDdpVFnEJ6trWjC2IYwXmPOj/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correo: email, consentimiento: consentimiento })
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
    btnContinuarYoutube.classList.remove("seccion-oculta");
  });

  btnContinuarYoutube?.addEventListener("click", () => {
    mostrarSeccion("seccion-generador");
  });

  btnShopify?.addEventListener("click", () => {
    window.open("https://sv1dsi-qk.myshopify.com/products/guia-secreta-para-monetizar-en-youtube", "_blank");
  });

  btnProgramaBodycam?.addEventListener("click", () => {
    mostrarSeccion("seccion-programa");
    cargarPaginaWizard();
  });

  btnSiguienteWizard?.addEventListener("click", () => {
    if (paginaActual < wizardPaginas.length - 1) {
      paginaActual++;
      cargarPaginaWizard();
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

  btnGenerarEnlace?.addEventListener("click", () => {
    const url = inputUrlCanal.value.trim();
    if (!url.includes("youtube.com")) {
      alert("Por favor ingresa un URL válido de YouTube.");
      return;
    }
    const enlace = `${url}?sub_confirmation=1`;
    outputEnlace.value = enlace;
    resultadoGenerador.classList.remove("resultado-oculto");
  });

  btnCopiarEnlace?.addEventListener("click", () => {
    outputEnlace.select();
    outputEnlace.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Enlace copiado al portapapeles");
  });

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.add("seccion-oculta"));
    document.getElementById(id)?.classList.remove("seccion-oculta");
  }

  function cargarPaginaWizard() {
    wizardPaginas.forEach((pagina, index) => {
      pagina.style.display = index === paginaActual ? "block" : "none";
    });
    btnAtrasWizard.disabled = paginaActual === 0;
    btnSiguienteWizard.textContent = paginaActual === wizardPaginas.length - 1 ? "Finalizar" : "Siguiente →";
  }
});
