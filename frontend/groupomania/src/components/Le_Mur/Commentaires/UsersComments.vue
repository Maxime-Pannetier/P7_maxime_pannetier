<template>
    <div class="CommentsUsers">

        <!-- afficher commentaires -->
        <input class="showComment" type="button" value="afficher les commentaires" @click="showAllComment()">            
            
        <!-- contenu commentaire -->
        <div v-for="(comment, index) in comments" v-bind:key="index" class="postCommentsList"  >
          <div v-if="this.postId === comment.post_id" class="postComment"  >
            <div  class="commentUsername">{{comment.nom}}</div>
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

.postComment{
  width: 100%;
  background-color: white;
  border: solid 2px blue;
  display: grid;
  grid-template-columns: 20% 80%;
}

.commentUsername{
  width: 100%;
  height: 50px;
  border: solid 2px red;
}

.commentContent{
  width: 100%;
  height: 50px;
  border: solid 2px green;
}


</style>

