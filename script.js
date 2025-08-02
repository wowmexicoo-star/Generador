document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("seccion-login");
});

btnIrYoutube?.addEventListener("click", () => {
  window.open("https://www.youtube.com/@BodycamFilesMx?sub_confirmation=1", "_blank");
  btnContinuarGenerador.classList.remove("seccion-oculta");
});

btnContinuarGenerador?.addEventListener("click", () => {
  mostrarSeccion("seccion-generador");
});

btnShopify?.addEventListener("click", () => {
  window.open("https://o0frp0ckg3s6md71-76778012911.shopifypreview.com/products_preview?preview_key=05763684f1549d79fe4f8c4001bce1cc", "_blank");
});

btnProgramaBodycam?.addEventListener("click", () => {
  paginaActual = 0;
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

btnIrFormularioFinal?.addEventListener("click", () => {
  window.open("https://forms.gle/6izFAo3w5L2GU3SN8", "_blank");
});

btnGenerarEnlace?.addEventListener("click", () => {
  const url = inputUrlCanal.value.trim();
  const esValido = /^https?:\/\/(www\.)?youtube\.com\/(channel|@|user)\/.+/.test(url);
  if (!esValido) {
    alert("Por favor ingresa un URL válido de YouTube (canal, usuario o handle).");
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

// ✅ LOGIN CON GOOGLE: redirección automática sin botón ni checkbox
function onGoogleSignIn(response) {
  console.log("Usuario autenticado:", response);
  mostrarSeccion("seccion-youtube");
}

// Variables globales necesarias
const secciones = document.querySelectorAll("section");
const wizardPaginas = document.querySelectorAll(".wizard-page");
let paginaActual = 0;
