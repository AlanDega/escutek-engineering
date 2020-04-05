<template>
  <div>
    <v-app-bar flat color="white">
      <v-spacer></v-spacer>
      <h1>Mis Trivias</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col cols="8">
          <v-row justify="center">
            <v-card height="50" width="500" outlined class="mb-8">
              <v-row class="fill-height" justify="end" align="center">
                <v-icon color="deep-purple accent-3" class="mr-4"
                  >mdi-magnify</v-icon
                >
              </v-row>
              <v-container>
                <v-row>
                  <v-col cols=""></v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-row>
          <v-row class="fill-height">
            <v-card class="quiz-card" v-for="(trivia, i) in trivias" :key="i">
              <v-row>
                <v-col cols="3">
                  <v-img height="140px" contain :src="trivia.cover_img"></v-img>
                </v-col>
                <v-col cols="9">
                  <v-row class="" align="center">
                    <!-- {{trivia.title}} -->
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          trivia.title
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          trivia.description
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-row>

                  <v-row class="" align="end">
                    <v-icon class="mt-8">mdi-account</v-icon>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="group_dialog">
                      <template v-slot:extension="{ on }">
                        <v-btn
                          v-on="on"
                          class="mt-8 mr-6"
                          color="deep-purple accent-3"
                          dark
                          >Juega</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>Elige un grupo</v-card-title>
                        <v-container fluid class="groups-style">
                          <v-row>
                            <v-col cols="4">
                              <v-card
                                v-for="(a_group, i) in a_groups"
                                :key="i"
                                class="mx-auto"
                              >
                                <v-card-text class="mx-auto">
                                  <h1>{{ a_group }}</h1>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="4">
                              <v-card
                                v-for="(b_group, i) in b_groups"
                                :key="i"
                                class="mx-auto"
                              >
                                <v-card-text class="mx-auto">
                                  <h1>{{ b_group }}</h1>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="4">
                              <v-card
                                v-for="(c_group, i) in c_groups"
                                :key="i"
                                class="mx-auto"
                              >
                                <v-card-text class="mx-auto">
                                  <h1>{{ c_group }}</h1>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="2"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../db";
export default {
  data() {
    return {
      group_dialog:false,
      a_groups: ["A-1", "A-2", "A-3"],
      b_groups: ["B-1", "B-2", "B-3"],
      c_groups: ["C-1", "C-2", "C-3"],
      trivias: [],
      user: null,
      question: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      right_answer: null,
      classroom: null,
      students: [],
      student_name: null,
      student_email: null,
      student_xp: 0,
      // tokens are lvl2
      student_tokens: 0,
      dialog: false,
      fab: false,
      hidden: false,
      tabs: null,
    };
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "success", icon: "share" };
        case "two":
          return { color: "red", icon: "edit" };
        case "three":
          return { color: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    },
  },
  created() {
    this.classroom = this.$route.params.id;
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.email;
        db.collection("quizzes")
          .get()
          .then((querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => doc.data());
            console.log("documents", documents);
            this.trivias = documents;
          });
      }
    });
  },
  methods: {
    goToCreateQuiz() {
      this.$router.push("/create-trivia");
    },
  },
};
</script>

<style>
.quiz-card {
  height: 160px;
  width: 100%;
}
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
