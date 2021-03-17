<template>
  <section v-if="currBoard">
    <board-header :boardTitle="currBoard.title" />
    <div class="board">
      <div class="flex group-container">
        <group
          v-for="group in groups"
          :key="group.id"
          :group="group"
          @groupChange="loadBoard"
        />
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

export default {
  data() {
    return {
      groups: [],
    };
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  methods: {
    async loadBoard() {
      await this.$store.dispatch({
        type: "getBoard",
        boardId: this.boardId,
      });
      this.groups = this.currBoard.groups;
    },
    async addGroup() {
      await this.$store.dispatch({
        type: "addGroup",
        boardId: this.boardId,
      });
      await this.loadBoard();
    },
  },
  async created() {
    await this.loadBoard();
  },
  components: {
    boardHeader,
    group,
  },
};
</script>