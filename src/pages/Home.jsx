import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../sanity/queries'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <Hero />
      <Categories />

      <div style={{padding:'2rem', maxWidth:'1400px', margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <div style={{width:'3px', height:'20px', background:'#7c3aed', borderRadius:'2px', marginRight:'12px'}}/>
            <h2 style={{fontSize:'20px', fontWeight:'600', color:'#fff', letterSpacing:'2px'}}>
              პოპულარული პროდუქტები
            </h2>
          </div>
          <a href="/parts" style={{fontSize:'13px', color:'#7c3aed', textDecoration:'none'}}>
            ყველა ნახვა →
          </a>
        </div>

        {loading ? (
          <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>იტვირთება...</div>
        ) : products.length === 0 ? (
          <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>პროდუქტები არ არის</div>
        ) : (
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'
          }}>
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