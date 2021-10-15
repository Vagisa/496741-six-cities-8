import { Offer } from '../types/offers';

export const offers: Offer[] = [
  {
    id: 10,
    gallery: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
    ],
    heading: 'Beautiful & luxurious studio at great location',
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    ],
    isPremium: true,
    type: 'Apartment',
    rating: 4.8,
    bedroomsCount : 3,
    maxAdults: 4,
    price: 120,
    advantages: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
  },
  {
    id: 11,
    gallery: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    heading: 'Wood and stone place',
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    ],
    isPremium: false,
    type: 'Private room',
    rating: 4.8,
    bedroomsCount : 3,
    maxAdults: 4,
    price: 80,
    advantages: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
  },
  {
    id: 12,
    gallery: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
    ],
    heading: 'Canal View Prinsengracht',
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    ],
    isPremium: false,
    type: 'Apartment',
    rating: 4.8,
    bedroomsCount : 3,
    maxAdults: 4,
    price: 132,
    advantages: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
  },
  {
    id: 13,
    gallery: [
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    heading: 'Nice, cozy, warm big bed apartment',
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    ],
    isPremium: true,
    type: 'Apartment',
    rating: 4.8,
    bedroomsCount : 3,
    maxAdults: 4,
    price: 180,
    advantages: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'],
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
  },
];
