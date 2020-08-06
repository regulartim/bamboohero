<template>
	<div>
		<div v-if="!newPlayer">
			<app-rank></app-rank>

			<br>
			<br>

			<h1>
				What you already did: 
			</h1>

			<app-card-preview
				v-for="card in completedCards"
				:key="card.id"
				:cardId="card.id"
				:cardColor="card.color"
				:cardPreText="card.text"
				:cardSymbol="card.symbol"
				:cardLevel="card.level">
			</app-card-preview>

			<app-stats></app-stats>

			<br><br>
		</div>

		<h1 v-else>
			Nothing here yet... 
		</h1>		

		<div class="controls">
			<app-button
				btnColor="blue"
				btnSymbol="upload"
				@btnClicked="goTo('Load')">
				load
			</app-button>
			<app-button
				v-if="!newPlayer" 
				btnColor="green"
				btnSymbol="save"
				@btnClicked="goTo('Save')">
				save
			</app-button>
			<app-button
				v-if="!newPlayer" 
				btnColor="red"
				btnSymbol="skull"
				@btnClicked="reset()">
				reset
			</app-button>
		</div>

	</div>
</template>

<script>
	export default {
		methods: {
			// Reset progress
			reset() {
				const r = confirm(
					"Do you really want to reset your progress?"
				);
				if (r) {
					this.$store.dispatch('reset');
					this.goTo("Welcome");
				}
			},
		}
	}
</script>

<style scoped>

</style>