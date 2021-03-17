<template>
    <section>
        <div class="flex gallery-container">
            <h1>Gallery</h1>
            <!-- <h1>{{boards}}</h1> -->
            <div class="board-list">
                <div class="placeholder-preview add">
                    <button class="cta-btn">Create new</button>
                </div>
                <router-link v-for="board in boards" :key="board._id" :to="'/board/'+board._id">
                    <div class="placeholder-preview">
                        <div class="transition preview-header">
                            <h2>{{board.title}}</h2>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
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