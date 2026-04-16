<template>
  <section class="min-h-screen bg-gradient-to-b from-[#F2884B] via-[#F266B3] to-white py-20 px-4 flex flex-col items-center">

    <h2 class="text-4xl md:text-5xl font-caprasimo mb-3 text-center text-white drop-shadow-lg">Contáctanos</h2>
    <p class="text-center mb-12 text-lg md:text-xl font-light text-white/90 max-w-xl">
      Síguenos en redes y entérate de promociones, eventos y mucho más.
    </p>

    <!-- Cards de redes sociales -->
    <div class="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        class="flex flex-col items-center gap-3 p-6 rounded-2xl text-white font-semibold shadow-lg transition duration-300 hover:scale-105"
        :style="{ backgroundColor: social.color }"
        :aria-label="`Visitar ${social.name}`"
      >
        <img :src="social.image" :alt="`logo de ${social.name}`" class="w-10 h-10 object-contain">
        <span class="text-lg">{{ social.name }}</span>
        <span class="text-xs font-normal text-white/70 text-center">{{ social.description }}</span>
      </a>
    </div>

    <!-- Sección de embeds -->
    <div class="w-full">
      <h3 class="text-2xl font-caprasimo text-white text-center mb-8 drop-shadow">Nuestro contenido</h3>
      <div ref="embedsSection" class="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-10">

        <!-- Instagram -->
        <div class="w-full max-w-[540px] aspect-[9/16] bg-white overflow-hidden rounded-2xl shadow-lg">
          <blockquote class="instagram-media w-full h-full" data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DMdxrQPvxx4/" data-instgrm-version="14"
            style="border:0; margin:0; padding:0;">
          </blockquote>
        </div>

        <!-- TikTok -->
        <div class="w-full max-w-[540px] aspect-[9/16] bg-white overflow-hidden rounded-2xl shadow-lg">
          <blockquote class="tiktok-embed w-full h-full"
            cite="https://www.tiktok.com/@que_hay_en_ags/video/7521888351587142929" data-video-id="7521888351587142929"
            style="border:0; margin:0; padding:0; max-width:100%; min-width:100%; height:100%;">
            <div>
              <a target="_blank" title="@que_hay_en_ags" href="https://www.tiktok.com/@que_hay_en_ags?refer=embed">
                @que_hay_en_ags
              </a>
              El día de hoy acompáñanos a visitar HoneyPop 📍
            </div>
          </blockquote>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import igLogo from '@/assets/images/ig-logo.webp'
import fbLogo from '@/assets/images/fb-logo.webp'
import ttLogo from '@/assets/images/tt-logo.webp'

const embedsSection = ref(null)

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/honeypop.postrecito?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    image: igLogo,
    description: 'Fotos y reels de nuestros postrecitos',
    color: '#C13584',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61576826434460',
    image: fbLogo,
    description: 'Noticias y promociones',
    color: '#1877F2',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@honeypop.ags?is_from_webapp=1&sender_device=pc',
    image: ttLogo,
    description: 'Videos y tendencias',
    color: '#010101',
  },
]

const loadEmbeds = () => {
  if (window.instgrm) {
    window.instgrm.Embeds.process()
  } else {
    const igScript = document.createElement('script')
    igScript.src = 'https://www.instagram.com/embed.js'
    igScript.async = true
    document.body.appendChild(igScript)
  }

  if (!window.tiktok) {
    const ttScript = document.createElement('script')
    ttScript.src = 'https://www.tiktok.com/embed.js'
    ttScript.async = true
    document.body.appendChild(ttScript)
  }
}

onMounted(() => {
  // Lazy load: solo cargar embeds cuando la sección sea visible
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadEmbeds()
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (embedsSection.value) {
    observer.observe(embedsSection.value)
  }
})
</script>