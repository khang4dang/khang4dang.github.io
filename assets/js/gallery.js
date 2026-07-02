(function () {
  // Add future videos here. Set placeholder to false once the matching MP4 exists.
  const collections = [
    {
      slug: 'travel',
      title: 'Travel',
      symbol: '✈',
      note: 'Cities, coastlines, and small discoveries.',
      items: [
        { title: 'Cape Cod', meta: 'Coastal travel', src: 'assets/videos/cape-cod.mp4' },
        { title: 'Provincetown', meta: 'Travel diary', src: 'assets/videos/provincetown.mp4' }
      ]
    },
    {
      slug: 'new-jersey',
      title: 'New Jersey',
      symbol: '◈',
      note: 'Home-state shorelines, ferries, and local moments.',
      items: [
        { title: 'Dolphins off the Coast', meta: 'New Jersey shore', src: 'assets/videos/nj-dolphins.mp4' },
        { title: 'Wildwoods', meta: 'Boardwalk notes', src: 'assets/videos/nj-wildwoods.mp4' },
        { title: 'Ferry Crossing', meta: 'On the water', src: 'assets/videos/nj-ferry.mp4' }
      ]
    },
    {
      slug: 'broadway',
      title: 'Broadway',
      symbol: '★',
      note: 'Curtain calls, marquees, and musical-theatre memories.',
      items: [
        { title: 'Newsies', meta: 'Broadway memory', src: 'assets/videos/newsies.mp4' },
        { title: 'The Notebook', meta: 'Theatre night', src: 'assets/videos/the-notebook.mp4' },
        { title: 'The Nutcracker', meta: 'Stage and music', src: 'assets/videos/the-nutcracker.mp4' }
      ]
    },
    {
      slug: 'pokemon',
      title: 'Pokémon',
      symbol: '◉',
      note: 'Nostalgia, collecting, and playful adventures.',
      items: [
        { title: 'Pokémon Adventure 01', meta: 'Future video', src: 'assets/videos/pokemon-adventure-01.mp4', placeholder: true },
        { title: 'Pokémon Adventure 02', meta: 'Future video', src: 'assets/videos/pokemon-adventure-02.mp4', placeholder: true }
      ]
    },
    {
      slug: 'research-journey',
      title: 'Research Journey',
      symbol: '▣',
      note: 'Conferences, presentations, campuses, and academic milestones.',
      items: [
        { title: 'Graduation', meta: 'Academic milestone', src: 'assets/videos/research-journey/graduation.mp4' },
        { title: 'Research Conference', meta: 'Academic milestone', src: 'assets/videos/research-journey/ieee-ismar-2005.mp4' },
        { title: 'XR Access 2025 Part 1', meta: 'Academic milestone', src: 'assets/videos/research-journey/xr-access-2025-part-1.mp4' },
        { title: 'XR Access 2025 Part 2', meta: 'Academic milestone', src: 'assets/videos/research-journey/xr-access-2025-part-2.mp4' },
        { title: 'MIT Campus', meta: 'Campus visit', src: 'assets/videos/research-journey/mit-campus.mp4' },
        { title: 'Harvard Campus', meta: 'Campus visit', src: 'assets/videos/research-journey/harvard-campus.mp4' }
      ]
    },
    {
      slug: 'singing',
      title: 'Singing',
      symbol: '♫',
      note: 'Songs, rehearsals, and joyful crowd moments.',
      items: [
        { title: 'Boston World Cup', meta: 'Crowd and song', src: 'assets/videos/boston-world-cup.mp4' },
        { title: 'Singing Session 01', meta: 'Future video', src: 'assets/videos/singing-session-01.mp4', placeholder: true }
      ]
    }
  ];

  const previewCollections = [
    collections[0],
    collections[1],
    {
      slug: 'broadway-pokemon',
      title: 'Broadway + Pokémon',
      symbol: '★',
      items: [...collections[2].items, ...collections[3].items]
    },
    {
      slug: 'research-journey',
      title: 'Research Journey',
      symbol: '▣',
      items: [...collections[4].items, ...collections[5].items]
    }
  ];

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function cardMarkup(item) {
    const title = escapeHtml(item.title);
    const meta = escapeHtml(item.meta);
    const src = escapeHtml(item.src);
    const summary = escapeHtml(item.placeholder
      ? `Placeholder ready for ${item.title}. Add the MP4 at ${item.src}.`
      : `${item.title} · ${item.meta}`);
    const media = item.placeholder
      ? `<div class="video-placeholder" aria-hidden="true"><span>ADD MP4</span><small>${src}</small></div>`
      : `<video class="video-preview" muted loop playsinline preload="none" aria-hidden="true"><source src="${src}" type="video/mp4"></video>`;

    return `<article class="video-card${item.placeholder ? ' is-placeholder' : ''}" tabindex="0" role="button" aria-label="Play ${title}" data-title="${title}" data-summary="${summary}" data-video="${src}">
      ${media}<h3>${title}</h3><p>${meta}</p>
    </article>`;
  }

  function loopTrack(items, axis, direction) {
    return `<div class="gallery-loop-viewport"><div class="gallery-loop-track" data-loop-axis="${axis}" data-loop-direction="${direction}"><div class="gallery-loop-set">${items.map(cardMarkup).join('')}</div></div></div>`;
  }

  function renderColumns(container) {
    container.className = 'gallery-marquee gallery-columns';
    container.setAttribute('aria-label', 'Four continuously scrolling video collections. Hover or focus a collection to pause it.');
    container.innerHTML = previewCollections.map((collection, index) => `<section class="marquee-column gallery-collection gallery-${collection.slug}" aria-labelledby="column-${collection.slug}">
      <h3 class="gallery-column-heading" id="column-${collection.slug}"><span aria-hidden="true">${collection.symbol}</span>${collection.title}</h3>
      ${loopTrack(collection.items, 'vertical', index % 2 ? 'reverse' : 'forward')}
    </section>`).join('');
  }

  function renderRows(container) {
    container.className = 'full-gallery-rows';
    container.innerHTML = collections.map((collection, index) => `<section class="gallery-row gallery-${collection.slug}" aria-labelledby="row-${collection.slug}">
      <div class="gallery-row-heading"><div><span class="gallery-row-symbol" aria-hidden="true">${collection.symbol}</span><h2 id="row-${collection.slug}">${collection.title}</h2></div><p>${collection.note}</p></div>
      ${loopTrack(collection.items, 'horizontal', index % 2 ? 'reverse' : 'forward')}
    </section>`).join('');
  }

  function makeNonInteractive(element) {
    element.setAttribute('aria-hidden', 'true');
    element.querySelectorAll('[tabindex]').forEach(child => child.setAttribute('tabindex', '-1'));
    // A cloned video must be registered with IntersectionObserver as a new node.
    // Do not inherit the marker from the original video across loop rebuilds.
    element.querySelectorAll('.video-preview').forEach(video => {
      video.removeAttribute('data-playback-observed');
    });
  }

  function prepareLoop(track) {
    const set = track.querySelector('.gallery-loop-set');
    const viewport = track.parentElement;
    const axis = track.dataset.loopAxis;
    const originals = Array.from(set.children).filter(item => !item.hasAttribute('data-fill-clone'));
    if (!originals.length) return;

    track.querySelectorAll('.gallery-loop-set + .gallery-loop-set').forEach(clone => {
      clone.querySelectorAll('.video-preview').forEach(video => previewObserver?.unobserve(video));
      clone.remove();
    });
    set.querySelectorAll('[data-fill-clone]').forEach(clone => {
      clone.querySelectorAll('.video-preview').forEach(video => previewObserver?.unobserve(video));
      clone.remove();
    });

    const size = () => axis === 'vertical' ? set.scrollHeight : set.scrollWidth;
    const target = (axis === 'vertical' ? viewport.clientHeight : viewport.clientWidth) + 24;
    let index = 0;
    while (size() < target && index < 30) {
      const clone = originals[index % originals.length].cloneNode(true);
      clone.setAttribute('data-fill-clone', 'true');
      makeNonInteractive(clone);
      set.appendChild(clone);
      index += 1;
    }

    const duplicateSet = set.cloneNode(true);
    makeNonInteractive(duplicateSet);
    track.appendChild(duplicateSet);

    const styles = getComputedStyle(track);
    const gap = parseFloat(axis === 'vertical' ? styles.rowGap : styles.columnGap) || 0;
    const distance = size() + gap;
    const pixelsPerSecond = axis === 'vertical' ? 24 : 32;
    track.style.setProperty('--loop-distance', `${distance}px`);
    track.style.setProperty('--loop-distance-negative', `-${distance}px`);
    track.style.setProperty('--loop-duration', `${Math.max(18, distance / pixelsPerSecond)}s`);
    track.classList.add('is-loop-ready');
  }

  const columnGallery = document.querySelector('[data-gallery-layout="columns"]');
  const rowGallery = document.querySelector('[data-gallery-layout="rows"]');
  if (columnGallery) renderColumns(columnGallery);
  if (rowGallery) renderRows(rowGallery);

  const previewObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.play().catch(() => {});
          else entry.target.pause();
        });
      }, { rootMargin: '120px' })
    : null;

  function observePreviewVideos() {
    document.querySelectorAll('.video-preview:not([data-playback-observed])').forEach(video => {
      video.setAttribute('data-playback-observed', 'true');
      if (previewObserver) previewObserver.observe(video);
      else video.play().catch(() => {});
    });
  }

  const prepareAllLoops = () => {
    document.querySelectorAll('.gallery-loop-track').forEach(prepareLoop);
    observePreviewVideos();
  };
  requestAnimationFrame(prepareAllLoops);
  window.addEventListener('load', prepareAllLoops);
  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(prepareAllLoops, 150);
  });
})();
