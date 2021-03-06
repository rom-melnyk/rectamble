import { Colors } from './colors.enum';

export class Rectangle {
  // cell position
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public color: Colors;
  public isParked: boolean = false;
  public isValidPosition: boolean = false;

  // cell edge
  public get left(): number {
    return this.x;
  }
  public set left(left: number) {
    this.x = left;
  }

  // cell edge
  public get right(): number {
    return this.x + this.width;
  }
  public set right(right: number) {
    this.x = right - this.width;
  }

  // cell edge
  public get top(): number {
    return this.y;
  }
  public set top(top: number) {
    this.y = top;
  }

  // cell edge
  public get bottom(): number {
    return this.y + this.height;
  }
  public set bottom(bottom: number) {
    this.y = bottom - this.height;
  }

  // center coords might be fractional
  public get centerX(): number {
    return (this.left + this.right) / 2;
  }
  public set centerX(c: number) {
    throw new Error('.centerX is readonly');
  }

  // center coords might be fractional
  public get centerY(): number {
    return (this.top + this.bottom) / 2;
  }
  public set centerY(c: number) {
    throw new Error('.centerY is readonly');
  }

  constructor(x: number, y: number, width: number, height: number, color: Colors) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public rotate() {
    const prevCenterX = this.centerX;
    const prevCenterY = this.centerY;
    [ this.width, this.height ] = [ this.height, this.width ];
    const compensateX = Math.trunc(this.centerX - prevCenterX);
    const compensateY = Math.trunc(this.centerY - prevCenterY);
    this.x -= compensateX;
    this.y -= compensateY;
  }

  public intersects(rect: Rectangle): boolean {
    const dCenterX = Math.abs(this.centerX - rect.centerX);
    const dCenterY = Math.abs(this.centerY - rect.centerY);
    return dCenterX < (this.width + rect.width) / 2
      && dCenterY < (this.height + rect.height) / 2;
  }

  public touches(rect: Rectangle): boolean {
    const sideRects = [
      new Rectangle(this.left, this.top - 1, this.width, 1, this.color), // top
      new Rectangle(this.left, this.bottom, this.width, 1, this.color), // bottom
      new Rectangle(this.left - 1, this.top, 1, this.height, this.color), // left
      new Rectangle(this.right, this.top, 1, this.height, this.color), // right
    ];

    return sideRects.some(sideRect => sideRect.intersects(rect));
  }
}
