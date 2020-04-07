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
    <v-app-bar v-if="active">
      <v-spacer></v-spacer>
      <!-- <h1>{{this.user_alias + '-' + this.battle_xp}}</h1> -->
    </v-app-bar>
    <v-container class="main-container">
      <div v-if="active">
        <v-row class="row-1">
          <v-col @click="checkAnswer1" cols="6" id="green-btn">
            <v-row class="fill-height" justify="center" align="center">
              <v-icon color="white">mdi-triangle</v-icon>
              <h1>{{A_1_trivia[0].a}}</h1>
            </v-row>
          </v-col>
          <v-col cols="6" id="yellow-btn"></v-col>
        </v-row>
        <v-row class="row-2">
          <v-col class cols="6" id="blue-btn"></v-col>
          <v-col cols="6" id="red-btn"></v-col>
        </v-row>
      </div>
      <!-- <div v-if="!active">
        <v-row class="fill-height" justify="center" align="center">
          <v-col>
            <h1>La Trivia está por empezar</h1>
           
          </v-col>
        </v-row>
      </div>-->
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../../db";
export default {
  data() {
    return {
      active: null,
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
      in_lobby: null,
      in_lobby_loading: null,
      trivia_cover: "",
      user: ""
    };
  },
  //simepre tratr de traer la info a la primer linea
  firestore: {
    trivia_states: db.collection("prof1@gmail.com-trivia-groups"),
    student_states: db.collection("A1-students")
  },

  watch: {
    trivia_states() {
      if (this.trivia_states[0].in_lobby) {
        // this.in_lobby = true;
        this.group_trivia = this.trivia_states[0].group_trivia;
        this.trivia_cover = this.trivia_states[0].trivia_cover;
      } else {
        this.in_lobby = false;
      }
      if (this.trivia_states[0].active === true) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
    student_states() {
      this.student_states.map(student => {
        if (student.email === this.user) {
          if(student.in_lobby_loading === true)
          this.in_lobby_loading = true
          this.in_lobby = false
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
    // db.collection()
    // db.collection("prof1@gmail.com-trivia-groups")
    //   .doc(this.$route.params.id)
    //   .get()
    //   .then(snapshot => {
    //     const document = snapshot.data();
    //     if (document.active === true) {
    //       this.active = true;
    //       db.collection("prof1@gmail.com")
    //         .where("title", "==", document.group_trivia)
    //         .get()
    //         .then(querySnapshot => {
    //           const documents = querySnapshot.docs.map(doc => doc.data());
    //           console.log("docs", documents);
    //           this.questions = documents;
    //   let ref = db.collection("prof1@gmail.com-trivia-groups");
    //   ref.onSnapshot(snapshot => {
    //     snapshot.docChanges().forEach(change => {
    //       if ((change.type = "modified")) {
    //         let doc = change.doc;
    //         console.log("doc-change", doc.data().active);
    //         if(doc.data().active === true)
    //         this.changes.push({
    //           id: doc.id,
    //           active: doc.data().active
    //         })
    //       }
    //     });
    //   });
    // })
    // .then(() => {
    //   const lastChange = this.changes.length - 1;
    //   // last active_change, last xp_change etc.
    //   if (this.changes[lastChange] === true) {
    //     console.log("last change_active is true");
    //     this.active = true;
    //   } else {
    //     console.log("last change active is false");
    //     this.active = false;
    //   }
    // });
    // }
    // console.log("doc", document);
    //   });
  },

  methods: {
    sendPresence() {
      db.collection("A1-students")
        .doc(this.user)
        .update({ present: true, in_lobby_loading: true })
        .then(() => {
          // this.in_lobby = false
          // this.in_lobby_loading = true
          console.log("presence exito");
        });
    },
    checkAnswer1() {
      if (this.A_1_trivia[0].a === this.A_1_trivia[0].right_answer) {
        console.log("acertaste");
      }
    }
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