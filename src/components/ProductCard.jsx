import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product, onAddToCart }) {
  const [currentImg, setCurrentImg] = useState(0)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      style={{
        background:'#1E293B', border:'1px solid #2a3a50',
        borderRadius:'12px', overflow:'hidden', cursor:'pointer',
        transition:'all .25s', position:'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#F59E0B60'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#2a3a50'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        height:'250px', background:'#0F172A',
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative'
      }}>
        {product.images && product.images.length > 0
          ? <img src={product.images[currentImg]} alt={product.name}
              style={{width:'100%', height:'100%', objectFit:'cover'}}/>
          : <span style={{fontSize:'56px'}}>🖥️</span>
        }
        {!product.inStock && (
          <div style={{
            position:'absolute', inset:0, background:'#00000080',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'13px', color:'#ef4444', fontWeight:'600'
          }}>მარაგი ამოიწურა</div>
        )}
        {product.images && product.images.length > 1 && (
          <div style={{
            position:'absolute', bottom:'6px', left:'50%',
            transform:'translateX(-50%)', display:'flex', gap:'4px'
          }}>
            {product.images.map((_, i) => (
              <div key={i}
                onClick={e => { e.stopPropagation(); setCurrentImg(i) }}
                style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background: i === currentImg ? '#F59E0B' : '#ffffff60',
                  cursor:'pointer'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{padding:'14px'}}>
        <div style={{fontSize:'11px', color:'#F59E0B', letterSpacing:'1px', marginBottom:'4px'}}>
          {product.brand}
        </div>
        <div style={{fontSize:'13px', color:'#94A3B8', marginBottom:'10px', lineHeight:'1.4'}}>
          {product.name}
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:'20px', fontWeight:'700', color:'#fff'}}>
            {product.price} <span style={{fontSize:'12px', fontWeight:'400', color:'#94A3B8'}}>₾</span>
          </div>
          {product.inStock && (
            <button
              onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart(product) }}
              style={{
                width:'32px', height:'32px', background:'#F59E0B',
                borderRadius:'6px', border:'none', color:'#000',
                fontSize:'18px', fontWeight:'700', cursor:'pointer'
              }}>+</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard