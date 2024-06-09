
<script setup>  
import ztab from './components/tab.vue'
import loading from './components/Loading.vue'
import zfooter from './components/Footer.vue'
import { ref, onMounted } from 'vue' 
import axios from 'axios'  
  
const posts = ref([])    
const isLoading = ref(true)
const groupedPostsArray = ref([])
  
onMounted(async () => {      
  try {      
    const response = await axios.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/posts_metadata.json')      
    const data = response.data   
    setTimeout(() => {  
      isLoading.value = false; 
    }, 1000);     
    
    const grouped = {}    

    data.forEach(item => {    
      const year = new Date(item.metadata.date).getFullYear()    
      if (!grouped[year]) grouped[year] = [] 
      grouped[year].push({
        title: item.metadata.title,     
        date: item.metadata.date,      
        abbrlink: "#post/"+item.metadata.abbrlink,         
      })    
    })    

    groupedPostsArray.value = Object.keys(grouped)  
      .sort((a, b) => b - a)
      .map(year => ({ year, posts: grouped[year] }))
  } catch (error) {      
    console.error('Error fetching posts:', error)      
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
          <span class="info_title">✏️ 归档</span><br>
          <span class="info_subtitle">就让这人间的风别停，天别晴。</span>
        </div>
      </div>
    </div>

    <div class="cards">    
    <div class="body_card song-font">    
    <div v-for="group in groupedPostsArray" :key="group.year">
      <h2 class="year-title">{{ group.year }}</h2> <!-- 显示年份标题 -->    
      <div class="card_content">    
        <li v-for="post in group.posts" :key="post.abbrlink">    
          <span class="post_date">{{ post.date }}</span>    
          <a :href="post.abbrlink"><span class="post_title">{{ post.title }}</span></a>    
        </li>    
      </div> 
      </div>   
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
    padding-left:15px;
    font-size: 15px;
    color: var(--color-box-shaow);
  }
  .cards{
    margin-top: 50px;
  }
  .body_card{
    transition: color 0.1s, background-color 0.1s;
    margin: 1%;
    border-radius: 8px;
    width: auto;
    height: max-content;
    background: var(--color-box);
    box-shadow: 0 0 2.1px -1px var(--color-box-shaow);
    position: relative;
    padding: 7%;
  }
  .center{
    float: none!important;
    margin-left: 0!important;
  }
  .post_title{
    font-size: 20px;
    color: var(--color-text);
  }
  .post_date{
    color: var(--color-box-shaow);
    padding-right: 2vw;
  }
  .card_content{
    line-height: 40px;
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
      .body_card{
        margin: 0;
        margin-bottom: 5vw;
      }

  }


</style>
