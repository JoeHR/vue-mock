<template>
  <div class="hello">
    <div class="directive-box">
      <div class="button" v-drag>拖拽指令</div>
      <div class="button" v-copy="'测试一键copy'">一键copy指令</div>
      <div class="button" v-longpress="longpress">长按指令</div>
      <div class="button" v-debounc="debounceClick">click防抖指令</div>
      <input type="text" v-model="note" v-emoji placeholder="不能输入😂" />
      <div class="button">
        这里有个无权限的按钮 <button v-permission="6">无权限</button>
      </div>
      <div class="button">
        这里有个有权限的按钮 <button v-permission="2">有权限</button>
      </div>
      <div
        class="watermarker"
        v-watermarker="{
          text: 'rh版权所有',
          textColor: 'red',
        }"
      >水印</div>
      <img
        v-lazyload="
          'https://iconfont.alicdn.com/t/c97abc8b-30c9-4a38-8bc3-8cd22aa7ab21.png'
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      note: ''
    }
  },
  props: {
    msg: String
  },
  methods: {
    longpress (e) {
      console.log('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 19 ~ longpress ~ e', e)
    },
    debounceClick (e) {
      console.log('🚀👻👻👻 ~ file: HelloWorld.vue ~ line 23 ~ debounce ~ e', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.watermarker{
  width: 400px;
  height: 400px;
}
</style>
