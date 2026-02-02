import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '@/components/AppMain.vue'
import Contact from '@/components/main/Contact.vue'
import Lettre from '@/components/main/Lettre.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AppMain },
    { path: '/contact', component: Contact },
    { path: '/lettre', component: Lettre }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})
