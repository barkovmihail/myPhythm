import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Check, Mail, RefreshCw, ShoppingBasket } from 'lucide-react'
import { validEmail } from '../server/email.mjs'
import '@fontsource/manrope/cyrillic-400.css'
import '@fontsource/manrope/cyrillic-600.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/pt-serif/cyrillic-400.css'
import '@fontsource/pt-serif/cyrillic-400-italic.css'
import '@fontsource/pt-serif/latin-400.css'
import './style.css'

function Brand() {
  return <a className="brand" href="#top" aria-label="My Rhythm — в начало страницы"><img src="/bloom.svg" alt="" />My Rhythm</a>
}

function Hero() {
  return <section className="hero-surface" aria-labelledby="hero-title"><div className="hero wrap">
    <div className="hero-copy">
      <div className="eyebrow"><span className="dot" />Личная система для заботы о себе</div>
      <h1 id="hero-title"><span>Что сегодня поесть,</span> <span>как отдохнуть</span> <em>и на что хватит сил?</em></h1>
      <p>My Rhythm учитывает, как ты себя чувствуешь, что любишь и сколько времени у тебя есть. Подскажет, что взять на ужин по дороге домой или когда выбраться на прогулку. А если совет подойдёт, запомнит его на следующий раз.</p>
      <div className="actions"><a className="button" href="#access">Получить ранний доступ <ArrowUpRight /></a><a className="plain-link" href="#dinner-question">Посмотреть пример <ArrowDown /></a></div>
    </div>
    <div className="photo">
      <img className="kitchen" src="/kitchen.jpg"
        srcSet="/kitchen-360.jpg 360w, /kitchen-480.jpg 480w, /kitchen-640.jpg 640w, /kitchen-960.jpg 960w, /kitchen.jpg 1254w"
        sizes="(max-width: 650px) calc(100vw - 49px), (max-width: 800px) calc(50vw - 54px), (max-width: 950px) calc((100vw - 84px) / 2.03 - 12px), (max-width: 1050px) calc((100vw - 64px) * 0.95 / 2.03 - 18px), calc(min(100vw - 112px, 1280px) * 0.95 / 2.03 - 18px)"
        width="1254" height="1254" fetchPriority="high" alt="Помидоры на ветке, яйца и миска готовой гречки на залитом вечерним светом кухонном столе" />
      <span className="photo-seal" aria-hidden="true"><img src="/graphite-bloom.svg" alt="" /></span>
    </div>
  </div></section>
}

const meals = [
  { text: 'Возьми яйца и пару помидоров. Дома нарежь помидоры, прогрей их на сковороде с гречкой, добавь яйца и доведи до готовности. Получится горячий ужин примерно за десять минут.', items: ['Яйца', 'Помидоры'] },
  { text: 'Тогда загляни в отдел готовой еды. Возьми порцию запечённой курицы и овощи, которые тебе нравятся. Дома останется разогреть курицу вместе с гречкой и добавить овощи.', items: ['Готовая запечённая курица', 'Овощи на выбор'] },
]

function DinnerCard() {
  const [option, setOption] = useState(0)
  const [saved, setSaved] = useState([false, false])
  const meal = meals[option]
  return <div className="conversation">
    <div className="card-title">Пример рекомендации</div>
    <p className="message" id="dinner-question" tabIndex={-1}>Устал. Дома есть готовая гречка. Что взять по дороге на ужин? Хочется чего-нибудь горячего.</p>
    <div className="assistant-name"><img src="/bloom.svg" alt="" />My Rhythm</div>
    <div aria-live="polite" aria-atomic="true">
      <div className="meal-reply" key={option}>
        <p className="answer">{meal.text}</p>
        <div className="shopping"><ShoppingBasket size={19} /><div><small>Взять в магазине</small><strong>{meal.items.join(' · ')}</strong></div></div>
      </div>
    </div>
    <div className="demo-actions">
      <button className="button compact" disabled={saved[option]} onClick={() => setSaved(previous => previous.map((value, index) => index === option || value))}>{saved[option] ? <Check /> : <Bookmark />}{saved[option] ? 'Ужин сохранён' : 'Сохранить ужин'}</button>
      <button className="plain-link" onClick={() => setOption(previous => 1 - previous)}><RefreshCw />{option ? 'Вернуться к первому варианту' : 'Сегодня без готовки'}</button>
    </div>
    <div role="status">{saved[option] && <p className="saved">В этом примере ужин добавлен в подборку «На поздний вечер».</p>}</div>
  </div>
}

function Example() {
  return <section id="example" className="demo-section">
    <div className="wrap demo-grid">
      <div className="section-intro">
        <div className="eyebrow"><span className="marker" />Как это работает</div>
        <h2>Представь, что ты заходишь в магазин <em>после работы</em></h2>
        <p>До дома полчаса. В холодильнике осталась гречка, а на готовку есть минут десять. Попробуй выбрать ужин на этот вечер.</p>
      </div>
      <DinnerCard />
    </div>
  </section>
}

