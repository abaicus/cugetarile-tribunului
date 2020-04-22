<template>
    <v-item-group :style="{display: 'flex'}">
        <v-btn class="play" :style="{flexGrow: 1}" large depressed block @click="playing ? pause() : play()"
               :color=" playing ? 'error' : 'info'">
            <v-icon v-if="playing">pause</v-icon>
            <span v-else>{{sound.title}}</span>
        </v-btn>
        <v-btn class="copy" :style="{flexGrow: 0}" large depressed block v-clipboard="copy" v-clipboard:success="copied"
               :color="wasCopied ? 'success' : null">
            <v-icon>{{wasCopied ? 'check' : 'content_copy' }}</v-icon>
        </v-btn>
    </v-item-group>
</template>
<script>
	export default {
		name: 'sound-button',
		data: () => ({
			wasCopied: false,
			playing: false
		}),
		mounted() {
			const hash = window.location.hash;
			if (parseInt(hash.replace('#', '')) !== this.index) {
				return false
			}
			const evt = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			});
			document.dispatchEvent(evt);
			setTimeout(() => {
				this.$el.querySelector('.play').dispatchEvent(evt);
			}, 1000)
		},
		props: {
			sound: {},
			index: null
		},
		methods: {
			copied: function () {
				this.wasCopied = true;
				setTimeout(() => {
					this.wasCopied = false;
				}, 1000)
			},
			copy: function () {
				const hash = window.location.hash;
				const href = window.location.href;
				return href.replace(hash, '') + '#' + this.index
			},
			pause: function () {
				window.currentlyPlaying.audio.pause();
				window.currentlyPlaying = {audio: null, component: null};
				this.playing = false;
			},
			play: function () {
				if (this.playing) {
					return false;
				}
				if (window.currentlyPlaying.audio !== null) {
					window.currentlyPlaying.audio.pause();
					window.currentlyPlaying.component.playing = false;
				}
				let component = this;
				component.playing = !component.playing;
				let audio = new Audio(require('@/assets/audio/' + this.sound.sound)),
					duration;
				window.currentlyPlaying.audio = audio;
				window.currentlyPlaying.component = component;
				audio.play().catch( () => {
                 audio.play();
				})

				audio.addEventListener('loadeddata', () => {
					duration = audio.duration;
					setTimeout(function () {
						component.playing = false;
						if (window.currentlyPlaying.component === component) {
							window.currentlyPlaying = {audio: null, component: null};
						}
					}, duration * 1000);
				});
			}
		},
		created() {
			window.currentlyPlaying = {audio: null, component: null};
		}
	};
</script>
<style lang="scss" scoped>
    .play {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }

    .copy {
        margin-left: -1px;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
</style>
