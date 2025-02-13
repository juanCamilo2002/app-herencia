import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/store/authSlice";
import sellerReducer from "./features/sellers/store/sellerSlice";
import identificationTypeReducer from "./features/common/store/identificationTypeSlice";
import entitiesReducer from "./features/entities/store/entitySlice";
import customersReducer from "./features/customers/store/customerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellerReducer,
    identificationTypes: identificationTypeReducer,
    entities: entitiesReducer,
    customers: customersReducer,
  },
});
