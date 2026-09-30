import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CohortItem {
  id: number
  employee_code: string
  name: string
  department: string
  position: string
  risk_score: number
  risk_level: string
  salary: number
  tag: string
  savedAt: string
}

export const useCollectionsStore = defineStore('collections', () => {
  const savedCohorts = ref<CohortItem[]>(
    JSON.parse(localStorage.getItem('stratum_saved_cohorts') || '[]')
  )

  const activeTagFilter = ref<string>('all')

  const availableTags = computed(() => {
    const tags = new Set<string>()
    savedCohorts.value.forEach((item) => {
      if (item.tag) tags.add(item.tag)
    })
    return ['all', ...Array.from(tags)]
  })

  const filteredCohorts = computed(() => {
    if (activeTagFilter.value === 'all') {
      return savedCohorts.value
    }
    return savedCohorts.value.filter((i) => i.tag === activeTagFilter.value)
  })

  const isSaved = (employeeId: number) => {
    return savedCohorts.value.some((item) => item.id === employeeId)
  }

  function toggleSave(employee: any, tag = 'Priority Review') {
    const index = savedCohorts.value.findIndex((i) => i.id === employee.id)
    if (index > -1) {
      savedCohorts.value.splice(index, 1)
    } else {
      savedCohorts.value.unshift({
        id: employee.id,
        employee_code: employee.employee_code || `EMP${employee.id}`,
        name: employee.full_name || employee.name || `${employee.first_name} ${employee.last_name}`,
        department: employee.department?.name || employee.department || 'General',
        position: employee.position?.title || employee.position || 'Specialist',
        risk_score: parseFloat(employee.risk_score || '0'),
        risk_level: employee.risk_level || 'low',
        salary: parseFloat(employee.salary || '0'),
        tag,
        savedAt: new Date().toISOString(),
      })
    }
    saveToStorage()
  }

  function remove(id: number) {
    savedCohorts.value = savedCohorts.value.filter((i) => i.id !== id)
    saveToStorage()
  }

  function clearAll() {
    savedCohorts.value = []
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('stratum_saved_cohorts', JSON.stringify(savedCohorts.value))
  }

  function exportAsJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedCohorts.value, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `stratum_talent_cohort_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return {
    savedCohorts,
    filteredCohorts,
    activeTagFilter,
    availableTags,
    isSaved,
    toggleSave,
    remove,
    clearAll,
    exportAsJson,
  }
})
