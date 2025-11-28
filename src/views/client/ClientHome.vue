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
    <div class="relative rounded-2xl overflow-hidden shadow-xl h-80 group">
      <!-- Background Image -->
      <img
        src="https://csjdm.gov.ph/wp-content/uploads/2024/07/450364515_806342581683292_1069390803256614959_n.jpg"
        alt="Conference Hall"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      <!-- Content -->
      <div class="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          New State-of-the-Art<br />Conference Hall Now Open!
        </h2>
        <p class="text-gray-200 text-lg max-w-2xl mb-8">
          Explore our new high-tech facility for your next event. Equipped with the latest
          audio-visual technology and premium amenities.
        </p>
        <button
          @click="startBooking"
          class="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/30 transform hover:-translate-y-1 w-fit"
        >
          Make a New Reservation
        </button>
      </div>
    </div>

    <!-- Upcoming Reservations -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-text-primary">Upcoming Reservations</h3>
        <button
          @click="startBooking"
          class="text-primary-600 font-semibold hover:underline text-sm"
        >
          + Book Facility
        </button>
      </div>

      <div
        v-if="upcomingReservations.length === 0"
        class="text-text-muted italic bg-surface p-8 rounded-xl text-center border border-dashed border-border"
      >
        No upcoming reservations.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="res in upcomingReservations"
          :key="res.id"
          class="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border"
        >
          <div class="flex justify-between items-start mb-4">
            <span
              class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-yellow-100 text-yellow-800"
            >
              PENDING APPROVAL
            </span>
            <span class="text-xs text-text-muted">{{ res.dates[0] }}</span>
          </div>
          <h4 class="text-lg font-bold text-text-primary mb-2">
            {{ getFacilityName(res.facilityId) }}
          </h4>
          <div class="space-y-1 text-sm text-text-secondary">
            <p><span class="font-medium">Time:</span> 9:00 AM - 5:00 PM</p>
            <p><span class="font-medium">Details:</span> {{ res.reason || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Past Reservations -->
    <div>
      <h3 class="text-2xl font-bold text-text-primary mb-6">Past Reservations</h3>
      <div
        v-if="pastReservations.length === 0"
        class="text-text-muted italic bg-surface p-8 rounded-xl text-center border border-dashed border-border"
      >
        No past reservations.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="res in pastReservations"
          :key="res.id"
          class="bg-surface p-6 rounded-xl shadow-sm opacity-75 hover:opacity-100 transition-opacity border border-border"
        >
          <div class="flex justify-between items-start mb-4">
            <span
              class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-green-100 text-green-800"
            >
              COMPLETED
            </span>
            <span class="text-xs text-text-muted">{{ res.dates[0] }}</span>
          </div>
          <h4 class="text-lg font-bold text-text-primary mb-2">
            {{ getFacilityName(res.facilityId) }}
          </h4>
          <div class="space-y-1 text-sm text-text-secondary">
            <p><span class="font-medium">Time:</span> 9:00 AM - 5:00 PM</p>
            <p><span class="font-medium">Details:</span> {{ res.reason || 'N/A' }}</p>
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
