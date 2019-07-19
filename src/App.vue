<template>
	<v-app dark>
		<v-toolbar app flat>
			<v-toolbar-title class="headline text-uppercase">
				<span class="font-weight-light">Cugetarile </span>
				<span class="font-weight-black">Tribunului</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
					depressed
					flat
					href="https://github.com/abaicus/cugetarile-tribunului"
					target="_blank"
			>
				<v-icon>star</v-icon>
			</v-btn>
			<v-btn color="info" @click="pause()">
				<v-icon>pause</v-icon>
			</v-btn>
		</v-toolbar>
		<v-content>
			<Main/>
		</v-content>
		<v-footer dark>
			<v-card width="100%">
				<v-card-actions>
					<v-spacer></v-spacer>
					<div>Powered by <a href="https://vuetifyjs.com" target="_blank">Vuetify</a> & <a
							href="https://vuejs.org/" target="_blank">VueJS</a></div>
					<div>&nbsp;&copy; {{ new Date().getFullYear() }}</div>
				</v-card-actions>
			</v-card>
		</v-footer>
	</v-app>
</template>

<script>
	import Main from '@/components/Main';

	export default {
		name: 'App',
		components: {
			Main
		},
		methods: {
			pause: function() {
				if ( window.currentlyPlaying.audio === null ) {
					return false;
				}

				window.currentlyPlaying.audio.pause();
				window.currentlyPlaying.component.playing = false;
			}
		}
	};
</script>
<style lang="scss">
	footer a {
		color: #fff;
		text-decoration: none;
		font-weight: 800;
	}
</style>
