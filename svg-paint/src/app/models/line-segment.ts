import { Circle, Line, Text } from './shape';
import { v4 as uuid } from 'uuid';

export class LineSegment {
  public id: string;
  public firstPoint: Circle;
  public secondPoint: Circle;
  public line: Line;
  public text: Text;
  public isFirstSelected = false;
  public isSecondSelected = false;

  constructor() {
    this.id = uuid();
  }
}
