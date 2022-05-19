<template>
    <div id=createPost>
        <input v-model="createPostContent" type="text" id="createPost" name="createPost" placeholder="écrire un statut">
        <button @click="createPost()" class="sendPost" type="button">Envoyer</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'createPost',
  props: {
    msg: String
  },
  data: function(){
    return {
      createPostContent:'',
    }
  },
  methods:{
    createPost(){
      console.log("creation de post");
      axios.post("http://localhost:3000/api/posts/", {createPost:this.createPostContent} )
      .then(()=>{
        this.$emit("newPost");
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },

    showAllPost(){
      console.log("affichage des post");
      axios.get("http://localhost:3000/api/post/showAllPost", )
      .then((response)=>{
        console.log(response.data);  
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },



  }
}
</script>


<style scoped>

</style>