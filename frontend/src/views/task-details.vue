<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div @click="togglePopUp(false)" class="task-details">
      <main class="main">
        <h2>{{ currTask.title }}</h2>
        <p>in <span>{{ currGroup.title }}</span></p>
        <section class="members-labels">
          <div class="members-preview"> <!--HERE WILL BE MEMBERS PREVIEW--></div>
          <div class="labels-preview flex" v-if="currTask.labelIds" >
            <span class="label-preview-title">labels</span>
          <span class="flex">
            <labels-preview v-for="(label, idx) in currTask.labelIds" :key="idx" :label="label" :currBoard="currBoard"/>
          </span>

          </div>
        </section>
      </main>
      <div class="action-bar">
        <ul>
          <h3 class="action-bar-title">add to task</h3>
          <li v-for="(action, idx) in actions" :key="idx" @click.stop="togglePopUp(true)" class="action">{{action}}</li>
          <pop-up @closePopUp="togglePopUp" v-if="openPopUp">
            <template v-slot:header>here will be the header </template>
            <task-labels @updateTaskLabels="updateTaskLabels" @removeTaskLabels="removeTaskLabels" :labelIds="currTask.labelIds"/>
          </pop-up>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '@/services/board.service.js'
import taskLabels from '@/cmps/task/edit-cmps/task-labels'
import popUp from '@/cmps/task/pop-up'
import labelsPreview from '../cmps/task-details/labels-preview.vue';
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
    taskId(){
      return this.$route.params.taskId;
    },
  },
  methods: {
    async updateBoard(board) {
      await this.$store.dispatch({
        type: "saveBoardChanges",
        editedBoard: board,
      });
    },
    closeModal() {
      this.$router.push(`/board/${this.$route.params.boardId}`);
    },
    togglePopUp(boolean){
      this.openPopUp = boolean;
    },
    updateTaskLabels(labelId){
      const board = this.currBoard;
      const group = board.groups.find(group => group.id === this.currGroup.id)
      const task = group.task.find(task => task.id === this.currTask.id)
      task.labelIds.push(labelId);
      this.updateBoard(board)
      this.$store.commit({ type: "setTask", taskId: this.taskId });
    },
    removeTaskLabels(labelId){
      const board = this.currBoard;
      const group = board.groups.find(group => group.id === this.currGroup.id)
      const task = group.task.find(task => task.id === this.currTask.id)
      const foundIdx = task.labelIds.findIndex(currLabelId => currLabelId === labelId)
      task.labelIds.splice(foundIdx, 1)
      this.updateBoard(board)
      this.$store.commit({ type: "setTask", taskId: this.taskId });
    }
  },
  created() {
    this.$store.commit({ type: "setTask", taskId: this.taskId });
  },
  components: {
    popUp,
    taskLabels,
    labelsPreview
  }
};
</script>
