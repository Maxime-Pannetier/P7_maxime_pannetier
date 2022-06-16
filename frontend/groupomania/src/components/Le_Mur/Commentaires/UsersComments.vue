<template>
    <div class="CommentsUsers">

        <!-- afficher commentaires -->
        <input class="showComment" type="button" value="afficher les commentaires" @click="showAllComment($event)">            
            
        <!-- contenu commentaire -->
        <div v-for="comment in comments" v-bind:key="comment.id" class="postCommentsList"  >
          <div class="postComment"  >
            <div  class="commentUsername">{{comment.prenom}} {{comment.nom}}</div>
            <div v-if= "user_id==comments.user_id || isAdmin"  class="deleteButton" @click="deleteComment(comment.id)"><i class="fa-solid fa-trash"></i></div>
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
      user_id:0,
      isAdmin:false,
      
    };
  },
   mounted(){
    this.user_id= parseInt(localStorage.getItem("userId"));
    this.isAdmin= localStorage.getItem("isAdmin") == "1";
    
  },
  
  props: {
     postId: Number,
    },
  
  methods:{
    showAllComment(e){
      console.log("recuperation de commentaire");
      if(this.comments.length>0){
        this.comments=[];
        return;
      }
      axios.get("http://localhost:3000/api/comment/"+this.postId)
      .then((response)=>{
        this.comments=response.data.comments;
        e.target.value= this.comments.length>0? "Cliquer pour actualiser" : "Aucun commentaire";
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
    },
    deleteComment(commentId){
            console.log(commentId);
            axios.delete("http://localhost:3000/api/comment/"+commentId)
                .then((response)=>{
                    this.$emit("commentRemoved");
                    console.log(response.data);
                    this.showAllComment();
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
        }
   

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

.deleteButton{
  position: relative;
  top:0;
  right: 0;
}


</style>

