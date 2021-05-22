<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/a2cb5e99b8da0cb4a1036d871e75c285.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/86a4e97f1b9be684f1ce8bacd7b80293.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/5f2a01d86107e0a892f7d6398375b219.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons text-center bg-white mt-3 d-flex flex-wrap pt-3 text-dark-1">
      <div class="nav-item mb-2" v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div>爆料站</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: true
        // Some Swiper option/callback...
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: .153846rem ;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
  }
}
</style>
