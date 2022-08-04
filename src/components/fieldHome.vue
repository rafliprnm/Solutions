<template>
  <div>
    <div
      v-if="isLogin"
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box my-5"
    >
      <div class="collapse-title text-xl font-medium">
        <div class="card bg-base-100">
          <div class="card-body flex">
            <form class="flex">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar mr-3">
                <div class="w-12 rounded-full border-2 border-black ">
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
        v-if="!isLoading && !isError"
        tabindex="0"
        class="collapse border border-base-300 bg-base-100 rounded-box my-5"
      >
        <div class="collapse-title text-xl font-medium">
          <div class="card bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Nama Profile</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
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
    <div v-else>
      <div class="alert alert-error shadow-lg">
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No Question.</span>
        </div>
      </div>
    </div>

    <div v-if="isError">
      <p>Erorr</p>
    </div>
  </div>
</template>

<script>
import { getAuth } from "@firebase/auth";
export default {
  name: "fieldHome",
  data() {
    return {
      questForum: {
        question: "",
      },
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
  },
};
</script>