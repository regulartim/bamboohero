import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import cardData from "../data/cardData.js";
import cardCategories from "../data/cardCategories.js";
import levelData from "../data/levelData.js";

export default new Vuex.Store({
	
	state: {
		cardData: [],
		cardCategories: [],
		levelData: [],
		completed: [],
		userHideInstallMessage: false,

		sitename: "Bamboo Hero",
		versionNumber: "1.0.3",
		developmentMode: false,
		showAllCards: false
	},

	getters: {
		getAllCards(state) {
			return state.cardData.map(cardData => {
				const category = state.cardCategories.find(element => element.id == cardData.cat);
				const completed = state.completed.includes(cardData.id);
				return {
					id: cardData.id,
					text: cardData.text,
					helptext: cardData.helptext,
					level: cardData.level,
					catId: category.id,
					cat: category.name,
					color: category.color,
					symbol: category.symbol,
					catText: category.text,
					completed: completed
				};
			});			
		},

		getCompletedCards(state, getters) {
			return getters.getAllCards
				.filter(card => card.completed == true)
				.sort( (a ,b) => {
					return a.level - b.level;
			});
		},

		getOpenCards(state, getters) {
			return getters.getAllCards
				.filter(card => card.completed == false)
				.sort( (a ,b) => {
					return a.level - b.level;
			});		
		},

		getCardById: (state, getters) => (id) => {
			return getters.getAllCards.find(card => card.id == id);
		},

		getCategoryStats(state, getters) {
			return state.cardCategories.map(cat => {
				const total = getters.getAllCards
					.filter(card => card.catId == cat.id)
					.length;
				const completed = getters.getCompletedCards
					.filter(card => card.catId == cat.id)
					.length;
				return {
					id: cat.id,
					name: cat.name,
					color: cat.color,
					total: total,
					completed: completed,
					open: total-completed,
				}
			});

		},

		// RETURNS PROPERTIES OF A GAMES PROGRESS 
		getScoreData: (state, getters) => (array) => {

			// CALCULATE NR OF LEVELS
			const nrOfLevels = state.levelData.length;

			// CALCULATE SCORE
			let score = 0;
			array.forEach(n => {
				const card = getters.getCardById(n);
				score += card.level;
			});	

			// CALCULATE LEVEL, GET DATA
			// AND GET SCORE NEEDED FOR NEXT LEVEL
			let level = state.levelData[0];
			let nextLvlAt = false;
			for (let i=0; i<nrOfLevels; i++) {		
				if (score >= state.levelData[i].scoreNeeded) {
					level = state.levelData[i];
					nextLvlAt = i+1 < nrOfLevels ? state.levelData[i+1].scoreNeeded : false;
				}
			}

			// MERGE VALUES
			return {
				score: score,
				level: level.levelNumber,
				levelBase: level.scoreNeeded,
				levelUp: nextLvlAt,
				toNextLevel: nextLvlAt - score,
				rank: level.rank,
				image: level.image,
				nrOfLevels: nrOfLevels
			};
		},

		// RETURNS PROPERTIES OF THE LOCAL GAMES PROGRESS 
		getPlayerData(state, getters) {
			return getters.getScoreData(state.completed);
		},

		// CALCULATES A PROGRESS-ID BASED ON THE 'COMPLETED'-ARRAY
		getProgressId(state) {
			if (state.completed.length==0) {
				return 0;
			}
			
			let progressMap = new Array(128).fill(0);		
			state.completed.forEach(element => {
				progressMap[element] = 1;
			});
			
			let hexCode = "";
			const regex = new RegExp('\\B(?=(\\w{4})+(?!\\w))', "g");
			progressMap
				.reverse()
				.join("")
				.replace(/^0+/, '')
				.replace(regex, ',')
				.split(",")
				.forEach(element => {
					hexCode = hexCode 
						+ parseInt(element, 2)
						.toString(16);
				});
			return hexCode
		}
	},

	mutations: {
		'LOAD_CARD_DATA': (state, data) => {
			state.cardData = data;
		},
		'LOAD_CARD_CATEGORIES': (state, data) => {
			state.cardCategories = data;
		},
		'LOAD_LEVEL_DATA': (state, data) => {
			state.levelData = data;
		},
		'SHUFFLE_CARDS': (state) => {
			let a = state.cardData;
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			state.cardData = a;
		},
		'COMPLETED': (state, data) => {
			if (state.completed.includes(data)){
				return false;
			}
			state.completed.push(data);
			state.completed.sort((a, b) => a - b);
		},
		'LOAD_FROM_LS': (state) => {
			if (localStorage.getItem("completed")) {
				state.completed = JSON.parse(localStorage.getItem("completed"));
			}
			if (localStorage.getItem("userHideInstallMessage")) {
				state.userHideInstallMessage = localStorage.getItem("userHideInstallMessage");
			}
			return;
		},
		'SAVE_TO_LS': (state) => {
			localStorage.setItem("completed", JSON.stringify(state.completed));
		},
		'RESET': (state, id) => {
			if (id>=0) {
				const index = state.completed.indexOf(id);
				state.completed.splice(index, 1);
				return;
			}
			state.completed=[];
		},
		'LOAD_FROM_PID': (state, data) => {
			state.completed = data;
		},
		'TOGGLE_SHOW_ALL': (state) => {
			state.showAllCards = !state.showAllCards;
		}
	},

	actions: {
		loadData: ({commit}) => {
			commit('LOAD_CARD_DATA', cardData);
			commit('SHUFFLE_CARDS');
			commit('LOAD_CARD_CATEGORIES', cardCategories);
			commit('LOAD_LEVEL_DATA', levelData);
			commit('LOAD_FROM_LS');
		},
		completed: ({commit}, id) => {
			commit('COMPLETED', id);
			commit('SAVE_TO_LS');
			commit('LOAD_FROM_LS');
		},
		reset: ({commit}, id) => {
			commit('RESET', id);
			commit('SAVE_TO_LS');
			commit('LOAD_FROM_LS');
		},
		loadFromProgressId: ({commit}, data) => {
			commit('LOAD_FROM_PID', data);
			commit('SAVE_TO_LS');
			commit('LOAD_FROM_LS');
		},
		toggleShowAll: ({commit}) => {
			commit('TOGGLE_SHOW_ALL');
		}

	}
});