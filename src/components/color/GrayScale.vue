<script setup lang="ts">
import { onMounted } from 'vue'
import { useDrawImage, useGrayScale } from '@/utils/canvas'
import GoogleImg from '@/assets/imgs/google.png'

const id = 'grayScale'
const width = 300
const height = 300
onMounted(async () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    await useDrawImage(ctx, GoogleImg, 0, 0, width, height)
    useGrayScale(ctx, width, height)
  }
})
</script>

<template>
  <canvas :id="id" :width="width" :height="height"></canvas>
</template>
