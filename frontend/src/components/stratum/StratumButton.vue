<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'indigo'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    block?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    block: false,
    type: 'button',
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] overflow-hidden"
    :class="[
      block ? 'w-full' : '',
      // Sizes
      size === 'sm' ? 'px-3 py-1.5 text-xs rounded-lg gap-1.5' : '',
      size === 'md' ? 'px-4 py-2 text-sm rounded-xl gap-2' : '',
      size === 'lg' ? 'px-5 py-2.5 text-base rounded-xl gap-2.5 font-semibold' : '',
      // Variants
      variant === 'primary'
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-indigo-500 focus:ring-blue-500 border border-white/10'
        : '',
      variant === 'indigo'
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-purple-500 focus:ring-indigo-500 border border-white/10'
        : '',
      variant === 'secondary'
        ? 'bg-white/[0.05] backdrop-blur-md text-gray-200 hover:bg-white/[0.09] hover:text-white border border-white/[0.1] focus:ring-gray-400'
        : '',
      variant === 'outline'
        ? 'bg-transparent backdrop-blur-sm text-gray-300 hover:bg-white/[0.06] border border-white/[0.15] hover:border-white/30 focus:ring-blue-400'
        : '',
      variant === 'ghost'
        ? 'bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.07] focus:ring-gray-500'
        : '',
      variant === 'danger'
        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/20 hover:from-rose-500 hover:to-red-500 focus:ring-rose-500 border border-white/10'
        : '',
      variant === 'success'
        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 focus:ring-emerald-500 border border-white/10'
        : '',
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Inset highlight shimmer for glass buttons -->
    <span
      v-if="variant === 'secondary' || variant === 'outline'"
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none"
    />
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>
