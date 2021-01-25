<template>
    <v-col cols="auto" v-if="data && stats">
      <v-dialog
        max-width="600"
        :value="open"
        persistent
      >
        <template>
          <v-card>
            <v-toolbar
              color="deep-purple"
              dark
            >Package name: {{ data.item.name }}</v-toolbar>
            <v-card-text class="pt-3">
              <p><span>type:</span> {{ data.item.type }}</p>
              <p><span>rank:</span> {{ stats.rank + 1}}</p>
              <p><span>total:</span> {{ stats.total }}</p>
              <p><span>Last version:</span> {{ lastVersion }}</p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="deep-purple"
                text
                @click="openLink"
              >Open link</v-btn>
              <v-btn
                color="red"
                text
                @click="close"
              >Close modal</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
</template>

<script>
export default {
  props: ['open', 'close', 'data', 'stats'],
  computed: {
    lastVersion() {
      const keys = Object.keys(this.stats.versions);
      return keys[keys.length - 1];
    },
  },
  methods: {
    openLink() {
      window.open(`https://www.jsdelivr.com/package/${this.data.item.type}/${this.data.item.name}`);
    },
  },
};
</script>
