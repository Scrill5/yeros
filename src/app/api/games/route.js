export async function GET() {
    const url = "https://www.freetogame.com/api/games"; // URL de la API externa
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }