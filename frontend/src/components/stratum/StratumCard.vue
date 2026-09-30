<script setup lang="ts">
withDefaults(
  defineProps<{
    elevated?: boolean
    hoverGlow?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    bordered?: boolean
  }>(),
  {
    elevated: false,
    hoverGlow: false,
    padding: 'md',
    bordered: true,
  }
)
</script>

<template>
  <div
    class="rounded-2xl transition-all duration-300"
    :class="[
      elevated
        ? 'bg-slate-800/40 backdrop-blur-2xl border-white/[0.1] shadow-glass-lg'
        : 'bg-slate-900/45 backdrop-blur-xl border-white/[0.08] shadow-glass',
      bordered ? 'border' : '',
      hoverGlow ? 'glass-card-glow' : '',
      padding === 'none' ? 'p-0' : '',
      padding === 'sm' ? 'p-4' : '',
      padding === 'md' ? 'p-6' : '',
      padding === 'lg' ? 'p-8' : '',
    ]"
    style="
      -webkit-backdrop-filter: blur(24px) saturate(1.6);
      backdrop-filter: blur(24px) saturate(1.6);
    "
  >
    <div v-if="$slots.header" class="mb-4 pb-4 border-b border-white/[0.06] flex items-center justify-between">
      <slot name="header" />
    </div>
    <div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>
