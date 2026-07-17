export type ContactChannel = {
  id: string;
  label: string;
  description: string;
  href: string;
  handle: string;
  accent: string;
  icon?: "whatsapp" | "instagram" | "email";
};

/**
 * Edit links below, or override WhatsApp with env vars in Vercel:
 * NEXT_PUBLIC_WHATSAPP_URL, NEXT_PUBLIC_WHATSAPP_HANDLE
 */
export const contactChannels: ContactChannel[] = [
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    description: "Fastest way to ask about sizes, stock, or place an order.",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/971568053103",
    handle: process.env.NEXT_PUBLIC_WHATSAPP_HANDLE || "+971 56 805 3103",
    accent: "#25D366",
  },
  {
    id: "instagram-fashion-era",
    icon: "instagram",
    label: "Fashion Era",
    description: "Follow drops, stories, and message us on Instagram.",
    href: "https://www.instagram.com/fashion_era12345",
    handle: "@fashion_era12345",
    accent: "#E1306C",
  },
  {
    id: "instagram-zaib",
    icon: "instagram",
    label: "Zaib Fashion Store",
    description: "Browse the latest looks and DM us on Instagram.",
    href: "https://www.instagram.com/zaib_fashion_store",
    handle: "@zaib_fashion_store",
    accent: "#C13584",
  },
  {
    id: "instagram-fashion-ware",
    icon: "instagram",
    label: "Fashion & Ware",
    description: "Shop updates, reels, and Instagram DMs.",
    href: "https://www.instagram.com/fashion_and_ware",
    handle: "@fashion_and_ware",
    accent: "#833AB4",
  },
];

export const instagramChannels = contactChannels.filter(
  (c) => c.icon === "instagram" || c.id.startsWith("instagram"),
);

export const storeInfo = {
  brand: "SHOPVERSE",
  tagline: "Fashion for every moment.",
  hours: "Mon–Sat · 10am–8pm",
  location: "Available nationwide · Delivery & pickup",
};
