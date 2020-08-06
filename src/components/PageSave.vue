<template>
	<div>
		<app-overlay-share 
			v-if="showOverlayShare"
			@close="showOverlayShare = false"
			:text="shareMsg"
			:url="currentUrl"
			:socialMedia="false">
		</app-overlay-share>

		<div>
			
			<h1>Save</h1>
			
			<div v-if="!newPlayer">
				<p>
					Although we store your progress on your browser, there are some situations where it might get lost. 
					<br>In this case, your can restore your current progress by entering this ProgressID: 
				</p>

				<p class="green-text">{{ progressId }} </p>
				<p>Or by calling this URL:</p>
				<p><a :href="makeUrl">{{ makeUrl }}</a></p>

				<app-button
					btnColor="white"
					btnSymbol="share-alt"
					@btnClicked="share(shareMsg, makeUrl)">
					share
				</app-button>
			</div>

			<div v-else>
				<p>There's nothing to save yet...</p>

				<app-button
					btnColor="white"
					btnSymbol="arrow-right"
					@btnClicked="goTo('Challenges')">
					Get your first challenge
				</app-button>
			</div> 

		</div>

	</div>
</template>

<script>
	export default {
		computed: {
			makeUrl() {
				return document.location.origin 
					+ "/load/" 
					+ this.progressId;
			},
			
			shareMsg() {
				return 'This is the URL to load my progress on '
					+ this.sitename;
			}			
		}
	}
</script>