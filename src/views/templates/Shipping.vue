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

            <div class="mt-3">
              <label class="text-label" for="fname">Alamat</label>
              <input
                type="text"
                v-model="receiver.address"
                placeholder="Blitar, Jawa Timur - Indonesia"
                id="fname"
                name="fname"
                validation="required"
              />
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
            <div class="mt-3">
              <label class="text-label" for="fname">Alamat</label>
              <input
                type="text"
                v-model="sender.address"
                placeholder="Malang, Jawa Timur - Indonesia"
                id="fname"
                name="fname"
              />
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

            <div class="mt-3">
              <img style="display: none" id="itf" />
            </div>
          </div>
        </v-flex>

        <v-flex xs12 sm6>
          <div class="mt-3" ref="content">
            <label class="text-label" for="fname">No. resi</label>
            <input type="text" v-model="barcodes" id="resi" name="fname" />

            <div class="mt-3">
              <label class="text-label" for="fname">Berat Paket</label>
              <input
                type="number"
                class="kilograms"
                v-model="heavy"
                placeholder="Kg"
                id="fname"
                name="fname"
                validation="required"
              />
            </div>
          </div>
        </v-flex>
      </v-layout>

      <div class="text-xs-right">
        <v-btn
          @click="download"
          class="button-ship"
          depressed
          large
          :disabled="!isFormValid"
          >Generate</v-btn
        >
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { jsPDF } from "jspdf";
// eslint-disable-next-line import/extensions
import "../../plugins/Roboto-Black-normal.js";
// eslint-disable-next-line import/extensions
import "../../plugins/Roboto-Bold-normal.js";
// eslint-disable-next-line import/extensions
import "../../plugins/Roboto-Regular-normal.js";

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

      const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: [105, 148],
      });
      const JsBarcode = require("jsbarcode");
      const img = document.querySelector("img#itf");

      JsBarcode("#itf", this.barcodes, {
        format: "CODE128",
        width: "2",
        height: "50",
      });

      doc.addFont("Roboto-Black-normal.ttf", "Roboto-Black", "normal");
      doc.addFont("Roboto-Bold-normal.ttf", "Roboto-Bold", "normal");
      doc.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");

      doc.addImage(img.src, "JPEG", 67, 5, 73, 24);

      doc.setFont("Roboto-Black", "normal");
      doc.setFontSize(32);
      doc.setTextColor(100);
      doc.text(10, 20, "Inskuship");

      doc.setFontSize(9);
      doc.setTextColor(0);
      doc.setFont("Roboto-Bold", "normal");
      doc.text("Penerima :", 10, 40);
      doc.setFont("Roboto-Regular", "normal");
      doc.text(this.receiver.name, 10, 47);
      doc.text(this.receiver.address, 10, 54);

      doc.setFillColor(100);
      doc.rect(10, 61, 127, 0.2, "F");

      doc.setTextColor(0);
      doc.setFont("Roboto-Bold", "normal");
      doc.text("Pengirim :", 10, 70);
      doc.setFont("Roboto-Regular", "normal");
      doc.text(this.sender.name, 10, 77);
      doc.text(this.sender.address, 10, 84);

      doc.setFillColor(100);
      doc.rect(10, 91, 127, 0.2, "F");

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text(`Tanggal : ${this.date}`, 10, 100);
      doc.text(`${this.heavy} kg`, 138, 100, "right");

      doc.autoPrint({ variant: "non-confirm" });
      doc.save("shipping-form.pdf");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/shipping.scss";
</style>
