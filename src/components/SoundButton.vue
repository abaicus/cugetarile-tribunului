<template>
	<v-btn ripple large depressed block @click="play" :disabled="playing" color="error" :loading="playing">
		<v-icon left dark>play_arrow</v-icon>
		{{sound.title}}
	</v-btn>
</template>
<script>
	export default {
		name: 'sound-button',
		data: () => ( {
			playing: false
		} ),
		props: {
			sound: {}
		},
		methods: {
			play: function() {
				if ( this.playing ) {
					return false;
				}
				if ( window.currentlyPlaying.audio !== null ) {
					window.currentlyPlaying.audio.pause();
					window.currentlyPlaying.component.playing = false;
				}
				let component = this;
				component.playing = !component.playing;
				let audio = new Audio( require( '@/assets/audio/' + this.sound.sound ) ),
						duration;
				window.currentlyPlaying.audio = audio;
				window.currentlyPlaying.component = component;
				audio.play();

				audio.addEventListener( 'loadeddata', () => {
					duration = audio.duration;
					setTimeout( function() {
						component.playing = false;
						if ( window.currentlyPlaying.component === component ) {
							window.currentlyPlaying = { audio: null, component: null };
						}
					}, duration * 1000 );
				} );
			}
		},
		created() {
			window.currentlyPlaying = { audio: null, component: null };
		}
	};
</script>
<style lang="scss" scoped>
</style>
