  <template>
  <div class="description">
    <div
      v-if="!isEditing && !taskToEdit.description"
      @click="openEdit()"
      class="description-input clickable"
    >
      Add a more detailed description...
    </div>
    <div v-if="isEditing" class="description-edit">
      <form @submit.prevent="setDescription">
        <textarea
          v-model="taskToEdit.description"
          ref="descriptionEdit"
          autofocus
          class="description-input clean-input"
          rows="6"
          placeholder="Add a more detailed description..."
        ></textarea>
        <div>
          <button type="submit">Save</button>
          <span @click="isEditing = false" class="clickable">X</span>
        </div>
      </form>
    </div>
    <p v-else>{{ taskToEdit.description }}</p>
  </div>
</template>

<script>
import { utilService } from "@/services/util.service.js";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isEditing: false,
      taskToEdit: utilService.deepCopy(this.task),
    };
  },
  methods: {
    openEdit() {
      this.isEditing = true;
      setTimeout(() => {
        this.$refs.descriptionEdit.focus();
      }, 0);
    },
    setDescription() {
      this.$emit("updateTask", this.taskToEdit);
      this.isEditing = false;
    },
  },
};
</script>
  
  