import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RibbonBow, Scribble } from './components/icons';
import { ShoppingBag, X, Gift, Package, Mail, Phone, MapPin, Instagram, Facebook, HelpCircle } from 'lucide-react';
import CheckoutPage from './components/CheckoutPage';
import PoliciesPage from './components/PoliciesPage';
import ShopPage from './components/ShopPage';
import HowToPage from './components/HowToPage';
import EjsToysPage from './components/EjsToysPage';
import { INVENTORY_CATEGORIES } from './lib/inventory';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [view, setView] = useState<'home' | 'checkout' | 'policies' | 'shop' | 'how-to' | 'ejs-toys'>('home');
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const section7Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.3 });
      
      heroTl.from('.hero-photo', {
        x: '-12vw',
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: 'power2.out'
      })
      .from('.hero-ribbon', {
        y: '-100vh',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.7')
      .from('.hero-bow', {
        y: '-40vh',
        scale: 0.85,
        rotate: -8,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.hero-headline span', {
        y: 40,
        rotate: -3,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.hero-subtext', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .from('.hero-cta', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');

      // Hero scroll exit animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-photo', {
              x: -18 * exitProgress + 'vw',
              rotate: -6 * exitProgress,
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.hero-ribbon', {
              x: -12 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.8
            });
            gsap.set('.hero-bow', {
              y: -30 * exitProgress + 'vh',
              rotate: 10 * exitProgress,
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.hero-text-content', {
              x: 10 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          }
        }
      });

      // Section 2 - New Collection
      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          // Entrance (0-30%)
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s2-card', {
              x: -60 * (1 - enterProgress) + 'vw',
              scale: 0.85 + 0.15 * enterProgress,
              rotate: -10 * (1 - enterProgress),
              opacity: enterProgress
            });
            gsap.set('.s2-ribbon', {
              y: -100 * (1 - Math.min(enterProgress * 1.2, 1)) + 'vh',
              opacity: Math.min(enterProgress * 1.2, 1)
            });
            gsap.set('.s2-bow', {
              x: 40 * (1 - Math.min((enterProgress - 0.25) * 1.5, 1)) + 'vw',
              scale: 0.7 + 0.3 * Math.min((enterProgress - 0.25) * 1.5, 1),
              rotate: 12 * (1 - Math.min((enterProgress - 0.25) * 1.5, 1)),
              opacity: Math.max(0, (enterProgress - 0.25) * 1.5)
            });
            gsap.set('.s2-text', {
              x: 30 * (1 - Math.min((enterProgress - 0.3) * 2, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.3) * 2)
            });
          }
          // Exit (70-100%)
          else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s2-card', {
              x: -20 * exitProgress + 'vw',
              rotate: -8 * exitProgress,
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s2-ribbon', {
              x: 10 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.8
            });
            gsap.set('.s2-bow', {
              x: 20 * exitProgress + 'vw',
              y: -10 * exitProgress + 'vh',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s2-text', {
              x: 8 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          }
          // Settle (30-70%)
          else {
            gsap.set('.s2-card', { x: 0, scale: 1, rotate: 0, opacity: 1 });
            gsap.set('.s2-ribbon', { y: 0, x: 0, opacity: 1 });
            gsap.set('.s2-bow', { x: 0, scale: 1, rotate: 0, opacity: 1 });
            gsap.set('.s2-text', { x: 0, opacity: 1 });
          }
        }
      });

      // Section 3 - Trendy Bow
      ScrollTrigger.create({
        trigger: section3Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s3-photo', {
              x: -70 * (1 - enterProgress) + 'vw',
              opacity: enterProgress,
              scale: 0.92 + 0.08 * enterProgress
            });
            gsap.set('.s3-ribbon', {
              y: -100 * (1 - Math.min(enterProgress * 1.1, 1)) + 'vh',
              opacity: Math.min(enterProgress * 1.1, 1)
            });
            gsap.set('.s3-bow', {
              x: 50 * (1 - Math.min((enterProgress - 0.25) * 1.5, 1)) + 'vw',
              scale: 0.75 + 0.25 * Math.min((enterProgress - 0.25) * 1.5, 1),
              rotate: -14 * (1 - Math.min((enterProgress - 0.25) * 1.5, 1)),
              opacity: Math.max(0, (enterProgress - 0.25) * 1.5)
            });
            gsap.set('.s3-text', {
              x: 40 * (1 - Math.min((enterProgress - 0.3) * 2, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.3) * 2)
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s3-photo', {
              x: -18 * exitProgress + 'vw',
              y: 10 * exitProgress + 'vh',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s3-ribbon', {
              x: -10 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.8
            });
            gsap.set('.s3-bow', {
              y: -20 * exitProgress + 'vh',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s3-text', {
              x: 12 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          } else {
            gsap.set('.s3-photo', { x: 0, y: 0, opacity: 1, scale: 1 });
            gsap.set('.s3-ribbon', { y: 0, x: 0, opacity: 1 });
            gsap.set('.s3-bow', { x: 0, scale: 1, rotate: 0, opacity: 1 });
            gsap.set('.s3-text', { x: 0, opacity: 1 });
          }
        }
      });

      // Section 4 - Fashion Sale
      ScrollTrigger.create({
        trigger: section4Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s4-photo-top', {
              x: -60 * (1 - enterProgress) + 'vw',
              y: -20 * (1 - enterProgress) + 'vh',
              opacity: enterProgress
            });
            gsap.set('.s4-photo-bottom', {
              x: -60 * (1 - Math.min((enterProgress - 0.15) * 1.5, 1)) + 'vw',
              y: 20 * (1 - Math.min((enterProgress - 0.15) * 1.5, 1)) + 'vh',
              opacity: Math.max(0, (enterProgress - 0.15) * 1.5)
            });
            gsap.set('.s4-ribbon', {
              y: -100 * (1 - Math.min(enterProgress * 1.1, 1)) + 'vh',
              opacity: Math.min(enterProgress * 1.1, 1)
            });
            gsap.set('.s4-bow', {
              scale: 0.8 + 0.2 * Math.min(enterProgress * 1.5, 1),
              rotate: -10 * (1 - Math.min(enterProgress * 1.5, 1)),
              opacity: Math.min(enterProgress * 1.5, 1)
            });
            gsap.set('.s4-card', {
              x: 60 * (1 - enterProgress) + 'vw',
              rotate: 6 * (1 - enterProgress),
              opacity: enterProgress
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s4-photo-top, .s4-photo-bottom', {
              x: -14 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s4-ribbon, .s4-bow', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s4-card', {
              x: 18 * exitProgress + 'vw',
              y: -10 * exitProgress + 'vh',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          } else {
            gsap.set('.s4-photo-top, .s4-photo-bottom', { x: 0, y: 0, opacity: 1 });
            gsap.set('.s4-ribbon', { y: 0, opacity: 1 });
            gsap.set('.s4-bow', { scale: 1, rotate: 0, opacity: 1 });
            gsap.set('.s4-card', { x: 0, rotate: 0, opacity: 1 });
          }
        }
      });

      // Section 5 - Exclusive
      ScrollTrigger.create({
        trigger: section5Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s5-banner', {
              x: -80 * (1 - enterProgress) + 'vw',
              opacity: enterProgress
            });
            gsap.set('.s5-banner-text', {
              x: -20 * (1 - Math.min((enterProgress - 0.25) * 2, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.25) * 2)
            });
            gsap.set('.s5-model', {
              x: 70 * (1 - enterProgress) + 'vw',
              scale: 0.92 + 0.08 * enterProgress,
              opacity: enterProgress
            });
            gsap.set('.s5-right-ribbon', {
              y: 100 * (1 - Math.min(enterProgress * 1.2, 1)) + 'vh',
              opacity: Math.min(enterProgress * 1.2, 1)
            });
            gsap.set('.s5-bow', {
              y: -30 * (1 - Math.min((enterProgress - 0.15) * 1.5, 1)) + 'vh',
              scale: 0.8 + 0.2 * Math.min((enterProgress - 0.15) * 1.5, 1),
              opacity: Math.max(0, (enterProgress - 0.15) * 1.5)
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s5-banner', {
              x: -20 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s5-banner-text', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.8
            });
            gsap.set('.s5-model', {
              x: 18 * exitProgress + 'vw',
              y: 10 * exitProgress + 'vh',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s5-right-ribbon, .s5-bow', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          } else {
            gsap.set('.s5-banner', { x: 0, opacity: 1 });
            gsap.set('.s5-banner-text', { x: 0, opacity: 1 });
            gsap.set('.s5-model', { x: 0, scale: 1, opacity: 1 });
            gsap.set('.s5-right-ribbon', { y: 0, opacity: 1 });
            gsap.set('.s5-bow', { y: 0, scale: 1, opacity: 1 });
          }
        }
      });

      // Section 6 - Stylish Bows Gallery
      ScrollTrigger.create({
        trigger: section6Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s6-photo-1', {
              x: -60 * (1 - enterProgress) + 'vw',
              opacity: enterProgress
            });
            gsap.set('.s6-photo-2', {
              x: -60 * (1 - Math.min((enterProgress - 0.06) * 1.5, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.06) * 1.5)
            });
            gsap.set('.s6-photo-3', {
              x: -60 * (1 - Math.min((enterProgress - 0.12) * 1.5, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.12) * 1.5)
            });
            gsap.set('.s6-ribbon', {
              y: -100 * (1 - Math.min(enterProgress * 1.1, 1)) + 'vh',
              opacity: Math.min(enterProgress * 1.1, 1)
            });
            gsap.set('.s6-bow', {
              scale: 0.8 + 0.2 * Math.min((enterProgress - 0.15) * 1.5, 1),
              opacity: Math.max(0, (enterProgress - 0.15) * 1.5)
            });
            gsap.set('.s6-text', {
              x: 40 * (1 - Math.min((enterProgress - 0.3) * 2, 1)) + 'vw',
              opacity: Math.max(0, (enterProgress - 0.3) * 2)
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s6-photo-1, .s6-photo-2, .s6-photo-3', {
              x: -14 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s6-ribbon, .s6-bow', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s6-text', {
              x: 12 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          } else {
            gsap.set('.s6-photo-1, .s6-photo-2, .s6-photo-3', { x: 0, opacity: 1 });
            gsap.set('.s6-ribbon', { y: 0, opacity: 1 });
            gsap.set('.s6-bow', { scale: 1, opacity: 1 });
            gsap.set('.s6-text', { x: 0, opacity: 1 });
          }
        }
      });

      // Section 7 - Latest Collection
      ScrollTrigger.create({
        trigger: section7Ref.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self: any) => {
          const progress = self.progress;
          
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.s7-left', {
              x: -70 * (1 - enterProgress) + 'vw',
              opacity: enterProgress
            });
            gsap.set('.s7-right', {
              x: 70 * (1 - enterProgress) + 'vw',
              opacity: enterProgress
            });
            gsap.set('.s7-ribbon', {
              y: -100 * (1 - Math.min((enterProgress - 0.05) * 1.2, 1)) + 'vh',
              opacity: Math.min((enterProgress - 0.05) * 1.2, 1)
            });
            gsap.set('.s7-bow', {
              scale: 0.8 + 0.2 * Math.min((enterProgress - 0.15) * 1.5, 1),
              opacity: Math.max(0, (enterProgress - 0.15) * 1.5)
            });
            gsap.set('.s7-text', {
              y: 40 * (1 - Math.min((enterProgress - 0.2) * 2, 1)) + 'px',
              opacity: Math.max(0, (enterProgress - 0.2) * 2)
            });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.s7-left', {
              x: -16 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s7-right', {
              x: 16 * exitProgress + 'vw',
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s7-ribbon, .s7-bow', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
            gsap.set('.s7-text', {
              opacity: progress > 0.95 ? 0 : 1 - exitProgress * 0.75
            });
          } else {
            gsap.set('.s7-left', { x: 0, opacity: 1 });
            gsap.set('.s7-right', { x: 0, opacity: 1 });
            gsap.set('.s7-ribbon', { y: 0, opacity: 1 });
            gsap.set('.s7-bow', { scale: 1, opacity: 1 });
            gsap.set('.s7-text', { y: 0, opacity: 1 });
          }
        }
      });

      // Contact section (flowing, not pinned)
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 0.4
        },
        x: '-8vw',
        opacity: 0
      });

      gsap.from('.contact-image', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 0.4
        },
        x: '10vw',
        rotate: 3,
        opacity: 0
      });

      // Global snap for pinned sections
      const pinned = ScrollTrigger.getAll()
        .filter((st: any) => st.vars.pin)
        .sort((a: any, b: any) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (maxScroll && pinned.length > 0) {
        const pinnedRanges = pinned.map((st: any) => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some((r: any) => value >= r.start - 0.02 && value <= r.end + 0.02);
              if (!inPinned) return value;
              
              const target = pinnedRanges.reduce((closest: any, r: any) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out'
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('hidden');
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    toggleMenu();
  };

  // Scroll lock removed because it freezes GSAP ScrollTriggers on the homepage

  return (
    <>
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.JPG" alt="Jazzyz Bowtique Logo" className="h-10 w-10 object-cover rounded-full shadow-sm border-2 border-white shrink-0" />
          <span className="font-display text-2xl text-blue-accent pt-1 whitespace-nowrap">
            Jazzyz Bowtique
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setView('how-to')} 
            className="flex items-center justify-center h-10 px-3 sm:px-4 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow border border-pink-200 text-pink-600 text-sm font-bold gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">How to Shop</span>
          </button>
          <button onClick={() => setView('checkout')} className="flex items-center justify-center p-2 h-10 w-10 text-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
            <ShoppingBag className="w-5 h-5 text-blue-accent" />
          </button>
          <button 
            onClick={toggleMenu}
            className="h-10 px-4 sm:px-5 rounded-full border-2 border-blue-accent text-blue-accent font-label font-semibold text-sm uppercase tracking-wider hover:bg-blue-accent hover:text-white transition-colors"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div ref={menuRef} className="hidden fixed inset-0 z-[999] bg-pink-primary">
        <button 
          onClick={toggleMenu}
          className="absolute top-4 right-6 p-2"
        >
          <X className="w-8 h-8 text-blue-accent" />
        </button>
        <div className="h-full w-full overflow-y-auto custom-scrollbar flex flex-col items-center justify-start gap-8 py-24 px-6">
          <button
              onClick={() => { setView('how-to'); toggleMenu(); }}
              className="font-display text-4xl text-pink-primary hover:text-white transition-colors bg-blue-accent px-6 py-2 rounded-full mb-4 shadow-lg flex items-center justify-center gap-3"
          >
              <HelpCircle className="w-8 h-8 lg:w-10 lg:h-10" />
              How it works
          </button>
          <button
              onClick={() => { setView('ejs-toys'); toggleMenu(); }}
              className="font-display text-4xl text-yellow-300 hover:text-yellow-100 transition-colors bg-blue-accent px-6 py-2 rounded-full mb-4 shadow-lg flex items-center justify-center gap-3"
          >
              EJ's Toys
          </button>
          {[
            { label: 'Home', ref: heroRef },
            { label: 'Shop With Us', ref: section2Ref },
            { label: 'Custom Orders', ref: section3Ref },
            { label: 'Wholesale', ref: section5Ref },
            { label: 'Promotions & Membership', ref: section4Ref },
            { label: 'About Us', ref: section6Ref },
            { label: 'Contact Us', ref: contactRef },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.ref)}
              className="font-display text-4xl text-blue-accent hover:text-pink-dark transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned bg-pink-primary z-10">
        {/* Hero Photo Card */}
        <div className="hero-photo absolute left-[6vw] top-[14vh] w-[34vw] h-[72vh] photo-card overflow-hidden">
          <img 
            src="/hero_model.jpg" 
            alt="Fashion model with bow" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="hero-ribbon absolute left-[44vw] top-0 w-[10vw] h-full bg-blue-accent -rotate-2 shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="hero-bow absolute left-[38vw] top-[6vh] w-[22vw] animate-float">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Text Content */}
        <div className="hero-text-content absolute left-[58vw] top-[26vh] w-[36vw]">
          <h1 className="hero-headline font-display text-blue-accent leading-[0.85] text-[clamp(48px,8vw,120px)] flex flex-col">
            <span>jazzyz</span>
            <div className="flex items-center">
              <span>bowtique</span>
              <span className="text-4xl lg:text-7xl ml-2">🎀</span>
            </div>
          </h1>
          <Scribble className="w-32 mt-2" variant="curl" />
          
          <p className="hero-subtext mt-8 text-lg text-gray-700 max-w-md leading-relaxed">
            A fun, colorful bowtique experience combining custom products, stylish accessories, and surprise mystery items. Every order feels like opening a gift 🎁.
          </p>
          
          <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setView('checkout')} className="btn-pill bg-blue-accent text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop With Us
            </button>
            <button onClick={() => setView('how-to')} className="btn-pill bg-white text-pink-600 border-2 border-pink-200 hover:bg-pink-50 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              How it works
            </button>
          </div>
          
          <p className="hero-cta mt-4 text-sm text-gray-600 flex items-center gap-2">
            <Gift className="w-4 h-4" />
            First-Time Orders: Receive a $40 value gift bag!
          </p>
        </div>
      </section>

      {/* Section 2: New Collection */}
      <section ref={section2Ref} className="section-pinned bg-pink-primary z-20">
        {/* Scalloped Card */}
        <div className="s2-card absolute left-[10vw] top-[16vh] w-[46vw] h-[68vh] overflow-hidden rounded-[50%] border-[10px] border-blue-accent bg-white shadow-card">
          <img 
            src="/newcollection.jpg" 
            alt="New collection" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="s2-ribbon absolute left-[54vw] top-0 w-[8vw] h-full bg-blue-accent rotate-2 shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s2-bow absolute left-[50vw] top-[34vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Text Content */}
        <div className="s2-text absolute left-[64vw] top-[30vh] w-[30vw]">
          <h2 className="font-display text-blue-accent leading-[0.9] text-[clamp(40px,6vw,90px)]">
            shop with us
          </h2>
          <Scribble className="w-24 mt-2" variant="zigzag" />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {INVENTORY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById(`cat-${category.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                  setView('shop');
                }}
                className="flex items-center gap-3 p-4 bg-white/50 border-2 border-pink-100 hover:border-pink-400 hover:bg-white rounded-2xl transition-all shadow-sm hover:shadow-md text-left group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-xl group-hover:scale-110 transition-transform">
                  {category.name.split(' ')[0]} {/* Emoji */}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                    {category.name.replace(/^[\u{1F300}-\u{1F9FF}] /u, '')}
                  </div>
                  <div className="text-xs text-pink-500 font-medium mt-0.5">
                    {category.items.length} Items &rarr;
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Trendy Bow */}
      <section ref={section3Ref} className="section-pinned bg-pink-primary z-30">
        {/* Stacked Photo Card */}
        <div className="s3-photo absolute left-[7vw] top-[18vh] w-[40vw] h-[64vh] photo-card overflow-hidden">
          <img 
            src="/trendybow.jpg" 
            alt="Trendy bow fashion" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="s3-ribbon absolute left-[46vw] top-0 w-[9vw] h-full bg-blue-accent -rotate-1 shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s3-bow absolute left-[42vw] top-[38vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Text Content */}
        <div className="s3-text absolute left-[62vw] top-[32vh] w-[32vw]">
          <h2 className="font-display text-blue-accent leading-[0.9] text-[clamp(40px,6vw,90px)]">
            custom orders
          </h2>
          <Scribble className="w-28 mt-2" />
          
          <ul className="mt-8 text-gray-700 leading-relaxed space-y-3 font-medium">
            <li>✨ Custom Tumblers</li>
            <li>✨ Personalized Shirts</li>
            <li>✨ Beautiful Roses & Bouquets</li>
            <li>✨ Graduation Leis</li>
            <li>✨ Specialty Cups</li>
          </ul>
          
          <button 
            onClick={() => {
              setActiveCategory('✨ Custom Orders');
              setView('checkout');
            }}
            className="mt-8 text-blue-accent font-label font-semibold uppercase tracking-wider text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            Start a custom order
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Section 4: Fashion Sale */}
      <section ref={section4Ref} className="section-pinned bg-pink-primary z-40">
        {/* Top Left Photo */}
        <div className="s4-photo-top absolute left-[6vw] top-[10vh] w-[26vw] h-[34vh] photo-card overflow-hidden">
          <img 
            src="/sale_look_a.jpg" 
            alt="Sale look 1" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Bottom Left Photo */}
        <div className="s4-photo-bottom absolute left-[6vw] top-[54vh] w-[26vw] h-[36vh] photo-card overflow-hidden">
          <img 
            src="/sale_look_b.jpg" 
            alt="Sale look 2" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="s4-ribbon absolute left-[34vw] top-0 w-[9vw] h-full bg-blue-accent rotate-1 shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s4-bow absolute left-[30vw] top-[38vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Offer Card */}
        <div className="s4-card absolute left-[52vw] top-[18vh] w-[42vw] h-[64vh] bg-white border-[6px] border-white shadow-card overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="font-display text-blue-accent leading-[0.9] text-[clamp(28px,4vw,60px)]">
                promotions & memberships
              </h2>
              <Scribble className="w-24 mt-2" variant="zigzag" />
              
              <div className="mt-6 text-gray-800 leading-relaxed space-y-4">
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                  <p className="font-bold text-pink-600 md:text-lg flex items-center gap-2">🎉 Weekly Promotions</p>
                  <p className="text-sm mt-1">Enjoy exclusive new discounts and weekly deals only available on our site! Check back often for fresh specials.</p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                  <p className="font-bold text-pink-600 md:text-lg flex items-center gap-2">🎁 Monthly VIP Giveaway</p>
                  <p className="text-sm mt-1">Sign up for our membership to be automatically entered in our monthly giveaways and get early access to drops!</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 pl-2">Join the VIP List</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 border-2 border-pink-100 rounded-full focus:border-pink-400 outline-none text-sm transition-colors" 
                />
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent("VIP Subscription Request");
                    const body = encodeURIComponent(`Hello Jazzyz Bowtique,\n\nPlease add me to the VIP list!\n\nMy email is: ${subscribeEmail || '[Please enter your email]'}`);
                    window.location.href = `mailto:JazzyzBowtique@gmail.com?subject=${subject}&body=${body}`;
                    setSubscribeEmail('');
                  }}
                  className="btn-pill bg-blue-accent text-white hover:bg-blue-600 text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-center text-gray-400">
                Join our VIP club for free. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Exclusive */}
      <section ref={section5Ref} className="section-pinned bg-pink-primary z-50">
        {/* Ribbon Banner */}
        <div className="s5-banner absolute -left-[6vw] top-[18vh] w-[56vw] h-[22vh] bg-blue-accent -rotate-12 shadow-ribbon flex items-center justify-center">
          <h2 className="s5-banner-text font-display text-white text-[clamp(48px,7vw,100px)] leading-none">
            wholesale
          </h2>
        </div>
        
        {/* Caption */}
        <div className="absolute left-[6vw] top-[74vh] w-[40vw]">
          <p className="text-gray-700 leading-relaxed font-bold">
            Orders of 12 items or more qualify for wholesale!
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed text-sm">
            Pricing is $15 per dozen. Perfect for party favors, events, and resellers.
          </p>
          <button 
            onClick={() => {
              setActiveCategory('📦 Wholesale');
              setView('checkout');
            }}
            className="mt-4 text-blue-accent font-label font-semibold uppercase tracking-wider text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            Start Wholesale Order
            <span>→</span>
          </button>
        </div>
        
        {/* Model Card */}
        <div className="s5-model absolute left-[52vw] top-[14vh] w-[42vw] h-[72vh] photo-card overflow-hidden">
          <img 
            src="/exclusive_model.jpg" 
            alt="Exclusive model" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Vertical Ribbon */}
        <div className="s5-right-ribbon absolute right-0 top-0 w-[8vw] h-full bg-blue-accent shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s5-bow absolute right-[4vw] top-[6vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
      </section>

      {/* Section 6: Stylish Bows Gallery */}
      <section ref={section6Ref} className="section-pinned bg-pink-primary z-[60]">
        {/* Top Photo */}
        <div className="s6-photo-1 absolute left-[7vw] top-[8vh] w-[40vw] h-[26vh] photo-card overflow-hidden">
          <img 
            src="/gallery_a.jpg" 
            alt="Gallery 1" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Middle Photo */}
        <div className="s6-photo-2 absolute left-[7vw] top-[38vh] w-[40vw] h-[26vh] photo-card overflow-hidden">
          <img 
            src="/gallery_b.jpg" 
            alt="Gallery 2" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Bottom Photo */}
        <div className="s6-photo-3 absolute left-[7vw] top-[68vh] w-[40vw] h-[26vh] photo-card overflow-hidden">
          <img 
            src="/gallery_c.jpg" 
            alt="Gallery 3" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="s6-ribbon absolute left-[46vw] top-0 w-[9vw] h-full bg-blue-accent shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s6-bow absolute left-[42vw] top-[40vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Text Content */}
        <div className="s6-text absolute left-[62vw] top-[20vh] w-[34vw] h-[65vh] overflow-y-auto pr-4 custom-scrollbar flex flex-col gap-6">
          <div>
            <h2 className="font-display text-blue-accent leading-[0.9] text-[clamp(32px,5vw,70px)]">
              about us & policies
            </h2>
            <Scribble className="w-28 mt-2" variant="curl" />
          </div>
          
          <div className="text-gray-800 leading-relaxed space-y-4">
            <p className="text-sm font-medium italic text-pink-600">
              Welcome to Jazzyz Bowtique! We handcraft beautiful bows, custom drinkware, mystery boxes, and much more.
            </p>

            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
              <p className="font-bold text-pink-600 flex items-center gap-2">🚚 Shipping & Fulfillment</p>
              <ul className="list-none text-sm space-y-2 mt-2">
                <li className="flex items-start gap-2"><span>📍</span> <span><b>Local Pickup & Uber:</b> Santa Ana St & Wilcox (Mon-Sat 10am-5pm). Same-day pickup available!</span></li>
                <li className="flex items-start gap-2"><span>🚗</span> <span><b>Local Delivery:</b> Free delivery within 10 miles (Min order $40).</span></li>
                <li className="flex items-start gap-2"><span>📦</span> <span><b>Shipping:</b> Via Pirate Ship (Ground only, 1-3 days processing). <b>Free shipping over $50!</b> (Min $20 order)</span></li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="font-bold text-blue-accent flex items-center gap-2">🔁 Returns & Exchanges</p>
              <ul className="list-none text-sm space-y-2 mt-2">
                <li className="flex items-start gap-2"><span>❌</span> <span><b>No refunds.</b> All sales are final.</span></li>
                <li className="flex items-start gap-2"><span>🔄</span> <span><b>Exchanges:</b> Valid only within 7 days. Item must be returned to process exchange.</span></li>
              </ul>
            </div>
          </div>
          
          <button onClick={() => setView('checkout')} className="mt-2 btn-pill border-2 border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white shrink-0 self-start">
            Proceed to Checkout
          </button>
        </div>
      </section>

      {/* Section 7: Latest Collection */}
      <section ref={section7Ref} className="section-pinned bg-pink-primary z-[70]">
        {/* Left Photo Card */}
        <div className="s7-left absolute left-[6vw] top-[14vh] w-[40vw] h-[72vh] photo-card overflow-hidden">
          <img 
            src="/latest_left.jpg" 
            alt="Latest collection left" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vertical Ribbon */}
        <div className="s7-ribbon absolute left-[46vw] top-0 w-[9vw] h-full bg-blue-accent -rotate-1 shadow-ribbon" />
        
        {/* Ribbon Bow */}
        <div className="s7-bow absolute left-[42vw] top-[38vh] w-[18vw]">
          <RibbonBow className="w-full h-auto" />
        </div>
        
        {/* Right Photo Card */}
        <div className="s7-right absolute left-[54vw] top-[14vh] w-[40vw] h-[72vh] photo-card overflow-hidden">
          <img 
            src="/latest_right.jpg" 
            alt="Latest collection right" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Text */}
          <div className="s7-text absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
            <h2 className="font-display text-white leading-[0.9] text-[clamp(32px,4vw,64px)]">
              amazing customer experience
            </h2>
            <button onClick={() => setView('shop')} className="mt-6 btn-pill bg-pink-primary text-blue-accent w-fit flex items-center gap-2">
              <Package className="w-4 h-4" />
              Experience the Magic
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Contact / Footer */}
      <section ref={contactRef} className="relative bg-pink-dark min-h-screen z-[80] py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="contact-content">
            <h2 className="font-display text-white leading-[0.9] text-[clamp(48px,7vw,100px)]">
              contact us
            </h2>
            <Scribble className="w-32 mt-4" color="white" />
            
            <p className="mt-8 text-white/90 text-lg leading-relaxed">
              Have questions about your custom order or tracking info? We send instant confirmations and provide full shipping tracking on all orders! 
            </p>
            
            {/* Newsletter Form */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-accent/30"
              />
              <button 
                onClick={() => {
                  const subject = encodeURIComponent("VIP Subscription Request");
                  const body = encodeURIComponent(`Hello Jazzyz Bowtique,\n\nPlease add me to the VIP list!\n\nMy email is: ${subscribeEmail || '[Please enter your email]'}`);
                  window.location.href = `mailto:JazzyzBowtique@gmail.com?subject=${subject}&body=${body}`;
                  setSubscribeEmail('');
                }}
                className="btn-pill bg-blue-accent text-white whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5" />
                <span>JazzyzBowtique@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5" />
                <span>+1-323-250-5411 <span className="text-sm font-medium text-pink-300 ml-1">(Text message only)</span></span>
              </div>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-1 shrink-0" />
                <span className="leading-snug">
                  Local Pickup & Uber: <br className="hidden sm:block" />
                  Santa Ana St & Wilcox (Mon-Sat 10am-5pm). <br className="hidden sm:block" />
                  Same-day pickup available!
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Package className="w-5 h-5" />
                <span>Ships in 2–4 days</span>
              </div>
            </div>
            
            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-6">
              <button onClick={() => setView('policies')} className="text-white/70 hover:text-white transition-colors font-semibold">FAQ</button>
              <button onClick={() => setView('policies')} className="text-white/70 hover:text-white transition-colors font-semibold">Shipping</button>
              <button onClick={() => setView('policies')} className="text-white/70 hover:text-white transition-colors font-semibold">Returns</button>
              <button onClick={() => setView('policies')} className="text-white/70 hover:text-white transition-colors font-semibold">Privacy</button>
            </div>
          </div>
          
          {/* Image */}
          <div className="contact-image hidden lg:block">
            <div className="w-full h-[52vh] photo-card overflow-hidden">
              <img 
                src="/contact_image.jpg" 
                alt="Contact" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/20">
          <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2026 Jazzyz Bowtique. All rights reserved. <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Made by 103 Software Solutions LLC.
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@jazzyzbowtique?_r=1&_t=ZT-95IaOANtQPV" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-black hover:-translate-y-1 transition-all text-white shadow-sm" aria-label="TikTok">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.27-1.13 4.54-2.85 6.05-1.92 1.68-4.66 2.37-7.1 1.77-2.61-.63-4.81-2.62-5.59-5.18-.75-2.45-.19-5.22 1.48-7.23 1.51-1.81 3.9-2.86 6.22-2.82.02 1.34.02 2.68 0 4.02-1.28-.1-2.62.13-3.67.87-1.21.84-1.9 2.37-1.74 3.86.13 1.25.86 2.38 1.95 2.98 1.05.58 2.33.64 3.44.22 1.32-.5 2.19-1.81 2.23-3.21.03-4.32.02-8.63.02-12.95.03-1.4.03-2.8.03-4.2z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/jazzyzbowtique1?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-pink-500 hover:-translate-y-1 transition-all text-white shadow-sm" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/JazzyzBowtique001?mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-blue-600 hover:-translate-y-1 transition-all text-white shadow-sm" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    {view === 'checkout' && (
      <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto">
        <CheckoutPage onBack={() => { setView('home'); setActiveCategory(undefined); }} initialCategory={activeCategory} />
      </div>
    )}
    {view === 'policies' && (
      <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto w-full">
        <PoliciesPage onBack={() => setView('home')} />
      </div>
    )}
    {view === 'shop' && (
      <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto w-full">
        <ShopPage 
          onBack={() => setView('home')} 
          onCheckout={(catName) => {
            setActiveCategory(catName);
            setView('checkout');
          }} 
        />
      </div>
    )}
    {view === 'how-to' && (
      <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto w-full">
        <HowToPage onBack={() => setView('home')} onShop={() => setView('shop')} />
      </div>
    )}
    {view === 'ejs-toys' && (
      <div className="fixed inset-0 z-[2000] bg-white overflow-y-auto w-full">
        <EjsToysPage onBack={() => setView('home')} />
      </div>
    )}
    </>
  );
}

export default App;
