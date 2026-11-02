const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonsArea = document.getElementById("buttonsArea");
const noHint = document.getElementById("noHint");
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");
const restartButton = document.getElementById("restartButton");
const musicButton = document.getElementById("musicButton");
const music = document.getElementById("backgroundMusic");
const musicNote = document.getElementById("musicNote");

const playfulMessages = [
  "¡Uy! Ese botón tiene mucha energía 🙈",
  "¿Segura? Al menos lee la cartita primero 😅",
  "¡Se me escapó! Parece que no quiere trabajar hoy.",
  "Prometo que solo quería hacerte sonreír ♡",
  "Último intento... aunque tú decides, siempre."
];

let noAttempts = 0;

function moveNoButton() {
  const area = buttonsArea.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = 70;

  // En pantallas pequeñas el botón se mueve dentro de su zona, sin salirse de ella.
  const x = Math.random() * maxX - maxX / 2;
  const y = (Math.random() * maxY) - maxY / 2;

  noButton.style.position = "relative";
  noButton.style.transform = `translate(${x}px, ${y}px)`;
  noAttempts += 1;
  noHint.textContent = playfulMessages[Math.min(noAttempts - 1, playfulMessages.length - 1)];
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// En dispositivos táctiles no existe hover: se mueve al tocarlo.
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

yesButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  letter.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  createHearts(24);
});

restartButton.addEventListener("click", () => {
  letter.classList.add("hidden");
  intro.classList.remove("hidden");
  noButton.style.transform = "";
  noButton.style.position = "relative";
  noAttempts = 0;
  noHint.textContent = "Elige con el corazón. Sin presiones.";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function createHearts(amount) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > .35 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * 1.8}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5600);
  }
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.setAttribute("aria-pressed", "true");
      musicButton.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pausar nuestra canción';
      musicNote.textContent = "Reproduciendo nuestra canción ♡";
    } catch (error) {
      musicNote.textContent = "No se pudo reproducir. Revisa que hayas agregado assets/musica/cancion.mp3.";
    }
  } else {
    music.pause();
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.innerHTML = '<span aria-hidden="true">♫</span> Reproducir nuestra canción';
    musicNote.textContent = "La música está en pausa.";
  }
});

// Oculta automáticamente los marcos de fotos que aún no tengan una imagen válida.
document.querySelectorAll(".photo-card img, .memory-card img").forEach((img) => {
  img.addEventListener("error", () => img.closest("figure").classList.add("photo-missing"));
});
