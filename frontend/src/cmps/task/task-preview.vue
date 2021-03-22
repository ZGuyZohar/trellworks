<template>
	<section
		@mouseover="toggleEditPen(true)"
		@mouseleave="toggleEditPen(false)"
		@click="getDetails"
		class="task-preview clickable"
	>
		<div class="task-preview-image" v-if="task.imgs.length">
			<img :src="task.imgs[0].src" alt="">
		</div>
		<div class="task-preview-labels" v-if="task.labelIds.length && currBoard">
			<labels-preview
				v-for="labelId in task.labelIds"
				:key="labelId"
				:labelId="labelId"
				:fromPreview="true"
			/>
		</div>
		<p class="task-preview-title">{{ task.title }}</p>
		<div class="preview-footer-container flex">
			<dueDatePreview v-if="task.dueDate" :task="task" />
			<i v-if="task.description" class="fas fa-align-left fa-sm"></i>
			<i
				v-if="isEditPenShown"
				:class="penToggler"
				@click.stop="toggleEdit(true)"
			></i>
			<span class="flex preview-avatar-container">
				<span class="avatar" v-for="member in task.members" :key="member.id">
					<avatar
						v-if="task.members.length"
						:size="20"
						:username="member.fullname"
					></avatar>
				</span>
			</span>
		</div>
		<!-- <quick-edit @toggleEdit="toggleEdit" v-if="showEdit"/> -->
	</section>
</template>

<script>
import labelsPreview from "../task-details/labels-preview.vue";
import quickEdit from "./task-quick-edit";
import Avatar from "vue-avatar";
import dueDatePreview from "@/cmps/task/due-date-preview.vue";


export default {
	props: {
		task: {
			type: Object,
			required: true,
		},
		groupId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isEditPenShown: false,
			showEdit: false,
		};
	},
	computed: {
		currBoard() {
			return this.$store.getters.currBoard;
		},
	},
	methods: {
		getDetails() {
			const currBoard = JSON.parse(
				JSON.stringify(this.$store.getters.currBoard)
			);
			this.$store.commit({ type: "setGroup", groupId: this.groupId });
			this.$store.commit({ type: "setTask", task: this.task });
			this.$router.push(`/board/${currBoard._id}/details/${this.task.id}`);
		},
		toggleEditPen(boolean) {
			this.isEditPenShown = boolean;
		},
		toggleEdit(boolean) {
			this.isEditPenShown = false;
			this.showEdit = boolean;
		},
	},
	computed: {
		penToggler() {
			return { "fas fa-pencil-alt edit-pen": this.isEditPenShown };
		},
	},
	created() {
		this.currBoard = this.$store.getters.currBoard;
	},
	components: {
		quickEdit,
		labelsPreview,
		Avatar,
		dueDatePreview
	},
};
</script>

    