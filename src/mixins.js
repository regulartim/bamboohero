import { mapGetters } from 'vuex';

export default {

	data () {
		return {
			showMenu: false,
			showOverlayShare: false,
			developmentMode: this.$store.state.developmentMode,
			sitename: this.$store.state.sitename,
		}
	},	

	computed: {

		currentUrl() {
			return window.location.href;
		},	

		newPlayer() {
			if (this.playerData.score > 0) {
				return false;
			}
			return true;
		},

		navbarTransition() {
			if (window.location.pathname == "/") {
				return {
					name: "fade",
					class: "fade-enter-active-2s-delayed"
				};
			}
			return {name: "none", class: "none"};
		},

		userAgent() {
			return navigator.userAgent;
		},

		detectedBrowser() {
			if (!this.userAgent.match(/Mobi/i)) {
				return "desktop";
			}

			if (this.userAgent.match(/Firefox/i)) {
				return "firefox";
			}

			if (this.userAgent.match(/Focus/i)) {
				return "focus";
			}

			if (this.userAgent.match(/Samsung/i)) {
				return "samsung";
			}

			if (this.userAgent.match(/Chrom/i)) {
				return "chrome";
			}

			if (this.userAgent.match(/Safari/i)) {
				return "safari";
			}

			return "other";				
		},	

		...mapGetters({
			// Cached getters
			openCards: "getOpenCards",
			completedCards: "getCompletedCards",
			categoryStats: "getCategoryStats",
			playerData: "getPlayerData",
			progressId: "getProgressId",

			// Getters that are accessed via methods
			getCardById: "getCardById",
			getScoreData: "getScoreData",
		})
	},


	methods: {
		
		// Getting the path of images/symbols
		getImgUrl(sym) {
			return require('@/assets/'+sym+'.svg')
		},
		getRankPic(img) {
			return require('@/assets/'+img+'.png');
		},

		// Routing
		goTo(place) {
			this.$router.push({
				name : place
			});
			this.showMenu = false;
		},

		// Show this card in card view
		showCard(id) {
			this.$router.push({
				name : "CardView",
				params: {
					id: id
				}
			});
			this.showMenu = false;
		},

		// Helper for sharing
		share(text, url) {
			if (navigator.share) {
				navigator.share({
					title: 'Prototype',
					text: text,
					url: url
				});
			} else {
				this.showOverlayShare = true;
			}
		},

		// Check if input is a valid 'completed'-array
		validProgressId(str) {
			if (!str.match("^([0-9a-fA-F]+)$")) {
				return false;
			}
			let returnValue = true;			
			this.decodeProgressId(str).forEach(id => {
				const exists = this.getCardById(id);
				if (!exists) {
					returnValue = false;
				}
			});
			return returnValue;
		},

		// Turns progress id (hex string) in a 'completed'-array
		decodeProgressId(hexString) {
			let binString = "";
			hexString
				.split("")
				.forEach(element => {
					binString = binString + parseInt(element,16)
						.toString(2)
						.padStart(4,"0")
			});

			let newCompleted = []
			binString
				.split("")
				.reverse()
				.forEach((element, index) => {
					if (element == 1) {
						newCompleted.push(index);
					}
				});

			return newCompleted;
		}
	}
}