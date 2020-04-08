<template>
  <v-container>
    <h2>Registrate</h2>
    <v-text-field label="Alias" v-model="alias"></v-text-field>
    <v-select
      v-model="selected_group"
      label="Grupos"
      :items="groups"
    ></v-select>
    <v-text-field label="Email" v-model="email"></v-text-field>
    <v-text-field label="Contraseña" v-model="password"></v-text-field>
    <v-text-field
      label="Confirmar Contraseña"
      v-model="confirmed_password"
    ></v-text-field>
    <v-btn rounded dark color="deep-purple accent-3" @click="signUp"
      >Continuar</v-btn
    >
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";
export default {
  data() {
    return {
      selected_group:'',
      groups:['A1','A2','A3'],
      email: null,
      password: null,
      confirmed_password: null,
      alias: null
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          db.collection("users")
            .doc(this.email)
            .set({
              alias: this.alias,
              email: this.email,
              password: this.email,
              user_type: 'student',
              group: this.selected_group
            });
          this.$router.push("/login")
          .then(() => {
            db.collection(this.selected_group + '-students')
              .doc(this.email)
              .set({
                alias: this.alias,
                answer:null,
                answered: false,
                email: this.email,
                group: this.selected_group,
                in_answer_loading:null,
                in_lobby_loading:null,
                in_question:null,
                trivia_xp:0,
                question_xp:0,
                place:0,
                present:null,
                question_xp:0,
                response_time:0,
                right:null,
                wrong:null,
                xp:0,

              })
          })
        })
    }
  }
};
</script>

<style lang="scss" scoped></style>
