<script setup lang="ts">
interface Props {
  variant?:
    | 'primary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'
    | 'low'
    | 'medium'
    | 'high'
    | 'critical'
    | 'active'
    | 'terminated'
    | 'on_leave'
  size?: 'sm' | 'md'
  label?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  label: '',
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider select-none backdrop-blur-sm border',
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
      (variant === 'primary') && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      (variant === 'accent') && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      (variant === 'success' || variant === 'low' || variant === 'active') && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      (variant === 'warning' || variant === 'medium') && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      (variant === 'danger' || variant === 'critical' || variant === 'terminated' || variant === 'high') && 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      (variant === 'on_leave' || variant === 'info') && 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      (variant === 'neutral') && 'bg-white/[0.04] text-gray-400 border-white/[0.08]',
    ]"
  >
    <span
      :class="[
        'rounded-full flex-shrink-0',
        size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
        variant === 'primary' && 'bg-blue-400',
        variant === 'accent' && 'bg-amber-400',
        (variant === 'success' || variant === 'low' || variant === 'active') && 'bg-emerald-400',
        (variant === 'warning' || variant === 'medium') && 'bg-amber-400',
        (variant === 'danger' || variant === 'critical' || variant === 'terminated' || variant === 'high') && 'bg-rose-400',
        (variant === 'on_leave' || variant === 'info') && 'bg-blue-400',
        variant === 'neutral' && 'bg-gray-500',
      ]"
    />
    <slot>{{ label }}</slot>
  </span>
</template>
