<template>
  <form
    class="contact-form"
    action="send-mail.php"
    method="post"
  >
    <div class="form-group">
      <label for="name">Nom</label>
      <input id="name" name="name" type="text" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4" required></textarea>
    </div>

    <!-- honeypot -->
    <div class="hp" aria-hidden="true">
      <input type="text" name="website" tabindex="-1" autocomplete="off">
    </div>

    <button type="submit" class="btn-submit">
      Envoyer
    </button>
  </form>
</template>
