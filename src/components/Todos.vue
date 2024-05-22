<template>
  <div>
    <h2 class="text-center mt-5">Aplikasi Todo</h2>
    <div class="d-flex justify-content-center">
      <input v-model="task" type="text" placeholder="Enter task" class="form-control w-50 me-2">
      <button @click="submitTask" class="btn btn-warning rounded-0">SUBMIT</button>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button @click="filterTasks('all')" class="btn btn-secondary me-2">All</button>
      <button @click="filterTasks('finished')" class="btn btn-secondary me-2">Finished</button>
    </div>
    <div class="d-flex justify-content-center">
      <table class="table table-bordered mt-5 w-75" v-if="filteredTasks.length > 0">
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
  </div>
</template>

<script>
export default {
  name: 'Todos',
  data() {
    return {
      task: '',
      editedTask: null,
      availableStatuses: ['to-do', 'in-progress', 'finished'],
      tasks: [],
      filteredTasks: [],
      filterStatus: 'all'
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
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
  color: #007bff;
}

.pointer:hover {
  color: #0056b3;
}

.finished {
  text-decoration: line-through;
}

.table thead th {
  background-color: #007bff;
  color: white;
}

.table tbody tr:hover {
  background-color: #ffffff;
}

h2, span, button, select {
  color: black;
}

.input-box {
  background-color: white;
}

.fa-pen, .fa-trash {
  color: black;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.w-50 {
  width: 50%;
}

.me-2 {
  margin-right: 0.5rem;
}

.w-75 {
  width: 75%;
}

.table {
  width: 100%;
}
</style>

