import {
  type Icon as LucideIcon,
  Laptop,
  Moon,
  SunMedium,
  Github,
  Upload,
  User,
  Vegan,
  Nut,
  Croissant,
  Beef,
  Heart,
  Trash,
  X,
  LogOut,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  signOut: LogOut,
  close: X,
  trash: Trash,
  like: Heart,
  likeActive: Heart,
  carbs: Croissant,
  protein: Beef,
  fat: Nut,
  logo: Vegan,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  upload: Upload,
  user: User,
};
