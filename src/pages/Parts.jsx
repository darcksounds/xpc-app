import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../sanity/queries'
import ProductCard from '../components/ProductCard'

function Parts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      setLoading(false)
    })

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))]

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const filtered = products
    .filter(p => selectedCategory === 'all' || p.category?.slug === selectedCategory)
    .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
    .filter(p => !inStockOnly || p.inStock)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return 0
    })

  const productCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  const Sidebar = () => (
    <div>
      <div style={{background:'#1E293B', border:'1px solid #2a3a50', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
        <div style={{fontSize:'14px', fontWeight:'700', color:'#fff', marginBottom:'1rem', letterSpacing:'1px'}}>
          კატეგორია
        </div>
        <div onClick={() => setSelectedCategory('all')} style={{
          display:'flex', alignItems:'center', gap:'10px',
          padding:'8px 10px', borderRadius:'8px', cursor:'pointer',
          background: selectedCategory === 'all' ? '#F59E0B15' : 'transparent',
          marginBottom:'4px'
        }}>
          <div style={{
            width:'14px', height:'14px', borderRadius:'50%',
            background: selectedCategory === 'all' ? '#F59E0B' : 'transparent',
            border: `2px solid ${selectedCategory === 'all' ? '#F59E0B' : '#2a3a50'}`,
            flexShrink:0
          }}/>
          <span style={{fontSize:'13px', color: selectedCategory === 'all' ? '#F59E0B' : '#94A3B8'}}>ყველა</span>
        </div>
        {categories.map(cat => (
          <div key={cat._id} onClick={() => { setSelectedCategory(cat.slug); setFilterOpen(false) }} style={{
            display:'flex', alignItems:'center', gap:'10px',
            padding:'8px 10px', borderRadius:'8px', cursor:'pointer',
            background: selectedCategory === cat.slug ? '#F59E0B15' : 'transparent',
            marginBottom:'4px'
          }}>
            <div style={{
              width:'14px', height:'14px', borderRadius:'50%',
              background: selectedCategory === cat.slug ? '#F59E0B' : 'transparent',
              border: `2px solid ${selectedCategory === cat.slug ? '#F59E0B' : '#2a3a50'}`,
              flexShrink:0
            }}/>
            <span style={{fontSize:'13px', color: selectedCategory === cat.slug ? '#F59E0B' : '#94A3B8'}}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{background:'#1E293B', border:'1px solid #2a3a50', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
        <div style={{fontSize:'14px', fontWeight:'700', color:'#fff', marginBottom:'1rem', letterSpacing:'1px'}}>
          ბრენდი
        </div>
        {brands.map(brand => (
          <div key={brand} onClick={() => toggleBrand(brand)} style={{
            display:'flex', alignItems:'center', gap:'10px',
            padding:'6px 0', cursor:'pointer', marginBottom:'4px'
          }}>
            <div style={{
              width:'16px', height:'16px', borderRadius:'4px',
              background: selectedBrands.includes(brand) ? '#F59E0B' : 'transparent',
              border: `2px solid ${selectedBrands.includes(brand) ? '#F59E0B' : '#2a3a50'}`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
            }}>
              {selectedBrands.includes(brand) && <span style={{fontSize:'10px', color:'#000', fontWeight:'700'}}>✓</span>}
            </div>
            <span style={{fontSize:'13px', color:'#94A3B8'}}>{brand}</span>
          </div>
        ))}
      </div>

      <div style={{background:'#1E293B', border:'1px solid #2a3a50', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
        <div onClick={() => setInStockOnly(!inStockOnly)} style={{
          display:'flex', alignItems:'center', gap:'10px', cursor:'pointer'
        }}>
          <div style={{
            width:'16px', height:'16px', borderRadius:'4px',
            background: inStockOnly ? '#F59E0B' : 'transparent',
            border: `2px solid ${inStockOnly ? '#F59E0B' : '#2a3a50'}`,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
          }}>
            {inStockOnly && <span style={{fontSize:'10px', color:'#000', fontWeight:'700'}}>✓</span>}
          </div>
          <span style={{fontSize:'13px', color:'#94A3B8'}}>მარაგშია მხოლოდ</span>
        </div>
      </div>

      <button
        onClick={() => { setSelectedCategory('all'); setSelectedBrands([]); setInStockOnly(false) }}
        style={{
          width:'100%', padding:'10px', background:'transparent',
          border:'1px solid #2a3a50', borderRadius:'8px',
          color:'#94A3B8', fontSize:'13px', cursor:'pointer'
        }}
      >გასუფთავება</button>
    </div>
  )

  return (
    <div style={{background:'#0F172A', minHeight:'100vh'}}>
      <div style={{background:'#1E293B', borderBottom:'1px solid #2a3a50', padding:'1.5rem 2rem'}}>
        <div style={{maxWidth:'1400px', margin:'0 auto'}}>
          <h1 style={{fontSize: isMobile ? '24px' : '32px', fontWeight:'700', color:'#fff', marginBottom:'6px'}}>
            ნაწილები
          </h1>
          <p style={{fontSize:'14px', color:'#94A3B8'}}>კომპიუტერის ნაწილების სრული კოლექცია</p>
        </div>
      </div>

      <div style={{maxWidth:'1400px', margin:'0 auto', padding:'2rem'}}>

        {/* mobile filter button */}
        {isMobile && (
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              width:'100%', padding:'12px', marginBottom:'1rem',
              background:'#1E293B', border:'1px solid #2a3a50',
              borderRadius:'8px', color:'#fff', fontSize:'14px',
              cursor:'pointer', display:'flex', alignItems:'center',
              justifyContent:'center', gap:'8px'
            }}
          >
            🔧 ფილტრი {selectedCategory !== 'all' || selectedBrands.length > 0 || inStockOnly ? '•' : ''}
          </button>
        )}

        {/* mobile filter dropdown */}
        {isMobile && filterOpen && (
          <div style={{marginBottom:'1rem'}}>
            <Sidebar />
          </div>
        )}

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
          gap:'2rem'
        }}>
          {/* desktop sidebar */}
          {!isMobile && <Sidebar />}

          {/* პროდუქტები */}
          <div>
            <div style={{
              display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'1.5rem',
              flexWrap:'wrap', gap:'10px'
            }}>
              <div style={{fontSize:'14px', color:'#94A3B8'}}>
                <span style={{color:'#fff', fontWeight:'600'}}>{filtered.length}</span> პროდუქტი
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  background:'#1E293B', border:'1px solid #2a3a50',
                  borderRadius:'8px', padding:'8px 16px',
                  color:'#fff', fontSize:'13px', cursor:'pointer'
                }}
              >
                <option value="default">სტანდარტული</option>
                <option value="price-asc">ფასი: იაფიდან ძვირამდე</option>
                <option value="price-desc">ფასი: ძვირიდან იაფამდე</option>
              </select>
            </div>

            {loading ? (
              <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>იტვირთება...</div>
            ) : filtered.length === 0 ? (
              <div style={{color:'#666', textAlign:'center', padding:'3rem'}}>პროდუქტი ვერ მოიძებნა</div>
            ) : (
              <div style={{display:'grid', gridTemplateColumns: productCols, gap:'16px'}}>
                {filtered.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parts