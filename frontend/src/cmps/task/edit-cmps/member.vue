<template>
	<section class="task-members-edit">
		<input class="pop-up-input" v-model="filterTxt" @input="filterMembers" placeholder="Search members..."/>
        <h3 class="pop-up-title">Members</h3>
		<span v-for="member in members" :key="member.id" class="flex">
			<avatar :size="40" :username="member.fullname"></avatar>
      <p>{{ member.fullname }}</p>
		</span>
	</section>
</template>


<script>
import Avatar from "vue-avatar";

export default {
data(){
  return{      filterTxt: ''
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
			return this.$store.getters.currTask
		},

		members() {
			return this.$store.getters.boardMembersForShow
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
    filterMembers(){
      this.$store.commit({type: 'setMembersFilter', filterTxt: this.filterTxt})
    }
	},
  created(){
    this.filterTxt = ''
    this.filterMembers()

  },
  components: {Avatar}
}
</script>
