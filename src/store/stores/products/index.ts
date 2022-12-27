import { defineStore } from 'pinia'

export const productStore = defineStore('ProductStore', {
  state: () => {
    return {
        products : []
    }
  },
  actions: {
    addProduct(imgFile,productName,price,category){
      console.log(imgFile,"img");
      
      this.products.push({
        imgFile : imgFile,
        productName : productName,
        price : price,
        category : category
      })
      console.log(this.products,"prod");
      
    }
  },
  getters: {
    getProduct(){
      return this.products
    }
  },
})