<template>
    <Todos />
  </template>
  
  <script>
  import Todos from '../components/Todos.vue';
  
  export default {
    components: {
      Todos,
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