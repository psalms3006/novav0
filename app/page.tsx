'use client'

import { FormEvent, useState, type CSSProperties } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Command,
  Cpu,
  Database,
  Grid2X2,
  Headphones,
  Home,
  LayoutGrid,
  Mic,
  MoreHorizontal,
  Network,
  Search,
  Send,
  Settings2,
  Sparkles,
  Terminal,
  WandSparkles,
  X,
} from 'lucide-react'

const railItems = [
  { label: 'Orbit', icon: Home },
  { label: 'Signals', icon: Activity },
  { label: 'Systems', icon: Database },
  { label: 'Spaces', icon: LayoutGrid },
]

const workspaceCopy = {
  Orbit: { eyebrow: 'INTELLIGENCE CORE', title: 'Good morning, Alex.', subtitle: 'Your ambient intelligence is ready.' },
  Signals: { eyebrow: 'SIGNAL DECK', title: 'See what matters now.', subtitle: 'NOVA found 7 threads across your active contexts.' },
  Systems: { eyebrow: 'SYSTEMS MAP', title: 'Everything is connected.', subtitle: 'Trace the tools, people, and processes behind your work.' },
  Spaces: { eyebrow: 'YOUR SPACES', title: 'Choose a direction.', subtitle: 'Move between focused environments without losing the thread.' },
} as const

const signalCards = [
  { label: 'Creative direction', meta: '3 new references · high relevance', tone: 'cyan' },
  { label: 'Launch narrative', meta: 'Mentioned across 4 workspaces', tone: 'violet' },
  { label: 'Calendar pressure', meta: 'Two conflicts detected this week', tone: 'blue' },
]

const initialActivity = [
  { time: '09:42', label: 'Morning synthesis complete', detail: '4 signals · 2 priorities', tone: 'cyan' },
  { time: '09:28', label: 'Workspace indexed', detail: 'NOVA / Personal OS', tone: 'blue' },
  { time: '09:14', label: 'Focus mode activated', detail: 'Deep work · 45 min', tone: 'violet' },
]

const particles = Array.from({ length: 76 }, (_, index) => {
  const angle = (index / 76) * Math.PI * 2
  const radius = 42 + ((index * 17) % 55)
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    size: 1 + (index % 3),
    delay: `${(index % 13) * -0.18}s`,
    duration: `${2.8 + (index % 7) * 0.34}s`,
  }
})

function IntelligenceField() {
  return (
    <div className="intelligence-field" aria-hidden="true">
      <div className="field-glow" />
      <div className="field-wave wave-a" />
      <div className="field-wave wave-b" />
      <div className="field-wave wave-c" />
      <div className="particle-cloud">
        {particles.map((particle, index) => (
          <span key={index} className="particle" style={{ '--x': `${particle.x}px`, '--y': `${particle.y}px`, '--size': `${particle.size}px`, '--delay': particle.delay, '--duration': particle.duration } as CSSProperties} />
        ))}
      </div>
      <div className="field-kernel"><span /><span /><span /></div>
    </div>
  )
}

