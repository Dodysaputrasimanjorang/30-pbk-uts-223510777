import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    users: [],
    loading: false,
  }),
  actions: {
    async fetchPostsAndUsers() {
      this.loading = true;
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        this.posts = await postsResponse.json();
        this.users = await usersResponse.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});