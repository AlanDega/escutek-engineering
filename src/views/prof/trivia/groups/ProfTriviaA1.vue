<template>
  <div>
    <v-app-bar>
      <v-spacer></v-spacer>
      <h1 v-if="in_question">{{ question }}</h1>
      <!-- <h1 v-if="lobby"></h1> -->
      <v-spacer></v-spacer>
    </v-app-bar>
    <div v-if="in_lobby">
      <v-row class="fill-height" align="center" justify="space-around">
        <h1>Jugadores{{ present_students.length }}</h1>
        <h1>{{ group_trivia }}</h1>
        <v-btn @click="initializeTrivia" color="deep-purple accent-3" dark
          >Empezar</v-btn
        >
      </v-row>
    </div>
    <div v-if="in_question">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="3">
            <v-row class="fill-height" justify="center" align="center">
              <v-avatar color="deep-purple accent-3">{{}}</v-avatar>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img :src="question_img" class="question-img"></v-img>
          </v-col>
          <v-col cols="3"> </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="row-1">
              <v-col cols="2">
                <v-icon color="white">mdi-triangle</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row class="fill-height" justify="center" align="center">
                  <p>{{ answer1 }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="row-3">
              <v-col cols="2">
                <v-icon color="white">mdi-square</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row class="fill-height" justify="center" align="center">
                  <p>{{ answer2 }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="row-2">
              <v-col cols="2">
                <v-icon color="white">mdi-circle</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row class="fill-height" justify="center" align="center">
                  <p>{{ answer3 }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="row-4">
              <v-col cols="2">
                <v-icon color="white">mdi-rhombus</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row class="fill-height" justify="center" align="center">
                  <p>{{ answer4 }}</p>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="row-3"></v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="row-4"></v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="in_question_result">
      <v-container class="graph">
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-row
              class="fill-height"
              justify="center"
              align="end"
              id="grid-graphs"
            >
              <div v-for="(chart, i) in charts" :key="i">
                <v-card width="50" :height="chart.place" :color="chart.color">
                  <p>
                    {{}}
                  </p>
                </v-card>
              </div>
            </v-row>
            <v-row class="fill-height" justify="center" align="end">
              <div v-for="(card, i) in cards" :key="i">
                <v-card width="50" height="28" :color="card.color">
                  <v-row class="fill-height" justify="center" align="center">
                    <v-icon color="white">{{}}</v-icon>
                  </v-row>
                </v-card>
              </div>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card class="result-card1">
                  <v-container>
                    <v-row
                      class="fill-height"
                      justify="space-between"
                      align="center"
                    >
                      <h3>{{ answer1 }}</h3>
                      <v-icon v-if="(right_answer === answer1)" color="white"
                        >mdi-check-outline</v-icon
                      >
                    </v-row>
                  </v-container>
                </v-card>
                <v-card class="result-card3">
                  <v-container>
                    <v-row
                      class="fill-height"
                      justify="space-between"
                      align="center"
                    >
                      <h3>{{ answer3 }}</h3>
                      <v-icon v-if="(right_answer === answer3)" color="white"
                        >mdi-check-outline</v-icon
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="result-card2">
                  <v-container>
                    <v-row
                      class="fill-height"
                      justify="space-between"
                      align="center"
                    >
                      <h3>{{ answer2 }}</h3>
                      <v-icon v-if="(right_answer === answer2)" color="white"
                        >mdi-check-outline</v-icon
                      >
                    </v-row>
                  </v-container>
                </v-card>
                <v-card class="result-card4">
                  <v-container>
                    <v-row
                      class="fill-height"
                      justify="space-between"
                      align="center"
                    >
                      <h3>{{ answer4 }}</h3>
                      <v-icon v-if="(right_answer === answer4)" color="white"
                        >mdi-check-outline</v-icon
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-row align="start" justify="end">
              <v-btn @click="showLeaderboard" dark color="deep-purple accent-3"
                >Siguiente</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="in_leaderboard">
      <v-container class="graph">
          <v-row align="start" justify="end">
              <v-btn @click="nextQuestion" dark color="deep-purple accent-3"
                >Siguiente</v-btn
              >
            </v-row>
        <v-row class="fill-height" justify="center" align="center">
          <v-card color="black" height="400" width="800">
            <v-list dark>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-row v-for="(student, i) in top_9" :key="i">
                      <v-col cols="6">
                        {{ student.alias }}
                      </v-col>
                      <v-col>
                        {{ student.trivia_xp }}
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../../db";
export default {
  data() {
    return {
      cards: [
        {
          color: "green",
          icon: "mdi-triangle",
        },
        {
          color: "blue",
          icon: "mdi-circle",
        },
        {
          color: "yellow",
          icon: "mdi-square",
        },
        {
          color: "red",
          icon: "mdi-rhombus",
        },
      ],
      charts: [
        {
          color: "green",
          place: 0,
          times_choosed: 0,
        },
        {
          color: "blue",
          place: 0,
          times_choosed: 0,
        },
        {
          color: "yellow",
          place: 0,
          times_choosed: 0,
        },
        {
          color: "red",
          place: 0,
          times_choosed: 0,
        },
      ],

      questions: [],
      user: "",
      in_question: null,
      in_question_result: null,
      in_lobby: null,
      result: false,
      actual_question: 0,
      A1trivia: [],
      active: null,
      trivia_status: [],
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      right_answer: "",
      question_img: "",
      in_leaderboard: false,
      top_9: [],
      students: [],
      present_students: [],
      group_trivia: "",
      cover_img: "",
      answered_students: [],
      correct_answers: 0,
      answers1: 0,
    };
  },
  firestore: {
    A1trivia: db.collection("A1-trivia"),
    trivia_status: db.collection("prof1@gmail.com-trivia-groups"),
    students: db.collection("A1-students"),
  },
  watch: {
    // este es como un created o mounted en realtime
    students() {
      console.log("students", this.students);
      this.students.map((student) => {
        if (student.present === true) {
          this.present_students.push(student.alias);
        }
        if (student.answered === true) {
          this.answered_students.push(student.alias);
          if (
            this.answered_students.length === this.students.length &&
            !this.in_leaderboard
          ) {
            db.collection("prof1@gmail.com-trivia-groups")
              .doc("A1")
              .update({ in_question_result: true, in_question: false })
              .then(() => {
                db.collection("A1-students")
                  .where("answer", "==", this.answer1)
                  .get()
                  .then((querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) =>
                      doc.data()
                    );
                    this.answers1 = documents.length;
                    this.charts[0].place = this.answers1 * 10;
                    console.log("answers1", this.answers1);
                  });
                db.collection("A1-students")
                  .where("answer", "==", this.answer2)
                  .get()
                  .then((querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) =>
                      doc.data()
                    );
                    this.answers2 = documents.length;
                    this.charts[1].place = this.answers2 * 10;
                    console.log("answers1", this.answers2);
                  });
                db.collection("A1-students")
                  .where("answer", "==", this.answer3)
                  .get()
                  .then((querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) =>
                      doc.data()
                    );
                    this.answers3 = documents.length;
                    this.charts[2].place = this.answers3 * 10;
                    console.log("answers3", this.answers3);
                  });
                db.collection("A1-students")
                  .where("answer", "==", this.answer4)
                  .get()
                  .then((querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) =>
                      doc.data()
                    );
                    this.answers4 = documents.length;
                    this.charts[3].place = this.answers4 * 10;
                    console.log("answers1", this.answers4);
                  });

                console.log("estado actualizado");
              });
          }
        }
      });
    },
    A1trivia() {
      // posiblemente tenga que actualizar aqui actual questio nantes de padaral a trivia status
    },
    trivia_status() {
      // if (this.trivia_status[0].in_question_result === true) {
      //   this.in_question = false;
      //   this.in_question_result = true;
      // }
      if (this.trivia_status[0].in_lobby === true) {
        console.log("true");
        // this.in_question = false
        this.in_lobby = true;
      } else {
        this.in_lobby = false;
      }
      if (this.trivia_status[0].active === true) {
        this.active = true;
      } else {
        this.active = false;
      }
      this.actual_question = this.trivia_status[0].question_index;
      this.question = this.A1trivia[this.actual_question].question;
      this.question_img = this.A1trivia[this.actual_question].question_img;
      this.answer1 = this.A1trivia[this.actual_question].answer1;
      this.answer2 = this.A1trivia[this.actual_question].answer2;
      this.answer3 = this.A1trivia[this.actual_question].answer3;
      this.answer4 = this.A1trivia[this.actual_question].answer4;
      this.right_answer = this.A1trivia[this.actual_question].right_answer;
      this.in_question = this.trivia_status[0].in_question;
      this.in_question_result = this.trivia_status[0].in_question_result;
      this.in_leaderboard = this.trivia_status[0].in_leaderboard;
      this.group_trivia = this.trivia_status[0].group_trivia;
      this.cover_img = this.trivia_status[0].trivia_cover;
    },
  },
  mounted() {
    db.collection("A1-students")
      .orderBy("trivia_xp", "desc")
      .limit(9)
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        this.top_9 = documents;
      });
  },
  methods: {
  nextQuestion(){
    db.collection('prof1@gmail.com-trivias-group')
  },
    // in the next question method use increment and clear fields
    initializeTrivia() {
      db.collection("prof1@gmail.com-trivia-groups")
        .doc("A1")
        .update({ in_lobby: false, active: true, in_question: true })
        .then(() => console.log("trivia init"));
    },
    showLeaderboard() {
      db.collection("A1-students")
        .orderBy("trivia_xp", "desc")
        .limit(9)
        .get()
        .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => doc.data());
          this.top_9 = documents;
        });

      db.collection("prof1@gmail.com-trivia-groups")
        .doc("A1")
        .update({ in_leaderboard: true, in_question_result: false })
        .then(() => {
          console.log("state change to leaderboard");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.result-card1 {
  height: 150px;
  width: 100%;
  background: green;
  color: white;
}
.result-card2 {
  height: 150px;
  width: 100%;
  background: yellow;
  color: white;
}
.result-card3 {
  height: 150px;
  width: 100%;
  background: blue;
  color: white;
}
.result-card4 {
  height: 150px;
  width: 100%;
  background: red;
  color: white;
}
#grid-graphs {
  height: 100%;
}
.graph {
  height: 50vh;
}
.xp-text {
  color: white;
}
.lvl-asset {
  height: 160px;
  width: 160px;
}
// con card mx auto fill height justify align en lvl2
.xp-graph {
  width: 60%;
  background: black;
  border-radius: 6px;
  margin-top: 90px;
}
.personal-scoreboard {
}
.question-img {
  height: 100%;
  width: 100%;
}
.row-1 {
  margin-right: 10px;
  background: green;
  border-radius: 6px;
}
.row-2 {
  margin-right: 10px;
  background: rgb(0, 112, 187);
  border-radius: 6px;
}
.row-3 {
  background: rgb(190, 204, 1);
  border-radius: 6px;
}
.row-4 {
  background: rgb(206, 4, 4);
  border-radius: 6px;
}
</style>

// // el prof les puede decir que se metan al numero x y tutlo lpueden encontrar
en explorar
<!-- <v-container class="xp-graph">
        <v-row class="fill-height" justify="center" align="center">
          <v-img class="lvl-asset" contain src="../../../assets/level.svg"></v-img>
        </v-row>
        <v-row justify="end">
          <p class="xp-text">0/1000 XP</p>
        </v-row>
        <v-row class justify="center" align="center">
          <v-progress-linear
            class="ml-12 mr-12"
            color="deep-purple accent-3"
            rounded
            height="6"
            v-model="xp"
          ></v-progress-linear>
        </v-row>
      </v-container> -->
