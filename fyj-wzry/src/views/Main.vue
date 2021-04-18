<template>
  <div>
    <!-- 第7个 的 3分钟 -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="nav bg-primary pt-3 pb-2">
        <div class="nav d-flex text-white jc-around pb-1">
            <div class="nav-item active">
                <router-link class="nav-link" tag="div" to="/">首页</router-link>
            </div>
             <div class="nav-item">
                <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
            </div>
             <div class="nav-item">
                <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
            </div>
        </div>
    </div>
    <!-- 子路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
</style>
