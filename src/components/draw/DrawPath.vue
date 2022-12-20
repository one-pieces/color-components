<script setup lang="ts">
import { onMounted } from 'vue'
import { useDrawPath } from '@/utils/canvas'
import { Hull, Point } from '@/utils/convex/class'
import { getConvexHull } from '@/utils/convex/index'

const id = 'path'
onMounted(() => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const points = getConvexHull([
      new Point(100, 100),
      new Point(100, 200),
      new Point(150, 50),
      new Point(150, 150),
      new Point(50, 150),
      new Point(50, 50),
      new Point(200, 200),
      new Point(200, 100),
    ])
    const hull = new Hull(points)
    useDrawPath(ctx, hull)
  }
})
</script>

<template>
  <canvas :id="id" width="300" height="300"></canvas>
</template>
