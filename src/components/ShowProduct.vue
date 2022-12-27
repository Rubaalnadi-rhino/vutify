<template>
  <div class="add-product">
    <v-row justify="end">
      <v-dialog
        v-model="dialog"
        persistent
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Add Product
          </v-btn>
        </template>
          <v-card>
            <add-product @dialog="changeDialog($event)"/>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
  <div class="cards" v-if="getProduct.length">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            #
          </th>
          <th class="text-left">
            product image
          </th>
          <th class="text-left">
            product Name 
          </th>
          <th class="text-left">
            product price
          </th>
          <th class="text-left">
            product category 
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="(products,index) in getProduct" :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <v-img
            :src="products.imgFile"
            height="12rem"
            cover
            :alt="products.productName"
          ></v-img>
          </td>
          <td>{{ products.productName }}</td>
          <td>{{ products.price }}</td>
          <td>{{ products.category }}</td>
        </tr>
      </tbody>
    </v-table>
    <hr />
    </div>
    <div v-else>
      <v-responsive class="no-products">
        <p>There is no product yet!</p>
      </v-responsive>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState,mapStores } from "pinia";
import { productStore } from "../store/stores/products/index";
import AddProduct from "./AddProduct.vue";
import { getAuth , onAuthStateChanged} from "@firebase/auth";
import { userStore } from "@/store/stores/users";
export default defineComponent({
  data() {
    return {
      show: false as boolean,
      dialog: false as boolean,
    };
  },  
  components:{
    AddProduct
  },
  methods:{
    changeDialog(value:boolean|any){
      console.log(value,"changeDialog");
      
        this.dialog = value
    }
  },
  computed: {
    ...mapState(productStore, ["getProduct"]),
    ...mapStores(userStore,)

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
});
</script>
<style lang="scss" scoped>
.cards{
  margin-top: 3rem;
  tr{
    padding:0.3rem;
    td{
      margin-bottom: 1.25rem;
    }
  }
}
.add-product-container {
  margin-top: 2rem;
  padding: 1rem;
}
.no-products{
  margin-top: 3rem ;
  padding: 5rem;

}
.add-product{
  margin-top: 1.25rem;
    justify-content: flex-end;
    margin-right: 2rem;
}
</style>