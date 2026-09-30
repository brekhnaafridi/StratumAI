<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'neutral'
    size?: 'sm' | 'md'
    dot?: boolean
    pulse?: boolean
  }>(),
  {
    variant: 'blue',
    size: 'sm',
    dot: false,
    pulse: false,
  }
)
</script>

<template>
  <span
    class="inline-flex items-center font-medium select-none rounded-full tracking-wide backdrop-blur-sm"
    :class="[
      size === 'sm' ? 'px-2.5 py-0.5 text-xs gap-1.5' : 'px-3 py-1 text-sm gap-2',
      variant === 'blue'
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm shadow-blue-500/10'
        : '',
      variant === 'indigo'
        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-500/10'
        : '',
      variant === 'emerald'
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/10'
        : '',
      variant === 'amber'
        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10'
        : '',
      variant === 'rose'
        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-500/10'
        : '',
      variant === 'cyan'
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm shadow-cyan-500/10'
        : '',
      variant === 'neutral'
        ? 'bg-white/[0.04] text-gray-400 border border-white/[0.08]'
        : '',
    ]"
  >
    <span
      v-if="dot"
      class="w-1.5 h-1.5 rounded-full"
      :class="[
        pulse ? 'animate-pulse' : '',
        variant === 'blue' ? 'bg-blue-400' : '',
        variant === 'indigo' ? 'bg-indigo-400' : '',
        variant === 'emerald' ? 'bg-emerald-400' : '',
        variant === 'amber' ? 'bg-amber-400' : '',
        variant === 'rose' ? 'bg-rose-400' : '',
        variant === 'cyan' ? 'bg-cyan-400' : '',
        variant === 'neutral' ? 'bg-gray-400' : '',
      ]"
    />
    <slot />
  </span>
</template>
