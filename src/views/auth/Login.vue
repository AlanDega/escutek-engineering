<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Login</h2>
        <v-text-field label="name" v-model="name"></v-text-field>
        <v-text-field label="email" v-model="email"></v-text-field>
        <v-text-field label="contraseña" v-model="password"></v-text-field>
        <v-btn @click="login" dark rounded color="deep-purple accent-3">continuar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../../db";
import firebase from "firebase";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error);
        })
        .then(() => {
          console.log("exito");
          this.$router.push("/");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>