import { Rectangle } from '../objects/rectangle';
import { Colors } from '../objects/colors.enum';

export class Player {
  public readonly name: string;
  public readonly color: Colors;
  public readonly rectangles: Rectangle[] = [];

  constructor(name: string, color: Colors) {
    this.name = name;
    this.color = color;
  }
}
