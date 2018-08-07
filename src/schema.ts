import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  type Set {
    type: String
    name: String
    releaseDate: String
    block: String
    code: String
  }

  type Ruling {
    date: String
    text: String
  }

  type Card {
    id: String
    name: String
    set: String
    manaCost: String
    colors: [String]
    colorIdentity: [String]
    type: String
    types: [String]
    subtypes: [String]
    rarity: String
    text: String
    power: String
    toughness: String
    multiverseid: Int
    imageUrl: String
    rulings: [Ruling]
  }

  type CardsBySet {
    cardData: [Card]
    setData: Set
    totalCards: Int
  }

  type Query {
    setData(key: String): [Set]
    cardData: [Card]
    cardsBySet(set: String, pageSize: Int, page: Int): CardsBySet
  }
`);
