import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Contact() {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  const inputStyle = {
    width: '100%', padding: '10px 14px', marginBottom: '10px',
    background: theme.input, border: `1px solid ${theme.border}`,
    borderRadius: '8px', color: theme.text, fontSize: '14px',
    outline: 'none', boxSizing: 'border-box'
  }

  return (
    <div style={{flex:1, background:theme.bg, padding:'2rem 0'}}>
      <div style={{maxWidth:'1400px', margin:'0 auto', padding:'0 2rem'}}>

        <div style={{
          background:theme.surface, border:`1px solid ${theme.border}`,
          borderRadius:'12px', padding:'2rem', marginBottom:'2rem'
        }}>
          <h1 style={{fontSize: isMobile ? '24px' : '32px', fontWeight:'700', color:theme.text, marginBottom:'8px'}}>
            კონტაქტი
          </h1>
          <p style={{fontSize:'14px', color:theme.muted}}>
            დაგვიკავშირდი — გვიპასუხებთ სწრაფად
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap:'2rem'
        }}>

          {/* კონტაქტის ინფო */}
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {[
              {icon:'📍', label:'მისამართი', value:'თბილისი, საქართველო'},
              {icon:'📞', label:'ტელეფონი', value:'+995 XXX XXX XXX'},
              {icon:'✉️', label:'ელ-ფოსტა', value:'info@xpc.ge'},
              {icon:'🕐', label:'სამუშაო საათები', value:'ორშ-შაბ: 10:00 - 19:00'},
            ].map(item => (
              <div key={item.label} style={{
                background:theme.surface, border:`1px solid ${theme.border}`,
                borderRadius:'12px', padding:'1.5rem',
                display:'flex', alignItems:'center', gap:'1rem'
              }}>
                <div style={{
                  width:'48px', height:'48px', borderRadius:'10px',
                  background:'#F59E0B15', border:'1px solid #F59E0B30',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'22px', flexShrink:0
                }}>{item.icon}</div>
                <div>
                  <div style={{fontSize:'12px', color:theme.muted, marginBottom:'4px'}}>{item.label}</div>
                  <div style={{fontSize:'15px', fontWeight:'600', color:theme.text}}>{item.value}</div>
                </div>
              </div>
            ))}

            <div style={{
              background:theme.surface, border:`1px solid ${theme.border}`,
              borderRadius:'12px', padding:'1.5rem'
            }}>
              <div style={{fontSize:'16px', fontWeight:'700', color:theme.text, marginBottom:'1rem'}}>
                შეტყობინება
              </div>
              <input placeholder="სახელი" style={inputStyle}/>
              <input placeholder="ელ-ფოსტა" style={inputStyle}/>
              <textarea placeholder="შეტყობინება..." rows={4} style={{...inputStyle, resize:'vertical'}}/>
              <button style={{
                width:'100%', padding:'12px', background:'#F59E0B',
                border:'none', borderRadius:'8px', color:'#000',
                fontSize:'14px', fontWeight:'700', cursor:'pointer'
              }}>გაგზავნა →</button>
            </div>
          </div>

          {/* რუკა */}
          <div style={{
            background:theme.surface, border:`1px solid ${theme.border}`,
            borderRadius:'12px', overflow:'hidden',
            height: isMobile ? '350px' : '100%',
            minHeight: isMobile ? '350px' : '600px'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d351.16814362459746!2d44.77672587952446!3d41.75509292066873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1781240996973!5m2!1sen!2sge"
              width="100%"
              height="100%"
              style={{border:0, display:'block', minHeight: isMobile ? '350px' : '600px'}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact