import { Field } from './objects/field';
import { Rectangle } from './objects/rectangle';
import { Colors } from './objects/colors.enum';
import { Canvas } from './gameplay/canvas';
import { Player } from './gameplay/player';

let field: Field;
let canvasEl: HTMLCanvasElement;
let canvas: Canvas;
let player: Player;
let rect: Rectangle;
let positionValidator: (rect: Rectangle) => boolean;

function init(): void {
  field = new Field(20, 25);
  canvasEl = document.querySelector('canvas') as HTMLCanvasElement;
  canvas = new Canvas(canvasEl, field);
  player = new Player('Rom', Colors.Our);
}

function dice(): number {
  return 1 + Math.trunc(Math.random() * 6);
}

function newRectangle(): Rectangle {
  const width = dice();
  const height = dice();
  const x = Math.trunc((field.width - width) / 2);
  const y = Math.trunc((field.height - height) / 2);
  return new Rectangle(x, y, width, height, player.color);
}

function newRound(): void {
  rect = newRectangle();
  positionValidator = (player.rectangles.length === 0)
    ? isFirstRectanglePositionValid
    : isRectanglePositionValid;
  canvas.drawRectangles([...player.rectangles, rect]);
}

function isFirstRectanglePositionValid(rect: Rectangle): boolean {
  return rect.left === 0 && rect.bottom === field.height;
}

function isRectanglePositionValid(rect: Rectangle): boolean {
  const touchesOwn = player.rectangles.some(ownRect => ownRect.touches(rect));
  const intersects = player.rectangles.some(ownRect => ownRect.intersects(rect));
  return touchesOwn && !intersects;
}

function fitRectangleIntoField(rect: Rectangle) {
  if (rect.top < 0) {
    rect.top = 0;
  }
  if (rect.left < 0) {
    rect.left = 0;
  }
  if (rect.right > field.width) {
    rect.right = field.width;
  }
  if (rect.bottom > field.height) {
    rect.bottom = field.height;
  }
}

function rectamble(): void {
  init();

  newRound();

  canvasEl.addEventListener('mousemove', (e: MouseEvent) => {
    // cell coords used here
    const mouseX = canvas.coordsXToCell(e.offsetX);
    const mouseY = canvas.coordsYToCell(e.offsetY);
    const { x: prevX, y: prevY, centerX, centerY } = rect;
    rect.x += Math.round(mouseX - centerX);
    rect.y += Math.round(mouseY - centerY);
    fitRectangleIntoField(rect);
    rect.isValidPosition = positionValidator(rect);
    if (rect.x !== prevX || rect.y !== prevY) {
      canvas.drawRectangles([...player.rectangles, rect]);
    }
  });

  window.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'r' || e.key === 'R') {
      rect.rotate();
      fitRectangleIntoField(rect);
      rect.isValidPosition = positionValidator(rect);
      canvas.drawRectangles([...player.rectangles, rect]);
    } else if (e.key === ' ') {
      if (rect.isValidPosition) {
        rect.isParked = true;
        player.rectangles.push(rect);
        newRound();
      } else {
        console.warn('Cannot park a rectangle here :(');
      }
    }
  });
}

if (typeof window !== 'undefined') {
  (window as any).rectamble = rectamble;
}
