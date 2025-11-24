import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useFacilityStore } from './facility'

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Denied'

export interface Reservation {
  id: string
  facilityId: string
  userId: string
  dates: string[]
  status: ReservationStatus
  totalFee: number
  reason?: string // For Internal Clients
  createdAt: string
}

export const useReservationStore = defineStore('reservation', () => {
  const authStore = useAuthStore()
  const facilityStore = useFacilityStore()

  const reservations = ref<Reservation[]>([])

  function createReservation(facilityId: string, dates: string[], reason?: string) {
    if (!authStore.currentUser) return { success: false, message: 'Not logged in' }

    const facility = facilityStore.facilities.find((f) => f.id === facilityId)
    if (!facility) return { success: false, message: 'Facility not found' }

    // Check availability
    const isBlocked = dates.some((date) => facility.blockedDates.includes(date))
    const isBooked = reservations.value.some(
      (r) =>
        r.facilityId === facilityId &&
        r.status === 'Confirmed' &&
        r.dates.some((d) => dates.includes(d)),
    )

    if (isBlocked || isBooked) {
      return { success: false, message: 'Selected dates are not available.' }
    }

    const isInternal = authStore.isInternalClient
    const fee = isInternal ? 0 : facility.price * dates.length
    const initialStatus: ReservationStatus = isInternal ? 'Pending' : 'Confirmed'

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      facilityId,
      userId: authStore.currentUser.id,
      dates,
      status: initialStatus,
      totalFee: fee,
      reason: isInternal ? reason : undefined,
      createdAt: new Date().toISOString(),
    }

    reservations.value.push(newReservation)
    return {
      success: true,
      message: isInternal ? 'Request sent for approval.' : 'Reservation confirmed!',
    }
  }

  function approveReservation(reservationId: string) {
    const res = reservations.value.find((r) => r.id === reservationId)
    if (res && res.status === 'Pending') {
      res.status = 'Confirmed'
    }
  }

  function denyReservation(reservationId: string) {
    const res = reservations.value.find((r) => r.id === reservationId)
    if (res && res.status === 'Pending') {
      res.status = 'Denied'
    }
  }

  function cancelReservation(reservationId: string) {
    const res = reservations.value.find((r) => r.id === reservationId)
    if (res) {
      res.status = 'Cancelled'
    }
  }

  // Getters
  const getPendingReservations = computed(() =>
    reservations.value.filter((r) => r.status === 'Pending'),
  )

  function getReservationsByManager(managerId: string) {
    // Find facilities managed by this manager
    const managerFacilityIds = facilityStore.facilities
      .filter((f) => f.managerId === managerId)
      .map((f) => f.id)

    return reservations.value.filter((r) => managerFacilityIds.includes(r.facilityId))
  }

  return {
    reservations,
    createReservation,
    approveReservation,
    denyReservation,
    cancelReservation,
    getPendingReservations,
    getReservationsByManager,
  }
})
