import { gql } from "src/__generated__";

export default gql(`
query GetCitySunriseSunset($cityName: String!, $countryCode: CountryCode!) {
  getCitySunriseSunset(cityName: $cityName, countryCode: $countryCode) {
    sunrise
    sunset
    solarNoon
    dayLength
  }
}`);
