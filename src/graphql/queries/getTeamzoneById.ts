import { gql } from "src/__generated__";

export default gql(`
query GetTimezoneById($id: ID!) {
  getTimezoneById(id: $id) {
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
