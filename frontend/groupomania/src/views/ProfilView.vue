<template>
    <div class="profilView">
        <!-- FLECHE RETOUR (mur)  -->
        <div class="wallButton" @click="this.$router.back()"><i class="fa-solid fa-arrow-left-long"></i></div>
        <!-- INFO USER  -->
        <div class="userProfil">
            <h2> Votre profil</h2>
            <div>Id : {{ userId }}</div>
            <div>Prenom : {{ username }}</div>
            <button @click="deleteUser()">Supprimer mon profil</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "profilView",
    data() {
        return {
            userId: 0,
            isAdmin: false,
            username: "",
        };
    },
    mounted() {
        this.userId = parseInt(localStorage.getItem("userId"));
        this.isAdmin = localStorage.getItem("isAdmin") == "1";
        this.username = localStorage.getItem("userPrenom");
    },
    methods: {
        deleteUser() {
           
            axios.delete("http://localhost:3000/api/user/" + this.userId)
                .then(() => {
                    
                    localStorage.clear();
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }
}
</script>

<style scoped>
</style>
