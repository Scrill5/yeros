export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const url = "https://www.freetogame.com/api/games";
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const data = await response.json();

      // Filtrar por búsqueda
      let filteredGames = data;
      if (search) {
        filteredGames = filteredGames.filter(game => 
          game.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filtrar por categoría
      if (category) {
        filteredGames = filteredGames.filter(game => 
          game.genre.toLowerCase() === category.toLowerCase()
        );
      }

      return new Response(JSON.stringify(filteredGames), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }