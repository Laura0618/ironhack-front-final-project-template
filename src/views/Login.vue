

<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-blue mb-4">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-blue">Email</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-blue">Password</label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-blue duration-200 border-solid
      border-2 border-transparent hover:border-at-light-blue hover:bg-white
      hover:text-at-light-blue"
      >
        Login
      </button>

      
    </form>
  </div>
</template>

<script>
  import { useUserStore } from "../store/user";
  export default {
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    methods: {
      async login() {
        const res = await this.userStore.signIn(this.email, this.password)
        if(res === 'ok') {
          this.$router.push('/')
        }
      },
    },
  };
  </script>

