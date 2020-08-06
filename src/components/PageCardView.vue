<template>
	<div>
		<!-- OVERLAY WHEN CARD IS COMPLETED -->
		<transition 
			name="fade" 
			leave-active-class="fade-leave-active-point2s"
			mode="out-in">
			<div 
				v-show="showShadow && showCongrats" 
				class="ov-shadow ov-shadow-light">
			</div>
		</transition>
		
		<transition name="flip" mode="out-in">

			<!-- CARD FRONT -->
			<div 
				v-if="!showHelp && !showCongrats" 
				key="card" 
				class="card">
				<app-card-head
					:card="card"
					:icons="true">
					{{ cardHeading }}
				</app-card-head>

				<div class="card-body">
					<div 
						class="card-text"
						v-html="card.text">	
					</div>
				</div>

				<app-card-foot
					:cat="card.cat"
					:level="card.level">					
				</app-card-foot>
			</div>

			<!-- CARD HELP -->
			<div 
				v-if="showHelp" 
				key="help" 
				class="card help">
				<app-card-head
					:card="card"
					:icons="false">
					{{ cardHeading }}
				</app-card-head>

				<div class="card-body">
					<div class="card-text">
						<br>
						<div v-html="card.helptext"></div>
						<br><hr><br>
						<div><b>About {{card.cat}}:</b></div>
						<div v-html="card.catText"></div>	
						<br>
					</div>
				</div>

				<app-card-foot>
				</app-card-foot>
			</div>

			<!-- CONGRATULATIONS -->
			<div 
				v-if="showCongrats" 
				key="congrats" 
				class="card ov-content"
				:class="card.color">

				<div class="congrats-head bangers">
					{{ cardHeading }}
				</div>

				<div class="card-body congrats-body">
					<div 
						v-if="!levelUp">
						<img 
							src="@/assets/panda_flying_800.png"
							alt="panda">					
					</div>
					<div 
						v-else>
						<img
							:src="getRankPic(playerData.image)" 
							alt="panda">
					</div>
				</div>

				<div class="congrats-foot bangers">
					<div v-if="!levelUp">						
						You earned<br>

						{{ card.level }} 
						{{ 
							card.level > 1 ?
								"bamboos"
								: "bamboo"
						}}

						<img 
							src="@/assets/bamboo.svg" 
							alt="bamboo" 
							height="20px">
						!	
					</div> 
					<div v-else>
						Your new rank:<br> 
						{{ playerData.rank }}
					</div>
				</div>
			</div>

		</transition>

		<transition name="slide" mode="out-in">
			
			<!-- BUTTONS DEFAULT -->
			<div 
				v-if="!card.completed && !showHelp" 
				key="controls" 
				class="controls">
				<app-button
					btnColor="blue"
					btnSymbol="th"
					@btnClicked="goTo('Challenges')">
					all cards
				</app-button>
				<app-button
					btnColor="red"
					btnSymbol="question"
					@btnClicked="showHelp=true">
					help
				</app-button>
				<app-button
					btnColor="green"
					btnSymbol="bamboo"
					@btnClicked="completed(id)">
					completed
				</app-button>
			</div>
			
			<!-- BUTTONS FOR HELP -->
			<div 
				v-if="showHelp" 
				key="help" 
				class="controls">
				<app-button
					btnColor="white"
					btnSymbol="arrow-left"
					@btnClicked="showHelp=false">
					back
				</app-button>
			</div>
			
			<!-- BUTTONS FOR CONGRATULATIONS -->
			<div
				v-if="showCongrats"
				key="congrats"
				class="controls ov-content">
				<app-button
					btnColor="blue"
					btnSymbol="arrow-left"
					@btnClicked="showCongrats=false"
					>
					back to card
				</app-button>
				<app-button
					btnColor="yellow"
					btnSymbol="bamboo_small"
					@btnClicked="leaveCongratsTo('Progress')"
					>
					progress
				</app-button>
				<app-button
					btnColor="green"
					btnSymbol="play"
					@btnClicked="leaveCongratsTo('Challenges')"
					>
					new challenge
				</app-button>	
			</div>
			
			<!-- BUTTONS FOR COMPLETED -->
			<div 
				v-if="card.completed && !showCongrats" 
				key="banner">
				<app-button
					btnColor="red"
					btnSymbol="skull"
					@btnClicked="resetId(id)"
					>
					reset this card
				</app-button>
				<app-button
					btnColor="yellow"
					btnSymbol="bamboo_small"
					@btnClicked="goTo('Progress')"
					>
					progress
				</app-button>
				<app-button
					btnColor="green"
					btnSymbol="play"
					@btnClicked="goTo('Challenges')"
					>
					new challenge
				</app-button>				
			</div>

		</transition>

		<div v-if="developmentMode">
			<br>
			<hr>
			<br>

			<app-button
				btnColor="white"
				btnSymbol="comment"
				@btnClicked="editCard(id)">
				Änderung vorschlagen
			</app-button>
		</div>

	</div>
</template>

<script>	
	export default {
		data() {
			return {
				id: parseInt(this.$route.params.id),
				showHelp: false,
				levelUp: false,
				showCongrats: false,
				showShadow: false
			}
		},
		computed: {
			card() {
				const data = this.getCardById(this.id);
				if (!data) {
					this.goTo("Welcome");
				}
				return data;
			},
			cardHeading() {
				if (this.showHelp) {
					return "Help";
				}
				if (this.showCongrats && this.levelUp) {
					return "Level Up!";
				}
				if (this.card.completed) {
					return "Well done!"
				}
				return "Your Challenge";
			},
			playerLevel() {
				return this.playerData.level;
			}			
		},
		watch: {
			playerLevel: function() {
				this.levelUp = true;
			},
			'$route' () {
				this.id = parseInt(this.$route.params.id);
			}
		},
		methods: {
			// Trigger actions when card is completed
			completed(id) {
				this.$store.dispatch('completed', id);
				this.showCongrats = true;				
				setTimeout(()=>{
					this.showShadow = true;
				}, 400);
			},

			// Reset this card
			resetId(id) {
				this.$store.dispatch('reset', id);
			},

			// Fade out the shadow and goTo(somewhere)
			leaveCongratsTo(place) {
				this.showShadow = false;
				setTimeout(()=>{
					this.goTo(place)
				}, 200);
			},

			// Open suggest page to edit a specific card
			editCard(id) {
				this.$router.push({
					name : "Suggest",
					params: {
						id: id
					}
				});
			},
		}
	}
</script>

<style scoped>

	.card {
		width: 300px;
		height: 440px;
		margin: 10px;
		display: inline-block;
		border-radius: 20px;
		background-color: #fff;
		color: #000;
		position: relative;
	}

	.card-body{	
		height: 350px;
		width: 300px;			
		vertical-align: middle;
		position: relative;
		display: table-cell;
	}

	.card-text {
		padding-left: 20px;	
		padding-right: 20px;
		max-height: 350px;
		font-size: 150%;
		display: inline-block;
		overflow: auto;
	}

	.help .card-text{
		text-align: left;
		font-size: 125%;
	}

	.congrats-head {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 400%;
	}

	.congrats-body {
		height: 270px;
	}

	.congrats-foot {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 150%;
	}

	img {
		max-width: 95%;
		max-height: 270px;
	}

	.controls {
		position: relative;		
	}

	.ov-content {
		z-index: 2;
	}

</style>