<template>
	<section class="menu">
		<h1>{{setTitle}}</h1>
		<hr>
		<section v-if="menuToggler" class="menu-info">
			<ul>
				<li>About this board</li>
				<li @click="toggleColorMenu(true)">Change background</li>
				<li>Search tasks</li>
			</ul>
			<activityLog :activities="activities"/>
		</section>
		<section v-else class="color-menu">
			<div class="background-options" v-if="!colorPicker">
				<div class="templates">
					<div class="templates-image"></div>
					<div class="templates-title">Photos</div>

				</div>
				<div @click="toggleColorList(true)" class="colors">
					<div class="colors-image"></div>
					<div class="colors-title">Colors</div>
				</div>
			</div>
			<!-- <div v-else>
				asd
			</div> -->
		</section>
		<i @click="toggleColorMenu(false)" v-if="!menuToggler" class="fas fa-angle-left back-btn clickable"></i>
	</section>
</template>

<script>
import activityLog from '../recurring-cmps/activity-list.vue'
export default {
	data(){
		return {
			openMenu: {
				colorMenu: false
			},
			colorPicker: false
		}
	},
	computed: {
		activities() {
			return this.$store.getters.activityLog
		},
		menuToggler(){
			return this.openMenu.colorMenu ? false : true
		},
		setTitle(){
			return this.openMenu.colorMenu ?  'Change background' : 'Menu'
		}

	},
	methods: {
		moment: function () {
			return moment();
		},
		time(date) {
			return moment(date).fromNow()
		},
		toggleColorMenu(colorMenuToggler){
			this.openMenu.colorMenu = colorMenuToggler;
		}
	},
	components: { activityLog }
}
</script>