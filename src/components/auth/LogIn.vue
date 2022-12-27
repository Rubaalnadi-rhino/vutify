<template>
  <v-responsive>
    <v-sheet class="pa-12 " rounded>
      <v-card class="mx-auto px-6 py-8 login" max-width="344">
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>
  
          <br />
          <p v-if="errMsg">
            {{ errMsg }}
          </p>
          <br />
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            @click="logIn"
          >
            Log In
          </v-btn>
        </v-form>
        <div class="or">
          <p>OR</p>
        </div>
        <div
        class="login-google"
        @click="signInWithGoogle"
        
      >
        <img 
        src="@/assets/svg/search.svg" 
        alt="google"
        width="15"
        height="15"
        />
        Google
      </div>
        <div class="sign" @click="goToSignUp">
          <p>don't have account yet!</p>
        </div>
      </v-card>
    </v-sheet>
  </v-responsive>
</template>
<script lang="ts">
import { getAuth, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "firebase/auth";
export default {
  data: () => ({
    form: false,
    email: "" as string,
    password: "" as string,
    loading: false,
    errMsg: "" as string,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v: string) {
      return !!v || "Field is required";
    },
    goToSignUp() {
      this.$router.push(`/sign-in`);
    },
    logIn() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          console.log(data.user?.accessToken, "data");
          console.log("successfully Log in");
          localStorage.setItem('user token', data.user?.accessToken)
          this.$router.push(`/`);
        })
        .catch((err) => {
          console.log(err, "err");
          switch (err.code) {
            case "auth/invalid-email":
              this.errMsg = "invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "no account with that email found ";
              break;
            case "auth/wrong-password":
              this.errMsg = "incorrect password";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
          }
        });
    },
    signInWithGoogle(){
        const provider = new GoogleAuthProvider
        signInWithPopup(getAuth(),provider)
        .then((result) => {
            console.log(result.user);
            this.$router.push(`/`);
          localStorage.setItem('user token', result.user?.accessToken)

            
        })
        .catch((err) => {

        })
    }
  },
};
</script>
<style lang="scss" scoped>
.sign {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  cursor: pointer;
}
.login{
  margin-top:2.5rem;
  max-width: 28rem;
  padding: 0.3rem;
  border: 1px solid #000;
}
.login{
  &-google{
    border: 1px solid ;
    margin-top: 2rem;
    width: 18.3rem;
    height: 2.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }}
  .or{
    display: flex;
    justify-content: center;
    margin-top: 1.25rem;
  }
</style>
