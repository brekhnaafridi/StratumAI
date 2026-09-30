<script setup lang="ts">
import { ref, onMounted, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { getWorkforceStats, getWorkforceHeatmap, getWorkforceInsights } from '@/api/workforce'
import { getAttendanceStats } from '@/api/attendance'
import type { WorkforceStats, DepartmentRisk, WorkforceInsight, AttendanceStats } from '@/types'
import { StratumCard, StratumStatCard, StratumBadge, StratumButton } from '@/components/stratum'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

provide('THEME_KEY', 'dark')

const router = useRouter()
const loading = ref(true)
const workforceStats = ref<WorkforceStats | null>(null)
const attendanceStats = ref<AttendanceStats | null>(null)
const insights = ref<WorkforceInsight[]>([])
const departmentRisks = ref<DepartmentRisk[]>([])

const workforceChartOption = ref<any>({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1F2937',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#F9FAFB', fontSize: 12 },
  },
  legend: {
    data: ['Active Headcount', 'Elevated Flight Risk'],
    textStyle: { color: '#9CA3AF', fontSize: 11 },
    top: 0,
    right: 10,
  },
  grid: { top: 40, right: 15, bottom: 25, left: 35 },
  xAxis: {
    type: 'category',
    data: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    axisLabel: { color: '#9CA3AF', fontSize: 11 },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } },
    axisLabel: { color: '#9CA3AF', fontSize: 11 },
  },
  series: [
    {
      name: 'Active Headcount',
      type: 'bar',
      data: [180, 195, 135, 60, 100, 120],
      itemStyle: {
        color: '#3B82F6',
        borderRadius: [6, 6, 0, 0],
      },
      barWidth: '28%',
    },
    {
      name: 'Elevated Flight Risk',
      type: 'bar',
      data: [24, 45, 18, 5, 6, 12],
      itemStyle: {
        color: '#EF4444',
        borderRadius: [6, 6, 0, 0],
      },
      barWidth: '28%',
    },
  ],
})

