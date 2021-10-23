<template>
  <v-app class="printing">
    <div>
      <!-- Start kode invoice -->
      <v-container>
        <h1>Invoice</h1>
        <v-form>
          <div class="code-invoice">
            <v-flex>
              <label for="">Kode Invoice</label>
              <input
                type="text"
                v-model="pricep.code"
                placeholder="# 00001"
                id="fname"
                name="fname"
              />
              <span id="phone-output" ref="printTable1">{{ pricep.code }}</span>
            </v-flex>
          </div>
        </v-form>
      </v-container>
      <!-- End kode invoice -->

      <!-- Start nama pengirim nama penerima dan alamat penerima -->
      <v-form class="mt-5">
        <v-container class="view-sku">
          <v-layout row wrap>
            <v-flex xs12 sm12 class="print-container">
              <div ref="content">
                <label class="text-label" for="fname">Nama Pengirim</label>
                <input
                  type="text"
                  placeholder="Cth : John "
                  id="fname-pgrm"
                  name="fname"
                  validation="required"
                  v-model="pricep.namePengirim"
                />
                <span id="phone-output" ref="printTable2">{{
                  pricep.namePengirim
                }}</span>

                <div class="mt-3">
                  <label class="text-label" for="fname">Nama Penerima</label>
                  <input
                    type="text"
                    placeholder="Cth : Rey "
                    id="fname"
                    name="fname"
                    validation="required"
                    v-model="pricep.namePenerima"
                  />
                  <span id="phone-output" ref="printTable3">{{
                    pricep.namePenerima
                  }}</span>
                </div>
              </div>
            </v-flex>

            <v-flex xs12 sm12>
              <div ref="content">
                <label class="text-label" for="fname">Alamat Penerima</label>
                <input
                  placeholder="Blitar, Jawa Timur - Indonesia"
                  type="text"
                  id="fname"
                  name="fname"
                  v-model="pricep.address"
                />
                <span id="phone-output" ref="printTable4">{{
                  pricep.address
                }}</span>
              </div>
            </v-flex>
          </v-layout>
          <!-- End nama pengirim nama penerima dan alamat penerima -->

          <!-- Start Tanggal bayar and batas waktu -->
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <div ref="content">
                <label class="text-label" for="start">Tanggal Bayar</label>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  min="1200-01-01"
                  max="2090-12-31"
                  v-model="pricep.tanggalBayar"
                />
                <span id="phone-output" ref="printTable5">{{
                  pricep.tanggalBayar
                }}</span>
              </div>
            </v-flex>

            <v-flex xs12 sm6>
              <div ref="content">
                <label class="text-label" for="start">Batas Waktu</label>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  min="1200-01-01"
                  max="2090-12-31"
                  v-model="pricep.batasWaktu"
                />
                <span id="phone-output" ref="printTable6">{{
                  pricep.batasWaktu
                }}</span>
              </div>
            </v-flex>
          </v-layout>
          <!-- end Tanggal bayar and batas waktu -->

          <div class="limiter">
            <div class="tables">
              <!-- Start Tabel harga utama front -->
              <table>
                <thead>
                  <tr class="table-head">
                    <th>Barang</th>
                    <th class="column4">Harga</th>
                    <th class="column5">Kuantitas</th>
                    <th class="column6">Jumlah</th>
                    <th class="hidden">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in invoice" :key="index">
                    <td>
                      <input
                        v-model="item.description"
                        type="text"
                        :disabled="!isFormValid"
                        class="form-control in-out"
                        id="fname"
                        size="60"
                      />
                      <span id="phone-output">{{ item.description }}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control in-out"
                        id="fname"
                        :disabled="!isFormValid"
                        v-model="item.quantity"
                        size="10"
                        min="0"
                      />
                      <span id="phone-output">{{ item.quantity }}</span>
                    </td>
                    <td>
                      <input
                        :disabled="!isFormValid"
                        type="text"
                        class="form-control in-out"
                        id="fname"
                        v-model="item.price"
                        size="10"
                        min="0"
                      />
                      <span id="phone-output">{{ item.price }}</span>
                    </td>
                    <td>{{ "Rp " + item.quantity * item.price }}</td>
                    <td @click="deleted(index)">
                      <i class="fas fa-trash"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Tabel harga utama front -->
              <div class="mt-4">
                <v-btn
                  @click="addItem"
                  class="btn-invoice white--text btn-item pa-4"
                >
                  <v-icon dark class="mr-1">add</v-icon> Tambahkan Item
                </v-btn>
              </div>
              <!-- Start Tabel harga print and display none -->
              <table
                style="width: 100%; border-collapse: collapse"
                id="table-output"
                ref="printTable7"
              >
                <thead>
                  <tr
                    class="table-head"
                    style="text-align: center; border-bottom: 1px solid #ddd"
                  >
                    <th style="width: 40%; text-align: left">Barang</th>
                    <th style="width: 20%; text-align: left" class="column4">
                      Harga
                    </th>
                    <th style="width: 20%; text-align: left" class="column5">
                      Kuantitas
                    </th>
                    <th style="width: 20%; text-align: left" class="column6">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style="text-align: left; border-bottom: 1px solid #ddd"
                    v-for="(item, index) in invoice"
                    :key="index"
                  >
                    <td style="width: 40%">
                      <span>{{ item.description }}</span>
                    </td>
                    <td style="width: 20%">
                      <span>{{ item.quantity }}</span>
                    </td>
                    <td style="width: 20%">
                      <span>{{ item.price }}</span>
                    </td>
                    <td style="width: 20%">
                      {{ "Rp " + item.quantity * item.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Tabel harga print and display none -->
            </div>
          </div>
        </v-container>
      </v-form>

      <v-form class="invoice-bottom">
        <v-container>
          <v-layout row wrap>
            <!-- Start catatan -->
            <v-flex xs12 sm6>
              <div class="mt-3">
                <label class="text-label" for="fname">Catatan</label>
                <textarea
                  ref="input"
                  :style="inputStyle"
                  class="mt-2 text-area"
                  outline
                  v-model="pricep.notes"
                  name="input-7-4"
                ></textarea>
                <span id="phone-output" ref="printTable8">{{
                  pricep.notes
                }}</span>
              </div>
            </v-flex>
            <!-- Start catatan -->

            <!-- start total, subtotal, pajak, diskon -->
            <v-flex xs12 sm6 class="totals">
              <div class="mt-3">
                <label class="text-label" for="fname">Subtotal (Rp)</label>
                <v-card class="mt-3 elevation-0 label-total">
                  <p class="text-total">{{ subTotal }}</p>
                </v-card>
                <span id="phone-output" ref="printTable9">{{ subTotal }}</span>
                <div class="mt-3">
                  <label class="text-label" for="fname">Diskon (%)</label>
                  <input
                    type="number"
                    id="fname"
                    step="0.01"
                    name="fname"
                    v-model="pricep.discountRate"
                  />
                  <span id="phone-output" ref="printTable10">{{
                    pricep.discountRate
                  }}</span>
                </div>

                <div class="mt-3">
                  <label class="text-label" for="fname">Pajak (%)</label>
                  <input
                    type="number"
                    id="fname"
                    step="0.01"
                    name="fname"
                    v-model="pricep.taxRate"
                  />
                  <span id="phone-output" ref="printTable11">{{
                    pricep.taxRate
                  }}</span>
                </div>

                <div class="mt-3">
                  <label class="text-label" for="fname"
                    >Ongkos Kirim (Rp)</label
                  >
                  <input
                    type="number"
                    id="fname"
                    name="fname"
                    v-model="pricep.shipRate"
                  />
                  <span id="phone-output" ref="printTable12">{{
                    pricep.shipRate
                  }}</span>
                </div>

                <div class="mt-3">
                  <label class="text-label" for="fname">Total (Rp)</label>
                  <v-card class="elevation-0 label-total">
                    <p class="text-total">{{ grandTotal }}</p>
                  </v-card>
                  <span id="phone-output" ref="printTable13">{{
                    grandTotal
                  }}</span>
                </div>
              </div>
              <!-- end total, subtotal, pajak, diskon -->
              <div class="text-xs-right">
                <v-btn
                  @click="print"
                  :disabled="!isFormValid"
                  large
                  class="btn-invoice"
                  >Generate</v-btn
                >
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      invoice: [{ description: "", quantity: 0, price: 0 }],
      pricep: {
        code: "",
        description: "",
        namePenerima: "",
        namePengirim: "",
        address: "",
        tanggalBayar: "",
        batasWaktu: "",
        notes: "",
        taxRate: 0.0,
        discountRate: 0.0,
        shipRate: 0,
      },
      inputHeight: "0",
    };
  },
  watch: {
    currentValue() {
      this.adjustTextAreaHeight();
      this.$emit("input", this.pricep.notes);
    },
  },
  mounted() {
    if (localStorage.getItem("invoice")) {
      this.invoices = JSON.parse(localStorage.getItem("invoice"));
    }

    if (localStorage.getItem("pricep")) {
      this.data = JSON.parse(localStorage.getItem("pricep"));
    }

    this.adjustTextAreaHeight();
  },
  computed: {
    inputStyle() {
      return {
        "min-height": this.inputHeight,
      };
    },
    isFormValid() {
      return (
        this.pricep.namePenerima &&
        this.pricep.namePengirim &&
        this.pricep.code &&
        this.pricep.address &&
        this.pricep.batasWaktu &&
        this.pricep.tanggalBayar
      );
    },
    subTotal() {
      const total = this.invoice.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return total;
    },
    discountTotal() {
      const total = this.subTotal * (this.pricep.discountRate / 100);
      return total;
    },
    taxTotal() {
      const total =
        (this.subTotal - this.discountTotal) * (this.pricep.taxRate / 100);
      return total;
    },
    shipTotal() {
      const total =
        this.subTotal -
        this.discountTotal +
        this.taxTotal +
        this.pricep.shipRate * 2;
      return total;
    },
    grandTotal() {
      const totals = Math.ceil(
        (this.subTotal - this.discountTotal + this.taxTotal + this.shipTotal) /
          2
      );
      return totals;
    },
  },
  methods: {
    adjustTextAreaHeight() {
      this.inputHeight = `${this.$refs.input.scrollHeight}px`;
    },
    addItem() {
      this.invoice.push({ description: "", quantity: 0, price: 0 });
    },
    deleted(index) {
      this.invoice.splice(index, 1);
    },
    print() {
      // start print label
      localStorage.setItem("pricep", JSON.stringify(this.pricep));
      localStorage.setItem("invoice", JSON.stringify(this.invoice));
      const divToPrinta = this.$refs.printTable1;
      const divToPrintb = this.$refs.printTable2;
      const divToPrintc = this.$refs.printTable3;
      const divToPrintd = this.$refs.printTable4;
      const divToPrinte = this.$refs.printTable5;
      const divToPrintf = this.$refs.printTable6;
      const divToPrintg = this.$refs.printTable7;
      const divToPrinth = this.$refs.printTable8;
      const divToPrinti = this.$refs.printTable9;
      const divToPrintj = this.$refs.printTable10;
      const divToPrintk = this.$refs.printTable11;
      const divToPrintl = this.$refs.printTable12;
      const divToPrintm = this.$refs.printTable13;
      const newWin = window.open(
        ("PrintWindow", "width=750,height=650,top=50,left=50")
      );
      // start
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
            color: #FFFFFF;
              }
          </style>
        </head>

        <body>
          <h1>Inskuship</h1>
          <hr style="border-top: 2px solid #ddd;">

          <table style="width:100%">
            <tr>
              <td style="width:70%"></td>
              <td style="float: right;"><b>Kode Invoice : </b>
      `);
      newWin.document.write(divToPrinta.outerHTML);
      newWin.document.write(`</td>
            </tr>
            <tr>
              <td style="width:70%"></td>
              <td style="float: right;"><b>Tanggal Bayar : </b>`);
      newWin.document.write(divToPrinte.outerHTML);
      newWin.document.write(`</td>
            </tr>
            <tr>
              <td style="width:70%"></td>
              <td style="float: right;"><b>Batas Waktu : </b>`);
      newWin.document.write(divToPrintf.outerHTML);
      newWin.document.write(`</td>
            </tr>
            <tr>
              <td style="width:70%"><b>Pengirim : </b>`);
      newWin.document.write(divToPrintb.outerHTML);
      newWin.document.write(`</td>
              <td></td>
            </tr>
            <tr>
              <td><hr style="border-top: 1px solid #ddd;"></td>
              <td><hr style="border-top: 1px solid #ddd;"></td>
            </tr>
            <tr>
              <td style="width:70%"><b>Penerima : </b><br>`);
      newWin.document.write(divToPrintc.outerHTML);
      newWin.document.write(`<br>`);
      newWin.document.write(divToPrintd.outerHTML);
      newWin.document.write(`</td>
              <td></td>
            </tr>
          </table>
              <br>
              <p></p>`);
      newWin.document.write(divToPrintg.outerHTML);
      newWin.document.writeln(`<p></p>
              <p></p>
          <table style="width:100%">
            <tr>
            <br>
            <hr style="border-top: 1px solid #ddd;">
            <br>
              <td style="width:50%"><b>Catatan : </b>
            <br>`);
      newWin.document.write(divToPrinth.outerHTML);
      newWin.document.write(`
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td style="float: right;"><b>Subtotal : </b>Rp.`);
      newWin.document.write(divToPrinti.outerHTML);
      newWin.document.write(`</td>
            </tr>
            <tr>
              <td style="width:50%"></td>
              <td style="float: right;"><b>Diskon : </b>`);
      newWin.document.write(divToPrintj.outerHTML);
      newWin.document.write(` %</td>
            </tr>
            <tr>
              <td style="width:50%"></td>
              <td style="float: right;"><b>Pajak : </b>`);
      newWin.document.write(divToPrintk.outerHTML);
      newWin.document.write(` %</td>
            </tr>
            <tr>
              <td style="width:50%"></td>
              <td style="float: right;"><b>Ongkos Kirim : </b>Rp.`);
      newWin.document.write(divToPrintl.outerHTML);
      newWin.document.write(`</td>
              </tr>
              <tr>
                <td style="width:50%"></td>
                <td style="float: right;"><b>Total Bayar : </b>Rp.`);
      newWin.document.write(divToPrintm.outerHTML);
      newWin.document.write(`</td></tr></table>
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
@import "../../styles/invoice.scss";
</style>



