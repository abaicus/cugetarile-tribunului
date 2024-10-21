// src/stores/audioPlayerStore.js
import { defineStore } from 'pinia';

export const useAudioPlayerStore = defineStore('audioPlayer', {
  state: () => ({
    currentAudio: null,
    isPlaying: false,
    currentIndex: null,
  }),
  actions: {
    setCurrentAudio(audio, index) {
      if (this.currentAudio && this.currentAudio !== audio) {
        this.currentAudio.pause();
      }
      this.currentAudio = audio;
      this.currentIndex = index;
    },
    play() {
      if (this.currentAudio) {
        this.currentAudio.play();
        this.isPlaying = true;
      }
    },
    pause() {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.isPlaying = false;
      }
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },
  },
});