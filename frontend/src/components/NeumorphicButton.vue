<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'accent' | 'danger' | 'ghost' | 'inset'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'relative inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden',
      size === 'sm' && 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
      size === 'md' && 'px-4 py-2 text-xs rounded-xl gap-2',
      size === 'lg' && 'px-6 py-2.5 text-sm rounded-xl gap-2.5',
      variant === 'default' && 'bg-white/[0.05] backdrop-blur-md text-gray-200 hover:bg-white/[0.09] hover:text-white border border-white/[0.1] active:scale-[0.98]',
      variant === 'primary' && 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 border border-white/10 active:scale-[0.98]',
      variant === 'accent' && 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 border border-white/10 active:scale-[0.98]',
      variant === 'danger' && 'bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-500 active:scale-[0.98]',
      variant === 'ghost' && 'bg-transparent hover:bg-white/[0.06] text-gray-400 hover:text-white',
      variant === 'inset' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/15',
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Inset shimmer for glass variants -->
    <span
      v-if="variant === 'default' || variant === 'inset'"
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none"
    />
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>
