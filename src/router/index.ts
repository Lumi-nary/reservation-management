import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import ClientHome from '@/views/client/ClientHome.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import ManagerDashboard from '@/views/manager/ManagerDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          name: 'home',
          component: ClientHome,
        },
        {
          path: 'admin',
          name: 'admin',
          component: AdminDashboard,
          meta: { roles: ['SystemAdmin', 'HeadSystemUser'] },
        },
        {
          path: 'manager',
          name: 'manager',
          component: ManagerDashboard,
          meta: { roles: ['FacilityManager'] },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiredRoles = to.meta.roles as string[] | undefined

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (
    requiredRoles &&
    authStore.currentUser &&
    !requiredRoles.includes(authStore.currentUser.role)
  ) {
    next('/home') // Unauthorized redirect
  } else {
    next()
  }
})

export default router
