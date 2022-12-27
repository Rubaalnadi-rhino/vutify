<template>
  <v-container>
    <v-row class="success-add" v-if="isValid">
      <v-col cols="4">
        <v-alert type="success">add address successfully</v-alert>
      </v-col>
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User name</v-list-subheader>
        </v-col>
  
        <v-col cols="8">
          <v-text-field
            :model-value="userName?userName:getUsers[index]?.userName"
            class="show-user-input"
            v-model="userName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User email</v-list-subheader>
        </v-col>
  
        <v-col cols="8">
          <v-text-field
            :model-value="userEmail? userEmail:getUsers[index]?.userEmail"
            v-model="userEmail"
            class="show-user-input"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User phone number</v-list-subheader>
        </v-col>
  
        <v-col cols="8">
          <v-text-field
          :model-value="userPhone?userPhone:getUsers[index]?.userPhone"
          v-model="userPhone"
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
      userName : "" as string,
      userEmail : "" as string,
      userPhone : "" as string,
      isValid  : false as boolean,
      
    }  
  },
  methods:{
    ...mapActions(userStore, ["editSpecificUser","setDialog"]),
    saveUser(){
      this.editSpecificUser(
        this.userName ? this.userName :this.getUsers[this.index]?.userName, 
        this.userEmail ? this.userEmail :this.getUsers[this.index]?.userEmail, 
       this.userPhone ? this.userPhone :this.getUsers[this.index]?.userPhone,
        this.index
      )
      setTimeout(() => {
          this.isValid = false;
        }, 3000);
        this.$router.push(`/users`)
    }
  },
  computed: {
  ...mapState(userStore, ["getUsers","getIsDialog"]),
},
created(){
  this.userName = this.userName ? this.userName : this.getUsers[this.index]?.userName
  this.userEmail = this.userEmail ? this.userEmail : this.getUsers[this.index]?.userEmail
  this.userPhone = this.userPhone ? this.userPhone : this.getUsers[this.index]?.userPhone
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