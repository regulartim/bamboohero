<template>
	<div class="stats">
		<h1>
			Stats:
		</h1>

		<div 
			v-for="cat in categoryStats"
			:key="cat.id">

			<div class="clearfix stats-head">
				<span class="left">
					{{ cat.name }}:
				</span>
				<span class="right">
					{{ cat.completed }} / {{ cat.total }}
				</span>
			</div>
			
			<div class="clear"></div>

			<app-progress-bar
				:filled="cat.completed"
				:total="cat.total"
				:color="cat.color">
			</app-progress-bar>
		</div>
		
		<div class="clearfix stats-head">
			<span class="left">
				Overall: 
			</span>
			<span class="right">
				{{ overallCompleted  }} / {{ overallTotal }}
			</span>
		</div>
		
		<app-progress-bar
			:filled="overallCompleted"
			:total="overallTotal"
			color="black">
		</app-progress-bar>

	</div>
</template>

<script>
	export default {
		computed: {
			overallCompleted() {
				return this.completedCards.length;			
			},
			overallTotal() {
				return (this.overallCompleted + this.openCards.length)
			}
		}
	}
</script>

<style scoped>

	.stats {
		max-width: 400px;
		margin: auto;
	}
	.stats-head{
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 16pt;
	}
	.left {
		float: left;
	}

	.right {
		float: right;
	}
</style>