<template>
	<section>
		<button class="uppercase-title" :class="dueClass">
			{{ dueTime(task.dueDate) }}
		</button>
		<span> {{ fullDate(task.dueDate) }}</span>
	</section>
</template>

<script>
import moment from "moment";

export default ({
	props: {
		task: Object,
	},
	data() {
		return {
			dueClass: ''
		}
	},
	methods: {
		moment: function () {
			return moment();
		},
		dueTime(date) {
			return moment(date).fromNow();
		},
		fullDate(date) {
			return moment(date).format('DD-MM-YYYY HH:MM')
		},
		previewDate(date) {
			return moment(date).format('DD MMMM')
		},
		deteremineDate() {
			const dateStr = (moment(this.task.dueDate).fromNow());
			if (dateStr.includes('ago')) return this.dueClass = "overdue"
			else if (dateStr.includes('days') || dateStr.includes('day')) this.dueClass = "days"
			else if (dateStr.includes('weeks') || dateStr.includes('week')) this.dueClass = "weeks"
			else if (dateStr.includes('hours') || dateStr.includes('hour')) this.dueClass = "hours"
			else this.dueClass = "months"
		}
	}, created() { this.deteremineDate() }

})
</script>
