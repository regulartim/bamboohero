<template>
	<transition 
		:name="navbarTransition.name" 
		:enter-active-class="navbarTransition.class"
		v-if="showInstallPrompt"
		appear>
		<div class="footer">
			<div 
				class="foot-element foot-center bangers"
				@click="installApp()">
				Install this app
			</div>
			<div 
				class="foot-element foot-right"
				@click="footerClicked=true;">
				X
			</div>
		</div>		
	</transition>
</template>

<script>
	export default {

		data() {
			return {
				footerClicked: false,
				nativeInstallPrompt: false,
				appInstalled: false
			}
		},

		computed: {
			showInstallPrompt() {
				// Conditions under which the footer shouldn't appear:
				// - user explicitly said to not show it ever again (see PageInstall.vue) 
				if (this.$store.state.userHideInstallMessage) {
					return false;
				}

				// - user clicked it away or already clicked on it (this is only relevant until page gets reloaded)
				if (this.footerClicked) {
					return false;
				}

				// - the app is already installed
				if (this.appInstalled) {
					return false;
				}

				// - site is NOT opened on a mobile device and the browser doesn't support PWAs
				if (this.detectedBrowser == 'desktop' && this.nativeInstallPrompt == false) {
					return false;
				}

				return true;
			}
		},

		methods: {
			installApp() {
				if (this.nativeInstallPrompt) {
					this.nativeInstallPrompt.prompt();
					return;			
				}
				this.footerClicked = true;
				this.goTo("Install");
			}
		},

		created() {
			// Listen for the installation readiness an save the event
			window.addEventListener('beforeinstallprompt', (event) => {
				this.nativeInstallPrompt = event;
			});

			// Listen for a successful installation
			window.addEventListener('appinstalled', () => {
				this.appInstalled = true;
			});

			// Check if app is launched from the home screen (Chrome)
			if (window.matchMedia('(display-mode: standalone)').matches) {
				this.appInstalled = true;
			}

			// Check if app is launched from the home screen (Safari)
			if (window.navigator.standalone === true) {
				this.appInstalled = true;
			}
		} 
	}
</script>

<style scoped>
	.footer {
		margin: 0;
		height: 36px;
		width: 100%;
		bottom: 0px;
		background-color: #222;
		color: #ffffff;
		position: fixed;
		z-index: 1;
		text-align: center;
		font-size: 150%;
		user-select: none;
	}

	.foot-element {
		cursor: pointer;
		display: inline-block;
		padding-top: 5px;
	}

	.foot-center{		
		float: center;		
	}

	.foot-right{
		position: absolute;
		right: 0;
		padding-right: 15px;		
	}
</style>