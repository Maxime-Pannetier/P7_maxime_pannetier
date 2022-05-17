<template>
    <div id="inscription">
        <p> Inscription </p>
        <input type="text" id="username" name="username" placeholder="username" v-model="username" required>
        <input type="text" id="password" name="password" placeholder="password" v-model="password" required>
        <input v-on:click="doSignUp" type="button" value="Inscription" >
    </div>
</template>

<script>

  import axios from "axios";

  export default {
    name: 'SignInComponent',
    props: {
      msg: String
      },
    el:'#inscription',
    data(){
      return {
        username:'',
        password:''
      }                   
    },
    methods:{
      doSignUp(){
        console.log("bonjour " + this.username );
        axios.post("http://localhost:3000/api/user/signup",{userName:this.username, password:this.password})
        .then((response)=>{
          console.log(response.data);
         })
        .catch((error)=>{
          console.log(error.response.data);
         });
        },
      },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#inscription{
  box-sizing: border-box;
  width: 250px;
  height: 250px;
  border: solid 1px black;
  margin: auto;
}

p{
    margin: none;
}

#username{
  margin: 0 0 50px 0;
}

#password{
  margin-bottom: 50px;
}
</style>