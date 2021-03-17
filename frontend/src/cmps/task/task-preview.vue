<template>
  <section @click="getDetails">
      <h3> {{task.title}}</h3>
  </section>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        getDetails(){
            const currBoard = this.$store.getters.currBoard;
            this.$store.commit({type: 'getTask', task: this.task})
            this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`)
        }
    },
    created(){
    }
}
</script>
