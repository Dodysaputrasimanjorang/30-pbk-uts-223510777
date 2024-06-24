<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">My App</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/todos">Todos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/posts">Posts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/albums">Albums</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
  color: rgb(0, 0, 0); 
}

.navbar {
  margin-bottom: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-nav .nav-link {
  margin-right: 10px;
  font-size: 1.1rem;
  transition: color 0.3s ease-in-out;
  color: rgb(255, 255, 255); 
  font-weight: bold; 
}

.navbar-nav .nav-link:hover {
  color: #adb5bd !important;
}

.content {
  padding: 20px;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>