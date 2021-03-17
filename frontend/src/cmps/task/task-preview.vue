<template>
  <section @click="getDetails" class="task-preview">
    <p>{{ task.title }}</p>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupId: {
      type: String,
      required: true
    }
  },
  methods: {
    getDetails() {
      const currBoard = this.$store.getters.currBoard;
      console.log(this.task);
      this.$store.commit({ type: 'getTask', task: this.task });
      this.$store.commit({type: 'getGroup', groupId: this.groupId})
      this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`);
    },
  },
  created() {},
};
</script>
