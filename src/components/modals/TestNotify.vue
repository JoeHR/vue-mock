<template>
  <div class="notify-wrap">
    <div class="notify-head">
      <div class="notify-title">您有一条新的订单信息</div>
      <div class="close cursor" @click="close"><i class="iconfont iconguanbi1"></i></div>
    </div>
    <div class="notify-body">
      <div class="alarm-desc">
        <div class="alarm-tag">订单来源-天猫平台</div>
        <div class="alarm-time">2021-09-03 15:45:45</div>
      </div>
      <div class="alarm-address">申客小区-大连路975弄30-1#</div>
      <div class="alarm-reg">
        上海市-上海市辖区-虹口区-嘉兴路街道
      </div>
      <div class="alarm-prop">
        这是 props 传进来的值：{{testProp}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewAlarm',
  props: {
    testProp: String
  },
  methods: {
    close () {
      this.observer.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.notify-wrap{
  width: 300px;
  border-radius: 3px;
  box-shadow: 0px 3px 6px 0px #bfc5d2;
  .notify-head{
    width: 100%;
    line-height: 32px;
    background: #323c50;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    .notify-title{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        width: 18px;
        height: 18px;
      }
    }
    .close .fziconfont{
      font-size: 12px;
    }
  }
  .notify-body{
    padding: 0 10px 15px;
    color: #666;
    line-height: 24px;
    background: #fff;
    .alarm-desc{
      display: flex;
      justify-content: space-between;
      line-height: 32px;
      font-size: 14px;
    }
    .alarm-address{
      color: #323c50;
      font-weight: 600;
    }
  }
}
</style>
