<template>
    <v-container>
      <v-row class="success-add" v-if="isValid">
        <v-col cols="4">
          <v-alert type="success">saved address successfully</v-alert>
        </v-col>
      </v-row>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User address</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
              :model-value="userAddress?userAddress:getUserAddress[index]?.address"
              class="show-user-input"
              v-model="userAddress"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User city</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
              :model-value="userCity? userCity:getUserAddress[index]?.city"
              v-model="userCity"
              class="show-user-input"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User country</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
            :model-value="userCountry?userCountry:getUserAddress[index]?.country"
            v-model="userCountry"
            class="show-user-input"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-list-subheader>User state</v-list-subheader>
            </v-col>
      
            <v-col cols="8">
              <v-text-field
              :model-value="userState?userState:getUserAddress[index]?.state"
              v-model="userState"
              class="show-user-input"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
                <v-list-subheader>User zip code</v-list-subheader>
            </v-col>
      
            <v-col cols="8">
              <v-text-field
              :model-value="userZipCode?userZipCode:getUserAddress[index]?.zipCode"
              v-model="userZipCode"
              class="show-user-input"
              ></v-text-field>
            </v-col>
          </v-row>
        <v-row class="btn-direction">
          <v-btn color="success" class="mr-4" @click="saveUser"> Save </v-btn>
        </v-row>
    </v-form>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { mapState , mapActions } from "pinia";
  import { userStore } from "../store/stores/users";
  export default defineComponent({
    data() {
     const index = this.$route.params.index as string
      return{
        index,
        userAddress: "" as string,
        userCity: "" as string,
        userCountry: "" as string,
        userState: "" as string,
        userZipCode: "" as string,
        isValid  : false as boolean,
      }  
    },
    methods:{
      ...mapActions(userStore, ["editSpecificUserAddress"]),
      saveUser(){
        this.isValid = true
        this.editSpecificUserAddress(
          this.userAddress ? this.userAddress :this.getUserAddress[this.index]?.address, 
          this.userCity ? this.userCity :this.getUserAddress[this.index]?.city, 
         this.userCountry ? this.userCountry :this.getUserAddress[this.index]?.country,
         this.userState ? this.userState :this.getUserAddress[this.index]?.state,
         this.userZipCode ? this.userZipCode :this.getUserAddress[this.index]?.zipCode,
        )
        setTimeout(() => {
            this.isValid = false;
          }, 3000);
          this.$router.push(`/users/show/${this.index}`)
      }
    },
    computed: {
    ...mapState(userStore, ["getUserAddress","getAddressIndex","getUserIndex"]),
  },
  created(){
    this.userAddress = this.userAddress ? this.userAddress : this.getUserAddress[this.index]?.address
    this.userCity = this.userCity ? this.userCity : this.getUserAddress[this.index]?.city
    this.userCountry = this.userCountry ? this.userCountry : this.getUserAddress[this.index]?.country
    this.userState = this.userState ? this.userState : this.getUserAddress[this.index]?.state
    this.userZipCode = this.userZipCode ? this.userZipCode : this.getUserAddress[this.index]?.zipCode
  }
  })
  </script>
  <style scoped>
  .btn-direction {
    flex-direction: row-reverse;
    margin-top: 5rem;
  }
  .success-add {
    justify-content: flex-end;
    margin: auto;
    margin-bottom: 3rem;
  }
  </style>