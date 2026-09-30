<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCollectionsStore } from '@/stores/collections'

const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const collectionsStore = useCollectionsStore()
const localOpen = ref(false)
const searchQuery = ref('')

const openState = computed({
  get: () => props.isOpen ?? localOpen.value,
  set: (val: boolean) => {
    localOpen.value = val
    if (!val) emit('close')
  },
})

const commands = [
  { id: 'nav-dashboard', title: 'Executive Watchtower', section: 'Strategic Telemetry', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3' },
  { id: 'nav-wf', title: 'Flight Risk Telemetry', section: 'Strategic Telemetry', path: '/workforce', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2' },
  { id: 'nav-emp', title: 'Talent Directory & Profiles', section: 'Strategic Telemetry', path: '/employees', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z' },
  { id: 'nav-cohorts', title: 'Saved Intelligence Cohorts', section: 'Strategic Telemetry', path: '/collections', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
  { id: 'nav-chat', title: 'Stratum Copilot Studio', section: 'Cognitive Intelligence', path: '/chatbot', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14' },
  { id: 'nav-mlops', title: 'Model Observability & Governance', section: 'Cognitive Intelligence', path: '/mlops', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517' },
  { id: 'nav-rep', title: 'Executive Intelligence Briefs', section: 'Cognitive Intelligence', path: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5' },
  { id: 'nav-att', title: 'Operational Presence & Attendance', section: 'Workforce Operations', path: '/attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7' },
  { id: 'nav-leave', title: 'Absence & Capacity Forecasting', section: 'Workforce Operations', path: '/leaves', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7' },
  { id: 'nav-pay', title: 'Compensation Forensics & Outliers', section: 'Workforce Operations', path: '/payrolls', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2' },
  { id: 'nav-perf', title: 'Performance Velocity', section: 'Workforce Operations', path: '/performances', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674' },
  { id: 'nav-set', title: 'Platform Settings & Governance', section: 'System Governance', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0' },
  { id: 'nav-showcase', title: 'Platform Architecture & Showcase', section: 'Overview', path: '/welcome', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const filteredCommands = computed(() => {
  if (!searchQuery.value.trim()) return commands
  const q = searchQuery.value.toLowerCase()
  return commands.filter(
    (c) => c.title.toLowerCase().includes(q) || c.section.toLowerCase().includes(q)
  )
})

function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openState.value = !openState.value
  } else if (e.key === 'Escape' && openState.value) {
    openState.value = false
  }
}

function selectCommand(path: string) {
  openState.value = false
  searchQuery.value = ''
  router.push(path)
}

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <div
    v-if="openState"
    class="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-xl animate-fade-in"
    @click.self="openState = false"
  >
    <div class="w-full max-w-xl rounded-2xl glass-heavy border border-white/[0.1] shadow-glass-lg p-4 overflow-hidden relative">
      <!-- Top shimmer line -->
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

      <!-- Search Input -->
      <div class="relative flex items-center mb-3">
        <svg class="w-4 h-4 absolute left-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employees, telemetry, copilot, pages... (ESC to close)"
          class="w-full pl-10 pr-12 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 placeholder-gray-500 backdrop-blur-sm transition-all"
          autofocus
        />
        <span class="absolute right-3 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/[0.06] text-gray-400 border border-white/[0.06]">
          ESC
        </span>
      </div>

      <!-- Quick Command List -->
      <div class="max-h-80 overflow-y-auto space-y-1 pr-1">
        <div
          v-for="cmd in filteredCommands"
          :key="cmd.id"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-white/[0.07] border border-transparent hover:border-white/[0.06] transition-all text-xs group"
          @click="selectCommand(cmd.path)"
        >
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="cmd.icon" />
            </svg>
            <span class="font-semibold text-white group-hover:text-blue-300 transition-colors">
              {{ cmd.title }}
            </span>
          </div>

          <span class="text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wider group-hover:text-gray-400">
            {{ cmd.section }}
          </span>
        </div>
      </div>

      <!-- Bottom Helper -->
      <div class="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-gray-600 font-mono">
        <span>Stratum Command Suite</span>
        <span>Press <kbd class="text-gray-400">↑</kbd> <kbd class="text-gray-400">↓</kbd> to navigate</span>
      </div>
    </div>
  </div>
</template>
