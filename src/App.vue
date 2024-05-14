<template>
  <div class="container-yellow">
    <div class="row">
      <div class="col-md-3">      
        <div class="sidebar">
          <h3>Selamat Datang di Website Saya</h3>
          <ul>
            <li><a @click="showTodoList">Todo List</a></li>
            <li><a @click="showPost">Post</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div v-if="activeTab === 'todoList'">
          <h2 class="text-center mt-5">Aplikasi Todo</h2>
          <div class="d-flex">
            <input v-model="task" type="text" placeholder="Enter task" class="form-control">
            <button @click="submitTask" class="btn btn-warning rounded-0">SUBMIT</button>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <button @click="filterTasks('all')" class="btn btn-secondary me-2">All</button>
            <button @click="filterTasks('finished')" class="btn btn-secondary me-2">Finished</button>
          </div>
          <table class="table table-bordered mt-5" v-if="filteredTasks.length > 0">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col" class="text-center">Status</th>
                <th scope="col" class="text-center">Edit</th>
                <th scope="col" class="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in filteredTasks" :key="index">
                <td>
                  <input type="checkbox" v-model="task.completed" @change="toggleCompletion(task)">
                  <span :class="{'finished': task.status === 'finished'}">{{ task.name }}</span>
                </td>
                <td style="width: 120px">
                  <span @click="changeStatus(index)" class="pointer">
                    {{ firstCharUpper(task.status) }}
                  </span>
                </td>
                <td>
                  <div class="text-center" @click="editTask(index)">
                    <span class="fa fa-pen">Edit</span>
                  </div>
                </td>
                <td>
                  <div class="text-center" @click="deleteTask(index)">
                    <span class="fa fa-trash">Delete</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h2 class="text-center mt-5">Post</h2>
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-if="!loading && posts.length === 0" class="text-center">No posts available</div>

          <div class="d-flex justify-content-center mt-3">
            <select v-model="selectedUserId" @change="filterPostsByUser">
              <option value="" disabled selected>Select a user</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
            <button @click="resetFilter" class="btn btn-warning rounded-0 ms-2">Reset</button>
          </div>

          <ul v-if="!loading && filteredPosts.length > 0">
            <li v-for="post in filteredPosts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
              <p><strong>Author:</strong> {{ getUser(post.userId).name }}</p>
            </li>
          </ul>
          <div v-if="!loading && filteredPosts.length === 0" class="text-center">No posts match your search</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      task: '',
      editedTask: null,
      availableStatuses: ['to-do', 'in-progress', 'finished'],
      tasks: [],
      filteredTasks: [],
      filterStatus: 'all',
      activeTab: 'todoList',
      users: [],
      posts: [],
      filteredPosts: [],
      searchQuery: '',
      loading: false,
      selectedUserId: null
    };
  },
  methods: {
    submitTask() {
      if (this.task.length === 0) return;

      if (this.editedTask === null) {
        this.tasks.push({
          name: this.task,
          status: 'to-do',
          completed: false, 
        });
      } else {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      }
      this.task = '';
      this.filterTasks('all');
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.filterTasks('all');
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },
    changeStatus(index) {
      let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatuses[newIndex];
      this.filterTasks(this.filterStatus);
    },
    toggleCompletion(task) {
      if (task.completed) {
        task.previousStatus = task.status; 
        task.status = 'finished';
      } else {
        task.status = task.previousStatus || 'to-do'; 
        delete task.previousStatus; 
      }
      this.filterTasks(this.filterStatus);
    },
    filterTasks(filter) {
      this.filterStatus = filter;
      if (filter === 'all') {
        this.filteredTasks = this.tasks.slice();
      } else {
        this.filteredTasks = this.tasks.filter(
          (task) => task.status === filter
        );
      }
    },
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    showTodoList() {
      this.activeTab = 'todoList';
    },
    async showPost() {
      this.activeTab = 'post';
      this.loading = true;
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ]);

        this.users = await usersResponse.json();
        this.posts = await postsResponse.json();
        this.filterPosts();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    getUser(userId) {
      return this.users.find(user => user.id === userId) || {};
    },
    filterPosts() {
      if (this.selectedUserId === null) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post => post.userId === this.selectedUserId);
      }
    },
    filterPostsByUser() {
      this.filterPosts();
    },
    resetFilter() {
      this.selectedUserId = null;
      this.filterPosts();
    }
  }
};
</script>
<style>
body {
  background-color: black;
  color: white;
}
.container-yellow {
  padding: 20px;
  background-color: #333; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.sidebar {
  background-color: #444; 
  padding: 20px;
  border-radius: 8px;
}
.sidebar h3 {
  margin-bottom: 15px;
  color: white;
}
.sidebar ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.sidebar ul li {
  margin-bottom: 10px;
}
.sidebar ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.sidebar ul li a:hover {
  color: #ffc107;
}
input[type="text"],
select,
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}
input[type="text"],
select {
  background-color: #555; 
  color: white; 
}
button {
  background-color: #ffc107;
  color: black; 
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: white; 
}
.finished {
  text-decoration: line-through;
  color: #6c757d;
}
</style>
