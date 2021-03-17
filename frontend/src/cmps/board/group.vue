<template>
  <section v-if="group">
      <div>{{group.title}}</div>
      <task-preview v-for="task in group.task" :key="task.id" :task="task"/>
  </section>
</template>

<script>
import taskPreview from '@/cmps/task/task-preview'
export default {
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    created(){
    },
    components: {
        taskPreview
    }
}
</script>
