<script setup>
import { ref, onMounted } from 'vue' 
var d = new Date();
const count = ref(0)
const year = ref(d.getFullYear()); 
</script>
<template>
  <div class="footer">
    <div class="left">
      <a href="https://icp.gov.moe/?keyword=11111111" target="_blank">萌ICP备11111111号</a><br>
      <span>Copyright©<button class="year_button wave-underline" type="button" @click="count++">{{ year+count }}</button> 祈之</span>
    </div>
    <div class="right">
      <span>Powered by <a href="https://github.com/cheezhi/Hano" target="_blank">Hano</a></span>
    </div>
  </div>
</template>



<style lang="scss" scoped>
  .footer{
    margin-top:30px;
    font-size: 15px;
    margin: 1%;
    position: relative;
  }
  .year_button{
    aspect-ratio: 1 / 3;
    border-radius: 8px;
    background-color: Transparent;
    border: hidden;
    height: 30px;
    transition: 0.1s;
    font-size: 15px;
    color: var(--color-text);
  }
  /*.year_button:hover{
    background: var(--color-box-text-after)!important;
    transition: 0.1s;
  }*/
  .left{
  }
  .right{
    position: absolute;
    right: 0;
    bottom: 4px;
  }
</style>

