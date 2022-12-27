<template>
  <v-responsive>
    <v-card class="mx-auto register" max-width="344" title="User Registration">
      <v-container>
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>
    
        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>
    
        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>
    
        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
    
        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>
    
      <v-divider></v-divider>
    
      <v-card-actions>
        <v-spacer></v-spacer>
    
        <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          @click="signIn"
          :disabled="form"
        >
          Sign In
        </v-btn>
      </v-card-actions>
      <div class="sign" @click="goToLogIn">
        <p> already have account </p>
      </div>
    </v-card>

  </v-responsive>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default defineComponent({
  data: () => ({
    first: null,
    last: null,
    email: "" as string,
    password: "" as string,
    terms: false,
    form: false,
    loading: false,
  }),
  methods: {
    goToLogIn() {
      this.$router.push(`/log-in`);
    },
    signIn() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          console.log(data, "data");
          console.log("successfully signIn");
          this.$router.push(`/log-in`);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    signInWithGoogle() {
      console.log("hi");
    },
  },
});
</script>
<style lang="scss" scoped>
.sign {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  cursor: pointer;
}
.register{
  margin-top:2.5rem;
  max-width: 28.7rem;
  padding: 0.3rem;
  border: 1px solid #000;
}

</style>
