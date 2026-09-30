<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import TopHeader from '@/components/TopHeader.vue'
import CommandPalette from '@/components/CommandPalette.vue'

const route = useRoute()
const showPalette = ref(false)

const showLayout = computed(() => route.name !== 'login' && route.name !== 'welcome')

function handleKeyDown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    showPalette.value = !showPalette.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="relative flex min-h-screen bg-stratum-base text-white antialiased">
    <!-- Animated Gradient Mesh Background -->
    <div class="glass-mesh-bg" aria-hidden="true">
      <div class="glass-mesh-orb"></div>
    </div>

    <!-- Grain Noise Overlay -->
    <div class="fixed inset-0 z-[1] pointer-events-none opacity-[0.025]" aria-hidden="true"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E'); background-repeat: repeat; background-size: 128px;"
    />

    <SidebarNav v-if="showLayout" />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden relative z-[2]">
      <TopHeader v-if="showLayout" @open-command-palette="showPalette = true" />
      <main class="flex-1 overflow-y-auto" :class="showLayout ? 'p-6 lg:p-8' : ''">
        <router-view :key="$route.fullPath" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Global Command Palette (Ctrl+K) -->
    <CommandPalette :isOpen="showPalette" @close="showPalette = false" />
  </div>
</template>
