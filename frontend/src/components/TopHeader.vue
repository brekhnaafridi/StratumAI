<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { StratumBadge, StratumButton } from '@/components/stratum'

const emit = defineEmits<{
  (e: 'open-command-palette'): void
}>()

const router = useRouter()
const authStore = useAuthStore()
const notificationsOpen = ref(false)
const userMenuOpen = ref(false)

const notifications = [
  { id: 1, title: 'Compensation Outlier', time: '8m ago', desc: 'Overtime spike flagged in Engineering cluster', severity: 'amber' },
  { id: 2, title: 'Model Telemetry Update', time: '42m ago', desc: 'XGBoost ROC-AUC reached 89.4% benchmark', severity: 'blue' },
  { id: 3, title: 'Flight Risk Intervention', time: '2h ago', desc: '3 high-flight-risk dossiers added to Review Cohort', severity: 'rose' },
]

function openCommandPalette() {
  emit('open-command-palette')
}

function navigateToChat() {
  router.push('/chatbot')
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="h-16 px-6 lg:px-8 flex items-center justify-between border-b border-white/[0.06] glass-surface sticky top-0 z-30">
    <!-- Left: Organization & Environment Telemetry -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-gray-300 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60" />
        <span class="font-bold text-white tracking-tight">Acme Global Technologies</span>
        <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {{ authStore.user?.role === 'employee' ? 'Talent Portal' : 'Enterprise OS' }}
        </span>
      </div>
    </div>

    <!-- Right: Search, Ask AI, Notifications, User Menu -->
    <div class="flex items-center gap-3">
      <!-- Global Search Command Palette Button -->
      <button
        type="button"
        class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-xs text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all focus:outline-none backdrop-blur-sm"
        title="Search & Command Palette (Ctrl + K)"
        @click="openCommandPalette"
      >
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search anything...</span>
        <kbd class="text-[10px] font-mono font-semibold bg-white/[0.06] px-1.5 py-0.5 rounded text-gray-400 border border-white/[0.08]">
          Ctrl K
        </kbd>
      </button>

      <!-- Ask AI Trigger -->
      <button
        type="button"
        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-500/25 border border-white/10 transition-all cursor-pointer select-none active:scale-95"
        title="Launch Stratum Copilot Studio"
        @click="navigateToChat"
      >
        <svg class="w-3.5 h-3.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Copilot</span>
      </button>

      <!-- Notifications -->
      <div class="relative">
        <button
          type="button"
          class="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.07] transition-colors focus:outline-none"
          title="Notifications"
          @click="notificationsOpen = !notificationsOpen"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-stratum-base/80 shadow-sm shadow-rose-500/50" />
        </button>

        <!-- Dropdown Card -->
        <div
          v-if="notificationsOpen"
          class="absolute right-0 mt-2 w-80 rounded-2xl glass-heavy shadow-glass-lg p-4 z-50 text-left border border-white/[0.1] animate-fade-in"
        >
          <div class="flex items-center justify-between pb-3 border-b border-white/[0.07]">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">System Telemetry Feed</h4>
            <span
              class="text-[11px] font-semibold text-blue-400 hover:underline cursor-pointer"
              @click="notificationsOpen = false; router.push('/payrolls')"
            >
              Forensics
            </span>
          </div>
          <div class="divide-y divide-white/[0.05] mt-1">
            <div
              v-for="item in notifications"
              :key="item.id"
              class="py-2.5 cursor-pointer hover:bg-white/[0.04] rounded-lg px-1.5 transition-colors"
              @click="notificationsOpen = false; router.push('/payrolls')"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white">{{ item.title }}</span>
                <span class="text-[10px] text-gray-500 font-mono">{{ item.time }}</span>
              </div>
              <p class="text-[11px] text-gray-400 mt-0.5 leading-snug">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile Avatar & Popover Menu -->
      <div class="relative pl-2 border-l border-white/[0.06]">
        <button
          type="button"
          class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/[0.05] transition-all focus:outline-none"
          @click="userMenuOpen = !userMenuOpen"
        >
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
            {{ (authStore.user?.full_name || authStore.user?.name || 'U').charAt(0).toUpperCase() }}
          </div>
          <div class="hidden md:block text-left">
            <div class="text-xs font-bold text-white leading-tight">
              {{ authStore.user?.full_name || authStore.user?.name || 'Authorized User' }}
            </div>
            <div class="text-[10px] text-gray-500 capitalize font-mono">
              {{ authStore.user?.role?.replace('_', ' ') || 'admin' }}
            </div>
          </div>
        </button>

        <!-- User Dropdown Menu -->
        <div
          v-if="userMenuOpen"
          class="absolute right-0 mt-2 w-52 rounded-2xl glass-heavy shadow-glass-lg p-2 z-50 text-left border border-white/[0.1] animate-fade-in"
          @click="userMenuOpen = false"
        >
          <div class="px-3 py-2 border-b border-white/[0.06] mb-1">
            <p class="text-xs font-bold text-white truncate">{{ authStore.user?.name }}</p>
            <p class="text-[10px] text-gray-400 truncate">{{ authStore.user?.email }}</p>
          </div>

          <router-link
            to="/welcome"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <span>Overview & Showcase</span>
          </router-link>

          <router-link
            to="/collections"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <span>Saved Cohorts</span>
          </router-link>

          <router-link
            to="/settings"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <span>Platform Settings</span>
          </router-link>

          <div class="border-t border-white/[0.06] mt-1 pt-1">
            <button
              type="button"
              class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
              @click="handleLogout"
            >
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
