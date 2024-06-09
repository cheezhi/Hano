<template>  
  <div id="waline"></div>  
</template>  
  
<script>  
export default {  
  props: ['path'],
  name: 'WalineComment',  
  mounted() {  
    this.initWaline();  
  },  
  methods: {  
    async initWaline() {  
      const { init } = await import('https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/statics/waline.js');  
      init({  
        el: '#waline',  
        serverURL: 'https://comment.example.com', 
        path: '/'+this.path,
        search: false,
        emoji: [
            'https://npm.elemecdn.com/@waline/emojis@1.2.0/bilibili/',
            'https://unpkg.com/@waline/emojis@1.2.0/bmoji',
          ],
      });  
    },  
  },  
};  
</script>  
  
<style scoped>  
@import "https://space.tutime.cn/d/%E7%A5%88%E7%AA%9D/Projects/public/statics/waline.css";
</style>