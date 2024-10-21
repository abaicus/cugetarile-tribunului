<template>
	<div class="flex">
		<button @click="playOrPause" :class="[
			'play',
			'text-center flex-grow p-3 px-4 text-sm rounded-l-sm relative overflow-hidden uppercase font-bold focus:outline-none focus:border-indigo-300 focus:ring-indigo-300 focus:ring-1',
			isCurrentlyPlaying ? 'bg-lime-500 text-white' :
				(readyToPlay ? '!bg-pink-600 !hover:bg-pink-700 text-white animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600 text-white')
		]" :style="! readyToPlay ? 'background:linear-gradient(-90deg, #8E2DE2, #4A00E0) fixed' : ''">
			<div v-if="isCurrentlyPlaying" class="absolute left-0 top-0 bottom-0 bg-lime-600 transition-all ease-linear"
				:style="{ width: `${progress}%` }"></div>
			<div class="relative ">
				<PauseIcon v-if="isCurrentlyPlaying" class="h-4 w-4 inline" />
				<PlayIcon v-else-if="readyToPlay" class="h-4 w-4 inline" />
				<span v-else>{{ sound.title }}</span>
			</div>
		</button>
		<button @click="copyUrl" :class="[
			'copy',
			'p-3 px-4 rounded-r-sm focus:outline-none focus:border-gray-300 focus:ring-gray-300 focus:ring-1 focus:z-10',
			wasCopied ? 'bg-lime-500 hover:bg-lime-600' : 'bg-gray-700 hover:bg-zinc-800'
		]">
			<CheckIcon v-if="wasCopied" class="h-4 w-4 text-white" />
			<ClipboardIcon v-else class="h-4 w-4 text-white" />
		</button>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { PauseIcon, PlayIcon, CheckIcon, ClipboardDocumentCheckIcon as ClipboardIcon } from '@heroicons/vue/16/solid';
import { useAudioPlayerStore } from '../stores/audioPlayerStore';


const props = defineProps({
	sound: {
		type: Object,
		lime: true
	},
	index: {
		type: Number,
		lime: true
	}
});

const store = useAudioPlayerStore();
const wasCopied = ref(false);
const readyToPlay = ref(false);
const progress = ref(0);
let audio = null;

const isCurrentlyPlaying = computed(() =>
	store.isPlaying && store.currentIndex === props.index
);

const getAudioUrl = () => {
	/* @vite-ignore */
	return new URL(`../assets/audio/${props.sound.sound}`, import.meta.url).href;
};

const checkHashAndPrepare = () => {
	const hash = window.location.hash;
	if (parseInt(hash.replace('#', '')) === props.index) {
		readyToPlay.value = true;
		document.addEventListener('click', playOnFirstClick, { once: true });
	}
};

const playOnFirstClick = () => {
	play();
	document.removeEventListener('click', playOnFirstClick);
	// remove hash
	window.history.pushState('', document.title, window.location.pathname + window.location.search);
};

const copyUrl = () => {
	const hash = window.location.hash;
	const href = window.location.href;
	const url = href.replace(hash, '') + '#' + props.index;
	navigator.clipboard.writeText(url).then(() => {
		wasCopied.value = true;
		setTimeout(() => {
			wasCopied.value = false;
		}, 1000);
	});
};

const play = () => {
	if (!audio) {
		const audioUrl = getAudioUrl();
		audio = new Audio(audioUrl);
		audio.addEventListener('timeupdate', () => {
			progress.value = (audio.currentTime / audio.duration) * 100;
		});
		audio.addEventListener('ended', () => {
			progress.value = 0;
			store.pause();
		});

		// Smoother progress calculation
		const updateProgress = () => {
			if (audio && !audio.paused) {
				// Fuckery to fix mismatched end
				progress.value = (audio.currentTime / (audio.duration - (15 / 100 * audio.duration))) * 100;
				requestAnimationFrame(updateProgress);
			}
		};
		audio.addEventListener('play', () => {
			requestAnimationFrame(updateProgress);
		});
		audio.addEventListener('pause', () => {
			cancelAnimationFrame(updateProgress);
		});
	}
	store.setCurrentAudio(audio, props.index);
	store.play();
	readyToPlay.value = false;
};

const pause = () => {
	store.pause();
	progress.value = 0;
};

const playOrPause = () => {
	if (isCurrentlyPlaying.value) {
		pause();
	} else {
		play();
	}
};

onMounted(() => {
	checkHashAndPrepare();
});

onBeforeUnmount(() => {
	if (audio) {
		audio.pause();
		audio = null;
	}
	document.removeEventListener('click', playOnFirstClick);
});
</script>