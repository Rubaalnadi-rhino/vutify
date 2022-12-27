import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
        users : [],
        index : 0 as number,
        addressIndex : null as number|any,
        userIndex : 0 as number,
        isLoggedIn : false as boolean,
        dialog: false as boolean
    }
  },
  actions: {
    addUser(userName:string,userEmail:string,userPhone:string){ 
      this.users.push({
        userName : userName,
        userEmail : userEmail,
        userPhone : userPhone,
      })
      console.log(this.users,"users");
      
    },
    editSpecificUser(userName:string,userEmail:string,userPhone:string,index:string){
      this.users[index] = {
        userName : userName,
        userEmail : userEmail,
        userPhone : userPhone,
      }
      console.log(this.users,"edit user");
      
    },
    addAddressIndex(index : number){
      this.addressIndex = index
      console.log(index ,"action index");
      
    },
    addUserAdders(address:string,city:string,country:string,state :string , zipCode:number|string , index : number|string ){
      this.index = index;
      this.users[index].userAddress=this.users[index].userAddress ? [... this.users[index].userAddress] :[];
        this.users[index].userAddress.push( {
          address : address,
          city : city,
          country : country,
          state : state,
          zipCode : zipCode
       })
    },
    editSpecificUserAddress(address:string,city:string,country:string,state :string , zipCode:number|string){
      this.users[this.userIndex].userAddress[this.addressIndex] = {} 
        this.users[this.userIndex].userAddress[this.addressIndex]={
          address : address,
          city : city,
          country : country,
          state : state,
          zipCode : zipCode
       }
    },
    addUserIndex(index : number){
      this.userIndex = index
    },
    setIsLoggedIn(loggedIn : boolean){
        this.isLoggedIn =localStorage.getItem('user token') ? true  :loggedIn
    },
    setDialog(isDialog : boolean){
      this.dialog = isDialog
    }
  },
  getters: {
    getUsers(){
      return this.users
    },
    getUserAddress(){
      console.log(this.users[this.userIndex]?.userAddress,"this.users[this.index].userAddress");
      
      return this.users[this.userIndex]?.userAddress
    },
    getAddressIndex(){
      return this.addressIndex
    },
    getUserIndex(){
      return  this.userIndex
    },
    getIsLoggedIn(){
      return this.isLoggedIn
    },
    getIsDialog(){
      return this.dialog
    }
  },
})