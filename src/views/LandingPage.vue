<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import NavigationBar from '@/components/NavigationBar.vue'
import { useUiStore } from '@/stores/ui'
import VerticalCarousel from '@/components/VerticalCarousel.vue'

const uiStore = useUiStore()

const modules = [EffectFade, EffectCoverflow, Autoplay, Pagination]

const heroImages = [
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450532030_806342601683290_7255572527542860329_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450373210_806342808349936_546454814317942683_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450123936_806341595016724_5298769941724312966_n.jpg',
]

const galleryImages = [
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450364515_806342581683292_1069390803256614959_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450649206_806341645016719_6292883120028933397_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450372896_806341608350056_9028218512649710235_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450664061_806341551683395_2708284143438648466_n.jpg',
  'https://csjdm.gov.ph/wp-content/uploads/2024/07/450373210_806341601683390_4628059348450583766_n.jpg',
]

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.scrollTop > 50) {
    uiStore.setScrolled(true)
  } else {
    uiStore.setScrolled(false)
  }
}
</script>

<template>
  <div
    class="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    @scroll="handleScroll"
  >
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Section 1: Hero with Background Slider -->
    <section class="h-screen w-full snap-start relative">
      <swiper
        :modules="modules"
        effect="fade"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        class="h-full w-full absolute top-0 left-0 z-0"
      >
        <swiper-slide v-for="(img, index) in heroImages" :key="index" class="h-full w-full">
          <div class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url(${img})` }">
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        </swiper-slide>

        <!-- Content Overlay inside Swiper to ensure it stays on top -->
        <div
          class="absolute inset-0 z-10 flex items-center justify-start px-8 md:px-24 pointer-events-none"
        >
          <div class="text-left text-white max-w-4xl mt-32 pointer-events-auto">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Reserve Your Perfect <br />
              <span class="text-primary-300 dark:text-primary-700">Spaces Yours</span>
            </h1>
            <p class="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
              Seamlessly book facilities, rooms, and units for your next event or stay. Experience
              convenience at your fingertips.
            </p>
            <button
              class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </swiper>
    </section>

    <!-- Section 2: Facilities -->
    <section class="h-screen w-full snap-start bg-surface relative overflow-hidden">
      <div class="w-full h-full grid grid-cols-1 md:grid-cols-2">
        <!-- Left: Text Content -->
        <div
          class="flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 h-full relative order-2 md:order-1"
        >
          <div class="space-y-8 max-w-xl">
            <div>
              <h2 class="text-4xl md:text-6xl font-bold text-primary-900 mb-4">
                Discover Our Facilities
              </h2>
              <div class="h-1.5 w-24 bg-primary-500 rounded-full"></div>
            </div>
            <p class="text-lg text-text-secondary leading-relaxed">
              Discover and reserve city-owned facilities for your events and activities. From grand
              halls for weddings to modern conference rooms for business meetings, we provide the
              perfect space for every occasion.
            </p>
            <ul class="space-y-4">
              <li class="flex items-center text-text-primary">
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Modern Amenities
              </li>
              <li class="flex items-center text-text-primary">
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Easy Booking Process
              </li>
              <li class="flex items-center text-text-primary">
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Secure & Safe Locations
              </li>
            </ul>
            <button
              class="px-8 py-3 border-2 border-primary-500 text-primary-600 font-bold rounded-full hover:bg-primary-50 transition-colors cursor-pointer"
            >
              View All Facilities
            </button>
          </div>
        </div>

        <!-- Right: Vertical Revolver Swiper -->
        <div class="h-full w-full relative order-1 md:order-2 flex items-center justify-center">
          <VerticalCarousel :items="galleryImages" />
        </div>
      </div>
    </section>

    <!-- Section 3: Gallery Swiper Carousel -->
    <section
      class="h-screen w-full snap-start bg-background flex flex-col items-center justify-center py-12 relative"
    >
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-primary-900">Gallery</h2>
        <p class="text-text-secondary mt-2">A glimpse into our beautiful spaces</p>
      </div>

      <swiper
        :modules="modules"
        effect="coverflow"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: true,
        }"
        :pagination="{ clickable: true }"
        :loop="true"
        class="w-full max-w-6xl h-[500px] px-4"
      >
        <swiper-slide
          v-for="(img, index) in galleryImages"
          :key="index"
          class="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-2xl overflow-hidden"
        >
          <img :src="img" class="w-full h-full object-cover block" />
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<style scoped>
.swiper-slide {
  background-position: center;
  background-size: cover;
}

/* Custom animation for blobs */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
