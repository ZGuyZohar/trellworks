<template>
<<<<<<< HEAD
  <section class="task-preview" @click="getDetails">
      <h3> {{task.title}}</h3>
=======
  <section @click="getDetails" class="task-preview">
    <h3>{{ task.title }}</h3>
>>>>>>> 3c00c3fda28e8b9184b8d42d721c546d794f4650
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
<<<<<<< HEAD
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
=======
    },
  },
  methods: {
    getDetails() {
      const currBoard = this.$store.getters.currBoard;
      this.$store.commit({ type: "getTask", task: this.task });
      this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`);
    },
  },
  created() {},
};
</script>
>>>>>>> 3c00c3fda28e8b9184b8d42d721c546d794f4650