export default function Page() {
  const [activeRail, setActiveRail] = useState('Orbit')
  const [isListening, setIsListening] = useState(false)
  const [command, setCommand] = useState('')
  const [activity, setActivity] = useState(initialActivity)
  const [orbState, setOrbState] = useState('ready')

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = command.trim()
    if (!trimmed) return
    setOrbState('thinking')
    setActivity((items) => [
      { time: 'now', label: 'Command received', detail: trimmed, tone: 'cyan' },
      ...items.slice(0, 2),
    ])
    setCommand('')
    window.setTimeout(() => setOrbState('ready'), 1600)
  }

  return (
    <main className="nova-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <aside className="nova-rail" aria-label="Primary navigation">
        <div className="nova-mark"><span>N</span></div>
        <div className="rail-stack">
          {railItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`rail-button ${activeRail === label ? 'is-active' : ''}`} onClick={() => setActiveRail(label)} aria-label={label} aria-pressed={activeRail === label}>
              <Icon size={18} strokeWidth={1.7} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="rail-bottom">
          <button className="rail-button" aria-label="Settings"><Settings2 size={18} strokeWidth={1.7} /></button>
          <div className="avatar" aria-label="User profile">AR</div>
        </div>
      </aside>

      <section className="nova-content">
        <header className="topbar">
          <div className="breadcrumb"><span className="eyebrow">NOVA</span><span className="slash">/</span><span>{activeRail}</span></div>
          <div className="top-actions">
            <span className="system-status"><i /> All systems nominal</span>
            <button className="icon-button" aria-label="Search"><Search size={16} /></button>
            <button className="icon-button" aria-label="Notifications"><Bell size={16} /><b /></button>
            <button className="icon-button" aria-label="More options"><MoreHorizontal size={17} /></button>
          </div>
        </header>

        <div className="workspace">
          <div className="workspace-heading">
            <div><p className="micro-label">{workspaceCopy[activeRail as keyof typeof workspaceCopy].eyebrow} <span>● ONLINE</span></p><h1>{workspaceCopy[activeRail as keyof typeof workspaceCopy].title}</h1><p className="subheading">{workspaceCopy[activeRail as keyof typeof workspaceCopy].subtitle}</p></div>
            <button className="date-chip"><span>MON</span> 24 AUG 2026 <ArrowUpRight size={13} /></button>
          </div>

          {activeRail === 'Signals' && <section className="signal-deck" aria-label="Signal review workflow">
            <div className="deck-head"><div><p className="micro-label">REVIEW QUEUE</p><strong>Three threads want your attention</strong></div><span className="queue-count">03</span></div>
            <div className="signal-list">{signalCards.map((signal) => <button className="signal-card" key={signal.label} onClick={() => { setCommand(`Open ${signal.label}`); setOrbState('thinking') }}><span className={`activity-dot ${signal.tone}`} /><span><strong>{signal.label}</strong><small>{signal.meta}</small></span><ArrowUpRight size={14} /></button>)}</div>
          </section>}

          <section className={`orb-stage ${orbState} ${activeRail !== 'Orbit' ? 'compact' : ''}`} aria-label="NOVA intelligence core">
            <div className="stage-readout top-readout"><span className="readout-dot" />{orbState === 'thinking' ? 'PROCESSING SIGNAL' : isListening ? 'LISTENING' : 'AWAITING INPUT'}</div>
            <div className="orb-wrap" onClick={() => setIsListening(!isListening)} role="button" tabIndex={0} aria-label="Toggle listening mode" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setIsListening(!isListening) }}>
              <IntelligenceField />
            </div>
            <div className="stage-readout bottom-readout"><span>01</span><div className="readout-line" /><span>07</span></div>
            <div className="orb-caption"><span className="caption-icon"><Sparkles size={13} /></span><span>Ask NOVA anything</span><kbd>⌘ K</kbd></div>
          </section>

          <div className="lower-grid">
            <div className="quick-actions"><p className="micro-label">QUICK LAUNCH</p><div className="action-row"><button><WandSparkles size={15} />Synthesize day</button><button><Network size={15} />Map my signals</button><button><Terminal size={15} />Open command line</button></div></div>
            <div className="focus-card"><div className="focus-icon"><Headphones size={16} /></div><div><p className="micro-label">CURRENT FOCUS</p><strong>Creative direction</strong></div><span className="focus-time">32:18</span></div>
          </div>
        </div>

        <aside className="activity-panel">
          <div className="panel-heading"><div><p className="micro-label">LIVE FEED</p><h2>Activity</h2></div><button className="icon-button" aria-label="Expand activity"><Grid2X2 size={15} /></button></div>
          <div className="pulse-card"><div className="pulse-visual"><span /><span /><span /></div><div><p className="micro-label">NOVA PULSE</p><strong>Quietly observing</strong><p>3 active contexts</p></div></div>
          <div className="activity-list">{activity.map((item, index) => <div className="activity-item" key={`${item.time}-${index}`}><span className={`activity-dot ${item.tone}`} /><div><p>{item.label}</p><span>{item.detail}</span></div><time>{item.time}</time></div>)}</div>
          <button className="view-all">View all activity <ArrowUpRight size={14} /></button>
        </aside>
      </section>

      <form className="command-dock" onSubmit={submitCommand}><button type="button" className={`listen-button ${isListening ? 'listening' : ''}`} onClick={() => setIsListening(!isListening)} aria-label={isListening ? 'Stop listening' : 'Start listening'}>{isListening ? <X size={18} /> : <Mic size={18} />}</button><Command size={15} className="command-symbol" /><input value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Direct NOVA..." aria-label="Command NOVA" /><span className="dock-hint">Enter to send</span><button className="send-button" type="submit" aria-label="Send command"><Send size={16} /></button></form>
      <footer className="shell-footer"><span><Cpu size={13} /> NOVA OS 1.4.0</span><span>ENCRYPTED SESSION <i /></span></footer>
    </main>
  )
}
