<template>
  <div>
    <h2 class="text-center mt-5">{{ title }}</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="!loading && posts.length === 0" class="text-center">No posts available</div>

    <div class="d-flex justify-content-center mt-3">
      <select v-model="selectedUserId" @change="filterPostsByUser" class="form-select w-auto search-input">
        <option value="" disabled selected>Select a user</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <button @click="resetFilter" class="btn btn-warning rounded-0 ms-2">Reset</button>
    </div>

    <ul v-if="!loading && filteredPosts.length > 0" class="list-unstyled mt-4">
      <li v-for="post in filteredPosts" :key="post.id" class="mb-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-text">{{ post.body }}</p>
            <p class="card-text"><strong>Author:</strong> {{ getUser(post.userId).name }}</p>
            <slot name="additional-info"></slot> 
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      users: [],
      selectedUserId: null,
      loading: false
    };
  },
  methods: {
    async fetchPostsAndUsers() {
      this.loading = true;
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        this.posts = await postsResponse.json();
        this.users = await usersResponse.json();
        this.filteredPosts = this.posts;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    filterPostsByUser() {
      if (this.selectedUserId) {
        this.filteredPosts = this.posts.filter(post => post.userId === this.selectedUserId);
      } else {
        this.filteredPosts = this.posts;
      }
    },
    resetFilter() {
      this.selectedUserId = null;
      this.filteredPosts = this.posts;
    },
    getUser(userId) {
      return this.users.find(user => user.id === userId) || {};
    }
  },
  created() {
    this.fetchPostsAndUsers();
  }
};
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
}

.card-title, .card-text {
  color: black;
}

.text-center {
  color: black;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.mt-3 {
  margin-top: 1rem;
}

.w-auto {
  width: auto;
}

.search-input {
  background-color: white;
  color: black;
}
</style>
