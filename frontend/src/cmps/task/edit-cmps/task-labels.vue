<template>
  <section class="task-labels">
      <input type="text" class="pop-up-input" placeholder="Search labels...">
      <h3 class="pop-up-title">Labels</h3>
      <ul class="labels-list">
        <li 
        v-for="label in labels" 
        :key="label.id" class="label" 
        :style="{ backgroundColor: label.color }" 
        @click="updateLabelToTask(label.id)">{{label.title}}</li>
      </ul>
  </section>
</template>

<script>
import { boardService } from '@/services/board.service.js'
export default {
  props: ['labelIds'],
  data(){
    return {
      labels: [],
      newLabel: boardService.getEmptyLabel()
    }
  },
  computed: {
    currBoard(){
      return this.$store.getters.currBoard
    },
    currTask(){
      return this.$store.getters.currTask
    }
  },
  methods: {
    updateLabelToTask(labelId){
        for(let i = 0; i<this.labelIds.length; i++){
          if(labelId === this.labelIds[i]) {
            return this.$emit('removeTaskLabels', labelId)
          }
      }
      this.$emit('updateTaskLabels', labelId);
    }
  },
  created(){
    this.labels = this.currBoard.labels
  }
}
</script>
