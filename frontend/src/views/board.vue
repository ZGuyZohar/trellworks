<template>
	<section v-if="currBoard" :board="currBoard">
		<board-header :boardTitle="currBoard.title" />
		<div class="flex board">
			<div class="flex group-container">
				<draggable v-model="groups" class="flex" animation="300" @end="draggingEnd" >
					<group
						v-for="group in groups"
						:key="group.id"
						:group="group"
						@taskDragged="draggingEnd"
					/>
				</draggable>
				<section @click="addGroup" class="transition group group-add">
					<section class="flex group-header">
						<p class="group-title"><i class="fas fa-plus"></i>Add New...</p>
						<i class="fas fa-pencil-alt"></i>
					</section>
				</section>
			</div>
		</div>
		<router-view />
	</section>
</template>

<script>
import boardHeader from "@/cmps/board/board-header";
import group from "@/cmps/board/group";
import draggable from 'vuedraggable'


export default {
	data() {
		return {
			groups: null,
		};
	},
	computed: {
		boardId() {
			return this.$route.params.boardId;
		},
		currBoard() {
			return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
		},
	},
	methods: {
		async loadBoard() {
			await this.$store.dispatch({
				type: "getBoard",
				boardId: this.boardId,
			});
			this.groups = this.currBoard.groups;
		},
		async addGroup() {
			await this.$store.dispatch({
				type: "addGroup",
				boardId: this.boardId,
			});
			await this.loadBoard();
		},
		async draggingEnd() {
      console.log('happening');
      this.currBoard.groups = this.groups
			await this.$store.dispatch({
				type: "saveBoardChanges",
				editedBoard: this.currBoard,
			});
			await this.loadBoard();

		}
	},
	async created() {
		await this.loadBoard();
	},
	components: {
		boardHeader,
		group,
		draggable
	}
}
</script>