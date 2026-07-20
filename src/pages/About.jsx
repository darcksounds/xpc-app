import { useTheme } from '../context/ThemeContext'

function About() {
  const { theme } = useTheme()

  return (
    <div style={{padding:'4rem 2rem', maxWidth:'800px', margin:'0 auto', color:theme.text}}>
      <h1 style={{fontSize:'36px', fontWeight:'700', marginBottom:'1rem'}}>
        ჩვენს <span style={{color:'#7c3aed'}}>შესახებ</span>
      </h1>
      <p style={{color:theme.muted, lineHeight:'1.8', fontSize:'15px'}}>
        XPC არის კომპიუტერის ნაწილებისა და სრული კომპიუტერების მაღაზია. ჩვენ გთავაზობთ მაღალხარისხიან პროდუქტებს საუკეთესო ფასებში.
      </p>
    </div>
  )
}

export default About