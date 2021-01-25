<template>
  <v-footer
    color="deep-purple"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="py-4 text-center white--text"
        cols="12"
      >
        <v-btn
          @click="openGh"
          rounded
          dark
          small
          class="mr-3">Github</v-btn>
        <small>{{ new Date().getFullYear() }}</small> Ruslan Tikhomirov
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  methods: {
    openGh: () => window.open('https://github.com/Ruslan43G'),
  },
};
</script>
