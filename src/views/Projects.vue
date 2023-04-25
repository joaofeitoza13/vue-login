<script lang="ts" setup>
import { ref } from 'vue';

interface Project {
  id: number;
  name: string;
  full_name: string;
  description: string;
  languages: Record<string, number>;
  private: boolean;
}

const projectList = ref<Project[]>([])

const fetchProjects = async () => {
  const res = await fetch('http://localhost:3003/projects', {
    method: 'GET'
  });
  const data = await res.json();
  projectList.value = data;
}



</script>

<template>
  <main>
    <section>
      <header class="projects-header">
        <h1>Projects page</h1>
        <button @click=fetchProjects>Fetch</button>
      </header>
      <section class="projects-content">
        <ul class="projects-list">
          <li class="projects-item" v-for="project in projectList" :key="project.id">
            <p class="item-name">{{ project.name }}</p>
            <p class="item-desc">{{ project.description }}</p>
            <ul class="languages-list">
              <li class="languages-item" v-for="(langCode, langName) in project.languages" :key="langCode">
                <p>{{ langName }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>

<style lang="css" scoped>
main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
  background-color: var(--primary-dark);
  color: #FFF;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: auto;
  border-radius: .5rem;
  background-color: #FFF;
  padding: 1.25rem 2rem;
}

h1 {
  color: var(--primary);
  font-size: 2.25rem;
}

.projects-content {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 1rem;
  line-height: 1.825rem;
}

p {
  font-size: 1.15rem;
  font-weight: bold;
  color: var(--primary);
}

label {
  display: block;
  margin-bottom: 1.5rem;
}

label span {
  display: block;
  color: var(--gray);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: .5rem;
}

button {
  display: block;
  width: 100%;
  background-color: var(--secondary);
  border: none;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: .85rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFF;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background-color: var(--secondary-dark);
}

.projects-header {
  display: flex;
  justify-content: space-between;
}

.projects-header button {
  margin: 0;
  width: 40%;
}

.projects-list {
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 300px 300px;
  gap: 1.15rem;
  list-style: none;
}

.projects-item {
  background-color: var(--primary-dark);
  border-radius: .3rem;
  padding: 1rem;
}

.languages-list {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.languages-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);
  min-width: 2rem;
  padding: .115rem .215rem .1rem .215rem;
  border-radius: .45rem;
}

.languages-item>p {
  display: flex;
  align-items: center;
  height: .825rem;
  font-size: .5125rem;
  text-transform: uppercase;
}
</style>
