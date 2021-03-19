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
          <task-description :task="currTask" @updateTask="updateTask" />
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
            <component
              :is="currAction.type"
              @updateTask="updateTask"
              @updateBoard="updateBoard"
              :task="currTask"
            />
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
import { utilService } from "@/services/util.service.js";
import taskLabels from "@/cmps/task/edit-cmps/task-labels";
import popUp from "@/cmps/task/pop-up";
import labelsPreview from "../cmps/task-details/labels-preview.vue";
import taskDescription from "../cmps/task-details/task-description.vue";
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
      return utilService.deepCopy(this.$store.getters.currBoard);
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
    updateTask(task) {
      const updatedTask = utilService.deepCopy(task);
      const board = this.currBoard;
      const group = board.groups.find(
        (group) => group.id === this.currGroup.id
      );
      const taskIdx = group.task.findIndex((task) => task.id === this.taskId);
      group.task.splice(taskIdx, 1, updatedTask);
      this.updateBoard(board);
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
  },
  created() {
    this.$store.commit({ type: "setTask", taskId: this.taskId });
  },
  components: {
    popUp,
    taskLabels,
    labelsPreview,
    taskDescription,
  },
};
</script>
