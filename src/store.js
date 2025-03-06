import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/store/authSlice";
import sellerReducer from "./features/sellers/store/sellerSlice";
import identificationTypeReducer from "./features/common/store/identificationTypeSlice";
import entitiesReducer from "./features/entities/store/entitySlice";
import customersReducer from "./features/customers/store/customerSlice";
import salesReducer from "./features/sales/store/saleSlice";
import paymentMethodsReducer from "./features/common/store/paymentMethodSlice";
import productsReducer from "./features/products/store/productSlice";
import liquidationsReducer from "./features/liquidations/store/liquidationSlice";
import payLiquidationReducer from "./features/liquidations/store/payLiquidationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellerReducer,
    identificationTypes: identificationTypeReducer,
    entities: entitiesReducer,
    customers: customersReducer,
    sales: salesReducer,
    paymentMethods: paymentMethodsReducer,
    products: productsReducer,
    liquidations: liquidationsReducer,
    payLiquidation: payLiquidationReducer,
  },
});
