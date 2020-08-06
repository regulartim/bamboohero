<template>
	<transition name="fade" mode="out-in">
		<div 
			class="ov-shadow ov-shadow-dark"
			@click="$emit('close')">
			<div class="ov-content">
				<app-button
					v-if="socialMedia"
					btnColor="white"
					btnSymbol="facebook-f"
					@btnClicked="shareOn(0)">
					Facebook
				</app-button>
				<app-button
					v-if="socialMedia"
					btnColor="white"
					btnSymbol="twitter"
					@btnClicked="shareOn(1)">
					Twitter
				</app-button>
				<app-button
					btnColor="white"
					btnSymbol="whatsapp"
					@btnClicked="shareOn(2)">
					WhatsApp
				</app-button>
				<app-button
					btnColor="white"
					btnSymbol="telegram-plane"
					@btnClicked="shareOn(3)">
					Telegram
				</app-button>
				<app-button
					btnColor="white"
					btnSymbol="at"
					@btnClicked="shareOn(4)">
					Email
				</app-button>
				<app-button
					btnColor="white"
					btnSymbol="paste"
					@btnClicked="shareOn(5)">
					Copy Link
				</app-button>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			text: String,
			url: String,
			socialMedia: Boolean 
		},
		methods: {
			shareOn(platform) {
				let dummy = document.createElement("input");
				switch(platform) {

					case 0:
					console.log("https://www.facebook.com/sharer/sharer.php" 
							+ this.getUrlParams({
								u: this.url
							}));
						window.open(
							"https://www.facebook.com/sharer/sharer.php" 
							+ this.getUrlParams({
								u: this.url
							}),
							'__blank'
						);
						break;

					case 1:
						window.open(
							'https://www.twitter.com/share' +
								this.getUrlParams({
									url: this.url,
									text: this.text
								}),
							'__blank'
						);
						break;

					case 2:
						window.open(
							'https://api.whatsapp.com/send' +
								this.getUrlParams({
									text: this.text + " " + this.url
								}),
								'__blank'
							);
						break;

					case 3:
						window.open(
							'https://telegram.me/share/' +
							this.getUrlParams({
								text: this.text,
								url: this.url				
							}),
							'__blank'
						);
						break;

					case 4:
						window.location.href = 
							"mailto:?subject=" 
							+ this.text + 
							"&body="
							+ this.url;
						break;

					case 5: 
						document.body.appendChild(dummy);
						dummy.setAttribute('value', this.url);
						dummy.select();
						document.execCommand("copy");
						document.body.removeChild(dummy);
						break;
				}	
			},

			// Converts specific sharing request to URL parameters
			getUrlParams(object) {
				return (
					'?'
					+ Object.keys(object)
						.filter(key => !!object[key])
						.map(key => `${key}=${encodeURIComponent(object[key])}`)
						.join('&')
				)
			}
		}
	} 
</script>

<style scoped>
	.ov-content {
		position: absolute;
		top: 50%; 
		left: 50%;
		width: 80%;
		max-width: 500px;
		transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		z-index: 4; 
	}
</style>