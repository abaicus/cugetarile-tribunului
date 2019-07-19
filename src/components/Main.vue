<template>
  <div>
    <v-container>
      <v-layout text-xs-center wrap>
      <v-flex xs12>
          <v-card light>
            <v-avatar size="100" class="mt-3">
              <v-img :src="require('../assets/avatar.jpg')"></v-img>
            </v-avatar>
          <sound-board></sound-board>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SoundBoard from "@/components/SoundBoard";
export default {
  components: {
    SoundBoard
  },
};
</script>

<style>
</style>
