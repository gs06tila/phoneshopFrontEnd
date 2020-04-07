<template>
  <b-container fluid class="page">
    <b-row>
      <b-col cols="3">
        <filters v-if="products.length" :filters="filters" />
      </b-col>
      <b-col cols="9">
        <div class="mt-4 flex">
          <search-bar class="search" />
            <product-sort class="float-right" />
        </div>
        <product-list v-if="products.length" :products="sortedProducts" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import ProductList from "../components/products/List";
import Filters from "../components/products/Filters";
import ProductSort from "../components/products/ProductSort";
import SearchBar from "../components/products/SearchBar";
//import Alphanum from "../Alphanum";
export default {
  name: "Catalogue",
  components: {
    Filters,
    SearchBar,
    ProductSort,
    ProductList
  },
  data() {
    return {
      products: [],
      stringArray: [],
      filters: {
        brands: [],
        capacity: [],
        colours: [],
        os: [],
        features: []
      }
    };
  },
  computed: {
    sortOption() {
      return this.$route.query.sort || 0;
    },
    sortedProducts: function() {
      switch (this.sortOption) {
        case 1:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return this.products.sort((a, b) => {
            return b.price - a.price;
          });
          // eslint-disable-next-line no-unreachable
          break;

        case 2:
          {
            let collator = new Intl.Collator(undefined, {
              numeric: true,
              sensitivity: "base"
            });

            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.products.sort(function(a, b) {
              return collator.compare(a.name, b.name);
            });
          }
          //return this.products.sort((a, b) => {
          //  console.log(a.name + "  " + b.name);
          //  return (a.name > b.name) - (a.name < b.name);
          //});
          // eslint-disable-next-line no-unreachable
          break;
        case 3:
          {
            let collator = new Intl.Collator(undefined, {
              numeric: true,
              sensitivity: "base"
            });

            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.products.sort(function(a, b) {
              return collator.compare(b.name, a.name);
            });

            //return this.products.sort((a, b) => {
            //  return (b.name > a.name) - (b.name < a.name);
            //});
          }
          // eslint-disable-next-line no-unreachable
          break;
        default:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return this.products.sort((a, b) => {
            return a.price - b.price;
          });
      }
    }
  },
  methods: {
    setData(products, filters) {
      this.products = products;
      this.filters = filters;
    }
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
        this.products = response.data;
        next();
      });
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

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;

  .search {
    flex: 0.5;
  }
}
</style>
