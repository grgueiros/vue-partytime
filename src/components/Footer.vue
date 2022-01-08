<template>
  <footer>
    <h3>Party time &copy; 2021</h3>
    <p>O melhor local para compartilhar eventos</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
  footer {
    background-color: #25282E;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  footer h3 {
    color: #FFF;
    font-weight: 300;
    font-size: 1.6rem;
    margin-bottom: 15px;
  }

  footer p {
    color: #c1B696;
  }

</style>