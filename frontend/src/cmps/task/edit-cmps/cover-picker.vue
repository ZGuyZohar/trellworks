<template>
  <section class="task-cover-picker">
    <h3 class="pop-up-title">size</h3>
    <div class="cover-type">
      <div class="cover-top">
        <div class="color" :style="{background: coverToShow}"></div>
        <div class="line-preview">
          <div class="row1"></div>
          <div class="row2"></div>
          <div class="row3">
            <div class="a"></div>
            <div class="a"></div>
          </div>
          <div class="dot"></div>
        </div>
      </div>
      <div class="cover-full" :style="{background: coverToShow}">
        <div class="line-preview">
          <div class="row1"></div>
          <div class="row2"></div>
        </div>
      </div>
    </div>
    <h3 class="pop-up-title">colors</h3>
    <div class="colors">
      <div class="color-picker" v-for="color in allColors" 
      :style="{backgroundColor: color.color}" :key="color.color"
      @click="selectCover(color.color)"></div>
    </div>
  </section>
</template>


<script>
import {boardService} from '@/services/board.service.js'
export default {
  props: {
    task: Object
  },
  data(){
    return {
      allColors: boardService.getAllColors(),
      coverSelected: null
    }
  },
  computed: {
    taskToEdit(){
      return JSON.parse(JSON.stringify(this.task))
    },
    coverToShow(){
      if(!this.taskToEdit.cover && !this.coverSelected) return '#344563'
      else if(this.taskToEdit.cover) return this.taskToEdit.cover
    }
  },
  methods: {
    selectCover(color){
      this.coverSelected = color;
      this.taskToEdit.cover = color;
      this.$emit('updateTask', this.taskToEdit)
    }
  },
  created(){
    this.coverSelected = this.taskToEdit.cover || null
  }
}
</script>
