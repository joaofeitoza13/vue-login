<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const email = ref('')
  const password = ref('')

  const login = async () => {
    if (!email.value || !password.value) {
      return alert('Please, fill in all fields.')
    }
    const res = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }).then(res => res.json())

    if(res.success) {
      localStorage.setItem('token', res.token)
      router.push('/')
    } else {
      alert(res.message)
    }
  }
</script>

<template>
  <main>
    <section>
      <p>Login</p>
      <form @submit.prevent="login">
        <label>
          <input type="email" v-model="email" placeholder="Email">
        </label>
        <label>
          <input type="password" v-model="password" placeholder="Password">
        </label>
        <input type="submit" value="Login" @keyup.enter="login">
        <div>
          <span>Don't have an account?</span>
          <router-link to="/register">Register</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--primary-dark);
  color: #FFF;
}

p {
  font-size: 1.625rem;
  font-weight: bold;
  padding: 1.5rem 0 .75rem 1.5rem;
  color: var(--gray-dark);
}

section {
  width: 380px;
  border-radius: .625rem;
  background-color: #FFF;
  padding: .625rem .2rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 500px;
  flex: 1 1 0%;
  color: var(--dark);
  padding: 1rem 1.5rem;
}

form>div {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  color: var(--primary);
}

form>div>span {
  color: var(--gray-dark);
  padding-right: .4rem;
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

input:not([type="submit"]) {
  width: 100%;
  display: block;
  background-color: var(--light);
  border-radius: .5rem;
  padding: 1rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark);
}

input[type="submit"] {
  display: block;
  background-color: var(--secondary);
  border-radius: .625rem;
  width: 100%;
  margin: 0 auto;
  padding: .85rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFF;
  cursor: pointer;
  transition: 0.2s ease;
}

input[type="submit"]:hover {
  background-color: var(--secondary-dark);
}
</style>