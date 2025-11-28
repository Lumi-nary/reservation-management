import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export type UserRole =
  | 'SystemAdmin'
  | 'HeadSystemUser'
  | 'FacilityManager'
  | 'InternalClient'
  | 'ExternalClient'
export type UserStatus = 'Active' | 'PendingVerification' | 'Blocked'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  organization?: string // For Internal Clients
  phone?: string
  documents?: string[] // Mocked document names
}

export const useAuthStore = defineStore('auth', () => {
  // Mock Database
  const users = ref<User[]>([
    {
      id: 'admin-1',
      name: 'Sys Admin',
      email: 'admin@sys.com',
      role: 'SystemAdmin',
      status: 'Active',
      phone: '09123456789',
    },
    {
      id: 'head-1',
      name: 'Head User',
      email: 'head@sys.com',
      role: 'HeadSystemUser',
      status: 'Active',
    },
    {
      id: 'manager-1',
      name: 'Hotel Mgr',
      email: 'hotel@mgr.com',
      role: 'FacilityManager',
      status: 'Active',
    },
    {
      id: 'manager-2',
      name: 'Convention Mgr',
      email: 'conv@mgr.com',
      role: 'FacilityManager',
      status: 'Active',
    },
    {
      id: 'client-1',
      name: 'Client User',
      email: 'client@ext.com',
      role: 'ExternalClient',
      status: 'Active',
      phone: '09987654321',
    },
  ])

  const currentUser = ref<User | null>(null)

  const isAuthenticated = computed(() => !!currentUser.value)
  const isInternalClient = computed(() => currentUser.value?.role === 'InternalClient')
  const isExternalClient = computed(() => currentUser.value?.role === 'ExternalClient')
  const isManager = computed(() => currentUser.value?.role === 'FacilityManager')
  const isHeadUser = computed(() => currentUser.value?.role === 'HeadSystemUser')

  function register(details: Partial<User> & { password?: string }) {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: details.name || 'New User',
      email: details.email || '',
      role: details.role || 'ExternalClient',
      status: details.role === 'InternalClient' ? 'PendingVerification' : 'Active',
      organization: details.organization,
      documents: details.documents || [],
    }

    users.value.push(newUser)

    if (newUser.status === 'Active') {
      currentUser.value = newUser
      return { success: true, message: 'Registration successful' }
    } else {
      return { success: true, message: 'Registration submitted. Pending verification.' }
    }
  }

  function login(email: string) {
    const user = users.value.find((u) => u.email === email)
    if (user) {
      if (user.status === 'PendingVerification') {
        return { success: false, message: 'Account is pending verification.' }
      }
      if (user.status === 'Blocked') {
        return { success: false, message: 'Account is blocked.' }
      }
      currentUser.value = user
      return { success: true }
    }
    return { success: false, message: 'User not found' }
  }

  function logout() {
    currentUser.value = null
    // router.push('/login') // In a real app
  }

  // Head System User Action
  function approveUser(userId: string) {
    const user = users.value.find((u) => u.id === userId)
    if (user && user.status === 'PendingVerification') {
      user.status = 'Active'
    }
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    isInternalClient,
    isExternalClient,
    isManager,
    isHeadUser,
    register,
    login,
    logout,
    approveUser,
  }
})
