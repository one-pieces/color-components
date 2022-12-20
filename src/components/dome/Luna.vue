<script setup lang="ts">
import { onMounted } from 'vue'
import { useDrawImage } from '@/utils/canvas'
import LunaImg from '@/assets/imgs/luna.png'

const id = 'luna'
const width = 300
const height = 300
onMounted(async () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    await useDrawImage(ctx, LunaImg, 0, 0, width, height)
  }
})
</script>

<template>
  <canvas :id="id" :width="width" :height="height"></canvas>
</template>
