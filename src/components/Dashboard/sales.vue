<template>
    <div>
        <v-row class="m-4">
            <v-col
            cols="12"
            sm="3">
                <h4 style="color: #969DAE;">PENJUALAN</h4>
            </v-col>
            <hr />
        </v-row>

    <v-row class="m-4">
        <v-col
        cols="12"
        sm="3">
            <v-card
            class="mx-auto"
            outlined
            max-width="344"
            >
            <v-card-text>
                <h4>Penjualan Kotor</h4>
                <div class="text-h4" style="color: #000000;">
                Rp 0
                </div>
            </v-card-text>
            </v-card>
        </v-col>

        <v-col
        cols="12"
        sm="3">
            <v-card
            class="mx-auto"
            outlined
            max-width="344"
            >
            <v-card-text>
                <h4>Penjualan Bersih</h4>
                <div class="text-h4" style="color: #000000;">
                Rp 0
                </div>
            </v-card-text>
            </v-card>
        </v-col>

        <v-col
        cols="12"
        sm="3">        
            <v-card
            class="mx-auto"
            outlined
            max-width="344"
            >
            <v-card-text>
                <h4>Laba Kotor</h4>
                <div class="text-h4" style="color: #000000;">
                Rp 100.000.000
                </div>
            </v-card-text>
            </v-card>        
        </v-col>

        <v-col
        cols="12"
        sm="3">        
            <v-card
            class="mx-auto"
            outlined
            max-width="344"
            >
            <v-card-text>
                <h4>Transaksi</h4>
                <div class="text-h4" style="color: #000000;">
                0
                </div>
            </v-card-text>
            </v-card>        
        </v-col>        
    </v-row>
    <v-row class="m-4">
        <v-card
            class="mx-auto text-center"
            max-width="100%"
        >
            <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                :value="value"
                color="#04428D"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
                >
                <template v-slot:label="item">
                    ${{ item.value }}
                </template>
                </v-sparkline>
            </v-sheet>
            </v-card-text>

            <v-card-text>
            <div class="text-h4 font-weight-thin">
                Sales Last 24h
            </div>
            </v-card-text>
        </v-card>        
    </v-row>
    </div>
</template>

<script>



export default {
name: 'Sales',
data(){
    return{
        value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }
},
computed:{

},
methods:{
    
},
    watch: {

    },  

};
</script>

<style scoped>
</style>
  