<template>
  <div class="ztab">
    <div class="home_item item"><a class="tab_a" href="#"><button class="item_button item_button_1"><i class="item_icon iconfont iconzhuye02-L"></i></button></a></div>
    <div class="other_item item">
        <div class="aitem"><a class="tab_a" href="#archives"><button class="item_button item_button_2">归档</button></a></div>
        <div class="aitem"><a class="tab_a" href="#projects"><button class="item_button item_button_2">作品</button></a></div>
        <div class="aitem"><a class="tab_a" href="#friends"><button class="item_button item_button_2">友人</button></a></div>
        <div class="aitem"><a class="tab_a" href="https://zzzzhi.com/#/about"><button class="item_button item_button_2">关于</button></a></div>
        <div class="aitem">
            <button class="item_button item_button_1" @click="toggleTheme" :class="{ 'is-active': isDarkMode }">
                <i :class="isDarkMode ? 'item_icon iconfont icondark' : 'item_icon iconfont icontianqitaiyangqichuang'"></i>
            </button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.ztab{
    display: flex;
    position: fixed;
    top: 10px;
    z-index: 99;
    left:50%;
    transform: translate(-50%, 0px);
}
.item{
    transition: color 0.1s, background-color 0.1s, box-shadow 0.1s, border 0.1s;
    height:40px;
    margin: 5px;
    background: var(--color-box);
    border: 2px solid var(--color-box);
    box-shadow: 0 0 2.1px -1px var(--color-box-shaow);
}
.home_item{
    border-radius: 31.5px;
    width:40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.other_item{
    border-radius: 31.5px;
    width: max-content;
}
.aitem{
    float: left;
}
.item_icon{
    text-align: center;
}
.item_button{
    aspect-ratio: 1 / 1;
    border-radius: 99999px;
    background-color: Transparent;
    border: hidden;
    height: 40px;
    width: 40px;
    transition: 0.1s;
    color: var(--color-box-shaow);
    outline: none;
}
item_button:focus{
  outline: none;
}
.item_button:hover{
    background: var(--color-box-text-after)!important;
    transition: 0.1s;
}
.item_button_1{
    aspect-ratio: 1 / 1;
    width: 40px;
}
.item_button_2{
    aspect-ratio: 2 / 1;
    width: 80px;
}
.tab_a{
  border-bottom: unset!important;
}

@media (max-width: 450px){
    .item_button_2{
        aspect-ratio: 1 / 1;
        width: 40px;
    }   
}

</style>

<script>  
export default {  
  data() {  
    return {  
      isDarkMode: null, // 初始化为null，以便检查localStorage或系统偏好设置  
      userPreferredTheme: null, // 用户手动选择的主题  
    };  
  },  
  mounted() {  
    // 检查localStorage中是否有用户手动设置的主题  
    this.userPreferredTheme = localStorage.getItem('theme-mode');  
  
    // 检查系统偏好设置  
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;  
  
    // 根据条件设置isDarkMode  
    if (this.userPreferredTheme === null) {  
      this.isDarkMode = prefersDarkScheme;  
    } else {  
      this.isDarkMode = this.userPreferredTheme === 'dark';  
    }  
  
    this.updateThemeMode();  
  
    // 监听系统主题变化（如果有浏览器支持）  
    window.matchMedia('(prefers-color-scheme: dark)').addListener((mediaQueryList) => {  
      if (this.userPreferredTheme === null) {  
        // 如果用户没有手动设置主题，则跟随系统主题变化  
        this.isDarkMode = mediaQueryList.matches;  
        this.updateThemeMode();  
      }  
    });  
  },  
  methods: {  
    toggleTheme() {  
      // 切换主题  
      this.isDarkMode = !this.isDarkMode;  
      const newTheme = this.isDarkMode ? 'dark' : 'light';  
  
      // 检查新主题是否与当前系统偏好相同  
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;  
      if (newTheme === (prefersDarkScheme ? 'dark' : 'light')) {  
        // 如果相同，则清除localStorage中的主题设置  
        localStorage.removeItem('theme-mode');  
        this.userPreferredTheme = null;  
      } else {  
        // 如果不同，则保存新主题到localStorage  
        localStorage.setItem('theme-mode', newTheme);  
        this.userPreferredTheme = newTheme;  
      }  
  
      this.updateThemeMode();  
    },  
    updateThemeMode() {  
      // 根据isDarkMode的值更新theme-mode属性  
      document.body.setAttribute('theme-mode', this.isDarkMode ? 'dark' : 'light');  
    },  
  },  
};  
</script>