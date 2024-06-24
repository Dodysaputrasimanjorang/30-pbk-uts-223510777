<template>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="content p-3 rounded">
            <h3 class="text-center mb-4">Selamat Datang di Website Saya</h3>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/todos">Todo List</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/posts">Post</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/albums">Album</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    min-height: 100vh; 
    display: flex;
    align-items: center; 
    justify-content: center; 
    background-color: #000000; 
    color: white; 
    text-align: center;
  }
  
  .content {
    max-width: 800px; 
    width: 100%; 
    padding: 20px;
  }
  
  .nav {
    padding-left: 0;
    list-style: none;
    text-align: center; 
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  h3.text-center {
    margin-bottom: 20px;
  }
  </style>