<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div class="task-details">
      <main class="main">
        <h2>{{currTask.title}}</h2>
        in list <span>{{currGroup.title}}</span>
        
      </main>
      <div class="action"> ACTIONS WILL BE HERE <!-- here will be action bar, class name TBD for now just placeholder--></div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currTask() {
      return this.$store.getters.currTask;
    },
    currGroup(){
      return this.$store.getters.currGroup;
    }
  },
  methods: {
    closeModal() {
      this.$router.push(`/board/${this.$route.params.boardId}`);
    },
  },
    created() {
      const taskId = this.$route.params.taskId;
      this.$store.commit({ type: "getTask", taskId });
    },
};
</script>
