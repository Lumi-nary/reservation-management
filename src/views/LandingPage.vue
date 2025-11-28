<script setup lang="ts">
import { ref } from 'vue'
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

const facilitiesImages = [
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450364515_806342581683292_1069390803256614959_n.jpg',
    name: 'Convention Center',
    description:
      'A state-of-the-art venue perfect for large gatherings, conferences, and exhibitions. Equipped with modern audio-visual technology and spacious halls to accommodate your grandest events.',
    features: [
      'Capacity: 1000+ Guests',
      'Full Air-conditioning',
      'Audio-Visual System',
      'Ample Parking',
    ],
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450649206_806341645016719_6292883120028933397_n.jpg',
    name: 'City Sports Complex',
    description:
      'A premier sports facility designed for athletes and enthusiasts. Features an Olympic-sized swimming pool, track and field oval, and indoor courts for various sports activities.',
    features: ['Olympic-size Pool', 'Rubberized Track', 'Indoor Courts', 'Shower & Locker Rooms'],
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450372896_806341608350056_9028218512649710235_n.jpg',
    name: 'Community Hall',
    description:
      'A versatile space ideal for community meetings, workshops, and intimate celebrations. Provides a comfortable and accessible environment for local gatherings.',
    features: ['Capacity: 200 Guests', 'Sound System', 'Projector & Screen', 'Kitchenette'],
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450664061_806341551683395_2708284143438648466_n.jpg',
    name: 'Public Park & Plaza',
    description:
      'An open-air recreational area featuring landscaped gardens, walking paths, and seating areas. A perfect spot for outdoor activities, relaxation, and public events.',
    features: ['Landscaped Gardens', 'Walking/Jogging Paths', 'Outdoor Stage', 'Public Restrooms'],
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450373210_806341601683390_4628059348450583766_n.jpg',
    name: 'Executive Function Room',
    description:
      'An elegant and private room suitable for board meetings, VIP receptions, and exclusive dining. Offers a sophisticated ambiance with premium amenities.',
    features: ['Capacity: 50 Guests', 'Conference Table', 'Private Restroom', 'High-speed Wi-Fi'],
  },
]

const galleryImages = [
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450364515_806342581683292_1069390803256614959_n.jpg',
    name: 'Convention Center',
    description: 'A grand venue for large-scale events and conferences.',
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450649206_806341645016719_6292883120028933397_n.jpg',
    name: 'City Sports Complex',
    description: 'World-class sports facilities for athletes and the community.',
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450372896_806341608350056_9028218512649710235_n.jpg',
    name: 'Community Hall',
    description: 'A gathering place for local events and celebrations.',
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450664061_806341551683395_2708284143438648466_n.jpg',
    name: 'Public Park & Plaza',
    description: 'Beautiful open spaces for relaxation and recreation.',
  },
  {
    url: 'https://csjdm.gov.ph/wp-content/uploads/2024/07/450373210_806341601683390_4628059348450583766_n.jpg',
    name: 'Executive Function Room',
    description: 'Premium meeting spaces for business and executive needs.',
  },
]

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.scrollTop > 50) {
    uiStore.setScrolled(true)
  } else {
    uiStore.setScrolled(false)
  }
}

const lightboxOpen = ref(false)
const currentLightboxImage = ref<{ url: string; name: string; description: string } | null>(null)

const openLightbox = (img: { url: string; name: string; description: string }) => {
  currentLightboxImage.value = img
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  currentLightboxImage.value = ''
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
        class="hero-swiper h-full w-full absolute top-0 left-0 z-0"
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
          </div>
        </div>

        <!-- Right: Vertical Revolver Swiper -->
        <div class="h-full w-full relative order-1 md:order-2 flex items-center justify-center">
          <VerticalCarousel :items="facilitiesImages" />
        </div>
      </div>
    </section>

    <!-- Section 3: Gallery of Tourist Spots -->
    <section
      class="h-screen w-full snap-start relative flex flex-col justify-center items-center overflow-hidden"
    >
      <div class="container mx-auto px-4 h-full flex flex-col justify-center">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-6xl font-bold text-primary-100 dark:text-primary-900 mb-4">
            Discovering Locations of SJDM
          </h2>
          <div class="h-1.5 w-24 bg-primary-500 rounded-full mx-auto"></div>
        </div>

        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
          :pagination="{ clickable: true }"
          class="gallery-swiper w-full h-[60vh] rounded-2xl overflow-hidden"
        >
          <swiper-slide
            v-for="(img, index) in galleryImages"
            :key="index"
            class="relative group cursor-pointer overflow-hidden rounded-2xl"
            @click="openLightbox(img)"
          >
            <img
              :src="img.url"
              :alt="img.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
            >
              <h3 class="text-white text-xl md:text-2xl font-bold">{{ img.name }}</h3>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Lightbox Modal -->
      <div
        v-if="lightboxOpen && currentLightboxImage"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click="closeLightbox"
      >
        <div
          class="relative w-full h-full bg-surface overflow-hidden shadow-2xl flex flex-col"
          @click.stop
        >
          <!-- Top 80%: Image -->
          <div class="h-[80%] w-full bg-black relative flex items-center justify-center">
            <img
              :src="currentLightboxImage.url"
              :alt="currentLightboxImage.name"
              class="max-w-full max-h-full object-contain"
            />
          </div>

          <!-- Bottom 20%: Info -->
          <div
            class="h-[20%] w-full p-6 flex flex-col justify-center items-center text-center bg-surface"
          >
            <h3 class="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-2">
              {{ currentLightboxImage.name }}
            </h3>
            <p class="text-text-secondary mb-4 line-clamp-2">
              {{ currentLightboxImage.description }}
            </p>
            <button
              class="px-6 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
              @click="closeLightbox"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-swiper .swiper-slide {
  height: 100%;
  width: 100%;
}

.gallery-swiper .swiper-slide {
  transition: transform 0.3s ease;
}

.gallery-swiper .swiper-slide:hover {
  z-index: 10;
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
