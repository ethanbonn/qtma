const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.PROD_DOMAIN;

export default baseUrl;