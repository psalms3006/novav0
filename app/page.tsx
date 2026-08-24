'use client'

import { useState, type CSSProperties } from 'react'
import { Activity, Bell, Bot, ChevronLeft, ChevronRight, CircleHelp, FileText, FolderOpen, Gauge, Headphones, Home, Layers3, MemoryStick, Mic, Monitor, MoreHorizontal, Play, Search, Settings2, Sparkles, Square, Terminal, Wifi, X, Zap } from 'lucide-react'

const nav = [
  { label: 'Presence', icon: Home }, { label: 'Tasks', icon: Zap }, { label: 'Memory', icon: MemoryStick }, { label: 'Files', icon: FolderOpen }, { label: 'Skills', icon: Layers3 }, { label: 'Settings', icon: Settings2 },
]
const particles = Array.from({ length: 92 }, (_, i) => { const a = i * 2.399; const r = 52 + (i % 11) * 7; return { x: Math.cos(a) * r, y: Math.sin(a) * r, s: i % 3 === 0 ? 3 : 1 + i % 2, d: `${-(i % 15) / 2}s` } })

function IntelligenceCore({ state }: { state: string }) {
  return <div className={`core ${state}`} aria-label={`NOVA is ${state}`}>
    <div className="core-aura" />
    <div className="core-wave wave-one" /><div className="core-wave wave-two" /><div className="core-wave wave-three" />
    <div className="core-particles">{particles.map((p, i) => <i key={i} style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--s': `${p.s}px`, '--d': p.d } as CSSProperties} />)}</div>
    <div className="core-heart"><span /><span /><span /></div>
  </div>
}

function AmbientOrb({ state, onExpand, onToggle }: { state: string; onExpand: () => void; onToggle: () => void }) {
  return <aside className="ambient-orb" aria-label="NOVA ambient presence">
    <button className="mini-core" onClick={onExpand} aria-label="Expand NOVA"><IntelligenceCore state={state} /></button>
    <div className="ambient-copy"><span>NOVA</span><strong>{state === 'listening' ? 'Listening' : state === 'thinking' ? 'Thinking' : 'Present'}</strong></div>
    <button className="orb-stop" onClick={onToggle} aria-label="Toggle listening">{state === 'listening' ? <X size={12} /> : <Mic size={12} />}</button>
  </aside>
}

export default function Page() {
  const [active, setActive] = useState('Presence')
  const [state, setState] = useState('ready')
  const [command, setCommand] = useState('')
  const [ambient, setAmbient] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [transcript, setTranscript] = useState('Ask NOVA to move with you through your work.')
  const [events, setEvents] = useState(['Listening for your next direction', 'Indexed 3 active workspaces', 'Focus session is ready'])
  const run = (text: string) => { if (!text.trim()) return; setTranscript(text); setCommand(''); setState('thinking'); setEvents((e) => [`Working: ${text}`, ...e.slice(0, 2)]); window.setTimeout(() => { setState('speaking'); setTranscript('I’m on it. I found the right context and will keep working in the background.'); window.setTimeout(() => setState('ready'), 1900) }, 1100) }
  const pageTitle = active === 'Presence' ? 'NOVA is present.' : active === 'Tasks' ? 'Work that keeps moving.' : active === 'Memory' ? 'Context, under your control.' : active === 'Files' ? 'Your workspace, understood.' : active === 'Skills' ? 'Capabilities at the edge.' : 'Tune the intelligence.'
  if (ambient) return <><div className="ambient-desktop"><div className="desktop-hint"><Monitor size={14} /> NOVA is working with your desktop <span>VS Code · active context</span></div><div className="ambient-task"><span className="live-dot" /> {state === 'thinking' ? 'Analyzing VS Code...' : 'Ready when you are'}</div></div><AmbientOrb state={state} onExpand={() => setAmbient(false)} onToggle={() => setState(state === 'listening' ? 'ready' : 'listening')} /><button className="ambient-expand" onClick={() => setAmbient(false)}>Open full NOVA</button></>
  return <main className="nova-app">
    <div className="ambient-grid" />
    <aside className="sidebar"><div className="brand"><div className="brand-mark">N</div><span>NOVA <small>OS</small></span></div><div className="nav-label">WORKSPACE</div><nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon size={16} /><span>{label}</span>{label === 'Tasks' && <b>2</b>}</button>)}</nav><div className="sidebar-foot"><div className="user-chip"><div>AR</div><span>Alex Rivera<small>Local session</small></span></div><button className="help" aria-label="Help"><CircleHelp size={16} /></button></div></aside>
    <section className="main-view"><header className="topbar"><div className="crumb"><span>NOVA</span><ChevronRight size={13} /> {active}</div><div className="top-actions"><span className="online"><i /> Online · Gemini Live</span><button aria-label="Search"><Search size={16} /></button><button aria-label="Notifications"><Bell size={16} /><em /></button><button aria-label="More"><MoreHorizontal size={18} /></button></div></header>
      <div className="page-body"><div className="page-intro"><div><p className="kicker"><Sparkles size={13} /> INTELLIGENCE CORE <span>● ONLINE</span></p><h1>{pageTitle}</h1><p>Voice-first computing that follows your workflow, not the other way around.</p></div><button className="window-control" onClick={() => setAmbient(true)}><Square size={13} /> Minimize to ambient orb</button></div>
        {active === 'Presence' ? <div className="presence-grid"><section className="presence-stage"><div className="stage-top"><span>CORE ACTIVITY</span><span><i className="live-dot" /> {state === 'ready' ? 'Awaiting input' : state}</span></div><div className="core-wrap" onClick={() => setState(state === 'listening' ? 'ready' : 'listening')} role="button" tabIndex={0} aria-label="Toggle NOVA listening"><IntelligenceCore state={state} /></div><div className="state-line"><strong>{state === 'ready' ? 'NOVA' : state === 'speaking' ? 'NOVA is speaking' : state === 'thinking' ? 'Working on it' : 'Listening'}</strong><span>{state === 'ready' ? 'Your ambient intelligence is ready.' : transcript}</span></div><div className="transcript"><div><span>LIVE TRANSCRIPT</span><small>00:04</small></div><p>{transcript}</p></div><div className="voice-actions"><button className={state === 'listening' ? 'listening' : ''} onClick={() => setState(state === 'listening' ? 'ready' : 'listening')}><Mic size={17} /> {state === 'listening' ? 'Listening' : 'Speak to NOVA'}</button><button onClick={() => setAmbient(true)}><Monitor size={16} /> Stay with me</button></div></section><aside className="proof-panel"><div className="panel-title"><div><span>PROOF OF WORK</span><h2>Working memory</h2></div><Activity size={16} /></div><div className="work-card"><div className="work-icon"><FileText size={16} /></div><div><strong>Thermodynamics assignment</strong><small>Active task · 68% complete</small></div><span>...</span></div><div className="steps"><div className="done"><i>✓</i><span>Found assignment context<small>Documents / School</small></span><time>done</time></div><div className="done"><i>✓</i><span>Identified requirements<small>3 sources matched</small></span><time>done</time></div><div className="current"><i><span /></i><span>Researching thermodynamics<small>Gathering useful sources</small></span><time>now</time></div><div><i>○</i><span>Creating document<small>Waiting</small></span></div></div><button className="view-task" onClick={() => setActive('Tasks')}>Open task workspace <ChevronRight size={14} /></button></aside></div> : <div className="secondary-grid">{(active === 'Tasks' ? ['Thermodynamics assignment','Prepare launch brief','Organize downloads'] : active === 'Memory' ? ['Writing preferences','Frequently used apps','Active projects'] : active === 'Files' ? ['School / Assignments','Work / NOVA','Downloads / Recent'] : active === 'Skills' ? ['Vision & screen awareness','Browser control','Document creation'] : ['Voice & audio','Models','Privacy & permissions']).map((item, i) => <article key={item}><div className="list-icon">{active === 'Tasks' ? <Zap size={17} /> : active === 'Files' ? <FolderOpen size={17} /> : active === 'Skills' ? <Bot size={17} /> : <Gauge size={17} />}</div><div><span>{active.toUpperCase()}</span><h3>{item}</h3><p>{i === 0 ? 'Active now · NOVA is keeping context' : 'Ready to inspect and manage'}</p></div><ChevronRight size={16} /></article>)}</div>}
      </div><footer className="footer"><span><Wifi size={12} /> LOCAL SESSION ENCRYPTED</span><span>NOVA OS 1.4.0 · <i className="live-dot" /> ALL SYSTEMS NOMINAL</span></footer></section>
    <form className="command-bar" onSubmit={(e) => { e.preventDefault(); run(command) }}><button type="button" aria-label="Toggle microphone" onClick={() => setState(state === 'listening' ? 'ready' : 'listening')}><Mic size={17} /></button><span>/</span><input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Direct NOVA..." aria-label="Direct NOVA" /><kbd>⌘ K</kbd><button type="submit" aria-label="Send command"><Play size={14} fill="currentColor" /></button></form>
  </main>
}
