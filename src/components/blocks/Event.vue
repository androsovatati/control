<template lang="pug">
  .event
    .event__main-info
      .event__header.event-header
        .event-header__user.user
          .user__avatar
          .user__name
          .user__date
        .event-header__contract.contract
          .contract__icon
          .contract__number
          .contract__link
      .event__title
      .event__status
      .event__invalid-type
      .event__footer.event-footer
        .event-footer__files.files
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
}
</style>
