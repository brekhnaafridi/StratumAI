<script setup lang="ts">
import { useCollectionsStore } from '@/stores/collections'
import { StratumCard, StratumButton, StratumBadge } from '@/components/stratum'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useCollectionsStore()

function navigateToEmployee(id: number) {
  router.push(`/employees/${id}`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <StratumBadge variant="indigo" size="sm" dot pulse>
            Strategic Dossiers
          </StratumBadge>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Saved Intelligence Cohorts
        </h1>
        <p class="text-sm text-gray-400 mt-0.5">
          Curated strategic cohorts for retention interventions, compensation reviews, and leadership succession planning.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <StratumButton
          v-if="store.savedCohorts.length > 0"
          variant="outline"
          size="sm"
          @click="store.exportAsJson"
        >
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </template>
          Export Cohort JSON
        </StratumButton>

        <StratumButton
          v-if="store.savedCohorts.length > 0"
          variant="ghost"
          size="sm"
          class="text-rose-400 hover:text-rose-300"
          @click="store.clearAll"
        >
          Clear All
        </StratumButton>
      </div>
    </div>

    <!-- Tag Filter Bar -->
    <div v-if="store.savedCohorts.length > 0" class="flex flex-wrap items-center gap-2 pb-2">
      <span class="text-xs uppercase font-bold tracking-wider text-gray-400 mr-2">Cohort Filter:</span>
      <button
        v-for="tag in store.availableTags"
        :key="tag"
        type="button"
        class="px-3 py-1 rounded-xl text-xs font-medium transition-all"
        :class="[
          store.activeTagFilter === tag
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
            : 'bg-stratum-elevated text-gray-400 hover:text-white border border-white/5',
        ]"
        @click="store.activeTagFilter = tag"
      >
        {{ tag === 'all' ? 'All Cohorts (' + store.savedCohorts.length + ')' : tag }}
      </button>
    </div>

    <!-- Empty State -->
    <StratumCard v-if="store.filteredCohorts.length === 0" class="py-16 text-center">
      <div class="max-w-md mx-auto space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto shadow-inner">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-white">No Employees in This Cohort</h3>
        <p class="text-sm text-gray-400">
          Bookmark employees from the Talent Directory or Workforce Risk Watchtower to track high-flight-risk individuals and simulate retention interventions.
        </p>
        <div class="pt-2">
          <StratumButton variant="primary" @click="router.push('/workforce')">
            Explore Workforce Telemetry
          </StratumButton>
        </div>
      </div>
    </StratumCard>

    <!-- Cohort Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <StratumCard
        v-for="item in store.filteredCohorts"
        :key="item.id"
        hover-glow
        class="flex flex-col justify-between group cursor-pointer"
        @click="navigateToEmployee(item.id)"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <StratumBadge
              :variant="item.risk_level === 'high' ? 'rose' : item.risk_level === 'medium' ? 'amber' : 'emerald'"
              size="sm"
              dot
            >
              {{ item.risk_level.toUpperCase() }} RISK ({{ item.risk_score }}%)
            </StratumBadge>

            <span class="text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-gray-400 border border-white/[0.08]">
              {{ item.tag }}
            </span>
          </div>

          <div>
            <h4 class="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {{ item.name }}
            </h4>
            <p class="text-xs text-gray-400">
              {{ item.position }} • <span class="text-gray-300 font-medium">{{ item.department }}</span>
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-xs">
            <div>
              <span class="text-gray-400 block">ID:</span>
              <span class="font-mono text-gray-300 font-semibold">{{ item.employee_code }}</span>
            </div>
            <div>
              <span class="text-gray-400 block">Base Salary:</span>
              <span class="font-mono text-emerald-400 font-semibold">${{ item.salary.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
          <span>Bookmarked {{ new Date(item.savedAt).toLocaleDateString() }}</span>
          <button
            type="button"
            class="text-rose-400 hover:text-rose-300 p-1 rounded-md hover:bg-rose-500/10 transition-colors"
            title="Remove from cohort"
            @click.stop="store.remove(item.id)"
          >
            Remove
          </button>
        </div>
      </StratumCard>
    </div>
  </div>
</template>
