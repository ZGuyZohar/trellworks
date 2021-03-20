<template>
  <section class="task-checklist">{{ checklist.title }}</section>
</template>


<script>
export default {
  props: {
    checklist: Object,
  },
  created() {
    console.log(this.checklist);
  },
};
</script>
