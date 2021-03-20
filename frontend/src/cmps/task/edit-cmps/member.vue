<template>
	<section class="task-members-edit">
		<input
			class="pop-up-input"
			v-model="filterTxt"
			@input="filterMembers"
			placeholder="Search members..."
		/>
		<h3 class="pop-up-title">Members</h3>
		<span
			v-for="member in membersToShow"
			:key="member.id"
			class="flex"
			@click="addMember(member)"
		>
			<avatar :size="40" :username="member.fullname"></avatar>
			<p>{{ member.fullname }}</p>
		</span>
	</section>
</template>
<script>
import Avatar from "vue-avatar";

export default {
	props: {
		task: Object
	},
	data() {
		return {
			filterTxt: '',
			taskToEdit: JSON.parse(JSON.stringify(this.task))
		}
	},
	computed: {
		membersToShow() {
			return this.$store.getters.boardMembersForShow
		},
		taskMembers() {
			return JSON.parse(JSON.stringify(this.currTask.taskMembers))
		},
		boardMembers() {
			return this.$store.getters.currBoardMembers
		}
	},
	methods: {
		filterMembers() {
			this.$store.commit({ type: 'setMembersFilter', filterTxt: this.filterTxt })
		},
		addMember(member) {
			this.taskToEdit.members.push(member)
			this.$emit('updateTask', this.taskToEdit)
		}
	},
	created() {
		this.filterTxt = ''
		this.filterMembers()

	},
	components: { Avatar }
}
</script>
