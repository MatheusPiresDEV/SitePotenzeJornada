import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProductCategories } from '../components/ProductCategories';
import { Products } from '../components/Products';
import { Partners } from '../components/Partners';
import { CTA } from '../components/CTA';

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ProductCategories />
      <Products />
      <Partners />
      <CTA />
    </>
  );
}
