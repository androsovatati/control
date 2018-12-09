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
      .event__status.event-status
        .event-status__label Статус: 
        .event-status__value Проверка не пройдена
        .event-status__icon
          i(data-feather="x")
      .event__violation.event-violation
        .event-violation__label Тип нарушения:
        .event-violation__value Работы выполнены не в полном объеме
      .event__footer.event-footer
        .event-footer__files.files Прикреплено 6 файлов
        .event-footer__show-button
          basic-button Посмотреть отчет
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
import BasicButton from '@/components/controls/Button.vue';

export default {
  name: "Event",
  components: {
    BasicButton,
  },
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
  },
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

  &__title {
    margin-top: 30px;
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #dedede;
  }

  &__status {
    display: flex;
    align-items: center;
    margin-top: 28px;
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
  width: 350px;
  height: 60px;
  box-shadow: 0 0 34px 4px rgba(56, 56, 56, 0.1);
  border-radius: 10px;
  font-size: 12px;
  overflow: hidden;
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: $red-gradient;
    svg {
      width: 14px;
      height: 18px;
      color: white;
    }
  }
  &__number {
    display: flex;
    align-items: center;
    height: 100%;
    border-right: 1px solid #dedede;
  }
  &__link {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    color: $disabled-gray;
    cursor: pointer;
    &:hover {
      background: rgba($color: $disabled-gray, $alpha: .1);
    }
    svg {
      width: 15px;
      height: 20px;
    }
  }
}

.event-status {
  &__label {
    font-weight: 500;
    margin-right: 5px;
  }
}
.event-violation {
  display: flex;
  align-items: center;
  &__label {
    font-weight: 500;
    margin-right: 5px;
  }
}
</style>
