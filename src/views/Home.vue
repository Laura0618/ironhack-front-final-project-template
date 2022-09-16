<template>
  <div class="main-wrapper">
    <h1 class="page-title">To Do App</h1>
    <p class="subtitle">A todo app</p>
    <div class="new-task-wrapper">
      <input
        type="text"
        placeholder="Type a new todo"
        class="new-task-input"
        v-model="newTaskInput"
        @keyup.enter="addTask"
      />
      <button class="new-task-button" @click="addTask">+ Add</button>
    </div>
     
     <nav>
      <ul class="tab-wrapper">
        <li class="tab-item is-active">
          <button class="tab-button" @click="setView('All')">
            All ({{ allTasksLength }})
          </button>
        </li>
        <li class="tab-item">
          <button class="tab-button" @click="setView('Current')">
            Current ({{ currentTasksLength }})
          </button>
        </li>
        <li class="tab-item">
          <button class="tab-button" @click="setView('Completed')">
            Completed ({{ completedTasksLength }})
          </button>
        </li>
      </ul>
    </nav>
      
    <ul class="task-list">
      <li
        v-for="taskItem in tasksInView"
        :key="taskItem.id"
        class="task-list-item"
      >
        <div class="task-list-checkbox-wrapper">
          <i class="fa-solid fa-circle-check" v-if="taskItem.is_complete" />
          <i class="fa-regular fa-circle" v-else />

          <input
            type="checkbox"
            v-model="taskItem.is_complete"
            @click="changeTask(taskItem)"
            class="task-list-checkbox"
          />
        </div>

        <input
          v-if="edit"
          type="text"
          v-model.lazy="taskItem.title"
          class="task-list-edit-input"
        />
        <p v-else class="task-list-text">
          {{ taskItem.title }}
        </p>

        <div class="task-list-cta">
          <p id="editPencil" @click="toggleEdit">
            <i class="fa-solid fa-pen-clip task-list-cta-icon"></i>
          </p>
          <p id="deleteTrashBin" @click="deleteTask(taskItem.id)">
            <i class="task-list-cta-icon fa-solid fa-trash-can" />
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";

export default {
  name: "home",
  components: {},
  setup() {
    const taskStore = useTaskStore();
    const userStore = useUserStore();
    return { taskStore, userStore };
  },
  data() {
    return {
      tasksInView: [],
      newTaskInput: "",
      id: "",
      edit: false
    };
  },
  methods: {
    async getAllTasks() {
      const res = await this.taskStore.fetchTasks();
      this.tasksInView = res;
    },
    toggleEdit() {
      if(this.edit === false) {

        this.edit = !this.edit;
      } else {
        this.taskStore.modifyTask(id, title);
        this.edit = !this.edit;
      }
    },
    async addTask() {
      const res = await this.taskStore.addTasks(this.newTaskInput, this.id);
      if (res === "ok") {
        this.getAllTasks();
      }
    },
    
    async deleteTask(id) {
      
      const res = await this.taskStore.deleteTasks(id);
      if (res === "ok") {
        this.getAllTasks();
      }
    },
    async changeTask(task) {
      const completed = !task.is_complete
      const res = await this.taskStore.changeTask(task.id, completed);
      if (res === "ok") {
        this.getAllTasks();
      }
    }
  },
    mounted() {
      this.getAllTasks();
      this.id = this.userStore.user.id;
    },
};
</script>

<style></style>
