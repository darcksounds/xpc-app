import { useState, useEffect, useRef } from 'react'
import { getCategories, getProducts } from '../sanity/queries'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Categories() {
  const [categories, setCategories] = useState([])
  const [catImages, setCatImages] = useState({})
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const { theme, mode } = useTheme()

  useEffect(() => {
    getCategories().then(setCategories)
    getProducts().then(products => {
      const imgs = {}
      products.forEach(p => {
        if (p.category?.name && p.images && p.images[0]) {
          if (!imgs[p.category.name]) {
            imgs[p.category.name] = p.images[0]
          }
        }
      })
      setCatImages(imgs)
    })
  }, [])

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 440, behavior: 'smooth' })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '3px', height: '22px', background: '#F59E0B', borderRadius: '2px', marginRight: '12px' }} />
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: theme.text, letterSpacing: '2px' }}>
            კატეგორიები
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => scroll(-1)} style={{
            width: '38px', height: '38px', borderRadius: '8px',
            background: theme.surface, border: `1px solid ${theme.border}`,
            color: theme.text, fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#F59E0B'}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
          >‹</button>
          <button onClick={() => scroll(1)} style={{
            width: '38px', height: '38px', borderRadius: '8px',
            background: theme.surface, border: `1px solid ${theme.border}`,
            color: theme.text, fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#F59E0B'}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
          >›</button>
        </div>
      </div>

      <div ref={scrollRef} style={{
        display: 'flex', gap: '12px',
        overflowX: 'auto', paddingBottom: '8px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {categories.map(cat => (
          <div key={cat._id}
            onClick={() => navigate(`/parts?category=${cat.slug}`)}
            style={{
              height: '250px', minWidth: '200px', width: '200px',
              flexShrink: 0, borderRadius: '12px', overflow: 'hidden',
              cursor: 'pointer', position: 'relative',
              border: `1px solid ${theme.border}`,
              transition: 'all .25s',
              ...(catImages[cat.name] ? {
                backgroundImage: `url(${catImages[cat.name]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } : {
                background: theme.surface
              })
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#F59E0B60'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = theme.border
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: mode === 'dark'
                ? 'linear-gradient(to top, #0F172Af0 35%, #0F172A40 100%)'
                : 'linear-gradient(to top, #0F172Acc 35%, #0F172A20 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '0.5px' }}>
                {cat.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories