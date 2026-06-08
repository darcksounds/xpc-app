import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [cartCount] = useState(0)

  const links = [
    { to: '/', label: 'მთავარი' },
    { to: '/parts', label: 'ნაწილები' },
    { to: '/configurator', label: 'კონფიგურატორი' },
    { to: '/about', label: 'ჩვენს შესახებ' },
    { to: '/contact', label: 'კონტაქტი' },
  ]

  return (
    <nav style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 2rem', height:'64px', background:'#1E293B',
      borderBottom:'1px solid #2a3a50', position:'sticky', top:0, zIndex:100
    }}>
      <Link to="/" style={{textDecoration:'none'}}>
        <div style={{fontFamily:'sans-serif', fontSize:'24px', fontWeight:'700', letterSpacing:'4px', color:'#fff'}}>
          X<span style={{color:'#F59E0B'}}>P</span>C
        </div>
      </Link>

      <div style={{display:'flex', gap:'4px'}}>
        {links.map(link => (
          <Link key={link.to} to={link.to} style={{
            padding:'8px 16px', fontSize:'13px', textDecoration:'none',
            color: location.pathname === link.to ? '#fff' : '#94A3B8',
            background: location.pathname === link.to ? '#ffffff08' : 'transparent',
            borderRadius:'6px', transition:'all .2s'
          }}>
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{
        display:'flex', alignItems:'center', gap:'8px',
        padding:'8px 18px', background:'#F59E0B20',
        border:'1px solid #F59E0B40', borderRadius:'8px',
        color:'#F59E0B', fontSize:'13px', cursor:'pointer'
      }}>
        🛒 კალათა
        <div style={{
          background:'#F59E0B', color:'#000', borderRadius:'50%',
          width:'18px', height:'18px', fontSize:'11px', fontWeight:'700',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>{cartCount}</div>
      </div>
    </nav>
  )
}

export default Navbar