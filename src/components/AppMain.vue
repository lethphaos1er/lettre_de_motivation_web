<script setup>
    import Intro from "@/components/main/Intro.vue";
    import Parcours from "@/components/main/Parcours.vue";
    import Projets from "@/components/main/Projets.vue";

</script>
<template>
    <div class="page">
    <header class="page-header">
      <div class="title-icon" aria-hidden="true"></div>
      <h1>Site de présentation</h1>
      <p class="subtitle">Catoul Cedric</p>
    </header>

    <main>
        <Intro />

        <Parcours />

        <Projets />
    </main>
    </div>
</template>
