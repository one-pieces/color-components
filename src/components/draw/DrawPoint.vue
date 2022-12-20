<script setup lang="ts">
import { onMounted } from 'vue'
import { useDrawPoint } from '@/utils/canvas'

const id = 'point'
onMounted(() => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    useDrawPoint(ctx, { x: 100, y: 100, n: '(100, 100)' })
  }
})
</script>

<template>
  <canvas :id="id" width="300" height="300"></canvas>
</template>
