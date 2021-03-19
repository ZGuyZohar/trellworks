<template>
  <section @click.self="closeModal" class="task-details-modal">
    <div @click="togglePopUp(false)" class="task-details">
      <main class="main">
        <h2>{{ currTask.title }}</h2>
        <p>
          in <span>{{ currGroup.title }}</span>
        </p>
        <section class="members-labels">
          <div class="members-preview"><!--HERE WILL BE MEMBERS PREVIEW--></div>
          <div class="labels-preview flex" v-if="currTask.labelIds.length">
            <span class="label-preview-title">labels</span>
            <span class="flex">
              <labels-preview
                v-for="labelId in currTask.labelIds"
                :key="labelId"
                :label="labelId"
                :currBoard="currBoard"
              />
            </span>
          </div>
          <div class="description">
            <div v-if="!currTask.description" class="description-edit">
              <form @submit.prevent="setDescription">
                <textarea
                  class="description-input clean-input"
                  rows="6"
                  placeholder="Add a more detailed description.."
                ></textarea>
                <div>
                  <button type="submit">Save</button>
                  <span class="clickable">X</span>
                </div>
              </form>
            </div>
            <p v-else>{{ currTask.description }}</p>
          </div>
        </section>
      </main>
      <div class="action-bar">
        <ul>
          <h3 class="action-bar-title">add to task</h3>
          <li
            v-for="(action, idx) in actions"
            :key="idx"
            @click.stop="togglePopUp(true, action)"
            class="action"
          >
            {{ action.txt }}
          </li>
          <pop-up @closePopUp="togglePopUp" v-if="openPopUp">
            <template v-slot:header>{{ currAction.txt }}</template>
            <component :is="currAction.type" @updateBoard="updateBoard" />
          </pop-up>
        </ul>
        <ul>
          <h3 class="action-bar-title">Actions</h3>
          <li class="action" @click="removeTask()">Delete Task</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "@/services/board.service.js";
import taskLabels from "@/cmps/task/edit-cmps/task-labels";
import popUp from "@/cmps/task/pop-up";
import labelsPreview from "../cmps/task-details/labels-preview.vue";
export default {
  data() {
    return {
      actions: [
        {
          txt: "Members",
          type: "taskMembers",
        },
        {
          txt: "Labels",
          type: "taskLabels",
        },
        {
          txt: "Checklist",
          type: "taskChecklist",
        },
        {
          txt: "Attachment",
          type: "taskAttachment",
        },
        {
          txt: "Cover",
          type: "taskCover",
        },
      ],
      currAction: null,
      openPopUp: false,
    };
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
    currTask() {
      return this.$store.getters.currTask;
    },
    currGroup() {
      return this.$store.getters.currGroup;
    },
    taskId() {
      return this.$route.params.taskId;
    },
  },
  methods: {
    saveActivity(activityTitle) {
      this.$store.dispatch({
        type: "saveActivity",
        activity: activityTitle,
        group: this.currGroup,
        board: this.currBoard,
        task: this.getTask(this.currBoard),
      });
    },
    getTask(board) {
      const group = board.groups.find(
        (group) => group.id === this.currGroup.id
      );
      const task = group.task.find((task) => task.id === this.taskId);
      return task;
    },
    async updateBoard(board) {
      await this.$store.dispatch({
        type: "saveBoardChanges",
        editedBoard: board,
      });
      this.$store.commit({ type: "setTask", taskId: this.taskId });
    },
    closeModal() {
      this.$router.push(`/board/${this.$route.params.boardId}`);
    },
    togglePopUp(boolean, actionType) {
      this.openPopUp = boolean;
      this.currAction = actionType;
    },
    removeTask() {
      const board = this.currBoard;
      const group = board.groups.find(
        (group) => group.id === this.currGroup.id
      );
      const taskIdx = group.task.findIndex((task) => task.id === this.taskId);
      this.saveActivity("removed the task");
      group.task.splice(taskIdx, 1);
      this.updateBoard(board);
      this.$router.push("../");
    },
    setDescription() {
      console.log("setting description");
    },
  },
  created() {
    this.$store.commit({ type: "setTask", taskId: this.taskId });
  },
  components: {
    popUp,
    taskLabels,
    labelsPreview,
  },
};
</script>
