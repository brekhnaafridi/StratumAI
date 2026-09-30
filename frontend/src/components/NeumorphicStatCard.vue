<script setup lang="ts">
import NeumorphicCard from './NeumorphicCard.vue'

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  caption?: string
  subtitle?: string
  trend?: string
  badgeText?: string
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  iconBg?: string
}

withDefaults(defineProps<Props>(), {
  change: '',
  changeType: 'neutral',
  caption: '',
  subtitle: '',
  trend: '',
  badgeText: '',
  badgeVariant: 'neutral',
})
</script>

<template>
  <NeumorphicCard elevation="flat" class="p-5 flex flex-col justify-between relative overflow-hidden group">
    <!-- Shimmer top line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {{ title }}
      </span>
      <div
        v-if="$slots.icon"
        class="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 backdrop-blur-sm"
      >
        <slot name="icon" />
      </div>
      <span
        v-else-if="badgeText"
        class="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full backdrop-blur-sm border"
        :class="[
          badgeVariant === 'primary' && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          badgeVariant === 'success' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          badgeVariant === 'warning' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          badgeVariant === 'danger' && 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          badgeVariant === 'neutral' && 'bg-white/[0.05] text-gray-400 border-white/[0.08]',
        ]"
      >
        {{ badgeText }}
      </span>
    </div>

    <div class="mt-2">
      <div class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
        {{ value }}
      </div>
      <div v-if="change || trend || caption || subtitle" class="flex items-center gap-1.5 mt-2">
        <span
          v-if="change"
          class="text-xs font-semibold flex items-center gap-1"
          :class="[
            changeType === 'positive' && 'text-emerald-400',
            changeType === 'negative' && 'text-rose-400',
            changeType === 'neutral' && 'text-gray-500',
          ]"
        >
          <svg
            v-if="changeType === 'positive'"
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <svg
            v-else-if="changeType === 'negative'"
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {{ change }}
        </span>

        <span v-if="trend && !change" class="text-xs font-medium text-emerald-400">
          {{ trend }}
        </span>

        <span v-if="caption || subtitle" class="text-xs text-gray-500">
          {{ caption || subtitle }}
        </span>
      </div>
    </div>
  </NeumorphicCard>
</template>
