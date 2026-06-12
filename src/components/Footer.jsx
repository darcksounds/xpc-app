import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return (
    <footer style={{
      borderTop: '1px solid #2a3a50',
      backgroundImage: 'url(/footer.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: '#1E293Bcc' }} />

      <div style={{
        position: 'relative', maxWidth: '1400px',
        margin: '0 auto', padding: '3rem 2rem 1.5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem'
        }}>

          {/* ლოგო */}
          <div>
            <img src="/xpc-logo.png" alt="XPC" style={{ height: '46px', objectFit: 'contain', marginBottom: '1rem' }} />
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.8', maxWidth: '280px' }}>
              კომპიუტერის ნაწილების და სრული კომპიუტერების მაღაზია. ხარისხიანი პროდუქტი, სწრაფი მიწოდება.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              {['FB', 'IG', 'YT', 'TG'].map(s => (
                <div key={s} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#0F172A', border: '1px solid #2a3a50',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: '700', color: '#94A3B8', cursor: 'pointer'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a3a50'; e.currentTarget.style.color = '#94A3B8' }}
                >{s}</div>
              ))}
            </div>
          </div>

          {/* სწრაფი ლინკები */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', letterSpacing: '1px', marginBottom: '1.2rem' }}>
              სწრაფი ლინკები
            </div>
            {[
              { to: '/', label: 'მთავარი' },
              { to: '/parts', label: 'ნაწილები' },
              { to: '/configurator', label: 'კონფიგურატორი' },
              { to: '/about', label: 'ჩვენს შესახებ' },
              { to: '/contact', label: 'კონტაქტი' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', fontSize: '13px', color: '#94A3B8',
                textDecoration: 'none', marginBottom: '10px'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >{l.label}</Link>
            ))}
          </div>

          {/* კონტაქტი */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', letterSpacing: '1px', marginBottom: '1.2rem' }}>
              კონტაქტი
            </div>
            {[
              { icon: '📍', text: 'თბილისი, საქართველო' },
              { icon: '📞', text: '+995 XXX XXX XXX' },
              { icon: '✉️', text: 'info@xpc.ge' },
              { icon: '🕐', text: 'ორშ-შაბ: 10:00 - 19:00' },
            ].map(item => (
              <div key={item.text} style={{
                display: 'flex', gap: '10px',
                fontSize: '13px', color: '#94A3B8', marginBottom: '12px'
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px',
          paddingTop: '1.5rem', borderTop: '1px solid #2a3a50',
          fontSize: '12px', color: '#94A3B8'
        }}>
          <div>© 2025 XPC · ყველა უფლება დაცულია</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }}>კონფიდენციალურობა</span>
            <span style={{ cursor: 'pointer' }}>წესები და პირობები</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer