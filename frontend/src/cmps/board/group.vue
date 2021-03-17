<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p>
      <span @click="removeGroup(group.id)">X</span>
    </section>
    <task-preview
      v-for="task in group.task"
      :key="task.id"
      :task="task"
      :groupId="group.id"
    />
    <span v-if="!isAddingTask" @click="openAddTask">+add task</span>
    <template v-if="isAddingTask">
      <textarea
        placeholder="Your task title here..."
        rows="3"
        cols="29"
        class="task-preview"
        v-model="taskToAdd"
      ></textarea>
      <button @click="addTask">Add</button>
      <span class="clickable" @click="closeAddTask"> X</span>
    </template>
  </section>
</template><script>
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
      taskToAdd: "",
    };
  },
  methods: {
    removeGroup(groupId) {
      console.log("removing group: ", groupId);
      // this.$store.dispatch({
      //   type: 'removeGroup',
      //   groupId: groupId
      // })
    },

    openAddTask() {
      this.isAddingTask = true;
    },
    closeAddTask() {
      this.isAddingTask = false;
    },
    addTask() {
      console.log("adding task", this.taskToAdd);
      this.taskToAdd = "";
      this.isAddingTask = false;
    },
  },
  components: {
    taskPreview,
  },
};
</script>