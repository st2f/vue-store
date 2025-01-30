import data from './product';

export async function seed(collectionName: string) {
  await fetch(`https://restapi.fr/api/${ collectionName}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
