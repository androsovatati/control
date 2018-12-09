<template lang="pug">
  .event
    .event__main-info
      .event__header.event-header
        .event-header__user.user
          .user__avatar
            img(src="https://randomuser.me/api/portraits/women/29.jpg")
          .user__name Петрова Анна Степановна
          .user__date сегодня 10:01
        .event-header__contract.contract
          .contract__icon
            i(data-feather="file")
          .contract__number Контракт №57702038150150000160000
          .contract__link
            span Перейти
            i(data-feather="chevron-right")
      .event__title ГБУ "ЖИЛИЩНИК РАЙОНА ЮЖНОЕ ТУШИНО"
      .event__status Статус: Проверка не пройдена
      .event__invalid-type Тип нарушения: Не соответствует требованиям
      .event__footer.event-footer
        .event-footer__files.files Прикреплено 6 файлов
        .event-footer__show-button
    .event__attends.attends
      .attends__comment.comment
        .comment__title.comment-title
          .comment-title__icon
          .comment-title__text
        .comment__text
      .attends__photo.photo
        .photo__title.photo-title
          .photo-title__icon
          .photo-title__text
        .photo__main
        .photo__additional
      .attends__record.record
        .record__title.record-title
          .record-title__icon
          .record-title__text
        .record#waveform
</template>

<script>
export default {
  name: "Event",
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      isCollapsed: true,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.event {
  background: white;
  border-radius: 10px;
  padding: 25px 30px;

  &__header {
    display: flex;
  }
}

.user {
  display: grid;
  grid-template-columns: 80px auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'avatar name' 'avatar date';
  &__avatar {
    grid-area: avatar;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  &__name {
    grid-area: name;
    align-self: end;
    font-size: 15px;
  }
  &__date {
    grid-area: date;
    font-size: 12px;
    color: $disabled-gray;
  }
}
.contract {
  display: flex;
  align-items: center;
  margin-left: 80px;
  box-shadow: 0 0 34px 4px rgba(56, 56, 56, 0.1);
  border-radius: 10px;
}
</style>
