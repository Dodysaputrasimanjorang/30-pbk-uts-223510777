<template>
    <Albums />
  </template>
  
  <script>
  import Albums from '../components/Albums.vue';
  
  export default {
    components: {
      Albums,
    },
  };
  </script>


<style scoped>
.container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>