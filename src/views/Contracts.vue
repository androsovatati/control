<template lang="pug">
  .contracts
    preloader.contracts__preloader(v-if="isLoading" :size="50" line-bg-color="#eaeaea" line-fg-color="#b12726")
    div(v-show="!isLoading")
      VueDropzone(:options="dropzoneOptions", ref="myVueDropzone", id="dropzone", @vdropzone-file-added="onAdded", @vdropzone-success="onSuccess").invisible
      base-button.contracts__upload(@click="onDropzoneClick") Загрузите файл
      table.contracts__table(v-if="contracts.length")
        tr
          th(v-for="title in tableColumnsTitle") {{ title }}
        tr(v-for="(contract, i) in contracts").contract
          td {{ i + 1 }}
          td {{ contract.number }}
          td {{ contract.subject }}
          td {{ contract.cost }}
          td {{ contract.address }}
          td {{ contract.expirationDate }}
      .divider или введите номер контракта в форму ниже:
      .form
        input.contracts-input(v-model="contractNumber" placeholder="Номер контракта")
        .contracts-button.contracts-button_check(@click="check")
          check-icon
</template>

<script>
import Button from "@/components/controls/Button.vue";
import VueDropzone from "vue2-dropzone";
import config from "@/config/index.js";
import { CheckIcon } from "vue-feather-icons";
import Preloader from "vue-simple-spinner";
import axios from "axios";

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
      contractNumber: "",
      tableColumnsTitle: [
        "№",
        "Номер контракта",
        "Предмет проверки",
        "Стоимость объекта проверки",
        "Адрес объекта",
        "Дата завершения контракта"
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
  computed: {
    contracts() {
      return this.$store.state.contracts;
    }
  },
  methods: {
    onDropzoneClick() {
      const dropzone = this.$refs.myVueDropzone;
      dropzone.$el.click();
    },
    onAdded() {
      this.isLoading = true;
    },
    async onSuccess() {
      await this.$store.dispatch("getContracts");
      this.isLoading = false;
    },
    async check() {
      this.isLoading = true;

      const { contractNumber } = this;
      const { data } = await axios.get(
        config.apiHost + "/api/parse/" + contractNumber
      );

      const a = document.createElement("a");
      a.setAttribute("download", "");
      a.setAttribute("href", data.path);
      a.setAttribute("name", "contract.xlsx");

      console.log(a.getAttribute("href"));

      document.body.appendChild(a);

      a.click();

        this.isLoading = false;
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch("getContracts");
    this.isLoading = false;
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
    tr.contract:hover {
      background-color: rgba(0, 0, 0, 0.05);
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
