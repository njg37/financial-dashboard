export async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    // check if we want static JSON (for Capacitor / static export)
    const useStatic = process.env.NEXT_PUBLIC_USE_STATIC === "true";

    // decide URL
    const url = useStatic
      ? `/data/${endpoint}.json`  // JSON in public/data/
      : `/api/${endpoint}`;       // Next.js API route

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching ${url}: ${res.status}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
