<template>
  <div v-if="color" :style="{ backgroundColor: color.color }" ></div>
</template>

<script>
import { boardService } from '@/services/board.service.js'
export default {
    props: ['label', 'currBoard'],
    data(){
        return {
            color: ''
        }
    },
    methods: {
        getColorByLabelId(){
            const color = boardService.getLabelColorById(this.currBoard, this.label)
            this.color = color
        }
    },
    created(){
        this.getColorByLabelId(this.currBoard, this.label);
    }
}
// 
</script>
