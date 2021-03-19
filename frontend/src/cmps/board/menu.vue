<template>
	<section>
		<h1>Activity Log</h1>
		<section v-for="activity in activities" :key="activity.id">
			<p>{{ activity.byMember }} {{ activity.title }} {{moment().fromNow(activity.createdAt)}}</p>
		</section>
		<pre>{{ activities }}</pre>
	</section>
</template>

<script>
import moment from 'moment'
export default {
	computed: {
		activities() {
			return this.$store.getters.activityLog
		},

	},
	methods: {
		moment: function () {
			return moment();
		}
	},
}
</script>