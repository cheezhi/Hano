import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Aplayer from 'vue3-aplayer'
import "highlight.js/styles/github.css";


const app = createApp(App)
app.component('aplayer', Aplayer) // 自定义标签

console.log(`%c不止于前\n不止于此\n%c Hako %c 版本：2.0.0 作者：cheez`,
  'color: #65B8E5; font-size: 16px;line-height:30px;',
  'background: #296AE5; padding: 4px; border-radius: 3px 0 0 3px; color: #fff', 
  'background: #65B8E5; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
);
console.log(`%c                       
.  . .  .  . .  . .t8.88:8t .  . .  .  . .  .  .
 .       .     .X%S8XX@@@X@%%X.    .       .    
   .  .    . .8%@SXX%8:.8SXSXXt8..   . .     .  
.       .  :@:XXX@StX:  ...XtS@S@X:@:     .     .
 .  . .t@:8XX8:@t   :@@     .t8:8SX8:@%   . .   
.    S.8XXX8%t    :8SX8S .     .;%8XXS8.S     . 
 .%St8XX8 8t   ;8.@@S8%8.  .      ;8 8@X8tSS    
 ;XSXS%S. ..%Xt8XX8.8;.      .  . .. .S%SXXX; . 
. ;XX8X   .S.8SXX@X:     . .   .       . X8SX;   
 ;XS8@ .  @8X@:8: .         .    .  .   @8XX;   
 ;XX8X     tS. .     . .  .    ..8S@: . X8SX; . 
. ;XS8X.  .       .  .        .  t8X8S   @8XX;   
 ;XX8@     .  .    .   . . .    ;8X8% . X8SX;  .
 ;XS8X .       .  .          . .;8X8S   @8XX;   
. ;XX8X   . . .       . .  .     t8X8% . X8SX; . 
 ;XS8@ .        .  .        .   ;8X8S   @8XX;   
 ;XX8X   .  .  .     .  . .   . t8X8% . X8SX;   
. ;XS8@        .  . .        .   :;.:t   @8XX; . 
 ;XX8X .  :t:8;       . .      .      . X8SX;   
 ;XS8X.  .8@@X@S%X. .     .  .   . .    @8XX;  .
. ;XXX;t   ..8%XXS@t8.  .   .   .     . t;XX@;   
 ::8SX8:@%   .@tS@S@X:@: .        . %@:8XX8::   
  .:@;S@X@X;@:  .t8:8S88    . . :@;X@X@S;@:   . 
.      .8;@XSXS8.   .;t@   .   :8SXXX@t@.  .  .  
 .  .   .S%%8XX@.8;  .  .  ;8.@@X8%%S.          
        .   ;8 8XS8tX%..%Xt8XX8.8;    . . . .  .
. . .  .   .    :XXXXS8:.8SXX@X:    .            
        .     .  :8.@@XSXX.8:    .   .  .  . .  
.  . .     .    .   .%XX%.    .    .           .
%c一个平平无奇的苯环在向你问好哦～`,
'color: #296AE5; font-size: 13px;line-height:5px;',
'color: #296AE5; font-size: 15px;line-height:30px;')
app.config.warnHandler = () => null
app.use(router).mount('#app')
  
