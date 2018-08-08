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

  type Images {
    small: String
    normal: String
    large: String
    png: String
  }

  type Legalities {
    standard: String
    future: String
    frontier: String
    modern: String
    legacy: String
    pauper: String
    vintage: String
    penny: String
    commander: String
    duel: String
    brawl: String
  }

  type PurchaseLinks {
    amazon: String
    ebay: String
    tcgplayer: String
  }

  type Card {
    name: String
    type_line: String
    printed_name: String
    usd: String
    lang: String
    image_uris: Images
    highres_image: Boolean
    id: String
    multiverse_ids: [Int]
    mana_cost: String
    cmc: Int
    oracle_text: String
    colors: [String]
    color_identity: [String]
    legalities: Legalities
    set: String
    set_name: String
    rarity: String
    purchase_uris: PurchaseLinks
    collector_number: Int
  }

  type Query {
    cardData: CardResponse
  }
`);
