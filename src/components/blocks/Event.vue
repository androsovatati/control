<template lang="pug">
  .event
    .event-main(:class="{ 'event-main_shadow': !isCollapsed }")
      .event-line(:class="{ 'event-line_success' : data.isValid }")
      .event__main-info
        .event__header.event-header
          .event-header__user.user
            .user__avatar
              img(src="https://randomuser.me/api/portraits/women/29.jpg")
            .user__name Петрова Анна Степановна
            .user__date сегодня 10:01
          .event-header__contract.contract(
            :class="{ 'contract_success' : data.isValid }"
          )
            .contract__icon
              file-icon
            .contract__number Контракт №57702038150150000160000
            .contract__link
              span Перейти
              chevron-right-icon
        .event__title ГБУ "ЖИЛИЩНИК РАЙОНА ЮЖНОЕ ТУШИНО"
        .event__status.event-status
          .event-status__label Статус: 
          .event-status__value Проверка не пройдена
          .event-status__icon(v-if="data.isValid")
            check-icon.event-status__check-icon
          .event-status__icon(v-else)
            x-icon.event-status__x-icon
        .event__violation.event-violation(v-if="!data.isValid")
          .event-violation__label Тип нарушения:
          .event-violation__value Работы выполнены не в полном объеме
        .event__footer.event-footer
          .event-footer__files.footer-files
            .footer-files__text Прикреплено 6 файлов:
            .footer-image
              image-icon.footer-image__icon
              .footer-image__count 5
            .footer-records
              mic-icon.footer-records__icon
              .footer-records__count 1
            message-circle-icon.footer-comments
          basic-button.event-footer__show-button(:color="data.isValid ? 'green' : 'red'" @click="isCollapsed = !isCollapsed")
              div(v-if="isCollapsed") Посмотреть отчет
              div.button-text(v-else)
                span Свернуть
                chevron-up-icon
    .event__attends.attends(v-if="!isCollapsed")
      .attends__comment.comment
        .comment__title.comment-title
          message-circle-icon.comment-title__icon
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
import { FileIcon, XIcon, ChevronRightIcon, ChevronUpIcon, ImageIcon, MicIcon, MessageCircleIcon, CheckIcon } from 'vue-feather-icons';

export default {
  name: "Event",
  components: {
    BasicButton,
    FileIcon,
    XIcon,
    ChevronRightIcon,
    ImageIcon,
    MicIcon,
    MessageCircleIcon,
    CheckIcon,
    ChevronUpIcon
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
  overflow: hidden;

  &-main {
    padding: 25px 30px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    &_shadow {
      box-shadow: 0 7px 34px 4px rgba(56, 56, 56, 0.1);
    }
  }

  &-line {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #b12726;
    background-image: linear-gradient(to top, #b12726 0%, #ed4b49 100%);
    &_success {
      background-image: linear-gradient(to top, #62a547 0%, #8ac473 100%);
    }
  }

  &__header {
    display: flex;
  }

  &__title {
    margin-top: 20px;
    padding-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #dedede;
  }

  &__status {
    display: flex;
    align-items: center;
    margin-top: 15px;
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
  &_success {
    .contract__icon {
      background: $green-gradient;
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
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    width: 15px;
    height: 15px;
    color: white;
  }
  .event-status__check-icon{
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: $green-gradient;
  }
  .event-status__x-icon{
    width: 13px;
    height: 13px;
    background: $red-gradient;
    border-radius: 50%;
  }
}
.event-violation {
  display: flex;
  align-items: center;
  margin-top: 5px;
  &__label {
    font-weight: 500;
    margin-right: 5px;
  }
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__show-button {
    width: 170px;
  }
}
.footer-files {
  display: flex;
  align-items: center;
  color: $disabled-gray;
  font-size: 14px;
  &__text {
    margin-right: 10px;
  }
}

.footer-image, .footer-records {
  display: flex;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid #dedede;
}
.footer-image {
  &__icon {
    width: 18px;
  }
  &__count {
    margin-left: 7px;
    width: 25px;
    height: 14px;
    border-radius: 7px;
    background: $blue;
    text-align: center;
    line-height: 14px;
    font-size: 10px;
    color: white;
  }
}

.footer-records {
  margin-left: 12px;
  &__icon {
    width: 18px;
  }
  &__count {
    margin-left: 7px;
    width: 25px;
    height: 14px;
    border-radius: 7px;
    background: $blue;
    text-align: center;
    line-height: 14px;
    font-size: 10px;
    color: white;
  }
}

.footer-comments {
  margin-left: 12px;
  width: 18px;
}
.button-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  svg {
    width: 18px;
  }
}
</style>
