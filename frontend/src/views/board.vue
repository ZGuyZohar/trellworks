<template>
    <section v-if="currBoard" class="board">
    <board-header/>
    <h1>Board - {{currBoard.title}}</h1>
    <group v-for="group in groups" :key="group.id" :group="group" />
    <router-view/>
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
            this.groups = this.currBoard.groups       
        },
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
