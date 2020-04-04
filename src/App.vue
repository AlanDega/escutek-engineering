<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
    <div v-if="this.$route.name != 'sign-up'">
      <div v-if="this.$route.name != 'login'">
        <v-navigation-drawer
          app
          permanent
          dark
          fixed
          color="deep-purple accent-3"
        >
          <div v-if="prof">
            <v-list nav>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                @click="goToComponent(item)"
              >
                <v-list-item-icon>
                  <v-icon color="">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-if="student">
            <v-list nav>
              <v-list-item
                v-for="item in items2"
                :key="item.title"
                link
                @click="goToComponent(item)"
              >
                <v-list-item-icon>
                  <v-icon color="">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-navigation-drawer>
      </div>
    </div>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "./db";

export default {
  name: "App",

  components: {},

  data: () => ({
    user_type: null,
    user_email: "",
    prof: null,
    student: null,
    items: [
       
        { title: "Trivias", icon: "mdi-gamepad-circle-left", path: "/trivias" },
        // { title: "Auto-trivia", icon: "mdi-gamepad-circle-left", path: "/trivias" },
        // lvl.1 or 2 a.i. c.i. solo
        {
          title: "Clasificación",
          icon: "mdi-trophy-outline",
          path: "/schedule"
        },
        {
          title: "Estadisticas",
          icon: "mdi-chart-timeline-variant",
          path: "/schedule"
        }, 
        // {
        //   title: "Juegos",
        //   icon: "mdi-chart-timeline-variant",
        //   path: "/schedule"
        // }, 
        
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
     items2: [
       
       
       {
         title: "Juegos",
          icon: "mdi-gamepad-square-outline",
          path: "/schedule"
        },
        
       { title: "Clasificación", icon: "mdi-trophy-outline" },
        // {
        //   title: "Examenes",
        //   icon: "mdi-order-bool-descending",
        //   path: "/schedule"
        // },
        {
          title: "Estadísticas",
          icon: "mdi-order-bool-descending",
          // path: "/schedule"
        },
      
        { title: "Ayuda", icon: "mdi-help-circle-outline" }
      ],
  }),
   mounted() {
    console.log("route-name", this.$route.name);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            console.log("app-check", document);
            if (document.user_type === "prof") {
              this.prof = true;
              this.student = false;
              this.director = false;
            } else if (document.user_type === "student") {
              this.student = true;
              this.director = false;
              this.prof = false;
            } 
          });
      }
    });
   },
   methods: {
     goToComponent(item) {
      this.$router.push(item.path);
    },
   },
  
};
</script>
