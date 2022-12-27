<template>
    <v-container>
      <v-card class="show-customer">
        <div>
          <bold>customer {{+getUserIndex +1}}</bold>
          <p>{{getUsers[getUserIndex].userName}}</p>
          <p>phone: {{getUsers[getUserIndex].userPhone}}</p>
          <p>email: {{getUsers[getUserIndex].userEmail}}</p>
        </div>
        <div  class="icons">
          <v-btn
          color="primary"
          icon="mdi-pencil"
          size="small"
          @click="goToEditUser(index)"
          ></v-btn>
        </div>
      </v-card>
      <hr />
      <v-card class="address">
        <div class="show-customer">
          <p>Address</p>
          <div  class="icons">
            <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            prepend-icon="mdi-account-circle"
            @click="goToUserAddress(index)"
          >
            add
          </v-chip>
          </div>
        </div>
        <v-table v-if="getUserAddress">
          <thead>
            <tr>
              <th class="text-left">
                #
              </th>
              <th class="text-left">
                Address
              </th>
              <th class="text-left">
                city
              </th>
              <th class="text-left">
                Country
              </th>
              <th class="text-left">
                State
              </th>
              <th class="text-left">
                ZIP code
              </th>
              <th class="text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(address,index) in getUserAddress" :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ address.address }}</td>
              <td>{{ address.city }}</td>
              <td>{{ address.country }}</td>
              <td>{{ address.state }}</td>
              <td>{{ address.zipCode }}</td>
              <td>
                <v-btn
                color="primary"
                icon="mdi-pencil"
                size="small"
                @click="goToEditUserAddress(index)"
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState , mapActions } from "pinia";
import { userStore } from "../store/stores/users";

export default defineComponent({
    data() {
      return{
        index : this.$route.params.index as string|number,
        
      }  
    },

    methods:{
      ...mapActions(userStore , ['addUserAdders','addAddressIndex',"setDialog"]),
      goToEditUser(index : string){
        this.setDialog(true)
      this.$router.push(`/users/edit/${index}`)
    },
    goToUserAddress(index :string){
      this.$router.push(`/users/address/${this.getUserIndex}`)
    },
    goToEditUserAddress(index:number){
      this.addAddressIndex(index)
      this.$router.push(`/users/edit-address/${index}`)
    },
    },
    computed: {
    ...mapState(userStore, ["getUsers","getUserAddress","getUserIndex","getIsDialog"]),
  },
})
</script>
<style scoped>
.show-customer{
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
.icons{
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.address{
  margin-top: 3rem;
}
</style>