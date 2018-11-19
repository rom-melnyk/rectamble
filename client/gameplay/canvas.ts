import { Field } from '../objects/field';
import { Rectangle } from '../objects/rectangle';
import { DrawColors } from '../objects/colors.enum';

export class Canvas {
  private width: number = 0;
  private height: number = 0;
  private ctx: CanvasRenderingContext2D;
  private element: HTMLCanvasElement;
  private field: Field;
  private cellSize = 20; // px; this is temporary until set up field/canvas size properly
  private hGap: number = 2;
  private vGap: number = 2;

  constructor(canvasEl: HTMLCanvasElement, field: Field) {
    this.element = canvasEl;
    this.field = field;
    // const { scrollWidth: width, scrollHeight: height, } = canvasEl;
    const width = field.width * this.cellSize + (field.width + 1) * (this.hGap);
    const height = field.height * this.cellSize + (field.height + 1) * (this.vGap);
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

  public coordsXToCell(x: number): number {
    // opposite to cellXToCoords(): x * this.cellSize + this.hGap * (x + 1);
    return Math.trunc((x - this.hGap) / (this.cellSize + this.hGap));
  }

  public coordsYToCell(y: number): number {
    // opposite to cellYToCoords(): y * this.cellSize + this.vGap * (y + 1);
    return Math.trunc((y - this.vGap) / (this.cellSize + this.vGap));
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private drawGrid(): void {
    this.ctx.beginPath();
    for (let i = 0; i <= this.field.width; i++) {
      const x = i * (this.cellSize + this.hGap) + this.hGap / 2;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
    }
    for (let i = 0; i <= this.field.height; i++) {
      const y = i * (this.cellSize + this.vGap) + this.vGap / 2;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([]);
    this.ctx.strokeStyle = 'hsla(240, 50%, 80%, .3)';
    this.ctx.stroke();
  }

  private drawRectangle(rect: Rectangle): void {
    const x = this.cellXToCoords(rect.x);
    const y = this.cellYToCoords(rect.y);
    const width = this.cellWidthToCoords(rect.width);
    const height = this.cellHeightToCoords(rect.height);
    const { fill, stroke } = this.getStyle(rect);
    this.ctx.fillStyle = fill;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.lineWidth = this.hGap / 2;
    this.ctx.setLineDash(rect.isValidPosition ? [] : [ this.hGap * 2 ]);
    this.ctx.strokeStyle = stroke;
    this.ctx.strokeRect(x, y, width, height);
  }

  private cellXToCoords(x: number): number {
    return x * this.cellSize + this.hGap * (x + 1);
  }
  private cellYToCoords(y: number): number {
    return y * this.cellSize + this.vGap * (y + 1);
  }
  private cellWidthToCoords(width: number): number {
    return width * this.cellSize + this.hGap * (width - 1);
  }
  private cellHeightToCoords(height: number): number {
    return height * this.cellSize + this.vGap * (height - 1);
  }

  private getStyle(rect: Rectangle): { fill: string, stroke: string } {
    const rectStyles = DrawColors[rect.color];
    return rect.isParked
      ? rectStyles.parked
      : (rect.isValidPosition
        ? rectStyles.validPosition
        : rectStyles.invalidPosition
      );
  }
}