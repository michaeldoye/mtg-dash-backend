import { buildSchema } from "graphql";
import fetch from "node-fetch";

const endPoint: string = "https://api.scryfall.com";

export const rootValueV2 = {
  cardData: async (): Promise<any> => {
    const response = await fetch(`${endPoint}/cards`);
    const allCards = await response.json();
    const cards = allCards.data.filter((card) => card.lang === "en");
    return await {
      data: cards,
      has_more: allCards.has_more,
      next_page: allCards.next_page,
      total_cards: allCards.total_cards,
    };
  },
};

// Construct a schema, using GraphQL schema language
export const schemaV2 = buildSchema(`
  type CardResponse {
    object: String
    total_cards: Int
    has_more: Boolean
    next_page: String
    data: [Card]
  }

  type Card {
    name: String
    type_line: String
    printed_name: String
    usd: String
    lang: String
  }

  type Query {
    cardData: CardResponse
  }
`);
