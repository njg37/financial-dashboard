export async function fetchData<T>(url: string): Promise<T | null> {
  try {
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
