<template>
  <v-row class="d-flex flex-column align-center justify-center">
    <Title :text='title'/>
    <h3 class="text-subtitle-1 text-center">
      You can found any package hosted at the jsdelivr.com
    </h3>
    <v-col md='6'>
        <v-form ref="form" @submit.prevent='findPackage'>
          <v-text-field
            append-icon='search'
            label='type a package name'
            v-model="keyword"
            required
            :rules="nameRules"
            >
          </v-text-field>
          <v-select
            :items="items"
            label="Package type"
            solo
            v-model="selectedType"
            :rules="selectRules"
          ></v-select>
          <v-btn type='submit' class="mt-3 deep-purple white--text">Find</v-btn>
        </v-form>
    </v-col>
    <v-col md='6'>
      <v-card
      class="mx-auto"
      width="100%"
      v-if="getSearchResult"
    >
      <v-card-text>
        <div>Package name</div>
        <p class="display-1 text--primary">
          {{ keyword }}
        </p>
        <p>Latest version</p>
        <div class="text--primary">
          {{ getSearchResult.versions[0] }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
          @click="showList = !showList"
        >
          {{ showList ? 'Close files' : 'Show files' }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-treeview
      transition
      v-if="showList"
      :items="packageStructure.files"
      item-children="files">
    </v-treeview>

    <v-banner
      single-line
      v-if="fail"
    >
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
        warning
      </v-icon>
      Not found
    </v-banner>

  </v-col>
  <v-progress-circular
    v-if="loading"
    indeterminate
    color="deep-purple"
    class="mx-auto">
  </v-progress-circular>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Title from '../components/Title.vue';
import api from '../utils/Api';

export default {
  components: { Title },
  data() {
    return {
      loading: false,
      title: 'Search for a package',
      keyword: '',
      packageStructure: null,
      showList: false,
      fail: null,
      nameRules: [
        (v) => !!v || 'This field is required',
      ],
      selectRules: [(v) => !!v || 'Item is required'],
      items: ['npm', 'gh'],
      selectedType: '',
    };
  },
  methods: {
    ...mapActions(['loadFoundedPackage']),
    async findPackage() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const data = await api.findPackage(this.keyword, this.selectedType);
        if (data) {
          this.fail = false;
          this.loading = false;
          this.loadFoundedPackage(data);
          this.listPackageFiles();
        } else {
          this.loading = false;
          this.fail = true;
          this.showList = false;
          this.loadFoundedPackage(null);
        }
      }
    },
    async listPackageFiles() {
      const data = await api
        .listPackagefiles(this.keyword, this.getSearchResult.versions[0], this.selectedType);
      this.packageStructure = data;
    },
    resetData() {
      this.loading = false;
      this.fail = null;
      this.showList = false;
      this.loadFoundedPackage(null);
      this.keyword = '';
      this.packageStructure = null;
    },
  },
  computed: {
    ...mapGetters(['getSearchResult']),
  },
  mounted() {
    this.resetData();
  },

};
</script>
