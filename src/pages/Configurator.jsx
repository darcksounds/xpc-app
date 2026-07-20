import { useState, useEffect } from 'react'
import { getProducts } from '../sanity/queries'
import { useTheme } from '../context/ThemeContext'

const STEPS = [
  { key: 'cpu', label: 'პროცესორი', category: 'პროცესორი', icon: '🖥️' },
  { key: 'motherboard', label: 'დედაბარათი', category: 'დედაბარათი', icon: '🟩' },
  { key: 'ram', label: 'მეხსიერება', category: 'მეხსიერების მოდული', icon: '💾' },
  { key: 'gpu', label: 'ვიდეობარათი', category: 'ვიდეობარათი', icon: '🎮' },
  { key: 'storage', label: 'SSD / HDD', category: 'ვინჩესტერები', icon: '💿' },
  { key: 'psu', label: 'კვების ბლოკი', category: 'კვების ბლოკი', icon: '🔌' },
  { key: 'cooler', label: 'გამაგრილებელი', category: 'ქულერი', icon: '🧊' },
  { key: 'case', label: 'კორპუსი', category: 'ქეისი', icon: '📦' },
]

function checkCompatibility(selected) {
  const errors = []
  if (selected.cpu && selected.motherboard) {
    if (selected.cpu.specs?.socket && selected.motherboard.specs?.socket) {
      if (selected.cpu.specs.socket !== selected.motherboard.specs.socket) {
        errors.push(`CPU სოკეტი (${selected.cpu.specs.socket}) არ ემთხვევა დედაბარათს (${selected.motherboard.specs.socket})`)
      }
    }
  }
  if (selected.motherboard && selected.ram) {
    if (selected.motherboard.specs?.memoryType && selected.ram.specs?.memoryType) {
      if (selected.motherboard.specs.memoryType !== selected.ram.specs.memoryType) {
        errors.push(`RAM ტიპი (${selected.ram.specs.memoryType}) არ ემთხვევა დედაბარათს (${selected.motherboard.specs.memoryType})`)
      }
    }
  }
  const totalTdp = (selected.cpu?.specs?.tdp || 0) + (selected.gpu?.specs?.tdp || 0) + 100
  if (selected.psu && selected.psu.specs?.wattage) {
    if (selected.psu.specs.wattage < totalTdp) {
      errors.push(`კვების ბლოკი არ ყოფნის (საჭიროა ${totalTdp}W, გაქვს ${selected.psu.specs.wattage}W)`)
    }
  }
  return errors
}

