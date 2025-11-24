<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReservationStore } from '@/stores/reservation'
import { useFacilityStore } from '@/stores/facility'

const authStore = useAuthStore()
const reservationStore = useReservationStore()
const facilityStore = useFacilityStore()

const pendingUsers = computed(() =>
  authStore.users.filter((u) => u.status === 'PendingVerification'),
)
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

const approveUser = (id: string) => {
  authStore.approveUser(id)
}

const rejectUser = (id: string) => {
  // In a real app, this would update status to 'Rejected'
  alert(`User ${id} rejected (Mock)`)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gray-200 p-6 rounded-lg text-center">
        <h3 class="text-lg font-semibold text-gray-700">Total Facilities</h3>
        <p class="text-3xl font-bold text-black mt-2">{{ totalFacilities }}</p>
      </div>
      <div class="bg-gray-200 p-6 rounded-lg text-center">
        <h3 class="text-lg font-semibold text-gray-700">Pending Reservations</h3>
        <p class="text-3xl font-bold text-black mt-2">{{ pendingReservationsCount }}</p>
      </div>
      <div class="bg-gray-200 p-6 rounded-lg text-center">
        <h3 class="text-lg font-semibold text-gray-700">Approved Reservations</h3>
        <p class="text-3xl font-bold text-black mt-2">{{ approvedReservationsCount }}</p>
      </div>
      <div class="bg-gray-200 p-6 rounded-lg text-center">
        <h3 class="text-lg font-semibold text-gray-700">Total Users</h3>
        <p class="text-3xl font-bold text-black mt-2">{{ totalUsersCount }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-4">
      <button class="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800">
        Post Announcement
      </button>
      <button class="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800">
        Manage Reservations
      </button>
    </div>

    <!-- Pending Government Registrations (Wireframe 2) -->
    <div
      v-if="authStore.isHeadUser && pendingUsers.length > 0"
      class="bg-white rounded-lg shadow overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-bold text-gray-900">Pending Government Registrations</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-900 text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Client Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Uploaded Documents
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-100 divide-y divide-gray-200">
            <tr v-for="user in pendingUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ user.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">090909099</td>
              <!-- Mock Contact -->
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer"
              >
                View Documents
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="approveUser(user.id)"
                  class="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
                >
                  Approve
                </button>
                <button
                  @click="rejectUser(user.id)"
                  class="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
                >
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Reservations -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-bold text-gray-900">Recent Reservations</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-300">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Facility
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-100 divide-y divide-gray-200">
            <tr v-for="res in allReservations.slice(0, 5)" :key="res.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getFacilityName(res.facilityId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getUserName(res.userId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ res.dates[0] }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ res.status }}</td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer"
              >
                View
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Users -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-bold text-gray-900">Recent Users</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-300">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                Account Type
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-100 divide-y divide-gray-200">
            <tr v-for="user in allUsers.slice(0, 5)" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
