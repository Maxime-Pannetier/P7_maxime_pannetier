<template>
  <div class="home">
    <div class="profil-button" @click="goProfil()"><i class="fa-solid fa-user"></i></div>
    <div class="disconnect-button" @click="disconnect()"><i class="fa-solid fa-power-off"></i></div>
    <CreatePost @newPost="getAllPosts()" /> <!-- @newPost = evenement arbitraire -->
    <UsersPost @postRemoved="getAllPosts()" v-for="post in posts" v-bind:key="post.id" v-bind:post="post" />
  </div>
</template>

<script>
import CreatePost from '@/components/Le_Mur/Posts_Utilisateurs/CreatePost.vue'
import UsersPost from '@/components/Le_Mur/Posts_Utilisateurs/UsersPost.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    UsersPost, CreatePost
  },
  data() {
    return {
      posts: [] // liste de posts
    };
  },
  mounted() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      console.log("recuperation de post");
      axios.get("http://localhost:3000/api/posts/")
        .then((response) => {
          console.log(response.data);
          this.posts = response.data.posts;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    disconnect() {
      localStorage.clear();
      this.$router.push('/');
    },
    goProfil() {
      this.$router.push('/profil');
    }
  }
}
</script>

<style scoped>
.disconnect-button {
  position: absolute;
  top: 40px;
  right: 25px;
  padding: 10px;
  border: solid 1px black;
  border-radius: 50%;
}

.profil-button {
  position: absolute;
  top: 40px;
  left: 25px;
  padding: 10px;
  border: solid 1px black;
  border-radius: 50%;
}

.home {
  background-image: url("../assets/icon.png") ;
  background-size: 100%;
}


</style>
