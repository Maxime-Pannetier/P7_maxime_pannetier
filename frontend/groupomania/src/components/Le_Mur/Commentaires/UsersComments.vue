<template>
    <div class="CommentsUsers">

        <!-- afficher commentaires -->
        <input class="showComment" type="button" value="afficher les commentaires" @click="showAllComment()">            
            
        <!-- contenu commentaire -->
        <div v-for="(comment, index) in comments" v-bind:key="index" class="postCommentsList"  >
          <div v-if="this.postId === comment.post_id" class="postComment"  >
            <div  class="commentUsername">{{comment.prenom}}  {{comment.nom}}</div>
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
      axios.get("http://localhost:3000/api/comment/")
      .then((response)=>{
        this.comments=response.data.comments;
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },
    showPostId(){
      console.log(this.postId);
    }

    }
}
</script>

<style scoped>

.CommentsUsers{
  width: 100%;
  background-color: whitesmoke;
  text-align: left;
}

/* BOUTON AFFICHER COMMENTAIRE */
.showComment{
  color: darkgray;
  text-align: left;
  border: none;
  margin: 10px 0;
  background-color: whitesmoke;
  font-size: 15px;
}

/* LISTE DES COMMENTAIRES */
.postCommentsList{
  margin:5px 0;
}

.postComment{
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  background-color: white;
  border: solid 2px darkgrey;
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

