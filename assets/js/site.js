
(function(){
  const newsToggle = document.getElementById('news-toggle');
  const newsPanel = document.querySelector('.news-panel');
  if (newsToggle && newsPanel) {
    newsToggle.addEventListener('click', () => {
      const paused = newsPanel.classList.toggle('paused');
      newsToggle.textContent = paused ? 'Resume' : 'Pause';
      newsToggle.setAttribute('aria-pressed', String(paused));
    });
  }

  function getParam(name){ return new URLSearchParams(window.location.search).get(name); }
  function applyFilter(group, value){
    const cards = document.querySelectorAll('[data-filter-group="' + group + '"] [data-category]');
    cards.forEach(card => {
      const show = value === 'all' || card.dataset.category === value;
      card.dataset.hidden = show ? 'false' : 'true';
    });
    document.querySelectorAll('[data-filter-controls="' + group + '"] .tab').forEach(btn => {
      const active = btn.dataset.filter === value;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  document.querySelectorAll('[data-filter-controls]').forEach(group => {
    const name = group.dataset.filterControls;
    group.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => applyFilter(name, btn.dataset.filter));
    });
  });

  const categoryParam = getParam('category');
  if (document.querySelector('[data-filter-group="research"]')) applyFilter('research', categoryParam || 'all');
  if (document.querySelector('[data-filter-group="blog"]')) applyFilter('blog', categoryParam || 'all');
  if (document.querySelector('[data-filter-group="publications"]')) applyFilter('publications', categoryParam || 'all');

  const modal = document.getElementById('media-modal');
  if (modal) {
    const title = document.getElementById('media-modal-title');
    const desc = document.getElementById('media-modal-desc');
    const video = document.getElementById('media-modal-video');
    const close = document.getElementById('media-modal-close');
    document.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', () => openMedia(card));
      card.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openMedia(card); }
      });
    });
    function openMedia(card){
      title.textContent = card.dataset.title || 'Media item';
      desc.textContent = card.dataset.summary || '';
      const src = card.dataset.video || '';
      video.pause();
      video.removeAttribute('src');
      video.innerHTML = '';
      if (src) {
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.load();
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      close.focus();
    }
    function closeModal(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      video.pause();
    }
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }
})();


// Keep page content offset equal to the real fixed-header height.
(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  function setHeaderOffset(){
    const height = Math.ceil(header.getBoundingClientRect().height + 24);
    document.documentElement.style.setProperty('--fixed-header-height', height + 'px');
  }
  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset);
  window.addEventListener('load', setHeaderOffset);
})();
