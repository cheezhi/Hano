<script setup lang="ts">

</script>
<template>
  <div class="layer">
    <!-- loading -->
    <center><div class="loading"><img class="loading-gif" src="../assets/loading.gif"></div></center>

  </div>
</template>

<script>  
export default {  
  name: 'MyComponent',  
  mounted() {  
    // 添加事件监听器  
    document.oncontextmenu = this.nocontextmenu;  
    document.onmousedown = this.norightclick;  
    document.ondragstart = this.noDragstart;  
    document.onselectstart = this.noSelect;  
    document.onkeydown = this.keyDown;  
  
    // 注意：onselect 的处理略有不同，因为它需要清空选中的文本  
    // 在Vue中，通常不直接操作DOM的selection，但如果需要，可以使用原生JS方法  
    // 注意：以下代码可能不会在所有浏览器中工作，且可能不符合Vue的最佳实践  
    document.onselect = () => {  
      if (window.getSelection) {  
        const selection = window.getSelection();  
        if (selection.rangeCount > 0) {  
          selection.removeAllRanges();  
        }  
      } else if (document.selection) {  
        document.selection.empty();  
      }  
    };  
  },  
  beforeDestroy() {  
    // 在组件销毁前移除事件监听器  
    document.oncontextmenu = null;  
    document.onmousedown = null;  
    document.ondragstart = null;  
    document.onselectstart = null;  
    document.onkeydown = null;  
    document.onselect = null;  
  },  
  methods: {  
    noDragstart(event) {  
      // 禁止拖动的逻辑  
      event.preventDefault();  
    }
  }  
};  
</script>

<style lang="scss" scoped>
.loading-gif{
  border-radius: 10px;
  width: 100px;
}
.loading{
  /* width: 90%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.layer{
  z-index:99;
  background: var(--color-background);
  transition: color 0.1s, background-color 0.1s;
  width:100%;height:100vh;
  position:fixed;top:0;left:0;
}


@keyframes ball-scale-ripple-multiple {
  0% {
    opacity: 1;
    transform: scale(0.1);
  }

  70% {
    opacity: 0.5;
    transform: scale(1);
  }

  95% {
    opacity: 0;
  }
}
</style>