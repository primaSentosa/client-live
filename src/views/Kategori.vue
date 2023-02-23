<template>
    <div class="overflow-auto"> 
          <v-card max-width="auto" tile flat class="my-5">
            <v-toolbar flat height="60px" >
            <v-spacer></v-spacer>
              <h2>Kategori</h2>
              <v-spacer></v-spacer>                                 
            </v-toolbar>
          </v-card>   

          <!-- <v-row class="m-4">
              <v-col
              cols="12"
              sm="5"
              >     
                <v-text-field
                    solo
                    label="Search"
                    append-icon="mdi-magnify"
                    v-on:keyup.enter="search(1)"
                    class="mr-4 ml-4"
                    clearable
                    v-model="src"        
                ></v-text-field>              
              </v-col>        
          </v-row>       -->
          
          <!-- tabel -->

          <!-- kategori -->
          <v-row class="m-4">
            <v-col
            col="12"
            sm="4">
              <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm('Kategori')"
                style="margin-bottom: 10px;"
                >
                Buat Kategori
              </v-btn>  
              <v-simple-table
                fixed-header
                height="400px"
            >
                <template v-slot:default >
                <thead>
                    <tr>                                      
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Nama Kategori</h5>
                    </th>       
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Action</h5>
                    </th>                                                          
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in getKategori"
                    :key="item._id"
                    >
                    <td>{{ item.nama }}</td>
                    <td>
                      <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openFormEdit('Kategori',item._id,item.nama)"
                      >
                      EDIT
                      </v-btn>  
                      <v-btn
                      style="margin-left: 10px;"
                      rounded
                      color="#a30606"
                      small
                      dark
                      @click.prevent="deleteItem('Kategori',item._id)"
                      >
                      DELETE
                      </v-btn>                        
                    </td>
                    </tr>
                </tbody>
                </template>
              </v-simple-table>   
              <!-- loading -->
              <v-container style="position: absolute;top: 200px;" v-if="getLoadingKat">            
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >                 
                      <v-progress-circular
                        indeterminate
                        color="black"
                      ></v-progress-circular>                    
                </v-row>
              </v-container> 	
              <!-- loading -->            
            </v-col> 
            <!-- kategori -->

            <!-- merk kaca -->
            <v-col
            col="12"
            sm="4">
              <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm('Merk Kaca')"
                style="margin-bottom: 10px;"
                >
                + Merk Kaca
              </v-btn>  
              <v-simple-table
                fixed-header
                height="400px"
            >
                <template v-slot:default >
                <thead>
                    <tr>                                      
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Merk Kaca</h5>
                    </th>       
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Action</h5>
                    </th>                                                          
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in getMerkKaca"
                    :key="item._id"
                    >
                    <td>{{ item.nama }}</td>
                    <td>
                      <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openFormEdit('Merk Kaca',item._id,item.nama)"
                      >
                      EDIT
                      </v-btn>  
                      <v-btn
                      style="margin-left: 10px;"
                      rounded
                      color="#a30606"
                      small
                      dark
                      @click.prevent="deleteItem('Merk Kaca',item._id)"
                      >
                      DELETE
                      </v-btn>                        
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>   
              <!-- loading -->
              <v-container style="position: absolute;top: 200px;" v-if="getLoadingKaca">            
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >                 
                      <v-progress-circular
                        indeterminate
                        color="black"
                      ></v-progress-circular>                    
                </v-row>
              </v-container> 	
              <!-- loading -->                    
            </v-col>        
            <!-- merk kaca -->
            
            <!-- Merk Mobil -->
            <v-col
            col="12"
            sm="4">
              <v-btn
                rounded
                color="#04428D"
                small
                dark
                @click.prevent="openForm('Merk Mobil')"
                style="margin-bottom: 10px;"
                >
                + Merk Mobil
              </v-btn>  
              <v-simple-table
                fixed-header
                height="400px"
              >
                <template v-slot:default >
                <thead>
                    <tr>                                      
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Merk Mobil</h5>
                    </th>       
                    <th class="text-left" style="color:#000000;background-color: #d4d4d4;">
                        <h5>Action</h5>
                    </th>                                                          
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="item in getMerkMobil"
                    :key="item._id"
                    >
                    <td>{{ item.nama }}</td>
                    <td>
                      <v-btn
                      rounded                      
                      small
                      dark
                      @click.prevent="openFormEdit('Merk Mobil',item._id,item.nama)"
                      >
                      EDIT
                      </v-btn>  
                      <v-btn
                      style="margin-left: 10px;"
                      rounded
                      color="#a30606"
                      small
                      dark
                      @click.prevent="deleteItem('Merk Mobil',item._id)"
                      >
                      DELETE
                      </v-btn>                        
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>   
              <!-- loading -->
              <v-container style="position: absolute;top: 200px;" v-if="getLoadingMobil">            
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >                 
                      <v-progress-circular
                        indeterminate
                        color="black"
                      ></v-progress-circular>                    
                </v-row>
              </v-container> 	
              <!-- loading -->                    
            </v-col>        
            <!-- Merk Mobil -->            
            
          </v-row>
           
          <!-- tabel -->


          <!-- form + kategori -->
          <v-dialog
            v-model="dialog"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Tambah {{tempKat}}
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="tambahItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>                        
                </v-container>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                >
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="tambahItem()"
                >
                    Tambah
                </v-btn>
                </v-card-actions>
            </v-card>
            </b-overlay>
          </v-dialog>                 
          <!-- form + kategori -->       
          
          <!-- form edit -->
          <v-dialog
            v-model="dialog2"
            width="1000"      
            >      
            <b-overlay :show="loading2" rounded="sm">
            <v-card >
                <v-card-title class="text-h5 grey lighten-2 mb-4">
                Form Edit
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="10">
                            <v-text-field
                                v-model="nama"
                                label="Nama Barang"    
                                outlined                        
                                clearable
                                v-on:keyup.alt="editItem()"
                            ></v-text-field>      
                        </v-col>
                    </v-row>                        
                </v-container>

                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog2 = false"
                >
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="editItem()"
                >
                    Edit
                </v-btn>
                </v-card-actions>
            </v-card>
            </b-overlay>
          </v-dialog>                 
          <!-- form edit -->              
    </div>
  
  </template>
  
  <script>
    import { mapActions, mapGetters } from 'vuex'
      import Swal from 'sweetalert2'
      import axios from 'axios'

  
    export default {
      data() {
        return {

            // search
            src:'',

            // form tambah kategori
            dialog: false,
            loading2: false,
            tempKat : "",
            nama : "",

            // edit
            dialog2: false,
            tempId: ""
        }
      },
      components:{
       
      },
      computed:{  
        ...mapGetters({
                getKategori: 'kategori/getKategori',
                getLoadingKat: 'kategori/getLoadingKat',
                getMerkMobil: 'kategori/getMerkMobil',
                getLoadingMobil: 'kategori/getLoadingMobil',                
                getMerkKaca: 'kategori/getMerkKaca',
                getLoadingKaca: 'kategori/getLoadingKaca',

            }),           
          getRole(){
            return this.$store.state.userRole
          }           
      },    
      methods:{     
                ...mapActions({
                                fetchKetegori: 'kategori/fetchKategori',
                                fetchMerkMobil: 'kategori/fetchMerkMobil',
                                fetchMerkKaca: 'kategori/fetchMerkKaca'
                            }),          
                openForm(kat){
                  this.tempKat = kat
                  this.dialog = true
                },
                tambahItem(){

                  this.loading2 = true
                  let tempUrl = ''
                  switch(this.tempKat){
                    case 'Kategori':
                      tempUrl = `${this.$store.state.url}/kategori`
                      break;
                    case 'Merk Kaca':
                      tempUrl = `${this.$store.state.url}/kategori/kaca`
                      break;
                    case 'Merk Mobil':
                      tempUrl = `${this.$store.state.url}/kategori/mobil`
                      break;
                    }

                    axios({
                          url: tempUrl,
                          method: 'post',
                          headers:{
                              token : localStorage.getItem('token')
                          },
                          data:{
                            nama: this.nama
                          }
                      })
                      .then(({data}) =>{

                          this.nama = ""        
                          switch(this.tempKat){
                            case 'Kategori':
                              this.fetchKetegori()
                              break;
                            case 'Merk Kaca':
                              this.fetchMerkKaca()
                              break;
                            case 'Merk Mobil':
                              this.fetchMerkMobil()
                              break;
                            }          
                          this.loading2 = false       
                      })
                      .catch(err=>{
                              this.loading2 = false
                              console.log(err.response)
                              Swal.fire({
                              icon: 'error',
                              title: 'isi data dengan lengkap !',
                              text: err.errors,
                              })         
                              
                      })    

                  }, 
                openFormEdit(kat,id,tempNama){
                  console.log(kat,id,tempNama)
                  this.tempId = id
                  this.nama = tempNama
                  this.tempKat = kat
                  this.dialog2 = true
                },
                editItem(){
                  this.loading2 = true
                  let tempUrl = ''
                  switch(this.tempKat){
                          case 'Kategori':
                            tempUrl = `${this.$store.state.url}/kategori/${this.tempId}`
                            break;
                          case 'Merk Kaca':
                            tempUrl = `${this.$store.state.url}/kategori/kaca/${this.tempId}`
                            break;
                          case 'Merk Mobil':
                            tempUrl = `${this.$store.state.url}/kategori/mobil/${this.tempId}`
                            break;
                          }    

                    axios({
                          url: tempUrl,
                          method: 'put',
                          headers:{
                              token : localStorage.getItem('token')
                          },
                          data:{
                            nama: this.nama
                          }
                      })
                      .then(({data}) =>{

                          this.nama = ""        
                          switch(this.tempKat){
                            case 'Kategori':
                              this.fetchKetegori()
                              break;
                            case 'Merk Kaca':
                              this.fetchMerkKaca()
                              break;
                            case 'Merk Mobil':
                              this.fetchMerkMobil()
                              break;
                            }          
                          this.loading2 = false      
                          this.dialog2 = false 
                      })
                      .catch(err=>{
                              this.loading2 = false
                              console.log(err.response)
                              Swal.fire({
                              icon: 'error',
                              title: 'isi data dengan lengkap !',
                              text: err.errors,
                              })         
                              
                      })                   
                },                              
                deleteItem(kat,id){
                  Swal.fire({
                      title: 'Apakah anda yakin akan menghapus?',
                      showDenyButton: true,
                      confirmButtonText: `Batal`,
                      denyButtonText: `Ya,Hapus`,
                      }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                              
                      } else if (result.isDenied) {
                        let tempUrl = ''
                        switch(kat){
                          case 'Kategori':
                            tempUrl = `${this.$store.state.url}/kategori/${id}`
                            break;
                          case 'Merk Kaca':
                            tempUrl = `${this.$store.state.url}/kategori/kaca/${id}`
                            break;
                          case 'Merk Mobil':
                            tempUrl = `${this.$store.state.url}/kategori/mobil/${id}`
                            break;
                          }                        
                          axios({
                          url: tempUrl,
                          method: 'delete',
                          headers:{
                              token : localStorage.getItem('token')
                          }
                          })
                          .then((respone) =>{            
                            switch(kat){
                            case 'Kategori':
                              this.fetchKetegori()
                              break;
                            case 'Merk Kaca':
                              this.fetchMerkKaca()
                              break;
                            case 'Merk Mobil':
                              this.fetchMerkMobil()
                              break;
                            }                      
                              Swal.fire('deleted!', '', 'success')
                          })                   
                      }
                  })            
            }                                        
      },
      watch:{
                        
      },
      created(){
        this.fetchKetegori()
        this.fetchMerkMobil()
        this.fetchMerkKaca()
      }
    }
  </script>