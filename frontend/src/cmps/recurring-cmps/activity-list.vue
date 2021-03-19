<template>
	<section>
		<h1>Activity Log</h1>
		<section v-for="activity in activities" :key="activity.id">
			<!-- <p>{{ activity.byMember.fullname }} {{ activity.title }} {{time(activity.createdAt)}}</p> -->
			{{ renderTask(activity) }} <span class="muted-txt">{{time(activity.createdAt)}}</span>
		</section>
	</section>
</template>

<script>
import moment from 'moment'
export default {
	props: {
		activities: Array
	},

	methods: {
		moment: function () {
			return moment();
		},
		time(date) {
			return moment(date).fromNow()
		},
		renderTask(activity) {
			switch (activity.title) {
				case "added the task": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.task.title}" in "${activity.group}" `
					break;
				}
				case "added the group": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.group}" to the board `
					break;
				}
				case "removed the group": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.group}" from the board `
					break;
				}
			}
		}
	},
}
</script>