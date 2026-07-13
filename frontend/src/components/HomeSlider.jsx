import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HomeSlider.css';

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
      title: 'End of Reason Sale',
      subtitle: '40-80% OFF',
      category: 'BIGGEST DEALS ON TOP BRANDS',
      color: '#ff3f6c'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600',
      title: 'Premium Brands',
      subtitle: 'Flat 50% OFF',
      category: 'ONLY FOR TODAY',
      color: '#03a685'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600',
      title: 'Summer Collection',
      subtitle: 'NEW ARRIVALS',
      category: 'UP TO 30% OFF',
      color: '#3e4152'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600',
      title: 'Accessories Fest',
      subtitle: 'MIN. 40% OFF',
      category: 'WATCHES, BAGS & MORE',
      color: '#fb5607'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83e26b71?auto=format&fit=crop&q=80&w=1600',
      title: 'Workwear Special',
      subtitle: 'FLAT 60% OFF',
      category: 'FORMAL WEAR ESSENTIALS',
      color: '#2a9d8f'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-slider">
      <div 
        className="slider-container" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h3>{slide.category}</h3>
              <h2>{slide.title}</h2>
              <h1>{slide.subtitle}</h1>
              <button className="shop-now-btn" style={{ backgroundColor: slide.color }}>
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-nav prev" onClick={prevSlide}>
        <ChevronLeft size={30} />
      </button>
      <button className="slider-nav next" onClick={nextSlide}>
        <ChevronRight size={30} />
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
