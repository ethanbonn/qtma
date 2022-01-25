const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://soarup.io";

export default baseUrl;