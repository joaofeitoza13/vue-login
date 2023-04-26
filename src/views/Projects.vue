<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Project {
  id: number;
  name: string;
  full_name: string;
  description: string;
  languages: Record<string, number>;
  private: boolean;
  url: string;
}


const router = useRouter()
const projectList = ref<Project[]>([])

const fetchProjects = async () => {
  const res = await fetch('http://localhost:3003/projects', {
    method: 'GET'
  });
  const data = await res.json();
  projectList.value = data;
}

const backToHome = () => {
  router.push('/')
}

onBeforeMount(() => {
  fetchProjects()
})
</script>

<template>
  <main>
    <section>
      <header class="projects-header">
        <h1>Projects</h1>
        <button @click=backToHome>Back to home</button>
      </header>
      <section class="projects-content">
        <ul class="projects-list">
          <li class="projects-item" v-for="project in projectList" :key="project.id">
            <ul class="lang-list">
              <li class="lang-item" v-for="(langCode, langName) in project.languages" :key="langCode">
                <p>{{ langName }}</p>
              </li>
            </ul>
            <a class="project-name" :href=project.url target="_blank">{{ project.name }}</a>
            <p class="project-desc">{{ project.description }}</p>
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
  height: 100%;
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

.projects-header {
  display: flex;
  justify-content: space-between;
}

.projects-header button {
  margin: 0;
  display: block;
  background-color: var(--secondary);
  width: 20%;
  padding: .85rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFF;
  cursor: pointer;
  transition: 0.2s ease;
}

.projects-header button:hover {
  background-color: var(--secondary-dark);
}

.projects-list {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: repeat(3, 200px);
  gap: .8625rem;
  list-style: none;
}

.projects-item {
  background-color: var(--primary-dark);
  border-radius: .525rem;
  padding: .625rem;
}

.lang-list {
  display: flex;
  align-items: center;
  gap: .2rem;
  padding: .1rem .1rem .425rem .1rem;
}

.lang-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);
  padding: .115rem .415rem .1rem .415rem;
  border-radius: .45rem;
}

.lang-item p {
  display: flex;
  align-items: center;
  height: .825rem;
  font-size: .6215rem;
  font-weight: bold;
  color: var(--primary);
  text-transform: uppercase;
}

.projects-item .project-name {
  font-weight: 600;
  text-decoration: none;
}

.projects-item .project-name:link {
  color: var(--light)
}

.projects-item .project-name:visited {
  color: var(--grey)
}

.projects-item .project-desc {
  padding-top: .3rem;
}
</style>
