<template>
  <section v-if="group" class="group">
    <p class="group-title">{{ group.title }}</p>
    <task-preview v-for="task in group.task" :key="task.id" :task="task" />
    <span @click="addTask">+add task</span>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task/task-preview";
export default {
  props: {
    group: {
      type: Object,
    },
  },
  components: {
    taskPreview,
  },
};
</script>
