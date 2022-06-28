<template>
  
  <div>
    
    <img alt="logo Groupomania" src="./assets/logo.png">
    <router-view/>
    
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

img{
  width: 100%;
  max-width: 500px;
  height: 75px;
  object-fit:cover;
}

@media screen and (max-width: 600px)
{
img{
  width: 70%;
}

}

</style>
