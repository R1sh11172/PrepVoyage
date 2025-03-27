import axios from "axios";

const UNSPLASH_ACCESS_KEY = "Tlo8Jro_cF1Z2aqd60mSSz4Im2FoP2HddJzdIN6JIrQ";

const fallbackImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1686986468304-e553fc1e2e16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dHJhdmVsfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
];

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
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[randomIndex];
}
