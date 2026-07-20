import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import background from '../assets/background.png'
import { Link } from 'react-router-dom'

function Hero() {
    const [isSmall, setIsSmall] = useState(window.innerWidth < 600)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const { theme, mode } = useTheme()

    useEffect(() => {
        const handle = () => {
            setIsSmall(window.innerWidth < 600)
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handle)
        return () => window.removeEventListener('resize', handle)
    }, [])

    return (
        <div
            style={{
                position: 'relative',
                padding: isMobile ? '3rem 1.5rem' : '6rem 2rem 5rem',
                overflow: 'hidden',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* გამჭვირვალე ფენა სურათზე, რომ ტექსტი კონტრასტული დარჩეს */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        mode === 'dark'
                            ? 'linear-gradient(to right, #0F172Ada 40%, #0F172A40 100%)'
                            : 'linear-gradient(to right, #F8FAFCf0 40%, #F8FAFCb0 100%)'
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(${mode === 'dark' ? '#ffffff03' : '#00000005'} 1px, transparent 1px), linear-gradient(90deg, ${mode === 'dark' ? '#ffffff03' : '#00000005'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div
                style={{
                    position: 'relative',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    paddingLeft: isMobile ? '0' : '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '4rem',
                    flexWrap: 'wrap'
                }}
            >
                <div style={{ textAlign: 'left', maxWidth: '560px' }}>
                    <div
                        style={{
                            display: 'inline-block',
                            padding: '5px 14px',
                            background: '#F59E0B15',
                            border: '1px solid #F59E0B40',
                            borderRadius: '20px',
                            fontSize: '12px',
                            color: '#F59E0B',
                            letterSpacing: '1px',
                            marginBottom: '1.5rem'
                        }}
                    >
                        ⚡ კომპიუტერები და კომპიუტერის ნაწილები
                    </div>

                    <h1
                        style={{
                            fontSize: isMobile ? '36px' : '64px',
                            fontWeight: '800',
                            lineHeight: 1,
                            color: theme.text,
                            marginBottom: '1rem',
                            letterSpacing: '2px'
                        }}
                    >
                        ააწყვე შენი
                        <br />
                        <span style={{ color: '#F59E0B' }}>სრულყოფილი</span> PC
                    </h1>

                    {!isSmall && (
                        <p
                            style={{
                                fontSize: '16px',
                                color: theme.muted,
                                margin: '0 0 2.5rem',
                                lineHeight: '1.7'
                            }}
                        >
                            შეარჩიე სათანადო კომპონენტები და ავტომატური კონფიგურაციების შემოწმებით ააწყვე შენი
                            სოცნებიური კომპიუტერი
                        </p>
                    )}

                    {isSmall && <div style={{ marginBottom: '1.5rem' }} />}

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                            to="/configurator"
                            style={{
                                padding: '13px 28px',
                                background: '#F59E0B',
                                borderRadius: '8px',
                                color: '#000',
                                fontWeight: '700',
                                fontSize: '14px',
                                textDecoration: 'none',
                                letterSpacing: '.5px'
                            }}
                        >
                            ⚙ კონფიგურატორი
                        </Link>
                        <Link
                            to="/parts"
                            style={{
                                padding: '13px 28px',
                                background: 'transparent',
                                border: `1px solid ${theme.border}`,
                                borderRadius: '8px',
                                color: theme.text,
                                fontSize: '14px',
                                textDecoration: 'none'
                            }}
                        >
                            ყველა ნაწილი →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
