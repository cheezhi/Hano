<script setup>
import ztab from './components/tab.vue'
import loading from './components/Loading.vue'
import zfooter from './components/Footer.vue'
import { ref, onMounted } from 'vue' 
import axios from 'axios'  
const count = ref(0)
var d = new Date();

const year = ref(d.getFullYear()); 
const isLoading = ref(true)  
const posts = ref([])  
const links = ref([])  
  
onMounted(async () => {  
  try {  
    
    const response = await axios.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/links_metadata.json', {  
      headers: {  
        'Cache-Control': 'no-cache',  
        'Pragma': 'no-cache',  
        'Expires': '0',  
      },  
    })  
    const data = response.data   
    console.log("获取友链数据成功");        

    links.value = data.map((item) => ({  
          link: item.metadata.link,  
          image: "background-image: url("+item.metadata.image+");",   
        }));  
  } catch (error) {  
    console.error('Error fetching links:', error)  
  } 
  try {
 
  
    const response = await axios.get('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/Hano/data/posts_metadata.json', {  
      headers: {  
        'Cache-Control': 'no-cache',  
        'Pragma': 'no-cache',  
        'Expires': '0',  
      },  
    }) 
    setTimeout(() => {  
      isLoading.value = false; 
    }, 1000);  
    const data = response.data;  
    // 处理 data  
    console.log("获取文章数据成功");        
    posts.value = data.slice(0, 3).map((item) => ({  
          title: item.metadata.title, 
          date: item.metadata.date,  
          abbrlink: "#post/"+item.metadata.abbrlink,  
          tags: item.metadata.tags,  
          categories: item.metadata.categories,
          file_path: item.file_name,   
    }));   

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
        <a style="border-bottom: unset!important;" href="/#about"><img class="avator center" src="https://img0.baidu.com/it/u=2194669753,2097544375&fm=253&fmt=auto&app=138&f=JPEG?w=205&h=220"></a>
        <div class="info_text center">
          <span style="font-size: 30px;" class="ding-font info_name">hano</span><br class="text_br">
          <span style="color:#706f6c;font-size: 15px;">一个简洁的博客系统</span>
        </div>
      </div>
    </div>

    <div class="cards">
        <div class="zcard zcard-wide"><div class="card_content"><span style="font-size: 20px;"><div style="height: 50px;"></div>Hi 👏 there</span><br>I am Cheez🌱, a {{ year-2008+count }}-year-old boy.<br>Currently, I am studying📖 hard in a high school in a small county in northern Fujian, China🇨🇳.<div style="height: 50px;"></div></div></div>
        <div class="zcard"><div class="zcard_img" style="background-image: url(https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMzUyMzQwMl8wXzE3MTY5MTAxNTgzMTlfYTViYmE5NGI.png);"><span class="zcard_title">🤔思渊阁</span></div></div>
        <div class="zcard"><div class="zcard_img" style="background-image: url(https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMzUyMzQwMl8wXzE3MTY5MTA3NTI5NzhfYTc5MDMzZWE.png);"><span class="zcard_title">💻源码海</span></div></div>
        <div v-for="post in posts"  :key="post" class="zcard post_card song-font"><a :href=post.abbrlink><span class="post_card_title">「{{ post.title }}」</span></a><span class="post_card_category">{{ post.categories }}</span><span class="post_card_time">{{ post.date }}</span></div>
        <a href="#archives"><div class="zcard more_card song-font"><span class="more_card_text">所有<br>文章</span></div></a>
        <div class="zcard zcard-wide">
          <div class="friends_card">
            <a v-for="link in links" :key="link" :href=link.link target="_blank" rel="noopener"><div class="friends_card_img" :style=link.image></div></a>
          </div>
        <div class="zcard_img" style="background-image: url(https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMzUyMzQwMl8wXzE3MTY5MDk3OTIzMzhfYTA1MWRlMGU.png);width:50%;float:right;"><span class="zcard_title">🔗朋友们</span></div></div>
        <div class="zcard"><div class="zcard_img" style="background-image: url(https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMzUyMzQwMl8wXzE3MTY5MDk3MzE0NzJfM2U3YWZjOWQ.png);"><span class="zcard_title">🌟主页</span></div></div>
        <div class="zcard"><a href="#projects"><div class="zcard_img" style="background-image: url(https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfMzUyMzQwMl8wXzE3MTY5MDk2OTIwODZfYjBlNGI4MTE.png);"><span class="zcard_title">📖作品</span></div></a></div>
        <div class="zcard footer_card"><zfooter /></div>
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
    height: 40vh;
    position: relative;
  }
  .info{
    position: absolute;
    bottom: 0;
  }
  .avator{
    border: 4px solid rgba(212, 229, 232, 0.5);
    border-radius: 46px;
    height: 65px;
    width: 65px;
    float: left;
  }
  .info_text{
    margin-left:15px;
    float: left;
  }
  .cards{
    margin-top: 50px;
  }
  .zcard{
    transition: color 0.1s, background-color 0.1s;
    margin: 1%;
    border-radius: 8px;
    width: 22%;
    padding: 1%;
    float: left;
    height: 17vw;
    background: var(--color-box);
    box-shadow: 0 0 2.1px -1px var(--color-box-shaow);
    position: relative;
  }
  .zcard-wide::-webkit-scrollbar {
      display: none;
    }
    
  .zcard-wide{
    width:44%;
    overflow: scroll;
  }
  .card_content{
    display: flex;
    flex-direction: column;
    padding-left: 3%;
    padding-right: 3%;
    font-size: 17px;
  }
  .zcard_img{
    width: 100%;
    background-position: center;
    background-size: cover;
    height: 100%;
    position: relative;
  }
  .zcard_title{
    bottom: 0;
    right: 0;
    position: absolute;
    font-size: 15px;
    background-color: var(--color-background);
    border-radius: 8px;
    padding: 2%;
    transition: background-color 0.1s;
    color: var(--color-text);
  }
  .post_card_category{
    position: absolute;
    left: 5px;
    bottom: 5px;
    font-size: 15px;
    color: var(--color-box-shaow);
  }
  .post_card_time{
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 15px;
    color: var(--color-box-shaow);
  }
  .post_card_title{
    font-size: 2vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow:hidden;
    color: var(--color-text)!important;
    text-decoration: none;
  }
  .post_card_title:hover{
    text-decoration: underline rgba(0, 175, 223, .82);
  }
  .more_card{
    position: relative;
  }
  .more_card_text{
    background-color: transparent;
    text-decoration: none;
    color: var(--color-text);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-46%,-46%); 
    font-size: 3vw;
    line-height: 5vw;
    letter-spacing: 1.3vw;
  }
  .friends_card{
    width:50%!important;
    height:17vw;
    position: absolute;
    overflow: scroll;
  }
  .friends_card::-webkit-scrollbar {
      display: none;
    }
  .friends_card_img{
    background-position: center;
    background-size: cover;
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 100px;
    width: 2.5vw;
    height: 2.5vw;
    margin: 0.4vw;
    float: left;
    background-color: rgba(0,186,237,.628);;
  }
  .footer_card{
    height: max-content!important;
    width: 96%!important;
  }
  
  @media (max-width: 800px){
      .bigBox { 
        display: block;
        margin-left: 2%;
        margin-right: 2%;
        margin-top: 10px;
        margin-bottom: 10px;
      } 
      .header{
        text-align: center;
        display:flex;
        align-items:center; 
        justify-content:center;
          }

      .center{
        float: none!important;
        margin-left: 0!important;
      }

      .info_name{
        font-size: 20px!important;
      }
      .zcard-wide{
        width:91%!important;
        height:40vw;
      }
      .zcard{
        height:40vw;
        width:41.5%;
        margin: 2%;
        padding: 2%;
      }
      .post_card_title{
        font-size: 5vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow:hidden;
      }
      .more_card_text{
        font-size: 6vw !important;
        line-height: 9vw !important;
        letter-spacing: 4.3vw !important;
      }
      .friends_card{
        height: 40vw;
      }
      .friends_card_img{
        width: 10vw;
        height: 10vw;
      }
      .footer_card{
        width: 91%!important;
      }
  }
  @media (min-width: 800px){
    .post_card{
      width: 25.3%;
    }
    .more_card{
      width: 8%;
    }
    .more_card_text {
      left: 57%;
      font-size: 2vw;
      line-height: 3vw;
    }
  }



</style>
