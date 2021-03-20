<template>
  <section v-if="group">
    <div class="group handle">
      <section class="flex group-header">
        <!-- <p class="group-title">{{ group.title }}</p> -->
        <input
          class="clean-input group-title"
          type="text"
          v-model="group.title"
          @change="titleChange(group.id)"
        />
        <span @click="removeGroup(group.id)"
          ><i class="far fa-trash-alt"></i>
        </span>
      </section>
      <draggable
        @end="itemsDragged"
        group="task"
        animation="400"
        v-model="group.task"
      >
        <task-preview
          v-for="task in group.task"
          :key="task.id"
          :task="task"
          :groupId="group.id"
        />
      </draggable>
      <span
        v-if="!isAddingTask"
        @click="openAddTask(group.id)"
        class="open-task-composer clickable"
        >
        <i class="fas fa-plus"></i>
        Add another task</span
      >
      <div v-if="isAddingTask">
        <textarea
          placeholder="Your task title here..."
          rows="2"
          cols="29"
          class="task-preview add-task"
          v-model="taskToAdd.title"
        ></textarea>
        <button class="btn-success" @click="addTask(group.id)">Add</button>
        <span class="clickable" @click="closeAddTask"> X</span>
      </div>
    </div>
  </section>
</template>

<script>
import taskPreview from "@/cmps/task/task-preview";
import { boardService } from "../../services/board.service";
import draggable from "vuedraggable";

export default {
  props: {
    group: {
      type: Object,
    },
    board: {
      type: Object,
    },
  },
  data() {
    return {
      isAddingTask: false,
      taskToAdd: boardService.getEmptyTask(),
    };
  },
  methods: {
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    titleChange(groupId) {
      this.$emit("titleChange", this.group.title, groupId);
    },
    openAddTask() {
      this.isAddingTask = true;
    },
    closeAddTask() {
      this.isAddingTask = false;
    },
    async addTask(groupId) {
      if (this.taskToAdd.title === "") return;
      this.$emit("addTask", this.taskToAdd, groupId);
      this.taskToAdd = boardService.getEmptyTask();
      this.isAddingTask = false;
    },
    itemsDragged() {
      this.$emit("taskDragged", this.board);
    },
  },
  components: {
    taskPreview,
    draggable,
  },
};
</script>