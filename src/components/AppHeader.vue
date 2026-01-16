<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { menu } from '@/scripts/Menu.js'

const isOpen = ref(false)
const headerRef = ref(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function onClickOutside(event) {
  if (!isOpen.value) return
  const el = headerRef.value
  if (!el) return
  if (!el.contains(event.target)) closeMenu()
}

function onKeyDown(event) {
  if (!isOpen.value) return
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <header ref="headerRef" class="site-header">
    <div class="site-header-inner">
      <div class="logo-title">
        <span class="logo-pixel" aria-hidden="true"></span>
        <span>BES Web Dev – Candidature</span>

        <span class="loader-header" aria-hidden="true">
          <span class="loader-pixel"></span>
          <span class="loader-pixel"></span>
          <span class="loader-pixel"></span>
        </span>
        <span class="sr-only">Chargement visuel</span>
      </div>

      <!-- MENU DESKTOP (visible >= md) -->
      <nav class="main-nav main-nav--desktop" aria-label="Navigation principale">
        <ul class="nav-list">
          <li v-for="item in menu" :key="item.anchor">
            <a :href="`#${item.anchor}`">{{ item.name }}</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      <!-- HAMBURGER (visible seulement < md) -->
      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="primary-nav"
        @click="toggleMenu"
      >
        <span class="sr-only">Ouvrir le menu</span>
        <span class="burger" aria-hidden="true"></span>
      </button>
    </div>

    <!-- MENU MOBILE (animé) -->
    <transition name="nav-slide">
      <nav
        v-if="isOpen"
        id="primary-nav"
        class="main-nav main-nav--mobile"
        aria-label="Menu mobile"
      >
        <ul class="nav-list nav-list--mobile">
          <li v-for="item in menu" :key="item.anchor">
            <a :href="`#${item.anchor}`" @click="closeMenu">{{ item.name }}</a>
          </li>
          <li>
            <a href="/contact" @click="closeMenu">Contact</a>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>
