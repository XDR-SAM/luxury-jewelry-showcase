'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  { name: 'Dawn Collection', tag: 'Diamond Engagement', price: 'From $12,000' },
  { name: 'Celestial', tag: '18K Gold Necklaces', price: 'From $4,800' },
  { name: 'Heritage', tag: 'Vintage-Inspired', price: 'From $8,500' },
  { name: 'Solaire', tag: 'Pearl & Diamond', price: 'From $6,200' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null); const imgRef = useRef<HTMLDivElement>(null); const headlineRef = useRef<HTMLHeadingElement>(null);
  const collectRef = useRef<HTMLDivElement>(null); const ctaRef = useRef<HTMLDivElement>(null); const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis(); lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, { x: 100, opacity: 0, duration: 2, ease: 'power4.out' });
      gsap.to(imgRef.current, { y: -8, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      const ws = headlineRef.current?.querySelectorAll('.word');
      if (ws) gsap.from(ws, { y: 60, opacity: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.5 });
      gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.2 });
    }, heroRef); return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = collectRef.current?.querySelectorAll('.coll-card');
      if (cards) gsap.from(cards, { y: 80, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: collectRef.current, start: 'top 65%' } });
    }, collectRef); return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ctaRef.current?.querySelectorAll('*');
      if (els) gsap.from(els, { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 70%' } });
    }, ctaRef); return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#faf8f5] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-4 md:py-5 flex justify-between items-center bg-[#faf8f5]/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.04)]">
        <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide gold-text">LUMIÈRE</div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest text-[rgba(0,0,0,0.7)]">
          {['COLLECTIONS', 'BESPOKE', 'HERITAGE'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#c9a96e] transition-colors">{item}</a>)}
        </div>
        <button className="hidden md:block bg-[#c9a96e] text-white text-xs tracking-widest font-bold px-5 py-3 hover:bg-[#b8965c] transition-colors rounded">BOOK APPOINTMENT</button>
        <button className="md:hidden w-10 h-10 flex items-center justify-center" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f5] pt-20 px-6 flex flex-col gap-6 md:hidden">
          {['COLLECTIONS', 'BESPOKE', 'HERITAGE'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="font-serif text-2xl font-bold" onClick={() => setMobileOpen(false)}>{item}</a>)}
          <button className="bg-[#c9a96e] text-white text-sm tracking-widest font-bold px-6 py-4 mt-4 rounded">BOOK APPOINTMENT</button>
        </div>
      )}

      <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="hero-sub text-[#c9a96e] text-xs tracking-[0.3em] mb-4">LUMIÈRE PARIS</p>
            <h1 ref={headlineRef} className="font-serif leading-none tracking-tight mb-6 md:mb-8">
              <span className="word block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem]">ETERNAL</span>
              <span className="word block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] gold-text">BRILLIANCE</span>
            </h1>
            <p className="hero-sub text-[rgba(0,0,0,0.7)] text-base sm:text-lg md:text-xl mb-8 max-w-md leading-relaxed">Since 1889. Master jewelers to the world.</p>
            <div className="hero-sub flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-[#1d1d1f] text-white text-xs tracking-widest font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#c9a96e] transition-colors rounded">DISCOVER</button>
              <button className="border border-[#c9a96e] text-[#c9a96e] text-xs tracking-widest font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#c9a96e] hover:text-white transition-all rounded">BOOK VIEWING</button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div ref={imgRef} className="w-full max-w-[420px] lg:max-w-none">
              <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80" alt="Jewelry" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section ref={collectRef} id="collections" className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c9a96e] text-xs tracking-[0.3em] text-center mb-4">THE COLLECTIONS</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16">Exceptional Craft</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {COLLECTIONS.map((c, i) => (
              <div key={c.name} className="coll-card group cursor-pointer">
                <div className="bg-[#faf8f5] rounded-lg overflow-hidden mb-4 h-56 sm:h-64 flex items-center justify-center p-4">
                  <img src={`https://images.unsplash.com/photo-${['1605100804763-247f67b3557e','1515562141207-7a88fb7ce338','1603561591411-0714345c0241','1602176272684-a4016f8e77b4'][i]}?w=400&q=80`} alt={c.name} className="h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">{c.name}</h3>
                <p className="text-xs text-[rgba(0,0,0,0.5)] mb-2">{c.tag}</p>
                <div className="text-sm text-[#c9a96e] font-bold">{c.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bespoke" className="py-20 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <img src="https://images.unsplash.com/photo-1603561591411-0714345c0241?w=700&q=80" alt="Craftsmanship" className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg order-2 lg:order-1" />
          <div className="order-1 lg:order-2">
            <p className="text-[#c9a96e] text-xs tracking-[0.3em] mb-4">BESPOKE</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">Made for You</h2>
            <p className="text-[rgba(0,0,0,0.7)] leading-relaxed mb-8 text-sm sm:text-base">Our master jewelers work with you to create a one-of-a-kind piece. From selecting the perfect gemstone to hand-crafting the setting, every detail is meticulously considered.</p>
            <button className="bg-[#1d1d1f] text-white text-xs tracking-widest font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#c9a96e] transition-colors rounded">START YOUR JOURNEY</button>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-[#1d1d1f] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">Your Piece Awaits</h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto">Schedule a private consultation at our Paris flagship</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input type="email" placeholder="Your email" className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 text-white text-sm sm:text-base rounded outline-none w-full sm:w-80 placeholder:text-[rgba(255,255,255,0.4)]" />
            <button className="bg-[#c9a96e] text-white font-bold text-xs tracking-widest px-6 sm:px-8 py-3 sm:py-4 rounded hover:bg-[#b8965c] transition-colors whitespace-nowrap">REQUEST VIEWING</button>
          </div>
        </div>
      </section>

      <footer className="py-8 md:py-12 px-4 sm:px-6 md:px-10 border-t border-[rgba(0,0,0,0.06)] bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-serif text-2xl sm:text-3xl font-bold tracking-wide gold-text mb-4">LUMIÈRE</div>
          <p className="text-[rgba(0,0,0,0.4)] text-xs sm:text-sm">© 2026 Lumière Paris. Place Vendôme.</p>
        </div>
      </footer>
    </main>
  );
}