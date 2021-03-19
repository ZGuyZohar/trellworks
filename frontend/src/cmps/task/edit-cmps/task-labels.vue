<template>
  <section class="task-labels" v-if="!labelEditToggler">
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
        <!-- <i class="fas fa-check"></i> -->
        <i @click="labelEditToggler=true" class="fas fa-pencil-alt edit-pen"></i>
      </li>
    </ul>
  </section>
  <section v-else>
    <h5>Name</h5>
    <input type="text" v-model="newLabel.title" class="pop-up-input" />
    <h5>Select a color</h5>
    <div class="colors">
      <div v-for="color in colorsToAdd" 
      :style="{backgroundColor: color}" 
      :key="color" 
      class="color-picker"
      @click="setColor(color)"
      ></div>
    </div>
    <button @click="addLabelToBoard" class="btn-success">Create</button>
  </section>
</template>

<script>
import { boardService } from "@/services/board.service.js";
export default {
  data() {
    return {
      labels: [],
      newLabel: boardService.getEmptyLabel(),
      labelEditToggler: false,
      colorsToAdd: this.getColorsToAdd()
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
    getColorsToAdd(){
      return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];    
    },
    setColor(color){
      this.newLabel.color = color
    },
    addLabelToBoard(){
      const task = this.getTask()
      this.labelIds.push(this.newLabel.id);
      task.labelIds = this.labelIds;
      this.currBoard.labels.push(this.newLabel)
      return this.$emit('updateBoard', this.currBoard)
    }
  },
  created() {
    this.labels = this.currBoard.labels;
    console.log(this.currBoard);
  },
};
</script>
