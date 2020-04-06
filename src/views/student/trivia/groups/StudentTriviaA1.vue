<template>
  <div>
    <v-app-bar>
      <v-spacer></v-spacer>
      <!-- <h1>{{this.user_alias + '-' + this.battle_xp}}</h1> -->
    </v-app-bar>
    <v-container class="main-container">
      <div v-if="active">
        <v-row class="row-1">
          <v-col @click="checkAnswer1" cols="6" id="green-btn">
            <v-row class="fill-height" justify="center" align="center">
              <v-icon color="white">mdi-triangle</v-icon>
            </v-row>
          </v-col>
          <v-col cols="6" id="yellow-btn"></v-col>
        </v-row>
        <v-row class="row-2">
          <v-col class cols="6" id="blue-btn"></v-col>
          <v-col cols="6" id="red-btn"></v-col>
        </v-row>
      </div>
      <div v-if="!active">
        <v-row class="fill-height" justify="center" align="center">
          <!-- Tiutluo de la trivia -->
          <v-col>
            <h1>La Trivia está por empezar</h1>
           
            <!-- <h1>{{this.trivias[0]}}</h1> -->
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
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
      documents:[],
      quizzes:[],
      A_1_trivia:[],

    };
  },
  //simepre tratr de traer la info a la primer linea
   firestore: {
    A_1_trivia: db.collection('A_1_trivia')
  },

  watch:{
      A_1_trivia(){
         if(this.A_1_trivia[0].active === true){
             this.active = true
         } else {
             this.active = false
         }
      }
  },
  mounted() {
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
    checkAnswer1() {}
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