<template>
  <div id="notification">
    <div class="weui-panel" v-for="(note, index) in list" :key="index">
      <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
              <h4 class="weui-media-box__title">{{ note.title }}</h4>
              <p class="weui-media-box__desc">{{ note.content }}</p>
              <ul class="weui-media-box__info">
                  <li class="weui-media-box__info__meta">更新时间</li>
                  <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{ note.updated.substring(0, 10) }}</li>
              </ul>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      list: ''
    }
  },
  created () {
    api.handleApi(api.getNotes(), res => { this.list = res.body.list })
  }
}
</script>

<style scoped>
.weui-media-box__desc {
  display: block;
}
</style>

