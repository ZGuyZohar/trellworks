<template>
  <section class="task-members-edit"></section>
</template>


<script>
import { utilService } from "@/services/util.service.js";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      taskToEdit: utilService.deepCopy(this.task),
    };
  },
  computed: {
    currBoard() {
      return utilService.deepCopy(this.$store.getters.currBoard);
    },
  },
  methods: {},
};
</script>
