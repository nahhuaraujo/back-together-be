export interface IPet {
  name?: string;
  species: string;
  breed: string;
  sex: 'male' | 'female';
  description: string;
  img: string;
}
