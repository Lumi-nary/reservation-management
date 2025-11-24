<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { scrolled } = storeToRefs(uiStore)
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 shadow-md transition-all duration-300"
    :class="{
      'h-20 bg-white/0 dark:bg-black/0': scrolled,
      'h-32 bg-transparent text-white shadow-none': !scrolled,
    }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
      <div class="relative flex items-center justify-between h-full">
        <!-- Left: Logo -->
        <div class="flex items-center">
          <img
            class="w-auto rounded-full transition-all duration-300"
            :class="{ 'h-16': scrolled, 'h-24': !scrolled }"
            src="https://www.census.csjdm.ph/logo/csjdm_logo.png"
            alt="SJDM Logo"
          />
        </div>

        <!-- Right: Login Button -->
        <div class="flex items-center">
          <router-link
            to="/login"
            class="rounded-full bg-primary-500 px-10 py-2 text-base font-bold text-white hover:bg-primary-600 transition-colors shadow-lg hover:shadow-primary-500/50"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
