<template>
  <v-row class="d-flex flex-column align-center justify-center">
    <Title :text="title"/>
    <v-col md='10'>
      <v-data-table
        :headers="headers"
        :items="getAllPackages"
        :items-per-page="10"
        class="elevation-1 mb-5"
        loading='true'
        :search="search"
        @click:row='click'
      >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search package by name"
          class="mx-4"
        ></v-text-field>
      </template>
      </v-data-table>
    </v-col>
    <Popup :open="open" :close="closePopup" :data="selected" :stats="info"/>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '../utils/Api';
import Title from '../components/Title.vue';
import Popup from '../components/Popup.vue';

export default {
  name: 'Home',
  components: {
    Title,
    Popup,
  },
  data() {
    return {
      title: 'Top 100 packages',
      headers: [
        {
          text: 'Package name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Package type', value: 'type' },
      ],
      search: '',
      open: false,
      selected: null,
      info: null,
    };
  },
  methods: {
    ...mapActions(['loadPackages']),
    async request() {
      const data = await api.getTopPackages();
      this.loadPackages(data);
    },
    click(item, data) {
      this.selected = data;
      this.open = true;
      this.showStats(data.item.name, data.item.type);
    },
    closePopup() {
      this.open = false;
      this.selected = null;
    },
    async showStats(name, type) {
      const data = await api.showPackageStats(name, type);
      this.info = data;
    },
  },
  computed: {
    ...mapGetters(['getAllPackages']),
  },
  mounted() {
    this.request();
  },
};
</script>
