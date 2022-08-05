<template>
  <div>
    <div
      v-if="isLogin"
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box my-5"
    >
      <div class="collapse-title text-xl font-medium">
        <div class="card bg-base-100">
          <div class="card-body flex p-1 ml-7">
            <form class="flex" @submit.prevent="addQuestion">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar mr-3">
                <div class="w-12 rounded-full border-2 border-black">
                  <img src="../assets/img/user.png" />
                </div>
              </label>
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Enter Your Question..."
                  class="input input-bordered w-full"
                  v-model="questForum.question"
                />
                <button type="submit" class="btn btn-info hover:bg-blue-500">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="my-3">
      <div class="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Please login to ask questions.</span>
        </div>
      </div>
    </div>

    <div class="text-center my-5" v-if="isLoading">
      <p class="text-xl">Loading...</p>
      <progress class="progress w-56"></progress>
    </div>

    <div v-if="questions.length > 0">
      <div
        tabindex="0"
        class="collapse border border-base-300 bg-base-100 rounded-box my-5"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="collapse-title font-medium">
          <div class="card bg-base-100">
            <div class="card-body p-1 ml-7">
              <div class="flex">
                <label
                  tabindex="0"
                  class="btn btn-ghost btn-circle avatar mr-3"
                >
                  <div class="w-12 rounded-full border-2 border-black">
                    <img src="../assets/img/user.png" />
                  </div>
                </label>
                <div>
                  <h2 class="card-title">{{ question.data.author }}</h2>
                  <p>{{ question.data.created_at }}</p>
                </div>
              </div>
              <p class="text-base">{{ question.data.question }}</p>
              <p class="card-actions justify-end text-sm text-gray-400">
                see comment
              </p>
            </div>
          </div>
        </div>
        <div class="collapse-content px-10">
          <p>tabindex="0" attribute is necessary to make the div focusable</p>
        </div>
      </div>
    </div>

    <div v-if="isError">
      <p>Erorr</p>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
export default {
  name: "fieldHome",
  data() {
    return {
      questForum: {
        question: "",
      },
      questionType: {},
      questions: [],
      isLogin: false,
      user: {},
      isLoading: false,
      isError: false,
    };
  },
  created() {
    const user = getAuth().currentUser;
    if (user != null) {
      this.isLogin = true;
      this.user = user;
    }
    this.getQuestions();
  },
  methods: {
    getQuestions() {
      this.isLoading = true;
      let q;
      const db = getFirestore(this.$firebase);
      if (this.questionType === "my") {
        q = query(
          collection(db, "questions"),
          where("author_uid", "==", getAuth().currentUser.uid)
        );
      } else {
        q = query(collection(db, "questions"));
      }

      getDocs(q)
        .then((documents) => {
          this.questions.length = 0;
          documents.forEach((document) => {
            this.questions.push({
              id: document.id,
              data: {
                ...document.data(),
                created_at: new Date(document.data().created_at.seconds)
                  .toLocaleDateString,
              },
            });
          });
        })
        .catch((error) => {
          alert(errorr.message);
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    addQuestion() {
      const db = getFirestore(this.$firebase);
      const questData = {
        author: getAuth().currentUser.displayName,
        author_id: getAuth().currentUser.uid,
        question: this.questForum.question,
        created_at: Timestamp.now(),
      };
      addDoc(collection(db, "questions"), questData)
        .then(() => {
          alert("Success add question");
          this.getQuestions;
          this.questForum.question = "";
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    
  },
};
</script>