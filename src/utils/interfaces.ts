interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface filterFormValues {
  breeds?: string[];
  zipCodes?: string | string[];
  ageMin?: string;
  ageMax?: string;
}

export type { Dog, Location, Coordinates, filterFormValues };