async function loadDashboardData() {
  loading.value = true
  try {
    const [wfStats, attStats, _heatmaps, ins] = await Promise.all([
      getWorkforceStats().catch(() => null),
      getAttendanceStats().catch(() => null),
      getWorkforceHeatmap().catch(() => []),
      getWorkforceInsights().catch(() => []),
    ])

    workforceStats.value = wfStats
    attendanceStats.value = attStats
    insights.value = ins

    const depts: DepartmentRisk[] = (wfStats?.departments && wfStats.departments.length > 0)
      ? wfStats.departments.map(d => ({
          department: d.name,
          employee_count: d.headcount,
          high_risk_count: d.high_risk_count,
          risk_percentage: d.headcount ? (d.high_risk_count / d.headcount) * 100 : 0,
          avg_satisfaction: 3.8,
          avg_years_promotion: 2.1,
        }))
      : [
          { department: 'Engineering', employee_count: 180, high_risk_count: 24, risk_percentage: 13.3, avg_satisfaction: 3.8, avg_years_promotion: 2.1 },
          { department: 'Sales', employee_count: 195, high_risk_count: 45, risk_percentage: 23.1, avg_satisfaction: 3.6, avg_years_promotion: 1.8 },
          { department: 'Marketing', employee_count: 135, high_risk_count: 18, risk_percentage: 13.3, avg_satisfaction: 4.1, avg_years_promotion: 2.3 },
          { department: 'HR', employee_count: 60, high_risk_count: 5, risk_percentage: 8.3, avg_satisfaction: 4.2, avg_years_promotion: 2.5 },
          { department: 'Finance', employee_count: 100, high_risk_count: 6, risk_percentage: 6.0, avg_satisfaction: 3.9, avg_years_promotion: 2.0 },
          { department: 'Operations', employee_count: 120, high_risk_count: 12, risk_percentage: 10.0, avg_satisfaction: 3.7, avg_years_promotion: 2.4 },
        ]

    departmentRisks.value = depts

    workforceChartOption.value.xAxis.data = depts.map(d => d.department)
    workforceChartOption.value.series[0].data = depts.map(d => d.employee_count)
    workforceChartOption.value.series[1].data = depts.map(d => d.high_risk_count)
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboardData)
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Watchtower Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <StratumBadge variant="blue" size="sm" dot pulse>
            Telemetry Active
          </StratumBadge>
          <span class="text-xs text-gray-500 font-mono">Stratum v2.4 • Model F1: 0.88</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Executive Workforce Watchtower
        </h1>
        <p class="text-sm text-gray-400 mt-0.5">
          Real-time organizational vitality, predictive flight risk telemetry, and cross-department human capital operations.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <StratumButton
          variant="outline"
          size="sm"
          @click="loadDashboardData"
        >
          <template #icon-left>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </template>
          Refresh Feed
        </StratumButton>

        <StratumButton
          variant="primary"
          size="sm"
          @click="router.push('/workforce')"
        >
          <template #icon-left>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </template>
          Flight Risk Deep-Dive
        </StratumButton>
      </div>
    </div>

    <!-- ROW 1: Stratum Core KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- 1. Total Talent Active -->
      <StratumStatCard
        title="Total Talent Active"
        :value="workforceStats?.total_employees || 1000"
        change="+4.2%"
        changeType="positive"
        caption="Across 4 regional hubs"
        iconBg="from-blue-600/20 to-indigo-600/20 text-blue-400 border-blue-500/30"
      >
        <template #icon>
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </template>
      </StratumStatCard>

      <!-- 2. Flight Risk Index -->
      <StratumStatCard
        title="Workforce Flight Risk"
        :value="workforceStats?.avg_turnover_risk ? (workforceStats.avg_turnover_risk * 100).toFixed(1) + '%' : '14.2%'"
        change="Stable"
        changeType="neutral"
        caption="Weighted predictive index"
        iconBg="from-amber-600/20 to-rose-600/20 text-amber-400 border-amber-500/30"
      >
        <template #icon>
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </template>
      </StratumStatCard>

      <!-- 3. Operational Presence -->
      <StratumStatCard
        title="Presence Adherence"
        :value="`${attendanceStats?.attendance_rate || 93.0}%`"
        change="930 Verified"
        changeType="positive"
        caption="Biometric & portal check-in"
        iconBg="from-emerald-600/20 to-teal-600/20 text-emerald-400 border-emerald-500/30"
      >
        <template #icon>
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
      </StratumStatCard>

      <!-- 4. Compensation Outliers -->
      <StratumStatCard
        title="Forensic Audit Alerts"
        value="4"
        change="Investigation"
        changeType="negative"
        caption="Overtime & salary deviations"
        iconBg="from-rose-600/20 to-red-600/20 text-rose-400 border-rose-500/30"
      >
        <template #icon>
          <svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </template>
      </StratumStatCard>
    </div>

    <!-- ROW 2: Stratum Cognitive Telemetry (Chart + Copilot Briefing) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Department Risk Distribution Chart -->
      <StratumCard class="lg:col-span-2">
        <template #header>
          <div>
            <h2 class="text-base font-bold text-white tracking-tight">Department Flight Risk Telemetry</h2>
            <p class="text-xs text-gray-400 mt-0.5">Active headcount vs. predicted elevated flight risk cohorts</p>
          </div>
          <StratumButton
            variant="ghost"
            size="sm"
            @click="router.push('/workforce')"
          >
            Full Analytics &rarr;
          </StratumButton>
        </template>
        <VChart :option="workforceChartOption" style="height: 300px" autoresize />
      </StratumCard>

      <!-- Right: Cognitive Copilot Insights Brief -->
      <StratumCard class="flex flex-col justify-between">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 class="text-base font-bold text-white tracking-tight">Copilot Telemetry Feed</h2>
            </div>
            <StratumBadge variant="cyan" size="sm">Top Signals</StratumBadge>
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="item in (insights.length ? insights.slice(0, 3) : [
              { id: 1, title: 'Engineering exhibits 35% elevated risk due to 2.1-year promotion latency.', action: '/workforce' },
              { id: 2, title: 'Presence adherence dipped 1.8% in London Tech Hub marketing cluster.', action: '/attendance' },
              { id: 3, title: '4 compensation overtime spikes flagged by Isolation Forest.', action: '/payrolls' },
            ])"
            :key="item.id"
            class="p-3.5 rounded-xl bg-stratum-elevated/70 border border-white/[0.06] hover:border-white/20 transition-all flex items-start justify-between gap-3 group"
          >
            <div class="space-y-1">
              <span class="text-xs text-gray-200 font-medium leading-relaxed block">
                {{ item.title }}
              </span>
              <span class="text-[10px] text-gray-500 font-mono">Telemetry Alert • Active</span>
            </div>
            <button
              type="button"
              class="text-xs font-semibold text-blue-400 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-transform shrink-0"
              @click="router.push((item as any).action || '/workforce')"
            >
              Investigate &rarr;
            </button>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-white/[0.08]">
          <StratumButton
            variant="indigo"
            block
            @click="router.push('/chatbot')"
          >
            <template #icon-left>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </template>
            Consult Stratum Copilot
          </StratumButton>
        </div>
      </StratumCard>
    </div>

    <!-- ROW 3: Strategic Attrition Quantiles & Action Items -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 1. Quantile Breakdown -->
      <StratumCard>
        <template #header>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Flight Risk Quantiles</h3>
        </template>
        <div class="space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-gray-300 font-medium">Low Flight Risk (&lt;25%)</span>
              <span class="font-bold text-emerald-400 font-mono">{{ workforceStats?.low_risk_count || 650 }} (65%)</span>
            </div>
            <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 65%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-gray-300 font-medium">Medium Flight Risk (25-60%)</span>
              <span class="font-bold text-amber-400 font-mono">{{ workforceStats?.medium_risk_count || 208 }} (21%)</span>
            </div>
            <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-amber-500 rounded-full" style="width: 21%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-gray-300 font-medium">Critical Flight Risk (&gt;60%)</span>
              <span class="font-bold text-rose-400 font-mono">{{ workforceStats?.high_risk_count || 142 }} (14%)</span>
            </div>
            <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-rose-500 rounded-full" style="width: 14%"></div>
            </div>
          </div>
        </div>
      </StratumCard>

      <!-- 2. Priority Department Interventions -->
      <StratumCard>
        <template #header>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Department Risk Focus</h3>
        </template>
        <div class="space-y-3">
          <div
            v-for="dept in (departmentRisks.length ? departmentRisks.slice(0, 3) : [
              { department: 'Engineering', high_risk_count: 24, employee_count: 180 },
              { department: 'Enterprise Sales', high_risk_count: 45, employee_count: 195 },
              { department: 'Marketing', high_risk_count: 18, employee_count: 135 },
            ])"
            :key="dept.department"
            class="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]"
          >
            <div>
              <span class="text-sm font-semibold text-white block">{{ dept.department }}</span>
              <span class="text-[11px] text-gray-500">{{ dept.employee_count }} active nodes</span>
            </div>
            <StratumBadge variant="rose" size="sm">
              {{ dept.high_risk_count }} At-Risk
            </StratumBadge>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-white/[0.06] text-right">
          <router-link to="/workforce" class="text-xs font-semibold text-blue-400 hover:text-blue-300">
            View All Departments &rarr;
          </router-link>
        </div>
      </StratumCard>

      <!-- 3. Strategic Rapid Action Centers -->
      <StratumCard>
        <template #header>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Quick Interventions</h3>
        </template>
        <div class="space-y-2.5">
          <router-link
            to="/collections"
            class="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs group"
          >
            <span class="text-gray-200 font-semibold group-hover:text-blue-400">Review Saved Cohorts</span>
            <span class="text-gray-500 font-mono">→</span>
          </router-link>

          <router-link
            to="/payrolls"
            class="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs group"
          >
            <span class="text-gray-200 font-semibold group-hover:text-amber-400">Audit Compensation Outliers</span>
            <span class="text-gray-500 font-mono">→</span>
          </router-link>

          <router-link
            to="/mlops"
            class="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs group"
          >
            <span class="text-gray-200 font-semibold group-hover:text-cyan-400">Inspect Model Observability</span>
            <span class="text-gray-500 font-mono">→</span>
          </router-link>
        </div>
      </StratumCard>
    </div>
  </div>
</template>
