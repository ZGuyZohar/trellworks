<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p><span>X</span>
    </section>
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
    methods: {
      addTask() {
        console.log("adding task");
      },
    },
    components: {
      taskPreview,
    },
  };
</script>