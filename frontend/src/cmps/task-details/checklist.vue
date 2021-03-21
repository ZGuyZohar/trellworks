<template>
  <section class="task-checklist">
    <p><i class="fas fa-tasks fa-lg"></i> {{ checklist.title }}</p>
    <p>here will be progress bar</p>

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
    };
  },
  methods: {
    updateTask() {
      const idx = this.taskToEdit.checklists.findIndex(
        (cl) => cl.id === this.checklist.id
      );
      this.taskToEdit.checklists.splice(idx, 1, this.checklistToEdit);
      this.$emit("updateTask", this.taskToEdit);
      this.todoToAdd = { title: "", isDone: false };
    },
    addTodo() {
      this.isAddingItem = false;
      this.todoToAdd.id = utilService.makeId();
      this.checklistToEdit.todos.push(this.todoToAdd);
      this.updateTask();
    },
    removeTodo(todoId) {
      const idx = this.checklistToEdit.todos.findIndex(
        (todo) => todo.id === todoId
      );
      this.checklistToEdit.todos.splice(idx, 1);
      this.updateTask();
    },
    updateTodo(updatedTodo) {
      const idx = this.checklistToEdit.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      this.checklistToEdit.todos.splice(idx, 1, updatedTodo);
      this.updateTask();
    },
  },
  components: { todoItem },
};
</script>
