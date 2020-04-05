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
            <v-card height="50" width="500" outlined>
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
          <v-row class="fill-height" >
            <v-card class="quiz-card" v-for="(trivia, i) in trivias" :key="i">
              <v-row>
                <v-col cols="3">
                  <v-img height="140px" contain :src="trivia.cover_img"></v-img>
                </v-col>
                <v-col cols="9">
                  <v-row class="" align="center">
                    <!-- {{trivia.title}} -->
                    <h2>Title</h2>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-6">mdi-magnify</v-icon>
                  </v-row>
                  <v-row class="fill-height" align="end" > 
                    <v-icon class="mb-10">mdi-account</v-icon>
                    <v-spacer></v-spacer>
                    <v-btn class="mb-10 mr-6" color="deep-purple accent-3" dark>Juega</v-btn>
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
        db.collection(this.user)
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
    goToCreateQuiz() {
      this.$router.push("/create-trivia");
    },
  },
};
</script>

<style>
.quiz-card{
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
