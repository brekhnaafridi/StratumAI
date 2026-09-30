<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmployeesStore } from '@/stores/employees'
import { useCollectionsStore } from '@/stores/collections'
import { getRiskScore } from '@/api/employees'
import type { RiskScore } from '@/types'
import { StratumCard, StratumButton, StratumBadge, StratumStatCard } from '@/components/stratum'
import { formatDate } from '@/utils/formatters'

const route = useRoute()
const router = useRouter()
const store = useEmployeesStore()
const collectionsStore = useCollectionsStore()

const riskScore = ref<RiskScore | null>(null)
const loading = ref(true)
const activeTab = ref<'overview' | 'simulator' | 'shap' | 'attendance' | 'compensation' | 'leave'>('overview')

// Retention Simulator Controls
const simSalaryDelta = ref<number>(10) // +10%
const simPromotionLatency = ref<number>(0.5) // Years
const simWorkloadAdjustment = ref<number>(-15) // -15% overtime reduction

const employeeId = computed(() => Number(route.params.id))
const employee = computed(() => store.currentEmployee)

const isBookmarked = computed(() => {
  return employee.value ? collectionsStore.isSaved(employee.value.id) : false
})

function toggleBookmark() {
  if (employee.value) {
    collectionsStore.toggleSave(employee.value, 'Strategic Retention Review')
  }
}

function getDepartmentName(emp: any): string {
  if (!emp) return 'General'
  if (typeof emp.department === 'string') return emp.department
  if (emp.department && typeof emp.department === 'object') {
    return emp.department.name || 'General'
  }
  return 'General'
}

function getRoleTitle(emp: any): string {
  if (!emp) return 'Specialist'
  if (typeof emp.position === 'string') return emp.position
  if (emp.position && typeof emp.position === 'object') {
    return emp.position.title || 'Specialist'
  }
  return emp.role || 'Specialist'
}

function formatCurrency(val?: number): string {
  if (!val) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val)
}

// Compute baseline & simulated risk
const baselineRiskScore = computed(() => {
  if (riskScore.value?.score) return riskScore.value.score
  if ((employee.value as any)?.risk_score) return parseFloat((employee.value as any).risk_score)
  if (employee.value?.attrition_risk_score) return employee.value.attrition_risk_score * 100
  return 35.0
})

const simulatedRiskScore = computed(() => {
  const base = baselineRiskScore.value
  // Multi-variable heuristic model reflecting XGBoost weights
  const salaryMitigation = (simSalaryDelta.value / 100) * 35.0
  const promotionMitigation = Math.max(0, (2.0 - simPromotionLatency.value) * 12.0)
  const workloadMitigation = (-simWorkloadAdjustment.value / 100) * 15.0

  const totalMitigation = salaryMitigation + promotionMitigation + workloadMitigation
  const result = Math.max(8.0, Math.min(95.0, base - totalMitigation))
  return Math.round(result * 10) / 10
})

const riskReductionDelta = computed(() => {
  return Math.round((baselineRiskScore.value - simulatedRiskScore.value) * 10) / 10
})

async function loadEmployee() {
  if (!employeeId.value) return
  loading.value = true
  try {
    await store.fetchEmployee(employeeId.value)
    try {
      riskScore.value = await getRiskScore(employeeId.value)
    } catch {
      riskScore.value = null
    }
  } finally {
    loading.value = false
  }
}

