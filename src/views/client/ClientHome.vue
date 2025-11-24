<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFacilityStore } from '@/stores/facility'
import { useReservationStore } from '@/stores/reservation'
import { useAuthStore } from '@/stores/auth'
import FacilityCard from '@/components/facility/FacilityCard.vue'
import type { Facility } from '@/stores/facility'

const facilityStore = useFacilityStore()
const reservationStore = useReservationStore()
const authStore = useAuthStore()

const facilities = computed(() => facilityStore.facilities)
const myReservations = computed(() => {
  if (!authStore.currentUser) return []
  return reservationStore.reservations.filter((r) => r.userId === authStore.currentUser?.id)
})

const upcomingReservations = computed(() => {
  const now = new Date().toISOString().split('T')[0] || ''
  return myReservations.value.filter(
    (r) => r.dates.some((d) => d >= now) && r.status !== 'Cancelled',
  )
})

const pastReservations = computed(() => {
  const now = new Date().toISOString().split('T')[0] || ''
  return myReservations.value.filter(
    (r) => r.dates.every((d) => d < now) || r.status === 'Cancelled',
  )
})

// Booking Modal Logic
const showBookingModal = ref(false)
const showFacilityList = ref(false)
const selectedFacility = ref<Facility | null>(null)
const bookingDates = ref('')
const bookingReason = ref('')

const startBooking = () => {
  showFacilityList.value = true
}

const selectFacility = (facility: Facility) => {
  selectedFacility.value = facility
  showFacilityList.value = false
  showBookingModal.value = true
}

const submitBooking = () => {
  if (!selectedFacility.value) return

  const dates = bookingDates.value.split(',').map((d) => d.trim())
  const result = reservationStore.createReservation(
    selectedFacility.value.id,
    dates,
    bookingReason.value,
  )

  alert(result.message)
  if (result.success) {
    showBookingModal.value = false
    bookingDates.value = ''
    bookingReason.value = ''
  }
}

const getFacilityName = (id: string) =>
  facilityStore.facilities.find((f) => f.id === id)?.name || 'Unknown'
</script>

<template>
  <div class="space-y-8">
    <!-- Hero / Announcement Section -->
    <div
      class="bg-gray-900 text-white p-8 rounded-lg shadow-lg h-64 flex flex-col justify-center relative overflow-hidden"
    >
      <div class="relative z-10">
        <h2 class="text-3xl font-bold mb-2">New Facility / Announcement</h2>
        <p class="text-gray-300 max-w-xl">
          Check out our newly renovated Convention Center! Now available for booking with increased
          capacity and modern amenities.
        </p>
      </div>
      <!-- Decorative circle from wireframe -->
      <div class="absolute -right-10 -top-10 w-64 h-64 bg-gray-800 rounded-full opacity-50"></div>
    </div>

    <!-- CTA Section -->
    <div class="bg-black text-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <h3 class="text-xl font-semibold">Ready to book?</h3>
      <button
        @click="startBooking"
        class="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition"
      >
        Make a new Reservation
      </button>
    </div>

    <!-- Upcoming Reservations -->
    <div>
      <h3 class="text-2xl font-bold mb-4 text-gray-800">Upcoming Reservations</h3>
      <div v-if="upcomingReservations.length === 0" class="text-gray-500 italic">
        No upcoming reservations.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="res in upcomingReservations"
          :key="res.id"
          class="bg-gray-200 p-4 rounded-lg border-l-4 border-gray-800"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">{{
              res.status
            }}</span>
          </div>
          <h4 class="text-lg font-bold text-gray-900">{{ getFacilityName(res.facilityId) }}</h4>
          <div class="mt-2 text-sm text-gray-700">
            <p><span class="font-semibold">Date:</span> {{ res.dates.join(', ') }}</p>
            <p v-if="res.totalFee > 0">
              <span class="font-semibold">Fee:</span> ${{ res.totalFee }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Past Reservations -->
    <div>
      <h3 class="text-2xl font-bold mb-4 text-gray-800">Past Reservations</h3>
      <div v-if="pastReservations.length === 0" class="text-gray-500 italic">
        No past reservations.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="res in pastReservations"
          :key="res.id"
          class="bg-gray-200 p-4 rounded-lg opacity-75"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">{{
              res.status
            }}</span>
          </div>
          <h4 class="text-lg font-bold text-gray-900">{{ getFacilityName(res.facilityId) }}</h4>
          <div class="mt-2 text-sm text-gray-700">
            <p><span class="font-semibold">Date:</span> {{ res.dates.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Facility Selection Modal -->
    <div
      v-if="showFacilityList"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold">Select a Facility</h3>
          <button @click="showFacilityList = false" class="text-gray-500 hover:text-gray-700">
            <span class="text-2xl">&times;</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FacilityCard
            v-for="facility in facilities"
            :key="facility.id"
            :facility="facility"
            @book="selectFacility"
          />
        </div>
      </div>
    </div>

    <!-- Booking Form Modal -->
    <div
      v-if="showBookingModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">Book {{ selectedFacility?.name }}</h3>

        <form @submit.prevent="submitBooking" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Dates (YYYY-MM-DD, comma separated)</label
            >
            <input
              v-model="bookingDates"
              type="text"
              placeholder="2025-11-20, 2025-11-21"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Reason (Required for Government)</label
            >
            <textarea
              v-model="bookingReason"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              @click="showBookingModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
