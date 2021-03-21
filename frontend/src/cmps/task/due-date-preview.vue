<template>
	<section>
		<button class=" preview-timedue" :class="dueClass">
			<i class="far fa-clock"></i>  {{ previewDate(task.dueDate) }}
		</button>
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
			return moment(date).format('DD MMM')
		},
		deteremineDate() {
			const dateStr = (moment(this.task.dueDate).fromNow());
			if (dateStr.includes('ago')) return this.dueClass = "overdue"
			else if (dateStr.includes('days')) this.dueClass = "days"
			else if (dateStr.includes('weeks')) this.dueClass = "weeks"
			else if (dateStr.includes('hours')) this.dueClass = "hours"
			else   this.dueClass = "months"
		}
	}, created() { this.deteremineDate() }
})
</script>
