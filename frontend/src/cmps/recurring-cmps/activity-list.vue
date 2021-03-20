<template>
	<section class="activity-log">
		<h1 class="details-title">Activity Log</h1>
		<section
			v-for="activity in activities"
			:key="activity.id"
			class="activity-container"
		>
			<section class="flex activity">
				<span class="avatar"
					><avatar :size="40" :username="activity.byMember.fullname"></avatar>
				</span>
				<span class="flex activity-details">
					{{ renderTask(activity) }}
					<span class="muted-txt activity-time">{{
						time(activity.createdAt)
					}}</span>
				</span>
			</section>
		</section>
	</section>
</template>

<script>
import moment from "moment";
import Avatar from "vue-avatar";

export default {
	props: {
		activities: Array,
	},

	methods: {
		moment: function () {
			return moment();
		},
		time(date) {
			return moment(date).fromNow();
		},
		renderTask(activity) {
			switch (activity.title) {
				case "added the task": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.task.title}" in "${activity.group}" `;
					break;
				}
				case "added the group": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.group}" to the board `;
					break;
				}
				case "removed the group": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.group}" from the board `;
					break;
				}
				case "renamed a group": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.group}" `;
					break;
				}
				case "removed the task": {
					return `${activity.byMember.fullname} ${activity.title} "${activity.task.title}" from "${activity.group}" `;
					break;
				}
				case "changed the description": {
					return `${activity.byMember.fullname} ${activity.title} of "${activity.task.title}"`
					break;
				}
				case "This board was created": {
					return `${activity.title}`
					break;
				}

				default: {
					return `${activity.byMember.fullname} ${activity.title}`
				}
			}
		},
	},
	components: { Avatar },
};
</script>