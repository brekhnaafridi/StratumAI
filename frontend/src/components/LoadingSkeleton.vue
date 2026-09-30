<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'card' | 'line' | 'table' | 'chart'
    rows?: number
    height?: string
  }>(),
  {
    type: 'line',
    rows: 3,
    height: '16px',
  }
)
</script>

<template>
  <div v-if="type === 'card'" class="glass-elevated rounded-2xl p-6 animate-pulse space-y-4 border border-white/[0.06]">
    <div class="h-3 w-1/3 bg-white/[0.06] rounded-md"></div>
    <div class="h-8 w-1/2 bg-white/[0.08] rounded-lg"></div>
    <div class="h-3 w-2/3 bg-white/[0.04] rounded-md"></div>
  </div>

  <div v-else-if="type === 'chart'" class="glass-elevated rounded-2xl p-6 animate-pulse border border-white/[0.06]" :style="{ height: height || '320px' }">
    <div class="h-4 w-1/4 bg-white/[0.06] rounded-md mb-6"></div>
    <div class="h-3/4 w-full bg-white/[0.03] rounded-xl flex items-end gap-3 p-4">
      <div class="w-full bg-white/[0.07] rounded-t h-1/2"></div>
      <div class="w-full bg-white/[0.07] rounded-t h-3/4"></div>
      <div class="w-full bg-white/[0.07] rounded-t h-2/3"></div>
      <div class="w-full bg-white/[0.07] rounded-t h-4/5"></div>
      <div class="w-full bg-white/[0.07] rounded-t h-1/3"></div>
    </div>
  </div>

  <div v-else-if="type === 'table'" class="glass-elevated rounded-2xl p-4 animate-pulse space-y-3 border border-white/[0.06]">
    <div class="h-8 bg-white/[0.05] rounded-lg"></div>
    <div v-for="r in rows" :key="r" class="h-10 bg-white/[0.03] rounded-md"></div>
  </div>

  <div v-else class="animate-pulse space-y-2">
    <div
      v-for="r in rows"
      :key="r"
      class="bg-white/[0.05] rounded-md"
      :style="{ height: height, width: r === rows ? '70%' : '100%' }"
    ></div>
  </div>
</template>
