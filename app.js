/**
 * Special Date Invitation 💖 For My Blossom
 * Powerpuff Girls Pink & Purple Theme
 * Interactive Scripts: Confetti, Floating Sparkles, RSVP Modal, Live Countdown to September 3
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Generate Floating Sparkles & Continuous Bottom-to-Top Floating Photos
  createFloatingSparkles();
  createFloatingPhotos();

  // 3. Live Countdown Timer Setup for 3 September at 13:00 WIB
  setupCountdown();

  // 4. RSVP Modal Interactions
  setupRsvpModal();

  // 5. Floating Controls (Confetti, Share, Scroll to top)
  setupFloatingControls();

  // 6. Interactive Timeline Card Hover FX
  setupTimelineInteractivity();

  // 7. Initial welcome confetti burst
  setTimeout(() => {
    firePpgConfetti();
  }, 600);
});

/* =========================================================
   CONTINUOUS BOTTOM-TO-TOP FLOATING PHOTOS GENERATOR
   ========================================================= */
function createFloatingPhotos() {
  const container = document.getElementById('floating-photos-container');
  if (!container) return;

  const photoSources = ['assets/photo1.png', 'assets/photo2.png', 'assets/photo3.png'];
  const badges = ['💖', '✨', '🌸', '💜', '🎀', '🥰'];
  const count = 5; // Reduced frequency so it stays subtle and uncluttered

  // Strategic positions along the outer edges
  const horizontalPositions = [
    3.5,   // Far left
    89.0,  // Far right
    12.5,  // Mid left
    81.5,  // Mid right
    6.0    // Far left lower
  ];

  for (let i = 0; i < count; i++) {
    const photoEl = document.createElement('div');
    photoEl.className = 'floating-up-photo';

    const card = document.createElement('div');
    card.className = 'photo-bubble-card';

    const img = document.createElement('img');
    img.src = photoSources[i % photoSources.length];
    img.alt = `Cute floating memory ${i + 1}`;
    img.className = 'photo-bubble-img';
    img.loading = 'lazy';

    const badge = document.createElement('span');
    badge.className = 'photo-bubble-badge';
    badge.textContent = badges[i % badges.length];

    card.appendChild(img);
    card.appendChild(badge);
    photoEl.appendChild(card);

    // Spread horizontally along edges with subtle variation
    const basePos = horizontalPositions[i % horizontalPositions.length];
    const leftPos = basePos + (Math.random() * 2 - 1);
    photoEl.style.left = `${Math.min(93, Math.max(2, leftPos))}%`;

    // Slower, graceful floating duration (18s - 25s)
    const duration = 18 + (i * 1.6) + Math.random() * 2;
    photoEl.style.animationDuration = `${duration}s`;

    // Staggered delays so only 2 to 3 photos appear simultaneously
    const delay = -(i * 4.5);
    photoEl.style.animationDelay = `${delay}s`;

    container.appendChild(photoEl);
  }
}

/* =========================================================
   FLOATING SPARKLES & HEARTS GENERATOR
   ========================================================= */
function createFloatingSparkles() {
  const container = document.getElementById('sparkles-container');
  if (!container) return;

  const sparklesList = ['💖', '✨', '🌸', '💜', '🤍', '🎀', '💫', '🧸'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    sparkle.textContent = sparklesList[Math.floor(Math.random() * sparklesList.length)];
    
    // Randomize initial positions & animation durations
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDuration = `${6 + Math.random() * 8}s`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    sparkle.style.fontSize = `${14 + Math.random() * 18}px`;

    container.appendChild(sparkle);
  }
}

/* =========================================================
   CONFETTI BURST (PPG PINK, PURPLE & WHITE HEARTS)
   ========================================================= */
function firePpgConfetti() {
  if (typeof confetti !== 'function') return;

  const colors = ['#ff3385', '#a855f7', '#ff80bf', '#c084fc', '#ffffff', '#ffd1ea'];

  // Left & Right Cannons
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 65,
    origin: { x: 0.1, y: 0.8 },
    colors: colors,
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 65,
    origin: { x: 0.9, y: 0.8 },
    colors: colors,
  });
}