function Configurator() {
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState({})
  const [activeStep, setActiveStep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  const getStepProducts = (step) => products.filter(p => p.category?.name === step.category)

  const selectProduct = (stepKey, product) => {
    setSelected(prev => ({ ...prev, [stepKey]: product }))
    setActiveStep(null)
  }

  const removeProduct = (stepKey) => {
    setSelected(prev => {
      const next = { ...prev }
      delete next[stepKey]
      return next
    })
  }

  const totalPrice = Object.values(selected).reduce((sum, p) => sum + (p?.price || 0), 0)
  const selectedCount = Object.keys(selected).length
  const errors = checkCompatibility(selected)
  const totalTdp = (selected.cpu?.specs?.tdp || 0) + (selected.gpu?.specs?.tdp || 0) + 100

  const Summary = () => (
    <div style={{
      background: theme.surface, border: `1px solid ${theme.border}`,
      borderRadius: '12px', padding: '1.5rem'
    }}>
      <div style={{ fontSize: '16px', fontWeight: '700', color: theme.text, marginBottom: '1.5rem' }}>
        კონფიგურაციის ჯამი
      </div>

      <div style={{
        padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem',
        background: errors.length === 0 ? '#22C55E15' : '#ef444415',
        border: `1px solid ${errors.length === 0 ? '#22C55E30' : '#ef444430'}`
      }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: errors.length === 0 ? '#22C55E' : '#ef4444' }}>
          {errors.length === 0 ? '✓ თავსებადია' : '✗ თავსებადობის შეცდომა'}
        </div>
        {errors.map((err, i) => (
          <div key={i} style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>• {err}</div>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {STEPS.map(step => (
          <div key={step.key} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', borderBottom: `1px solid ${theme.border}`, fontSize: '12px'
          }}>
            <span style={{ color: theme.muted }}>{step.label}</span>
            <span style={{ color: selected[step.key] ? theme.text : theme.muted, fontWeight: selected[step.key] ? '500' : '400' }}>
              {selected[step.key] ? `${selected[step.key].price} ₾` : '—'}
            </span>
          </div>
        ))}
      </div>

      {totalTdp > 100 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', marginBottom: '8px', fontSize: '12px' }}>
          <span style={{ color: theme.muted }}>სავარაუდო სიმძლავრე</span>
          <span style={{ color: '#F59E0B' }}>~{totalTdp}W</span>
        </div>
      )}

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 0', borderTop: `1px solid ${theme.border}`, marginBottom: '1rem'
      }}>
        <span style={{ fontSize: '14px', color: theme.muted }}>სულ</span>
        <span style={{ fontSize: '28px', fontWeight: '800', color: theme.text }}>
          {totalPrice.toFixed(2)} <span style={{ fontSize: '14px', color: theme.muted }}>₾</span>
        </span>
      </div>

      <button
        disabled={selectedCount === 0 || errors.length > 0}
        style={{
          width: '100%', padding: '14px',
          background: selectedCount === 0 || errors.length > 0 ? theme.border : '#F59E0B',
          border: 'none', borderRadius: '10px',
          color: selectedCount === 0 || errors.length > 0 ? theme.muted : '#000',
          fontSize: '15px', fontWeight: '700',
          cursor: selectedCount === 0 || errors.length > 0 ? 'not-allowed' : 'pointer',
          transition: 'all .2s'
        }}
      >🛒 კალათაში დამატება</button>

      {selectedCount > 0 && (
        <button
          onClick={() => setSelected({})}
          style={{
            width: '100%', padding: '10px', marginTop: '8px',
            background: 'transparent', border: `1px solid ${theme.border}`,
            borderRadius: '8px', color: theme.muted, fontSize: '13px', cursor: 'pointer'
          }}
        >გასუფთავება</button>
      )}
    </div>
  )

  return (
    <div style={{ flex: 1, background: theme.bg, padding: '2rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* header */}
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          borderRadius: '12px', padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700', color: theme.text, marginBottom: '4px' }}>
                PC კონფიგურატორი
              </h1>
              {!isMobile && (
                <p style={{ fontSize: '13px', color: theme.muted }}>
                  ააწყვე შენი კომპიუტერი — კომპატიბილობა ავტომატურად შემოწმდება
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '13px', color: theme.muted }}>
                <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '20px' }}>{selectedCount}</span>
                <span> / {STEPS.length}</span>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowSummary(!showSummary)}
                  style={{
                    padding: '8px 14px', background: '#F59E0B20',
                    border: '1px solid #F59E0B40', borderRadius: '8px',
                    color: '#F59E0B', fontSize: '12px', cursor: 'pointer'
                  }}
                >
                  {showSummary ? 'დახურვა' : 'ჯამი'}
                </button>
              )}
            </div>
          </div>
          <div style={{ height: '4px', background: theme.bg, borderRadius: '2px', marginTop: '1rem' }}>
            <div style={{
              height: '100%', borderRadius: '2px', background: '#F59E0B',
              width: `${(selectedCount / STEPS.length) * 100}%`, transition: 'width .3s'
            }} />
          </div>
        </div>

        {/* mobile summary */}
        {isMobile && showSummary && (
          <div style={{ marginBottom: '1.5rem' }}>
            <Summary />
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
          gap: '2rem'
        }}>
          {/* steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STEPS.map(step => (
              <div key={step.key}>
                <div style={{
                  background: theme.surface,
                  border: `1px solid ${selected[step.key] ? '#F59E0B40' : theme.border}`,
                  borderRadius: '12px', overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem', cursor: 'pointer'
                  }}
                    onClick={() => setActiveStep(activeStep === step.key ? null : step.key)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>{step.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: isMobile ? '13px' : '15px', fontWeight: '600', color: theme.text }}>
                          {step.label}
                        </div>
                        {selected[step.key] ? (
                          <div style={{
                            fontSize: '11px', color: '#F59E0B', marginTop: '2px',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                          }}>
                            ✓ {selected[step.key].name} — {selected[step.key].price} ₾
                          </div>
                        ) : (
                          <div style={{ fontSize: '11px', color: theme.muted, marginTop: '2px' }}>
                            არ არის არჩეული
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      {selected[step.key] && (
                        <button
                          onClick={e => { e.stopPropagation(); removeProduct(step.key) }}
                          style={{
                            background: 'transparent', border: '1px solid #ef444440',
                            color: '#ef4444', padding: '4px 8px', borderRadius: '6px',
                            fontSize: '11px', cursor: 'pointer'
                          }}
                        >წაშლა</button>
                      )}
                      <span style={{ color: theme.muted, fontSize: '16px' }}>
                        {activeStep === step.key ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {activeStep === step.key && (
                    <div style={{ borderTop: `1px solid ${theme.border}`, padding: '1rem' }}>
                      {loading ? (
                        <div style={{ color: theme.muted, textAlign: 'center', padding: '1rem' }}>იტვირთება...</div>
                      ) : getStepProducts(step).length === 0 ? (
                        <div style={{ color: theme.muted, textAlign: 'center', padding: '1rem' }}>პროდუქტი არ მოიძებნა</div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {getStepProducts(step).map(p => (
                            <div key={p._id}
                              onClick={() => selectProduct(step.key, p)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px', borderRadius: '8px', cursor: 'pointer',
                                background: selected[step.key]?._id === p._id ? '#F59E0B15' : theme.bg,
                                border: `1px solid ${selected[step.key]?._id === p._id ? '#F59E0B40' : theme.border}`,
                                transition: 'all .2s'
                              }}
                            >
                              <div style={{
                                width: '44px', height: '44px', borderRadius: '8px',
                                background: theme.card, overflow: 'hidden', flexShrink: 0
                              }}>
                                {p.images?.[0]
                                  ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '18px' }}>🖥️</div>
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '11px', color: '#F59E0B', marginBottom: '2px' }}>{p.brand}</div>
                                <div style={{
                                  fontSize: '12px', color: theme.text, lineHeight: '1.3',
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                }}>{p.name}</div>
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: theme.text, flexShrink: 0 }}>
                                {p.price} ₾
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* desktop summary */}
          {!isMobile && (
            <div style={{ position: 'sticky', top: '90px', alignSelf: 'flex-start' }}>
              <Summary />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Configurator