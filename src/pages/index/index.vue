<template>
  <div class="container">
    <button @click="showNx">Show NX</button>
    <div class="blank-20"/>
    <div class="cRed tc row row-center userinfo" @click="bindViewTap">
      <div class="col">
        <img class="bdr-gold circle" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        </div>
      <div class="col">
        <img class="bdr-gold circle" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        </div>
      <div class="col">
        <img class="bdr-gold circle" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
  </div>
</template>

<script>
import card from "@/components/card";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    card
  },

  methods: {
    showNx() {
      const { VERSION } = nx;
      console.log(nx, VERSION);
    },
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
};

</script>

<style lang="scss">
@import './index.scss';
</style>
