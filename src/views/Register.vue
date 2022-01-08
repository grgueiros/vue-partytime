<template>
  <div class="register">
    <h1>Criar uma conta</h1>
    <user-form :user="{}" page="registrar" btnText="cadastrar"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue';
export default {
  components: { UserForm },
  name: "Register",
};
</script>

<style scoped>
.register {
  text-align: center;
  padding: 40px 0 100px;
}

.register h1 {
  margin-bottom: 40px;
}
</style>