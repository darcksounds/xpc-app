import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../sanity/queries'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { theme } = useTheme()
  const [product, setProduct] = useState(null)
  const [currentImg, setCurrentImg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data)
      setLoading(false)
    })
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: theme.muted, fontSize: '14px'
    }}>იტვირთება...</div>
  )

  if (!product) return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: theme.muted, fontSize: '14px'
    }}>პროდუქტი ვერ მოიძებნა</div>
  )

  return (
    <div style={{ flex: 1, background: theme.bg, padding: '2rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent', border: `1px solid ${theme.border}`,
          color: theme.muted, padding: '8px 16px', borderRadius: '8px',
          cursor: 'pointer', marginBottom: '1.5rem', fontSize: '13px'
        }}>← უკან</button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? '1.5rem' : '3rem'
        }}>

          {/* ფოტოები */}
          <div>
            <div style={{
              height: isMobile ? '280px' : '420px',
              background: theme.surface, borderRadius: '12px',
              overflow: 'hidden', marginBottom: '12px', position: 'relative',
              border: `1px solid ${theme.border}`
            }}>
              {product.images && product.images.length > 0
                ? <img src={product.images[currentImg]} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                : <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '100%', fontSize: '80px'
                  }}>🖥️</div>
              }
            </div>

            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt={i}
                    onClick={() => setCurrentImg(i)}
                    style={{
                      width: '70px', height: '70px', objectFit: 'cover',
                      borderRadius: '8px', cursor: 'pointer', flexShrink: 0,
                      border: i === currentImg ? '2px solid #F59E0B' : `2px solid ${theme.border}`,
                      transition: 'border .2s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ინფო */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', color: '#F59E0B', letterSpacing: '1px', marginBottom: '8px' }}>
              {product.brand}
            </div>
            <h1 style={{
              fontSize: isMobile ? '20px' : '28px',
              fontWeight: '700', color: theme.text, marginBottom: '16px', lineHeight: 1.3
            }}>
              {product.name}
            </h1>

            <div style={{
              display: 'inline-block', padding: '4px 12px',
              background: product.inStock ? '#22C55E20' : '#ef444420',
              border: `1px solid ${product.inStock ? '#22C55E40' : '#ef444440'}`,
              borderRadius: '20px', fontSize: '12px',
              color: product.inStock ? '#22C55E' : '#ef4444',
              marginBottom: '20px', alignSelf: 'flex-start'
            }}>
              {product.inStock ? '✓ მარაგშია' : '✗ მარაგი ამოიწურა'}
            </div>

            <div style={{
              fontSize: isMobile ? '32px' : '42px',
              fontWeight: '800', color: theme.text, marginBottom: '20px'
            }}>
              {product.price} <span style={{ fontSize: '20px', color: theme.muted, fontWeight: '400' }}>₾</span>
            </div>

            {product.inStock && (
              <button onClick={handleAddToCart} style={{
                width: '100%', padding: '14px',
                background: added ? '#22C55E' : '#F59E0B',
                border: 'none', borderRadius: '10px', color: '#000',
                fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                marginBottom: '12px', transition: 'background .3s'
              }}>
                {added ? '✓ დაემატა კალათაში!' : '🛒 კალათაში დამატება'}
              </button>
            )}

            {product.category && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 14px', background: theme.surface,
                border: `1px solid ${theme.border}`, borderRadius: '8px',
                marginBottom: '16px', fontSize: '13px', color: theme.muted
              }}>
                კატეგორია: <span style={{ color: '#F59E0B' }}>{product.category.name}</span>
              </div>
            )}

            {product.specs && Object.values(product.specs).some(Boolean) && (
              <div style={{
                background: theme.surface, border: `1px solid ${theme.border}`,
                borderRadius: '12px', padding: '20px', marginTop: '8px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.text, marginBottom: '16px', letterSpacing: '1px' }}>
                  სპეციფიკაციები
                </div>
                {product.specs.socket && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ color: theme.muted, fontSize: '13px' }}>სოკეტი</span>
                    <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>{product.specs.socket}</span>
                  </div>
                )}
                {product.specs.memoryType && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ color: theme.muted, fontSize: '13px' }}>მეხსიერების ტიპი</span>
                    <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>{product.specs.memoryType}</span>
                  </div>
                )}
                {product.specs.tdp && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ color: theme.muted, fontSize: '13px' }}>TDP</span>
                    <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>{product.specs.tdp}W</span>
                  </div>
                )}
                {product.specs.wattage && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ color: theme.muted, fontSize: '13px' }}>სიმძლავრე</span>
                    <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>{product.specs.wattage}W</span>
                  </div>
                )}
                {product.specs.formFactor && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                    <span style={{ color: theme.muted, fontSize: '13px' }}>ფორმ-ფაქტორი</span>
                    <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>{product.specs.formFactor}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail