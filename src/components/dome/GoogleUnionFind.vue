<script setup lang="ts">
import { onMounted } from 'vue'
import {
  useDrawImage,
  useMultiLevelImg,
  useUnionFind,
  useColor,
} from '@/utils/canvas'
import GoogleImg from '@/assets/imgs/google.png'

const id = 'googleUnionFind'
const width = 300
const height = 300
const level = 10
onMounted(async () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    await useDrawImage(ctx, GoogleImg, 0, 0, width, height)
    useMultiLevelImg(ctx, width, height, level)
    const uf = useUnionFind(ctx, width, height)
    useColor(ctx, uf, width, height)
  }
})
</script>

<template>
  <canvas :id="id" :width="500" :height="500"></canvas>
</template>
