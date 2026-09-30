<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    title?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  }>(),
  {
    isOpen: false,
    maxWidth: 'md',
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop blur -->
        <div
          class="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          @click="$emit('close')"
        />

        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="isOpen"
              class="relative transform overflow-hidden rounded-2xl glass-heavy border border-white/[0.1] p-6 text-left shadow-glass-lg transition-all w-full my-8"
              :class="[
                maxWidth === 'sm' ? 'sm:max-w-sm' : '',
                maxWidth === 'md' ? 'sm:max-w-md' : '',
                maxWidth === 'lg' ? 'sm:max-w-lg' : '',
                maxWidth === 'xl' ? 'sm:max-w-xl' : '',
                maxWidth === '2xl' ? 'sm:max-w-2xl' : '',
              ]"
            >
              <!-- Inset top shimmer -->
              <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />

              <!-- Header -->
              <div v-if="title || $slots.header" class="flex items-center justify-between pb-4 border-b border-white/[0.07] mb-4">
                <slot name="header">
                  <h3 class="text-lg font-bold text-white tracking-tight">
                    {{ title }}
                  </h3>
                </slot>
                <button
                  type="button"
                  class="rounded-lg p-1 text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="text-sm text-gray-300">
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-end gap-3">
                <slot name="footer" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
