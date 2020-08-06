import Vue from 'vue';
import Router from 'vue-router';

import Welcome from "@/components/PageWelcome.vue";
import Challenges from "@/components/PageChallenges.vue";
import Progress from "@/components/PageProgress.vue";
import CardView from "@/components/PageCardView.vue";
import Rank from "@/components/AppRank.vue";
import Load from "@/components/PageLoad.vue";
import Save from "@/components/PageSave.vue";
import Suggest from "@/components/PageSuggest.vue";
import SuggestionsView from "@/components/PageSuggestionsView.vue";
import Legal from "@/components/PageLegal.vue";
import Install from "@/components/PageInstall.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		let position = { x: 0, y: 0 };
		if (savedPosition) {
			position = savedPosition;
		}
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(position);
			}, 200)
		})
	},
	routes: [
		{
			path: '/',
			name: 'Welcome',
			component: Welcome
		},
		{
			path: '/challenges',
			name: 'Challenges',
			component: Challenges
		},
		{
			path: "/progress", 
			name: "Progress", 
			component: Progress
		},
		{
			path: '/card/:id',
			name: 'CardView',
			component: CardView
		},
		{
			path: '/show/:string',
			name: 'Rank',
			component: Rank
		},
		{
			path: '/load/:string?',
			name: 'Load',
			component: Load
		},
		{
			path: '/save',
			name: 'Save',
			component: Save
		},
		{
			path: '/suggest/:id?',
			name: 'Suggest',
			component: Suggest
		},
		{
			path: '/suggestions',
			name: 'SuggestionsView',
			component: SuggestionsView
		},
		{
			path: '/legal',
			name: 'Legal',
			component: Legal
		},
		{
			path: '/install',
			name: 'Install',
			component: Install
		},
		{
			path: '*', 
			redirect: '/'
		}
	]
})
