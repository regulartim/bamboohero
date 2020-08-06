<template>
	<div>			
		<h1 v-if="displayedCards.length!=0">
			Choose a card to get your challenge:
		</h1>
		<div v-else>
			<h1>WOW! You're great!</h1>
			<h1>There's no new challenge for you at the moment...</h1>
		</div>
		<app-card-preview
			v-for="card in displayedCards"
			:key="card.id"
			:cardId="card.id"
			:cardColor="card.color"
			:cardPreText="card.cat"
			:cardSymbol="card.symbol"
			:cardLevel="card.level">
		</app-card-preview>
		
		<div v-if="developmentMode">
			<hr>
			<app-button
				btnColor="white"
				btnSymbol="th"
				@btnClicked="toggleShowAll()"
				>
				Alle anzeigen
			</app-button>
		</div>		
	</div>
</template>

<script>
	export default {
		computed: {
			displayedCards() {
				if (this.showAll){
					return this.openCards;
				}				
				return this.openCards.filter(card => card.level-1 <= this.playerData.level);	
			},
			showAll() {
				return this.$store.state.showAllCards;
			}			
		},
		methods: {
			toggleShowAll() {
				this.$store.dispatch('toggleShowAll');
			}
		}
	}
</script>