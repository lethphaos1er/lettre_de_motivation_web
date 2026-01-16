<script setup>
import { projets } from '../../scripts/Projects.js'
</script>

<template>
  <section id="projets" aria-labelledby="projets-titre">
    <h2 id="projets-titre">
      <span class="chip chip--teal" aria-hidden="true">◆</span>
      Projets
    </h2>

    <div class="projects-table-wrapper">
      <table>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="projet in projets" :key="projet.url">
            <td>
              <a :href="projet.url" target="_blank" rel="noopener">
                {{ projet.name }}
              </a>
            </td>
            <td class="project-type">{{ projet.type }}</td>
            <td>{{ projet.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
