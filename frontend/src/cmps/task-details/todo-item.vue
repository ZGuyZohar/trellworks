<template>
  <section class="todo-item flex">
    <div>
      <i :class="isDoneClass" class="clickable" @click="toggleDone"></i>
      <span> {{ todo.title }} </span>
    </div>
    <i class="fas fa-trash-alt clickable" @click="removeTodo"></i>
  </section>
</template>


<script>
export default {
  name: "todo-item",
  props: {
    todo: Object,
  },
  data() {
    return {
      todoToEdit: JSON.parse(JSON.stringify(this.todo)),
    };
  },
  computed: {
    isDoneClass() {
      return this.todo.isDone ? "far fa-check-square" : "far fa-square";
    },
  },
  methods: {
    toggleDone() {
      this.todoToEdit.isDone = !this.todoToEdit.isDone;
      this.$emit("updateTodo", this.todoToEdit);
    },
    removeTodo() {
      this.$emit("removeTodo", this.todoToEdit.id);
    },
  },
};
</script>