/* =========================================================
   COUNTDOWN TIMER (TARGET: 3 SEPTEMBER, 13:00 WIB)
   ========================================================= */
function setupCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Target Date: 3 September at 13:00:00 (uses current year or 2026)
  const currentYear = new Date().getFullYear();
  let targetDate = new Date(currentYear, 8, 3, 13, 0, 0); // Month 8 is September (0-indexed)

  // If September 3 has already passed this year, set to next year
  if (targetDate.getTime() < new Date().getTime()) {
    targetDate = new Date(currentYear + 1, 8, 3, 13, 0, 0);
  }

  function update() {
    const currentTime = new Date().getTime();
    const distance = targetDate.getTime() - currentTime;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* =========================================================
   RSVP MODAL MANAGEMENT
   ========================================================= */
function setupRsvpModal() {
  const openBtn = document.getElementById('btn-rsvp');
  const closeBtn = document.getElementById('btn-close-modal');
  const modal = document.getElementById('rsvp-modal');
  const form = document.getElementById('rsvp-form');
  const successState = document.getElementById('rsvp-success-message');
  const closeSuccessBtn = document.getElementById('btn-close-success');
  const successGuestText = document.getElementById('success-guest-text');

  if (!modal || !openBtn) return;

  const radioLabels = document.querySelectorAll('.radio-card');
  radioLabels.forEach(label => {
    label.addEventListener('click', () => {
      radioLabels.forEach(l => l.classList.remove('active'));
      label.classList.add('active');
    });
  });

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', () => {
    openModal();
    firePpgConfetti();
  });

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guest-name')?.value.trim() || 'Sayang';
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

    if (attendance === 'hadir') {
      successGuestText.textContent = `Yaaay! Makasih banyak ya ${name}! Tungguin aku jemput kamu naik motor tanggal 3 September jam 13.00 tepat. Jangan lupa baju putih dan jaketnya ya cantik! 💖🛵🤍`;
    } else {
      successGuestText.textContent = `Pasti seru banget motoran berdua di tanggal 3 September nanti ${name}! Siap-siap dandan cantik ya! 💜🛵`;
    }

    form.style.display = 'none';
    successState.style.display = 'block';

    firePpgConfetti();
  });

  closeSuccessBtn?.addEventListener('click', () => {
    closeModal();
    setTimeout(() => {
      form.style.display = 'flex';
      successState.style.display = 'none';
      form.reset();
    }, 400);
  });
}

/* =========================================================
   FLOATING BUTTONS & UTILITIES
   ========================================================= */
function setupFloatingControls() {
  const confettiBtn = document.getElementById('btn-sparkles');
  const shareBtn = document.getElementById('btn-share');
  const topBtn = document.getElementById('btn-top');

  confettiBtn?.addEventListener('click', () => {
    firePpgConfetti();
  });

  shareBtn?.addEventListener('click', async () => {
    const shareData = {
      title: 'Undangan Kencan Motoran Spesial 3 September 💖🛵',
      text: 'Hai sayang! Ini jadwal kencan manis kita tanggal 3 September:\n🛵 13.00 Berangkat / Jemput Naik Motor\n📍 14.00 Lokasi Pertama (Photoshoot & Seru-seruan)\n🍲 16.00 Shabu Hachi Date\n☕ 18.00 Ngopi & Deep Talk\nDresscode: Baju Putih, Celana Bebas + Bawa Jaket Manis! 🤍💖',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
        alert('✨ Undangan kencan motoran berhasil disalin! Silakan kirim langsung ke WhatsApp ayang! 💖🛵');
      });
    }
  });

  topBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Toggle back to top visibility on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.style.opacity = '1';
      topBtn.style.pointerEvents = 'auto';
    } else {
      topBtn.style.opacity = '0.7';
    }
  });
}

/* =========================================================
   TIMELINE CARD HOVER EFFECTS
   ========================================================= */
function setupTimelineInteractivity() {
  const cards = document.querySelectorAll('.timeline-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const marker = card.querySelector('.timeline-marker');
      if (marker) {
        marker.style.boxShadow = '0 0 20px rgba(255, 51, 133, 0.6)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const marker = card.querySelector('.timeline-marker');
      if (marker) {
        marker.style.boxShadow = '';
      }
    });
  });
}
