import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Facility {
  id: string
  name: string
  type: 'Room' | 'ConventionCenter' | 'Unit'
  managerId: string
  capacity: number
  price: number // Per day/unit
  description: string
  blockedDates: string[] // ISO date strings
}

export const useFacilityStore = defineStore('facility', () => {
  const facilities = ref<Facility[]>([
    {
      id: 'fac-1',
      name: 'Grand Ballroom',
      type: 'ConventionCenter',
      managerId: 'manager-2',
      capacity: 500,
      price: 5000,
      description: 'Large hall for events',
      blockedDates: [],
    },
    {
      id: 'fac-2',
      name: 'Deluxe Room 101',
      type: 'Room',
      managerId: 'manager-1',
      capacity: 2,
      price: 150,
      description: 'Standard deluxe room',
      blockedDates: [],
    },
  ])

  function addFacility(facility: Facility) {
    facilities.value.push(facility)
  }

  function blockDate(facilityId: string, date: string) {
    const facility = facilities.value.find((f) => f.id === facilityId)
    if (facility) {
      facility.blockedDates.push(date)
    }
  }

  function unblockDate(facilityId: string, date: string) {
    const facility = facilities.value.find((f) => f.id === facilityId)
    if (facility) {
      facility.blockedDates = facility.blockedDates.filter((d) => d !== date)
    }
  }

  function getFacilitiesByManager(managerId: string) {
    return facilities.value.filter((f) => f.managerId === managerId)
  }

  return {
    facilities,
    addFacility,
    blockDate,
    unblockDate,
    getFacilitiesByManager,
  }
})