const features = [
  { name: 'Питание', id: 'food', text: 'Укажи, что уже есть дома, сколько хочешь потратить и какие продукты тебе подходят. Система предложит блюдо и составит короткий список покупок. Если планы изменятся, можно сразу подобрать другой вариант.' },
  { name: 'Самочувствие', id: 'wellbeing', text: 'Утром отметь, как ты спал и сколько у тебя сил. Вместе с планами на день это поможет выбрать посильное действие. Например, в день с плотным расписанием — пройтись до следующей встречи пешком.' },
  { name: 'Привычки', id: 'habits', text: 'Выбери одно действие, которое хочется попробовать на этой неделе. В конце недели посмотри, когда оно вписалось в день, и реши, хочешь ли повторить. Так у тебя появится свой набор удачных ужинов, прогулок и вечерних ритуалов.' },
]

function Features() {
  return <section className="wrap features"><div className="features-heading"><h2>Из чего складывается <em>твой ритм</em></h2>
    <p className="features-intro">My Rhythm связывает питание, сон, самочувствие и привычки с обстоятельствами твоего дня. Начать можно с одного вопроса или пары слов о том, как ты себя чувствуешь. Для этого достаточно телефона.</p></div>
    <div className="feature-grid">{features.map(({ name, text, id }) => <article key={id} id={id}><h3>{name}</h3><p>{text}</p></article>)}</div>
  </section>
}

function Manifesto() {
  return <section className="manifesto" id="manifesto"><div className="wrap manifesto-grid">
    <div><div className="eyebrow"><span className="marker" />Манифест</div><h2>Для обычного <em>вторника</em></h2></div>
    <div className="essay"><p>Мы создаём My Rhythm для обычного вторника. Того самого, когда обед сдвинулся на час, вечером нужно зайти в магазин, а сил на готовку осталось минут на десять. В такой день забота о себе может начаться с самого простого вопроса: «Что у меня есть дома и чего мне сейчас хочется?»</p>
    <p>Мы верим, что у человека есть право на собственную меру. Ты знаешь, какую еду любишь, когда тебе хочется движения и в какие дни особенно нужен тихий вечер. Задача технологии — помнить то, чем ты с ней поделился, замечать повторения и вовремя предлагать то, что тебе уже однажды подошло. Последнее слово остаётся за тобой.</p>
    <p>Мы хотим, чтобы со временем у тебя появилось больше доверия к собственному опыту. Чтобы в магазине ты вспомнил про удачный ужин, в середине дня нашёл время пройтись, а после трудной недели знал, к чему хочется вернуться.</p></div>
    <blockquote><img className="manifesto-flower" src="/bloom.svg" width="48" height="48" loading="lazy" alt="" /><span>Твой день может меняться. Забота о себе может меняться вместе с ним.</span></blockquote>
  </div></section>
}

const signupErrors = {
  empty: 'Введи почту, на которую прислать приглашение.',
  invalid: 'Проверь адрес. Он должен выглядеть примерно так: name@example.com.',
  failed: 'Не удалось отправить заявку. Попробуй ещё раз.',
}

function SignupForm() {
  const input = useRef(null)
  const [status, setStatus] = useState('idle')
  const error = signupErrors[status]
  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const address = input.current.value.trim()
    if (!validEmail(address) || input.current.validity.typeMismatch) {
      setStatus(address ? 'invalid' : 'empty')
      input.current.focus()
      return
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/early-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: address }) })
      if (!response.ok || !(await response.json()).ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('failed')
    }
  }
  if (status === 'success') {
    return <div className="success">
      <h3 tabIndex={-1} ref={heading => heading?.focus()} aria-describedby="success-note"><Check />Ты в списке раннего доступа</h3>
      <p id="success-note">Когда откроется доступ, приглашение придёт на указанную почту.</p>
    </div>
  }
  return <form onSubmit={submit} noValidate><label htmlFor="email">Электронная почта</label>
    <div className="field-row"><div className="field"><Mail size={18} />
      <input type="email" id="email" name="email" required autoComplete="email" spellCheck={false}
        maxLength={254} placeholder="name@example.com" ref={input} readOnly={status === 'sending'}
        onChange={error ? () => setStatus('idle') : undefined} aria-invalid={status === 'empty' || status === 'invalid'}
        aria-describedby={error ? 'form-error' : 'form-note'} /></div>
    <button className="button" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить ранний доступ'}<ArrowRight /></button></div>
    {error && <p className="form-error" id="form-error" role="alert">{error}</p>}<small id="form-note">Используем почту, чтобы прислать приглашение в My Rhythm.</small></form>
}

function Access() {
  return <section id="access" className="access wrap">
    <div className="access-box"><div className="eyebrow"><span className="dot" />Ранний доступ</div><h2>Попробуй <span className="keep">My Rhythm</span> <em>одним из первых</em></h2>
      <p>Мы готовим первую версию. Оставь почту, и мы напишем, когда можно будет попробовать My Rhythm в твоём обычном дне.</p>
      <SignupForm />
    </div>
  </section>
}

function App() {
  return <div id="top"><a className="skip-link" href="#main-content">К основному содержимому</a>
    <header className="wrap"><Brand /><nav aria-label="Основная навигация"><a href="#example">Как это работает</a><a href="#manifesto">Манифест</a><a className="nav-cta" href="#access">Ранний доступ <ArrowUpRight /></a></nav></header>
    <main id="main-content" tabIndex={-1}><Hero /><Example /><Features /><Manifesto /><Access /></main>
    <footer className="wrap"><Brand /><a className="plain-link" href="#top">Наверх ↑</a></footer></div>
}

createRoot(document.getElementById('root')).render(<App />)
