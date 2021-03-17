<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p>
      <span>X</span>
    </section>
    <task-preview v-for="task in group.task" :key="task.id" :task="task" />
    <span v-if="!isAddingTask" @click="addTask">+add task</span>
    <template v-if="isAddingTask" class="add-task">
      <textarea placeholder="Your task title here..." rows="3"></textarea>
    </template>
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
  data() {
    return {
      isAddingTask: false,
    };
  },
  methods: {
    addTask() {
      this.isAddingTask = true;
    },
  },
  components: {
    taskPreview,
  },
};
</script>