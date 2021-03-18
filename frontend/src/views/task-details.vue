<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div class="task-details">
      <main class="main">
        <h2>{{ currTask.title }}</h2>
        <p>in <span>{{ currGroup.title }}</span></p>
      </main>
      <div class="action-bar">
        <ul>
          <h3 class="action-bar-title">add to task</h3>
          <li v-for="(action, idx) in actions" :key="idx" class="action">{{action}}</li>
          <pop-up></pop-up>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import popUp from '@/cmps/task/pop-up'
export default {
  data(){
    return {
      actions: ['Members', 'Labels', 'Checklist', 'Attachment', 'Cover']
    }
  },
  computed: {
    currTask() {
      return this.$store.getters.currTask;
    },
    currGroup() {
      return this.$store.getters.currGroup;
    },
  },
  methods: {
    closeModal() {
      this.$router.push(`/board/${this.$route.params.boardId}`);
    },
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: "setTask", taskId });
      console.log(this.currTask);
  },
  components: {
    popUp
  }
};
</script>
