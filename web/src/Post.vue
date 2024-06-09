<script setup>  
import { ref, onMounted } from 'vue'  
import { useRoute } from 'vue-router'
import ztab from './components/tab.vue'  
import loading from './components/Loading.vue'  
import zfooter from './components/Footer.vue'  
import comment from './components/WalineComment.vue'  
import axios from 'axios'  
import MarkdownIt from 'markdown-it' 
import Prism from 'prismjs';  
onMounted(() => {  
  Prism.highlightAll();
});   
  
const axiosInstance = axios.create({  
  headers: {  
    'Cache-Control': 'no-cache',  
    'Pragma': 'no-cache',  
    'Expires': '0',  
  },  
})  
  
const post = ref(null)  
const parsedContent = ref('')  
const isLoading = ref(true)  
const md = MarkdownIt({ html: true })  

async function fetchData() {  
  const pid = useRoute().params.pid  
  try {  
    const postsResponse = await axiosInstance.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/posts_metadata.json')  
    const posts = postsResponse.data  
    post.value = posts.find(post => post.metadata.abbrlink === pid)  
  
    if (post.value) {  
      const mdFileResponse = await axiosInstance.get(`https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/posts/${post.value.file_name}`)  
      const mdContent = mdFileResponse.data  
      
      setTimeout(() => {  
        isLoading.value = false  
      }, 1000)   
      const yamlHeaderEnd = mdContent.indexOf('\n\n')  
      const yamlHeader = yamlHeaderEnd !== -1 ? mdContent.slice(0, yamlHeaderEnd) : ''  
      const mdBody = yamlHeaderEnd !== -1 ? mdContent.slice(yamlHeaderEnd + 2) : mdContent  
  
      parsedContent.value = md.render(mdBody)  
    } else {  
      // 404 Not found   
    }  
  } catch (error) {  
    console.error(error)  
    // error  
  } 
}  
onMounted(fetchData)  
</script>

<template>  
    <ztab></ztab>
    <div v-if="isLoading" class="loading-animation"><loading></loading></div>
    <div v-else class="bigBox">
        <div class="header">
      <div class="info center">
        <div class="info_text center song-font">
          <span class="info_title">{{ post.metadata.title }}</span><br>
          <span class="info_subtitle">
            <i class="iconfont iconshuxiebianxie"></i> {{ post.metadata.date }}  <i class="iconfont iconshuji"></i> {{ post.metadata.categories }}</span>
        </div>
      </div>
    </div> 
    <div class="cards">
        <div class="body_card">
            <div class="card_content">
              <aplayer v-if="post.metadata.music==true" :showLrc=true
              :music="{
                title: post.metadata['music-title'],
                artist: post.metadata['music-artist'],
                src: post.metadata['music-src'],
                pic: post.metadata['music-pic'],
                lrc: post.metadata['music-lrc'], 
                theme: '#2ebde5'
              }"
            />
                <div v-html="parsedContent"></div>

            </div>
            <div class="tags_list">
                <div class="tags" v-for="tag in post.metadata.tags" :key="tag"><div class="tags_icon"><i class="iconfont iconjinghao1"></i></div><span class="tags_name">{{  tag  }}</span></div>
                <div class="tags"><div class="tags_icon"><i class="iconfont iconjinghao1"></i></div><span class="tags_name">{{ post.word_count }}字符</span></div>
            </div>
        </div>
        <div v-if="post.metadata.comment!=false" class="body_card comment_card">
          <comment :path="`#post/${post.metadata.abbrlink}`" />  
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
    height: 30vh;
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
    margin-right:15px;
    font-size: 30px;
  }
  .info_subtitle{
    font-size: 17px;
    color: var(--color-box-shaow);
    margin-top: 20px;
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
    margin: 2vw;
  }
  .center{
    float: none!important;
    margin-left: 0!important;
  }
  .post_title{
    font-size: 20px;
    margin-left: 2vw;
    color: var(--color-text);
  }
  .post_date{
    color: var(--color-box-shaow);
  }
  .card_content{
    line-height: 25px;
    font-size: 18px;
    color: var(--color-box-shaow);
  }
  .tags{
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    background: var(--color-tag-bg);
    border: 0.05px solid #979797;
    box-shadow: 0 0 5px -2px var(--color-box-shaow);
    border-radius: 8px;
    width: max-content;
    padding: 2.5px;
    color: var(--color-box-shaow);
    font-size: 13px;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    animation: fadeIn 0.5s ease-in-out forwards;  
    display: inline-block;
  }
  .tags_icon{
    border-radius: 8px;
    width: max-content;
    padding-left: 2.5px;
    padding-right: 2.5px;
    background: var(--color-box);
    float: left;
    animation: fadeIn 0.5s ease-in-out forwards;  
  }
  .iconjinghao1{
    font-size: 13px;
  }
  .tags_name{
    font-size: 13px;
    margin: 5px;
  }
  .tags_list{
    height: max-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  a {
      text-decoration: none;
      color: #2ebde5;
  }
  a:hover {
      text-decoration: revert-layer;
      color: #5fd4f4;
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

  
