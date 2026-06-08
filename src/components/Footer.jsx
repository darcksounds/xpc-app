import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{
      background:'#1E293B', borderTop:'1px solid #2a3a50',
      padding:'3rem 2rem 1.5rem'
    }}>
      <div style={{
        display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr',
        gap:'2rem', maxWidth:'1200px', margin:'0 auto'
      }}>
        <div>
          <div style={{fontSize:'24px', fontWeight:'700', letterSpacing:'4px', color:'#fff', marginBottom:'1rem'}}>
            X<span style={{color:'#F59E0B'}}>P</span>C
          </div>
          <p style={{fontSize:'13px', color:'#94A3B8', lineHeight:'1.7'}}>
            კომპიუტერის ნაწილების და სრული კომპიუტერების მაღაზია. ხარისხიანი პროდუქტი, სწრაფი მიწოდება.
          </p>
        </div>

        <div>
          <div style={{fontSize:'13px', fontWeight:'600', color:'#fff', letterSpacing:'1px', marginBottom:'1rem'}}>
            სწრაფი ლინკები
          </div>
          {[
            {to:'/', label:'მთავარი'},
            {to:'/parts', label:'ნაწილები'},
            {to:'/configurator', label:'კონფიგურატორი'},
            {to:'/about', label:'ჩვენს შესახებ'},
            {to:'/contact', label:'კონტაქტი'},
          ].map(l => (
            <Link key={l.to} to={l.to} style={{
              display:'block', fontSize:'13px', color:'#94A3B8',
              textDecoration:'none', marginBottom:'8px',
              transition:'color .2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >{l.label}</Link>
          ))}
        </div>

        <div>
          <div style={{fontSize:'13px', fontWeight:'600', color:'#fff', letterSpacing:'1px', marginBottom:'1rem'}}>
            კატეგორიები
          </div>
          {['პროცესორი','მათბორდი','RAM','ვიდეო ბარათი','SSD','კვების ბლოკი'].map(c => (
            <div key={c} style={{fontSize:'13px', color:'#94A3B8', marginBottom:'8px'}}>{c}</div>
          ))}
        </div>

        <div>
          <div style={{fontSize:'13px', fontWeight:'600', color:'#fff', letterSpacing:'1px', marginBottom:'1rem'}}>
            კონტაქტი
          </div>
          <div style={{fontSize:'13px', color:'#94A3B8', marginBottom:'8px'}}>📍 თბილისი, საქართველო</div>
          <div style={{fontSize:'13px', color:'#94A3B8', marginBottom:'8px'}}>📞 +995 XXX XXX XXX</div>
          <div style={{fontSize:'13px', color:'#94A3B8', marginBottom:'8px'}}>✉️ info@xpc.ge</div>
        </div>
      </div>

      <div style={{
        textAlign:'center', marginTop:'2rem', paddingTop:'1.5rem',
        borderTop:'1px solid #2a3a50', fontSize:'12px', color:'#94A3B8'
      }}>
        © 2025 XPC · ყველა უფლება დაცულია
      </div>
    </footer>
  )
}

export default Footer