const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const startDate = new Date("2026-02-17T00:00:00");
const messages = [
  "You are my favorite notification.",
  "Every love song suddenly makes sense.",
  "I found my home in your smile.",
  "One heart. One story. Us."
];
let messageIndex = 0;
let sharedAudioContext;
const lastCounterValues = {};
const reasons = [
  "I love the way your smile changes my whole day.",
  "I love how safe your presence feels.",
  "I love your voice.",
  "I love your laugh.",
  "I love your cute anger.",
  "I love how you care.",
  "I love your eyes.",
  "I love your little messages.",
  "I love missing you because it reminds me how much you matter.",
  "I love your heart.",
  "I love how you make ordinary days special.",
  "I love your softness.",
  "I love your strength.",
  "I love your honesty.",
  "I love your childish side.",
  "I love your serious side.",
  "I love how you understand me.",
  "I love how you make me want to be better.",
  "I love your attention.",
  "I love your drama.",
  "I love your kindness.",
  "I love your patience.",
  "I love your face when you smile.",
  "I love how you become my favorite thought.",
  "I love your good morning.",
  "I love your good night.",
  "I love how you remember small things.",
  "I love the way you talk.",
  "I love your cute complaints.",
  "I love your excitement.",
  "I love your dreams.",
  "I love your confidence.",
  "I love your innocence.",
  "I love your vibe.",
  "I love how you make silence comfortable.",
  "I love your random moods.",
  "I love your photos.",
  "I love your expressions.",
  "I love your courage.",
  "I love your loyalty.",
  "I love the way you say my name.",
  "I love your little habits.",
  "I love how you make me smile for no reason.",
  "I love how proud I feel of you.",
  "I love your beauty.",
  "I love your mind.",
  "I love your soul.",
  "I love the way you care about people.",
  "I love how you make my heart calm.",
  "I love your cute texts.",
  "I love your sleepy voice.",
  "I love your energy.",
  "I love your style.",
  "I love how you make love feel simple.",
  "I love your trust.",
  "I love how you become home.",
  "I love your reactions.",
  "I love your little jokes.",
  "I love your attitude.",
  "I love your sweetness.",
  "I love your emotional side.",
  "I love how real you are.",
  "I love your presence in my life.",
  "I love the way you look at me.",
  "I love our memories.",
  "I love our future.",
  "I love our silly talks.",
  "I love our serious talks.",
  "I love your support.",
  "I love your care when I feel low.",
  "I love the peace you bring.",
  "I love your uniqueness.",
  "I love your heartbeats close to mine.",
  "I love your name.",
  "I love choosing you.",
  "I love waiting for your reply.",
  "I love your stubbornness.",
  "I love how you make me feel lucky.",
  "I love every version of you.",
  "I love how you became my favorite chapter.",
  "I love that you are Shreya.",
  "I love that we are Aryan and Shreya.",
  "I love your tiny details.",
  "I love how you make distance feel smaller.",
  "I love your warmth.",
  "I love your comfort.",
  "I love your madness.",
  "I love your calmness.",
  "I love the way you care without showing off.",
  "I love the memories we still have to make.",
  "I love the way you make forever feel possible.",
  "I love your cute jealousy.",
  "I love your pure heart.",
  "I love your little surprises.",
  "I love how you make me believe in love.",
  "I love being yours.",
  "I love calling you mine.",
  "I love you yesterday.",
  "I love you today.",
  "I'll love you tomorrow."
];

function audioCtx() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!sharedAudioContext) sharedAudioContext = new AudioContext();
  return sharedAudioContext;
}

function createFloaters(containerSelector, items, count) {
  const container = $(containerSelector);
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement("span");
    el.textContent = items[i % items.length];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${9 + Math.random() * 13}s`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    el.style.opacity = `${0.35 + Math.random() * 0.45}`;
    container.appendChild(el);
  }
}

function addFloaterStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .float-layer span {
      position: absolute;
      top: 105%;
      animation-name: rise;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      filter: drop-shadow(0 4px 8px rgba(255, 47, 127, .18));
    }
    @keyframes rise {
      from { transform: translate3d(0, 0, 0) rotate(0deg); }
      to { transform: translate3d(20px, -120vh, 0) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

function typeText() {
  const text = "A cinematic pink world made only for the girl I love.";
  const target = $("#typingText");
  let i = 0;
  const timer = setInterval(() => {
    target.textContent = text.slice(0, i);
    i += 1;
    if (i > text.length) clearInterval(timer);
  }, 58);
}

function updateCounter() {
  const now = new Date();
  const diff = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  setCounterDigit("years", Math.floor(days / 365));
  setCounterDigit("months", Math.floor((days % 365) / 30));
  setCounterDigit("days", days);
  setCounterDigit("hours", Math.floor((totalSeconds % 86400) / 3600));
  setCounterDigit("minutes", Math.floor((totalSeconds % 3600) / 60));
  setCounterDigit("seconds", totalSeconds % 60);
}

function setCounterDigit(id, value) {
  const el = $(`#${id}`);
  const text = String(value).padStart(id === "seconds" || id === "minutes" || id === "hours" ? 2 : 1, "0");
  if (lastCounterValues[id] === text) return;
  lastCounterValues[id] = text;
  el.classList.remove("flip");
  void el.offsetWidth;
  el.textContent = text;
  el.classList.add("flip");
}

