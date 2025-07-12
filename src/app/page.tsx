import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCards from '../components/FeaturedCards';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import FAQ from '../components/FAQs';
import { ThemeProvider } from 'next-themes';
import './globals.css'; // Make sure Tailwind CSS is imported here

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen">
        <Header />
        <Hero />
        <FeaturedCards />
        <Categories />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
