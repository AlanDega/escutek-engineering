<template>
  <div>
    <v-app-bar>
      <v-spacer></v-spacer>
      <h1>{{questions[actual_index].question}}</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <div v-if="question">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="3">
            <v-row class="fill-height" justify="center" align="center">
              <v-avatar color="deep-purple accent-3">{{questions[actual_index].time_limit}}</v-avatar>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img :src="questions[actual_index].question_img" class="question-img"></v-img>
          </v-col>
          <v-col cols="3">
            <v-row align="start" justify="end">
              <v-btn @click="nextQuestion" dark color="deep-purple accent-3">Siguiente</v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="row-1">
              <v-col cols="2">
                <v-icon color="white">mdi-triangle</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row class="fill-height" justify="center" align="center">
                  <p>{{questions[actual_index].answer1}}</p>
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
                  <p>{{questions[actual_index].answer3}}</p>
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
                  <p>{{questions[actual_index].answer2}}</p>
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
                  <p>{{questions[actual_index].answer4}}</p>
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
    <div v-if="result">
      <v-container class="graph">
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-row class="fill-height" justify="center" align="end" id="grid-graphs">
              <div v-for="(chart, i) in charts" :key="i">
                <v-card width="50" :height="chart.place" :color="chart.color">
                    <p>
                        {{chart.times_choosed}}
                    </p>
                </v-card>
              </div>
            </v-row>
            <v-row class="fill-height" justify="center" align="end">
              <div v-for="(card, i) in cards" :key="i">
                <v-card width="50" height="28" :color="card.color">
                  <v-row class="fill-height" justify="center" align="center">
                    <v-icon color="white">{{card.icon}}</v-icon>
                  </v-row>
                </v-card>
              </div>
            </v-row>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row>
            <v-col>
                
            </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../db";
export default {
  data() {
    return {
      cards: [
        {
          color: "green",
          icon: "mdi-triangle"
        },
        {
          color: "blue",
          icon: "mdi-circle"
        },
        {
          color: "yellow",
          icon: "mdi-square"
        },
        {
          color: "red",
          icon: "mdi-rhombus"
        }
      ],
      charts: [
        {
          color: "green",
          place: 100,
          times_choosed: 10
        },
        {
          color: "blue",
          place: 30,
          times_choosed: 3
        },
        {
          color: "yellow",
          place: 50,
          times_choosed: 5
        },
        {
          color: "red",
          place: 70,
          times_choosed: 7
        }
      ],

      questions: [],
      user: "",
      question: false,
      result: true,
      actual_index: 0
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user.email;

      db.collection(this.user)
        .where("title", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          this.questions = documents;
        });
    });

    //if place 1 100%
  },
  methods: {
    nextQuestion() {
      this.actual_index++;
    }
  }
};
</script>

<style lang="scss" scoped>
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

// // el prof les puede decir que se metan al numero x y tutlo lpueden encontrar en explorar
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