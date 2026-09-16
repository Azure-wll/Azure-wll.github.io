"use client";

import { useEffect, useMemo, useState } from "react";
import { cards, getCard, learningDays, type LearningCard } from "./learning-data";

type View = "today" | "week" | "inbox" | "me";
type Progress = {
  completed: string[];
  answers: Record<string, number>;
  notes: Record<string, string>;
  inbox: { id: number; text: string; type: string }[];
};

const emptyProgress: Progress = { completed: [], answers: {}, notes: {}, inbox: [] };

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>("today");
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCard, setSelectedCard] = useState<LearningCard | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("zhiku-progress-v1");
    if (saved) {
      try { setProgress(JSON.parse(saved)); } catch { /* keep a clean local profile */ }
    }
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => null);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("zhiku-progress-v1", JSON.stringify(progress));
  }, [progress, ready]);

  const day = learningDays.find((item) => item.day === selectedDay) ?? learningDays[0];
  const todayCards = [getCard(day.career), getCard(day.life)];
  const completedCount = progress.completed.length;
  const percent = Math.round((completedCount / cards.length) * 100);

  function updateProgress(next: Partial<Progress>) {
    setProgress((current) => ({ ...current, ...next }));
  }

  function completeCard(cardId: string, answer: number, note: string) {
    setProgress((current) => ({
      ...current,
      completed: current.completed.includes(cardId)
        ? current.completed
        : [...current.completed, cardId],
      answers: { ...current.answers, [cardId]: answer },
      notes: note ? { ...current.notes, [cardId]: note } : current.notes,
    }));
  }

  function swapSet() {
    setSelectedDay((current) => (current >= 5 ? 1 : current + 1));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("today")} aria-label="返回今日学习">
          <span className="brand-mark">知</span>
          <span><strong>知库</strong><small>每天20分钟，慢慢变厉害</small></span>
        </button>
        <button className="install-button" onClick={() => setShowInstall(true)}>
          <Icon>⇩</Icon><span>装到手机</span>
        </button>
      </header>

      <section className="content-wrap">
        {view === "today" && (
          <TodayView
            cards={todayCards}
            selectedDay={selectedDay}
            completed={progress.completed}
            onOpen={setSelectedCard}
            onSwap={swapSet}
            onWeek={() => setView("week")}
            percent={percent}
          />
        )}
        {view === "week" && (
          <WeekView
            progress={progress}
            onOpen={setSelectedCard}
            onPickDay={(value) => { setSelectedDay(value); setView("today"); }}
          />
        )}
        {view === "inbox" && <InboxView progress={progress} updateProgress={updateProgress} />}
        {view === "me" && <MeView progress={progress} percent={percent} updateProgress={updateProgress} />}
      </section>

      <nav className="bottom-nav" aria-label="主要导航">
        <NavItem active={view === "today"} icon="⌂" label="今天" onClick={() => setView("today")} />
        <NavItem active={view === "week"} icon="▦" label="本周" onClick={() => setView("week")} />
        <button className="capture-button" onClick={() => setView("inbox")} aria-label="添加知识">
          <span>＋</span>
        </button>
        <NavItem active={view === "inbox"} icon="◇" label="收件箱" onClick={() => setView("inbox")} />
        <NavItem active={view === "me"} icon="◉" label="我的" onClick={() => setView("me")} />
      </nav>

      {selectedCard && (
        <CardReader
          card={selectedCard}
          savedAnswer={progress.answers[selectedCard.id]}
          savedNote={progress.notes[selectedCard.id] ?? ""}
          completed={progress.completed.includes(selectedCard.id)}
          onClose={() => setSelectedCard(null)}
          onComplete={completeCard}
        />
      )}

      {showInstall && <InstallSheet onClose={() => setShowInstall(false)} />}
    </main>
  );
}

function TodayView({ cards: todayCards, selectedDay, completed, onOpen, onSwap, onWeek, percent }: {
  cards: LearningCard[];
  selectedDay: number;
  completed: string[];
  onOpen: (card: LearningCard) => void;
  onSwap: () => void;
  onWeek: () => void;
  percent: number;
}) {
  const done = todayCards.filter((card) => completed.includes(card.id)).length;
  return (
    <>
      <section className="hero">
        <div className="date-chip">7天体验 · 第 {selectedDay} 天</div>
        <h1>今天，给自己<br /><em>20分钟</em></h1>
        <p>两张卡刚刚好：一张让工作更专业，一张让生活更清醒。</p>
        <div className="hero-progress" aria-label={`本周进度${percent}%`}>
          <span><b>{done}</b>/2 今日完成</span>
          <div><i style={{ width: `${done * 50}%` }} /></div>
        </div>
      </section>

      <div className="section-heading">
        <div><span className="overline">TODAY&apos;S PAIR</span><h2>今日双卡</h2></div>
        <button className="text-button" onClick={onSwap}>换一组 <span>↻</span></button>
      </div>

      <div className="card-grid">
        {todayCards.map((card, index) => (
          <LearningCardTile
            key={card.id}
            card={card}
            index={index}
            complete={completed.includes(card.id)}
            onOpen={() => onOpen(card)}
          />
        ))}
      </div>

      <button className="week-banner" onClick={onWeek}>
        <span className="week-icon">✓</span>
        <span><small>周末自动整理</small><strong>本周复习已为你准备</strong></span>
        <b>→</b>
      </button>
      <p className="quiet-note">没有连续打卡压力。今天没学完，明天接着来。</p>
    </>
  );
}

