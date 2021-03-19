<template>
	<div class="flex board-header">
		<div class="flex header-container">
			<h2>{{ boardTitle }}</h2>
			<button class="header-btn star"><i class="far fa-star"></i></button>
			<ul class="flex">
				<span  v-for="member in boardMembers" :key="member._id" class="transition board-header-avatar"
					><avatar :size="40" :username="member.fullname"></avatar>
				</span>
			</ul>
			<button class="header-btn">Invite to Board</button>
		</div>
		<button @click="menuShown = !menuShown" class="header-btn">
			Show Menu
		</button>
		<boardMenu class="board-menu" v-if="menuShown"></boardMenu>
	</div>
</template>
<script>
import boardMenu from './menu.vue'
import Avatar from 'vue-avatar'

export default {
	props: {
		boardTitle: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			menuShown: false
		}
	},
	computed: {
		boardMembers() {
			return this.$store.getters.currBoardMembers
		}
	},
  created(){console.log(this.boardMembers);},
	components: { boardMenu, Avatar }
};
</script>