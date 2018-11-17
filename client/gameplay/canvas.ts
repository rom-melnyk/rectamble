import { Field } from '../objects/field';
import { Rectangle } from '../objects/rectangle';
import { DrawColors } from '../objects/colors.enum';

const cellSize = 20; // px; this is temporary until set up field/canvas size properly

export class Canvas {
  private width: number = 0;
  private height: number = 0;
  private ctx: CanvasRenderingContext2D;
  private element: HTMLCanvasElement;
  private field: Field;
  private hGap: number = 2;
  private vGap: number = 2;

  constructor(canvasEl: HTMLCanvasElement, field: Field) {
    this.element = canvasEl;
    this.field = field;
    // const { scrollWidth: width, scrollHeight: height, } = canvasEl;
    const width = field.width * cellSize + (field.width + 1) * (this.hGap);
    const height = field.height * cellSize + (field.height + 1) * (this.vGap);
    this.width = width;
    this.height = height;
    this.element.width = width;
    this.element.height = height;
    this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
  }

  public drawRectangles(rects: Rectangle[]) {
    this.clear();
    this.drawGrid();
    rects.forEach((rect) => {
      this.drawRectangle(rect);
    });
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private drawGrid() {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'hsla(240, 50%, 80%, .15)';
    for (let i = 0; i <= this.field.width; i++) {
      const x = i * (cellSize + this.hGap) + this.hGap / 2;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
    }
    for (let i = 0; i <= this.field.height; i++) {
      const y = i * (cellSize + this.vGap) + this.vGap / 2;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.stroke();
  }

  private drawRectangle(rect: Rectangle): void {
    const x = this.cellXToCoords(rect.x);
    const y = this.cellYToCoords(rect.y);
    const width = this.cellWidthToCoords(rect.width);
    const height = this.cellHeightToCoords(rect.height);
    this.ctx.fillStyle = DrawColors[rect.color].fill;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.lineWidth = this.hGap / 2;
    this.ctx.strokeStyle = DrawColors[rect.color].stroke;
    this.ctx.strokeRect(x, y, width, height);
  }

  private cellXToCoords(x: number): number {
    return x * cellSize + this.hGap * (x + 1);
  }
  private cellYToCoords(y: number): number {
    return y * cellSize + this.vGap * (y + 1);
  }
  private cellWidthToCoords(width: number): number {
    return width * cellSize + this.hGap * (width - 1);
  }
  private cellHeightToCoords(height: number): number {
    return height * cellSize + this.vGap * (height - 1);
  }
}