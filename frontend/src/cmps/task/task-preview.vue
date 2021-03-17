<template>
  <section class="task-preview" @click="getDetails">
      <h3> {{task.title}}</h3>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  computed: {
    currBoard(){
      return this.$store.getters.currBoard;
    }
  },
  methods: {
        getDetails(){
            
            // this.$store.commit({type: 'getTask', task: this.task})
            this.$router.push(`/board/${this.currBoard._id}/details/${this.task.id}`)
        }
    },
    created(){
    }
  }

</script>
