<script setup lang="ts">
import { onMounted } from 'vue'
import {
  useDrawImage,
  useMultiLevelImg,
  useUnionFind,
  useColor,
} from '@/utils/canvas'
import LunaImg from '@/assets/imgs/luna.png'

const id = 'lunaUnionFind'
const width = 300
const height = 300
const level = 10
onMounted(async () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    await useDrawImage(ctx, LunaImg, 0, 0, width, height)
    useMultiLevelImg(ctx, width, height, level)
    const uf = useUnionFind(ctx, width, height)
    useColor(ctx, uf, width, height, 2000)
  }
})
</script>

<template>
  <canvas :id="id" :width="500" :height="500"></canvas>
</template>
