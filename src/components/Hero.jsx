function Hero() {
  return (
    <div style={{
      position:'relative', padding:'6rem 2rem 5rem',
      overflow:'hidden',
      backgroundImage:'url(/ackground.png)',
      backgroundSize:'cover',
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
    }}>
      {/* overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to right, #0F172Ada 40%, #0F172A40 100%)'
      }}/>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)',
        backgroundSize:'40px 40px'
      }}/>

      <div style={{
  position:'relative',
  maxWidth:'1400px',
  paddingLeft:'20px',
  margin:'0 auto',
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-start',
}}>
        <div style={{textAlign:'left', maxWidth:'560px'}}>
          <div style={{
            display:'inline-block', padding:'5px 14px',
            background:'#F59E0B15', border:'1px solid #F59E0B30',
            borderRadius:'20px', fontSize:'12px', color:'#F59E0B',
            letterSpacing:'1px', marginBottom:'1.5rem'
          }}>
            ⚡ კომპიუტერები და კომპიუტერის ნაწილები
          </div>

          <h1 style={{
            fontSize:'64px', fontWeight:'800', lineHeight:1,
            color:'#fff', marginBottom:'1rem', letterSpacing:'2px'
          }}>
            ააწყვე შენი<br/>
            <span style={{color:'#F59E0B'}}>სრულყოფილი</span> PC
          </h1>

          <p style={{
            fontSize:'16px', color:'#94A3B8',
            margin:'0 0 2.5rem', lineHeight:'1.7'
          }}>
            შეარჩიე სათანადო კომპონენტები და ავტომატური კონფიგურაციების შემოწმებით ააწყვე შენი სოცნებიური კომპიუტერი
          </p>

          <div style={{display:'flex', gap:'12px'}}>
            <a href="/configurator" style={{
              padding:'13px 28px', background:'#F59E0B',
              borderRadius:'8px', color:'#000', fontWeight:'700',
              fontSize:'14px', textDecoration:'none', letterSpacing:'.5px'
            }}>⚙ კონფიგურატორი</a>
            <a href="/parts" style={{
              padding:'13px 28px', background:'transparent',
              border:'1px solid #ffffff30', borderRadius:'8px',
              color:'#fff', fontSize:'14px', textDecoration:'none'
            }}>ყველა ნაწილი →</a>
          </div>
        </div>

        <div style={{flexShrink:0}}>
          {/* <img
            src="/logo.png"
            alt="XPC Logo"
            style={{
              width:'320px',
              objectFit:'contain',
              opacity:'0.35',
    filter:'drop-shadow(0 0 20px #F59E0B20)'
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Hero