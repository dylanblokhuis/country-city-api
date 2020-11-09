import fetch from 'node-fetch';

export default async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.text();

    return data;
  } else {
    throw new Error(`Request failed ${url} might be down.`)
  }
}