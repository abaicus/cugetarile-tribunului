<template>
	<div class="container px-4 py-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
		<SoundButton v-for="(sound, index) in sortedSounds" :key="sound.id" :sound="sound" :index="sound.originalIndex"
			class="w-full" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SoundButton from './SoundButton.vue';

const sounds = ref([
	{ id: 1, title: 'Garda mea', sound: 'baietii.mp3', playing: false },
	{ id: 2, title: 'Scoteti-o din platou', sound: 'calc_in_picioare.mp3', playing: false },
	{ id: 3, title: 'Catea turbata', sound: 'catea.mp3', playing: false },
	{ id: 4, title: 'Dintii la ceafa', sound: 'ceafa.mp3', playing: false },
	{ id: 5, title: 'Cioara din platou', sound: 'cioara_din_platou.mp3', playing: false },
	{ id: 6, title: 'Derbedei', sound: 'derbedeii.mp3', playing: false },
	{ id: 7, title: 'Golan', sound: 'golan.mp3', playing: false },
	{ id: 8, title: 'Hotilor', sound: 'hotilor.mp3', playing: false },
	{ id: 9, title: 'Hotilor 2', sound: 'hotilor2.mp3', playing: false },
	{ id: 10, title: 'Te dau in judecata', sound: 'judecata.mp3', playing: false },
	{ id: 11, title: 'Mars in ma-ta de curva', sound: 'mars.mp3', playing: false },
	{ id: 12, title: 'Du-te in MM', sound: 'mm.mp3', playing: false },
	{ id: 13, title: 'Nu faci dumneata', sound: 'ordine.mp3', playing: false },
	{ id: 14, title: 'Pitica Dracului', sound: 'pitica_dracului.mp3', playing: false },
	{ id: 15, title: 'N-o spui tu', sound: 'pitica_nenorocita.mp3', playing: false },
	{ id: 16, title: 'PITICA NENOROCITA', sound: 'pitica_nenorocita2.mp3', playing: false },
	{ id: 17, title: 'Rusine', sound: 'rusine.mp3', playing: false },
	{ id: 18, title: 'Sictir', sound: 'sictir.mp3', playing: false },
	{ id: 19, title: 'Uite cum Arati', sound: 'uite_cum_arati.mp3', playing: false },
	{ id: 20, title: 'Mana lui Videanu', sound: 'videanu.mp3', playing: false },
	{ id: 21, title: 'Vita incaltata', sound: 'vita.mp3', playing: false },
	{ id: 22, title: 'Marian', sound: 'marian.mp3', playing: false },
	{ id: 23, title: 'Il bag in pizda ma-sii', sound: 'il_bag_in.mp3', playing: false },
	{ id: 24, title: 'Ma-sa de handicapat', sound: 'il_bag_in_masa_de_handicapat.mp3', playing: false },
	{ id: 25, title: 'Hai mai repede', sound: 'hai_mai_repede.mp3', playing: false },
	{ id: 26, title: 'Te-ai nascut chiar asa', sound: 'teai_nascut_chiar_asa.mp3', playing: false }
]);

const hashIndex = ref(null);

onMounted(() => {
	const hash = window.location.hash;
	if (hash) {
		hashIndex.value = parseInt(hash.replace('#', ''));
	}
});

const sortedSounds = computed(() => {
	const soundsWithIndex = sounds.value.map((sound, index) => ({
		...sound,
		originalIndex: index
	}));

	if (hashIndex.value !== null) {
		return [
			...soundsWithIndex.filter(sound => sound.originalIndex === hashIndex.value),
			...soundsWithIndex.filter(sound => sound.originalIndex !== hashIndex.value)
		];
	}

	return soundsWithIndex;
});
</script>