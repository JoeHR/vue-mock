<template>
  <div class="wrap">
    <div class="directive-box">
      <div class="button" v-drag>拖拽指令</div>
    </div>
    <div class="directive-box">
      <div class="button" v-copy="'测试一键copy'">一键copy指令</div>
      <input type="text" placeholder="请右键粘贴" />
    </div>
    <div class="directive-box">
      <div class="button" v-longpress="longpress">长按指令</div>
    </div>
    <div class="directive-box">
      <div class="button" v-debounc="debounceClick">click防抖指令</div>
    </div>
    <div class="directive-box">
      该文本输入框不可以输入 emoji 表情
      <input type="text" v-model="note" v-emoji placeholder="😂文本限制输入指令" />
    </div>
    <div class="directive-box">
      默认权限数组 为 [1,2,3,4,5]
      <pre>
          &lt;div class="button"&gt;
            这里有个无权限的按钮
           &lt;button v-permission="6"&gt;无权限&lt;/button&gt;
          &lt;/div&gt;
      </pre>
      <div class="button">这里有个无权限的按钮 <button v-permission="6">无权限</button></div>
        <pre>
          &lt;div class="button"&gt;
            这里有个有权限的按钮
           &lt;button v-permission="2"&gt;有权限&lt;/button&gt;
          &lt;/div&gt;
      </pre>
      <div class="button">这里有个有权限的按钮 <button v-permission="2">有权限</button></div>
    </div>
    <div
      class="directive-box"
      v-watermarker="{
        text: 'rh版权所有',
        textColor: 'red'
      }"
    >
      水印
    </div>
    <div class="directive-box">
      图片懒加载，建议在网速慢得情况下测试
      <img v-lazyload="'https://iconfont.alicdn.com/t/c97abc8b-30c9-4a38-8bc3-8cd22aa7ab21.png'" />
    </div>
    <div class="directive-box">
      点击按钮，短时发送 100条相同的请求，但只有最后一次请求会发送，前99条请求会被 abort 取消掉
      打开控制台，可以看到 只有最后的一次请求（相同请求）发送成功
      <div class="button" @click="sendAxios">并发请求防抖</div>
    </div>
    <div class="directive-box">
      <div class="button" @click="changeTestNum">数字滚动增加动画，点击一次就会改变一次数字</div>
      <div>这个数字不会滚动变化</div>
      <div class="num">{{ testNum }}</div>
      <div>下面的数字会滚动变化</div>
      <div class="num-box" v-ani-num="testNum">{{ testNum }}</div>
      <div>下面的数字会滚动变化-千分数变化</div>
      <div class="num-box" v-ani-num="testNum" data-thousand=1>{{ testNum }}</div>
      <div>下面的数字会滚动变化-分秒时间变化</div>
      <div class="num-box" v-ani-num="testNum" data-time=1>{{ testNum }}</div>
    </div>
    <div class="directive-box">
      <div class="tips" @click="changeTestNum">字幕滚动轮播：</div>
      <div class="scroll-parent">
        <div class="scroll-ul" v-textscroll>
          <div class="scroll-list" v-for="i in 20" :key="'scroll_' + i">这是滚动的元素 {{ i }}</div>
        </div>
      </div>
      <div class="scroll-parent height200">
        <div class="scroll-ul" v-textscroll>
          <div class="scroll-list" v-for="i in 20" :key="'scroll1_' + i">这是滚动的元素 {{ i }}</div>
        </div>
      </div>
    </div>
    <div class="directive-box">
      <div class="button" @click="openDialogWidthMask()">带遮罩的弹窗-默认top 15vh</div>
      <hr />
      <div class="button" @click="openDialogWidthMask(true)">未设初始高度</div>
      <hr />
      <div class="button" @click="openDialogWidthMask(true,true)">屏幕居中</div>
    </div>
    <div class="directive-box">
      <div class="button" @click="openDialogWidthoutMask()">不带遮罩的弹窗-默认top 15vh</div>
       <hr />
       <div class="button" @click="openDialogWidthoutMask(true)">不带遮罩的弹窗未设初始高度</div>
       <hr />
       <div class="button" @click="openDialogWidthoutMask(true)">不带遮罩的弹窗屏幕居中</div>
    </div>
    <div class="directive-box">
      <div class="button" @click="openSideDialog('normal')">侧边提示弹窗-默认5秒后自动关闭</div>
      <hr />
      <div class="button" @click="openSideDialog('willnotcloseauto',0)">侧边提示弹窗-不会自动关闭消失</div>
    </div>
  </div>
</template>

<script>
import { queryUser2List, realHttp } from '@/apis/modules/testMock'
import TestModal from './modals/TestModal'
import TestNotify from './modals/TestNotify.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      note: '',
      testNum: 0
    }
  },
  props: {
    msg: String
  },
  methods: {
    // 长按指令
    longpress (e) {
      alert('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 19 ~ longpress ~ e', JSON.stringify(e))
    },
    // 双击指令
    debounceClick (e) {
      console.log('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 23 ~ debounce ~ e', e)
    },
    // 并发请求 短时发送100条http请求
    sendAxios () {
      for (let i = 0; i < 100; i++) {
        queryUser2List()
        realHttp()
      }
    },
    // 验证 数字跳动 指令
    changeTestNum () {
      this.testNum = Math.ceil(Math.random() * 10000)
    },
    // 自定义弹窗-有遮罩的弹窗
    async openDialogWidthMask (noheight, isCenter) {
      const res = await this.$showDialog('我的弹窗-带遮罩的弹窗', TestModal, { width: '300px', height: noheight ? '300px' : false, center: isCenter }, { noheight: true })
      if (res) {
        alert('弹窗关闭后返回了true')
      } else {
        alert('弹窗关闭后返回了false')
      }
    },
    // 自定义弹窗-不带遮罩的弹窗
    async openDialogWidthoutMask (noheight, isCenter) {
      const res = await this.$alertDialog('我的弹窗-不带遮罩的弹窗', TestModal, { width: '300px', height: noheight ? '300px' : false, center: isCenter }, { noheight })
      if (res) {
        alert('弹窗关闭后返回了true')
      } else {
        alert('弹窗关闭后返回了false')
      }
    },
    // 自定义弹窗-从侧边弹出的弹窗
    openSideDialog (type, duaration) {
      const titleObj = {
        normal: '默认模式-5s秒后自动关闭',
        willnotcloseauto: '不会自动关闭'
      }
      this.$showNotify(TestNotify, { testProp: titleObj[type] }, duaration)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .directive-box {
    width: 400px;
    height: 400px;
    margin: 5px;
    border: 1px solid #eee;
    img {
      width: 100%;
      height: calc(100% - 15px);
    }
    .button {
      display: inline-block;
      height: 32px;
      border-radius: 4px;
      text-align: center;
      font-size: 12px;
      line-height: 32px;
      cursor: pointer;
      color: #fff;
      border: 1px solid #5b8cff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 16px;
      transition: background-color 0.38s ease-in-out, color 0.38s ease-in-out, opacity 0.38s ease-in-out;
      background: #5b8cff;
      &:hover {
        background: #fff;
        color: #5b8cff;
      }
    }

    .scroll-parent {
      width: 80%;
      height: 36px;
      border: 1px solid #98acdf;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 30px;
      &.height200 {
        height: 200px;
      }
      .scroll-list {
        width: 100%;
        line-height: 36px;
        box-sizing: border-box;
        border-bottom: 1px solid #98acdf;
      }
    }
  }
}
</style>
