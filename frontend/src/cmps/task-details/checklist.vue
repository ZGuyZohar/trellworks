<template>
  <section class="task-checklist">
    <p><i class="far fa-check-square"></i> {{ checklist.title }}</p>

    <div v-for="todo in checklist.todos" :key="todo.id">
      <todo-item :todo="todo" />
    </div>

    <button v-if="!isAddingItem" class="btn-gray" @click="isAddingItem = true">
      Add item
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
    addTodo() {
      this.isAddingItem = false;
      this.todoToAdd.id = utilService.makeId();
      this.checklistToEdit.todos.push(this.todoToAdd);
      const idx = this.taskToEdit.checklists.findIndex(
        (cl) => cl.id === this.checklist.id
      );
      if (idx !== -1) {
        this.taskToEdit.checklists.splice(idx, 1, this.checklistToEdit);
        this.$emit("updateTask", this.taskToEdit);
        this.todoToAdd = { title: "", isDone: false };
      }
    },
  },
  components: { todoItem },
};
</script>
