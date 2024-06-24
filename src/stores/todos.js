import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    updateTask(index, task) {
      this.tasks[index] = task;
    },
  },
});