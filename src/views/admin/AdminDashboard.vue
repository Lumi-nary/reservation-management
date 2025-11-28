<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReservationStore } from '@/stores/reservation'
import { useFacilityStore } from '@/stores/facility'

const authStore = useAuthStore()
const reservationStore = useReservationStore()
const facilityStore = useFacilityStore()

const allUsers = computed(() => authStore.users)
const allReservations = computed(() => reservationStore.reservations)

// Stats
const totalFacilities = computed(() => facilityStore.facilities.length)
const pendingReservationsCount = computed(
  () => allReservations.value.filter((r) => r.status === 'Pending').length,
)
const approvedReservationsCount = computed(
  () => allReservations.value.filter((r) => r.status === 'Confirmed').length,
)
const totalUsersCount = computed(() => authStore.users.length)

const getFacilityName = (id: string) =>
  facilityStore.facilities.find((f) => f.id === id)?.name || 'Unknown'
const getUserName = (id: string) => authStore.users.find((u) => u.id === id)?.name || 'Unknown'
</script>

<template>
  <div class="space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
        <p class="text-sm font-medium text-text-secondary">Total Facilities</p>
        <p class="mt-2 text-3xl font-bold text-text-primary">{{ totalFacilities }}</p>
      </div>
      <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
        <p class="text-sm font-medium text-text-secondary">Pending Reservations</p>
        <p class="mt-2 text-3xl font-bold text-text-primary">{{ pendingReservationsCount }}</p>
      </div>
      <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
        <p class="text-sm font-medium text-text-secondary">Approved Reservations</p>
        <p class="mt-2 text-3xl font-bold text-text-primary">{{ approvedReservationsCount }}</p>
      </div>
      <div class="bg-surface p-6 rounded-lg shadow-sm border border-border">
        <p class="text-sm font-medium text-text-secondary">Total Users</p>
        <p class="mt-2 text-3xl font-bold text-text-primary">{{ totalUsersCount }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-4">
      <button
        class="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
      >
        Post Announcement
      </button>
      <button
        class="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
      >
        Manage Reservations
      </button>
    </div>

    <!-- Recent Reservations -->
    <div>
      <h2 class="text-xl font-bold text-text-primary mb-4">Recent Reservations</h2>
      <div class="bg-surface rounded-lg shadow overflow-hidden border border-border">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-100 dark:bg-gray-800 text-text-secondary uppercase">
              <tr>
                <th class="px-6 py-3 font-medium" scope="col">Facility</th>
                <th class="px-6 py-3 font-medium" scope="col">Client</th>
                <th class="px-6 py-3 font-medium" scope="col">Date</th>
                <th class="px-6 py-3 font-medium" scope="col">Status</th>
                <th class="px-6 py-3 font-medium" scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="res in allReservations.slice(0, 5)"
                :key="res.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-text-primary font-medium">
                  {{ getFacilityName(res.facilityId) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {{ getUserName(res.userId) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-text-secondary">{{ res.dates[0] }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-text-secondary">
                  <span
                    :class="{
                      'text-yellow-600': res.status === 'Pending',
                      'text-green-600': res.status === 'Confirmed',
                      'text-red-600': res.status === 'Denied' || res.status === 'Cancelled',
                    }"
                    class="font-medium"
                  >
                    {{ res.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="#" class="text-primary-600 hover:underline font-medium">View</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Recent Users -->
    <div>
      <h2 class="text-xl font-bold text-text-primary mb-4">Recent Users</h2>
      <div class="bg-surface rounded-lg shadow overflow-hidden border border-border">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-100 dark:bg-gray-800 text-text-secondary uppercase">
              <tr>
                <th class="px-6 py-3 font-medium" scope="col">Name</th>
                <th class="px-6 py-3 font-medium" scope="col">Email</th>
                <th class="px-6 py-3 font-medium" scope="col">Account Type</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="user in allUsers.slice(0, 5)"
                :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-text-primary font-medium">
                  {{ user.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-text-secondary">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-text-secondary">{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
