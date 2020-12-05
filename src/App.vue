<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/dashboard">{{pathname}}</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import firebase from "@/config/firebase"
export default {
  name:'App',
  mounted(){
    this.checkuserState()
  },
  data :() =>({
    pathname:"Login to Dashboard",
  }),
  methods: {
    checkuserState() {
              firebase.auth.onAuthStateChanged((user)=> {
                if (user) {
                  // User is signed in.
                  this.pathname="Dashboard"
                  // ...
                } else {
                  // User is signed out.
                  this.pathname="Login to Dashboard"
                }
              });
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
