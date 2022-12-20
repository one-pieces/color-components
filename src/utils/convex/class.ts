export class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  minus(point: Point) {
    return new Point(this.x - point.x, this.y - point.y)
  }
  cross(point: Point) {
    return this.x * point.y - point.x * this.y
  }
}

export class Hull {
  stack: Point[] = []
  constructor(stack: Point[]) {
    this.stack = stack
  }
  pop(): Point {
    return this.stack.pop() || new Point(0, 0)
  }
  isEmpty(): boolean {
    return !this.stack.length
  }
}
