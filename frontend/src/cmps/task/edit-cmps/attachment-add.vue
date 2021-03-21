<template>
  <section class="task-attachment">
    <h3 class="pop-up-title">Attach a link</h3>
    <label>
      Upload file
    <input type="file" id="file-upload" @change="addFile" />
    </label>
   <!-- <input type="text" class="pop-up-input" placeholder="Paste any link here..." @paste="addFile"> -->
  </section>
</template>


<script>
import {utilService} from '@/services/util.service.js'
import {uploadImg} from "@/services/img-upload.service.js";
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
    async addFile(ev) {
      const imgUploaded = await uploadImg(ev)
      const img = {
        id: utilService.makeId(),
        src: imgUploaded.url,
        name: `${imgUploaded.original_filename}.${imgUploaded.format}`,
        isCover: false,
        createdAt: Date.now()
      }
      if(this.taskToEdit.imgs.length === 0) img.isCover = true;
      this.taskToEdit.imgs.push(img)
      this.$emit("updateTask", this.taskToEdit);
      console.log(ev.target.file);
    } 
  },
};
</script>
