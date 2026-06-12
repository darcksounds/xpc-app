import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../sanity/queries'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'

  return (
    <div>
      <Hero />
      <Categories />

      <div style={{padding:'2rem', maxWidth:'1400px', margin:'0 auto'}}>
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:'1.5rem'
        }}>
          <div style={{display:'flex', alignItems:'center'}}>
            <div style={{
              width:'3px', height:'20px', background:'#F59E0B',
              borderRadius:'2px', marginRight:'12px'
            }}/>
            <h2 style={{
              fontSize: isMobile ? '16px' : '20px',
              fontWeight:'600', color:'#fff', letterSpacing:'2px'
            }}>
              პოპულარული პროდუქტები
            </h2>
          </div>
          <a href="/parts" style={{fontSize:'13px', color:'#F59E0B', textDecoration:'none'}}>
            ყველა ნახვა →
          </a>
        </div>

        {loading ? (
          <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>იტვირთება...</div>
        ) : products.length === 0 ? (
          <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>პროდუქტები არ არის</div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns: cols, gap:'16px'}}>
            {products.slice(0, 8).map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home