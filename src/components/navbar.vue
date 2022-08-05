<template>
  <div>
    <div class="navbar bg-blue-500 text-white shadow-lg px-5 ">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">SolutionS</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0 uppercase font-semibold">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/creation">Creation</router-link></li>
        </ul>
      </div>
      <div v-if="isLogin" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost avatar">
          <div class="w-10 rounded-full border-2">
            <img src="../assets/img/user.png" />
          </div>
          <p class="ml-2">{{user.displayName}}</p>
        </label>
        <ul
          tabindex="0"
          class="
            menu menu-compact
            dropdown-content
            mt-3
            p-2
            shadow
            bg-base-100
            rounded-box
            w-52
            text-black
            
          "
        >
          <li>
            <a class="justify-between">
              Profil
            </a>
          </li>
          <li><a @click.prevent="doLogout">Logout</a></li>
        </ul>
      </div>
      <div v-else>
          <div class="uppercase">
            <router-link to="/login"><button class="btn btn-active  bg-green-500 mx-1 hover:bg-green-600">Login</button></router-link>
            <router-link to="/register"><button class="btn outline-none bg-white text-black mx-1 hover:bg-gray-200">Register</button></router-link>
            
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { getAuth } from '@firebase/auth';
    export default {
        name: 'navbar',
        data () {
          return{
            isLogin: false,
            user: {}
          }
        },
        created() {
          const user = getAuth().currentUser;
          if (user != null){
            this.isLogin = true
            this.user = user
          }
        },
        methods: {
          doLogout() {
            getAuth()
              .signOut()
              .then(() => {
                window.location.reload();
              })
              .catch((err) => alert(err.message));
            
          }
        }

    };
</script>