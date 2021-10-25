<template>
  <v-container class="container">
    <div>
      <h1 class="heaser-text">SKU (Stock Keeping Unit)</h1>
    </div>
    <v-card class="elevation-0 card-container mt-5" color="#F0F0F0">
      <form class="label-input">
        <div class="mt-3">
          <span>
            <p class="text-label mb-0" for="fname">Nama Produk</p>
            <input
              type="text"
              v-model="varian.name"
              id="sku-prod"
              name="fname"
            />
          </span>
          <span>
            <p class="text-label mb-0" for="fname">Varian 1</p>
            <input
              type="text"
              v-model="varian.varianOne"
              id="sku-var1"
              name="fname"
            />
          </span>
          <v-btn
            fab
            dark
            color="#167ffb"
            @click="addA"
            :disabled="cntA >= 1"
            class="elevation-0 ml-4"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <div v-show="isShowingA">
            <p class="text-label mb-0" for="fname">
              {{ "Varian 2" }}
            </p>
            <input
              type="text"
              id="sku-var2"
              v-model="varian.varianTwo"
              name="fname"
            />
            <v-btn
              fab
              dark
              color="#167ffb"
              @click="addB"
              :disabled="cntB >= 1"
              class="elevation-0 ml-4"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
          <div v-show="isShowingB">
            <p class="text-label mb-0" for="fname">
              {{ "Varian 3" }}
            </p>
            <input
              type="text"
              v-model="varian.varianThree"
              id="sku-var2"
              name="fname"
            />
          </div>
        </div>
      </form>

      <div class="text-xs-right pa-4">
        <v-btn class="button-ship" @click="reset" depressed large>Reset</v-btn>
        <v-btn
          @click="addTabel"
          :disabled="!isFormValid"
          class="button-ship"
          depressed
          large
          >Generate</v-btn
        >
      </div>
    </v-card>
    <!-- v-if="select === item.id" id="cekboks" || start tabel print display none -->
    <!-- :disabled="!isFormValid || (this.varian.id === 5)" || width: 50%; -->
    <div id="table-output" ref="genLabel">
      <table
        style="border: 1px solid black"
        v-for="(item, k) in items"
        :key="k"
      >
        <tbody>
          <tr>
            <td>
              <span v-if="!item.varianTwo && !item.varianThree">
                {{ "Produk : " + [item.name, item.varianOne].join("-") }}
              </span>
              <span v-else-if="!item.varianThree">
                {{
                  "Produk : " +
                  [item.name, item.varianOne, item.varianTwo].join("-")
                }}
              </span>
              <span v-else>
                {{
                  "Produk : " +
                  [
                    item.name,
                    item.varianOne,
                    item.varianTwo,
                    item.varianThree,
                  ].join("-")
                }}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span v-if="!item.generateTwo && !item.generateThree">
                {{ "SKU : " + [item.generates, item.generateOne].join("-") }}
              </span>
              <span v-else-if="!item.generateThree">
                {{
                  "SKU : " +
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span v-else>
                {{
                  "SKU : " +
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
          </tr>
          <tr v-if="k === 0">
            <td style="display: none; width: 0%">
              <span id="ambila" v-if="!item.generateTwo && !item.generateThree">
                {{ [item.generates, item.generateOne].join("-") }}
              </span>
              <span id="ambila" v-else-if="!item.generateThree">
                {{
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span id="ambila" v-else>
                {{
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
            <td style="width: 100%">
              <svg ref="loada"></svg>
            </td>
          </tr>
          <tr v-else-if="k === 1">
            <td style="display: none; width: 0%">
              <span id="ambilb" v-if="!item.generateTwo && !item.generateThree">
                {{ [item.generates, item.generateOne].join("-") }}
              </span>
              <span id="ambilb" v-else-if="!item.generateThree">
                {{
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span id="ambilb" v-else>
                {{
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
            <td style="width: 100%">
              <svg ref="loadb"></svg>
            </td>
          </tr>
          <tr v-else-if="k === 2">
            <td style="display: none; width: 0%">
              <span id="ambilc" v-if="!item.generateTwo && !item.generateThree">
                {{ [item.generates, item.generateOne].join("-") }}
              </span>
              <span id="ambilc" v-else-if="!item.generateThree">
                {{
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span id="ambilc" v-else>
                {{
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
            <td style="width: 100%">
              <svg ref="loadc"></svg>
            </td>
          </tr>
          <tr v-else-if="k === 3">
            <td style="display: none; width: 0%">
              <span id="ambild" v-if="!item.generateTwo && !item.generateThree">
                {{ [item.generates, item.generateOne].join("-") }}
              </span>
              <span id="ambild" v-else-if="!item.generateThree">
                {{
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span id="ambild" v-else>
                {{
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
            <td style="width: 100%">
              <svg ref="loadd"></svg>
            </td>
          </tr>
          <tr v-else-if="k === 4">
            <td style="display: none; width: 0%">
              <span id="ambile" v-if="!item.generateTwo && !item.generateThree">
                {{ [item.generates, item.generateOne].join("-") }}
              </span>
              <span id="ambile" v-else-if="!item.generateThree">
                {{
                  [item.generates, item.generateOne, item.generateTwo].join("-")
                }}
              </span>
              <span id="ambile" v-else>
                {{
                  [
                    item.generates,
                    item.generateOne,
                    item.generateTwo,
                    item.generateThree,
                  ].join("-")
                }}
              </span>
            </td>
            <td style="width: 100%">
              <svg ref="loade"></svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end tabel print display none -->
    <!-- start tabel utama -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      class="elevation-1 mt-5"
    >
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.varianOne }}</td>
          <td class="text-xs-left">{{ props.item.varianTwo }}</td>
          <td class="text-xs-left">{{ props.item.varianThree }}</td>
          <td>
            <span v-if="!props.item.generateTwo && !props.item.generateThree">
              {{ [props.item.generates, props.item.generateOne].join("-") }}
            </span>
            <span v-else-if="!props.item.generateThree">
              {{
                [
                  props.item.generates,
                  props.item.generateOne,
                  props.item.generateTwo,
                ].join("-")
              }}
            </span>
            <span v-else>
              {{
                [
                  props.item.generates,
                  props.item.generateOne,
                  props.item.generateTwo,
                  props.item.generateThree,
                ].join("-")
              }}
            </span>
          </td>
          <td class="text-xs-left layout px-4">
            <v-icon
              class="text-xs-left"
              small
              @click="deleteItem(props.item)"
              color="error"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- :disabled="!(this.varian.id === 3)" || end tabel utama -->
    <v-btn
      class="button-sku mt-4"
      @click="download"
      :disabled="!(this.varian.id === 5)"
      depressed
      large
      >Generate Label
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      disableBtnFlagA: false,
      disableBtnFlagB: false,
      isShowingA: false,
      isShowingB: false,
      cntA: 0,
      cntB: 0,
      selected: [],
      items: [],
      varian: {
        id: 0,
        name: "",
        varianOne: "",
        varianTwo: "",
        varianThree: "",
      },
      headers: [
        {
          text: "Nama Produk",
          sortable: false,
          class: "blue darken-1 white--text",
        },
        {
          text: "Varian 1",
          sortable: false,
          class: "blue darken-1 white--text",
        },
        {
          text: "Varian 2",
          sortable: false,
          class: "blue darken-1 white--text",
        },
        {
          text: "Varian 3",
          sortable: false,
          class: "blue darken-1 white--text",
        },
        {
          text: "SKU Generator",
          sortable: false,
          class: "blue darken-1 white--text",
        },
        {
          text: "Actions",
          sortable: false,
          class: "blue darken-1 white--text",
        },
      ],
    };
  },
  computed: {
    isFormValid() {
      return this.varian.name && this.varian.varianOne;
    },
  },
  mounted() {
    if (localStorage.getItem("items")) {
      this.sku = JSON.parse(localStorage.getItem("items") || "[]");
    }
  },
  methods: {
    addA() {
      if (!this.disableBtnFlagA) {
        this.isShowingA = true;
        this.cntA = ++this.cntA;
      } else if (this.disableBtnFlagA === 1) {
        this.disableBtnFlagA = true;
      }
    },
    addB() {
      if (!this.disableBtnFlagB) {
        this.isShowingB = true;
        this.cntB = ++this.cntB;
      } else if (this.disableBtnFlagB === 1) {
        this.disableBtnFlagB = true;
      }
    },
    addTabel() {
      localStorage.setItem("items", JSON.stringify(this.items));
      const generates = this.varian.name;
      const generateOne = this.varian.varianOne;
      const generateTwo = this.varian.varianTwo;
      const generateThree = this.varian.varianThree;
      this.varian.id++;
      this.items.push({
        name: this.varian.name,
        varianOne: this.varian.varianOne,
        varianTwo: this.varian.varianTwo,
        varianThree: this.varian.varianThree,
        generates: generates.substring(0, 3),
        generateOne: generateOne.substring(0, 3),
        generateTwo: generateTwo.substring(0, 3),
        generateThree: generateThree.substring(0, 3),
      });
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      // eslint-disable-next-line no-alert
      const message = confirm("Anda yakin ingin menghapus?");
      if (message) {
        this.items.splice(index, 1);
        this.varian.id--;
        localStorage.setItem("items", JSON.stringify(this.items));
      }
    },
    reset() {
      this.varian.name = "";
      this.varian.varianOne = "";
      this.varian.varianTwo = "";
      this.varian.varianThree = "";
      this.isShowingB = false;
      this.isShowingA = false;
      this.cntA = 0;
      this.cntB = 0;
    },
    download() {
      const xz = document.getElementById("table-output");
      const boma = xz.querySelector("#ambila").innerHTML;
      const bomb = xz.querySelector("#ambilb").innerHTML;
      const bomc = xz.querySelector("#ambilc").innerHTML;
      const bomd = xz.querySelector("#ambild").innerHTML;
      const bome = xz.querySelector("#ambile").innerHTML;

      const JsBarcode = require("jsbarcode");
      JsBarcode(this.$refs.loada, boma, {
        width: "1",
        height: "90",
        textAlign: "left",
      });
      JsBarcode(this.$refs.loadb, bomb, {
        width: "1",
        height: "90",
        textAlign: "left",
      });
      JsBarcode(this.$refs.loadc, bomc, {
        width: "1",
        height: "90",
        textAlign: "left",
      });
      JsBarcode(this.$refs.loadd, bomd, {
        width: "1",
        height: "90",
        textAlign: "left",
      });
      JsBarcode(this.$refs.loade, bome, {
        width: "1",
        height: "90",
        textAlign: "left",
      });

      const divToPrint1 = this.$refs.genLabel;
      const newWin = window.open();
      newWin.document.writeln(`
      <!DOCTYPE html>
        <head>
           <style>
            body {
            font-family: Roboto;
            }
            h1 {
              color: black;
            }
            p {
            color: black;
            font-size : 17px;
              }
          </style>
        </head>

        <body>
      `);
      newWin.document.write(divToPrint1.outerHTML);
      newWin.document.write(`</body>
        </html>`);
      newWin.print();
    },
  },
  watch: {
    items: {
      handler() {
        localStorage.setItem("items", JSON.stringify(this.items));
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/sku.scss";
</style>