import { images, videos, type ImageAsset, type VideoAsset } from "./media";

export type SportSlug = "badminton" | "cricket" | "football" | "pickleball" | "padel";

export type Sport = {
  slug: SportSlug;
  index: string;
  name: string;
  tagline: string;
  image: ImageAsset;
  video: VideoAsset;
};

export const sports: Sport[] = [
  { slug: "badminton", index: "01", name: "Badminton", tagline: "Every smash. Every rally. Every winning point.", image: images.badminton1, video: videos.badminton },
  { slug: "cricket", index: "02", name: "Turf Cricket", tagline: "Your best shots deserve a replay.", image: images.cricket1, video: videos.cricket },
  { slug: "football", index: "03", name: "Turf Football", tagline: "Every goal. Every save. Every celebration.", image: images.football1, video: videos.football },
  { slug: "pickleball", index: "04", name: "Pickleball", tagline: "Fast rallies. Big moments. Every shot captured.", image: images.pickleball1, video: videos.pickleball },
  { slug: "padel", index: "05", name: "Padel", tagline: "Every wall rebound. Every winning rally.", image: images.padelCourt, video: videos.padel },
];
