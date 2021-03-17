<template>
    <section @click.self="closeModal" class="details-modal">
        <div class="details">
                {{currTask}}
        </div>
    </section>
</template>

<script>

export default {
    computed: {
        currTask(){
            return this.$store.getters.currTask
        },
    },
    methods: {
        closeModal(){
            this.$router.push(`/board/${this.$route.params.boardId}`)
        }
    },
    created(){
        const taskId = this.$route.params.taskId
        this.$store.commit({ type: 'getTask', taskId })
        console.log(this.currTask);
    }

}
</script>
