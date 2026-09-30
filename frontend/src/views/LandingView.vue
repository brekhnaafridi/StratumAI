<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { StratumCard, StratumButton, StratumBadge } from '@/components/stratum'

const router = useRouter()
const authStore = useAuthStore()

const personas = [
  {
    role: 'admin',
    title: 'Admin User',
    desc: 'System governance, global workforce telemetry, and MLOps',
    email: 'admin@hranalytics.com',
    badge: 'Executive Admin',
    color: 'indigo',
  },
  {
    role: 'hr_manager',
    title: 'Sarah Chen (HR Director)',
    desc: 'Flight risk analysis, payroll anomaly review, leave approvals',
    email: 'sarah.chen@hranalytics.com',
    badge: 'People Leadership',
    color: 'blue',
  },
  {
    role: 'hr_analyst',
    title: 'David Miller (People Analyst)',
    desc: 'Department heatmaps, cohort simulations, and report exports',
    email: 'david.miller@hranalytics.com',
    badge: 'Workforce Analytics',
    color: 'cyan',
  },
  {
    role: 'manager',
    title: 'Marcus Vance (Engineering VP)',
    desc: 'Team performance velocity, absence trends, and staff planning',
    email: 'marcus.vance@hranalytics.com',
    badge: 'Business Leadership',
    color: 'amber',
  },
  {
    role: 'employee',
    title: 'Emily Watson (Staff Engineer)',
    desc: 'Self-service check-in, leave requests, and digital payslips',
    email: 'employee@hranalytics.com',
    badge: 'Staff Portal',
    color: 'emerald',
  },
]

