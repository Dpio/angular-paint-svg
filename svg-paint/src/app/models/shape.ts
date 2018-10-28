import { v4 as uuid } from 'uuid';

export class Shape {
    public style: any;
    public selfId: string;

    constructor(public x: number, y: number, public id: string) {
        this.style = { 'fill': 'yellow', 'stroke': 'black', 'stroke-width': '5' };
        this.selfId = uuid();
    }
}

export class Rect extends Shape {
    // tslint:disable-next-line:max-line-length
    constructor(public x: number, public y: number, public width: number, public height: number, public id: string, public rx?: number, public ry?: number) {
        super(x, y, id);
    }
}

export class Circle extends Shape {
    constructor(public x: number, public y: number, public r: number, public id: string) {
        super(x, y, id);
    }
}

export class Ellipse extends Shape {
    constructor(public x: number, public y: number, public rx: number, public ry: number, public id: string) {
        super(x, y, id);
    }
}

export class Line extends Shape {
    constructor(public x1: number, public y1: number, public x2: number, public y2: number, public id: string) {
        super(x1, y1, id);
    }
}

export class Path extends Shape {
    constructor(public d: string, public id: string) {
        super(0, 0, id);
    }
}

export class Text extends Shape {
    constructor(public x: number, public y: number, public text: string, public id: string) {
        super(x, y, id);
    }
}
