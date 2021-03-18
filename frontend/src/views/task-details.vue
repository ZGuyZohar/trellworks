<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div @click="togglePopUp(false)" class="task-details">
      <main class="main">
        <h2>{{ currTask.title }}</h2>
        <p>in <span>{{ currGroup.title }}</span></p>
      </main>
      <div class="action-bar">
        <ul>
          <h3 class="action-bar-title">add to task</h3>
          <li v-for="(action, idx) in actions" :key="idx" @click.stop="togglePopUp(true)" class="action">{{action}}</li>
          <pop-up @closePopUp="togglePopUp" v-if="openPopUp">
            <template v-slot:header>here will be the header </template>
            <task-labels @updateTaskLabels="updateTaskLabels"/>
          </pop-up>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '@/services/board.service'
import taskLabels from '@/cmps/task/edit-cmps/task-labels'
import popUp from '@/cmps/task/pop-up'
export default {
  data(){
    return {
      actions: ['Members', 'Labels', 'Checklist', 'Attachment', 'Cover'],
      openPopUp: false
    }
  },
  computed: {
    currBoard(){
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
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
    togglePopUp(boolean){
      this.openPopUp = boolean;
    },
    updateTaskLabels(labelId){
      const board = this.currBoard;
      const group = board.find(group => group.id === this.currGroup.id)
      task = group.find(task => task.id === this.getters.currTask.id)
      task.labelIds.push(labelId)
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: "setTask", taskId });
  },
  components: {
    popUp,
    taskLabels
  }
};
</script>
