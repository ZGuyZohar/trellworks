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
	data() {
		return {
			filterTxt: ''
		}
	},
	computed: {
		currBoard() {
			return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
		},
		currGroup() {
			return this.$store.getters.currGroup
		},
		currTask() {
			return JSON.parse(JSON.stringify(this.$store.getters.currTask))
		},
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
		getTask() {
			const group = this.currBoard.groups.find(
				(group) => group.id === this.currGroup.id
			);
			const task = group.task.find((task) => task.id === this.currTask.id);
			return task;
		},
		filterMembers() {
			this.$store.commit({ type: 'setMembersFilter', filterTxt: this.filterTxt })
		},
		addMember(member) {
				this.currTask.members.push(member)
			// for (let i = 0; i < this.members.length; i++) {
			// 	if (memberId === this.members[i]) {
			// 		const foundIdx = this.labelIds.findIndex(
			// 			(currLabelId) => currLabelId === labelId);
			// 		this.labelIds.splice(foundIdx, 1);
			// 		task.labelIds = this.labelIds
			// 		return this.$emit('updateBoard', this.currBoard)
			// 	}
			// }
			// this.labelIds.push(labelId);
			// task.labelIds = this.labelIds
			// this.$emit('updateBoard', this.currBoard)
      console.log(this.currTask);
		}
	},
	created() {
		this.filterTxt = ''
		this.filterMembers()

	},
	components: { Avatar }
}
</script>
