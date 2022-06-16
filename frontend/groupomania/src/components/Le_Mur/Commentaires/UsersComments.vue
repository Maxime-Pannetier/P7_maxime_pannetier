<template>
    <div class="CommentsUsers">

        <!-- afficher commentaires -->
        <input class="showComment" type="button" value="afficher les commentaires" @click="showAllComment()">            
            
        <!-- contenu commentaire -->
        <div v-for="comment in comments" v-bind:key="comment.id" class="postCommentsList"  >
          <div class="postComment"  >
            <div  class="commentUsername">{{comment.prenom}} {{comment.nom}}</div>
            <div  class="commentContent">{{comment.commentsContent}}</div>
          </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'UsersComments',
  
  data(){
    return{
      comments:[],
      
    };
  },
  props: {
     postId: Number,
    },
  
  methods:{
    showAllComment(){
      console.log("recuperation de commentaire");
      axios.get("http://localhost:3000/api/comment/"+this.postId)
      .then((response)=>{
        this.comments=response.data.comments;
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },
   

    }
}
</script>

<style scoped>

.CommentsUsers{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: whitesmoke;
  border-radius: 15px;
  text-align: left;
  padding: 5px;
}

/* BOUTON AFFICHER COMMENTAIRE */
.showComment{
  color: darkgray;
  text-align: left;
  border: none;
  margin: 5px 5px;
  background-color: whitesmoke;
  font-size: 15px;
}

/* LISTE DES COMMENTAIRES */
.postCommentsList{
  
  margin:5px 5px;
}

.postComment{
  width: 95%;
  margin: 5px;
  display: grid;
  grid-template-columns: 30% 70%;
  background-color: white;
  border: solid 2px darkgrey;
  border-radius: 15px;
}

.commentUsername{
  margin: 10px;
  text-align: center;
}

.commentContent{
  
  border-left: solid 1px darkgray;
  padding: 10px;
  
}


</style>

