<template>
  <section class="attachments-preview">
      <i class="fas fa-paperclip"></i>
      <h1 class="details-title">Attachments</h1>
      <section class="attachments-thumbnail">
    <div class="image-preview" v-for="img in task.imgs" :key="img.id">
      <div class="image-cover clickable" >
          <img @click="showImage(true, img)" class="img" :src="img.src">
      </div>
      <div class="image-details">
        <p class="image-name">{{img.name}}</p>
        <small>Added a few seconds ago - <span class="image-info">Comment</span> - 
            <span class="image-info" @click="removeImg(img.id)">Delete</span> - 
            <span @click="toggleEdit(true, img)" class="image-info edit">Edit
            </span>
        </small>
        <small class="image-info cover-maker">Make cover</small>
      </div>
    </div>
    <div class="edit-window pop-up-header" v-if="editToggler">
        <i class="fas fa-times clickable" @click="editToggler = false"> </i>
        <h3>Edit attachment</h3>
        <hr>
        <h3 class="edit-window-title">Link Name</h3>
        <input type="text" class="pop-up-input" v-model="txtToEdit">
        <button class="btn-success" @click="editImg">Update</button>
    </div>
    <section class="image-window" v-if="currImg" @click="showImage(false)">
        <div>
            <img :src="currImg.src" alt="">
        </div>
    </section>
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
            imgToEdit: null,
            txtToEdit: '',
            editToggler: false,
            currImg: null,
        }
    },
    methods: {
        editImg(){
            this.imgToEdit.name = this.txtToEdit;
            const foundIdx = this.taskToEdit.imgs.findIndex(img => img.id === this.imgToEdit.id)
            if(foundIdx<0) return 'couldnt find idx'
            this.taskToEdit.imgs.splice(foundIdx, 1, this.imgToEdit)
            this.$emit('updateTask', this.taskToEdit)
            this.editToggler = false
            console.log(this.editToggler, 'edit');
        },
        removeImg(imgId){
            const foundIdx = this.taskToEdit.imgs.findIndex(img => img.id === imgId);
            if(foundIdx<0) return 'couldnt find idx'
            this.taskToEdit.imgs.splice(foundIdx, 1)
            return this.$emit('updateTask', this.taskToEdit)
        },
        toggleEdit(toggler, img){
            this.editToggler = toggler;
            this.imgToEdit = img;
            this.txtToEdit = img.name
            console.log(this.editToggler, this.imgToEdit);
        },
        showImage(toggler, img){
            if(!toggler) this.currImg = null
            this.currImg = img;
            
        }
    },
    created(){
    }
}
</script>
