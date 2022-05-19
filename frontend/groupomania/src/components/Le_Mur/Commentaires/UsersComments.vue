<template>
    <div class="CommentsUsers">

        <!-- afficher commentaires -->
        <input class="showComment" type="button" value="afficher les commentaires" @click="getPostId()">            
            
        <!-- contenu commentaire -->
        <div class="postComments" v-for="(comment, index) in comments" v-bind:key="index">
            <div class="commentUsername">{{comment.nom}}</div>
            <div class="commentContent">{{comment.content}}</div>
        </div>

    </div>
</template>

<script>

  import axios from 'axios'
  

  export default {

    name: 'UsersComments',
    props: {
     
     postId: Number,
    },

    data: function(){
      return {
       
     }
    },

    methods:{
      getPostId(){

        console.log(this.postId);
        
        
      },


      showAllComment(){
        console.log("affichage de commentaire");
        
        axios.get("http://localhost:3000/api/comment/showAllComment", {postId:this.postId} )
        .then(()=>{
         this.$emit("newComment");
          })
        .catch((error)=>{
        console.log(error.response.data);
        });
    }
    },
  }
  
</script>
