import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import TodosView from './views/TodosView.vue';
import PostsView from './views/PostsView.vue';
import AlbumsView from './views/AlbumsView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/todos', component: TodosView },
  { path: '/posts', component: PostsView },
  { path: '/albums', component: AlbumsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;