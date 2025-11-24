<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  items: string[]
}>()

const activeIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startY = ref(0)
const showLightbox = ref(false)
const lightboxImage = ref('')

// Handle wrap-around index logic
const nextItem = () => {
  activeIndex.value = (activeIndex.value + 1) % props.items.length
}

const prevItem = () => {
  activeIndex.value = (activeIndex.value - 1 + props.items.length) % props.items.length
}

// Handle Mouse Wheel Scroll
const handleWheel = (e: WheelEvent) => {
  const target = e.target as HTMLElement
  // Only scroll carousel if hovering over an image item
  if (target.closest('.carousel-item')) {
    e.preventDefault() // Prevent page scrolling
    e.stopPropagation()

    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) {
        nextItem()
      } else {
        prevItem()
      }
    }
  }
}

// Handle Touch/Drag interactions
const handleTouchStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  if ('touches' in e && e.touches.length > 0) {
    startY.value = e.touches[0].clientY
  } else if ('clientY' in e) {
    startY.value = e.clientY
  }
}

const handleTouchMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  let currentY = 0
  if ('touches' in e && e.touches.length > 0) {
    currentY = e.touches[0].clientY
  } else if ('clientY' in e) {
    currentY = e.clientY
  } else {
    return
  }

  const diff = startY.value - currentY

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextItem()
    else prevItem()
    isDragging.value = false // Reset to prevent rapid firing
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
}

const handleItemClick = (index: number) => {
  if (activeIndex.value === index) {
    lightboxImage.value = props.items[index] || ''
    showLightbox.value = true
  } else {
    activeIndex.value = index
  }
}

const closeLightbox = () => {
  showLightbox.value = false
}

onMounted(() => {
  const container = containerRef.value
  if (container) {
    // passive: false is required to use preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  const container = containerRef.value
  if (container) {
    container.removeEventListener('wheel', handleWheel)
  }
})

// Calculate styles for each item based on its distance from the active index
const getItemStyles = (index: number) => {
  const len = props.items.length
  let distance = (index - activeIndex.value + len) % len
  if (distance > len / 2) distance -= len

  // Constants for layout
  const VISIBLE_ITEMS = 2 // How many items visible on each side
  const Y_OFFSET = 140 // Vertical spacing
  const X_OFFSET = 40 // Horizontal curve amount
  const SCALE_FACTOR = 0.15
  const OPACITY_FACTOR = 0.4

  const isVisible = Math.abs(distance) <= VISIBLE_ITEMS

  if (!isVisible) return { display: 'none' }

  // Calculate properties
  const translateY = distance * Y_OFFSET
  // Create a curve: further items move slightly to the right
  const translateX = Math.abs(distance) * X_OFFSET
  const scale = 1 - Math.abs(distance) * SCALE_FACTOR
  const opacity = 1 - Math.abs(distance) * OPACITY_FACTOR
  const zIndex = 10 - Math.abs(distance)

  // Add a slight rotation for the "wheel" effect
  const rotate = distance * -5 // -5 deg per step

  return {
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
    opacity: Math.max(opacity, 0),
    zIndex: zIndex,
    position: 'absolute' as const,
    top: '50%',
    right: '20%', // Align to the right side of container
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    marginTop: '-60px', // Half height to center
  }
}
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center overflow-hidden relative"
    ref="containerRef"
    @mousedown="handleTouchStart"
    @mousemove="handleTouchMove"
    @mouseup="handleTouchEnd"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="relative w-full max-w-lg h-[80vh] flex items-center justify-end pr-12 md:pr-24">
      <div
        v-for="(item, index) in items"
        :key="index"
        :style="getItemStyles(index)"
        @click="handleItemClick(index)"
        class="carousel-item w-64 h-64 md:w-80 md:h-80 rounded-2xl p-2 cursor-pointer select-none shadow-2xl flex items-center justify-center bg-white border-4 border-white transition-colors duration-300"
        :class="{
          'ring-4 ring-primary-500 ring-offset-4 ring-offset-transparent': activeIndex === index,
          'hover:bg-gray-50': activeIndex !== index,
        }"
      >
        <img :src="item" class="w-full h-full object-cover rounded-xl" alt="Facility Image" />

        <!-- Active Indicator Line -->
        <div
          v-if="activeIndex === index"
          class="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-primary-500 to-transparent rounded-full opacity-70 hidden md:block"
        ></div>
      </div>

      <!-- Visual Guide Line -->
      <div
        class="absolute right-[20%] top-1/2 -translate-y-1/2 w-[1px] h-[600px] bg-gradient-to-b from-transparent via-primary-200 to-transparent -z-10 border-r border-dashed border-primary-200/50 rounded-[50%] opacity-40 pointer-events-none transform translate-x-[160px]"
      ></div>
    </div>

    <!-- Mobile Controls overlay -->
    <div
      class="absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:hidden z-50 pointer-events-none"
    >
      <button
        @click.stop="prevItem"
        class="pointer-events-auto p-4 rounded-full bg-white/80 backdrop-blur border border-gray-200 shadow-lg active:scale-95 transition text-primary-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
      <button
        @click.stop="nextItem"
        class="pointer-events-auto p-4 rounded-full bg-white/80 backdrop-blur border border-gray-200 shadow-lg active:scale-95 transition text-primary-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Lightbox Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showLightbox"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        @click="closeLightbox"
      >
        <div class="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
          <img
            :src="lightboxImage"
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button
            class="absolute top-4 right-4 text-white hover:text-primary-300 transition-colors"
            @click="closeLightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
