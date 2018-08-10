import fetch from "node-fetch";
import * as Parser from "rss-parser";

const parser = new Parser();

// Base endpoint
const api = "https://api.magicthegathering.io/v1";

const feedUrl = "https://magic.wizards.com/en/rss/rss.xml";

// Check if we are in production
const isProduction = false; // process.env.NODE_ENV.trim() === "production";

// The root provides a resolver function for each API endpoint
export const rootValue = {

  /**
   * @description Get all cards
   */
  cardData: async (): Promise<any> => {

    // Get all the cards
    const allCards = await fetch(`${api}/cards`);
    const allCardData = await allCards.json();

    // Return all the cards
    return await allCardData;
  },

  /**
   * @description Get Cards by set
   *
   * @param string
   * @param number
   * @param number
   */
  cardsBySet: async ({set, pageSize, page}: {set: string, pageSize: number, page: number}): Promise<any> => {

    // Get cards by set
    const cardResponse = await fetch(`${api}/cards?set=${set}&pageSize=${pageSize}&page=${page}`);
    const cardData = await cardResponse.json();

    // Proxy images in production
    if (isProduction) {
      cardData.cards.map((card) => {
        return card.imageUrl =
          `https://us-central1-mtg-dash.cloudfunctions.net/imageProxy?id=${card.multiverseid}`;
      });
    }

    // Get set data from cards
    const setResponse = await fetch(`${api}/sets/${set}`);
    const setData = await setResponse.json();

    // Return card and set data
    return await {
      cardData: cardData.cards.filter((card) => card.type.indexOf("Basic Land") === -1),
      setData: setData.set,
      totalCards: cardData.cards.length,
    };
  },

  /**
   * @description Get all sets
   *
   * @param string
   */
  setData: async ({key}: {key: string}): Promise<any> => {

    // Get all the sets
    const allSets = await fetch(`${api}/sets`);
    const allSetData = await allSets.json();

    // Sort the sets a - z or by most recent date
    const sortedSets = allSetData.sets.sort((a, b) => {
      if (!key) { return false; }
      return key.indexOf("date") > -1
        ? (new Date(a[key]) as any) - (new Date(b[key]) as any)
        : a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
    });

    // Return the array in reverse
    return await sortedSets.reverse();
  },

  getNewsFeed: async (): Promise<any> => {
    const feed = await parser.parseURL(feedUrl);
    const regEx = /https?([^"\s]+)"?[^>]*.jpg/;
    const images = feed.items.map((item) => regEx.exec(item.content));
    images.forEach((element, index) => {
      if (!element) { return false; }
      feed.items[index].image = element[0];
    });
    return await feed;
  },
};
