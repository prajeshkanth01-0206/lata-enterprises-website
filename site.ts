export const PHONE_DISPLAY = "+91 98944 88870";
export const PHONE_TEL = "tel:+919894488870";
export const EMAIL = "thelataerode@gmail.com";
export const EMAIL_MAILTO = "mailto:thelataerode@gmail.com";
export const SITE_URL = "https://www.thelata.com";
export const ADDRESS =
  "101E, Keerthi Illam, N.M.S. Street, Kalingarayanpalayam, Bhavani Erode – 638 301, Tamil Nadu, India.";
export const ADDRESS_SHORT = "Bhavani Erode – 638 301, Tamil Nadu, India";
export const INSTAGRAM = "https://www.instagram.com/the_lata_erode/";
export const FACEBOOK = "https://www.facebook.com/share/1Fd47KAmmG/";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=101E+Keerthi+Illam+NMS+Street+Kalingarayanpalayam+Bhavani+Erode+638301+Tamil+Nadu";

export type Collection = {
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

export const COLLECTIONS: Collection[] = [
  {
    title: "Temple Return Gift Bags – Manjal Pai",
    blurb: "Traditional temple gifting, thoughtfully wrapped.",
    image: "/assets/poster-temple.jpg",
    alt: "Manjal Pai temple return gift bags in yellow, green, maroon and red",
  },
  {
    title: "Jute Fancy Bags",
    blurb: "Natural jute, printed with your brand.",
    image: "/assets/poster-hero.jpg",
    alt: "Lata Enterprises jute bag with the company logo",
  },
  {
    title: "Corporate Return Gift Bags",
    blurb: "Branded gifts for teams, clients and events.",
    image: "/assets/bag-joy-mart.jpg",
    alt: "Cream canvas tote with a bold red circular brand print",
  },
  {
    title: "Educational and Other Bags",
    blurb: "Bags for academies, institutions and everyday use.",
    image: "/assets/bag-skv-academy.jpg",
    alt: "Cream canvas tote with a maroon printed panel",
  },
  {
    title: "Wedding Celebration Bags",
    blurb: "Return gifts for weddings and family celebrations.",
    image: "/assets/bag-kalyan-silks.jpg",
    alt: "Cream canvas tote with a large red panel print",
  },
  {
    title: "Customised Return Gift Bags",
    blurb: "Your design, your colours, your occasion.",
    image: "/assets/bag-kovai-textiles.jpg",
    alt: "Cream canvas tote with a colourful printed design",
  },
];

export type CatalogueItem = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
};

export const CATALOGUE: CatalogueItem[] = [
  {
    id: "01",
    name: "Bag Collection 01",
    image: "/assets/bag-collection-01-jute-floral.jpg",
    alt: "Natural jute bag with a floral printed panel in maroon and pink",
    description:
      "Natural jute bag with a floral printed panel in maroon and pink, with jute handles.",
  },
  {
    id: "02",
    name: "Bag Collection 02",
    image: "/assets/bag-joyalukkas.jpg",
    alt: "Cream canvas tote with a wide maroon band print",
    description:
      "Cream canvas tote with a wide maroon band print across the front.",
  },
  {
    id: "03",
    name: "Bag Collection 03",
    image: "/assets/bag-collection-03-saree.jpg",
    alt: "Cream cotton saree bags with a zip closure and a mesh window showing a printed saree inside",
    description:
      "Cream cotton saree bags with a zip closure and a mesh window, made to store and carry sarees.",
  },
  {
    id: "04",
    name: "Bag Collection 04",
    image: "/assets/bag-collection-04-bottle.jpg",
    alt: "Natural jute bottle bags in four styles with handles and drawstring tops",
    description:
      "Natural jute bottle bags in four styles — handled, drawstring and die-cut — made to carry a bottle.",
  },
  {
    id: "05",
    name: "Bag Collection 05",
    image: "/assets/bag-collection-05-jute-red-border.jpg",
    alt: "Natural jute bag with a red border trim and rope jute handles",
    description:
      "Natural jute bag with a red border trim and rope jute handles.",
  },
  {
    id: "06",
    name: "Bag Collection 06",
    image: "/assets/bag-collection-06-jute-blockprint.jpg",
    alt: "Grey jute tote with a green and red block-printed floral pattern",
    description:
      "Grey jute tote with a green and red block-printed floral pattern and grey handles.",
  },
];

export const WHY_CHOOSE: string[] = [
  "30 Years of Experience",
  "Quality Craftsmanship",
  "Customised Designs",
  "Reliable Manufacturing",
  "Bulk Order Capability",
  "Attention to Detail",
  "Dedicated Customer Support",
  "Sustainable Bag Options",
];

export const MATERIALS: { name: string; image: string | null; alt: string }[] =
  [
    {
      name: "Jute Bags",
      image: "/assets/poster-hero.jpg",
      alt: "Lata Enterprises jute bag with the company logo",
    },
    {
      name: "Cotton Bags",
      image: "/assets/bag-joy-mart.jpg",
      alt: "Cream canvas cotton tote with a bold red circular print",
    },
    {
      name: "Cloth Bags",
      image: "/assets/bag-joyalukkas.jpg",
      alt: "Cream cloth tote with a wide maroon band print",
    },
    { name: "Paper Bags", image: null, alt: "" },
    {
      name: "Customised Printed Bags",
      image: "/assets/bag-kalyan-silks.jpg",
      alt: "Cream canvas tote with a large red panel print",
    },
    { name: "Other Sustainable Bag Varieties", image: null, alt: "" },
  ];

export const GROUP = [
  {
    name: "LK Apparel",
    desc: "All kinds of bag manufacturers",
  },
  {
    name: "Lata Enterprises",
    desc: "All types of packing solutions and trading",
  },
  {
    name: "Lata Textile",
    desc: "YARN DOUBLING & WINDING",
  },
];
