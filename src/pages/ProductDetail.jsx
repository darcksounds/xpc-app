import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../sanity/queries'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [currentImg, setCurrentImg] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div style={{color:'#94A3B8', textAlign:'center', padding:'4rem'}}>იტვირთება...</div>
  )

  if (!product) return (
    <div style={{color:'#94A3B8', textAlign:'center', padding:'4rem'}}>პროდუქტი ვერ მოიძებნა</div>
  )

  return (
    <div style={{maxWidth:'1400px', margin:'0 auto', padding:'2rem'}}>
      <button onClick={() => navigate(-1)} style={{
        background:'transparent', border:'1px solid #2a3a50',
        color:'#94A3B8', padding:'8px 16px', borderRadius:'8px',
        cursor:'pointer', marginBottom:'2rem', fontSize:'13px'
      }}>← უკან</button>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem'}}>

        {/* ფოტოები */}
        <div>
          <div style={{
            height:'400px', background:'#0F172A', borderRadius:'12px',
            overflow:'hidden', marginBottom:'12px', position:'relative'
          }}>
            {product.images && product.images.length > 0
              ? <img src={product.images[currentImg]} alt={product.name}
                  style={{width:'100%', height:'100%', objectFit:'cover'}}/>
              : <div style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  height:'100%', fontSize:'80px'
                }}>🖥️</div>
            }
          </div>

          {product.images && product.images.length > 1 && (
            <div style={{display:'flex', gap:'8px', overflowX:'auto'}}>
              {product.images.map((img, i) => (
                <img key={i} src={img} alt={i}
                  onClick={() => setCurrentImg(i)}
                  style={{
                    width:'80px', height:'80px', objectFit:'cover',
                    borderRadius:'8px', cursor:'pointer',
                    border: i === currentImg ? '2px solid #F59E0B' : '2px solid #2a3a50',
                    transition:'border .2s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ინფო */}
        <div>
          <div style={{fontSize:'13px', color:'#F59E0B', letterSpacing:'1px', marginBottom:'8px'}}>
            {product.brand}
          </div>
          <h1 style={{fontSize:'28px', fontWeight:'700', color:'#fff', marginBottom:'16px', lineHeight:1.3}}>
            {product.name}
          </h1>

          <div style={{
            display:'inline-block', padding:'4px 12px',
            background: product.inStock ? '#22C55E20' : '#ef444420',
            border: `1px solid ${product.inStock ? '#22C55E40' : '#ef444440'}`,
            borderRadius:'20px', fontSize:'12px',
            color: product.inStock ? '#22C55E' : '#ef4444',
            marginBottom:'24px'
          }}>
            {product.inStock ? '✓ მარაგშია' : '✗ მარაგი ამოიწურა'}
          </div>

          <div style={{fontSize:'40px', fontWeight:'800', color:'#fff', marginBottom:'24px'}}>
            {product.price} <span style={{fontSize:'20px', color:'#94A3B8'}}>₾</span>
          </div>

          {product.inStock && (
            <button style={{
              width:'100%', padding:'14px', background:'#F59E0B',
              border:'none', borderRadius:'10px', color:'#000',
              fontSize:'16px', fontWeight:'700', cursor:'pointer',
              marginBottom:'12px'
            }}>
              🛒 კალათაში დამატება
            </button>
          )}

          {/* სპეციფიკაციები */}
          {product.specs && (
            <div style={{
              background:'#1E293B', border:'1px solid #2a3a50',
              borderRadius:'12px', padding:'20px', marginTop:'24px'
            }}>
              <div style={{fontSize:'14px', fontWeight:'600', color:'#fff', marginBottom:'16px', letterSpacing:'1px'}}>
                სპეციფიკაციები
              </div>
              {product.specs.socket && (
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #2a3a50'}}>
                  <span style={{color:'#94A3B8', fontSize:'13px'}}>სოკეტი</span>
                  <span style={{color:'#fff', fontSize:'13px', fontWeight:'500'}}>{product.specs.socket}</span>
                </div>
              )}
              {product.specs.memoryType && (
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #2a3a50'}}>
                  <span style={{color:'#94A3B8', fontSize:'13px'}}>მეხსიერების ტიპი</span>
                  <span style={{color:'#fff', fontSize:'13px', fontWeight:'500'}}>{product.specs.memoryType}</span>
                </div>
              )}
              {product.specs.tdp && (
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #2a3a50'}}>
                  <span style={{color:'#94A3B8', fontSize:'13px'}}>TDP</span>
                  <span style={{color:'#fff', fontSize:'13px', fontWeight:'500'}}>{product.specs.tdp}W</span>
                </div>
              )}
              {product.specs.wattage && (
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #2a3a50'}}>
                  <span style={{color:'#94A3B8', fontSize:'13px'}}>სიმძლავრე</span>
                  <span style={{color:'#fff', fontSize:'13px', fontWeight:'500'}}>{product.specs.wattage}W</span>
                </div>
              )}
              {product.specs.formFactor && (
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
                  <span style={{color:'#94A3B8', fontSize:'13px'}}>ფორმ-ფაქტორი</span>
                  <span style={{color:'#fff', fontSize:'13px', fontWeight:'500'}}>{product.specs.formFactor}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail