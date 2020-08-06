<template>
	<div>
		<transition 
			name="fade"
			enter-active-class="fade-enter-active-2s"
			appear>
			<h1>
				Welcome
				<span 
					v-if="!newPlayer"> 
					back
				</span>
				!
			</h1>
		</transition>

		<div v-if="newPlayer">
			<img src="@/assets/panda_waving_coat_1000.png" alt="Panda">
		</div>

		<transition 
			name="fade" 
			enter-active-class="fade-enter-active-2s-delayed"
			appear>
			<div>
				<app-rank
					v-if="!newPlayer">					
				</app-rank>
				
				<div v-if="newPlayer">					
					<p>
						Countering climate change is probably the biggest challenge in history.
					</p>
					<p class="together bangers">
						But together we can make it!
					</p>
					<p>	
						Join the climate defending pandas, level up your skills, collect bamboo and become a hero yourself.
					</p>
					<p class="bangers">
						How?
					</p>
					<p>
						You just need to master some challenges.<br>Get your first one here.
					</p>
					
					<app-button
						btnColor="white"
						btnSymbol="arrow-right"
						@btnClicked="goTo('Challenges')">
					</app-button>
				</div>
			</div>
			
		</transition>			
		
	</div>
</template>

<script>
	export default {
		computed: {
			newPlayer() {
				if (this.playerData.score > 0) {
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped>
	h1 {
		font-size: 400%;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	.together {
		font-size: 160%;
	}

	@media only screen and (max-width: 400px) {
		h1 {
			font-size: 300%;
		}
	}
</style>
