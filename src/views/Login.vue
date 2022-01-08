<template>
  <div>
    <message :msg="msg" :msgClass="msgClass" />
    <form id="login-form" @submit.prevent="login">
      <div class="input-container">
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          v-model="email"
          placeholder="exemplo@email.com.br"
        />
      </div>
      <div class="input-container">
        <label for="password">Senha:</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
          placeholder="Digite sua senha"
        />
      </div>
      <input-submit label="Log in" />
    </form>
  </div>
</template>

<script>
import InputSubmit from "../components/form/InputSubmit.vue";
import Message from "../components/Message.vue";

export default {
  components: { InputSubmit, Message },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      msg: null,
      msgClass: null
    };
  },
  methods: {
    async login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })

      if(res.status === 200) {
        const loggedUser = await res.json()
        const { userId, token } = loggedUser

        this.$store.commit('authenticate', { token, userId })
        return this.$router.push('/')
      }
      this.msg = 'Usuário e/ou senha inválidos. Tente novamente'
      this.msgClass = 'error'

    },
  },
};
</script>

<style scoped>
#login-form {
  max-width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

.input-container label {
  margin-bottom: 10px;
  color: #555;
}

.input-container input {
  padding: 10px;
  border: 1px solid #e8e8e8;
}
</style>