import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const scrolled = ref(false)

  function setScrolled(value: boolean) {
    scrolled.value = value
  }

  return { scrolled, setScrolled }
})
