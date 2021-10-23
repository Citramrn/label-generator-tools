<template>
  <v-form novalidate @submit.prevent="download">
    <v-container class="view-shipping">
      <h1 class="text-ship">Shipping</h1>

      <v-layout row wrap class="mt-4">
        <v-flex xs12 sm6 class="print-container">
          <h2 class="sendrec">Pengirim</h2>
          <div class="mt-3" ref="content">
            <label class="text-label" for="fname">Nama</label>
            <input
              type="text"
              v-model="receiver.name"
              placeholder="Cth : John "
              id="fname"
              name="fname"
              validation="required"
            />
            <span class="output-print" ref="printOne">{{ receiver.name }}</span>

            <div class="mt-3">
              <label class="text-label" for="fname">Alamat</label>
              <textarea
                type="text"
                v-model="receiver.address"
                placeholder="Blitar, Jawa Timur - Indonesia"
                id="fname"
                name="fname"
                validation="required"
              ></textarea>
              <span class="output-print" ref="printTwo">{{
                receiver.address
              }}</span>
            </div>
          </div>
        </v-flex>

        <v-flex xs12 sm6>
          <h2 class="sendrec">Penerima</h2>
          <div class="mt-3" ref="content">
            <label class="text-label" for="fname">Nama</label>
            <input
              type="text"
              v-model="sender.name"
              placeholder="Cth : Rey"
              id="fname"
              name="fname"
            />
            <span class="output-print" ref="printThree">{{ sender.name }}</span>
            <div class="mt-3">
              <label class="text-label" for="fname">Alamat</label>
              <textarea
                type="text"
                v-model="sender.address"
                placeholder="Malang, Jawa Timur - Indonesia"
                id="fname"
                name="fname"
              ></textarea>
              <span class="output-print" ref="printFour">{{
                sender.address
              }}</span>
            </div>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="package-detail">
        <v-flex xs12 sm6>
          <div class="mt-3" ref="content">
            <label class="text-label" for="start">Tanggal</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              min="1200-01-01"
              max="2090-12-31"
              v-model="date"
            />
            <span class="output-print" ref="printSix">{{ date }}</span>

            <div class="mt-3">
              <svg style="display: none" ref="brcode" id="itf" />
            </div>
          </div>
        </v-flex>

        <v-flex xs12 sm6>
          <div class="mt-3 pack-resi" ref="content">
            <label class="text-label" for="fname">No. resi</label>
            <input type="text" v-model="barcodes" id="resi" name="fname" />
            <span class="output-print" ref="load">{{ barcodes }}</span>
            <div class="mt-3">
              <label class="text-label" for="fname">Berat Paket</label>
              <input
                type="number"
                class="kilograms"
                v-model="heavy"
                step="0.01"
                placeholder="Kg"
                id="fname"
                name="fname"
                validation="required"
              />
              <span class="output-print" ref="printFive">{{ heavy }}</span>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <div class="text-xs-right">
        <v-btn
          @click="download"
          :disabled="!isFormValid"
          class="button-ship"
          depressed
          large
          >Generate</v-btn
        >
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Shipping",
  data() {
    return {
      date: "",
      barcodes: "",
      heavy: "",
      receiver: {
        name: "",
        address: "",
      },
      sender: {
        name: "",
        address: "",
      },
    };
  },

  computed: {
    isFormValid() {
      return (
        this.receiver.name &&
        this.receiver.address &&
        this.sender.name &&
        this.sender.address &&
        this.date &&
        this.heavy &&
        this.barcodes
      );
    },
  },

  mounted() {
    if (localStorage.getItem("receiver")) {
      this.invoices = JSON.parse(localStorage.getItem("receiver"));
    }
    if (localStorage.getItem("sender")) {
      this.invoices = JSON.parse(localStorage.getItem("sender"));
    }
    if (localStorage.details) {
      this.date = localStorage.date;
      this.heavy = localStorage.weight;
      this.barcodes = localStorage.barcodes;
    }
  },

  methods: {
    download() {
      localStorage.setItem("receiver", JSON.stringify(this.receiver));
      localStorage.setItem("sender", JSON.stringify(this.sender));
      localStorage.date = this.date;
      localStorage.weight = this.heavy;
      localStorage.barcodes = this.barcodes;

      const divToPrinta = this.$refs.printOne;
      const divToPrintb = this.$refs.printTwo;

      const divToPrintc = this.$refs.printThree;
      const divToPrintd = this.$refs.printFour;

      const divToPrinte = this.$refs.printFive;
      const divToPrintf = this.$refs.printSix;

      // const divToPrintBarcode = this.$refs.load; // no rresi
      const divToPrintBrcode = this.$refs.brcode; // barcode
      const JsBarcode = require("jsbarcode");

      JsBarcode("#itf", this.barcodes, {
        format: "CODE128",
        width: "2",
        height: "60",
      });

      const newWin = window.open(
        ("PrintWindow", "width=750,height=650,top=50,left=50")
      );
      // start print
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
            font-size: 17px;
              }
          </style>
        </head>

        <body>
          <table style="border: 2px solid black; padding: 10px;">
            <tbody>
              <tr>
                <td>
                  <h1>Inskuship</h1>
                  <h2>Pengirim</h2>
                  <p>Nama :
                  `);
      newWin.document.write(divToPrinta.outerHTML);
      newWin.document.writeln(`
                    <br>
                    Alamat :
      `);
      newWin.document.write(divToPrintb.outerHTML);
      newWin.document.writeln(`
                  </p>
                </td>
           </tr>
           <tr>
             <td colspan="5">
      `);
      // newWin.document.write(divToPrintBarcode.outerHTML);
      newWin.document.writeln(`
              <img />
      `);
      newWin.document.write(divToPrintBrcode.outerHTML);
      newWin.document.writeln(`
              </td>
            </tr>
            <tr>
             <td>
               <h2>Penerima</h2>
                <p>Nama :
      `);
      newWin.document.write(divToPrintc.outerHTML);
      newWin.document.writeln(`
                <br>
                Alamat :
      `);
      newWin.document.write(divToPrintd.outerHTML);
      newWin.document.writeln(`
                </p>
               </td>
             </tr>
             <tr>
               <td colspan="2">
                <p>
                  Berat Paket :
                  `);
      newWin.document.write(divToPrinte.outerHTML);
      newWin.document.writeln(`
                  Kg
                  <br>
                  Tanggal :
            `);
      newWin.document.write(divToPrintf.outerHTML);
      newWin.document.writeln(`
                </p>
                </td>
              </tr>
           </tbody>
         </table>
      </body>
    </html>`);

      newWin.print();

      return true;
      // end start print
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/shipping.scss";
</style>
