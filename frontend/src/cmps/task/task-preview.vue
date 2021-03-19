<template>
  <section
    @mouseover="toggleEditPen(true)"
    @mouseleave="toggleEditPen(false)"
    @click="getDetails"
    class="task-preview clickable"
  >
  <div class="task-preview-labels" v-if="task.labelIds.length && currBoard">
  <labels-preview 
    v-for="labelId in task.labelIds"
    :key="labelId"
    :label="labelId"
    :currBoard="currBoard"
    :fromPreview="true"/>
  </div>
    <p>{{ task.title }}</p>
    <i
      v-if="isEditPenShown"
      :class="penToggler"
      @click.stop="toggleEdit(true)"
    ></i>
    <!-- <quick-edit @toggleEdit="toggleEdit" v-if="showEdit"/> -->
  </section>
</template>

<script>
import labelsPreview from '../task-details/labels-preview.vue';
import quickEdit from "./task-quick-edit";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditPenShown: false,
      showEdit: false,
    };
  },
  computed: {
    currBoard(){
      return this.$store.getters.currBoard
    }
  },
  methods: {
    getDetails() {
      const currBoard = JSON.parse(
        JSON.stringify(this.$store.getters.currBoard)
      );
      this.$store.commit({ type: "setGroup", groupId: this.groupId });
      this.$store.commit({ type: "setTask", task: this.task });
      this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`);
    },
    toggleEditPen(boolean) {
      this.isEditPenShown = boolean;
    },
    toggleEdit(boolean) {
      this.isEditPenShown = false;
      this.showEdit = boolean;
    },
  },
  computed: {
    penToggler() {
      return { "fas fa-pencil-alt edit-pen": this.isEditPenShown };
    },
  },
  created() {
    this.currBoard = this.$store.getters.currBoard;
    // console.log(this.currBoard);
  },
  components: {
    quickEdit,
    labelsPreview
  },
};
</script>

    