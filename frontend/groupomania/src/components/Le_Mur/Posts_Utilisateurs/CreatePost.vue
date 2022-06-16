<template>
    <div id=createPost>
        <input v-model="createPostContent" type="text" id="createPost" name="createPost" placeholder="écrire un statut">
        <button @click="createPost()" class="sendPost" type="button">Envoyer</button>
        
        <input class="addfile" @change="onFileChanged($event)" type="file" name="imagePost" accept="image/*">
        
        

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
      postFile:null,
      
    }
  },
  methods:{
    createPost(){
      console.log("creation de post");
      let data=new FormData();
      data.append("createPost", this.createPostContent);
      data.append("image", this.postFile);
      axios.post("http://localhost:3000/api/posts/", data )
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

    onFileChanged(event){
      this.postFile = event.target.files[0];
    }

  }
}
</script>


<style scoped>



</style>