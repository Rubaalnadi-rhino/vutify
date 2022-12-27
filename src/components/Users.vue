<template>
  <div class="add-user">
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
            Add user
          </v-btn>
        </template>
          <v-card>
            <add-user @dialog="changeDialog($event)"/>
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
      <v-responsive v-if="getUsers?.length">
        <v-table class="customers" >
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                email
              </th>
              <th class="text-left">
                phone
              </th>
              <th class="text-left">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in getUsers"
              :key="index"
            >
              <td>{{ item.userName }}</td>
              <td>{{ item.userEmail }}</td>
              <td>{{item.userPhone}}</td>
              <td class="icons-gap">
                <v-btn
                color="primary"
                icon="mdi-pencil"
                size="small"
                @click="goToEditUser(index)"
                ></v-btn>
                <v-btn
                color="green"
                icon="mdi-eye"
                size="small"
                @click="goToShowUser(index)"
            ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-responsive>
      <v-responsive class="no-products" v-else>
        <p>There is no user yet!</p>
      </v-responsive>
  </template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState,mapActions } from "pinia";
import { userStore } from "../store/stores/users";
import AddUser from "./AddUsers.vue"
export default defineComponent({
data() {
return {
  dialog : false as boolean
};
},
components:{
      AddUser
    },
computed: {
    ...mapState(userStore, ["getUsers","getUserIndex"]),
  },
  methods:{
    ...mapActions(userStore,["addUserIndex"]),
    goToShowUser(index : number){
      this.addUserIndex(index)
      this.$router.push(`/users/show/${index}`)
    },
    goToEditUser(index : number){
      this.$router.push(`/users/edit/${index}`)
    },
    changeDialog(value:boolean|any){
      console.log(value,"changeDialog");
      
        this.dialog = value
    }
  }
})
</script>
<style scoped lang="scss">
.customers{
    border: 1px solid #000;
    margin-top: 1.25rem;
}
.no-products{
  margin-top: 3rem ;
  padding: 5rem;

}
.icons{
  &-gap{
  display: flex;
  gap:1rem;
  margin-top: 1rem;
}}
.add-user{
  margin-top: 1.25rem;
    justify-content: flex-end;
    margin-right: 2rem;
    margin-bottom: 0.6rem;
}
</style>