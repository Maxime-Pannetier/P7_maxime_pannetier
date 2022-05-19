<template>

    <div class="usersPost">
        
        <!-- identité du poster -->
        <div class="postUsername"></div>

        <div class="postContent">
            <!-- contenu du post -->
            <div class="postTextContent">{{post.postContent}}</div>
            <div class="postImageContent"></div>
        </div>

            <CreateComment v-bind:postId="this.post.id" />
            <UsersComments v-bind:postId="this.post.id"/>
            

    </div>

</template>

<script>

import CreateComment from '@/components/Le_Mur/Commentaires/CreateComment.vue'
import UsersComments from '../Commentaires/UsersComments.vue'

export default {
    name: "UsersPost",
    props: {
        post: Object,
    },
    components: { CreateComment, UsersComments }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.usersPost{
    width: 50%;
    height: 400px;
    background-color: aqua;
}

.postUsername{
    width: 100px;
    height: 33px;
    margin-left: 48px;
    background-color: blue;
}

.postContent{
    width: 100%;
    height: 300px;
    background-color: red;
}

.postTextContent{
    width: 90%;
    height: 70%;
    background-color: yellow;
    margin: 10px auto;
    
}

.showComment{
    display: block;
    text-align: left;
    margin: 10px 48px;
}

.postComments{
    width: 90%;
    height: 40px;
    background-color: violet;
    margin: auto;

}

.sendComment{
    width: 90%;
    height: 40px;
    background-color: maroon;
    margin: 10px auto;
    display: grid;
    grid-template-columns: 80% 20%;
}

</style>