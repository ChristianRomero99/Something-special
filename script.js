const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hearts = document.getElementById("hearts");
const card = document.getElementById("card");

let noClicks = 0;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnHearts(count = 20) {
  const emojis = ["💖", "💘", "💝", "💕", "❤️", "💗"];
  const { left, top, width, height } = card.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // spawn around the card area
    const x = rand(left + 20, left + width - 20);
    const y = rand(top + height - 40, top + height + 10);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${rand(16, 28)}px`;
    el.style.animationDuration = `${rand(1.4, 2.3)}s`;

    hearts.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function moveNoButton() {
  const pad = 12;

  
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  
  const minX = pad;
  const minY = pad;
  const maxX = cardRect.width - btnRect.width - pad;
  const maxY = cardRect.height - btnRect.height - pad;

  const x = rand(minX, Math.max(minX, maxX));
  const y = rand(minY, Math.max(minY, maxY));

  
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = 10;
}

noBtn.addEventListener("mouseenter", () => {
  noClicks++;
  moveNoButton();

  const lines = [
    "Try again! ",
    "Nope—catch me if you can!",
    "Okay but… what if yes? 👀",
    "I’m fast for a reason 🏃‍♂️💨",
    "You’re gonna have to press Yes "
  ];
  result.innerHTML = lines[Math.min(noClicks - 1, lines.length - 1)];
});

noBtn.addEventListener("click", (e) => {
  
  e.preventDefault();
  noClicks++;
  moveNoButton();
  result.innerHTML = "That button is decorative 😅 Try the other one!";
});

yesBtn.addEventListener("click", () => {
  result.innerHTML = `
    <strong>Thank you I love you! 💖</strong><br/>
    Best decision ever.<br/>
    <em>(Can't wait for virtual date night!)</em>
  `;

  spawnHearts(40);

  yesImage.classList.remove("hidden"); 

  noBtn.disabled = true;
  noBtn.style.opacity = 0.5;
  noBtn.style.cursor = "not-allowed";
});