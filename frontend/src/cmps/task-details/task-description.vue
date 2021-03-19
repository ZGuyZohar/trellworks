  <template>
  <div class="description">
    <div
      v-if="!isEditing && !description"
      @click="openEdit()"
      class="description-input clickable"
    >
      Add a more detailed description...
    </div>
    <div v-if="isEditing" class="description-edit">
      <form @submit.prevent="setDescription">
        <textarea
          v-model="descToEdit"
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
    <p v-else>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
  },
  data() {
    return {
      isEditing: false,
      descToEdit: this.description,
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
      this.$emit("setDescription", this.descToEdit);
      this.isEditing = false;
    },
  },
};
</script>
  
  