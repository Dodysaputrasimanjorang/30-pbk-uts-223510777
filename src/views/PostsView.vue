<template>
    <Posts title="Posts">
      <template v-slot:additional-info>
        <p>Additional information goes here.</p>
      </template>
    </Posts>
  </template>
  
  <script>
  import Posts from '../components/Posts.vue';
  
  export default {
    components: {
      Posts,
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