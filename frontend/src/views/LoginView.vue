<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { StratumButton, StratumBadge } from '@/components/stratum'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@hranalytics.com')
const password = ref('password')
const error = ref('')
const loading = ref(false)

const demoAccounts = [
  { role: 'Admin', email: 'admin@hranalytics.com', badge: 'Full Platform' },
  { role: 'HR Director', email: 'sarah.chen@hranalytics.com', badge: 'People Ops' },
  { role: 'Analyst', email: 'david.miller@hranalytics.com', badge: 'Intelligence' },
  { role: 'Engineering VP', email: 'marcus.vance@hranalytics.com', badge: 'Department' },
  { role: 'Staff Engineer', email: 'employee@hranalytics.com', badge: 'Self-Service' },
]

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value.trim(), password.value)
    if (authStore.user?.role === 'employee') {
      await router.push('/portal')
    } else {
      await router.push('/dashboard')
    }
  } catch (err: any) {
    error.value =
      err.response?.data?.message ||
      err.response?.data?.detail ||
      err.message ||
      'Invalid credentials. Please verify your email and password.'
  } finally {
    loading.value = false
  }
}

function selectAccount(targetEmail: string) {
  email.value = targetEmail
  password.value = 'password'
}
</script>

<template>
  <div class="min-h-screen flex bg-stratum-base text-white relative overflow-hidden">
    <!-- Animated mesh background -->
    <div class="glass-mesh-bg" aria-hidden="true">
      <div class="glass-mesh-orb"></div>
    </div>

    <!-- Left Pane: Branding & Telemetry -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/[0.06] glass-surface z-10">
      <!-- Inner gradient auras -->
      <div class="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <!-- Top Branding -->
      <div class="relative z-10">
        <router-link to="/welcome" class="inline-flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/25">
            <div class="w-full h-full bg-stratum-base/80 backdrop-blur-md rounded-[11px] flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div>
            <span class="text-2xl font-black tracking-tight text-white">
              Stratum<span class="text-blue-500">AI</span>
            </span>
            <span class="text-xs text-gray-500 block font-medium -mt-1">
              Workforce Intelligence OS
            </span>
          </div>
        </router-link>
      </div>

      <!-- Center Narrative -->
      <div class="relative z-10 space-y-6 max-w-lg">
        <StratumBadge variant="indigo" size="sm" dot pulse>
          Cognitive Decision Support
        </StratumBadge>
        <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Enterprise workforce telemetry for proactive human capital leadership.
        </h2>
        <p class="text-sm text-gray-400 leading-relaxed">
          Access organizational vitality benchmarks, XGBoost-powered flight risk forecasting, and RAG-grounded policy intelligence across all operational hubs.
        </p>

        <!-- Micro Telemetry Preview Card -->
        <div class="p-5 rounded-2xl glass-elevated border border-white/[0.1] space-y-3">
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>Model Telemetry Active</span>
            <span class="text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online (v2.4.1)
            </span>
          </div>
          <div class="w-full bg-white/[0.05] rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-[89%]" />
          </div>
          <div class="flex justify-between text-[11px] text-gray-500 font-mono">
            <span>Precision: 89.4%</span>
            <span>Latency: 42ms</span>
            <span>Sample: 1,000 Nodes</span>
          </div>
        </div>
      </div>

      <!-- Bottom System Status -->
      <div class="relative z-10 flex items-center justify-between text-xs text-gray-500 pt-6 border-t border-white/[0.06]">
        <span>Single-Tenant Enterprise Cluster</span>
        <span>AES-256 / RBAC Verified</span>
      </div>
    </div>

    <!-- Right Pane: Authentication Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile Logo Header -->
        <div class="lg:hidden text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] mx-auto shadow-lg shadow-blue-500/25">
            <div class="w-full h-full bg-stratum-base/80 backdrop-blur-md rounded-[15px] flex items-center justify-center">
              <svg class="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-black text-white tracking-tight">
            Stratum<span class="text-blue-500">AI</span>
          </h1>
          <p class="text-xs text-gray-500">
            Enterprise Workforce Intelligence
          </p>
        </div>

        <div class="space-y-2">
          <h2 class="text-2xl font-extrabold text-white tracking-tight">
            Welcome to Stratum AI
          </h2>
          <p class="text-sm text-gray-400">
            Enter your credentials to access the cognitive operations dashboard.
          </p>
        </div>

        <!-- Error Alert -->
        <div
          v-if="error"
          class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3 animate-fade-in backdrop-blur-sm"
        >
          <svg class="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">{{ error }}</div>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Corporate Email Address
            </label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="name@hranalytics.com"
              class="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all backdrop-blur-sm"
            />
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Password
              </label>
              <span class="text-xs text-blue-400/80">Default: password</span>
            </div>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all backdrop-blur-sm"
            />
          </div>

          <StratumButton
            type="submit"
            variant="primary"
            block
            size="lg"
            :loading="loading"
          >
            Authenticate & Launch
          </StratumButton>
        </form>

        <!-- 1-Click Role Switcher -->
        <div class="pt-4 border-t border-white/[0.06] space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Instant Persona Switcher:
            </span>
            <span class="text-[11px] text-gray-600">1-click select</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="acc in demoAccounts"
              :key="acc.email"
              type="button"
              class="p-2 rounded-xl text-left border transition-all text-xs backdrop-blur-sm"
              :class="[
                email === acc.email
                  ? 'bg-blue-500/15 border-blue-500/40 text-white shadow-sm shadow-blue-500/10'
                  : 'bg-white/[0.03] border-white/[0.06] text-gray-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white',
              ]"
              @click="selectAccount(acc.email)"
            >
              <span class="font-bold block truncate">{{ acc.role }}</span>
              <span class="text-[10px] text-gray-500 block truncate">{{ acc.badge }}</span>
            </button>
          </div>
        </div>

        <div class="text-center pt-2">
          <router-link to="/welcome" class="text-xs text-gray-500 hover:text-blue-400 transition-colors">
            ← Return to Platform Overview
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
