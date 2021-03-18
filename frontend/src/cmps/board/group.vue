<template>
  <section v-if="group" class="group">
    <section class="flex group-header">
      <p class="group-title">{{ group.title }}</p>
      <span @click="removeGroup(group.id)"
        ><i class="far fa-trash-alt"></i>
      </span>
    </section>
    <draggable group="group" @change="itemsDragged" animation="400">
    <task-preview
      v-for="task in group.task"
      :key="task.id"
      :task="task"
      :groupId="group.id"
    />
    </draggable>
    <span v-if="!isAddingTask" @click="openAddTask(group.id)">+add task</span>
    <template v-if="isAddingTask">
      <textarea
        placeholder="Your task title here..."
        rows="2"
        cols="29"
        class="task-preview"
        v-model="taskToAdd.title"
      ></textarea>
      <button @click="addTask">Add</button>
      <span class="clickable" @click="closeAddTask"> X</span>
    </template>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task/task-preview";
import { boardService } from "../../services/board.service";
import draggable from 'vuedraggable'

export default {
  props: {
    group: {
      type: Object,
    },
  },
  data() {
    return {
      isAddingTask: false,
      taskToAdd: {
        title: "",
      },

      //// add more properties later here such as: description, etc. as we go!////
    };
  },
  methods: {
    async removeGroup(groupId) {
      await this.$store.dispatch({ type: "removeGroup", groupId });
      this.$emit("groupChange");
    },
    openAddTask(groupId) {
      this.$store.commit({ type: "setGroup", groupId });
      this.isAddingTask = true;
    },
    closeAddTask() {
      this.isAddingTask = false;
      this.$store.commit({ type: "setGroup", groupId: null });
    },
    async addTask() {
      await this.$store.dispatch({ type: "addTask", task: this.taskToAdd });
      this.taskToAdd = {
        title: "",
      };
      this.isAddingTask = false;
      this.$emit("groupChange");
    },
    itemsDragged(){
      console.log('items were dragged');
    }
  },
  components: {
    taskPreview,
    draggable
  },
};
</script>