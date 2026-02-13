const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const title = document.getElementById("title");
const img = document.getElementById("resultImg");
const container = document.querySelector(".cont");
const bottomText = document.getElementById("bottomText");


let scale = 1;

function moveNoButton(event) {
  const parent = container.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const yes = yesBtn.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // центр кнопки НЕТ
  const btnCenterX = btn.left + btn.width / 2;
  const btnCenterY = btn.top + btn.height / 2;

  let dx = btnCenterX - cursorX;
  let dy = btnCenterY - cursorY;

  if (dx === 0 && dy === 0) {
    dx = Math.random() - 0.5;
    dy = Math.random() - 0.5;
  }

  const length = Math.sqrt(dx * dx + dy * dy);
  dx /= length;
  dy /= length;

  const step = 100;

  let newX = btn.left - parent.left + dx * step;
  let newY = btn.top - parent.top + dy * step;

  // ограничение внутри .cont
  newX = Math.max(0, Math.min(parent.width - btn.width, newX));
  newY = Math.max(0, Math.min(parent.height - btn.height, newY));

const padding = 120;

const yesX = yes.left - parent.left;
const yesY = yes.top - parent.top;

// расширенная зона вокруг кнопки ДА
const dangerZone = {
  left: yesX - padding,
  right: yesX + yes.width + padding,
  top: yesY - padding,
  bottom: yesY + yes.height + padding
};

function isInDanger(x, y) {
  return (
    x < dangerZone.right &&
    x + btn.width > dangerZone.left &&
    y < dangerZone.bottom &&
    y + btn.height > dangerZone.top
  );
}

// если попали в зону — ищем новую позицию
let tries = 0;
while (isInDanger(newX, newY) && tries < 20) {
  newX = Math.random() * (parent.width - btn.width);
  newY = Math.random() * (parent.height - btn.height);
  tries++;
}

  // ещё раз ограничиваем
  newX = Math.max(0, Math.min(parent.width - btn.width, newX));
  newY = Math.max(0, Math.min(parent.height - btn.height, newY));

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";

  // увеличение кнопки ДА
  if (scale < 1.8) {
    scale += 0.2;
    yesBtn.style.transform = `scale(${scale})`;
  }
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("mousemove", moveNoButton);

yesBtn.addEventListener("click", () => {
  title.classList.add("title-success");
  title.textContent = "УРАААА 😼";

  img.src = "./img/gif.gif";
  img.style.display = "block";

  bottomText.textContent = "Люблю тебя кошка💖";
  bottomText.classList.add("bottom-text-active");

  document.querySelector(".buttons").style.display = "none";
});




// создаём контейнер для сердечек
const heartsContainer = document.createElement("div");
heartsContainer.classList.add("hearts");
container.appendChild(heartsContainer);

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  // случайная позиция по ширине
  heart.style.left = Math.random() * 100 + "%";

  // случайный размер
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  // случайная скорость
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";

  heartsContainer.appendChild(heart);

  // удаляем после анимации
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// создаём сердечки постоянно
setInterval(createHeart, 300);
