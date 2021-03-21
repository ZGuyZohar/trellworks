<template>
  <section class="task-attachment">
    <h3 class="pop-up-title">Attach a link</h3>
   <input type="text" class="pop-up-input" placeholder="Paste any link here..." @paste="addFile">
  </section>
</template>


<script>
import { imgUploadService } from "../../../services/img-upload.service";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      taskToEdit: JSON.parse(JSON.stringify(this.task)),
    };
  },
  methods: {
    addFile() {
      

    } 
  },
};
</script>
