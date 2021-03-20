<template>
	<section @mousedown.self="closeModal" class="task-details-modal">
		<div @click="togglePopUp(false)" class="task-details">
			<main class="main">
				<input
					v-model="taskCopy.title"
					@change="updateTask(taskCopy)"
					class="clean-input main-title"
				/>
				<p class="sub-title">
					In <span>{{ currGroup.title }}</span>
				</p>
				<section class="members-labels">
					<div class="members-preview"><!--HERE WILL BE MEMBERS PREVIEW--></div>
					<div class="labels-preview flex" v-if="currTask.labelIds.length">
						<span class="uppercase-title">labels</span>
						<span class="flex">
							<labels-preview
								v-for="labelId in currTask.labelIds"
								:key="labelId"
								:labelId="labelId"
								:currBoard="currBoard"
							/>
						</span>
					</div>
					<task-description
						:task="currTask"
						@updateTask="updateTask"
						@changeMade="changeTaskDetails"
					/>
					<activityLog
						class="task-details-activity"
						:activities="getTaskActivity()"
					/>
				</section>
			</main>
			<div class="action-bar">
				<ul>
					<h3 class="uppercase-title">add to task</h3>
					<li
						v-for="(action, idx) in actions"
						:key="idx"
						@click.stop="togglePopUp(true, action)"
						class="action"
					>
						<i :class="action.iconClass"></i> {{ action.txt }}
					</li>
					<pop-up @closePopUp="togglePopUp" v-if="openPopUp">
						<template v-slot:header>{{ currAction.txt }}</template>
						<component :is="currAction.type" @updateBoard="updateBoard" />
					</pop-up>
				</ul>
				<ul>
					<h3 class="uppercase-title">Actions</h3>
					<li class="action" @click="removeTask()">
						<i class="far fa-trash-alt"></i> Delete Task
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import taskLabels from "@/cmps/task/edit-cmps/task-labels";
import activityLog from "@/cmps/recurring-cmps/activity-list";
import popUp from "@/cmps/task/pop-up";
import labelsPreview from "../cmps/task-details/labels-preview.vue";
import taskDescription from "../cmps/task-details/task-description.vue";

export default {
	data() {
		return {
			actions: [
				{
					txt: "Members",
					type: "taskMembers",
					iconClass: "far fa-user",
				},
				{
					txt: "Labels",
					type: "taskLabels",
					iconClass: "far fa-bookmark",
				},
				{
					txt: "Checklist",
					type: "taskChecklist",
					iconClass: "fas fa-tasks",
				},
				{
					txt: "Attachment",
					type: "taskAttachment",
					iconClass: "fas fa-paperclip",
				},
				{
					txt: "Cover",
					type: "taskCover",
					iconClass: "fas fa-square",
				},
			],
			currAction: null,
			openPopUp: false,
			taskCopy: null,
		};
	},
	computed: {
		currBoard() {
			return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
		},
		currTask() {
			return this.$store.getters.currTask;
		},
		currGroup() {
			return this.$store.getters.currGroup;
		},
		taskId() {
			return this.$route.params.taskId;
		},
	},
	methods: {
		saveActivity(activityTitle) {
			this.$store.dispatch({
				type: "saveActivity",
				activity: activityTitle,
				group: this.currGroup,
				board: this.currBoard,
				task: this.getTask(this.currBoard),
			});
		},
		getTask(board, isIdx) {
			const group = board.groups.find(
				(group) => group.id === this.currGroup.id
			);
			let res;
			if (isIdx) res = group.task.findIndex((task) => task.id === this.taskId);
			else res = group.task.find((task) => task.id === this.taskId);
			return res;
		},
		async updateBoard(board) {
			await this.$store.dispatch({
				type: "saveBoardChanges",
				editedBoard: board,
			});
			this.$store.commit({ type: "setTask", taskId: this.taskId });
		},
		closeModal() {
			this.$router.push(`/board/${this.$route.params.boardId}`);
		},
		togglePopUp(boolean, actionType) {
			this.openPopUp = boolean;
			this.currAction = actionType;
		},
		removeTask() {
			const board = this.currBoard;
			const taskIdx = this.getTask(board, true);
			const group = board.groups.find(
				(group) => group.id === this.currGroup.id
			);
			this.saveActivity("removed the task");
			group.task.splice(taskIdx, 1);
			this.updateBoard(board);
			this.$router.push("../");
		},
		updateTask(task) {
			const updatedTask = JSON.parse(JSON.stringify(task));
			const board = this.currBoard;
			const group = board.groups.find(
				(group) => group.id === this.currGroup.id
			);
			const taskIdx = this.getTask(board, true);
			group.task.splice(taskIdx, 1, updatedTask);
			if (this.currTask.title !== updatedTask.title) this.saveActivity(`changed the task "${this.currTask.title}" to "${updatedTask.title}"`)
			this.updateBoard(board);
		},
		getTaskActivity() {
			const filteredActivities = this.currBoard.activities.filter(
				(activity) => {
					return activity.task.id === this.currTask.id;
				}
			);
			return filteredActivities;
		},
		changeTaskDetails(activityTitle) {
			this.saveActivity(activityTitle)
		}
	},
	created() {
		this.$store.commit({ type: "setTask", taskId: this.taskId });
		this.taskCopy = JSON.parse(JSON.stringify(this.currTask));
	},
	components: {
		popUp,
		taskLabels,
		labelsPreview,
		taskDescription,
		activityLog,
	},
};
</script>