function LearningCardTile({ card, index, complete, onOpen }: {
  card: LearningCard; index: number; complete: boolean; onOpen: () => void;
}) {
  return (
    <article className={`learning-tile ${card.kind} ${complete ? "is-complete" : ""}`}>
      <div className="tile-topline">
        <span className="category-pill">{card.category}</span>
        {complete ? <span className="done-badge">已学完</span> : <span className="card-number">0{index + 1}</span>}
      </div>
      <div className="tile-visual" aria-hidden="true">
        {card.kind === "career" ? <><i /><i /><i /><span>HR</span></> : <><i /><span>?</span><i /></>}
      </div>
      <span className="eyebrow">{card.eyebrow}</span>
      <h3>{card.title}</h3>
      <p>{card.summary}</p>
      <button className="primary-button" onClick={onOpen}>
        {complete ? "再看一遍" : "开始学习"}<span>→</span>
      </button>
    </article>
  );
}

function CardReader({ card, savedAnswer, savedNote, completed, onClose, onComplete }: {
  card: LearningCard;
  savedAnswer?: number;
  savedNote: string;
  completed: boolean;
  onClose: () => void;
  onComplete: (id: string, answer: number, note: string) => void;
}) {
  const [answer, setAnswer] = useState<number | null>(savedAnswer ?? null);
  const [checked, setChecked] = useState(savedAnswer !== undefined);
  const [note, setNote] = useState(savedNote);
  const [deepOpen, setDeepOpen] = useState(false);
  const [listening, setListening] = useState(false);

  function checkAnswer(value: number) {
    setAnswer(value);
    setChecked(true);
  }

  function startVoice() {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }).SpeechRecognition
      ?? (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      window.alert("当前浏览器暂不支持语音转文字。你可以跳过，或使用键盘上的麦克风输入。");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (event: any) => setNote((current) => `${current}${current ? " " : ""}${event.results[0][0].transcript}`);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  }

  return (
    <div className="reader-overlay" role="dialog" aria-modal="true" aria-label={card.title}>
      <div className="reader">
        <header className="reader-header">
          <button onClick={onClose} aria-label="关闭学习卡">←</button>
          <span>{card.kind === "career" ? "职业知识" : "生活与心理"}</span>
          <small>{card.minutes} min</small>
        </header>
        <div className={`reader-hero ${card.kind}`}>
          <span>{card.category}</span>
          <h1>{card.title}</h1>
          <p>{card.summary}</p>
        </div>
        <div className="reader-body">
          <section className="memory-box">
            <small>今天只记住这一句</small>
            <p>{card.keyPoint}</p>
          </section>

          {card.sections.map((section, index) => (
            <section className="lesson-section" key={section.title}>
              <span className="section-index">0{index + 1}</span>
              <div><h2>{section.title}</h2><p>{section.body}</p></div>
            </section>
          ))}

          <button className="deep-toggle" onClick={() => setDeepOpen((value) => !value)}>
            <span>专业补充与来源</span><b>{deepOpen ? "−" : "+"}</b>
          </button>
          {deepOpen && (
            <section className="deep-panel">
              <h3>常见误区</h3><p>{card.misconception}</p>
              <h3>放进真实场景</h3><p>{card.scenario}</p>
              <a href={card.source.url} target="_blank" rel="noreferrer">{card.source.label} ↗</a>
              <small>资料核验：{card.source.verified}</small>
            </section>
          )}

          <section className="quiz-box">
            <span className="overline">QUICK CHECK</span>
            <h2>用一道题确认自己真的懂了</h2>
            <p>{card.question.prompt}</p>
            <div className="answer-list">
              {card.question.options.map((option, index) => {
                const state = checked
                  ? index === card.question.answer ? "correct" : index === answer ? "wrong" : ""
                  : answer === index ? "selected" : "";
                return <button key={option} className={state} onClick={() => checkAnswer(index)}><i>{String.fromCharCode(65 + index)}</i><span>{option}</span></button>;
              })}
            </div>
            {checked && (
              <div className={`feedback ${answer === card.question.answer ? "right" : "retry"}`}>
                <strong>{answer === card.question.answer ? "答对了" : "再想一步"}</strong>
                <p>{card.question.explanation}</p>
              </div>
            )}
          </section>

          <section className="note-box">
            <div><span className="overline">OPTIONAL</span><h2>用一句话留下你的理解</h2></div>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="可以写，也可以完全跳过……" />
            <button className={`voice-button ${listening ? "listening" : ""}`} onClick={startVoice}>
              <span>{listening ? "●" : "◉"}</span>{listening ? "正在听，请说话…" : "用语音说一说"}
            </button>
          </section>

          <button
            className="complete-button"
            disabled={!checked}
            onClick={() => { if (answer !== null) { onComplete(card.id, answer, note); onClose(); } }}
          >
            {completed ? "保存并返回" : "完成这张卡"}<span>✓</span>
          </button>
          {!checked && <p className="complete-hint">完成小测后即可保存学习记录</p>}
        </div>
      </div>
    </div>
  );
}

