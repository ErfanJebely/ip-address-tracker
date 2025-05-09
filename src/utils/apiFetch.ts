import mockData from "../utils/mock.json";

// API Fetch functions
export const fetchUserIP = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  if (!response.ok) {
    alert("Oops! We couldn't identify your IP address.");
  }
  return response.json();
};

// Fetch IP details from IPify API
export const fetchIPDetails = async (query: string) => {
  const API_KEY = "at_qU1H5FDbv2m0kks9WAxbRLUAUDUcq";
  const BASE_URL = `https://geo.ipify.org/api/v2/country,city`;

  const response = await fetch(
    `${BASE_URL}?apiKey=${API_KEY}&ipAddress=${query}`
  );
  if (!response.ok) {
    alert("Oops! We couldn't find any information for the entered IP address.");
  }
  return response.json();

  // return Promise.resolve(mockData);
};
