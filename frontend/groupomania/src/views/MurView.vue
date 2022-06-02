<template>
  <div class="home">
    <CreatePost @newPost="getAllPosts()"/> <!-- @newPost = evenement arbitraire -->
    <UsersPost @postRemoved="getAllPosts()" v-for="post in posts"  v-bind:key="post.id" v-bind:post="post"/>
    
  </div>
</template>

<script>
// @ is an alias to /src

import CreatePost from '@/components/Le_Mur/Posts_Utilisateurs/CreatePost.vue'
import UsersPost from '@/components/Le_Mur/Posts_Utilisateurs/UsersPost.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    UsersPost, CreatePost
  },
  data(){
    return{
      posts:[] // liste de posts
    };
  },
  mounted(){
    this.getAllPosts();
  },
  methods:{
    getAllPosts(){
      console.log("recuperation de post");
      axios.get("http://localhost:3000/api/posts/")
      .then((response)=>{
        console.log(response.data);
        this.posts=response.data.posts;
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
