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
        <small>Added a few seconds ago - <span class="image-info">Comment</span> - 
            <span class="image-info">Delete</span> - 
            <span @click="toggleEdit = !toggleEdit" class="image-info edit">Edit
                <div class="edit-window pop-up-header" v-if="toggleEdit">
                    <h3 class="pop-up-title">Edit attachment</h3>
                    <hr>
                </div>
            </span>
        </small>
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
            taskToEdit: JSON.parse(JSON.stringify(this.task)),
            toggleEdit: false
        }
    },
    methods: {
        editImg(){
            console.log('edditing coming soon');
        }
    },
    created(){
    }
}
</script>
