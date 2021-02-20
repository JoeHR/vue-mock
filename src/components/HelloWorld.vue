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
      <input type="text" v-model="note" v-emoji placeholder="不能输入😂" />
    </div>
    <div class="directive-box">
      <div class="button">
        这里有个无权限的按钮 <button v-permission="6">无权限</button>
      </div>
    </div>
    <div class="directive-box">
      <div class="button">
        这里有个有权限的按钮 <button v-permission="2">有权限</button>
      </div>
    </div>
    <div
      class="directive-box"
      v-watermarker="{
        text: 'rh版权所有',
        textColor: 'red',
      }"
    >
      水印
    </div>
    <div class="directive-box">
      图片懒加载，建议在网速慢得情况下测试
      <img
        v-lazyload="
          'https://iconfont.alicdn.com/t/c97abc8b-30c9-4a38-8bc3-8cd22aa7ab21.png'
        "
      />
    </div>
    <div class="directive-box">
      <div class="button" @click="sendAxios">
        测试同一请求重复发送,在并发时间内只会发送最后一次请求,打开控制台查看
      </div>
    </div>
    <div class="directive-box">
      <div class="button" @click="changeTestNum">
        数字滚动增加动画，点击一次就会改变一次数字
      </div>
      <div>这个数字不会滚动变化</div>
      <div class="num">{{ testNum }}</div>
      <div>下面的数字会滚动变化</div>
      <div class="num-box" v-numscroll="testNum">{{ testNum }}</div>
    </div>
    <div class="directive-box">
      <div class="tips" @click="changeTestNum">字幕滚动轮播：</div>
      <div class="scroll-parent">
        <div class="scroll-ul" v-textscroll>
          <div class="scroll-list" v-for="i in 20" :key="'scroll_' + i">
            这是滚动的元素 {{ i }}
          </div>
        </div>
      </div>
      <div class="scroll-parent height200">
        <div class="scroll-ul" v-textscroll>
          <div class="scroll-list" v-for="i in 20" :key="'scroll1_' + i">
            这是滚动的元素 {{ i }}
          </div>
        </div>
      </div>
    </div>
    <div class="directive-box">
      <div class="button" @click="openDialog">自定义弹窗</div>
    </div>
  </div>
</template>

<script>
import { queryUser2List, realHttp } from '@/apis/modules/testMock'
import TestModal from './modals/TestModal'
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
    longpress (e) {
      alert('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 19 ~ longpress ~ e', JSON.stringify(e))
    },
    debounceClick (e) {
      console.log('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 23 ~ debounce ~ e', e)
    },
    sendAxios () {
      for (let i = 0; i < 100; i++) {
        queryUser2List()
        realHttp()
      }
    },
    changeTestNum () {
      this.testNum = Math.ceil(Math.random() * 10000)
    },
    async openDialog () {
      const res = await this.$dialog.show('我的弹窗', TestModal, { width: '300px', height: '300px' }, { propData: 1, test: 2 })
      console.log('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 115 ~ openDialog ~ res', res)
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
      transition: background-color 0.38s ease-in-out, color 0.38s ease-in-out,
        opacity 0.38s ease-in-out;
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
