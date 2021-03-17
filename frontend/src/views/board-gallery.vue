<template>
    <section>
        <div class="flex gallery-container">
            <h1>Gallery</h1>
            <!-- <h1>{{boards}}</h1> -->
            <div class="board-list">
                <ul v-for="board in boards" :key="board._id">
                    <span class="placeholder-preview">
                <router-link :to="'/board/'+board._id">
                        <div class="transition preview-header">{{board.title}}</div>
                </router-link>
                </span>
</ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            boards() {
                //FIXME: no need to return whole board array with tasks inside. mini-boards array with titles and ids is enough
                return this.$store.getters.boards
            }
        },
        methods: {
            async loadBoards() {
                await this.$store.dispatch({
                    type: 'loadBoards'
                })
            }
        },
        async created() {
            await this.loadBoards()
            console.log(this.boards);
        }
    }
</script>