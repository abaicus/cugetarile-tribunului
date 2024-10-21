<template>
  <div class="px-6 md:p-6 w-full text-center">
    <div class="h-28 w-28 mx-auto mb-5 md:mb-10">
      <img src="../assets/avatar.jpg" alt="Avatar"
        class="rounded-full object-cover w-full h-full filter hue-rotate-30" />
    </div>
    <SoundBoard />
  </div>
</template>

<script>
import SoundBoard from "./SoundBoard.vue";

export default {
  name: 'MainComponent',
  components: {
    SoundBoard
  }
};
</script>