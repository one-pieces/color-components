import { WQuickUnionUFWithPath } from '../union-find/path-compression'
import { useConvexHull } from '../convex'
import { useDrawPath, useDrawPoint } from './draw'

export function useGrayScale(
  ctx: CanvasRenderingContext2D,
  width = 100,
  height = 100
) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    data[i] = avg // red
    data[i + 1] = avg // green
    data[i + 2] = avg // blue
  }
  ctx.putImageData(imageData, 0, 0)
}

export function useMultiLevelImg(
  ctx: CanvasRenderingContext2D,
  width = 100,
  height = 100,
  level = 4
) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const MAX_NUMBER = 256
  const threshold = Math.ceil(MAX_NUMBER / level)
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    const kind = Math.floor(avg / threshold)
    const value = kind * threshold
    data[i] = value // red
    data[i + 1] = value // green
    data[i + 2] = value // blue
  }
  ctx.putImageData(imageData, 0, 0)
}

function isSameColor(a: number, b: number, threshold = 0) {
  return Math.abs(a - b) <= threshold
}

export function useUF(
  data: Uint8ClampedArray | number[],
  row: number,
  channel: number
) {
  const uf = new WQuickUnionUFWithPath(data.length)
  for (let i = 0; i < data.length; i += channel) {
    // 从正上方开始，顺时针遍历周围像素色值，如果相同，则认为是同一个区域
    const top = i - row
    if (top >= 0) {
      if (isSameColor(data[top], data[i])) {
        uf.union(top, i)
      }
      const topLeft = top - channel
      if (i % row > 0 && isSameColor(data[topLeft], data[i])) {
        uf.union(topLeft, i)
      }
      const topRight = top + channel
      if (i % row < row - channel && isSameColor(data[topRight], data[i])) {
        uf.union(topRight, i)
      }
    }
    // 中间
    const left = i - channel
    if (i % row > 0 && isSameColor(data[left], data[i])) {
      uf.union(left, i)
    }
    const right = i + channel
    if (i % row < row - channel && isSameColor(data[right], data[i])) {
      uf.union(right, i)
    }
    // 正下方
    const bottom = i + row
    if (bottom < data.length) {
      if (isSameColor(data[bottom], data[i])) {
        uf.union(bottom, i)
      }
      const bottomLeft = bottom - channel
      if (i % row > 0 && isSameColor(data[bottomLeft], data[i])) {
        uf.union(bottomLeft, i)
      }
      const bottomRight = bottomLeft + channel
      if (i % row < row - channel && isSameColor(data[bottomRight], data[i])) {
        uf.union(bottomRight, i)
      }
    }
  }
  return uf
}

export function useUnionFind(
  ctx: CanvasRenderingContext2D,
  width = 100,
  height = 100
) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const channel = 4
  const row = width * channel
  return useUF(data, row, channel)
}

function randomColor(components: Map<number, number[]>) {
  const result = new Map()
  components.forEach((value, key) => {
    result.set(key, {
      red: Math.ceil(Math.random() * 255),
      green: Math.ceil(Math.random() * 255),
      blue: Math.ceil(Math.random() * 255),
    })
  })
  return result
}

export function useColor(
  ctx: CanvasRenderingContext2D,
  uf: WQuickUnionUFWithPath,
  width = 100,
  height = 100,
  threshold = 100
) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  const components = uf.getComponent(threshold)
  const colors = randomColor(components)
  console.log('=======image', colors, components)

  for (let i = 0; i < data.length; i += 4) {
    const root = uf.root(i)
    const component = components.get(root)
    if (component) {
      const color = colors.get(root)
      data[i] = color.red // red
      data[i + 1] = color.green // green
      data[i + 2] = color.blue // blue
    } else {
      data[i] = 0 // red
      data[i + 1] = 0 // green
      data[i + 2] = 0 // blue
    }
  }
  ctx.putImageData(imageData, 0, 0)
  let count = 1
  components.forEach((component, key) => {
    // const _key = 4
    // const _key = 97424
    // const _key = 142032
    // const _key = 142360
    // if (key === _key) {
    const hull = useConvexHull(component, width)
    const color = colors.get(key)
    useDrawPoint(ctx, {
      x: 400,
      y: 30 * count++,
      n: `${key}`,
      radius: 10,
      color: `rgb(${color.red}, ${color.green}, ${color.blue})`,
    })
    useDrawPath(ctx, hull)
    // }
  })
  return components
}
