<script>
import { reactive, toRefs, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "ToDos",
  setup() {
    const state = reactive({
      currentView: "All",
      newTaskInput: "",
      taskList: [],
    });

    const taskLists = reactive({
      all: computed(() => state.taskList),
      current: computed(() =>
        state.taskList.filter((item) => item.complete === false)
      ),
      completed: computed(() =>
        state.taskList.filter((item) => item.complete === true)
      ),
    });

    const taskViews = reactive({
      allTasksLength: computed(() => taskLists.all.length),
      currentTasksLength: computed(() => taskLists.current.length),
      completedTasksLength: computed(() => taskLists.completed.length),
    });

    const tasksInView = computed(() => {
      if (state.currentView === "Current") {
        return state.taskList.filter((item) => item.complete === false);
      } else if (state.currentView === "Completed") {
        return state.taskList.filter((item) => item.complete === true);
      } else {
        return state.taskList;
      }
    });

    const addTask = () => {
      state.taskList.push({
        id: uuidv4(),
        complete: false,
        edit: false,
        label: state.newTaskInput,
      });
      state.newTaskInput = "";
    };

    const toggleEdit = taskId => {
      const taskIndex = state.taskList.findIndex((task) => task.id === taskId);
      state.taskList[taskIndex].edit = !state.taskList[taskIndex].edit
    }

    const deleteTask = (taskId) => {
      const taskIndex = state.taskList.findIndex((task) => task.id === taskId);
      state.taskList.splice(taskIndex, 1);
    };

    const setView = (viewLabel) => {
      state.currentView = viewLabel;
    };

    return {
      ...toRefs(state),
      ...toRefs(taskViews),
      addTask,
      deleteTask,
      setView,
      tasksInView,
      toggleEdit
    };
  },
};
</script>

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
        :key="taskItem.label"
        class="task-list-item"
      >
        <div class="task-list-checkbox-wrapper">
          <font-awesome-icon
            icon="fa-solid fa-circle-check"
            v-if="taskItem.complete"
          />
          <font-awesome-icon icon="fa-regular fa-circle" v-else />

          <input
            type="checkbox"
            v-model="taskItem.complete"
            :checked="taskItem.complete"
            class="task-list-checkbox"
          />
        </div>

        <input v-if="taskItem.edit" type="text" v-model.lazy="taskItem.label" class="task-list-edit-input"/>
        <p v-else class="task-list-text">
          {{ taskItem.label }}
        </p>

        <div class="task-list-cta">
          <p id="editPencil" @click="toggleEdit(taskItem.id)">
            <font-awesome-icon
              icon="fa-solid fa-pen-clip"
              class="task-list-cta-icon"
            ></font-awesome-icon>
          </p>
          <p id="deleteTrashBin" @click="deleteTask(taskItem.id)">
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              class="task-list-cta-icon"
            />
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
html {
  background-color: #fbfbfb;
}

.task-list-checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list-checkbox {
  position: absolute;
  left: -2px;
  top: -1px;
  opacity: 0;
}

.task.list {
  padding: 0;
}

.task-list-item {
  padding: 0 16px;
  box-shadow: 2px 2px 8px 0 #cfcfcf;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border: 1px solid #f6f6f6;
  margin-bottom: 16px;
}

.task-list-item:focus,
.task-list-item:hover {
  border: 1px solid #0631f8;
}

.task-list-cta {
  display: flex;
  column-gap: 16px;
}

.task-list-edit-input,
.task-list-text {
  padding-left: 12px;
  font-weight: bold;
  flex: 1;
  font-size: 16px;
}

.tab-wrapper {
  display: flex;
  list-style: none;
  margin: 45px 0;
  padding: 0;
  column-gap: 30px;
}

.tab-item {
  padding-bottom: 6px;
}

.tab-item.is-active {
  border-bottom: 3px solid blue;
}

.tab-item.is-active .tab-button {
  color: #2d2d2d;
}

.tab-button {
  border: 0;
  background-color: transparent;
  letter-spacing: 1px;
  font-weight: bold;
  padding: 0;
  color: #6b6b6b;
  cursor: pointer;
}

.new-task-wrapper {
  display: flex;
}

.new-task-input {
  padding: 16px;
  font-weight: 600;
  flex: 1;
  border: 1px solid #00000033;
}

.new-task-button {
  padding: 18px 24px;
  background-color: #0004ff;
  color: #fff;
  font-weight: bold;
}

.main-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 44px;
  letter-spacing: 1.84px;
  color: #2d2d2d;
  font-family: "DM Serif Display", serif;
  margin-top: 106px;
  margin-bottom: 0;
}

.subtitle {
  font-size: 1rem;
  font-weight: bold;
  color: #6b6b6b;
  margin-top: 0;
}
</style> 
