<template>
  <v-responsive>
    <v-container fluid class="add-product-container">
      <v-row class="success-add" v-if="isValid">
        <v-col cols="4">
          <v-alert type="success">Product add successfully</v-alert>
        </v-col>
      </v-row>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>{{$t('addImage')}}</v-list-subheader>
          </v-col>

          <v-col cols="8">
            <v-file-input
            @change="onFileInput($event)" 
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              v-model="rules"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-list-subheader>{{$t('addProduct')}}</v-list-subheader>
          </v-col>

          <v-col cols="8">
            <v-text-field
              v-model="productName"
              :counter="10"
              :rules="productNameRules"
              label="product Name"
              :rule="[(v) => !!v || 'Name is required']"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-list-subheader>Add product price</v-list-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="priceValue"
              hide-details
              type="number"
              min="0"
              
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-list-subheader>Add product category</v-list-subheader>
          </v-col>
          <v-select
            v-model="select"
            :items="category"
            :rules="[(v) => !!v || 'Item is required']"
            label="category"
          ></v-select>
        </v-row>
        <v-row class="btn-direction">
          <v-btn color="success" class="mr-4" @click="validate">
            Add
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-responsive>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { AddProduct } from "../interfaces/products.interface";
import { productStore } from "../store/stores/products/index";
import { mapActions } from "pinia";
import { getAuth , onAuthStateChanged} from "@firebase/auth";
import { userStore } from "@/store/stores/users";
import { mapStores } from "pinia";
export default defineComponent({
  emits:['dialog'],
  data() {
    return {
      // let imgFile= null as any;
      isValid: false as boolean,
      rules: [
        (value: AddProduct[]) => {
          let  imgFile = value[0].name;
          return (
            !value ||
            !value.length ||
            value[0].size > 2000000 ?
            "Avatar size should be less than 2 MB!" : imgFile
          );
        },

      ],
      fileImage : null as any , 
      productNameRules: [
        (v: string) => !!v || "Name is required",
        (v: string) =>
          (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      productName: "" as string,
      select: null as string | any,
      category: ["clothes", "food", "home"] as string[],
      priceValue: 0 as number,
    };
  },
  methods: {
    ...mapActions(productStore, ["addProduct"]),

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {  
      return;
      }
        console.log(this.rules[0].name,"valueeeee");
        
        this.isValid = true
        
        this.addProduct(
          this.fileImage,
         this.productName,
          this.priceValue,
           this.select

        );
        this.priceValue = 0
        this.select = null
        this.productName = " "
        this.rules = []
        setTimeout(() => {
          this.isValid = false;
          this.$emit('dialog',false)
        }, 3000);
      
    },
    onFileInput(event : any) {    
      console.log(event,"event");
      	   
      const data = URL.createObjectURL(event.target.files[0]);
      console.log(data , "data");
      
      this.fileImage= data;

    },
  },
  mounted(){
    onAuthStateChanged(getAuth(),(user) => {
         if(user){
          userStore().setIsLoggedIn(true)
         }else{
          userStore().setIsLoggedIn(false)
         }
    })
  },
  computed:{
    ...mapStores(userStore,)
  }
});
</script>
<style scoped>
.add-product-container {
  margin-top: 10rem;
  padding: 3rem;
}
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