async function quickLogin(email: string) {
  try {
    await authStore.login(email, 'password')
    if (authStore.user?.role === 'employee') {
      await router.push('/portal')
    } else {
      await router.push('/dashboard')
    }
  } catch (e) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="min-h-screen bg-stratum-base text-white selection:bg-blue-500 selection:text-white">
    <!-- Navbar -->
    <header class="border-b border-white/[0.06] glass-surface sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
            <div class="w-full h-full bg-stratum-surface rounded-[11px] flex items-center justify-center">
              <!-- Stratum Isometric Logo Icon -->
              <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div>
            <span class="text-xl font-extrabold tracking-tight text-white">
              Stratum<span class="text-blue-500">AI</span>
            </span>
            <span class="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
              Enterprise OS
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/login"
            class="text-sm font-semibold text-gray-300 hover:text-white px-3 py-1.5 transition-colors"
          >
            Sign In
          </router-link>
          <StratumButton
            variant="primary"
            size="sm"
            @click="quickLogin('admin@hranalytics.com')"
          >
            Launch Platform
          </StratumButton>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <!-- Glow background circles -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/20 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div class="inline-flex items-center gap-2">
          <StratumBadge variant="indigo" size="md" dot pulse>
            Next-Gen Workforce Intelligence Engine
          </StratumBadge>
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none">
          Predictive Human Capital & <br />
          <span class="text-gradient-primary">Cognitive Organizational Intelligence</span>
        </h1>

        <p class="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 font-normal leading-relaxed">
          Stratum AI bridges enterprise human resources with machine learning telemetry. Intercept employee flight risk before it happens, audit compensation anomalies, and empower leadership with real-time decision simulation.
        </p>

        <!-- CTA Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <StratumButton
            variant="primary"
            size="lg"
            @click="quickLogin('admin@hranalytics.com')"
          >
            <template #icon-left>
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </template>
            Explore Executive Platform
          </StratumButton>

          <StratumButton
            variant="outline"
            size="lg"
            @click="quickLogin('sarah.chen@hranalytics.com')"
          >
            Launch as HR Director
          </StratumButton>
        </div>

        <!-- Live Platform Telemetry Bar -->
        <div class="pt-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div class="p-4 rounded-xl glass-elevated border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5">
            <span class="text-xs text-gray-500 block font-medium">Workforce Adherence</span>
            <span class="text-2xl font-mono font-bold text-emerald-400">93.0%</span>
            <span class="text-[10px] text-gray-500 block mt-0.5">30-day company benchmark</span>
          </div>

          <div class="p-4 rounded-xl glass-elevated border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5">
            <span class="text-xs text-gray-500 block font-medium">Model Precision</span>
            <span class="text-2xl font-mono font-bold text-blue-400">89.4%</span>
            <span class="text-[10px] text-gray-500 block mt-0.5">XGBoost turnover ROC-AUC</span>
          </div>

          <div class="p-4 rounded-xl glass-elevated border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5">
            <span class="text-xs text-gray-500 block font-medium">Active Headcount</span>
            <span class="text-2xl font-mono font-bold text-white">1,000+</span>
            <span class="text-[10px] text-gray-500 block mt-0.5">Across 4 global regional hubs</span>
          </div>

          <div class="p-4 rounded-xl glass-elevated border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-0.5">
            <span class="text-xs text-gray-500 block font-medium">Copilot Knowledge</span>
            <span class="text-2xl font-mono font-bold text-cyan-400">RAG Vector</span>
            <span class="text-[10px] text-gray-500 block mt-0.5">Instant HR policy grounding</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 1-Click Role Switcher Section -->
    <section class="py-16 glass-surface border-y border-white/[0.06]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="text-center space-y-2">
          <StratumBadge variant="cyan" size="sm">
            Interactive Multi-Persona Evaluation
          </StratumBadge>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Experience Stratum AI from Any Enterprise Role
          </h2>
          <p class="text-sm text-gray-400 max-w-xl mx-auto">
            Click any role below to instantly log in and experience the tailored permissions, workflows, and dashboards.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StratumCard
            v-for="persona in personas"
            :key="persona.role"
            hover-glow
            class="flex flex-col justify-between group cursor-pointer border border-white/[0.08] hover:border-blue-500/50"
            @click="quickLogin(persona.email)"
          >
            <div class="space-y-3">
              <StratumBadge :variant="(persona.color as any)" size="sm">
                {{ persona.badge }}
              </StratumBadge>
              <div>
                <h3 class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {{ persona.title }}
                </h3>
                <p class="text-xs text-gray-400 mt-1 line-clamp-3">
                  {{ persona.desc }}
                </p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Launch Persona</span>
              <span>→</span>
            </div>
          </StratumCard>
        </div>
      </div>
    </section>

    <!-- Core Capabilities Pillars -->
    <section class="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center space-y-2">
        <StratumBadge variant="emerald" size="sm">
          Platform Architecture
        </StratumBadge>
        <h2 class="text-3xl font-extrabold text-white tracking-tight">
          Enterprise Human Capital Operating Architecture
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Pillar 1 -->
        <StratumCard hover-glow class="space-y-4">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Flight Risk Telemetry</h3>
          <p class="text-sm text-gray-400 leading-relaxed">
            Multi-variable gradient boosting models compute churn likelihood across tenure, salary benchmarks, overtime, and promotion latency.
          </p>
        </StratumCard>

        <!-- Pillar 2 -->
        <StratumCard hover-glow class="space-y-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Cognitive Policy Copilot</h3>
          <p class="text-sm text-gray-400 leading-relaxed">
            Retrieval-Augmented Generation (RAG) grounds HR policy queries in verified company documentation with source citations and structured suggestions.
          </p>
        </StratumCard>

        <!-- Pillar 3 -->
        <StratumCard hover-glow class="space-y-4">
          <div class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white">Forensic Audit Watchtower</h3>
          <p class="text-sm text-gray-400 leading-relaxed">
            Unsupervised anomaly detection (Isolation Forests & DBSCAN) automatically flags payroll deviations, overtime spikes, and attendance irregularities.
          </p>
        </StratumCard>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] glass-surface py-8 text-center text-xs text-gray-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-white">Stratum<span class="text-blue-500">AI</span></span>
          <span>© 2026 Stratum Workforce Intelligence Systems</span>
        </div>
        <div class="flex items-center gap-4 text-gray-400">
          <span>FastAPI 0.141</span>
          <span>•</span>
          <span>Laravel 11 Sanctum</span>
          <span>•</span>
          <span>Vue 3 Vite</span>
        </div>
      </div>
    </footer>
  </div>
</template>