function sparkleAt(x, y, amount = 28) {
  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = i % 3 === 0 ? "🌹" : "✨";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
    spark.style.setProperty("--y", `${(Math.random() - 0.5) * 220}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 950);
  }
}

function playTone(type = "tap") {
  const ctx = audioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const settings = {
    tap: [620, 0.04, 0.11, "triangle"],
    paper: [260, 0.035, 0.22, "sawtooth"],
    heart: [120, 0.055, 0.28, "sine"],
    sparkle: [880, 0.05, 0.18, "sine"]
  }[type];
  osc.frequency.value = settings[0];
  osc.type = settings[3];
  gain.gain.setValueAtTime(settings[1], ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + settings[2]);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + settings[2]);
}

function confetti() {
  for (let i = 0; i < 90; i += 1) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = ["#ff2f7f", "#ffd1e4", "#ffffff", "#ff9ac3", "#b16cff"][i % 5];
    el.style.animationDelay = `${Math.random() * 0.65}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3300);
  }
}

function clickSound() {
  playTone("tap");
}

function initMusic() {
  const music = $("#backgroundMusic");
  if (!music) return;
  music.volume = 0.35;

  const playMusic = () => {
    music.play().catch(() => {});
  };

  ["pointerdown", "click", "keydown", "touchstart"].forEach((eventName) => {
    window.addEventListener(eventName, playMusic, { once: true, passive: true });
  });
}

function initGallery() {
  const photos = $$(".photo");
  const lightboxPhoto = $("#lightboxPhoto");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxCaption = $("#lightboxCaption");
  const galleryCount = $("#galleryCount");
  let currentIndex = 0;

  const openPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    photos.forEach((p) => p.classList.remove("active"));
    photo.classList.add("active");
    lightboxPhoto.src = photo.dataset.image;
    lightboxPhoto.alt = photo.dataset.date;
    lightboxTitle.textContent = photo.dataset.date;
    lightboxCaption.textContent = photo.dataset.caption;
    galleryCount.textContent = `${currentIndex + 1} / ${photos.length}`;
    $("#lightbox").classList.add("open");
    burstModalHearts();
  };

  photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
      clickSound();
      openPhoto(index);
    });
  });
  $("#closeLightbox").addEventListener("click", () => $("#lightbox").classList.remove("open"));
  $("#lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") $("#lightbox").classList.remove("open");
  });
  $("#galleryPrev").addEventListener("click", (event) => {
    event.stopPropagation();
    clickSound();
    openPhoto(currentIndex - 1);
  });
  $("#galleryNext").addEventListener("click", (event) => {
    event.stopPropagation();
    clickSound();
    openPhoto(currentIndex + 1);
  });
  window.addEventListener("keydown", (event) => {
    if (!$("#lightbox").classList.contains("open")) return;
    if (event.key === "Escape") $("#lightbox").classList.remove("open");
    if (event.key === "ArrowLeft") openPhoto(currentIndex - 1);
    if (event.key === "ArrowRight") openPhoto(currentIndex + 1);
  });
}

function burstModalHearts() {
  const hearts = ["❤️", "❤️", "💖", "🤍"];
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "modal-heart";
    heart.textContent = hearts[i % hearts.length];
    const side = i % 4;
    if (side === 0) {
      heart.style.left = `${8 + Math.random() * 18}%`;
      heart.style.top = `${22 + Math.random() * 56}%`;
    } else if (side === 1) {
      heart.style.left = `${74 + Math.random() * 18}%`;
      heart.style.top = `${22 + Math.random() * 56}%`;
    } else if (side === 2) {
      heart.style.left = `${22 + Math.random() * 56}%`;
      heart.style.top = `${8 + Math.random() * 10}%`;
    } else {
      heart.style.left = `${22 + Math.random() * 56}%`;
      heart.style.top = `${82 + Math.random() * 8}%`;
    }
    heart.style.animationDelay = `${Math.random() * 0.55}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3200);
  }
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.id === "ending") {
        createFireflies();
      }
    });
  }, { threshold: 0.18 });

  $$(".reveal, .ending").forEach((el) => observer.observe(el));
}

function createFireflies() {
  if ($(".firefly")) return;
  for (let i = 0; i < 26; i += 1) {
    const fly = document.createElement("span");
    fly.className = "firefly";
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${Math.random() * 100}%`;
    fly.style.animationDelay = `${Math.random() * 3}s`;
    $("#ending").appendChild(fly);
  }
}

