<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCollectionsStore } from '@/stores/collections'
import { StratumBadge } from '@/components/stratum'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const collectionsStore = useCollectionsStore()
const collapsed = ref(false)

interface NavItem {
  name: string
  path: string
  icon: string
  badge?: () => string | number | undefined
  badgeVariant?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'neutral'
}

const employeeSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Personal Workspace',
    items: [
      {
        name: 'My Overview',
        path: '/portal',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
      },
      {
        name: 'Presence & Attendance',
        path: '/portal/attendance',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
      {
        name: 'Leave Allocations',
        path: '/portal/leaves',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      },
      {
        name: 'Compensation Statements',
        path: '/portal/payrolls',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        name: 'Growth & Reviews',
        path: '/portal/performance',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      },
    ],
  },
  {
    title: 'Cognitive Support',
    items: [
      {
        name: 'Policy Copilot',
        path: '/chatbot',
        icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      },
      {
        name: 'Employee Profile',
        path: '/portal/profile',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      },
    ],
  },
]

const adminSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Strategic Telemetry',
    items: [
      {
        name: 'Executive Watchtower',
        path: '/',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
      },
      {
        name: 'Flight Risk Telemetry',
        path: '/workforce',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
      {
        name: 'Talent Directory',
        path: '/employees',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      },
      {
        name: 'Saved Cohorts',
        path: '/collections',
        icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
        badge: () => collectionsStore.savedCohorts.length || undefined,
        badgeVariant: 'indigo',
      },
    ],
  },
  {
    title: 'Cognitive Intelligence',
    items: [
      {
        name: 'Copilot Studio',
        path: '/chatbot',
        icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
        badge: () => 'AI',
        badgeVariant: 'cyan',
      },
      {
        name: 'Model Observability',
        path: '/mlops',
        icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      },
      {
        name: 'Executive Briefs',
        path: '/reports',
        icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
    ],
  },
  {
    title: 'Workforce Operations',
    items: [
      {
        name: 'Operational Presence',
        path: '/attendance',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
      {
        name: 'Absence & Capacity',
        path: '/leaves',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      },
      {
        name: 'Compensation Forensics',
        path: '/payrolls',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        name: 'Performance Velocity',
        path: '/performances',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      },
    ],
  },
  {
    title: 'Governance',
    items: [
      {
        name: 'Platform Settings',
        path: '/settings',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
      },
    ],
  },
]

const navSections = computed(() => {
  return authStore.user?.role === 'employee' ? employeeSections : adminSections
})

function isActive(path: string): boolean {
  const current = route.path
  if (path === '/') return current === '/' || current === '/dashboard'
  if (path === '/employees') return current === '/employees' || (current.startsWith('/employees/') && current !== '/employees')
  return current === path || current.startsWith(`${path}/`)
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside
    class="relative flex flex-col shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out glass-surface border-r border-white/[0.06]"
    :class="[collapsed ? 'w-20' : 'w-64']"
  >
    <!-- Logo & App Header -->
    <div class="h-16 px-5 border-b border-white/[0.06] flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 overflow-hidden group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 shrink-0">
          <div class="w-full h-full bg-stratum-base/80 backdrop-blur-md rounded-[11px] flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <div v-if="!collapsed" class="flex flex-col">
          <span class="text-lg font-black tracking-tight text-white leading-none">
            Stratum<span class="text-blue-500">AI</span>
          </span>
          <span class="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
            Workforce OS
          </span>
        </div>
      </router-link>

      <!-- Collapse Toggle Button -->
      <button
        type="button"
        class="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors"
        :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="collapsed = !collapsed"
      >
        <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': collapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation Menu Items -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      <div v-for="section in navSections" :key="section.title" class="space-y-1">
        <p
          v-if="!collapsed"
          class="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 pb-1 select-none"
        >
          {{ section.title }}
        </p>

        <router-link
          v-for="item in section.items"
          :key="item.path"
          :to="item.path"
          class="relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group select-none"
          :class="[
            isActive(item.path)
              ? 'bg-blue-500/[0.12] backdrop-blur-sm text-white border border-blue-500/25 shadow-lg shadow-blue-500/10'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.05]',
            collapsed ? 'justify-center px-0' : '',
          ]"
          :title="collapsed ? item.name : undefined"
        >
          <!-- Active left indicator bar -->
          <span
            v-if="isActive(item.path)"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-sm shadow-blue-400/50"
          />

          <svg
            class="w-5 h-5 shrink-0 transition-colors"
            :class="isActive(item.path) ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="item.icon" />
          </svg>

          <span v-if="!collapsed" class="truncate flex-1">
            {{ item.name }}
          </span>

          <StratumBadge
            v-if="!collapsed && item.badge && item.badge()"
            :variant="item.badgeVariant || 'blue'"
            size="sm"
          >
            {{ item.badge() }}
          </StratumBadge>
        </router-link>
      </div>
    </div>

    <!-- User Profile & Session Footer -->
    <div class="p-3 border-t border-white/[0.06]">
      <div
        class="flex items-center gap-3 p-2 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm"
        :class="{ 'justify-center': collapsed }"
      >
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md shadow-blue-500/20">
          {{ authStore.user?.name ? authStore.user.name.charAt(0) : 'U' }}
        </div>

        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-xs font-bold text-white truncate leading-tight">
            {{ authStore.user?.name || 'Authorized User' }}
          </p>
          <span class="text-[10px] text-gray-500 uppercase tracking-wider block font-mono">
            {{ authStore.user?.role?.replace('_', ' ') || 'User' }}
          </span>
        </div>

        <button
          v-if="!collapsed"
          type="button"
          class="text-gray-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
          title="Sign out of Stratum AI"
          @click="handleLogout"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>
