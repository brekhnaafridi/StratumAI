<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Everything looks normal',
    description: 'No items or alerts require your attention at this time.',
  }
)
</script>

<template>
  <div class="glass-elevated rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-white/[0.08]">
    <div class="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 border border-blue-500/20 backdrop-blur-sm">
      <slot name="icon">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M5 13l4 4L19 7" />
        </svg>
      </slot>
    </div>
    <h3 class="text-base font-bold text-white tracking-tight mb-1">
      {{ title }}
    </h3>
    <p class="text-xs text-gray-400 max-w-sm">
      {{ description }}
    </p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
