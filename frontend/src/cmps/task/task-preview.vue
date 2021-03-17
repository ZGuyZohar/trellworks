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
      required: true,
    },
  },
  methods: {
    getDetails() {
      const currBoard = this.$store.getters.currBoard;
      this.$store.commit({ type: "setGroup", groupId: this.groupId });
      this.$store.commit({ type: "setTask", task: this.task });
      this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`);
    },
  },
  created() {},
};
</script>
