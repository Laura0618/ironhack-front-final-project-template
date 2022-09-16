<template>
  <Login v-if="login" @navigate="login = !login" />
  <Register v-else @navigate="login = !login" />
</template>

<script>
import Register from "./Register.vue";
import Login from "./Login.vue";

export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
        login: true
    }
  },
  
};
</script>

<style></style>
