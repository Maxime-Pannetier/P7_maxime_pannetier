<template>
  <div class="firstPage">
    <h1 v-if="mode == 'login'"> Connexion </h1>
    <h1 v-else> Inscription </h1>
      
    <p v-if="mode == 'login'"> Pas encore inscrit ? <span @click="signUpMode()">Inscription</span></p>
    <p v-else> Déjà inscrit ? <span @click="connectMode()">Connexion</span></p>
       
    <div >
      <input v-model="email" type="text" placeholder="Adresse mail"/>
    </div>

    <div v-if="mode == 'create'">
      <input v-model="prenom" type="text" placeholder="Prénom"/> <br><br>
      <input v-model="nom" type="text" placeholder="Nom"/>
    </div>
        
    <div >
      <input v-model="password" type="password" placeholder="Mot de passe"/>
    </div>

    <div>
      <button @click="doLogin()" class="button" v-if="mode == 'login'">
        <span>Connexion</span>
      </button>
      <button @click="doSignUp()" class="button" v-else>
        <span>Créer mon compte</span>
      </button>
    </div>
      
  </div>  
</template>

<script>

import axios from "axios";









export default {

  name: 'LoginComponent',

  
  data: function(){
    return {
      mode: 'login',
      email:'',
      password:'',
      prenom:'',
      nom:'',
    }
  },

  methods: {
// MODE CHOICE
    signUpMode(){
      this.mode = 'create';
    },
    connectMode(){
      this.mode = 'login';
    },

// DO LOGIN + SO SIGNUP
     doLogin(){
      
      axios.post("http://localhost:3000/api/user/login",{email:this.email, password:this.password})
      .then((response)=>{
        console.log(response.data);
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin",response.data.isAdmin);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userPrenom", response.data.userPrenom);
        
        this.$router.push('/Mur');
        console.log("bonjour " + response.data.userPrenom);

      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },

    doSignUp(){
        
        axios.post("http://localhost:3000/api/user/signup",{email:this.email, password:this.password, prenom:this.prenom, nom:this.nom})
        .then((response)=>{
          console.log(response.data);
          this.mode='login';
         })
        .catch((error)=>{
          console.log(error.response.data);
         });
        }
  }

}
</script>



















<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.firstPage {
  width: 70%;
  margin: auto;
  border: solid 1px black;
}

h1{
  margin: 20px auto;
}

div {
  margin: 20px auto;
}

</style>