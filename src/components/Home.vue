<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="rail = !rail"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item
            >
              <v-list-item-title>  
             <p @click="updateLocale" role="button">
                {{ $t("english") }}
              </p>
            </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-app-bar>
      <v-main> </v-main>
    </v-layout>
  </v-card>

  <v-card>
    <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          expand-on-hover
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            nav
            class="nav-side"
          >
          <v-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
          <p>John Leider</p>
          </v-list-item>
          
  
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item
              v-if="!getIsLoggedIn"
              prepend-icon="mdi-account"
              title="login"
              value="/log-in"
              to="/log-in"
            ></v-list-item>
          </v-list>
          <v-list density="compact" nav v-for="item in items" :key="item.title">
            <v-list-item
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.value"
              :to="item.value"
              v-if="getIsLoggedIn"
            ></v-list-item>
          </v-list>
          <v-list density="compact" nav>
            <v-list-item
              v-if="getIsLoggedIn"
              prepend-icon="mdi-arrow-left"
              title="logout"
              value="/log-in"
              to="/log-in"
              @click="handelSignOut"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
      <v-main class="main-height">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth , onAuthStateChanged} from "@firebase/auth";
import {  signOut } from "firebase/auth";
import { mapState, mapStores } from "pinia";
import { userStore } from "../store/stores/users";
import { userLocal } from "../store/stores/local";
export default defineComponent({
  data() {
    return {
      drawer: true as boolean,
      items: [
        // { title: "Add Product", icon: "mdi-home-city", value: "/" },
        { title: "Show Product", icon: "mdi-account", value: "/" },
        // { title: "Add Users", icon: "mdi-home-city", value: "/add-users" },
        {
          title: "Customers",
          icon: "mdi-account-group-outline",
          value: "/users",
        },
      ],
      rail: true as boolean,
    };
  },
  methods: {
    handelSignOut() {
      signOut(getAuth()).then(() => {
        this.$router.push("/log-in");
      });
      localStorage.removeItem("user token");
    },
    updateLocale() {
      console.log(userLocal().appLocale, "userLocal().appLocale ");

      userLocal().appLocale === "en"
        ? userLocal().changeLocale({ lang: "ar", i18n: this.$i18n })
        : userLocal().changeLocale({ lang: "en", i18n: this.$i18n });
    },
  },
  mounted(){
    onAuthStateChanged(getAuth(),(user) => {
         if(user){
          userStore().setIsLoggedIn(true)
         }else{
          userStore().setIsLoggedIn(false)
         }
    })
  },
  computed: {
    ...mapState(userStore, ["getIsLoggedIn"]),
    ...mapStores(userLocal),
  },
});
</script>
<style lang="scss" scoped>
.nav-side{
  background-image: url("@/assets/image/nav-side-bar.jpg") ;
  height: 9rem;
  width : 16rem;
  display: flex;
  gap: 3rem;
}
.main-height {
  height: 100vh;
}
:deep(.v-list-item__content){
  display: flex;
  flex-direction: column;
  gap: 3rem;
  .v-avatar{
    margin-top: 1rem ;
  }
  p{
    padding: 0.6rem;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: rgba(0,0,0,.5);
    height: 2.5rem;
    width: 16rem;
  }
}
</style>