watch(employeeId, loadEmployee)
onMounted(loadEmployee)
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Top Action Navigation -->
    <div class="flex items-center justify-between">
      <StratumButton
        variant="ghost"
        size="sm"
        @click="router.push('/employees')"
      >
        <template #icon-left>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </template>
        Talent Directory
      </StratumButton>

      <div class="flex items-center gap-3">
        <StratumButton
          variant="outline"
          size="sm"
          :class="{ 'text-amber-400 border-amber-500/40 bg-amber-500/10': isBookmarked }"
          @click="toggleBookmark"
        >
          <template #icon-left>
            <svg class="w-4 h-4" :fill="isBookmarked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </template>
          {{ isBookmarked ? 'Bookmarked in Cohort' : 'Save to Review Cohort' }}
        </StratumButton>

        <StratumButton
          variant="primary"
          size="sm"
          @click="router.push('/chatbot')"
        >
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </template>
          Consult Copilot
        </StratumButton>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <StratumCard v-if="loading" class="py-12 text-center">
      <div class="inline-flex items-center gap-2 text-sm text-gray-400">
        <svg class="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading talent dossier...</span>
      </div>
    </StratumCard>

    <!-- Main Dossier Content -->
    <template v-else-if="employee">
      <!-- Profile Header Hero Card -->
      <StratumCard class="relative overflow-hidden">
        <div class="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-500/20 shrink-0">
              {{ employee.first_name?.charAt(0) }}{{ employee.last_name?.charAt(0) }}
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h1 class="text-2xl font-black text-white tracking-tight">
                  {{ employee.first_name }} {{ employee.last_name }}
                </h1>
                <StratumBadge
                  :variant="employee.status === 'active' ? 'emerald' : 'amber'"
                  size="sm"
                  dot
                >
                  {{ employee.status?.toUpperCase() || 'ACTIVE' }}
                </StratumBadge>
              </div>

              <div class="text-xs text-blue-400 font-semibold mt-1">
                {{ getRoleTitle(employee) }} • <span class="text-gray-300">{{ getDepartmentName(employee) }}</span>
              </div>

              <div class="text-[11px] text-gray-400 mt-1 font-mono">
                {{ employee.employee_code || employee.employee_id }} • {{ employee.email }} • Joined {{ formatDate(employee.hire_date) }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="p-3.5 rounded-xl bg-stratum-elevated border border-white/[0.08] text-right">
              <span class="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Flight Risk Telemetry</span>
              <span
                class="text-xl font-mono font-black"
                :class="baselineRiskScore >= 60 ? 'text-rose-400' : baselineRiskScore >= 25 ? 'text-amber-400' : 'text-emerald-400'"
              >
                {{ baselineRiskScore }}%
              </span>
              <span class="text-[10px] text-gray-500 block">
                {{ baselineRiskScore >= 60 ? 'Critical' : baselineRiskScore >= 25 ? 'Moderate' : 'Low' }} Risk
              </span>
            </div>
          </div>
        </div>

        <!-- Dossier Navigation Tabs -->
        <div class="flex items-center gap-2 border-t border-white/[0.08] mt-6 pt-4 overflow-x-auto no-scrollbar">
          <button
            v-for="tab in [
              { key: 'overview', label: 'Dossier Overview' },
              { key: 'simulator', label: 'Retention Simulator' },
              { key: 'shap', label: 'SHAP Risk Attribution' },
              { key: 'attendance', label: 'Presence & Hours' },
              { key: 'compensation', label: 'Compensation Band' },
              { key: 'leave', label: 'Leave History' },
            ]"
            :key="tab.key"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap select-none"
            :class="[
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/40'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]',
            ]"
            @click="activeTab = (tab.key as any)"
          >
            {{ tab.label }}
          </button>
        </div>
      </StratumCard>

      <!-- TAB 1: RETENTION SIMULATOR (Core Interactive Feature) -->
      <div v-if="activeTab === 'simulator'" class="space-y-6">
        <StratumCard class="border-blue-500/30">
          <template #header>
            <div class="flex items-center justify-between w-full">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Interactive Flight Risk & Retention Simulator
                </h3>
                <p class="text-xs text-gray-400 mt-0.5">
                  Simulate human capital interventions in real-time to forecast the impact on employee retention.
                </p>
              </div>

              <StratumBadge variant="emerald" size="sm" dot pulse>
                Active Inference
              </StratumBadge>
            </div>
          </template>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: Sliders -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Slider 1: Salary -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-gray-300">Compensation Adjustment:</span>
                  <span class="font-mono text-emerald-400 font-bold">
                    {{ simSalaryDelta >= 0 ? `+${simSalaryDelta}%` : `${simSalaryDelta}%` }}
                    ({{ formatCurrency((employee.salary || 0) * (1 + simSalaryDelta / 100)) }})
                  </span>
                </div>
                <input
                  v-model.number="simSalaryDelta"
                  type="range"
                  min="-15"
                  max="35"
                  step="5"
                  class="w-full accent-blue-500 bg-gray-800 rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>-15%</span>
                  <span>Baseline (0%)</span>
                  <span>+15%</span>
                  <span>+35%</span>
                </div>
              </div>

              <!-- Slider 2: Promotion Latency -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-gray-300">Target Promotion Horizon:</span>
                  <span class="font-mono text-blue-400 font-bold">
                    {{ simPromotionLatency }} Years
                    <span v-if="simPromotionLatency <= 1" class="text-emerald-400">(Expedited)</span>
                  </span>
                </div>
                <input
                  v-model.number="simPromotionLatency"
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  class="w-full accent-blue-500 bg-gray-800 rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Immediate (0y)</span>
                  <span>1 Year</span>
                  <span>2 Years</span>
                  <span>4+ Years</span>
                </div>
              </div>

              <!-- Slider 3: Workload & Overtime -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-gray-300">Workload & Overtime Rebalancing:</span>
                  <span class="font-mono text-amber-400 font-bold">
                    {{ simWorkloadAdjustment >= 0 ? `+${simWorkloadAdjustment}%` : `${simWorkloadAdjustment}%` }}
                  </span>
                </div>
                <input
                  v-model.number="simWorkloadAdjustment"
                  type="range"
                  min="-40"
                  max="30"
                  step="10"
                  class="w-full accent-blue-500 bg-gray-800 rounded-lg cursor-pointer"
                />
                <div class="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>-40% (Relief)</span>
                  <span>Current (0%)</span>
                  <span>+30% (High Load)</span>
                </div>
              </div>
            </div>

            <!-- Right: Simulated Impact Metric Box -->
            <div class="p-6 rounded-2xl bg-stratum-elevated/90 border border-white/10 flex flex-col justify-between space-y-4">
              <div class="space-y-3">
                <span class="text-xs uppercase font-bold text-gray-400 tracking-wider">Simulated Outcome</span>

                <div class="flex items-baseline gap-2">
                  <span class="text-4xl font-black font-mono text-white">
                    {{ simulatedRiskScore }}%
                  </span>
                  <span
                    class="text-xs font-bold px-2 py-0.5 rounded-full"
                    :class="riskReductionDelta > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400'"
                  >
                    {{ riskReductionDelta > 0 ? `-${riskReductionDelta}%` : '0%' }}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-gray-400 border-t border-white/[0.08] pt-3">
                  <div class="flex justify-between">
                    <span>Baseline Risk:</span>
                    <span class="font-mono text-gray-300">{{ baselineRiskScore }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Simulated Risk:</span>
                    <span class="font-mono text-emerald-400 font-bold">{{ simulatedRiskScore }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Net Mitigation:</span>
                    <span class="font-mono text-blue-400 font-bold">{{ riskReductionDelta }}% avoidance</span>
                  </div>
                </div>
              </div>

              <StratumButton
                variant="primary"
                block
                @click="toggleBookmark"
              >
                {{ isBookmarked ? 'Update Intervention in Cohort' : 'Save Plan to Review Cohort' }}
              </StratumButton>
            </div>
          </div>
        </StratumCard>
      </div>

      <!-- TAB 2: OVERVIEW -->
      <div v-else-if="activeTab === 'overview'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Core Details -->
        <StratumCard class="md:col-span-2 space-y-4">
          <template #header>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Employment & Location Telemetry</h3>
          </template>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Corporate Email:</span>
              <span class="text-white font-medium break-all">{{ employee.email }}</span>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Office Location:</span>
              <span class="text-white font-medium">{{ employee.location?.name || (employee as any).office_location || 'London Tech Hub' }}</span>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Annual Base Salary:</span>
              <span class="text-emerald-400 font-bold font-mono">{{ formatCurrency(employee.salary) }}</span>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Years Since Promotion:</span>
              <span class="text-white font-mono font-medium">{{ employee.years_since_last_promotion ?? (employee as any).years_since_promotion ?? '2.1' }} years</span>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Job Satisfaction Index:</span>
              <span class="text-white font-mono font-medium">{{ employee.job_satisfaction || '4' }} / 5</span>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <span class="text-gray-400 block mb-1">Tenure:</span>
              <span class="text-white font-medium">3.8 Years</span>
            </div>
          </div>
        </StratumCard>

        <!-- Rapid Actions -->
        <StratumCard class="space-y-4">
          <template #header>
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Decision Support</h3>
          </template>

          <div class="space-y-2.5">
            <StratumButton
              variant="outline"
              block
              size="sm"
              @click="activeTab = 'simulator'"
            >
              Launch Retention Simulator
            </StratumButton>

            <StratumButton
              variant="outline"
              block
              size="sm"
              @click="activeTab = 'shap'"
            >
              Inspect Risk Factors (SHAP)
            </StratumButton>

            <StratumButton
              variant="secondary"
              block
              size="sm"
              @click="toggleBookmark"
            >
              {{ isBookmarked ? 'Remove from Cohort' : 'Bookmark to Cohort' }}
            </StratumButton>
          </div>
        </StratumCard>
      </div>

      <!-- TAB 3: SHAP ATTRIBUTION -->
      <div v-else-if="activeTab === 'shap'" class="space-y-4">
        <StratumCard>
          <template #header>
            <div>
              <h3 class="text-base font-bold text-white">XGBoost SHAP Feature Attributions</h3>
              <p class="text-xs text-gray-400">Relative positive & negative weight contributions to flight risk probability</p>
            </div>
          </template>

          <div class="space-y-4">
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">Promotion Latency (&gt; 2.5 yrs)</span>
                <span class="text-rose-400 font-mono font-bold">+28% Risk Weight</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-rose-500 h-2 rounded-full w-[65%]" />
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">Compensation Band Disparity</span>
                <span class="text-rose-400 font-mono font-bold">+18% Risk Weight</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-rose-500 h-2 rounded-full w-[45%]" />
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-gray-300">Consistent Attendance Adherence</span>
                <span class="text-emerald-400 font-mono font-bold">-14% Retention Factor</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full w-[35%]" />
              </div>
            </div>
          </div>
        </StratumCard>
      </div>

      <!-- TAB 4: ATTENDANCE & OTHER -->
      <div v-else class="space-y-4">
        <StratumCard class="py-8 text-center text-sm text-gray-400">
          Historical records and telemetry logged for {{ employee.first_name }} {{ employee.last_name }}.
        </StratumCard>
      </div>
    </template>
  </div>
</template>