function WeekView({ progress, onOpen, onPickDay }: {
  progress: Progress;
  onOpen: (card: LearningCard) => void;
  onPickDay: (day: number) => void;
}) {
  const learnedCards = cards.filter((card) => progress.completed.includes(card.id));
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const reviewCard = learnedCards[reviewIndex] ?? cards[0];

  return (
    <div className="page-stack">
      <section className="page-title">
        <span className="overline">YOUR WEEK</span>
        <h1>这一周，学得轻一点</h1>
        <p>五天新知识，两天留给生活。周末想复习时再回来。</p>
      </section>
      <div className="week-list">
        {learningDays.map((item) => {
          const pair = [getCard(item.career), getCard(item.life)];
          const count = pair.filter((card) => progress.completed.includes(card.id)).length;
          return (
            <button key={item.day} className="week-row" onClick={() => onPickDay(item.day)}>
              <span className="day-number">{item.day}</span>
              <span className="day-copy"><small>{item.label} · 20分钟</small><strong>{pair[0].category} × {pair[1].category}</strong><em>{pair[0].title} / {pair[1].title}</em></span>
              <span className={`day-state ${count === 2 ? "done" : ""}`}>{count === 2 ? "✓" : `${count}/2`}</span>
            </button>
          );
        })}
        <div className="week-row rest"><span className="day-number">6</span><span className="day-copy"><small>周六</small><strong>自由日</strong><em>休息、补学，或者从收件箱挑一个问题</em></span><span className="day-state">☕</span></div>
        <div className="week-row rest"><span className="day-number">7</span><span className="day-copy"><small>周日</small><strong>自由日</strong><em>想复习就做几道题，不做也没关系</em></span><span className="day-state">○</span></div>
      </div>

      <section className="review-panel">
        <span className="overline">WEEKLY REVIEW</span>
        <h2>把学过的内容轻轻捞回来</h2>
        {learnedCards.length === 0 ? (
          <div className="empty-state"><span>◌</span><p>完成第一张卡后，这里会自动生成复习题。</p></div>
        ) : (
          <>
            <p className="review-question">{reviewCard.question.prompt}</p>
            <div className="mini-answer-list">
              {reviewCard.question.options.map((option, index) => (
                <button key={option} onClick={() => setReviewResult(index === reviewCard.question.answer ? "答对了，记忆很稳。" : reviewCard.question.explanation)}>{option}</button>
              ))}
            </div>
            {reviewResult && <p className="review-result">{reviewResult}</p>}
            <button className="text-button" onClick={() => { setReviewIndex((value) => (value + 1) % learnedCards.length); setReviewResult(null); }}>换一道 →</button>
          </>
        )}
      </section>
    </div>
  );
}

