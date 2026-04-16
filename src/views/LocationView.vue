<template>
<section class="bg-white py-16 px-4 flex flex-col items-center text-center">
    <h2 class="text-4xl font-caprasimo text-pink-500 mb-3">¿Dónde encontrarnos?</h2>
    <p class="text-lg text-gray-500 max-w-xl mb-8 font-light">
      Te esperamos con los postres más deliciosos de Aguascalientes.
    </p>

    <!-- Info cards -->
    <div class="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

      <!-- Dirección -->
      <div class="flex flex-col items-center gap-2 bg-pink-50 border border-pink-100 rounded-2xl p-4">
        <span class="text-3xl">📍</span>
        <p class="text-sm font-semibold text-gray-700">Dirección</p>
        <p class="text-xs text-gray-500 leading-relaxed">Calle del Codo 225, Zona Centro, 20000, Aguascalientes, Ags.</p>
      </div>

      <!-- Horario -->
      <div class="flex flex-col items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl p-4">
        <span class="text-3xl">⏰</span>
        <p class="text-sm font-semibold text-gray-700">Horario</p>
        <p class="text-xs text-gray-500 leading-relaxed">Lun – Vie: 12:00 – 20:00<br>Sáb – Dom: 10:00 – 21:00</p>
      </div>

      <!-- WhatsApp -->
      <div class="flex flex-col items-center gap-2 bg-green-50 border border-green-100 rounded-2xl p-4">
        <span class="text-3xl">💬</span>
        <p class="text-sm font-semibold text-gray-700">WhatsApp</p>
        <a
          href="https://wa.me/524491234567"
          target="_blank"
          class="text-xs text-green-600 font-semibold hover:underline"
        >
          +52 449 123 4567
        </a>
      </div>
    </div>

    <!-- Mapa -->
    <div class="w-full max-w-4xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-pink-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.3819155545643!2d-102.30021015100135!3d21.881364341026032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ef9751c28be7%3A0x5036b1340243c4f9!2shoneypop!5e0!3m2!1ses!2smx!4v1753339013914!5m2!1ses!2smx"
        width="100%" height="100%" style="border:0;" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <a
      href="https://www.google.com/maps/place/Calle+del+Codo+225,+Zona+Centro,+Aguascalientes,+Ags."
      target="_blank"
      class="mt-6 inline-flex items-center gap-2 text-white bg-pink-500 hover:bg-pink-600 transition-colors px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition-transform duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      Ver en Google Maps
    </a>
  </section>
</template>