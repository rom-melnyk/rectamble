import { Field } from './objects/field';
import { Rectangle } from './objects/rectangle';
import { Colors } from './objects/colors.enum';
import { Canvas } from './gameplay/canvas';

function rectamble() {
  const field = new Field(20, 25);
  const canvasEl = document.querySelector('canvas') as HTMLCanvasElement;
  const canvas = new Canvas(canvasEl, field);
  const rect = new Rectangle(3, 5, 5, 4, Colors.Our);
  canvas.drawRectangles([rect]);

  // TODO remove after debug
  Object.assign(window, {
    field,
    canvas,
    rect,
  });
}

if (typeof window !== 'undefined') {
  (window as any).rectamble = rectamble;
}
