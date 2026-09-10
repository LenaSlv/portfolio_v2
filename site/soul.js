document.querySelectorAll('.soul-mockup-track').forEach(track => {
  const mobile = matchMedia('(max-width: 700px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const positions = () => [...track.querySelectorAll('img')].map(image =>
    Math.max(0, Math.min(track.scrollWidth - track.clientWidth,
      image.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft)));
  const moveTo = position => track.scrollTo({ left: position, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  let drag = null;

  track.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== track) return;
    const offsets = positions();
    const current = offsets.reduce((nearest, offset, index) =>
      Math.abs(offset - track.scrollLeft) < Math.abs(offsets[nearest] - track.scrollLeft) ? index : nearest, 0);
    const targets = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: offsets.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    moveTo(offsets[Math.max(0, Math.min(targets[event.key], offsets.length - 1))]);
  });
  // Touch devices use native scrolling; mouse dragging adds the same gesture in a narrow browser window.
  track.addEventListener('dragstart', event => {
    if (mobile.matches) event.preventDefault();
  });
  track.addEventListener('pointerdown', event => {
    if (!mobile.matches || event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
    track.classList.add('is-dragging');
    track.focus({ preventScroll: true });
    event.preventDefault();
  });
  track.addEventListener('pointermove', event => {
    if (drag && event.pointerId === drag.id) track.scrollLeft = drag.left + drag.x - event.clientX;
  });
  const finishDrag = () => {
    if (!drag) return;
    const offsets = positions();
    const nearest = offsets.reduce((best, offset) =>
      Math.abs(offset - track.scrollLeft) < Math.abs(best - track.scrollLeft) ? offset : best);
    drag = null;
    track.classList.remove('is-dragging');
    moveTo(nearest);
  };
  track.addEventListener('pointerup', finishDrag);
  track.addEventListener('pointercancel', finishDrag);
  track.addEventListener('lostpointercapture', finishDrag);
  mobile.addEventListener('change', finishDrag);
});

(() => {
  const diagram = document.querySelector('.soul-diagram');
  const viewport = document.querySelector('.soul-diagram-viewport');
  const toggle = document.querySelector('.soul-flow-toggle');
  if (!diagram || !viewport || !toggle) return;
  let expanded = false;
  const sizeDiagram = () => {
    const scale = viewport.clientWidth / 1154;
    diagram.style.transform = `scale(${scale})`;
    viewport.style.height = `${(expanded ? 1394 : 660) * scale}px`;
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    expanded = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Свернуть флоу' : 'Показать полный флоу';
    sizeDiagram();
    if (!expanded) toggle.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  });
  new ResizeObserver(sizeDiagram).observe(viewport);
  sizeDiagram();

  const connections = [[[7300,7303],[7303,7306,"прямая"],[7303,7309,"реферал"],[7303,7312,"встреча"],[7306,7315],[7309,7315],[7312,7358],[7315,7318],[7318,7321,"да"],[7318,7327,"нет · повторный вход"],[7321,7324],[7324,7327]],[[7331,7334],[7334,7337],[7334,7340],[7334,7343],[7337,7346],[7340,7346],[7343,7355],[7346,7349,"да"],[7346,7352,"нет"],[7346,7355],[7355,7358]],[[7362,7365],[7365,7368],[7365,7377],[7377,7380],[7368,7371],[7368,7383],[7371,7374],[7371,7386,"нет бонуса"],[7374,7389,"да"],[7386,7392]],[[7396,7399],[7396,7402],[7399,7405],[7402,7405],[7405,7411],[7408,7411]],[[7415,7418],[7415,7421],[7418,7424],[7421,7424],[7421,7427],[7427,7430,"да"],[7427,7433,"нет"],[7430,7436]],[[7440,7443],[7443,7446],[7446,7449],[7449,7452],[7446,7455],[7449,7458,"лимит"],[7458,7461,"да"],[7440,7464],[7443,7467]]];
  const groups = [...document.querySelectorAll('.soul-flow-group')];
  const drawConnections = group => {
    const body = group.querySelector('.soul-flow-body');
    if (body.hidden || !body.clientWidth) return;
    const svg = body.querySelector('svg');
    const origin = body.getBoundingClientRect();
    const edges = connections[groups.indexOf(group)];
    const lanes = [];
    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${body.clientWidth} ${body.clientHeight}`);
    const box = element => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x - origin.x, y: rect.y - origin.y, width: rect.width, height: rect.height };
    };
    edges.forEach(([from, to, label]) => {
      const source = body.querySelector(`[data-flow-node="${from}"]`);
      const target = body.querySelector(`[data-flow-node="${to}"]`);
      const a = box(source), b = box(target);
      const branch = label && source.querySelector(`[data-flow-target="${to}"]`);
      let path;
      if (!label && source.nextElementSibling === target) {
        path = `M ${a.x + a.width / 2} ${a.y + a.height} V ${b.y}`;
      } else {
        const port = branch ? box(branch) : a;
        const startY = port.y + port.height / 2;
        const endY = b.y - 12;
        let lane = lanes.findIndex(end => end < Math.min(startY, endY));
        if (lane < 0) lane = lanes.length;
        lanes[lane] = Math.max(startY, endY);
        const x = body.clientWidth - 8 - lane * 5;
        path = `M ${a.x + a.width} ${startY} H ${x} V ${endY} H ${b.x + b.width / 2} V ${b.y}`;
      }
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      element.setAttribute('d', path);
      element.setAttribute('fill', 'none');
      element.setAttribute('stroke', '#2e6eeb');
      element.setAttribute('stroke-width', '1.5');
      svg.append(element);
    });
  };
  groups.forEach(group => {
    const button = group.querySelector('button');
    const body = group.querySelector('.soul-flow-body');
    body.hidden = true;
    button.hidden = false;
    button.addEventListener('click', () => {
      body.hidden = !body.hidden;
      button.setAttribute('aria-expanded', String(!body.hidden));
      drawConnections(group);
    });
    new ResizeObserver(() => drawConnections(group)).observe(body);
  });
  document.fonts.ready.then(() => groups.forEach(drawConnections));
  document.querySelector('.soul-flow-reference').addEventListener('click', event => {
    event.preventDefault();
    const group = groups[1];
    group.querySelector('.soul-flow-body').hidden = false;
    group.querySelector('button').setAttribute('aria-expanded', 'true');
    drawConnections(group);
    const target = document.getElementById('soul-meeting-node');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'center' });
  });
})();
