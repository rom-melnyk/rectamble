import { Colors } from './colors.enum';

export class Rectangle {
  // cell position
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public color: Colors;

  // cell edge
  public get left(): number {
    return this.x;
  }
  public set left(l: number) {
    throw new Error('.left is readonly');
  }

  // cell edge
  public get right(): number {
    return this.x + this.width;
  }
  public set right(r: number) {
    throw new Error('.right is readonly');
  }

  // cell edge
  public get top(): number {
    return this.y;
  }
  public set top(t: number) {
    throw new Error('.top is readonly');
  }

  // cell edge
  public get bottom(): number {
    return this.y + this.height;
  }
  public set bottom(b: number) {
    throw new Error('.bottom is readonly');
  }

  constructor(x: number, y: number, width: number, height: number, color: Colors) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public rotate() {
    [ this.width, this.height ] = [ this.height, this.width ];
  }

  public forEachXYAround(cb: (x: number, y: number) => void): void {
    const coords: Array<{ x: number, y: number }> = [
      ...Array(this.width).fill(null)
        .map((_, x) => ({ x: this.x + x, y: this.top - 1 })),
      ...Array(this.width).fill(null)
        .map((_, x) => ({ x: this.x + x, y: this.bottom + 1 })),
      ...Array(this.height).fill(null)
        .map((_, y) => ({ x: this.left - 1, y: this.y + y })),
      ...Array(this.height).fill(null)
        .map((_, y) => ({ x: this.right + 1, y: this.y + y })),
    ];

    coords.forEach(({ x, y }) => {
      cb(x, y);
    });
  }
}
