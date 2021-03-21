<template>
  <section class="todo-item">
    <i :class="isDoneClass" class="clickable" @click="toggleDone"></i>
    <span> {{ todo.title }} </span>
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
      console.log(this.todoToEdit);
    },
  },
};
</script>
