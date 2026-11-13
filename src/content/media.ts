/**
 * MEDIA MANIFEST
 * ---------------------------------------------------------------
 * Every photo and video on the site is referenced from here — and only here.
 * All media shows Indian players / Indian venues (/public/media/in).
 * To switch to AXONO's own footage, drop new files into /public/media/in
 * and update the paths below. Nothing else needs to change.
 *
 * Videos: MP4 (H.264), 6–15 s, 720p–1080p, ideally under ~8 MB.
 * A sport without a video (mp4 omitted) shows its photo with a slow
 * cinematic zoom instead. Posters are always required — they're shown on
 * mobile / data-saver / reduced-motion and if a video fails.
 *
 * Sources & licences: /public/media/CREDITS.md
 */

export type ImageAsset = { src: string; alt: string };
export type VideoAsset = { mp4?: string; webm?: string; poster: string };

const img = (file: string, alt: string): ImageAsset => ({ src: `/media/in/images/${file}`, alt });

export const images = {
  badminton1: img("badminton-1.jpg", "Badminton player celebrating a winning point in an indoor hall"),
  badminton2: img("badminton-2.jpg", "Young badminton player on an indoor court with a game in progress behind him"),
  cricket1: img("cricket-1.jpg", "Batter playing a big sweep shot at a local cricket tournament"),
  football1: img("football-v2.jpg", "Two footballers contesting the ball in a college match in Chennai"),
  intro: img("intro.jpg", "Batter playing a shot at a weekend cricket tournament in India"),
  pickleball1: img("pickleball-v2.jpg", "Pickleball paddle and ball on a blue court"),
  padelCourt: img("padel-v2.jpg", "Padel rackets and balls on a blue court"),
  friends: img("friends-v2.jpg", "Cricket teammates hugging and laughing as they celebrate a wicket"),
  celebration: img("celebration.jpg", "Cricketer celebrating with his bat raised as teammates cheer"),
  venue: img("venue.jpg", "Aerial view of turf football pitches and courts at a sports facility in Bangalore"),
} satisfies Record<string, ImageAsset>;

const vid = (file: string | null, poster: ImageAsset): VideoAsset => ({
  mp4: file ? `/media/in/videos/${file}.mp4` : undefined,
  poster: poster.src,
});

export const videos = {
  badminton: vid("badminton-v2", images.badminton1),
  cricket: vid("cricket", images.cricket1),
  football: vid("football", images.football1),
  // No licensable footage of Indian pickleball exists — photo with a cinematic zoom.
  // Padel: aerial clip, players too small to identify. Swap in AXONO's own clips here.
  pickleball: vid(null, images.pickleball1),
  padel: vid("padel-v2", images.padelCourt),
} satisfies Record<string, VideoAsset>;
