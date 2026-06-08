function Hero() {
  return (
    <div style={{
      position:'relative', padding:'6rem 2rem 5rem',
      textAlign:'center', overflow:'hidden',
      background:'#0F172A'
    }}>
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse 80% 60% at 50% -10%, #F59E0B15 0%, transparent 70%)'
      }}/>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)',
        backgroundSize:'40px 40px'
      }}/>

      <div style={{position:'relative'}}>
        <div style={{
          display:'inline-block', padding:'5px 14px',
          background:'#F59E0B15', border:'1px solid #F59E0B30',
          borderRadius:'20px', fontSize:'12px', color:'#F59E0B',
          letterSpacing:'1px', marginBottom:'1.5rem'
        }}>
          ⚡კომპიუტერები და კომპიუტერის ნაწილები
        </div>

        <h1 style={{
          fontSize:'64px', fontWeight:'800', lineHeight:1,
          color:'#fff', marginBottom:'1rem', letterSpacing:'2px'
        }}>
          ააწყვე შენი<br/>
          <span style={{color:'#F59E0B'}}>სრულყოფილი</span> PC
        </h1>

        <p style={{
          fontSize:'16px', color:'#94A3B8', maxWidth:'500px',
          margin:'0 auto 2.5rem', lineHeight:'1.7'
        }}>
          შეარჩიე სათანადო კომპონენტები და ავტომატური კომფიგურაციების შემოწმებით ააწყვე შენი სოცნებიური კომპიუტერი
        </p>

        <div style={{display:'flex', gap:'12px', justifyContent:'center'}}>
          <a href="/configurator" style={{
            padding:'13px 28px', background:'#F59E0B',
            borderRadius:'8px', color:'#000', fontWeight:'700',
            fontSize:'14px', textDecoration:'none', letterSpacing:'.5px'
          }}>⚙ კონფიგურატორი</a>
          <a href="/parts" style={{
            padding:'13px 28px', background:'transparent',
            border:'1px solid #2a3a50', borderRadius:'8px',
            color:'#94A3B8', fontSize:'14px', textDecoration:'none'
          }}>ყველა ნაწილი →</a>
        </div>
      </div>
    </div>
  )
}

export default Hero