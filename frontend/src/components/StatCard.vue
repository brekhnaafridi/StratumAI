<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  change?: number
  changeLabel?: string
}>()
</script>

<template>
  <div class="glass-elevated rounded-2xl p-6 border border-white/[0.08] relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]">
    <!-- Top shimmer -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">{{ title }}</p>
        <p class="mt-1 text-3xl font-bold text-white font-mono">{{ value }}</p>
        <div v-if="change !== undefined" class="mt-2 flex items-center text-xs">
          <span
            :class="[
              'font-semibold',
              change >= 0 ? 'text-emerald-400' : 'text-rose-400',
            ]"
          >
            {{ change >= 0 ? '+' : '' }}{{ change }}%
          </span>
          <span v-if="changeLabel" class="ml-1 text-gray-500">{{ changeLabel }}</span>
        </div>
      </div>
      <div class="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
        <slot name="icon">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>
