<script setup lang="ts">
import { ref } from 'vue'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  class?: string
}

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'row-click', row: Record<string, any>): void
  (e: 'sort', key: string, direction: 'asc' | 'desc'): void
}>()

const sortKey = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

function handleSort(column: Column) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
  emit('sort', sortKey.value, sortDirection.value)
}

function handleRowClick(row: Record<string, any>) {
  emit('row-click', row)
}
</script>

<template>
  <div class="overflow-x-auto rounded-2xl glass-elevated border border-white/[0.08]">
    <table class="min-w-full">
      <thead>
        <tr class="border-b border-white/[0.06]">
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'px-5 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white/[0.02]',
              col.sortable ? 'cursor-pointer select-none hover:text-gray-300 transition-colors' : '',
              col.class || '',
            ]"
            @click="handleSort(col)"
          >
            <div class="flex items-center gap-1">
              {{ col.label }}
              <span v-if="col.sortable && sortKey === col.key" class="text-blue-400 ml-0.5">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/[0.04]">
        <tr v-if="loading">
          <td :colspan="columns.length" class="px-5 py-12 text-center text-gray-500">
            <div class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span class="text-sm">Loading...</span>
            </div>
          </td>
        </tr>
        <tr v-else-if="data.length === 0">
          <td :colspan="columns.length" class="px-5 py-12 text-center text-gray-500 text-sm">
            No data available
          </td>
        </tr>
        <tr
          v-else
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-white/[0.03] cursor-pointer transition-all duration-150 group"
          @click="handleRowClick(row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-5 py-3.5 whitespace-nowrap text-sm text-gray-300 group-hover:text-white transition-colors"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="$slots.pagination" class="px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
      <slot name="pagination" />
    </div>
  </div>
</template>
