<template>
  <div class="profile">
    <h1>Editar Perfil</h1>
    <user-form
      :user="user"
      page="perfil"
      btnText="Editar"
      :key="componentKey"
    />
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";

export default {
  components: { UserForm },
  name: "Perfil",
  data() {
    return {
      user: {},
      componentKey: 0,
    };
  },

  async created() {
    const id = this.$store.getters.userId;
    const token = this.$store.getters.token;

    try {
      const res = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        this.user = await res.json();
        this.componentKey++;
        return;
      }

      console.log(await res.json());
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>

<style scoped>
.profile {
  text-align: center;
  padding: 40px 0 100px;
}

.profile h1 {
  margin-bottom: 40px;
}
</style>