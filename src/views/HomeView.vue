<script setup lang="ts">
import DrawPoint from '@/components/draw/DrawPoint.vue'
import DrawPath from '@/components/draw/DrawPath.vue'
import DrawImg from '@/components/draw/DrawImg.vue'
import GrayScale from '@/components/color/GrayScale.vue'
import MultiLevel from '@/components/color/MultiLevel.vue'
import Luna from '@/components/dome/Luna.vue'
import MultiLevelLuna from '@/components/dome/MultiLevelLuna.vue'
import GoggleUnionFind from '@/components/dome/GoogleUnionFind.vue'
import LunaUnionFind from '@/components/dome/LunaUnionFind.vue'
</script>

<template>
  <div class="canvas-draw">
    <div class="item">
      <DrawPoint />
    </div>
    <div class="item">
      <DrawPath />
    </div>
    <div class="item">
      <DrawImg />
    </div>
  </div>
  <div class="canvas-color">
    <div class="item">
      <GrayScale />
    </div>
    <div class="item">
      <MultiLevel />
    </div>
    <div class="item">
      <GoggleUnionFind />
    </div>
  </div>
  <div class="canvas-dome">
    <div class="item">
      <Luna />
    </div>
    <div class="item">
      <MultiLevelLuna />
    </div>
    <div class="item">
      <LunaUnionFind />
    </div>
  </div>
</template>

<style>
.canvas-draw,
.canvas-color,
.canvas-dome {
  display: flex;
}
.item {
  margin-right: 20px;
}
</style>
