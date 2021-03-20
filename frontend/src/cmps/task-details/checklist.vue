<template>
  <section class="task-checklist">
    <p><i class="far fa-check-square"></i> {{ checklist.title }}</p>
    <button class="btn-gray">Add item</button>
  </section>
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
