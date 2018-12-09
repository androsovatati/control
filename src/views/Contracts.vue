<template lang="pug">
  .contracts
    preloader.contracts__preloader(v-if="isLoading" :size="50" line-bg-color="#eaeaea" line-fg-color="#b12726")
    div(v-else)
      VueDropzone(:options="dropzoneOptions", ref="myVueDropzone").invisible
      base-button.contracts__upload(@click="uploadFile") Загрузите файл
      table.contracts__table(v-if="contracts")
        tr
          th(v-for="title in tableColumnsTitle") {{ title }}
        tr
          td(v-for="(title, i) in tableColumnsTitle") {{ i }}
        tr
          td(v-for="(title, i) in tableColumnsTitle") {{ i }}
        tr
          td(v-for="(title, i) in tableColumnsTitle") {{ i }}
      .divider или введите номера контрактов через запятую в форму ниже:
      .form
        input.contracts-input(v-model="contractsNumber" placeholder="Номера контрактов")
        .contracts-button.contracts-button_check(@click="check")
          check-icon
</template>

<script>
import Button from "@/components/controls/Button.vue";
import VueDropzone from "vue2-dropzone";
import config from "@/config/index.js";
import { CheckIcon } from 'vue-feather-icons';
import Preloader from 'vue-simple-spinner';
import FileSaver from 'file-saver';

export default {
  name: "Contracts",
  components: {
    BaseButton: Button,
    VueDropzone,
    CheckIcon,
    Preloader
  },
  data() {
    return {
      isLoading: false,
      contractsNumber: [],
      tableColumnsTitle: [
        "№",
        "Номер контракта",
        "Заказчик",
        "Дата окончания истечения контракта",
        "Адрес",
        "Комментарий",
        "Предмет договора",
        "Исполнитель"
      ],
      dropzoneOptions: {
        url: `${config.apiHost}/api/upload`,
        acceptedFiles: ".xlsx",
        method: "post",
        paramName: "excel",
        previewsContainer: false
      }
    };
  },
  methods: {
    uploadFile() {
      this.isLoading = true;
      const dropzone = this.$refs.myVueDropzone;
      dropzone.$el.click();
    },
    check() {
      this.isLoading = true;
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  },
  mounted() {
    const blob = new Blob([this.s2ab(atob('sw'))], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});

    setTimeout(() => {
      FileSaver.saveAs(blob, "contracts.xlsx");    
    }, 2000)
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.invisible {
  visibility: hidden;
  width: 0;
  height: 0;
}

.contracts {
  &__upload {
    margin-top: 10px;
    width: 173px;
  }
  &__preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    th,
    td {
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

.divider {
  margin: 20px 0;
  font-size: 14px;
}
.form {
  display: flex;
  align-items: center;
}
.contracts-input {
  width: 500px;
  padding: 0 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  line-height: 40px;
  outline: none;
}
.contracts-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 25px;
  // font-weight: 500;
  cursor: pointer;

  &_check {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $green-gradient;
    svg {
      display: block;
      width: 25px;
    }
    &:hover {
      background: $green-gradient-reverse;
    }
  }


  &_add {
    background: $blue;
    margin-right: 10px;
    &:hover {
      background: lighten($color: $blue, $amount: 5%);
    }
  }
}
</style>