function createProposalFireflies() {
  const scene = $(".proposal-scene");
  if (!scene || scene.querySelector(".proposal-firefly")) return;
  for (let i = 0; i < 30; i += 1) {
    const fly = document.createElement("span");
    fly.className = "proposal-firefly";
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${Math.random() * 82}%`;
    fly.style.animationDelay = `${Math.random() * 4}s`;
    scene.appendChild(fly);
  }
}

function initMemoryBook() {
  $$(".book-page").forEach((page) => {
    page.addEventListener("click", () => {
      playTone("paper");
      $$(".book-page").forEach((p) => p.classList.remove("active"));
      page.classList.add("active");
    });
  });
}

function showToast(text, long = false) {
  const toast = $("#reasonToast");
  toast.innerHTML = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, long ? 6200 : 3600);
}

function initHiddenSurprise() {
  let typed = "";
  window.addEventListener("keydown", (event) => {
    typed = `${typed}${event.key.toLowerCase()}`.slice(-8);
    if (typed.includes("ily") || event.key === "❤") {
      playTone("sparkle");
      showToast("I loved you yesterday.<br>I love you today.<br>I'll love you tomorrow.", true);
      sparkleAt(window.innerWidth / 2, window.innerHeight / 2, 70);
    }
  });
}

function initCursorTrail() {
  let last = 0;
  window.addEventListener("pointermove", (event) => {
    const now = Date.now();
    if (now - last < 38) return;
    last = now;
    const dot = document.createElement("span");
    dot.className = "spark";
    dot.textContent = "💕";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    dot.style.setProperty("--x", `${(Math.random() - 0.5) * 50}px`);
    dot.style.setProperty("--y", `${-30 - Math.random() * 45}px`);
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  });
}

$("#enterBtn").addEventListener("click", () => {
  clickSound();
  $("#intro").classList.add("hide");
  typeText();
  $("#backgroundMusic").play().catch(() => {});
});

$("#crystalHeart").addEventListener("click", (event) => {
  playTone("heart");
  sparkleAt(event.clientX, event.clientY, 34);
  $("#crystalHeart").classList.add("active");
  if (navigator.vibrate) navigator.vibrate([30, 20, 45]);
  setTimeout(() => $("#crystalHeart").classList.remove("active"), 850);
  messageIndex = (messageIndex + 1) % messages.length;
  $("#heartMessage").textContent = messages[messageIndex];
});

$("#envelope").addEventListener("click", () => {
  playTone("paper");
  $("#envelope").classList.toggle("open");
});

$("#ringBox").addEventListener("click", () => {
  playTone("sparkle");
  $("#ringBox").classList.add("open");
  $("#proposalText").textContent = "will u\nstay with me\nforever?";
  confetti();
  const box = $("#ringBox").getBoundingClientRect();
  sparkleAt(box.left + box.width / 2, box.top + box.height / 2, 44);
  createProposalFireflies();
});

$("#reasonBtn").addEventListener("click", () => {
  clickSound();
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  showToast(reason);
});

$("#surpriseBtn").addEventListener("click", () => {
  playTone("sparkle");
  $("#finalSurprise").classList.add("show");
  confetti();
  sparkleAt(window.innerWidth / 2, window.innerHeight / 2, 90);
});

$("#finalSurprise").addEventListener("click", () => {
  $("#finalSurprise").classList.remove("show");
});

setTimeout(() => {
  $("#surpriseBtn").classList.add("show");
}, 30000);

addFloaterStyles();
createFloaters(".petals", ["🌸", "🌹"], 38);
createFloaters(".hearts", ["💕", "❤", "💖"], 26);
createFloaters(".butterflies", ["🦋"], 9);
initGallery();
initMusic();
initCursorTrail();
initScrollAnimations();
initMemoryBook();
initHiddenSurprise();
createProposalFireflies();
updateCounter();
setInterval(updateCounter, 1000);
