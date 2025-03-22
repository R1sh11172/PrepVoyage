import axios from "axios";

const UNSPLASH_ACCESS_KEY = "Tlo8Jro_cF1Z2aqd60mSSz4Im2FoP2HddJzdIN6JIrQ";

export async function fetchDestinationImage(destination: string) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: destination,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1,
        orientation: "landscape",
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      return results[0].urls.regular; // You can also use small/full if needed
    } else {
      console.warn(`No Unsplash image found for "${destination}"`);
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
  }

  // Fallback: show generic travel photo
  return "https://source.unsplash.com/featured/?travel";
}
