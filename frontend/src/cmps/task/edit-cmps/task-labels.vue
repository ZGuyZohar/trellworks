<template>
  <section class="task-labels">
    <input type="text" class="pop-up-input" placeholder="Search labels..." />
    <h3 class="pop-up-title">Labels</h3>
    <ul class="labels-list">
      <li
        v-for="label in labels"
        :key="label.id"
        class="label"
        :style="{ backgroundColor: label.color }"
        @click="addLabel(label.id)"
      >
        {{ label.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import { boardService } from "@/services/board.service.js";
export default {
  data() {
    return {
      labels: [],
      newLabel: boardService.getEmptyLabel(),
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
    labelIds(){
      return JSON.parse(JSON.stringify(this.currTask.labelIds))
    }
  },
  methods: {
    getTask(){
      const group = this.currBoard.groups.find(
        (group) => group.id === this.currGroup.id
      );
      const task = group.task.find((task) => task.id === this.currTask.id);
      return task;
    },
    addLabel(labelId) {
      const task = this.getTask()
      for (let i = 0; i < this.labelIds.length; i++) {
        if (labelId === this.labelIds[i]) {
          const foundIdx = this.labelIds.findIndex(
          (currLabelId) => currLabelId === labelId );
          this.labelIds.splice(foundIdx, 1);
            task.labelIds = this.labelIds
          return this.$emit('updateBoard', this.currBoard)
          
        }
      }
          this.labelIds.push(labelId);
          task.labelIds = this.labelIds
          return this.$emit('updateBoard', this.currBoard)
    },
  },
  created() {
    this.labels = this.currBoard.labels;
  },
};
</script>
