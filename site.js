'use strict';
function videoId(value) {
  try { const u = new URL(value); if (u.hostname === 'youtu.be') return u.pathname.slice(1).match(/^[\w-]{11}$/)?.[0]; if (['www.youtube.com','youtube.com'].includes(u.hostname)) return (u.searchParams.get('v') || u.pathname.split('/').pop()).match(/^[\w-]{11}$/)?.[0]; } catch (_) {} return null;
}
function addPlayer(target, url, title, poster) {
  const id = videoId(url); if (!id) return;
  const link = document.createElement('a'); link.href = 'https://www.youtube.com/watch?v=' + id; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.className = 'watch-link'; link.textContent = 'Watch on YouTube ↗';
  const button = document.createElement('button'); button.className = 'video-poster'; button.type = 'button'; button.setAttribute('aria-label', 'Play ' + title);
  const img = document.createElement('img'); img.src = poster || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; img.alt = ''; img.loading = 'lazy';
  const label = document.createElement('span'); label.className = 'play-label'; label.textContent = '▶  Watch ' + title;
  button.append(img, label); button.addEventListener('click', () => {
    const frame = document.createElement('iframe'); frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'; frame.title = title; frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin'; button.replaceWith(frame); frame.focus();
  });
  target.append(button, link);
}
async function init() {
 const response = await fetch('content.json'); if (!response.ok) throw new Error('Content unavailable'); const data = await response.json();
 document.querySelectorAll('[data-category-image]').forEach(el => { const src = data.home[el.dataset.categoryImage + 'Image']; if (!src) return; const image = document.createElement('img'); image.src = src; image.alt = ''; image.loading = 'lazy'; el.replaceChildren(image); });
 document.querySelectorAll('[data-video]').forEach(el => { const name = el.dataset.video; addPlayer(el, data.films[name].youtube, name === 'leave' ? 'Leave' : 'Viktor', data.films[name].poster); });
 document.querySelectorAll('[data-gallery]').forEach(el => { const stills = data.films[el.dataset.gallery].stills || []; el.replaceChildren(); for (const item of stills) { const a = document.createElement('a'); a.href = item.src; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label','Open still: ' + item.alt); const img = document.createElement('img'); img.src = item.src; img.alt = item.alt; img.loading = 'lazy'; a.append(img); el.append(a); } });
 const grid = document.querySelector('#commercial-grid'); if (grid) { grid.replaceChildren(); for (const project of data.commercial) { const card = document.createElement('article'); card.className = 'commercial-card'; if (!project.youtube && !project.image && !project.title) { card.className = 'commercial-slot'; card.setAttribute('aria-hidden','true'); } else { if (project.youtube) { const player = document.createElement('div'); player.className = 'player'; addPlayer(player, project.youtube, project.title || project.brand || 'film', project.image); card.append(player); } else if (project.image) { const img = document.createElement('img'); img.src = project.image; img.alt = project.title || project.brand || ''; img.loading = 'lazy'; card.append(img); } if (project.title) { const h = document.createElement('h2'); h.textContent = project.title; card.append(h); } if (project.brand || project.role) { const p = document.createElement('p'); p.textContent = [project.brand,project.role].filter(Boolean).join(' · '); card.append(p); } } grid.append(card); } }
}
init().catch(() => { document.querySelectorAll('[data-video]').forEach(el => { const a = document.createElement('a'); a.href = el.dataset.video === 'leave' ? 'https://youtu.be/hB8q5_anAyM' : 'https://youtu.be/dnfMFGrJJoU'; a.textContent = 'Watch the film on YouTube ↗'; el.append(a); }); });
