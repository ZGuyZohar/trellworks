<template>
    <section v-if="board" class="board">
    <h1>Board - {{board.title}}</h1>
    <div v-for="group in groups" :key="group.id" @click="getGroup(group)">
        {{group.title}}
    </div>

    </section>
</template>

<script>
import {boardService} from '../services/board.service.js'
import {groupService} from '../services/group.service.js'

export default { 
    data(){
        return {
            board: null,
            groups: [],
        }
    },
    computed: {
        boardId(){
            return this.$route.params.boardId
        },
    },    
    methods: {
        async loadBoard(){
            const foundBoard = await boardService.getById(this.boardId);
            this.board = foundBoard;
            this.board.groups.forEach(group => this.groups.push(group))               
        },
        async getGroup(group){

        }
    },
    async created() { 
        await this.loadBoard()
    }
}
</script>
