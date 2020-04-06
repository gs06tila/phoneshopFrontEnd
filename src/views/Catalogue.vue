<template>
  <b-container fluid class="page">
    <b-row>
      <b-col cols="3">
        <filters :filters="filters" />
      </b-col>
      <b-col cols="9">
        <product-list :products="products" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import ProductList from "../components/products/List";
import Filters from "../components/products/Filters";
export default {
  name: "Catalogue",
  components: {
    Filters,
    ProductList
  },
  data() {
    return {
      products: [],
      colourses: [],
      filters: {
        brands: [],
        capacity: [],
        colours: [],
        os: [],
        features: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    axios
      .all([
        axios.get(`http://localhost:8080/api/productfilter`, {
          params: to.query
        }),
        axios.get(`http://localhost:8080/api/filters`)
      ])
      .then(
        axios.spread((products, filters) => {
          console.log(filters);
          next(vm => vm.setData(products.data, filters.data));
        })
      );
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get(`http://localhost:8080/api/productfilter`, {
        params: to.query
      })
      .then(response => {
        if (to.query) {
          console.log(response.data);
          console.log(response.data);
          this.products = response.data;
        } else {
          this.products = response.data;
        }
        next();
      });
  },
  methods: {
    setData(products, filters) {
      this.products = products;
      this.filters = filters;
    },
    setFilters(filters) {
      this.filters = filters;
    }
  }
};
/*
let filterPhone = firebase.firestore().collection("Filters").doc("phonetype");
    filterPhone
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
          next(vm => vm.setFilters(doc.data()));
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
* */
</script>

<style scoped></style>
