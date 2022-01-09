<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form
      id="user-form"
      @submit.prevent="
        page === 'registrar' ? onRegisterSubmit($event) : onUpdateSubmit($event)
      "
    >
      <div class="input-container">
        <label for="name">Nome:</label>
        <input
          id="name"
          name="name"
          type="text"
          v-model="name"
          placeholder="Digite o seu nome..."
        />
      </div>
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
      <div class="input-container">
        <label for="confirmPassword">Nome:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirme sua senha"
        />
      </div>
      <InputSubmit :label="btnText" />
    </form>
  </div>
</template>

<script>
import InputSubmit from "./form/InputSubmit.vue";
import Message from "./Message.vue";

export default {
  name: "UserForm",
  props: {
    user: Object,
    btnText: String,
    page: String,
  },
  data() {
    return {
      name: this.user.name || "",
      email: this.user.email || "",
      password: "",
      confirmPassword: "",
      msg: null,
      msgClass: null,
    };
  },
  components: {
    InputSubmit,
    Message,
  },

  methods: {
    async onRegisterSubmit() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const userToSend = JSON.stringify(user);

      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userToSend,
      });

      if (res.status === 201) {
        const createdUser = await res.json();

        const { token, userId } = createdUser;

        this.msg = "Usuário criado com sucesso";
        this.msgClass = "success";
        this.$store.commit("authenticate", { token, userId });
        this.$router.push({ name: "Dashboard" });
        return;
      }

      this.msg =
        "Erro ao criar usuário. Verifique sua conexão e tente novamente";
      this.msgClass = "error";
    },

    async onUpdateSubmit() {
      const { userId: id, token } = this.$store.getters;

      const userToUpdate = {
        id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const res = await fetch("http://localhost:8000/api/users", {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        this.msg = "Usuário editado com sucesso"
        this.msgClass = "success"
        return
      }

      this.msg = "Erro ao salvar o usuário. Por favor tente novamente";
      this.msgClass = "error";
    },
  },
};
</script>

<style scoped>
#user-form {
  max-width: 400px;
  margin: 0 auto;
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