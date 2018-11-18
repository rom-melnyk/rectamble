import { Field } from './objects/field';
import { Rectangle } from './objects/rectangle';
import { Colors } from './objects/colors.enum';
import { Canvas } from './gameplay/canvas';

function rectamble() {
  const consoleEl = document.querySelector('.console') as HTMLDivElement;

  const field = new Field(20, 25);
  const canvasEl = document.querySelector('canvas') as HTMLCanvasElement;
  const canvas = new Canvas(canvasEl, field);
  const rect1 = new Rectangle(3, 5, 1, 6, Colors.Our);
  const rect2 = new Rectangle(3, 8, 5, 4, Colors.Their);
  consoleEl.innerHTML = rect1.intersects(rect2) ? 'invalid position' : '';
  const rects = [ rect1, rect2 ];

  canvas.drawRectangles(rects);

  // TODO remove after debug
  Object.assign(window, {
    field,
    canvas,
    rect1,
    rect2,
  });

  canvasEl.addEventListener('mousemove', (e: MouseEvent) => {
    // cell coords here
    const mouseX = canvas.coordsXToCell(e.offsetX);
    const mouseY = canvas.coordsYToCell(e.offsetY);
    const { x: prevX, y: prevY, centerX, centerY } = rect1;
    rect1.x += Math.trunc(mouseX - centerX);
    rect1.y += Math.trunc(mouseY - centerY);
    field.fitRectangle(rect1);
    consoleEl.innerHTML = rect1.intersects(rect2) ? 'invalid position' : '';
    if (rect1.x !== prevX || rect1.y !== prevY) {
      canvas.drawRectangles(rects);
    }
  });

  window.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'r' || e.key === 'R') {
      rect1.rotate();
      field.fitRectangle(rect1);
      consoleEl.innerHTML = rect1.intersects(rect2) ? 'invalid position' : '';
      canvas.drawRectangles(rects);
    }
  });
}

if (typeof window !== 'undefined') {
  (window as any).rectamble = rectamble;
}
