<template>
  <div v-if="color" :style="{ backgroundColor: color.color }" ><span v-if="!fromPreview">{{color.title}}</span></div>
</template>

<script>
import { boardService } from '@/services/board.service.js'
export default {
    props: ['label', 'currBoard', 'fromPreview'],
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
    watch: {
        currBoard(){
            this.getColorByLabelId()
        }
    },
    created(){
        this.getColorByLabelId(this.currBoard, this.label);
    }
}

</script>
