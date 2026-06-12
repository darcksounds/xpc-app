import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { totalCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'მთავარი' },
    { to: '/parts', label: 'ნაწილები' },
    { to: '/configurator', label: 'კონფიგურატორი' },
    { to: '/about', label: 'ჩვენს შესახებ' },
    { to: '/contact', label: 'კონტაქტი' }
  ]

  return (
    <div style={{
      background: '#1E293B',
      borderBottom: '1px solid #2a3a50',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '72px',
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src="/xpc-logo.png" alt="XPC Logo" style={{ height: '46px', objectFit: 'contain' }} />
        </Link>

        {/* desktop links */}
        <div style={{
          display: 'flex', gap: '4px',
          '@media (max-width: 768px)': { display: 'none' }
        }} className="hide-mobile">
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '10px 16px', fontSize: '15px', textDecoration: 'none',
              color: location.pathname === link.to ? '#fff' : '#94A3B8',
              background: location.pathname === link.to ? '#ffffff08' : 'transparent',
              borderRadius: '8px', transition: 'all .2s',
              fontWeight: location.pathname === link.to ? '600' : '400',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div onClick={() => navigate('/cart')} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px', background: '#F59E0B20',
            border: '1px solid #F59E0B40', borderRadius: '10px',
            color: '#F59E0B', fontSize: '15px', cursor: 'pointer', fontWeight: '500'
          }}>
            🛒
            <span className="hide-mobile">კალათა</span>
            <div style={{
              background: '#F59E0B', color: '#000', borderRadius: '50%',
              width: '22px', height: '22px', fontSize: '12px', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{totalCount}</div>
          </div>

          {/* burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent', border: '1px solid #2a3a50',
              borderRadius: '8px', padding: '8px', color: '#fff',
              fontSize: '20px', cursor: 'pointer'
            }}
            className="show-mobile"
          >☰</button>
        </div>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#1E293B', borderTop: '1px solid #2a3a50',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          {links.map(link => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px', fontSize: '15px', textDecoration: 'none',
                color: location.pathname === link.to ? '#F59E0B' : '#94A3B8',
                borderRadius: '8px', fontWeight: location.pathname === link.to ? '600' : '400',
              }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar