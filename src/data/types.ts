export type CategoryId = "ai-tools" | "health" | "education" | "kids";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface App {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  image: string;
  icon: string;
  iconBg: string;
  price: string;
  rating: number;
  ratingsCount: number;
  description: string;
  featured?: boolean;
  // Static display date for MyPlans' "Renews {date}" / "Expired {date}" line —
  // not a real subscribe timestamp, since there's no backend to record one.
  renewalDate: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: CategoryId;
  image: string;
  date: string;
  body: string[];
}
