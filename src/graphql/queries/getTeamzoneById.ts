import { gql } from "src/__generated__";

export default gql(`
query GetTimezoneById($getTimezoneByIdId: ID!) {
  getTimezoneById(id: $getTimezoneByIdId) {
    name
    countryName
		countryFlag
    continentName
    abbreviation
    alternativeName
    group
    mainCities
  }
}
`);
