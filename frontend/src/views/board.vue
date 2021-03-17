<template>
    <section v-if="board" class="board">
    <board-header/>
    <h1>Board - {{board.title}}</h1>
    <!-- <div v-for="group in groups" :key="group.id" @click="getGroup(group)">
        {{group.title}}
    </div> -->

    </section>
</template>

<script>
import boardHeader from '@/cmps/board/board-header'
import group from '@/cmps/board/group'

export default { 
    data(){
        return {
            groups: [],
        }
    },
    computed: {
        boardId(){
            return this.$route.params.boardId
        },
        currBoard(){
            return this.$store.getters.currBoard
        }
    },    
    methods: {
        async loadBoard(){
            await this.$store.dispatch({type: 'getBoard', boardId: this.boardId})
            this.currBoard.groups.forEach(group => this.groups.push(group))               
        },
        async getGroup(group){

        }
    },
    async created() { 
        await this.loadBoard()
    },
    components: {
        boardHeader,
        group
    }
}
</script>
