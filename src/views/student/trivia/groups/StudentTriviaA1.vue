<template>
  <div>
    <div v-if="in_lobby">
      <v-container>
        <v-row justify="center">
          <h2>{{group_trivia}}</h2>
        </v-row>
        <v-row>
          <v-img :src="trivia_cover"></v-img>
        </v-row>
        <v-row justify="center">
          <v-btn v-if="!in_lobby_loading" dark color="deep-purple accent-3" @click="sendPresence">Jugar</v-btn>
        </v-row>
      </v-container>
    </div>
    <div v-if="in_lobby_loading">
      <h1>cargando...</h1>
    </div>
    <v-app-bar v-if="in_question">
      <v-spacer></v-spacer>
      <!-- <h1>{{this.user_alias + '-' + this.battle_xp}}</h1> -->
    </v-app-bar>
    <v-container class="main-container">
      <div v-if="in_question">
        <v-row class="row-1">
          <v-col @click="checkAnswer1" cols="6" id="green-btn">
            <v-row class="fill-height" justify="center" align="center">
              <v-icon color="white">mdi-triangle</v-icon>
              <!-- <h1>{{A_1_trivia[0].a}}</h1> -->
            </v-row>
          </v-col>
          <v-col @click="checkAnswer2" cols="6" id="yellow-btn">
            
          </v-col>
        </v-row>
        <v-row class="row-2">
          <v-col class cols="6" id="blue-btn"></v-col>
          <v-col cols="6" id="red-btn"></v-col>
        </v-row>
      </div>
      <div v-if="in_answer_loading">
        <h1>... cargando tu respuesta</h1>
      </div>
      <div v-if="in_question_result">
       <v-row class="fill-height" align="center" justify="center">
 <v-card v-if="right"   color="green">
          <v-row >
          <h1>Correcto! </h1> 
          </v-row>
          <v-row>
            <h1>+10XP</h1>
          </v-row>
          <v-row><v-chip dark>{{trivia_xp}}</v-chip></v-row>
        </v-card>
        <v-card v-if="wrong" height="100" width="100" color="red">
            <v-row >
          <h1>Incorrecto </h1>
          </v-row>
          <v-row><v-chip dark>{{trivia_xp}}</v-chip></v-row>
        </v-card>
       </v-row>
       
      </div>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../../db";
export default {
  data() {
    return {
      in_question: null,
      in_question_result:null,
      questions: [],
      right_answer: null,
      trivia_xp: 0,
      answered: null,
      changes: [],
      documents: [],
      quizzes: [],
      trivia_states: [],
      student_states: [],
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      in_lobby: false,
      in_lobby_loading: false,
      in_answer_loading:false,
      trivia_cover: "",
      user: "",
      right:null,
      wrong:null
    };
  },
  //simepre tratr de traer la info a la primer linea
  firestore: {
    trivia_states: db.collection("prof1@gmail.com-trivia-groups"),
    student_states: db.collection("A1-students"),
    questions: db.collection("A1-trivia")
  },

  watch: {
    trivia_states() {

      if (this.trivia_states[0].in_lobby) {
        // this.in_lobby = true;
        this.group_trivia = this.trivia_states[0].group_trivia;
        this.trivia_cover = this.trivia_states[0].trivia_cover;
      } else {
        this.in_lobby = false
        this.in_lobby_loading = false
      }
      if (this.trivia_states[0].in_question === true) {
        this.in_question = true;
      } else {
        this.in_question = false;
      }
      // if(this.trivia_states[0].in_question_result === true) {
      //   this.in_answer_loading = false
      //   this.in_question_result = true
      // } else {
      //   this.in_question_result = false
      // }
    },
    student_states() {
      // los watchers son para recibir getters bots?
      this.student_states.map(student => {
        if (student.email === this.user) {
          this.trivia_xp = student.trivia_xp
          this.right = student.right
          this.wrong = student.wrong
          if(student.in_answer_loading === true){
            this.in_answer_loading = true
            this.in_question = false
          }
           if(this.trivia_states[0].in_question_result === true) {
        this.in_answer_loading = false
        this.in_question_result = true
      } else {
        this.in_question_result = false
      }
        
          console.log("si", student);
        } else {
          console.log("no", student);
        }
      });
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user.email;
    });

    db.collection('prof1@gmail.com-trivia-groups')
      .doc('A1')
      .get()
      .then(snapshot => {
        const document = snapshot.data()
        if(document.in_lobby === true ){
          this.in_lobby = true
        } else {
          this.in_lobby = false
        }
      })
  },

  methods: {
    sendPresence() {
      db.collection("A1-students")
        .doc(this.user)
        .update({ present: true, })
        .then(() => {
          // this.in_lobby = false
          // this.in_lobby_loading = true
          console.log("presence exito");
          this.in_lobby_loading = true
        });
    },
    checkAnswer1() {
      
      if (this.questions[0].right_answer === this.questions[0].answer1) {
        console.log("acertaste");
      } else {
        console.log("fallaste")
        db.collection('A1-students')
          .doc(this.user)
          .update({answered: true, wrong: true, in_answer_loading: true , in_question:false })
          .then(() => {

          })
      }
    },
    checkAnswer2() {
      if (this.questions[0].right_answer === this.questions[0].answer2) {
        db.collection('A1-students')
          .doc(this.user)
          .update({answered: true, right: true, in_answer_loading: true , in_question:false })
          .then(() => {
            const increment = firebase.firestore.FieldValue.increment(10);
            const triviaXpRef = db
              .collection('A1-students')
              .doc(this.user)
              const batch = db.batch();
              batch.set(triviaXpRef, {trivia_xp:increment}, {merge: true})
              batch.commit().then(() => {
                console.log('trivia xp aumentado')
              })
          })
        console.log("acertaste");
      } else {
        console.log("fallaste")
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.row-1 {
  height: 50%;
}
.row-2 {
  height: 50%;
}

#green-btn {
  width: 100%;
  background: green;
}
#yellow-btn {
  width: 100%;
  background: yellow;
}
#blue-btn {
  width: 100%;
  background: blue;
}
#red-btn {
  width: 100%;
  background: red;
}
.main-container {
  height: 100vh;
}
</style>