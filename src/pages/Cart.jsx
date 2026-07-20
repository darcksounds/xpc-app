import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  if (cart.length === 0) return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4rem', gap: '1rem', background: theme.bg
    }}>
      <div style={{ fontSize: '64px' }}>🛒</div>
      <div style={{ fontSize: '20px', fontWeight: '600', color: theme.text }}>კალათა ცარიელია</div>
      <div style={{ fontSize: '14px', color: theme.muted }}>დაამატე პროდუქტები კალათაში</div>
      <button onClick={() => navigate('/parts')} style={{
        padding: '12px 28px', background: '#F59E0B',
        border: 'none', borderRadius: '8px', color: '#000',
        fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '1rem'
      }}>ნაწილების ნახვა</button>
    </div>
  )

  return (
    <div style={{ flex: 1, background: theme.bg, padding: '2rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px'
        }}>
          <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '700', color: theme.text }}>კალათა</h1>
          <button onClick={clearCart} style={{
            background: 'transparent', border: '1px solid #ef444440',
            color: '#ef4444', padding: '8px 16px', borderRadius: '8px',
            fontSize: '13px', cursor: 'pointer'
          }}>გასუფთავება</button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cart.map(item => (
              <div key={item._id} style={{
                background: theme.surface, border: `1px solid ${theme.border}`,
                borderRadius: '12px', padding: isMobile ? '1rem' : '1.5rem',
                display: 'flex', alignItems: 'center',
                gap: isMobile ? '10px' : '1.5rem',
                flexWrap: isMobile ? 'wrap' : 'nowrap'
              }}>
                <div style={{
                  width: isMobile ? '60px' : '80px',
                  height: isMobile ? '60px' : '80px',
                  borderRadius: '8px', background: theme.input,
                  overflow: 'hidden', flexShrink: 0
                }}>
                  {item.images?.[0]
                    ? <img src={item.images[0]} alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '32px' }}>🖥️</div>
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', color: '#F59E0B', marginBottom: '4px' }}>{item.brand}</div>
                  <div style={{
                    fontSize: isMobile ? '13px' : '15px',
                    fontWeight: '600', color: theme.text, marginBottom: '6px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>{item.name}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: theme.text }}>
                    {(item.price * item.quantity).toFixed(2)} ₾
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{
                    width: '30px', height: '30px', borderRadius: '6px',
                    background: theme.input, border: `1px solid ${theme.border}`,
                    color: theme.text, fontSize: '16px', cursor: 'pointer'
                  }}>−</button>
                  <span style={{
                    width: '28px', textAlign: 'center',
                    fontSize: '14px', fontWeight: '600', color: theme.text
                  }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{
                    width: '30px', height: '30px', borderRadius: '6px',
                    background: theme.input, border: `1px solid ${theme.border}`,
                    color: theme.text, fontSize: '16px', cursor: 'pointer'
                  }}>+</button>
                </div>

                <button onClick={() => removeFromCart(item._id)} style={{
                  background: 'transparent', border: '1px solid #ef444430',
                  color: '#ef4444', width: '32px', height: '32px',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '14px', flexShrink: 0
                }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ position: isMobile ? 'static' : 'sticky', top: '90px', alignSelf: 'flex-start' }}>
            <div style={{
              background: theme.surface, border: `1px solid ${theme.border}`,
              borderRadius: '12px', padding: '1.5rem'
            }}>
              <div style={{ fontSize: '16px', fontWeight: '700', color: theme.text, marginBottom: '1.5rem' }}>
                შეკვეთის ჯამი
              </div>

              {cart.map(item => (
                <div key={item._id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '6px 0', fontSize: '13px', gap: '8px'
                }}>
                  <span style={{ color: theme.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name.slice(0, 20)}... x{item.quantity}
                  </span>
                  <span style={{ color: theme.text, flexShrink: 0 }}>{(item.price * item.quantity).toFixed(2)} ₾</span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 0', borderTop: `1px solid ${theme.border}`, marginTop: '1rem'
              }}>
                <span style={{ fontSize: '14px', color: theme.muted }}>სულ</span>
                <span style={{ fontSize: '28px', fontWeight: '800', color: theme.text }}>
                  {totalPrice.toFixed(2)} <span style={{ fontSize: '14px', color: theme.muted }}>₾</span>
                </span>
              </div>

              <button style={{
                width: '100%', padding: '14px', background: '#F59E0B',
                border: 'none', borderRadius: '10px', color: '#000',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer'
              }}>შეკვეთის გაფორმება →</button>

              <button onClick={() => navigate('/parts')} style={{
                width: '100%', padding: '10px', marginTop: '8px',
                background: 'transparent', border: `1px solid ${theme.border}`,
                borderRadius: '8px', color: theme.muted, fontSize: '13px', cursor: 'pointer'
              }}>← შოპინგის გაგრძელება</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart