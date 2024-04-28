<template>
  <div class="container">
    <h2 class="text-center mt-5">Aplikasi Todo</h2>

    <div class="d-flex">
      <input v-model="task" type="text" placeholder="Enter task" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-0">SUBMIT</button>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <button @click="filterTasks('all')" class="btn btn-secondary me-2">All</button>
      <button @click="filterTasks('finished')" class="btn btn-secondary me-2">Finished</button>
    </div>

    <table class="table table-bordered mt-5" v-if="filteredTasks.length > 0">  <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filteredTasks" :key="index">
          <td>
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
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      task: '',
      editedTask: null,
      availableStatuses: ['to-do', 'in-progress', 'finished'],
      tasks: [],
      filteredTasks: [],  // Initially empty
      filterStatus: 'all', // Default filter
    };
  },
  methods: {
    // Task management methods
    submitTask() {
      if (this.task.length === 0) return;

      if (this.editedTask === null) {
        this.tasks.push({
          name: this.task,
          status: 'to-do',
        });
      } else {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      }
      this.task = '';
      this.filterTasks('all'); // Filter after task submission
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.filterTasks('all'); // Refine filter after deletion
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    // Status management methods
    changeStatus(index) {
      let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatuses[newIndex];
      this.filterTasks(this.filterStatus); // Filter after change
    },

    // Filtering methods
    filterTasks(filter) {
      this.filterStatus = filter;
      if (filter === 'all') {
        this.filteredTasks = this.tasks.slice(); // Show all tasks
      } else {
        this.filteredTasks = this.tasks.filter(
          (task) => task.status === filter
        );
      }
    },

    // Helper method
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>



<style>
container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


input[type="text"],
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  background-color: #ffc107;
  color: #fff;
  cursor: pointer;
}

/* Gaya untuk tabel tugas */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Gaya untuk status tugas */
.finished {
  text-decoration: line-through;
  color: #6c757d;
}</style>
