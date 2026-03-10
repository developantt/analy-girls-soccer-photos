const cards = document.querySelectorAll('.photo-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');

if (cards.length && lightbox && lightboxImage && lightboxTitle && lightboxCaption && closeLightbox) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);

    const open = () => {
      const img = card.querySelector('img');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxTitle.textContent = card.dataset.title;
      lightboxCaption.textContent = card.dataset.caption;
      lightbox.showModal();
    };

    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  closeLightbox.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    const dialogRect = lightbox.getBoundingClientRect();
    const inDialog =
      dialogRect.top <= event.clientY &&
      event.clientY <= dialogRect.top + dialogRect.height &&
      dialogRect.left <= event.clientX &&
      event.clientX <= dialogRect.left + dialogRect.width;

    if (!inDialog) {
      lightbox.close();
    }
  });
}
