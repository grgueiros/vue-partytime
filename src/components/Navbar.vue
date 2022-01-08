<template>
  <div id="nav">
    <router-link to="/" id="logo-container">
      <img src="img/partytimelogo.png" alt="Logo de Festas" />
    </router-link>
    <h2 id="nav-title">Party Time</h2>
    <nav id="nav-links">
      <router-link to="/">Home</router-link>
      <router-link v-show="!authenticated" to="/login">Entrar</router-link>
      <router-link v-show="!authenticated" to="/registrar"
        >Cadastrar</router-link
      >
      <router-link v-show="authenticated" to="/dashboard"
        >Configurações</router-link
      >
      <router-link v-show="authenticated" to="/profile">Meu perfil</router-link>
      <button @click.prevent="logout()" v-show="authenticated">Logout</button>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({name : 'Home'})
    },
  },
  computed: {
    ...mapState(["authenticated"]),
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

#nav a {
  text-decoration: none;
}

#nav img {
  width: 35px;
}

#nav-title {
  font-size: 3rem;
  font-weight: 300;
}

#logo-container,
#nav-links {
  width: 400px;
}

#nav-links {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

button {
  background-color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #c1b696;
}
</style>