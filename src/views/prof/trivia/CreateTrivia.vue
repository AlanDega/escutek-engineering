<template>
  <div>
    <v-app-bar color="white">
      <v-spacer></v-spacer>
      <v-text-field
        v-model="title"
        dense
        label="Título de la trivia"
        outlined
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container class="main-container">
      <v-row>
        <v-col cols="9">
          <v-row class="pregunta">
            <v-container>
              <v-text-field
                v-model="question"
                label="Escribe aquí una pregunta"
              >
              </v-text-field>
            </v-container>
          </v-row>
          <v-row class="uploaders">
            <v-col cols="6">
              <v-row class="fill-height" justify="center" align="center">
                <v-col cols="3"> </v-col>
                <v-col cols="6">
                  <v-slider
                    v-model="time_limit"
                    thumb-label="always"
                    value="5"
                    color="deep-purple accent-3"
                    :min="5"
                    :max="50"
                  >
                  </v-slider>
                </v-col>
                <v-col cols="3"> </v-col>
              </v-row>
              <v-row class="fill-height" justify="center" align="center">
                <v-col cols="3"> </v-col>
                <v-col cols="6">
                  <v-slider
                    v-model="xp_reward"
                    thumb-label="always"
                    value="5"
                    color="deep-purple accent-3"
                    :min="5"
                    :max="50"
                  >
                  </v-slider>
                </v-col>
                <v-col cols="3"> </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <vue-dropzone
                  class="vdzone"
                  ref="imgDropzone"
                  :options="dropzone_options"
                  @vdropzone-complete="afterComplete"
                >
                </vue-dropzone>
              </v-row>
              <v-row class="fill-height" justify="center" align="center">
                <v-btn color="deep-purple accent-3" dark>Libreria</v-btn>
                <v-btn color="deep-purple accent-3" dark>Sube imagen</v-btn>
                <v-btn color="deep-purple accent-3" dark>Youtube</v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="answers">
            <v-col cols="6">
              <v-row justify="center">
                <v-card height="100" width="500" color="green">
                  <v-card-text>
                    <v-row>
                      <v-col cols="10">
                        <v-text-field
                        color="white"
                          v-model="answer1"
                          label="Agrega Respuesta 1"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          fab
                          color="green"
                          @click="select1()"
                        >
                          <v-icon v-if="selected1"  color="white" >mdi-check-bold</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-row>
              <v-row justify="center" class="mt-6">
                <v-card height="100" width="500" color="blue">
                  <v-card-text>
                   <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="answer2"
                          label="Agrega Respuesta 2"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          fab
                          color="blue"
                          @click="selected2 = true"
                        >
                          <v-icon v-if="selected2"  color="white" >mdi-check-bold</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row justify="center">
                <v-card height="100" width="500" color="yellow">
                  <v-card-text>
                   <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="answer3"
                          label="Agrega Respuesta 3"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                       <v-btn
                          fab
                          color="yellow"
                          @click="selected3 = true"
                        >
                          <v-icon v-if="selected3"  color="white" >mdi-check-bold</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-row>
              <v-row justify="center" class="mt-6">
                <v-card height="100" width="500" color="red">
                  <v-card-text>
                   <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="answer4"
                          label="Agrega Respuesta 4"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                       <v-btn
                          fab
                          color="red"
                          @click="selected4 = true"
                        >
                          <v-icon v-if="selected4"  color="white" >mdi-check-bold</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-container>
              <v-row v-for="(question, i) in questions" :key="i">
                <v-card class="mx-auto" color="black" height="100">
                  <h1>{{ question.question }}</h1>
                  <v-img :src="question.question_img"></v-img>
                </v-card>
              </v-row>
              <v-row justify="center">
                <v-btn color="deep-purple accent-3" dark @click="addToQueue"
                  >Agrega Pregunta</v-btn
                >
              </v-row>
            </v-container>
          </v-row>
          <v-row>
            <div v-if="images.length > 0">
              <div v-for="image in images" :key="image.src">
                <img :src="image.src" alt="" />
              </div>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../db";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      selected1:false,
      selected2:false,
      selected3:false,
      selected4:false,
      title: "",
      questions: [],
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      right_answer: "",
      time_limit: null,
      xp_reward: null,
      slider: 0,
      images: [],
      dropzone_options: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png"
      }
    };
  },
  mounted() {
    //         const storageRef = firebase.storage().ref();
    //         //aqui poner titulo de trivia si empiza como untitled y el numero de la pregunta ol a pregunta
    //         const imageRef = storageRef.child(`images/${}.png`);
    //             const downloadUrl =  imageRef.getDownloadURL();
    //         this.images.push({ src: downloadUrl });
  },
  methods: {
    select1(){
      console.log('selected2')
      this.selected1 = true
      this.right_answer = this.answer1
    },
    async afterComplete(file) {
      try {
        const imageName = uuid.v1();
        const metaData = {
          content_type: "image/png"
        };

        const storageRef = firebase.storage().ref();
        //aqui poner titulo de trivia si empiza como untitled y el numero de la pregunta ol a pregunta
        const imageRef = storageRef.child(`images/${imageName}.png`);

        await imageRef.put(file, metaData);

        const downloadUrl = await imageRef.getDownloadURL();
        this.question_img = downloadUrl;
        this.$refs.imgDropzone.removeFile(file);
      } catch (error) {
        console.log(error);
      }
    },
    addToQueue() {
      this.questions.push({
        question: this.question,
        question_img: this.question_img,
        time_limit: this.time_limit,
        xp_reward: this.xp_reward,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
        right_answer: this.right_answer
      });
      (this.question = ""),
        (this.question_img = ""),
        (this.time_limit = null),
        (this.xp_reward = null),
        (this.answer1 = ""),
        (this.answer2 = ""),
        (this.answer3 = ""),
        (this.answer4 = ""),
        (this.right_answer = "");
    }
  }
};
</script>

<style lang="scss" scoped>
.right-answer {
 
}
.slider-style {
  width: 250px;
}
.pregunta {
  height: 20%;
}
.answers {
  margin-top: 300px;
  height: 30%;
}
.uploaders {
  height: 30%;
}
.main-container {
  height: 100vh;
}
.img-div {
  display: flex;
  margin: 25px;
}

img {
  max-width: 250px;
  margin: 15px;
}

.vdzone {
}
</style>
