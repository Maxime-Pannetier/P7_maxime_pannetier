<template>
    <div class="createCommentForm">
        <input v-model="createCommentContent" type="text" class="createComment" name="createComment" ref="createComment" placeholder="écrire un commentaire">
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
        if(this.createCommentContent!==''){
          axios.post("http://localhost:3000/api/comment/", {createComment:this.createCommentContent, postId:this.postId} )
        .then(()=>{
         this.$emit("newComment");
          })
        .catch((error)=>{
        console.log(error.response.data);
        });
        }
        else{
          console.log("Votre commentaire est vide");
        }
        
    },
    },
  }
  
</script>


<style scoped>

.createCommentForm{
  width: 100%;
  display: grid;
  grid-template-columns: 80% 20%;
}

</style>