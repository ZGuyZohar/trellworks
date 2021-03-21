<template>
	<section>
		<section v-if="from === 'details'">
			<button class="uppercase-title" :class="dueClass">
				{{ dueTime(task.dueDate) }}
			</button>
			<span> {{ fullDate(task.dueDate) }}</span>
		</section>
        <section v-else>
            <button class="uppercase-title" :class="dueClass">
				{{ previewDate(task.dueDate) }}
			</button>
        </section>
	</section>
</template>

<script>
import moment from "moment";

export default ({
	props: {
		task: Object,
		from: String
	},
	data() {
		return {
			dueClass: null,
            fromCmp: this.from
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
			else if (dateStr.includes('days')) this.dueClass = "days"
			else if (dateStr.includes('weeks')) this.dueClass = "weeks"
			else if (dateStr.includes('months')) this.dueClass = "months"
			else if (dateStr.includes('hours')) this.dueClass = "hours"
		}
	},
	created() {
		this.deteremineDate()
		console.log(this.from);
	}
})
</script>
