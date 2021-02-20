<template>
  <div class="testModal">
    <div class="btn-group">
      <div class="cancel button" @click="onCancel(false)">取消</div>
      <div class="confirm button" @click="onSubmit">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestModal',
  methods: {
    onCancel (isSuccess = false) {
      if (this.observer != null) {
        console.log('点击了取消，关闭弹窗后返回的应该为false')
        this.observer.cancel(isSuccess)
      }
    },
    async onSubmit () {
      console.log('点击了确认，关闭弹窗后返回的应该为true')
      this.onCancel(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.testModal {
  .btn-group {
    display: flex;
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
  }
}
</style>
