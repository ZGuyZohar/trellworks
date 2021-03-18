<template>
  <section v-if="currBoard" :board="currBoard">
    <board-header :boardTitle="currBoard.title" />
    <div class="flex board">
      <div class="flex group-container">
        <draggable
          v-model="currBoard.groups"
          class="flex"
          animation="300"
          @end="draggingEnd"
          ghostClass="group-ghost"
          handle=".handle"
        >
          <group
            v-for="group in currBoard.groups"
            :key="group.id"
            :group="group"
            :board="currBoard"
            @taskDragged="draggedTask"
            @removeGroup="removeGroup"
            @addTask="addTask"
            @titleChange="changeTitle"
          />
        </draggable>
        <section @click="addGroup" class="transition group group-add">
          <section class="flex group-header">
            <p class="group-title"><i class="fas fa-plus"></i>Add New...</p>
            <i class="fas fa-pencil-alt"></i>
          </section>
        </section>
      </div>
    </div>
    <router-view />
  </section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header";
import group from "@/cmps/board/group";
import draggable from "vuedraggable";
import { boardService } from "../services/board.service.js";

export default {
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
  },
  methods: {
    async updateBoard(board) {
      await this.$store.dispatch({
        type: "saveBoardChanges",
        editedBoard: board,
      });
    },
    async loadBoard() {
      await this.$store.dispatch({
        type: "getBoard",
        boardId: this.boardId,
      });
    },
    async addGroup() {
      const board = this.currBoard;
      const group = await boardService.getEmptyGroup();
      board.groups.push(group);
      this.updateBoard(board);
    },
    async removeGroup(groupId) {
      const board = this.currBoard;
      const groupIdx = board.groups.findIndex((group) => group.id === groupId);
      board.groups.splice(groupIdx, 1);
      this.updateBoard(board);
    },
    addTask(task, groupId) {
      const board = this.currBoard;
      const group = board.groups.find((group) => group.id === groupId);
      group.task.push(task);
      this.updateBoard(board);
    },
    draggingEnd() {
      const board = this.currBoard;
      board.groups = this.currBoard.groups;
      this.updateBoard(board);
    },
    draggedTask(board) {
      this.updateBoard(board);
    },
    changeTitle(newTitle, groupId) {
      const board = this.currBoard;
      const group = board.groups.find((group) => group.id === groupId);
      group.title = newTitle;
      this.updateBoard(board);
    },
  },
  async created() {
    await this.loadBoard();
  },
  components: {
    boardHeader,
    group,
    draggable,
  },
};
</script>