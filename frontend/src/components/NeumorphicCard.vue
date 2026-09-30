<script setup lang="ts">
interface Props {
  elevation?: 'flat' | 'sm' | 'lg' | 'inset'
  hoverable?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  elevation: 'flat',
  hoverable: false,
  className: '',
})
</script>

<template>
  <div
    :class="[
      'rounded-2xl transition-all duration-300',
      elevation === 'flat' && 'glass-elevated',
      elevation === 'sm' && 'glass-elevated shadow-glass-sm',
      elevation === 'lg' && 'glass-elevated shadow-glass-lg',
      elevation === 'inset' && 'glass-input p-5',
      hoverable && 'glass-card-glow hover:-translate-y-0.5',
      className,
    ]"
  >
    <slot />
  </div>
</template>
