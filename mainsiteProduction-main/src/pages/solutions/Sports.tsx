import { useEffect } from 'react';
import { Link } from '../../router';
import {
  ArrowRight,
  Video,
  QrCode,
  Smartphone,
  Download,
  Layers,
  Wrench,
  Trophy,
  Users,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import FAQAccordion from '../../components/FAQAccordion';

/** Dedicated AXONO Sports site — linked from this page for the full player-facing experience. */
const SPORTS_SITE_URL = 'https://axonosports.vercel.app';

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const sportsCovered = [
  { name: 'Badminton', desc: 'Every smash, rally and winning point.', image: '/images/sports_eq_badminton.webp' },
  { name: 'Turf Cricket', desc: 'Your best shots, ready to replay.', image: '/images/sports_eq_cricket3.webp' },
  { name: 'Turf Football', desc: 'Every goal, save and celebration.', image: '/images/sports_eq_football.webp' },
  { name: 'Pickleball', desc: 'Fast rallies, every shot captured.', image: '/images/sports_pickleball.webp' },
  { name: 'Padel', desc: 'Every wall rebound and winning rally.', image: '/images/sports_padel.webp' },
];

export default function SportsSolution() {
  useReveal();

  return (
    <div className="pt-14 bg-white">
      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden">
        <img
          src="/images/sports_hero4.webp"
          alt="Camera recording a badminton match, with the live game and REC indicator on its screen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-widest border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 rounded-full mb-6">
              GameTape
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Every match recorded. Replay it with one scan.
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8 max-w-lg">
              Cameras installed at your sports venue record every game automatically. After the match, players scan the QR code at the court to watch and download their game.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary px-7 py-3.5 text-sm group">
                Request a Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={SPORTS_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary px-7 py-3.5 text-sm">
                Visit AXONO Sports <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link to="/" className="hover:text-teal-500 transition-colors">Home</Link>
            <span>/</span>
            <span>Solutions</span>
            <span>/</span>
            <span className="text-neutral-700 font-medium">GameTape</span>
          </div>
        </div>
      </div>

      {/* Sports we cover */}
      <section className="py-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-3">Sports We Cover</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-4">
              One recording platform for every sport
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              From indoor courts to outdoor turfs, the same simple experience: play, scan and replay.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {sportsCovered.map((s, i) => (
              <div key={s.name} className={`reveal reveal-delay-${i + 1} group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden card-hover`}>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-neutral-900 mb-1.5">{s.name}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-4">How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-8">
                Three simple steps. Your game, saved.
              </h2>
              <div className="space-y-8">
                {[
                  { num: '01', title: 'Play', desc: 'Players book their court and play as usual. Cameras installed at the venue record the match automatically — no one has to press record.' },
                  { num: '02', title: 'Scan', desc: 'When the game ends, players scan the QR code displayed at their court or playing area with their phone camera.' },
                  { num: '03', title: 'Relive', desc: 'The match recording opens on their phone. They can watch their best moments and download the full game to keep or share.' },
                ].map((s) => (
                  <div key={s.num} className="flex gap-5">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-white font-mono text-xs font-bold">{s.num}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1.5">{s.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative reveal-right">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/sports_how3.webp"
                  alt="The match records automatically, players scan the court QR code, and the recording downloads to their phone"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="py-20 border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight">What players get</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Video, title: 'Every moment captured', desc: 'Matches are recorded automatically from start to finish, so no rally, shot or goal is missed.' },
              { icon: QrCode, title: 'Simple QR access', desc: 'Players scan the code at their court to reach their recording — no complicated steps.' },
              { icon: Smartphone, title: 'Watch on any phone', desc: 'Recordings open right on the player\'s phone, ready to watch the moment the game ends.' },
              { icon: Download, title: 'Easy downloads', desc: 'Download the full match to keep it, share it with friends or send it to a coach.' },
              { icon: Layers, title: 'Multiple sports', desc: 'Badminton, turf cricket, turf football, pickleball and padel — one experience across every sport.' },
              { icon: Wrench, title: 'Installed and managed by Axono', desc: 'Our team handles camera installation and setup at the venue, so there\'s nothing for your staff to run.' },
            ].map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm card-hover`}>
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For venues */}
      <section className="bg-neutral-950 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/6 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl animate-blob-delay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left">
              <p className="text-xs uppercase tracking-widest text-teal-500 font-semibold mb-4">For Sports Venues</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-6">
                Bring your venue<br />into the game
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Give your customers an experience worth coming back for. With Axono, sports venues can offer automated match recording and convenient video access, making every booking more memorable.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Badminton academies and courts',
                  'Turf cricket and football facilities',
                  'Pickleball venues and padel clubs',
                  'Multi-sport facilities',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-neutral-400">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-outline-teal px-7 py-3 text-sm group">
                Partner with Axono <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="reveal-right">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img src="/images/sports_venue.webp" alt="Turf pitches and courts at a sports facility" className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <span className="text-sm font-semibold text-white">Multi-sport facilities</span>
                  <p className="text-xs text-neutral-300 mt-0.5">Recording across every court and turf</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Sparkles, title: 'Enhance customer experience' },
                  { icon: Trophy, title: 'Differentiate your venue' },
                  { icon: Users, title: 'Increase player engagement' },
                  { icon: TrendingUp, title: 'Offer recording as a service' },
                ].map((b) => (
                  <div key={b.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <b.icon size={18} className="text-teal-500 mb-3" />
                    <p className="text-sm font-medium text-white leading-snug">{b.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-3">FAQ</p>
            <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight">Common questions</h2>
          </div>
          <div className="reveal">
            <FAQAccordion items={[
              { question: 'Do players need any equipment?', answer: 'No. Cameras are installed at participating venues. Players simply play their game as usual and scan the QR code at their court when they finish.' },
              { question: 'How do players get their match recording?', answer: 'After the game, they scan the QR code displayed at their court or playing area with their phone camera. It takes them to their match recording, where they can watch and download it.' },
              { question: 'Can players download and share their match?', answer: 'Yes. Recordings can be downloaded to the player\'s phone and shared with teammates, friends or a coach.' },
              { question: 'Which sports are supported?', answer: 'Badminton, turf cricket, turf football, pickleball and padel — with more recreational and competitive sports to follow. The process is the same for every sport.' },
              { question: 'How does a venue get started?', answer: 'Contact our team with details of your venue, courts and the sports you host. We\'ll talk through the right recording setup for each playing area.' },
            ]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-950 rounded-2xl px-8 sm:px-16 py-16 text-center relative overflow-hidden reveal">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Ready to bring match recording to your venue?
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto mb-10">
                Talk to our team about your courts and turfs, and we'll recommend the right recording setup for your venue.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary px-8 py-3.5 text-sm group inline-flex">
                  Request a Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={SPORTS_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary px-8 py-3.5 text-sm">
                  Visit AXONO Sports <ExternalLink size={14} />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                <span className="text-neutral-500">Other solutions:</span>
                <Link to="/solutions/water" className="text-teal-500 hover:text-teal-400 flex items-center gap-1.5 transition-colors">Water Metering <ArrowRight size={12} /></Link>
                <Link to="/solutions/agriculture" className="text-teal-500 hover:text-teal-400 flex items-center gap-1.5 transition-colors">Agriculture <ArrowRight size={12} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
