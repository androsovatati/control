<template lang="pug">
  .contracts
    base-button.contracts__upload(@click="uploadFile") Загрузить файл
    table.contracts__table
      tr
        th(v-for="title in tableColumnsTitle") {{ title }}
      tr
        td(v-for="(title, i) in tableColumnsTitle") {{ i }}
      tr
        td(v-for="(title, i) in tableColumnsTitle") {{ i }}
      tr
        td(v-for="(title, i) in tableColumnsTitle") {{ i }}

</template>

<script>
import Button from '@/components/controls/Button.vue';

export default {
  name: 'Contracts',
  components: {
    BaseButton: Button,
  },
  data() {
    return {
      tableColumnsTitle: ['№', 'Номер контракта', 'Заказчик', 'Дата окончания истечения контракта', 'Адрес', 'Комментарий', 'Предмет договора', 'Исполнитель'],
    }
  },
  methods: {
    uploadFile() {
      alert('upload!');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.contracts {
  &__upload {
    margin-top: 10px;
    width: 173px;
  }
  &__table {
    margin-top: 30px;
    width: 100%;
    background: white;
    border-radius: 10px;
    font-size: 12px;

    th {
      padding: 18px;
      font-weight: 500;
    }
    td {
      text-align: center;
      padding: 14px;
    }
    th, td {
      border: 1px solid #dedede;
    }
    tr:first-child th {
      border-top: 0;
    }
    tr:last-child td {
      border-bottom: 0;
    }
    tr td:first-child,
    tr th:first-child {
      border-left: 0;
    }
    tr td:last-child,
    tr th:last-child {
      border-right: 0;
    }
  }
}
</style>