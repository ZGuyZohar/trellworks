<template>
	<section @mousedown.self="closeModal" class="task-details-modal">
		<div @click="togglePopUp(false)" class="task-details">
			<i class="fas fa-times details-close clickable" @click="closeModal"></i>
			<div class="details-header">
				<input
					v-model="taskCopy.title"
					@change="updateTask(taskCopy)"
					class="clean-input main-title"
				/>
				<p class="sub-title">
					In list <span>{{ currGroup.title }}</span>
				</p>
			</div>
			<main class="details-body">
				<section class="main-details">
					<div class="members-preview container">
						<i class="fas fa-user"></i>
						<h1 class="details-title">Members</h1>
						<section
							v-if="currTask.members.length"
							class="flex members-preview"
						>
							<span
								class="flex avatar"
								v-for="member in currTask.members"
								:key="member._id"
								@click="showMemberProfile = !showMemberProfile"
								><avatar :username="member.fullname" :size="40"></avatar
							></span>
						</section>
					</div>
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
					<div v-if="currTask.checklists.length">
						<i class="fas fa-tasks fa-lg"></i>
						<h1 class="details-title">Checklists</h1>
						<checklist
							v-for="checklist in currTask.checklists"
							:key="checklist.id"
							:checklist="checklist"
							:task="currTask"
							@updateTask="updateTask"
						/>
					</div>
					<activityLog
						class="task-details-activity"
						:activities="getTaskActivity()"
					/>
				</section>
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
							<component
								:is="currAction.type"
								@updateBoard="updateBoard"
								@updateTask="updateTask"
								@changeMade="changeTaskDetails"
								@close="togglePopUp(false)"
								:task="currTask"
							/>
						</pop-up>
					</ul>
					<ul>
						<h3 class="uppercase-title">Actions</h3>
						<li class="action" @click="removeTask()">
							<i class="far fa-trash-alt"></i> Delete Task
						</li>
					</ul>
				</div>
			</main>
		</div>
		<memberProfile v-if="showMemberProfile"></memberProfile>
	</section>
</template>

<script>
import taskLabels from "@/cmps/task/edit-cmps/task-labels";
import taskMembers from "@/cmps/task/edit-cmps/member";
import checklistAdd from "@/cmps/task/edit-cmps/checklist-add";
import taskDueDate from "@/cmps/task/edit-cmps/due-date";
import taskAttachment from "@/cmps/task/edit-cmps/attachment-add";
import activityLog from "@/cmps/recurring-cmps/activity-list";
import popUp from "@/cmps/task/pop-up";
import labelsPreview from "../cmps/task-details/labels-preview.vue";
import taskDescription from "../cmps/task-details/task-description.vue";
import checklist from "../cmps/task-details/checklist";
import Avatar from "vue-avatar";
import memberProfile from "../cmps/recurring-cmps/user-miniprofile.vue"


export default {
  data() {
    return {
      showMemberProfile: false,
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
          txt: "Add checklist",
          type: "checklistAdd",
          iconClass: "fas fa-tasks",
        },
        {
          txt: "Due date",
          type: "taskDueDate",
          iconClass: "far fa-clock"
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
      if (this.currTask.title !== updatedTask.title)
        this.saveActivity(
          `changed the task "${this.currTask.title}" to "${updatedTask.title}"`
        );
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
      this.saveActivity(activityTitle);
    },
  },
  created() {
    this.$store.commit({ type: "setTask", taskId: this.taskId });
    this.taskCopy = JSON.parse(JSON.stringify(this.currTask));
    console.log(this.currTask, "currtask");
  },
  components: {
    popUp,
    taskLabels,
    labelsPreview,
    taskDescription,
    activityLog,
    taskMembers,
    checklistAdd,
    checklist,
    taskAttachment,
    taskDueDate,
    Avatar,
		memberProfile
  },
};
</script>
