import axiosInstance from "../../../axiosInstance";

export const entityService = {
  fetchEntities: async (queryParams = {}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString ? `/entities?${queryString}` : "/entities";
      return await axiosInstance.get(url);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener entidades"
      );
    }
  },
};
