<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import { useAuthStore } from '@/stores/auth'
import { useFacilityStore } from '@/stores/facility'

const reservationStore = useReservationStore()
const authStore = useAuthStore()
const facilityStore = useFacilityStore()

const myReservations = computed(() => {
  if (authStore.currentUser) {
    return reservationStore.getReservationsByManager(authStore.currentUser.id)
  }
  return []
})

const upcomingReservations = computed(() => {
  const now = new Date().toISOString().split('T')[0] || ''
  return myReservations.value.filter(
    (r) => r.dates.some((d) => d >= now) && r.status !== 'Cancelled',
  )
})
const pastReservations = computed(() =>
  myReservations.value.filter((r) => {
    const now = new Date().toISOString().split('T')[0] || ''
    return r.dates.every((d) => d < now) || r.status === 'Cancelled'
  }),
)

const activeTab = ref<'All' | 'Upcoming' | 'Past'>('All')

const displayedReservations = computed(() => {
  if (activeTab.value === 'Upcoming') return upcomingReservations.value
  if (activeTab.value === 'Past') return pastReservations.value
  return myReservations.value
})

const getFacilityName = (id: string) =>
  facilityStore.facilities.find((f) => f.id === id)?.name || 'Unknown'
const getUserName = (id: string) => authStore.users.find((u) => u.id === id)?.name || 'Unknown'

const approve = (id: string) => reservationStore.approveReservation(id)
const deny = (id: string) => reservationStore.denyReservation(id)

// Calendar Logic (Mocked for October 2025 as per wireframe)
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)
const startDayOffset = 3 // Wednesday 1st (Mock)
</script>

<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">Manager Dashboard</h2>

    <!-- Calendar View -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900">October 2025</h3>
        <div class="space-x-2">
          <button class="text-gray-500 hover:text-black">&lt;</button>
          <button class="text-gray-500 hover:text-black">&gt;</button>
        </div>
      </div>
      <div
        class="grid grid-cols-7 gap-px bg-gray-200 border-b border-gray-200 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
      >
        <div class="bg-gray-100 py-2">Sun</div>
        <div class="bg-gray-100 py-2">Mon</div>
        <div class="bg-gray-100 py-2">Tue</div>
        <div class="bg-gray-100 py-2">Wed</div>
        <div class="bg-gray-100 py-2">Thu</div>
        <div class="bg-gray-100 py-2">Fri</div>
        <div class="bg-gray-100 py-2">Sat</div>
      </div>
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <!-- Empty cells for start offset -->
        <div v-for="n in startDayOffset" :key="`empty-${n}`" class="bg-white h-24"></div>

        <!-- Days -->
        <div
          v-for="day in calendarDays"
          :key="day"
          class="bg-black h-24 p-2 text-white relative hover:bg-gray-900 transition"
        >
          <span class="font-bold text-lg">{{ day }}</span>
          <!-- Mock Events -->
          <div v-if="day === 30" class="mt-1 text-xs bg-gray-300 text-black p-1 rounded truncate">
            Convention Center
          </div>
          <div v-if="day === 4" class="mt-1 text-xs bg-gray-300 text-black p-1 rounded truncate">
            Blocked
          </div>
        </div>
      </div>
    </div>

    <!-- Reservations List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-bold text-gray-900">Reservations</h3>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-4 px-6 py-4 bg-gray-50">
        <button
          @click="activeTab = 'All'"
          :class="[
            'px-4 py-2 rounded font-medium',
            activeTab === 'All'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          All
        </button>
        <button
          @click="activeTab = 'Upcoming'"
          :class="[
            'px-4 py-2 rounded font-medium',
            activeTab === 'Upcoming'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          Upcoming
        </button>
        <button
          @click="activeTab = 'Past'"
          :class="[
            'px-4 py-2 rounded font-medium',
            activeTab === 'Past'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          Past
        </button>
      </div>

      <!-- List -->
      <div class="divide-y divide-gray-200">
        <div v-if="displayedReservations.length === 0" class="p-6 text-center text-gray-500">
          No reservations found in this tab.
        </div>
        <div
          v-for="res in displayedReservations"
          :key="res.id"
          class="p-6 bg-gray-200 flex justify-between items-center m-4 rounded"
        >
          <div>
            <h4 class="text-lg font-bold text-gray-900">{{ getFacilityName(res.facilityId) }}</h4>
            <p class="text-sm text-gray-600">{{ res.dates.join(', ') }}</p>
            <p class="text-sm text-gray-600">{{ getUserName(res.userId) }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <span
              :class="[
                'px-3 py-1 rounded text-white text-sm font-medium',
                res.status === 'Pending'
                  ? 'bg-black'
                  : res.status === 'Confirmed'
                    ? 'bg-black'
                    : res.status === 'Denied'
                      ? 'bg-black'
                      : 'bg-black',
              ]"
            >
              {{ res.status === 'Pending' ? 'Pending Approval' : res.status }}
            </span>

            <div v-if="res.status === 'Pending'" class="space-x-2">
              <button
                @click="approve(res.id)"
                class="bg-white text-black border border-black px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                Approve
              </button>
              <button
                @click="deny(res.id)"
                class="bg-white text-black border border-black px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
