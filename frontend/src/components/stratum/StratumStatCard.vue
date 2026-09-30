<script setup lang="ts">
import StratumCard from './StratumCard.vue'

withDefaults(
  defineProps<{
    title: string
    value: string | number
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    caption?: string
    iconBg?: string
  }>(),
  {
    changeType: 'neutral',
    iconBg: 'from-blue-600/20 to-indigo-600/20 text-blue-400 border-blue-500/30',
  }
)
</script>

<template>
  <StratumCard hover-glow class="relative overflow-hidden group p-6">
    <!-- Subtle background gradient aura -->
    <div
      class="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:opacity-80"
      :class="iconBg.includes('blue') ? 'bg-blue-500/8 group-hover:bg-indigo-500/12' :
              iconBg.includes('emerald') ? 'bg-emerald-500/8 group-hover:bg-emerald-500/12' :
              iconBg.includes('amber') ? 'bg-amber-500/8 group-hover:bg-amber-500/12' :
              iconBg.includes('rose') ? 'bg-rose-500/8 group-hover:bg-rose-500/12' : 'bg-blue-500/8'"
    />

    <!-- Inset top shimmer line -->
    <div class="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

    <div class="flex items-start justify-between">
      <div class="space-y-1">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {{ title }}
        </p>
        <div class="flex items-baseline gap-2">
          <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
            {{ value }}
          </span>
          <span
            v-if="change"
            class="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 border backdrop-blur-sm"
            :class="[
              changeType === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : '',
              changeType === 'negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : '',
              changeType === 'neutral' ? 'bg-white/[0.05] text-gray-400 border-white/[0.08]' : '',
            ]"
          >
            <span v-if="changeType === 'positive'">↑</span>
            <span v-else-if="changeType === 'negative'">↓</span>
            {{ change }}
          </span>
        </div>
        <p v-if="caption" class="text-xs text-gray-500">
          {{ caption }}
        </p>
      </div>

      <div
        class="w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg backdrop-blur-sm"
        :class="iconBg"
      >
        <slot name="icon">
          <svg class="w-5 h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </slot>
      </div>
    </div>
  </StratumCard>
</template>
