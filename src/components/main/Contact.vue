<script setup>
import { ref } from 'vue'

/**
 * Remplace XXXXXXXXX par ton endpoint Formspree
 * ex: https://formspree.io/f/abcdwxyz
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqeeeoqp'

const name = ref('')
const email = ref('')
const message = ref('')

/* Anti-spam */
const hp = ref('')              // honeypot: doit rester vide
const startedAt = Date.now()    // time-trap

/* UI */
const status = ref('idle')      // idle | sending | success | error
const feedback = ref('')

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

async function submitContact() {
  feedback.value = ''

  // Anti-spam: honeypot + temps minimum (humain)
  const elapsed = Date.now() - startedAt
  if (hp.value.trim() !== '' || elapsed < 2500) {
    status.value = 'error'
    feedback.value = "Échec de l'envoi."
    return
  }

  // Validation
  if (!name.value.trim() || !message.value.trim() || !isValidEmail(email.value)) {
    status.value = 'error'
    feedback.value = 'Merci de remplir correctement tous les champs.'
    return
  }

  status.value = 'sending'

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      })
    })

    if (!res.ok) {
      status.value = 'error'
      feedback.value = "Échec de l'envoi. Réessaie ou contacte-moi par téléphone."
      return
    }

    status.value = 'success'
    feedback.value = 'Envoi réussi. Merci, je reviens vers vous rapidement.'

    // reset
    name.value = ''
    email.value = ''
    message.value = ''
    hp.value = ''
  } catch {
    status.value = 'error'
    feedback.value = "Échec de l'envoi. Vérifie ta connexion et réessaie."
  }
}
</script>

<template>
  <main class="page">
    <section aria-labelledby="contact-title">
      <h2 id="contact-title">
        <span class="chip chip--orange" aria-hidden="true">✉</span>
        Contact
      </h2>

      <form class="contact-form" @submit.prevent="submitContact" novalidate>
        <!-- Honeypot (anti-spam) : doit rester invisible via .hp -->
        <div class="hp" aria-hidden="true">
          <label for="company">Company</label>
          <input id="company" v-model="hp" type="text" autocomplete="off" tabindex="-1" />
        </div>

        <div class="form-group">
          <label for="name">Nom</label>
          <input id="name" v-model="name" type="text" autocomplete="name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" autocomplete="email" required />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="6" required></textarea>
        </div>

        <!-- Actions alignées proprement (colonne champs) -->
        <div class="form-actions">
          <span aria-hidden="true"></span>

          <button class="btn-submit" type="submit" :disabled="status === 'sending'">
            <span v-if="status !== 'sending'">Envoyer</span>
            <span v-else>Envoi...</span>
          </button>

          <span aria-hidden="true"></span>

          <p v-if="feedback" class="form-feedback"
            :class="status === 'success' ? 'form-feedback--ok' : 'form-feedback--err'" role="status">
            {{ feedback }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
