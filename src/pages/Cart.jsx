import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div style={{
      flex:1, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'4rem', gap:'1rem'
    }}>
      <div style={{fontSize:'64px'}}>🛒</div>
      <div style={{fontSize:'20px', fontWeight:'600', color:'#fff'}}>კალათა ცარიელია</div>
      <div style={{fontSize:'14px', color:'#94A3B8'}}>დაამატე პროდუქტები კალათაში</div>
      <button
        onClick={() => navigate('/parts')}
        style={{
          padding:'12px 28px', background:'#F59E0B',
          border:'none', borderRadius:'8px', color:'#000',
          fontWeight:'700', fontSize:'14px', cursor:'pointer',
          marginTop:'1rem'
        }}
      >ნაწილების ნახვა</button>
    </div>
  )

  return (
    <div style={{flex:1, background:'#0F172A', padding:'2rem 0'}}>
      <div style={{maxWidth:'1400px', margin:'0 auto', padding:'0 2rem'}}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          marginBottom:'2rem'
        }}>
          <h1 style={{fontSize:'28px', fontWeight:'700', color:'#fff'}}>კალათა</h1>
          <button
            onClick={clearCart}
            style={{
              background:'transparent', border:'1px solid #ef444440',
              color:'#ef4444', padding:'8px 16px', borderRadius:'8px',
              fontSize:'13px', cursor:'pointer'
            }}
          >გასუფთავება</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 340px', gap:'2rem'}}>

          {/* პროდუქტები */}
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {cart.map(item => (
              <div key={item._id} style={{
                background:'#1E293B', border:'1px solid #2a3a50',
                borderRadius:'12px', padding:'1.5rem',
                display:'flex', alignItems:'center', gap:'1.5rem'
              }}>
                <div style={{
                  width:'80px', height:'80px', borderRadius:'8px',
                  background:'#0F172A', overflow:'hidden', flexShrink:0
                }}>
                  {item.images?.[0]
                    ? <img src={item.images[0]} alt={item.name}
                        style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                    : <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontSize:'32px'}}>🖥️</div>
                  }
                </div>

                <div style={{flex:1}}>
                  <div style={{fontSize:'12px', color:'#F59E0B', marginBottom:'4px'}}>{item.brand}</div>
                  <div style={{fontSize:'15px', fontWeight:'600', color:'#fff', marginBottom:'8px'}}>{item.name}</div>
                  <div style={{fontSize:'18px', fontWeight:'700', color:'#fff'}}>
                    {(item.price * item.quantity).toFixed(2)} ₾
                  </div>
                </div>

                {/* რაოდენობა */}
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={{
                      width:'32px', height:'32px', borderRadius:'6px',
                      background:'#0F172A', border:'1px solid #2a3a50',
                      color:'#fff', fontSize:'18px', cursor:'pointer'
                    }}
                  >−</button>
                  <span style={{
                    width:'32px', textAlign:'center',
                    fontSize:'15px', fontWeight:'600', color:'#fff'
                  }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={{
                      width:'32px', height:'32px', borderRadius:'6px',
                      background:'#0F172A', border:'1px solid #2a3a50',
                      color:'#fff', fontSize:'18px', cursor:'pointer'
                    }}
                  >+</button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background:'transparent', border:'1px solid #ef444430',
                    color:'#ef4444', width:'36px', height:'36px',
                    borderRadius:'8px', cursor:'pointer', fontSize:'16px'
                  }}
                >✕</button>
              </div>
            ))}
          </div>

          {/* ჯამი */}
          <div style={{position:'sticky', top:'90px', alignSelf:'flex-start'}}>
            <div style={{
              background:'#1E293B', border:'1px solid #2a3a50',
              borderRadius:'12px', padding:'1.5rem'
            }}>
              <div style={{fontSize:'16px', fontWeight:'700', color:'#fff', marginBottom:'1.5rem'}}>
                შეკვეთის ჯამი
              </div>

              {cart.map(item => (
                <div key={item._id} style={{
                  display:'flex', justifyContent:'space-between',
                  padding:'6px 0', fontSize:'13px'
                }}>
                  <span style={{color:'#94A3B8'}}>{item.name.slice(0,25)}... x{item.quantity}</span>
                  <span style={{color:'#fff'}}>{(item.price * item.quantity).toFixed(2)} ₾</span>
                </div>
              ))}

              <div style={{
                display:'flex', justifyContent:'space-between',
                alignItems:'center', padding:'1rem 0',
                borderTop:'1px solid #2a3a50', marginTop:'1rem'
              }}>
                <span style={{fontSize:'14px', color:'#94A3B8'}}>სულ</span>
                <span style={{fontSize:'28px', fontWeight:'800', color:'#fff'}}>
                  {totalPrice.toFixed(2)} <span style={{fontSize:'14px', color:'#94A3B8'}}>₾</span>
                </span>
              </div>

              <button style={{
                width:'100%', padding:'14px', background:'#F59E0B',
                border:'none', borderRadius:'10px', color:'#000',
                fontSize:'15px', fontWeight:'700', cursor:'pointer'
              }}>
                შეკვეთის გაფორმება →
              </button>

              <button
                onClick={() => navigate('/parts')}
                style={{
                  width:'100%', padding:'10px', marginTop:'8px',
                  background:'transparent', border:'1px solid #2a3a50',
                  borderRadius:'8px', color:'#94A3B8',
                  fontSize:'13px', cursor:'pointer'
                }}
              >← შოპინგის გაგრძელება</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart