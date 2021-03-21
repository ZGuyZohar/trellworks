<template>
  <section class="task-checklist">
    <h3 class="pop-up-title">Attachment</h3>

  </section>
</template>


<script>
import { utilService } from "../../../services/util.service";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      taskToEdit: JSON.parse(JSON.stringify(this.task)),
    };
  },
  methods: {
    addChecklist() {
      this.checklist.id = utilService.makeId();
      this.taskToEdit.checklists.push(this.checklist);
      // this.$emit("changeMade", `added the checklist ${this.checklist.title}`);
      this.$emit("updateTask", this.taskToEdit);
      this.$emit("close");
      this.checklist = { title: "", todos: [] };
    },
  },
};
</script>
