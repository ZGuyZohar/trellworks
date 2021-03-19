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
        <i @click.stop="setEditToggler(true, label)" class="fas fa-pencil-alt edit-pen"></i>
      </li>
    </ul>
    <button @click="setEditToggler(true)">Create a new label</button>
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
import {utilService} from '@/services/util.service.js'
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
    setEditToggler(toggle, label){
      this.labelEditToggler = toggle
      if(label) this.newLabel = label
    },
    getColorsToAdd(){
      return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];    
    },
    setColor(color){
      this.newLabel.color = color
    },
    addLabelToBoard(){
      const board = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
      const task = JSON.parse(JSON.stringify(this.getTask()))
      if(!this.newLabel.id){
        this.newLabel.id = utilService.makeId()
        this.labelIds.push(this.newLabel.id);
        task.labelIds = this.labelIds;
        board.labels.push(this.newLabel)
      } else {
        const foundIdxTask = this.labelIds.findIndex(labelId => labelId === this.newLabel.id);
        const foundIdxBoard = this.labels.findIndex(label => label.id === this.newLabel.id);
        if(foundIdxTask<0 || foundIdxBoard<0) return 'couldnt find id';
        this.labelIds.splice(foundIdxTask, 1, this.newLabel.id)
        task.labelIds = this.labelIds
        board.labels.splice(foundIdxBoard, 1, this.newLabel)
      }
      this.labelEditToggler = false
      return this.$emit('updateBoard', this.currBoard)
    }
  },
  created() {
    this.labels = this.currBoard.labels;
    console.log(this.currBoard);
  },
};
</script>
