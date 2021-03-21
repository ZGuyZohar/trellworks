<template>
  <section class="task-checklist">
    <div>
      <i class="fas fa-tasks fa-lg"></i>
      <h1 class="details-title">{{ checklist.title }}</h1>
    </div>

    <div class="progress-container flex">
      <span>{{ completed }}</span>
      <div class="progress-bar">
        <div class="progress-done" ref="progress"></div>
      </div>
    </div>

    <div v-for="todo in checklist.todos" :key="todo.id">
      <todo-item
        :todo="todo"
        @updateTodo="updateTodo"
        @removeTodo="removeTodo"
      />
    </div>

    <button v-if="!isAddingItem" class="btn-gray" @click="isAddingItem = true">
      Add an item
    </button>
    <form v-if="isAddingItem" @submit.prevent="addTodo">
      <input placeholder="Add an item" v-model="todoToAdd.title" />
      <button type="submit" class="btn-success">Add</button>
      <i
        class="fas fa-times clickable close-desc"
        @click="isAddingItem = false"
      >
      </i>
    </form>
  </section>
</template>


<script>
import { utilService } from "../../services/util.service";
import todoItem from "../task-details/todo-item";

export default {
  props: {
    checklist: Object,
    task: Object,
  },
  data() {
    return {
      isAddingItem: false,
      taskToEdit: JSON.parse(JSON.stringify(this.task)),
      checklistToEdit: JSON.parse(JSON.stringify(this.checklist)),
      todoToAdd: { title: "", isDone: false },
      completed: 0,
    };
  },
  methods: {
    /// updates
    updateTask() {
      const idx = this.taskToEdit.checklists.findIndex(
        (cl) => cl.id === this.checklist.id
      );
      this.taskToEdit.checklists.splice(idx, 1, this.checklistToEdit);
      this.$emit("updateTask", this.taskToEdit);
      this.todoToAdd = { title: "", isDone: false };
      this.updateProgress();
    },
    updateProgress() {
      const todosLength = this.checklistToEdit.todos.length;
      const doneLength = this.checklistToEdit.todos.filter(
        (todo) => todo.isDone === true
      ).length;
      if (!todosLength) this.completed = "0%";
      else this.completed = Math.round((doneLength / todosLength) * 100) + "%";
      this.$refs.progress.style.width = this.completed;
      this.$refs.progress.style.background =
        doneLength / todosLength === 1 ? "#64916a" : "#0079bf";
    },
    /// actions
    addTodo() {
      this.isAddingItem = false;
      this.todoToAdd.id = utilService.makeId();
      this.checklistToEdit.todos.push(this.todoToAdd);
      this.updateTask();
    },
    removeTodo(todoId) {
      const idx = this.getIdx(todoId);
      this.checklistToEdit.todos.splice(idx, 1);
      this.updateTask();
    },
    updateTodo(updatedTodo) {
      const idx = this.getIdx(updatedTodo.id);
      this.checklistToEdit.todos.splice(idx, 1, updatedTodo);
      this.updateTask();
    },
    /// helpers
    getIdx(todoId) {
      return this.checklistToEdit.todos.findIndex((todo) => todo.id === todoId);
    },
  },
  mounted() {
    console.log("hi");
    this.updateProgress();
  },
  components: { todoItem },
};
</script>
