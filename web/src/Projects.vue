<script setup>
import ztab from './components/tab.vue'
import loading from './components/Loading.vue'
import zfooter from './components/Footer.vue'
import comment from './components/WalineComment.vue';  
import { ref, onMounted } from 'vue' 
import axios from 'axios'
const links = ref([])  
const isLoading = ref(true)
onMounted(async () => {  
  try {  
    
    const response = await axios.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/projects_metadata.json', {  
      headers: {  
        'Cache-Control': 'no-cache',  
        'Pragma': 'no-cache',  
        'Expires': '0',  
      },  
    })  
    setTimeout(() => {  
      isLoading.value = false; 
    }, 1000);
    const data = response.data   
   
    links.value = data.map((item) => ({  
          name: item.name, 
          link: item.metadata.link,  
          image: "background-image: url("+item.metadata.image+");",   
          subtitle: item.metadata.subtitle,  
        }));   
  } catch (error) {  
    console.error('Error fetching links:', error)  
  }   
})  
</script>

<template>
  <ztab></ztab>
  <div v-if="isLoading" class="loading-animation"><loading></loading></div>
  <div v-else class="bigBox">
    <div class="header">
      <div class="info center">
        <div class="info_text center song-font">
          <span class="info_title">📖 作品</span><br>
          <span class="info_subtitle">东风夜放花千树，更吹落、星如雨。</span>
        </div>
      </div>
    </div>

    <div class="cards">
        <div class="nobg_body_card">
          <div class="card_content">
            <div class="projects_card" v-for="link in links" :key="link" :style=link.image ><a :href=link.link target="_blank" rel="noopener" style="animation: unset!important;"><div class="projects_black_layer"><div class="projects_info"><div class="projects_info_name">{{ link.name }}</div><div class="projects_info_subtitle">{{ link.subtitle }}</div></div></div></a></div>
          </div>
        </div>
        <div class="body_card comment_card">
          <comment path="#projects" />  
        </div>
        <div class="body_card" style="padding: 10px;">
          <zfooter />
        </div>
    </div>
  </div>

</template>

<style scoped>
  .bigBox { 
    display: block;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: 0.1s;
    opacity: 0;  
    animation: fadeIn 0.5s ease-in-out forwards;  
  } 
  .header{
    height: 25vh;
    position: relative;
    text-align: center;
    display:flex;
    align-items:center; 
    justify-content:center;
  }
  .info{
    position: absolute;
    bottom: 0;
  }
  .info_title{
    margin-left:15px;
    font-size: 30px;
  }
  .info_subtitle{
    margin-left:15px;
    font-size: 15px;
    color: var(--color-box-shaow);
  }
  .cards{
    margin-top: 50px;
  }
  .body_card{
    transition: color 0.1s, background-color 0.1s;
    border-radius: 8px;
    width: auto;
    height: max-content;
    position: relative;
    padding: 7%;
    background: var(--color-box);
    box-shadow: 0 0 2.1px -1px var(--color-box-shaow);
    margin: 2vw;
  }
  .nobg_body_card{
    margin-left: 1.5%;
    margin-right: 1%;
  }
  .center{
    float: none!important;
    margin-left: 0!important;
  }
  .projects_card{
    aspect-ratio: 1/1.15!important;  
    width: 31%;
    height: 12vw;
    transition: 0.5s;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
    position: relative;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    animation: fadeIn 0.5s ease-in-out forwards;
    display: inline-block;
    margin: 1%;
    background-color: rgba(0, 186, 237, .628);
  }
  .projects_black_layer{
    height: 32px;
    max-height: 100%;
    width: 100%;
    background: var(--color-box-black-layer-dark);
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    transition: 0.2s;
    bottom: 0;
    position: absolute;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    overflow: hidden;
  }
  .projects_card:hover .projects_black_layer{
    transition: 0.2s;
    height: 50%!important;
  }
  .projects_info{
    color: #000;
    transition: 0.2s;
    bottom: 10px;
    width: 100%;
  }
  .projects_card:hover .projects_info_subtitle{ 
    transition: 0.2s;
    height: 50px!important;
  }
  .projects_card:hover .projects_info_name{ 
    transition: 0.2s;
    display: block!important;
  }
  .projects_card:hover{
    box-shadow: 0 0 10px var(--color-);
    transition: 0.5s;
  }
  .projects_info_name{
    color: #000;
    font-weight: 900;
    margin-top: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    transition: 0.3s;
  }
  .projects_info_subtitle{
    color: #000;
    font-size: 13px;
    line-height: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    height: 0px;
    transition: 0.2s;
  }
  .projects_card_image{
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }


  @media (max-width: 800px){
      .bigBox { 
        display: block;
        margin-left: 2%;
        margin-right: 2%;
        margin-top: 10px;
        margin-bottom: 10px;
      } 
      .info_name{
        font-size: 20px!important;
      }
      .projects_card{
        width: 48%;
        height: 26vw;
      }
      .projects_card:hover .projects_black_layer{
        transition: 0.2s;
        height: 100%!important;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .projects_info_subtitle{
        -webkit-line-clamp: 5;
      }
      .projects_card:hover .projects_info_subtitle[data-v-57585eef] {
          transition: 0.2s;
          height: max-content !important;
      }
  }
  @media (max-width: 500px) {
    .projects_card {
        width: 100%;
        height: 40vw;
    }
    .nobg_body_card{
      margin-right: 2%!important;
    }
  }
  

</style>