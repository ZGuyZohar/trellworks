<template>
    <section v-if="currBoard" class="board">
    <board-header/>
    <h1>Board - {{currBoard.title}}</h1>
    <group v-for="group in groups" :key="group.id" :group="group" />

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
        // await this.loadBoard()
        this.$store.dispatch({type: 'loadBoards'})
    },
    components: {
        boardHeader,
        group
    }
}
</script>
