<template>
    <div class="createComment">

        <input v-model="createCommentContent" type="text" class="createComment" name="createComment" placeholder="écrire un commentaire">
        <button @click="createComment()" class="sendComment" type="button">Envoyer</button>
        
    </div>
</template>

<script>

  import axios from 'axios'
  

  export default {

    name: 'createComment',
    props: {
     
     postId: Number,
    },

    data: function(){
      return {
       createCommentContent:'', 
     }
    },

    methods:{
      


      createComment(){
        console.log("creation de commentaire");
        
        axios.post("http://localhost:3000/api/comment/", {createComment:this.createCommentContent, postId:this.postId} )
        .then(()=>{
         this.$emit("newComment");
          })
        .catch((error)=>{
        console.log(error.response.data);
        });
    },
    },
  }
  
</script>


<style scoped>

</style>