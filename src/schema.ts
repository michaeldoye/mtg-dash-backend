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
    isSelected: Boolean
  }

  type CardsBySet {
    cardData: [Card]
    setData: Set
    totalCards: Int
  }

  type FeedItems {
    title: String
    link: String
    image: String
    pubDate: String
    content: String
    contentSnippet: String
    categories: [String]
  }

  type Feed {
    title: String
    items: [FeedItems]
  }

  type Query {
    setData(key: String): [Set]
    cardData: [Card]
    cardsBySet(set: String, pageSize: Int, page: Int): CardsBySet
    getNewsFeed: Feed
  }
`);
