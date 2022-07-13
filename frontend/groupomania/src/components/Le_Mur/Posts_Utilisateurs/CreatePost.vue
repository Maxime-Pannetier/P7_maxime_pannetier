<template>
  <div id=createPost>
    <input v-model="createPostContent" type="text" id="createPostInput" name="createPost" placeholder="écrire un statut">
    <form name="imagePost">
      <input id="imagePost" @change="onFileChanged($event)" type="file" accept="image/*">
      <label for="imagePost">.jpg</label>
    </form>
    <button @click="createPost()" class="sendPost" type="button">Envoyer</button>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'createPost',
  props: {
    msg: String
  },
  data: function () {
    return {
      createPostContent: '',
      postFile: null,
    }
  },
  methods: {
    createPost() {
      
        let data = new FormData();
      data.append("createPost", this.createPostContent);
      data.append("image", this.postFile);

      if(!(this.createPostContent == "" && this.postFile=="")){
      axios.post("http://localhost:3000/api/posts/", data)
        .then(() => {
          this.$emit("newPost");
          this.createPostContent="";
          document.forms['imagePost'].reset();
          this.postFile="";       
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      }
      else{
        console.log("Votre Post est vide")
      }
      
    },
   
    onFileChanged(event) {
      this.postFile = event.target.files[0];
    }
  }
}
</script>


<style scoped>



</style>