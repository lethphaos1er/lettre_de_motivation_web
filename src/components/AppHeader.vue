<script setup>
import { menu } from '@/scripts/Menu'

</script>

<template>
  <header class="site-header">
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

      <nav class="main-nav" aria-label="Navigation principale">
        <ul class="nav-list">
          <li v-for="item in menu" :key="item.name">
            <a :href="`#${item.anchor}`">{{ item.name }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
