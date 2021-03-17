<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p><span @click="removeGroup(group.id)">X</span>
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
      }},
      methods: {
        addTask() {
          console.log("adding task");
        },
        removeGroup(groupId) {
          console.log('removing group: ', groupId);
          this.$store.dispatch({
            type: 'removeGroup',
            groupId: groupId
          })
        },
        addTask() {
          this.isAddingTask = true;
        },
      },
      data() {
        return {
          isAddingTask: false,
        };
      },
      components: {
        taskPreview,
      },
    }
</script>