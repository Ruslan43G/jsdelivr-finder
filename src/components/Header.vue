<template>
  <div>
    <v-app-bar
      color="deep-purple"
      dark
      app
      absolute
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="pushToMain" >jsDelivr finder</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      color="deep-purple"
      dark
      floating
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item route to="/" active-class="white--text">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item route to="/search" active-class="white--text">
            <v-list-item-icon>
              <v-icon>search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    pushToMain() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
};
</script>
