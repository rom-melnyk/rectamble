import { Colors } from './colors.enum';
import { Rectangle } from './rectangle';

export class Cell {
  public x: number = 0;
  public y: number = 0;
  public color: Colors | null = null;

  constructor(x: number, y: number, color: Colors | null) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}


export class Field {
  public width: number = 0;
  public height: number = 0;
  private cells: Cell[][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.cells = Array(this.height).fill(null)
      .map((_, row) => {
        return Array(this.width).fill(null)
          .map((_, column) => new Cell(row, column, null))
      });
  }

  public cellByXY(x: number, y: number): Cell {
    return this.cells[y][x] || null;
  }

  public forEachCell(cb: (cell: Cell) => void): void {
    this.cells.forEach((row: Cell[]) => {
      row.forEach((cell: Cell) => {
        cb(cell);
      })
    })
  }

  public fitRectangle(rect: Rectangle) {
    if (rect.left < 0) {
      rect.x = 0;
    }
    if (rect.left < 0) {
      rect.y = 0;
    }
    if (rect.right > this.width) {
      rect.right = this.width;
    }
    if (rect.bottom > this.height) {
      rect.bottom = this.height;
    }
  }
}
