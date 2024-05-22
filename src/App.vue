<template>
  <div class="container-yellow">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar p-3 rounded">
          <h3 class="text-center">Selamat Datang di Website Saya</h3>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" @click="activeTab = 'todoList'">Todo List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="activeTab = 'post'">Post</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <Todos v-if="activeTab === 'todoList'" />
        <Posts v-else-if="activeTab === 'post'" title="Posts">
          <template v-slot:additional-info>
            <p>Additional information goes here.</p>
          </template>
        </Posts>
      </div>
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  name: 'App',
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      activeTab: 'todoList'
    };
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
}

.container-yellow {
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(104, 95, 156, 0.1);
}

.sidebar {
  background-color: #007bff;
  color: #fff;
}

.sidebar h3 {
  color: #fff;
}

.nav-link {
  color: #fff;
  cursor: pointer;
}

.nav-link:hover {
  color: #dee2e6;
}

.nav-link.active {
  font-weight: bold;
}

.col-md-9 {
  padding: 20px;
}

@media (max-width: 768px) {
  .col-md-9 {
    margin-top: 20px;
  }
}

</style>
