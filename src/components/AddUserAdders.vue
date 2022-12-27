<template>
  <v-container fluid>
    <v-row class="success-add" v-if="isValid">
      <v-col cols="4">
        <v-alert type="success">add address successfully</v-alert>
      </v-col>
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User address</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field v-model="userAddress" label="address"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-list-subheader>User city</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field v-model="userCity" label="city"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User country</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field
            label="country"
            type="phone"
            v-model="userCountry"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User state</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field
            label="state"
            type="phone"
            v-model="userState"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-list-subheader>User zip code</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field label="zip code" v-model="userZipCode"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="btn-direction">
        <v-btn color="success" class="mr-4" @click="validateAddUserAdders">
          Add Address
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { userStore } from "../store/stores/users";
import { mapActions } from "pinia";
export default defineComponent({
  data() {
    return {
      userAddress: "" as string,
      userCity: "" as string,
      userCountry: "" as string,
      userState: "" as string,
      isValid: false as boolean,
      userZipCode: "" as string,
      index: this.$route.params.index as string,
    };
  },
  methods: {
    ...mapActions(userStore, ["addUserAdders"]),
    async validateAddUserAdders() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        return;
      }
      this.isValid = true;

      this.addUserAdders(
        this.userAddress,
        this.userCity,
        this.userCountry,
        this.userState,
        this.userZipCode,
        this.index
      );
      this.userAddress = " ";
      this.userCity = " ";
      this.userCountry = " ";
      this.userState = " ",
        this.userZipCode = " ",
        setTimeout(() => {
          this.isValid = false;
        }, 3000);
        this.$router.push(`/users/show/${this.index}`)
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