function InboxView({ progress, updateProgress }: { progress: Progress; updateProgress: (next: Partial<Progress>) => void }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("文字");
  const [saved, setSaved] = useState(false);

  function save() {
    if (!text.trim()) return;
    updateProgress({ inbox: [{ id: Date.now(), text: text.trim(), type }, ...progress.inbox] });
    setText(""); setSaved(true); window.setTimeout(() => setSaved(false), 2200);
  }

  function voice() {
    const Recognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!Recognition) { window.alert("可以直接使用iPhone键盘上的麦克风输入。语音内容仍会作为候选知识保存。"); return; }
    const recognition = new Recognition(); recognition.lang = "zh-CN";
    recognition.onresult = (event: any) => { setText(event.results[0][0].transcript); setType("语音"); };
    recognition.start();
  }

  return (
    <div className="page-stack">
      <section className="page-title">
        <span className="overline">KNOWLEDGE INBOX</span>
        <h1>先收下问题，不急着整理</h1>
        <p>遇到不懂的概念、截图或文件，扔进这里。确认后才会成为正式知识卡。</p>
      </section>
      <section className="capture-panel">
        <div className="capture-types">
          {["文字", "语音", "链接", "文件"].map((item) => <button key={item} className={type === item ? "active" : ""} onClick={() => setType(item)}>{item === "文字" ? "Aa" : item === "语音" ? "◉" : item === "链接" ? "↗" : "▱"}<span>{item}</span></button>)}
        </div>
        {type === "文件" ? (
          <label className="file-drop"><input type="file" onChange={(event) => setText(event.target.files?.[0]?.name ?? "")} /><span>＋</span><strong>{text || "选择截图或文件"}</strong><small>原型会先记录文件名，正式版再进行内容识别</small></label>
        ) : (
          <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={type === "链接" ? "粘贴一个网页链接……" : "比如：煤气灯效应到底是什么意思？"} />
        )}
        {type === "语音" && <button className="voice-capture" onClick={voice}>按一下开始说话</button>}
        <button className="primary-button wide" onClick={save}>放进候选区 <span>→</span></button>
        {saved && <p className="saved-toast">已收到。生成知识卡前会先让你确认。</p>}
      </section>
      <section className="inbox-list">
        <div className="section-heading"><div><span className="overline">PENDING</span><h2>候选知识</h2></div><small>{progress.inbox.length} 条</small></div>
        {progress.inbox.length === 0 ? <div className="empty-state"><span>◇</span><p>这里暂时是空的。下一次遇到“不懂但值得懂”的问题，就把它放进来。</p></div> : progress.inbox.map((item) => <div className="inbox-item" key={item.id}><span>{item.type}</span><p>{item.text}</p><button aria-label="更多">···</button></div>)}
      </section>
    </div>
  );
}

function MeView({ progress, percent, updateProgress }: { progress: Progress; percent: number; updateProgress: (next: Partial<Progress>) => void }) {
  const career = cards.filter((c) => c.kind === "career" && progress.completed.includes(c.id)).length;
  const life = cards.filter((c) => c.kind === "life" && progress.completed.includes(c.id)).length;
  const learnedNotes = Object.values(progress.notes).filter(Boolean).length;

  function exportData() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = "知库-本地备份.json"; link.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="page-stack">
      <section className="profile-hero">
        <div className="profile-ring" style={{ "--progress": `${percent * 3.6}deg` } as React.CSSProperties}><span>{percent}<small>%</small></span></div>
        <div><span className="overline">YOUR GROWTH</span><h1>知识在慢慢长出来</h1><p>不追求连续打卡，只记录你真正完成的学习。</p></div>
      </section>
      <div className="stats-grid">
        <div><strong>{progress.completed.length}</strong><span>学完卡片</span></div>
        <div><strong>{career}</strong><span>职业知识</span></div>
        <div><strong>{life}</strong><span>生活心理</span></div>
        <div><strong>{learnedNotes}</strong><span>个人理解</span></div>
      </div>
      <section className="mastery-panel">
        <div className="section-heading"><div><span className="overline">MASTERY</span><h2>知识领域</h2></div></div>
        <Mastery label="人力与招聘" value={career * 20} color="navy" />
        <Mastery label="生活常识" value={Math.min(100, life * 22)} color="coral" />
        <Mastery label="心理与人际" value={Math.min(100, life * 18)} color="gold" />
      </section>
      <section className="settings-panel">
        <button onClick={exportData}><span>⇩</span><div><strong>导出本地备份</strong><small>保存学习记录与个人笔记</small></div><b>→</b></button>
        <button onClick={() => { if (window.confirm("只清除这个原型的本地学习记录，确定继续吗？")) updateProgress(emptyProgress); }}><span>↻</span><div><strong>重新体验7天原型</strong><small>清除当前设备上的演示进度</small></div><b>→</b></button>
      </section>
    </div>
  );
}

function Mastery({ label, value, color }: { label: string; value: number; color: string }) {
  return <div className="mastery-row"><span><strong>{label}</strong><small>{value}%</small></span><div><i className={color} style={{ width: `${value}%` }} /></div></div>;
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return <button className={active ? "active" : ""} onClick={onClick}><Icon>{icon}</Icon><span>{label}</span></button>;
}

function InstallSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <section className="install-sheet" onClick={(event) => event.stopPropagation()}>
        <button className="sheet-close" onClick={onClose}>×</button>
        <span className="install-art">知</span>
        <h2>把知库放到 iPhone 桌面</h2>
        <p>安装后可以像小程序一样打开，已经加载过的卡片支持离线阅读。</p>
        <ol><li><span>1</span>用 Safari 打开这个页面</li><li><span>2</span>点击底部的“分享”按钮</li><li><span>3</span>选择“添加到主屏幕”</li></ol>
        <button className="primary-button wide" onClick={onClose}>我知道了</button>
      </section>
    </div>
  );
}
