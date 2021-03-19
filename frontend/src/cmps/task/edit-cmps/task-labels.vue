<template>
  <section class="task-labels" v-if="!labelEditToggler.isOpen">
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
    <div class="label-buttons">
      <button @click="addLabelToBoard" class="btn-success">Create</button>
      <button v-if="labelEditToggler.type === 'edit'" class="btn-danger">Delete</button>
    </div>
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
      labelEditToggler: {
        type: '',
        isOpen: false
      },
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
          this.$emit('updateBoard', this.currBoard)
    },
    setEditToggler(toggle, label){
      this.labelEditToggler.isOpen = toggle
      if(label) {
        this.newLabel = JSON.parse(JSON.stringify(label))
        this.labelEditToggler.type = 'edit'
      } else this.labelEditToggler.type = 'add'
    },
    getColorsToAdd(){
      return ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'];    
    },
    setColor(color){
      this.newLabel.color = color
    },
    addLabelToBoard(){
      const task = this.getTask()
      if(!this.newLabel.id){
        this.newLabel.id = utilService.makeId()
        this.labelIds.push(this.newLabel.id);
        task.labelIds = this.labelIds;
        this.currBoard.labels.push(this.newLabel)
      } else {
        const foundIdx = this.labels.findIndex(label => label.id === this.newLabel.id);
        if(foundIdx<0) return 'couldnt find id for board';
        this.currBoard.labels.splice(foundIdx, 1, this.newLabel)
      }
      this.labelEditToggler.isOpen = false;
      this.labels = this.currBoard.labels;
      this.$emit('updateBoard', this.currBoard)
      this.newLabel = boardService.getEmptyLabel()
    }
  },
  created() {
    this.labels = this.currBoard.labels;
  },
};
</script>
