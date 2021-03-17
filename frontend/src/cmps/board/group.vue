<template>
  <section v-if="group" class=" group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p>
      <span @click="removeGroup(group.id)"><i class="far fa-trash-alt"></i>

</span>
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
        rows="2"
        cols="29"
        class="task-preview"
        v-model="taskToAdd"
      ></textarea>
      <button @click="addTask">Add</button>
      <span class="clickable" @click="closeAddTask"> X</span>
    </template>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task/task-preview";
import { boardService } from "../../services/board.service";

export default {
  props: {
    group: {
      type: Object,
    },
  },
  data() {
    return {
      isAddingTask: false,
      taskToAdd: boardService.getEmptyTask().title,
    };
  },
  methods: {
    async removeGroup(groupId) {
      await this.$store.dispatch({ type: "removeGroup", groupId: groupId });
      this.$emit("removeGroup");
    },
    openAddTask() {
      this.isAddingTask = true;
    },
    closeAddTask() {
      this.isAddingTask = false;
    },
    addTask() {
      console.log("adding task", this.taskToAdd);
      this.$store.dispatch({ type: "addTask", task: this.taskToAdd });
      this.taskToAdd = "";
      this.isAddingTask = false;
    },
  },
  components: {
    taskPreview,
  },
};
</script>