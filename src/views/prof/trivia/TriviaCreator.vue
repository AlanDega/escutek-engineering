<template>
  <div>
    <v-app-bar color="white">
      <v-spacer></v-spacer>
      <v-row class="fill-height" justify="center" align="center">
        <v-dialog v-model="cover_dialog" width="700" height="800" >
          <template v-slot:activator="{ on }">
            <v-text-field
              append-icon="mdi-image-area"
              @click:append="showCover"
              class="mt-2"
              color="deep-purple accent-3"
              v-model="title"
              v-on="on"
              dense
              label="Título de la trivia"
              outlined
            ></v-text-field>
          </template>
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <v-text-field
                  label="Título de la trivia"
                  v-model="title"
                  color="deep-purple accent-3"
                ></v-text-field>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-textarea color="deep-purple accent-3" v-model="description" outlined label="Escribe aquí la descripción"></v-textarea>
                </v-row>
                <v-row>
 <vue-dropzone
                  id="dropzone2"
                  class="zone2"
                  ref="imgDropzone2"
                  :options="dropzone_options2"
                  v-on:vdropzone-sending="sendingEvent2"
                  @vdropzone-complete="afterComplete2"
                >
                </vue-dropzone>
                </v-row>
               
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>

      <v-spacer></v-spacer>
      <v-btn outlined color="deep-purple accent-3"> Salir</v-btn>
      <v-btn color="green" dark class="ml-4" @click="quizSender"> Hecho </v-btn>
    </v-app-bar>
    <v-container class="main-container">
      <v-row>
        <v-col cols="9">
          <v-container>
            <v-row justify="center">
              <div class="pregunta">
                <v-text-field
                  color="deep-purple accent-3"
                  prepend-icon="mdi-help-rhombus"
                  v-model="question"
                  label="Escribe aquí una pregunta"
                >
                </v-text-field>
              </div>
            </v-row>
          </v-container>
          <v-row class="time-xp">
            <v-col cols="12">
              <v-row class="fill-height" justify="center" align="center">
                <v-col cols="6">
                  <v-slider
                    dense
                    track-color="gray"
                    append-icon="mdi-alarm"
                    v-model="time_limit"
                    thumb-label="always"
                    value="5"
                    color="deep-purple accent-3"
                    :min="5"
                    :max="240"
                    class="pl-12 pr-12"
                  >
                  </v-slider>
                </v-col>

                <v-col cols="6">
                  <v-slider
                    inverse-label
                    label="XP"
                    dense
                    track-color="gray"
                    v-model="xp_reward"
                    thumb-label="always"
                    value="5"
                    color="deep-purple accent-3"
                    :min="10"
                    :max="100"
                    class="pl-12 pr-12"
                  >
                  </v-slider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-btn color="deep-purple accent-3" dark>Libreria</v-btn>
            <v-btn class="ml-6 mr-6" color="deep-purple accent-3" dark
              >Sube imagen</v-btn
            >
            <v-btn color="deep-purple accent-3" dark>Youtube</v-btn>
          </v-row>

          <v-row class="vdzone">
            <v-row justify="center">
              <vue-dropzone
                id="dropzone"
                class="zone"
                ref="imgDropzone"
                :options="dropzone_options"
                v-on:vdropzone-sending="sendingEvent"
                @vdropzone-complete="afterComplete"
              >
              </vue-dropzone>
            </v-row>
          </v-row>

          <v-row class="answers">
            <v-col cols="6">
              <v-container>
                <v-row class="row-1">
                  <v-col cols="8">
                    <v-text-field
                      color="white"
                      v-model="answer1"
                      label="Agrega Respuesta 1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-btn fab color="green" @click="select1()">
                        <v-icon v-if="selected1" color="white"
                          >mdi-check-bold</v-icon
                        >
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-icon large color="white">mdi-image-area</v-icon>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>

              <!-- </v-row> -->
              <v-container>
                <v-row class="row-2">
                  <v-col cols="8">
                    <v-text-field
                      color="white"
                      v-model="answer2"
                      label="Agrega Respuesta 2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-btn fab color="blue" @click="select2()">
                        <v-icon v-if="selected2" color="white"
                          >mdi-check-bold</v-icon
                        >
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-icon large color="white">mdi-image-area</v-icon>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="6">
              <v-container>
                <v-row class="row-3">
                  <v-col cols="8">
                    <v-text-field
                      color="white"
                      v-model="answer3"
                      label="Agrega Respuesta 3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-btn fab color="yellow" @click="select3()">
                        <v-icon v-if="selected3" color="white"
                          >mdi-check-bold</v-icon
                        >
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-icon large color="white">mdi-image-area</v-icon>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row class="row-4">
                  <v-col cols="8">
                    <v-text-field
                      color="white"
                      v-model="answer4"
                      label="Agrega Respuesta 4"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-btn fab color="red" @click="select4()">
                        <v-icon v-if="selected4" color="white"
                          >mdi-check-bold</v-icon
                        >
                      </v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-icon large color="white">mdi-image-area</v-icon>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="questions-sidebar">
          <v-row>
            <v-container>
              <v-row v-for="(question, i) in questions" :key="i">
                <v-card class="mx-auto" color="transparent" height="100">
                  <h1 class="question-text">{{ question.question }}</h1>
                  <!-- <v-img :src="question.question_img"></v-img> -->
                </v-card>
              </v-row>
              <v-row justify="center">
                <v-btn color="deep-purple accent-3" dark @click="addToQueue"
                  >Agrega Pregunta</v-btn
                >
              </v-row>
            </v-container>
          </v-row>
          <!-- <v-row>
            <div v-if="images.length > 0">
              <div v-for="image in images" :key="image.src">
                <img :src="image.src" alt="" />
              </div>
            </div>
          </v-row> -->
        </v-col>
      </v-row>
    </v-container>
    <section>
      <v-snackbar v-model="answer_notif1" color="red">
        <p>
          Escribe la respuesta #1 antes de seleccionar la respuesta correcta
        </p>
      </v-snackbar>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../../db";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
