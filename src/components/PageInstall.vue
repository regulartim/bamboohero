<template>
	<div>
		
		<!-- Installation instructions for Safari and other browsers on iOS -->
		<div v-if="detectedBrowser == 'safari'">
			<img 
				:src="getImgUrl('apple')"
				class="browser-icon" 
				alt="apple">
			<p>
				It seems like you're using an Apple device. So you just need to create a home screen icon for this site.<br>This is how:
			</p>
			<p>
				Tap the share icon, it's typically on the upper right corner...
			</p>
			<img 
				src="@/assets/a2hs_ios1.png"
				class="a2hs-img" 
				alt="a2hs">
			<p>
				... or on the bottom of your screen.
			</p>
			<img 
				src="@/assets/a2hs_ios2.png"
				class="a2hs-img" 
				alt="a2hs">
			<p>
				Tap "Add to home screen".
			</p>
			<img 
				src="@/assets/a2hs_ios3.png"
				class="a2hs-img" 
				alt="a2hs">
			<p>
				Done.
			</p>
			<p>
				If you're not using the Safari browser, this may not work. In this case you can either open Safari for the time of installation or bookmark the page in your current browser. 
			</p>
		</div>

		<!-- Installation instructions for Firefox Mobile -->
		<div v-if="detectedBrowser == 'firefox'">
			<img 
				:src="getImgUrl('firefox')"
				class="browser-icon" 
				alt="firefox">
			<p>
				Hey, you're using Firefox! I like that! <br>This is how you install the app:
			</p>
			<p>
				Tap the little house icon with the plus-sign in it. It's up there in your address bar. 
			</p>
			<img 
				src="@/assets/a2hs_firefox.png"
				class="a2hs-img" 
				alt="a2hs">
			<p>Done! :)</p>
		</div>
		
		<!-- Installation instructions for Firefox Focus/Klar -->
		<div v-if="detectedBrowser == 'focus'">
			<img 
				:src="getImgUrl('firefox')"
				class="browser-icon" 
				alt="firefox">
			<p>
				Hey, you're using Firefox Focus (or Firefox Klar, as we call it here in Germany). That's a really good choice. <br> Unfortunately your browser deletes all your game data when you close it. So you can either use another browser for this game or save your progress with an ProgressID whenever you complete a challenge. 
			</p>
			<p>
				If you want to use Firefox Focus anyway and create a home screen icon, just take a look at your browsers menu.
			</p>
			<img 
				src="@/assets/a2hs_focus.png"
				class="a2hs-img" 
				alt="a2hs">
		</div>
		
		<!-- Installation instructions for Samsung Internet -->
		<div v-if="detectedBrowser == 'samsung'">
			<img 
				:src="getImgUrl('android')"
				class="browser-icon" 
				alt="android">
			<p>
				It seems like you're using the Samsung browser. This is how you install the app:
			</p>
			<p>
				Tap the little house icon with the plus-sign in it. It's up there in your address bar. 
			</p>
			<img 
				src="@/assets/a2hs_samsung.png"
				class="a2hs-img" 
				alt="a2hs">
			<p>Done! :)</p>
		</div>
		
		<!-- Installation instructions for other mobile browsers -->
		<div v-if="detectedBrowser == 'other' || detectedBrowser == 'chrome'">
			<img 
				:src="getImgUrl('android')"
				class="browser-icon" 
				alt="android">
			<p>
				You just need to create a home screen icon for this site. Most modern browsers support this function, take a look at your browsers menu.
			</p>
			<img 
				src="@/assets/a2hs_other.png"
				class="a2hs-img" 
				alt="a2hs">
		</div>
		
		<!-- Installation instructions for desktop browsers -->
		<div v-if="detectedBrowser == 'desktop'">
			<img 
				:src="getImgUrl('desktop')"
				class="browser-icon" 
				alt="desktop">
			<p>
				It seems like you're using a PC or a Mac. You can't really install this game on this device.
			</p>
			<p class="bangers">
				Does that mean I can't play?  
			</p>
			<p>
				No, of course you can!<br> Recommendation: Set a bookmark for this site or pin the tab, so you can open it as convenient as an app. 
			</p>
			<p>
				If you want to install this game on your smartphone or your tablet, just open your favourite browser there, go to bamboohero.org and follow the instructions.  
			</p>
		</div>

		<app-button
			btnColor="white"
			btnSymbol="times"
			@btnClicked="hideInstallMessage()">
			Don't show the install message again!
		</app-button>
				
	</div>
</template>

<script>
	export default {
		methods: {
			hideInstallMessage() {
				localStorage.setItem("userHideInstallMessage", true);
				this.$store.commit('LOAD_FROM_LS');
				this.goTo('Welcome');
			}
		}
	}
</script>

<style scoped>
	.browser-icon {
		width: 200px
	}

	.a2hs-img {
		width: 80%;
		max-width: 400px;
		border: 1px solid white;
	}
</style>