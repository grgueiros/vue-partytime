<template>
  <Navbar />
  <router-view class="container"></router-view>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica;
  color: #444;
}

.container {
  min-height: 300px;
}

a {
  transition: 0.5s;
}

a:hover {
  color: #c1b696;
}
</style>
