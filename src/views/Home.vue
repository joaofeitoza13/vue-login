<script lang="ts" setup>
import { useRouter } from 'vue-router';

  const router = useRouter()

  const logout = async () => {
    const res = await fetch('http://localhost:3333/logout', {
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
  <h1>Home page!</h1>
  <button @click="logout">Logout</button>
</template>

<style lang="css" scoped>
main {
  padding: 1.5rem;
}

h1 {
  margin-bottom: 1rem;
}
</style>
