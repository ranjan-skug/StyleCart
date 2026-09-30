// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk to fetch products by collection and optional filters
// export const fetchProductsByFilters = createAsyncThunk(
//   "products/fetchbyfilters",
//   async ({
//     collection,
//     size,
//     color,
//     gender,
//     maxPrice,
//     minPrice,
//     sortBy,
//     search,
//     category,
//     material,
//     brand,
//     limit,
//   }) => {
//     const query = new URLSearchParams();
//     if (collection) query.append("collection", collection);
//     if (size) query.append("size", size);
//     if (color) query.append("color", color);
//     if (gender) query.append("gender", gender);
//     if (maxPrice) query.append("maxPrice", maxPrice);
//     if (minPrice) query.append("minPrice", minPrice);
//     if (sortBy) query.append("sortBy", sortBy);
//     if (search) query.append("search", search);
//     if (category) query.append("category", category);
//     if (material) query.append("material", material);
//     if (brand) query.append("brand", brand);
//     if (limit) query.append("search", limit);
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
//     );
//     return response.data;
//   },
// );

// // Async thunk to fetch single product by id
// export const fetchProductDetails = createAsyncThunk(
//   "products/fetchProductDetails",
//   async (id) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
//     );
//     return response.data;
//   },
// );

// // Async thunk to fetch similar products
// export const updateProduct = createAsyncThunk(
//   "product/updateProduct",
//   async ({ id, productData }) => {
//     const response = await axios.put(
//       `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
//       productData,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//         },
//       },
//     );
//     return response.data;
//   },
// );

// // Async thunk to fetch similar products
// export const fetchSimilarProducts = createAsyncThunk(
//   "products/FetchSimilarProducts",
//   async ({ id }) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
//     );
//     return response.data;
//   },
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     products: [],
//     selectedProduct: null,
//     similarProducts: [],
//     loading: false,
//     error: null,
//     filters: {
//       category: "",
//       size: "",
//       color: "",
//       gender: "",
//       brand: "",
//       minPrice: "",
//       maxPrice: "",
//       sortBy: "",
//       search: "",
//       material: "",
//       collection: "",
//     },
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters: (state) => {
//       state.filters = {
//         category: "",
//         size: "",
//         color: "",
//         gender: "",
//         brand: "",
//         minPrice: "",
//         maxPrice: "",
//         sortBy: "",
//         search: "",
//         material: "",
//         collection: "",
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // handel fetching products with filter
//       .addCase(fetchProductsByFilters.pending, (state) => {
//         ((state.loading = true), (state.error = null));
//       })
//       .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchProductsByFilters.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       //   Handel fetching single products details
//       .addCase(fetchProductDetails.pending, (state) => {
//         ((state.loading = true), (state.error = null));
//       })
//       .addCase(fetchProductDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       //   Handel Updating Product
//       .addCase(updateProduct.pending, (state) => {
//         ((state.loading = true), (state.error = null));
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         const updateProduct = action.payload;
//         const index = state.products.findIndex(
//           (product) => product._id === updateProduct._id,
//         );
//         if (index !== -1) {
//           state.products[index] = updateProduct;
//         }
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       //   Handel fetching similar products
//       .addCase(fetchSimilarProducts.pending, (state) => {
//         ((state.loading = true), (state.error = null));
//       })
//       .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchSimilarProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setFilters, clearFilters } = productsSlice.actions;
// export default productsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchbyfilters",
  async ({
    collection,
    size,
    color,
    gender,
    maxPrice,
    minPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (minPrice) query.append("minPrice", minPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit); // FIXED

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  },
);

// Async thunk to fetch single product by id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
    );
    return response.data;
  },
);

// Async thunk to fetch similar products
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/FetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
    );
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProducts: null,
    simmilarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // handel fetching products with filter
      .addCase(fetchProductsByFilters.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //   Handel fetching single products details
      .addCase(fetchProductDetails.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProducts = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   Handel Updating Product
      .addCase(updateProduct.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id,
        );
        if (index !== -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //   Handel fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.simmilarProducts = action.payload; // FIXED
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
