<script setup>  
import { ref, onMounted } from 'vue'  
import { useRoute } from 'vue-router'
import ztab from './components/tab.vue'  
import loading from './components/Loading.vue'  
import zfooter from './components/Footer.vue'  
import comment from './components/WalineComment.vue'  
import axios from 'axios'  
import MarkdownIt from 'markdown-it'  
  
const axiosInstance = axios.create({  
  headers: {  
    'Cache-Control': 'no-cache',  
    'Pragma': 'no-cache',  
    'Expires': '0',  
  },  
})  
const page = ref(null)  
const parsedContent = ref('')  
const isLoading = ref(true)  
const md = MarkdownIt({ html: true })  
  
async function fetchData() {  
  const pid = useRoute().params.pid  
  try {  
    const pagesResponse = await axiosInstance.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/pages_metadata.json')  
    const pages = pagesResponse.data  
  
    page.value = pages.find(page => page.metadata.abbrlink === pid)  
  
    if (page.value) {  
      const mdFileResponse = await axiosInstance.get(`https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/pages/${page.value.file_name}`)  
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
        <div class="header"></div> 
    <div class="cards">
        <div class="body_card">
            <div class="pages_cover_out">
            <div class="pages_cover_blacklayer">
              <div class="pages_cover" :style="{ backgroundImage: `url(${page.metadata.cover})` }"></div>
                <div class="info center">
                  <div class="info_text center song-font">
                    <span class="info_title">{{ page.metadata.title }}</span><br>
                    <span class="info_subtitle">{{ page.metadata.subtitle }}</span>
                  </div>
                </div>
            </div>          
            
          </div>
            <div class="card_content">
                <aplayer v-if="page.metadata.music==true" :showLrc=true
              :music="{
                title: page.metadata['music-title'],
                artist: page.metadata['music-artist'],
                src: page.metadata['music-src'],
                pic: page.metadata['music-pic'],
                lrc: page.metadata['music-lrc'], 
                theme: '#2ebde5'
              }"
            />
                <div v-html="parsedContent"></div>
            </div>
            <div class="tags_list">
                <div class="tags" v-for="tag in page.metadata.tags" :key="tag"><div class="tags_icon"><i class="iconfont iconjinghao1"></i></div><span class="tags_name">{{  tag  }}</span></div>
                <div class="tags"><div class="tags_icon"><i class="iconfont iconjinghao1"></i></div><span class="tags_name">{{ page.word_count }}字符</span></div>
            </div>
        </div>
        <div v-if="page.metadata.comment!=false" style="padding: 7%;" class="body_card comment_card">
          <comment :path="`#${page.metadata.abbrlink}`" />  
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
    height: 20px;
    text-align: center;
    display:flex;
    align-items:center; 
    justify-content:center;
  }
  .pages_cover_out{
    height: 340px;
    overflow: hidden;
    position: relative;  
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

  }
  .pages_cover{
    position: absolute;  
    top: 50%;  
    left: 50%;  
    transform: translate(-50%, -50%);
    position: relative;
    width: 100%;
    background-position: center;
    background-size: cover;
    height: 340px;
    position: relative;
    border-radius: 8px;
    transition: 1.5s;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .pages_cover_out:hover .pages_cover{
    width: 120%;
    transition: 1.5s
  }
  .info{
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 1%;
    animation: fadeIn 0.5s ease-in-out forwards;  
  }
  .info_title{
    font-size: 30px;
    animation: fadeIn 0.5s ease-in-out forwards!important;  
    transition: 0.5s !important;
    color: #000;
    text-shadow: 0px 0px 15px #000;
  }
  .info_subtitle{
    font-size: 17px;
    color: var(--color-box-shaow);
    animation: fadeIn 0.5s ease-in-out forwards;  
    transition: 0.5s !important;
    color: #000;
    text-shadow: 0px 0px 15px #000;
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
    margin: 2vw;
  }
  .pages_cover_blacklayer{
    height: 100%;
    width: 100%;
    background-color: var(--color-cover-black-layer);
    border-radius: 8px;  
    transition: 0.2s;
    position: relative;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .center{
    float: none!important;
  }
  .page_title{
    font-size: 20px;
    margin-left: 2vw;
    color: var(--color-text-opposite);
  }
  .page_date{
    color: var(--color-text-opposite);
  }
  .card_content{
    line-height: 25px;
    font-size: 18px;
    color: var(--color-box-shaow);
    margin: 7%;
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
    padding: 3%;
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
      .pages_cover{
        height: 50vw;
      }
      .pages_cover_out{
        height: 50vw;
        overflow: hidden;
      }

  }


</style>

  
