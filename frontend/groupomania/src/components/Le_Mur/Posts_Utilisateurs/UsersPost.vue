<template>

    <div class="usersPost">
        
        <!-- identité du poster -->
        <div class="postUsername"> 
            {{post.prenom}} {{post.nom}} 
            <div v-if= "userId==post.users_id || isAdmin"  class="deleteButton" @click="deletePost()"><i class="fa-solid fa-trash"></i></div>
        </div>
        

        <div class="postContent">
            <!-- contenu du post -->
            <div class="postTextContent">{{post.postContent}}</div>
            <div v-if="post.imgPost" class="postImageContent">
                <img :src="'http://localhost:3000/images/'+post.imgPost"/>
            </div>
        </div>

            <CreateComment v-bind:postId="this.post.id" />
            <UsersComments v-bind:postId="this.post.id"/>
            

    </div>

</template>


<script >


import CreateComment from '@/components/Le_Mur/Commentaires/CreateComment.vue'
import UsersComments from '../Commentaires/UsersComments.vue'
import axios from 'axios'




export default {

    name: "UsersPost",
    
    props: {
        post: Object,
    },
    data(){
    return{
      userId:0,
      isAdmin:false,
    };
  },
    mounted(){
    this.userId= parseInt(localStorage.getItem("userId"));
    this.isAdmin= localStorage.getItem("isAdmin") == "1";
    console.log(this.userId);
  },

    
    components: { CreateComment, UsersComments },
    methods:{
        deletePost(){
            axios.delete("http://localhost:3000/api/posts/"+this.post.id)
                .then((response)=>{
                    this.$emit("postRemoved");
                    console.log(response.data);
      })
      .catch((error)=>{
        console.log(error.response.data);
      });
        }
    },

}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* POST ENTIER */
.usersPost{
    width: 50%;
    height: 100%;
    background-color: whitesmoke;
    border: solid 1px black;
    border-radius: 20px;
    margin: 20px auto;
    padding: 10px;
}

/* NOM DU POSTER */
.postUsername{
    width: 100%;
    height: 20px;
    text-align: left;
    font-weight: bold;
    color: black;
}

/* CONTENUE ENTIER DU POST */
.postContent{
    width: 100%;
    border: solid 1px black;
    background-color: white;
    text-align: left;
    font-size: 18px;
    margin: 10px auto;
}
    /* ZONE TEXTE */
.postTextContent{
    width: 95%;
    margin: 10px auto;
    
}

.postImageContent
{
    width: 100%;
    text-align: center;
}

.deleteButton{
    background-color: red;
    float: right;
}

img{
    width: 100%;
    height: auto;
}

</style>