<template>
  <section v-if="group">
      {{group.title}}
      <!-- <template v-for="title in group.task" :key="group.task.id">
          
      </template> -->
  </section>
</template>

<script>
export default {
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    created(){
        console.log(this.group.task);
    }
}
</script>
