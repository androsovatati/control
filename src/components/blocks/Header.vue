<template lang="pug">
  .header
    input.header__search(placeholder="Поиск по сотрудникам, документам...")
    clock.header__clock
    .header__user.user-info
      .user-info__avatar
      .user-info__name Сергеев Алексей Иванович
      i.user-info__icon(data-feather="chevron-down")
</template>

<script>
import Clock from '@/components/elements/Clock.vue';

export default {
  name: 'Header',
  components: {
    Clock,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;

  &__search {
    flex-shrink: 1;
    flex-basis: 670px;
    padding-left: 64px;
    margin-right: 40px;
    background-image: url('~@/assets/search.png');
    background-repeat: no-repeat;
    background-position: 25px center; 
    border: none;
    border-radius: 20px;
    line-height: 40px;
    outline: none;
  }
}

.user-info {
  display: flex;
  flex-shrink: 0;
  margin-left: 40px;
  align-items: center;
  cursor: pointer;

  &__avatar {
    width: 55px;
    height: 55px;
    margin-right: 15px;
    background: url('~@/assets/17.jpg') center center;
    background-size: cover;
    border-radius: 50%;
  }

  &__name {
    margin-right: 10px;
    color: $primary-gray;
    font-size: 16px;
  }

  &__icon {
    width: 20px;
    color: $light-gray;
  }
}
</style>
