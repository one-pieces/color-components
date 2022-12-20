import { Point, Hull } from './class'

export function transformPoint(
  component: number[],
  width: number,
  channel = 4
) {
  return component.map((value) => {
    const pixel = Math.floor(value / channel)
    return new Point(pixel % width, Math.floor(pixel / width))
  })
}

export function getConvexHull(points: Point[]) {
  points.sort((a, b) => {
    if (a.x !== b.x) {
      return a.x - b.x
    }
    return a.y - b.y
  })

  const n = points.length
  const convex = []
  let total = 0

  for (let i = 0; i < n; i++) {
    while (
      total > 1 &&
      points[convex[total - 1]]
        .minus(points[convex[total - 2]])
        .cross(points[i].minus(points[convex[total - 1]])) <= 0
    ) {
      total--
    }
    convex[total++] = i
  }

  const temp = total
  for (let i = n - 2; i >= 0; i--) {
    while (
      total > temp &&
      points[convex[total - 1]]
        .minus(points[convex[total - 2]])
        .cross(points[i].minus(points[convex[total - 1]])) <= 0
    ) {
      total--
    }
    convex[total++] = i
  }
  // console.log(
  //   '=========getConvexHull',
  //   convex.map((i) => points[i])
  // )
  return convex.map((i) => points[i])
}

export function useConvexHull(component: number[], width: number) {
  const points = transformPoint(component, width)
  const hull = getConvexHull(points)
  return new Hull(hull)
}
