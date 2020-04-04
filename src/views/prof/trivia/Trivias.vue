<template>
  <v-container>
    <v-card class="mx-auto" max-width="900">
      <v-toolbar color="deep-purple accent-3" dark>
        <v-row justify="center" class="mt-6">
          <v-icon height="100" width="100">mdi-gamepad-circle-left</v-icon>
        </v-row>
            <template v-slot:extension>
              <v-fab-transition>
                <v-btn
                  color="white"
                  fab
                  large
                  dark
                  absolute
                  bottom
                  right
                  @click="goToCreateQuiz"
                >
                  <v-icon color="deep-purple accent-3"> mdi-plus </v-icon>
                </v-btn>
              </v-fab-transition>
            </template>

         
      </v-toolbar>
      <v-row justify="center">
        <v-col>
          <v-row justify="center">
            <v-list-item v-for="(trivia, index) in trivias" :key="index">
              <v-list-content justify="center">
                <v-list-title justify="center">{{
                  trivia.question
                }}</v-list-title>
              </v-list-content>
            </v-list-item>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../db";
export default {
  data() {
    return {
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
      tabs: null
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
    }
  },
  created() {
    this.classroom = this.$route.params.id;
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        db.collection(user.email)
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log("documents", documents);
            this.trivias = documents;
          });
      }
    });
  },
  methods: {
    // createTrivia() {
    //   db.collection(this.user)
    //     .doc(this.question)
    //     .set({
    //       question: this.question,
    //       answer1: this.answer1,
    //       answer2: this.answer2,
    //       answer3: this.answer3,
    //       answer4: this.answer4,
    //       right_answer: this.right_answer,
    //       selected: null
    //     })
    //     .then(() => {
    //       console.log("exitoTrivia");
    //       db.collection(this.user)
    //         .get()
    //         .then(querySnapshot => {
    //           this.dialog = false;
    //           const documents = querySnapshot.docs.map(doc => doc.data());
    //           console.log("documents", documents);
    //           this.trivias = documents;
    //         });
    //     });
    // },
    goToCreateQuiz(){
        this.$router.push('/create-trivia')
    }
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>