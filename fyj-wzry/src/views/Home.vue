<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/819841077459195.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/819841077459195.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/819841077459195.jpg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3" slot="pagination"></div>
    </swiper>
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
</style>
