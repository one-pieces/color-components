import type { Hull } from '../convex/class'

export function useDrawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  x = 0,
  y = 0,
  width = 400,
  height = 400
) {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = src
  return new Promise((resolve) => {
    img.onload = function () {
      ctx.drawImage(img, x, y, width, height)
      resolve(img)
    }
  })
}

export function useDrawPoint(
  ctx: CanvasRenderingContext2D,
  p: { x: number; y: number; n: string; radius?: number; color?: string },
  isDrawText = true
) {
  const circle = new Path2D()
  const radius = p.radius || 1
  circle.arc(p.x, p.y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = p.color || 'red'
  if (isDrawText) {
    ctx.fillText(p.n, p.x + radius + 5, p.y + radius / 2)
  }
  ctx.fill(circle)
}

export function useDrawPath(ctx: CanvasRenderingContext2D, hull: Hull) {
  const path = new Path2D()
  const p0 = hull.pop()
  path.moveTo(p0.x, p0.y)
  while (!hull.isEmpty()) {
    const p = hull.pop()
    path.lineTo(p.x, p.y)
  }
  path.lineTo(p0.x, p0.y)
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2
  ctx.stroke(path)
}