// let uuid = require("uuid");
export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      description:'',
      cover_dialog: false,
      cover_img: "",
      quiz: null,
      rendered_file: null,
      rendered_file2: null,
      question_img: "",
      answer_notif1: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
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
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: "Arrastra tus archivos aquí",
      },
      dropzone_options2: {
        url: "https://httpbin.org/post",
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: "Elige la portada de la Trivia",
      },
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user.email;
    });
  },
  methods: {
    showCover() {
      this.cover_dialog = true;
    },
    sendingEvent(file, xhr, formData) {
      console.log("file", file);
      console.log("xhr", xhr);
      console.log("formData", formData);
    },
    sendingEvent2(file, xhr, formData) {
      console.log("file", file);
      console.log("xhr", xhr);
      console.log("formData", formData);
    },
    quizSender() {
      db.collection('quizzes')
        .doc(this.title)
        .set({
          title: this.title,
          cover_img: this.cover_img,
          description: this.description
        }).then(() => {
           this.questions.map((question) => {
              db.collection('questions')
              .doc(question.question)
              .set({
                trivia: this.title,
                cover_img:this.cover_img,
                description:this.description,
                answer1: question.answer1,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4,
                right_answer: question.right_answer,
                question_img: question.question_img,
                question: question.question,
                time_limit: question.time_limit,
                xp_reward: question.xp_reward,
              })                  
          })
           console.log("quiz sent");
              this.$router.push("/trivias-viewer");
        })
          
    },
    select1() {
      if (this.answer1) {
        this.selected1 = true;
        this.selected2 = false;
        this.selected3 = false;
        this.selected4 = false;
        this.right_answer = this.answer1;
      } else {
        this.answer_notif1 = true;
        console.log("todavía no has escrito la respuesta 1");
      }
    },
    select2() {
      this.selected1 = false;
      this.selected2 = true;
      this.selected3 = false;
      this.selected4 = false;
      this.right_answer = this.answer2;
    },
    select3() {
      this.selected1 = false;
      this.selected2 = false;
      this.selected3 = true;
      this.selected4 = false;
      this.right_answer = this.answer3;
    },
    select4() {
      this.selected1 = false;
      this.selected2 = false;
      this.selected3 = false;
      this.selected4 = true;
      this.right_answer = this.answer4;
    },
    async afterComplete(file) {
      try {
        this.rendered_file = file;
        const imageName = this.question;
        const metaData = {
          content_type: "image/png",
        };
        // this.question_img = file;
        // ensto en appbar
        const storageRef = firebase.storage().ref();
        // //aqui poner titulo de trivia si empiza como untitled y el numero de la pregunta ol a pregunta
        // // images/{trivia_title/question_img.jpg
        const imageRef = storageRef.child(`${this.title}/${imageName}.png`);

        await imageRef.put(file, metaData);

        this.question_img = await imageRef.getDownloadURL();
        // this.$refs.imgDropzone.removeFile(file);
      } catch (error) {
        console.log(error);
      }
    },
    async afterComplete2(file2) {
      try {
        this.rendered_file2 = file2;
        // const imageName = this.cover_img;
        const metaData = {
          content_type: "image/png",
        };
        // this.question_img = file;
        // ensto en appbar
        const storageRef = firebase.storage().ref();
        // //aqui poner titulo de trivia si empiza como untitled y el numero de la pregunta ol a pregunta
        // // images/{trivia_title/question_img.jpg
        const imageRef = storageRef.child(`${this.title}/${this.title}.png`);

        await imageRef.put(file2, metaData);

        this.cover_img = await imageRef.getDownloadURL();
        // this.$refs.imgDropzone.removeFile(file);
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
        right_answer: this.right_answer,
      });
      (this.question = ""),
        (this.question_img = ""),
        (this.time_limit = null),
        (this.xp_reward = null),
        (this.answer1 = ""),
        (this.answer2 = ""),
        (this.answer3 = ""),
        (this.answer4 = ""),
        (this.selected1 = ""),
        (this.selected2 = ""),
        (this.selected3 = ""),
        (this.selected4 = ""),
        (this.right_answer = "");
      this.$refs.imgDropzone.removeFile(this.rendered_file);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-text {
  color: white;
}
.questions-sidebar {
  background-color: rgb(20, 20, 20);
}
.row-1 {
  background: green;
  border-radius: 6px;
}
.row-2 {
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
answer-1-card {
  width: 100%;
}
.right-answer {
}
.slider-style {
  width: 250px;
}
.pregunta {
  height: 20%;
  width: 60%;
}
.answers {
  height: 30%;
}
.time-xp {
  height: 15%;
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
  width: 100%;
  height: 50%;
}
.zone {
  width: 80%;
}
.zone2 {
  width: 100%;
}
// argrear timeout de que refrezce parsa quporque tivu una falla con el internet
</style>
