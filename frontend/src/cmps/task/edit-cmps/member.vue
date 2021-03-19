<template>
  <section class="task-members">

  </section>
</template>

<script>
import { boardService } from "@/services/board.service.js";
export default {
  data() {
    return {

    };
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
    currGroup(){
      return this.$store.getters.currGroup
    },
    currTask() {
      return this.$store.getters.currTask
    },
  },
  methods: {
    getTask(){
      const group = this.currBoard.groups.find(
        (group) => group.id === this.currGroup.id
      );
      const task = group.task.find((task) => task.id === this.currTask.id);
      return task;
    },
    addMember() {
      const task = this.getTask()
      return this.$emit('updateBoard', this.currBoard)
    },
  },
  created() {

  },
};
</script>
