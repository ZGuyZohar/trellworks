<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div class="task-details">
      {{ currTask }}
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currTask() {
      return this.$store.getters.currTask;
    },
  },
  methods: {
    closeModal() {
      this.$router.push(`/board/${this.$route.params.boardId}`);
    },
    created() {
      const taskId = this.$route.params.taskId;
      this.$store.commit({ type: "getTask", taskId });
    },
  },
};
</script>
