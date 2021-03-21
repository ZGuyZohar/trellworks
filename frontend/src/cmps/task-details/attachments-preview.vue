<template>
  <section class="attachments-preview">
      <i class="fas fa-paperclip"></i>
      <h1 class="details-title">Attachments</h1>
      <section class="attachments-thumbnail">
    <div class="image-preview" v-for="img in task.imgs" :key="img.name">
      <div class="image-cover" >
          <img class="img" :src="img.src">
      </div>
      <div class="image-details">
        <p class="image-name">{{img.name}}</p>
        <small>Added a few seconds ago - <span class="image-info">Comment</span> - <span class="image-info">Delete</span> - <span class="image-info">Edit</span></small>
        <small class="image-info cover-maker">Make cover</small>
      </div>
    </div>
      </section>
  </section>
</template>

<script>
export default {
    props: {
        task: Object
    },
    data(){
        return {
            taskToEdit: JSON.parse(JSON.stringify(this.task))
        }
    },
    created(){
    }
}
</script>
