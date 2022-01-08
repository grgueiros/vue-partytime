<template>
  <input type="submit" :value="label" />
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style scoped>
input {
  width: 200px;
  margin: 0 auto;
  text-transform: uppercase;
  color: #FFF;
  background-color: #25282e;
  border: 0;
  padding: 12px;
  cursor: pointer;
  transition: .5s;
}

input:hover {
  background-color: #141619;
}
</style>