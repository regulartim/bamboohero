<template>
	<div>
		<app-overlay-share 
			v-if="showOverlayShare"
			@close="showOverlayShare = false"
			:text="shareMsg"
			:url="makeUrl"
			:socialMedia="true">
		</app-overlay-share>

		<h1 class="rank">
			{{ shared ? 
				"My level on " + sitename + ": " 
				: "Your current level: "
			}}
			{{ displayedScore.level }}
			<br>
			{{ displayedScore.rank }}		
		</h1>

		<img
			v-if="displayedScore" 
			:src="getRankPic(displayedScore.image)" 
			alt="panda">
		
		<div v-if="!highestLvl && !shared">
			<appProgressBar
				:filled="displayedScore.score - displayedScore.levelBase"
				:total="displayedScore.levelUp - displayedScore.levelBase"
				color="green">
			</appProgressBar>
			<p>
				Collect
				{{ displayedScore.toNextLevel }}
				more 
				{{ displayedScore.toNextLevel > 1 ? 
					"bamboos" 
					: "bamboo"
				}} 
				for the next level.
			</p>
		</div>

		<div v-if="!shared">
			<app-button				
				btnColor="white"
				btnSymbol="share-alt"
				@btnClicked="share(shareMsg, makeUrl)"
				>
				share
			</app-button>
			<app-button
				btnColor="green"
				btnSymbol="play"
				@btnClicked="goTo('Challenges')"
				>
				new challenge
			</app-button>
		</div>

		<div v-else>
			<p>
				I've earned 
				{{ displayedScore.score }} 
				pieces of bamboo so far!
			</p>
			<app-button
				v-if="shared"
				btnColor="green"
				btnSymbol="play"
				@btnClicked="goTo('Welcome')"
				>
				try it yourself
			</app-button>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			shared() {
				if (this.$route.params.string) {
					return true;
				}
				return false;
			},

			displayedScore() {
				if (this.shared) {
					const str = this.$route.params.string;
					if (!this.validProgressId(str)){
						this.goTo("Welcome");
						return false;
					}
					return this.getScoreData(
						this.decodeProgressId(str)
					);
				}
				return this.playerData;
			},

			// RETURNS TRUE WHEN HIGHEST LEVEL IS REACHED
			highestLvl() {
				return !this.displayedScore.levelUp;
			},

			makeUrl() {				
				return document.location.origin
					+ "/show/" 
					+ this.progressId;
			},

			shareMsg() {
				return "Hey, look what I've achieved on "
				+ this.sitename
				+ "!";
			}			
		}
	}
</script>

<style scoped>
	img {
		margin-bottom: 10px;
		max-width: 100%;
	}

	.rank {
		color: #41b883
	}
</style>