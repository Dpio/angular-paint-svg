import { Component } from '@angular/core';
import { Shape, Circle, Line, Text } from './models/shape';
import { ControlMode } from './models/control-mode';
import { LineSegment } from './models/line-segment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'svg-paint';
  public shapes: Array<Shape>;
  public measurementLines: Array<LineSegment>;
  public width: string;
  public height: string;
  clientX = 0;
  clientY = 0;
  private isFirstClick = false;
  private isCreatingMesutrement = false;
  private currentMesurement: LineSegment;
  private mode = ControlMode.Draw;
  private selectedMeasurementLineToMove: LineSegment;

  constructor() {
    const paper = this;
    paper.width = '1280px';
    paper.height = '800px';

    paper.shapes = new Array<Shape>();
    paper.measurementLines = new Array<LineSegment>();
  }

  buttonMoveMode() {
    if (this.mode !== ControlMode.Move) {
      this.mode = ControlMode.Move;
      return;
    }
    this.mode = ControlMode.Draw;
  }

  setCircleLocation(event) {
    if (this.mode === ControlMode.Draw) {
      if (this.isCreatingMesutrement === false) {
        this.isCreatingMesutrement = true;
        this.currentMesurement = new LineSegment();
      }
      if (this.isFirstClick) {
        const newLine = new Line(this.clientX, this.clientY, event.offsetX, event.offsetY, this.currentMesurement.id);
        newLine.style.fill = 'white';
        newLine.style.stroke = 'black';
        this.shapes.push(newLine);

        const circle = new Circle(event.offsetX, event.offsetY, 4, this.currentMesurement.id);
        circle.style.fill = 'white';
        circle.style.stroke = 'black';
        circle.style['stroke-width'] = '1';
        this.shapes.push(circle);

        const textX = (event.offsetX + this.clientX) / 2;
        const textY = (event.offsetY + this.clientY) / 2;
        const text = new Text(textX, textY, 'Name-' + Math.round(10 * Math.random()), this.currentMesurement.id);
        text.style.stroke = 'black';
        text.style.fill = 'black';
        text.style['stroke-width'] = '1';
        this.shapes.push(text);

        this.currentMesurement.secondPoint = circle;
        this.currentMesurement.line = newLine;
        this.currentMesurement.text = text;
        this.measurementLines.push(this.currentMesurement);
        this.isCreatingMesutrement = false;
        this.currentMesurement = null;
        this.isFirstClick = false;
      } else {
        this.isFirstClick = true;
        this.clientX = event.offsetX;
        this.clientY = event.offsetY;

        const circle = new Circle(event.offsetX, event.offsetY, 4, this.currentMesurement.id);
        circle.style.fill = 'white';
        circle.style.stroke = 'black';
        circle.style['stroke-width'] = '1';
        this.shapes.push(circle);
        this.currentMesurement.firstPoint = circle;
      }
    } else if (this.mode === ControlMode.Move) {
      const precision = 5;
      this.measurementLines.forEach(element => {
        if (this.isClickInCircleWithPrecision(element.firstPoint, precision, event.offsetX, event.offsetY)) {
          this.selectedMeasurementLineToMove = element;
          element.firstPoint.style.fill = 'blue';
          element.isFirstSelected = true;
          this.mode = ControlMode.Drag;
        } else if (this.isClickInCircleWithPrecision(element.secondPoint, precision, event.offsetX, event.offsetY)) {
          this.selectedMeasurementLineToMove = element;
          element.secondPoint.style.fill = 'blue';
          element.isSecondSelected = true;
          this.mode = ControlMode.Drag;
        }
      });
    } else if (this.mode === ControlMode.Drag) {
      this.mode = ControlMode.Move;
      const line = this.selectedMeasurementLineToMove;
      if (line.isFirstSelected) {
        line.firstPoint.style.fill = 'white';
        line.isFirstSelected = false;
      }
      if (line.isSecondSelected) {
        line.secondPoint.style.fill = 'white';
        line.isSecondSelected = false;
      }
      line.text.text = 'Name-' + Math.round(10 * Math.random());
    }
  }

  mouseMove(event) {
    if (this.mode === ControlMode.Drag) {
      const line = this.selectedMeasurementLineToMove;
      if (line.isFirstSelected) {
        line.firstPoint.x = event.offsetX;
        line.firstPoint.y = event.offsetY;
        line.line.x1 = event.offsetX;
        line.line.y1 = event.offsetY;
      }
      if (line.isSecondSelected) {
        line.secondPoint.x = event.offsetX;
        line.secondPoint.y = event.offsetY;
        line.line.x2 = event.offsetX;
        line.line.y2 = event.offsetY;
      }

      const textX = (line.firstPoint.x + line.secondPoint.x) / 2;
      const textY = (line.firstPoint.y + line.secondPoint.y) / 2;
      line.text.x = textX;
      line.text.y = textY;
    }
  }

  private isClickInCircleWithPrecision(point: Circle, precision: number, eventX: number, eventY: number) {
    return point.x + precision >= eventX && point.x - precision <= eventX
      && point.y + precision >= eventY && point.y - precision <= eventY;
  }
}
