<template>
	<section>
		<h1>Controls</h1>
<activityLog :activities="activities"/>
	</section>
</template>

<script>
import activityLog from '../recurring-cmps/activity-list.vue'
export default {
	computed: {
		activities() {
			return this.$store.getters.activityLog
		},

	},
	methods: {
		moment: function () {
			return moment();
		},
		time(date) {
			return moment(date).fromNow()
		}
	},
	components: { activityLog }
}
</script>