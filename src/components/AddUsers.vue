<template>
  <v-container fluid>
    <v-row class="success-add" v-if="isValid">
        <v-col cols="4">
          <v-alert type="success">user add successfully</v-alert>
        </v-col>
      </v-row>
    <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User name</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
              v-model="userName"
              :counter="10"
              label="Name"
              :rule="[(v) => !!v || 'Name is required']"
            ></v-text-field>
          </v-col>
        </v-row>
    
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User email</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
              v-model="userEmail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>User phone number</v-list-subheader>
          </v-col>
    
          <v-col cols="8">
            <v-text-field
              label="Phone number"
              type="phone"
              :rules="phoneRules"
              v-model="userPhone"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="btn-direction">
          <v-btn color="success" class="mr-4" @click="validateAddUser"> Add user </v-btn>
        </v-row>
    </v-form>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { userStore } from "../store/stores/users";
import { mapActions } from "pinia";
export default defineComponent({
  emits:['dialog'],
  data() {
    return {
      userName: "" as string,
      userEmail: "" as string,
      emailRules: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      userPhone: "" as string,
      phoneRules: [
        (v: string) => !!v || "phone number is required",
        (v: string) => /^[0-9]*$/.test(v) || "phone number must be valid",
        (v: string) =>
          v.length >= 10 || "phone number must be 10 character or more ",
      ],
      isValid: false as boolean,
    };
  },
  methods: {
    ...mapActions(userStore, ["addUser"]),
    async validateAddUser() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        return;
      }
      this.isValid = true;

      this.addUser(this.userName, this.userEmail, this.userPhone);
      this.userName = " "
        this.userEmail = " "
        this.userPhone = " "
        this.phoneRules = []
      // this.$router.push(`/users`)
      this.$emit('dialog',false)
    },
  },
});
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
