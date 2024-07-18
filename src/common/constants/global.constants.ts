import * as path from 'path';

export const DATABASE_PATH = path.join(process.cwd(), 'src', 'database', 'data.json');

export const PETS = [
  {
    id: 1,
    animal: 'Perro',
    nombre: 'Toby',
  },
  {
    id: 2,
    animal: 'Gato',
    nombre: 'Arturo',
  },
  {
    id: 3,
    animal: 'Elefante',
    nombre: 'Dumbo',
  },
  {
    id: 4,
    animal: 'Perro',
    nombre: 'Bugs',
  },
  {
    id: 5,
    animal: 'Raton',
    nombre: 'Nicolas',
  },
];
