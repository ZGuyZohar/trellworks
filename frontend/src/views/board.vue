<template>
  <section v-if="currBoard" class="board">
    <board-header :boardTitle="currBoard.title" />
    <div class="flex group-container">
      <group v-for="group in groups" :key="group.id" :group="group" />
      <section @click="addGroup" class="transition group group-add">
        <section class=" group-header">
          <p class="group-title">Add New...</p>
        </section>
      </section>
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
          boardId: this.boardId
        });
        this.groups = this.currBoard.groups;
      },
      async addGroup() {
        await this.$store.dispatch({
          type: "addGroup",
          boardId: this.boardId
        })
        this.loadBoard()
      }
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