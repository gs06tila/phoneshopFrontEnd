<template>
  <div>
    <product-details v-if="product" :product="product" />
  </div>
</template>

<script>
  import axios from "axios";
import ProductDetails from "../components/products/Details";
export default {
  name: "Product",
  components: { ProductDetails },
  data() {
    return {
      product: null
    };
  },
  beforeRouteEnter(to, from, next) {
      axios.get(`https://task30backend.herokuapp.com/api/products/${to.params.slug}`).then(response => {
        next(vm => vm.setData(response.data));
      });
    /*fetch(`https://task30backend.herokuapp.com/api/products/${to.params.slug}`)
      .then(response => {
        return response.json();
      })
      .then(product => {
        next(vm => {
          vm.setData(product);
        });
      });*/
  },
  methods: {
    setData(product) {
      this.product = product[0];
    }
  }
};
</script>

<style scoped></style>
