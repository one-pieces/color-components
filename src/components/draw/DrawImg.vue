<script setup lang="ts">
import { onMounted } from 'vue'
import { useDrawImage } from '@/utils/canvas'
import GoogleImg from '@/assets/imgs/google.png'

const id = 'img'
onMounted(() => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx) {
    useDrawImage(ctx, GoogleImg, 0, 0, 300, 300)
  }
})
</script>

<template>
  <canvas :id="id" width="300" height="300"></canvas>
</template>
