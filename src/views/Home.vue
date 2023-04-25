<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const logout = async () => {
  const res = await fetch('http://localhost:3003/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_token: localStorage.getItem('token')
    })
  }).then(res => res.json())

  if(res.success) {
    localStorage.removeItem('token')
    router.push('/login')
  } else {
    alert(res.message)
  }
}
</script>

<template>
  <main>
    <section>
      <h1>Home page</h1>
      <div>
        <p>You successfully logged in, but...</p>
        <p>there is nothing to do here... yet :)</p>
        <p class="disclaimer">
          When you finish admiring this amazing design, please, feel free to logout and release the memory alocated to
          your session :)
        </p>
      </div>
      <button @click="logout">Logout</button>
      <input v-if="false" @keyup.enter="logout">
    </section>
  </main>
</template>

<style lang="css" scoped>
main {
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
  justify-content: space-around;
  height: 400px;
  width: 500px;
  border-radius: .5rem;
  background-color: #FFF;
  padding: 1.25rem 2rem;
}

h1 {
  color: var(--primary);
  font-size: 2.25rem;
}

div {
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
</style>
