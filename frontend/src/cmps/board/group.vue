<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p><span @click="removeGroup(group.id)">X</span>
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
      removeGroup(groupId) {
        console.log('removing group: ', groupId);
        this.$store.dispatch({type: 'removeGroup',groupId: groupId})
      }
    },
    components: {
      taskPreview,
    },
  };
</script>