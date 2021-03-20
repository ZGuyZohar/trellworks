<template>
	<section class="task-members-edit">
		<input class="pop-up-input" placeholder="Search members..."/>
        <h3 class="pop-up-title">Members</h3>
		<span v-for="member in currBoard.members" :key="member.id" class="flex">
			<avatar :size="40" :username="member.fullname"></avatar>
      <p>{{ member.fullname }}</p>
		</span>
	</section>
</template>


<script>
import Avatar from "vue-avatar";

export default {

	computed: {
		currBoard() {
			return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
		},
		currGroup() {
			return this.$store.getters.currGroup
		},
		currTask() {
			return this.$store.getters.currTask
		},
		labelIds() {
			return JSON.parse(JSON.stringify(this.currTask.labelIds))
		},
		btnSuccessTxtToShow() {
			return this.labelEditToggler.type === 'edit' ? 'Save' : 'Create'
		},
		labels() {
			return this.$store.getters.boardLabelsForShow
		}
	},
	methods: {
		getTask() {
			const group = this.currBoard.groups.find(
				(group) => group.id === this.currGroup.id
			);
			const task = group.task.find((task) => task.id === this.currTask.id);
			return task;
		}
	},
  components: {Avatar}
}
</script>
