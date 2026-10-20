export type ImageCredit = {
  file: string;
  title: string;
  photographer: string;
  url: string;
  license: string;
};

export const PEXELS_PHOTOS: Record<
  string,
  { title: string; photographer: string; url: string }
> = {
  "4170056": {
    title: "Interior of a living and dining area",
    photographer: "Engin Akyurt",
    url: "https://www.pexels.com/photo/an-interior-of-a-house-4170056/",
  },
  "6758245": {
    title: "Couch with cushions in a living room",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/photo/couch-with-cushions-in-living-room-6758245/",
  },
  "11295890": {
    title: "Throw pillows on a grey sofa",
    photographer: "Vidal Balielo Jr.",
    url: "https://www.pexels.com/photo/brown-and-white-throw-pillow-on-the-couch-11295890/",
  },
  "4857775": {
    title: "Cozy sofa and bed in a studio apartment",
    photographer: "Rachel Claire",
    url: "https://www.pexels.com/photo/cozy-sofa-and-bed-in-contemporary-studio-apartment-4857775/",
  },
  "6903157": {
    title: "Bedroom with unmade bed near a window",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/photo/stylish-bedroom-with-unmade-bed-near-window-with-curtains-6903157/",
  },
  "6444973": {
    title: "Bedroom interior with pillows and blanket",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/photo/bedroom-interior-with-pillows-and-blanket-on-bed-6444973/",
  },
  "8135118": {
    title: "Throw pillows on a white bed",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/photo/brown-throw-pillows-on-white-bed-8135118/",
  },
  "7045947": {
    title: "Bedroom with built in wardrobe and toys",
    photographer: "Max Vakhtbovych",
    url: "https://www.pexels.com/photo/modern-bedroom-interior-with-door-and-furniture-at-home-7045947/",
  },
  "2995012": {
    title: "Round dining table with white chairs",
    photographer: "Tiana",
    url: "https://www.pexels.com/photo/empty-white-chairs-beside-table-2995012/",
  },
  "7538106": {
    title: "Wooden table with chairs",
    photographer: "Ganinph",
    url: "https://www.pexels.com/photo/brown-wooden-table-with-chairs-7538106/",
  },
  "241520": {
    title: "Dining set inside a room",
    photographer: "Mali",
    url: "https://www.pexels.com/photo/dining-set-inside-room-241520/",
  },
  "36123565": {
    title: "Modern workspace with laptop and books",
    photographer: "Leticia Alvares",
    url: "https://www.pexels.com/photo/modern-workspace-with-laptop-and-books-on-desk-36123565/",
  },
  "10922370": {
    title: "Lamp on a computer desk",
    photographer: "Elena Golovchenko",
    url: "https://www.pexels.com/photo/a-lamp-on-a-computer-desk-10922370/",
  },
  "12715508": {
    title: "Outdoor seating by the pool",
    photographer: "Keegan Checks",
    url: "https://www.pexels.com/photo/brown-chairs-beside-white-sofa-12715508/",
  },
  "3629622": {
    title: "Lounge chairs on an outdoor deck",
    photographer: "Chris Jong",
    url: "https://www.pexels.com/photo/brown-chairs-and-table-3629622/",
  },
  "3063047": {
    title: "Round patio table and chair",
    photographer: "Alexis Bahl",
    url: "https://www.pexels.com/photo/round-table-near-green-metal-chair-3063047/",
  },
  "4221413": {
    title: "Wooden bunk bed in a children's bedroom",
    photographer: "Curtis Adams",
    url: "https://www.pexels.com/photo/brown-wooden-bunk-bed-4221413/",
  },
  "6670652": {
    title: "Children's bedroom with desk",
    photographer: "Huy Quang Nguyen",
    url: "https://www.pexels.com/photo/photo-of-a-bedroom-6670652/",
  },
  "32736387": {
    title: "Art and decor on a bamboo shelf",
    photographer: "Daniel Salvador",
    url: "https://www.pexels.com/photo/warm-minimalist-art-on-bamboo-shelf-decor-32736387/",
  },
};

export function pexels(id: keyof typeof PEXELS_PHOTOS | string, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}
