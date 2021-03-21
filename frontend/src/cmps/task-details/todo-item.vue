<template>
  <section class="todo-item">{{ todo.title }}</section>
</template>


<script>
export default {
  name: "todo-item",
  props: {
    todo: Object,
  },
  methods: {},
};
</script>
