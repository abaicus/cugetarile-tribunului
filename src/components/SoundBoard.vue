<template>
	<div>
		<v-container fluid grid-list-lg>
			<v-layout wrap justify-center >
				<v-flex xs12 sm12 md6 lg4 xl4
						v-for="(sound, index) in sounds" :key="index">
					<sound-button :sound="sound" :index="index"/>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import SoundButton from './SoundButton';

	export default {
		components: { SoundButton },
		data: () => ( {
			sounds: [
				{
					title: 'Garda mea',
					sound: 'baietii.mp3',
					playing: false
				},
				{
					title: 'Scoteti-o din platou',
					sound: 'calc_in_picioare.mp3',
					playing: false
				},
				{
					title: 'Catea turbata',
					sound: 'catea.mp3',
					playing: false
				},
				{
					title: 'Dintii la ceafa',
					sound: 'ceafa.mp3',
					playing: false
				},
				{
					title: 'Cioara din platou',
					sound: 'cioara_din_platou.mp3',
					playing: false
				},
				{
					title: 'Derbedei',
					sound: 'derbedeii.mp3',
					playing: false
				},
				{
					title: 'Golan',
					sound: 'golan.mp3',
					playing: false
				},
				{
					title: 'Hotilor',
					sound: 'hotilor.mp3',
					playing: false
				},
				{
					title: 'Hotilor 2',
					sound: 'hotilor2.mp3',
					playing: false
				},
				{
					title: 'Te dau in judecata',
					sound: 'judecata.mp3',
					playing: false
				},
				{
					title: 'Mars in ma-ta de curva',
					sound: 'mars.mp3',
					playing: false
				},
				{
					title: 'Du-te in MM',
					sound: 'mm.mp3',
					playing: false
				},
				{
					title: 'Nu faci dumneata',
					sound: 'ordine.mp3',
					playing: false
				},
				{
					title: 'Pitica Dracului',
					sound: 'pitica_dracului.mp3',
					playing: false
				},
				{
					title: 'N-o spui tu',
					sound: 'pitica_nenorocita.mp3',
					playing: false
				},
				{
					title: 'PITICA NENOROCITA',
					sound: 'pitica_nenorocita2.mp3',
					playing: false
				},
				{
					title: 'Rusine',
					sound: 'rusine.mp3',
					playing: false
				},
				{
					title: 'Sictir',
					sound: 'sictir.mp3',
					playing: false
				},
				{
					title: 'Uite cum Arati',
					sound: 'uite_cum_arati.mp3',
					playing: false
				},
				{
					title: 'Mana lui Videanu',
					sound: 'videanu.mp3',
					playing: false
				},
				{
					title: 'Vita incaltata',
					sound: 'vita.mp3',
					playing: false
				}
			]
		} )
	};
</script>

