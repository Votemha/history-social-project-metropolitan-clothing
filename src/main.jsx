import { useEffect, useState } from "react";
import "./App.css";

const pages = [
  { id: "home", hash: "#/", label: "Главная" },
  { id: "moscow", hash: "#/moscow", label: "Москва" },
  { id: "workers", hash: "#/workers", label: "Рабочие" },
  { id: "sources", hash: "#/sources", label: "Источники" },
];

const overviewCards = [
  {
    title: "Костюм как язык",
    text: "Одежда в городе обозначала сословие, профессию, достаток и степень включённости человека в городскую культуру. По внешнему виду можно было понять не только материальное положение, но и стремление человека соответствовать городской среде и её нормам.",
  },
  {
    title: "Смешанный тип",
    text: "В XIX веке народные формы одежды всё чаще сочетались с европейскими элементами, образуя переходный городской костюм. Особенно заметно это было у выходцев из деревни, которые сохраняли привычные рубахи и головные уборы, но дополняли их пиджаками, жилетами и городскими брюками.",
  },
  {
    title: "Рынок вещей",
    text: "Фабричное производство, барахолки и рынки подержанной одежды сделали городской гардероб доступнее для небогатых слоёв. Благодаря торговле готовыми вещами и дешёвыми тканями одежда всё чаще покупалась, передавалась, перешивалась и получала вторую жизнь у новых владельцев.",
  },
];

const timelineItems = [
  {
    id: "18",
    period: "XVIII век",
    tag: "ранний город",
    title: "Сословный костюм и первые европейские влияния",
    text: "Одежда городских жителей XVIII века прямо отражала сословную структуру общества. Высшие слои быстрее переходили на европейские формы, тогда как ремесленники, мещане и мелкие торговцы дольше сохраняли традиционный русский костюм. Реформы Петра I запустили европеизацию внешнего вида, но для большинства горожан этот процесс оставался постепенным и неполным.",
  },
  {
    id: "19a",
    period: "Первая половина XIX века",
    tag: "идентичность",
    title: "Городская идентичность через внешний вид",
    text: "Европейская мода воспринималась как знак городской культуры и нового образа жизни. Через костюм человек показывал принадлежность к социальной среде и своё отношение к традиции. Для купцов и мещан новые формы одежды долго оставались спорным символом, но постепенно становились частью городской идентичности.",
  },
  {
    id: "19b",
    period: "Вторая половина XIX века",
    tag: "Москва",
    title: "Москва как пространство смешения форм",
    text: "Московский костюм складывался неравномерно: дворянство и чиновники быстрее перенимали европейские образцы, а низшие слои дольше удерживали привычные формы одежды. В результате возникал переходный тип костюма, где могли одновременно соседствовать народная рубаха, городской жилет, фабричные ткани и старые практики ношения.",
  },
  {
    id: "19c",
    period: "Конец XIX века",
    tag: "модернизация",
    title: "Фабрика, торговля и массовая одежда",
    text: "Развитие промышленности и торговли расширило доступ к тканям и готовой одежде. Внешний облик городского населения начал постепенно унифицироваться, хотя разница в качестве материалов сохранялась. Массовое производство не уничтожило социальные различия, но изменило их характер: важнее стали качество ткани, крой и степень изношенности вещей.",
  },
  {
    id: "20",
    period: "Начало XX века",
    tag: "рабочие",
    title: "Рабочий костюм как переходная форма",
    text: "Одежда рабочих соединяла косоворотки, сапоги и картузы с жилетами, городскими брюками и недорогими пиджаками. Этот тип костюма показывал процесс адаптации бывших крестьян к индустриальной городской среде. Даже праздничная одежда рабочих часто строилась на сочетании деревенских привычек и стремления выглядеть более современно и по-городскому.",
  },
];

const moscowThemes = [
  {
    title: "Повседневность москвичей",
    lead: "Костюм был частью городской культуры, а не только бытовой необходимостью.",
    text: "Одежда рассматривается как важный социальный индикатор. По внешнему виду можно было определить сословную принадлежность, профессию, материальное положение и образ жизни человека. Материал охватывает дворянство, купечество, интеллигенцию, ремесленников, рабочих, а также нищих и обитателей рынков. Костюм выполнял коммуникативную функцию и позволял считывать место человека в социальной структуре города.",
  },
  {
    title: "Практика самодеятельного населения",
    lead: "Ремесленники, мелкие торговцы, извозчики и рабочие одевались прежде всего функционально.",
    text: "Их одежда шилась из недорогих тканей, отличалась простым кроем и износостойкостью. Мужской костюм обычно включал рубаху, брюки, жилет или дешёвый пиджак, картуз или шапку, а также сапоги. Такой гардероб был приспособлен к физическому труду и городской подвижности. Практичность здесь была важнее декоративности: вещи должны были долго служить, легко чиниться и выдерживать тяжёлые условия повседневной работы.",
  },
  {
    title: "Городские низы и рынки одежды",
    lead: "У беднейших слоёв костюм сам становился знаком бедности.",
    text: "Нищие и маргинальные группы часто носили сильно изношенные вещи с заплатами и следами долгого использования. Подержанная одежда активно продавалась на толкучках и дешёвых рынках, которые играли важную роль в обеспечении бедных горожан доступными вещами. Такие рынки поддерживали существование целого вторичного оборота вещей, где одежда переходила от одного владельца к другому и меняла своё социальное значение.",
  },
  {
    title: "Мир вещей и биография предмета",
    lead: "Одежда жила дольше одного владельца и меняла значение по мере использования.",
    text: "Вещи имели собственную биографию: появлялись на рынке, входили в повседневный быт, изнашивались, передавались другим владельцам и исчезали из употребления. Это особенно заметно на примере одежды бедных слоёв населения. Вещь переставала быть просто предметом и становилась частью городской повседневности, культуры потребления и системы социальных различий.",
  },
];

const workerCards = [
  {
    title: "База рабочего костюма",
    items: [
      "Косоворотка из ситца или холста неброских цветов",
      "Плотные штаны, чаще заправленные в сапоги",
      "Картузы, кепки или фуражки тёмных оттенков",
    ],
  },
  {
    title: "Холодный сезон",
    items: [
      "Поддёвки из тёмного сукна",
      "Полушубки и недорогие пальто",
      "Меховые шапки и шерстяные вещи",
    ],
  },
  {
    title: "Городское влияние",
    items: [
      "Жилеты и пиджаки у квалифицированных мастеров",
      "Выходной костюм для праздников и важных событий",
      "Рубашки с отложным воротником как знак большей городской адаптации",
    ],
  },
];

const sourceEntries = [
  {
    title: "К. В. Ермакова - «Костюм в повседневной жизни москвичей второй половины XIX в.»",
    type: "DisserCat",
    href: "https://www.dissercat.com/content/kostyum-v-povsednevnoi-zhizni-moskvichei-vtoroi-poloviny-xix-v",
    summary:
      "про одежду разных слоев москвы типа, включая нищиих, попрошаек, ремесленников и жителей рынков",
  },
  {
    title: "К. В. Ермакова - «Мир вещей в повседневной жизни москвичей XIX – начала XX века»",
    type: "КиберЛенинка",
    href: "https://cyberleninka.ru/article/n/mir-veschey-v-povsednevnoy-zhizni-moskvichey-vtoroy-poloviny-xix-nachala-xx-v",
    summary:
      "анализ одежды, потребления и городской культуры",
  },
  {
    title: "Эволюция городского костюма в России (XIX – начало XX века)",
    type: "dslib",
    href: "https://www.dslib.net/istoria-otechestva/jevoljucija-gorodskogo-kostjuma-kak-otrazhenie-modernizacionnyh-processov-v-rossijskom.html",
    summary:
      "показывает, как европейский костюм распространился среди низших слоев городского населения",
  },
  {
    title: "Костюм русского горожанина XIX - начала XX века",
    type: "Музейное исследование",
    href: "https://old.museum-murom.ru/nauch-rab/uvar-vi/kostyum-russkogo-gorozhanina",
    summary:
      "описание одежды ремесленников, купцов, рабочих",
  },
  {
    title: "Мода 1900-х годов",
    type: "Википедия",
    href: "https://ru.wikipedia.org/wiki/Мода_1900-х_годов",
    summary:
      "описывает одежду рабочих: косоворотки, картузы, сапоги, поддевки",
  },
  {
    title: "Мода 1910-х годов - рабочая одежда",
    type: "Википедия",
    href: "https://ru.wikipedia.org/wiki/Мода_1910-х_годов",
    summary:
      "показывает смешение народной и городской одежды у рабочих",
  },
  {
    title: "Очерки русской культуры XVIII века - одежда городских жителей",
    type: "Statehistory",
    href: "https://statehistory.ru/books/pod-red--B-A--Rybakova_Ocherki-russkoy-kultury-XVIII-veka--CHast-pervaya-/19",
    summary:
      "",
  },
  {
    title: "История русского костюма (учебное пособие)",
    type: "PDF",
    href: "https://bmu.vrn.muzkult.ru/media/2018/08/02/1225660659/bmu.vrn_Kaminskaya_N._M._Istoriya_kostyu_sti._M._Legkaya_industriya_1977.pdf",
    summary:
      "",
  },
  {
    title: "Материальная культура русского города",
    type: "Rusarch",
    href: "https://rusarch.ru/rabinovich4.htm",
    summary:
      "фрагменты работ по быту городского населения",
  },
  {
    title: "Исследования костюма в русской культуре",
    type: "НЛО",
    href: "https://www.nlobooks.ru/magazines/teoriya_mody/23_tm_1_2012/article/18707/",
    summary:
      "",
  },
  {
    title: "Внешний облик городского населения Российской империи в XIX веке",
    type: "PDF",
    href: "https://elib.bsu.by/bitstream/123456789/92567/1/Brigadina_OB.pdf",
    summary:
      "научная работа о внешнем виде и одежде жителей городов Российской империи, включая столичные города",
  },
  {
    title: "Мир вещей в повседневной жизни москвичей второй половины XIX – начала XX века",
    type: "КиберЛенинка",
    href: "https://cyberleninka.ru/article/n/mir-veschey-v-povsednevnoy-zhizni-moskvichey-vtoroy-poloviny-xix-nachala-xx-v",
    summary:
      "статья о предметах быта и одежде москвичей разных социальных групп",
  },
  {
    title: "Мода и идентичность в русском городе (конец XVIII - первая половина XIX века)",
    type: "IRI RAN",
    href: "https://ebookiriran.ru/index.php?id=52&section=8&view=article",
    summary:
      "исследование о том, как одежда отражала социальное положение жителей города",
  },
  {
    title: "Покорение города: как формировалась городская мода",
    type: "Familio.Media",
    href: "https://familio.media/history-and-we/pokorenie-goroda/",
    summary:
      "статья о распространении городской одежды и фабричных тканей среди населения",
  },
  {
    title: "Мода 1910-х годов: рабочая одежда",
    type: "Википедия",
    href: "https://ru.wikipedia.org/wiki/Мода_1910-х_годов",
    summary:
      "описание одежды рабочих (косоворотки, штаны, сапоги, картузы) и сочетания деревенского и городского костюма",
  },
];

function getPageFromHash() {
  const currentHash = window.location.hash || "#/";
  const page = pages.find((item) => item.hash === currentHash);

  return page ? page.id : "home";
}

function Header({ currentPage }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/">
        Столичная одежда
      </a>

      <nav className="top-nav" aria-label="Основная навигация">
        {pages.map((page) => (
          <a
            key={page.id}
            className={currentPage === page.id ? "nav-link active" : "nav-link"}
            href={page.hash}
          >
            {page.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HomePage() {
  const [activeTag, setActiveTag] = useState("all");
  const tags = ["all", ...new Set(timelineItems.map((item) => item.tag))];
  const visibleItems =
    activeTag === "all"
      ? timelineItems
      : timelineItems.filter((item) => item.tag === activeTag);

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">История городской повседневности</p>
          <h1>Одежда столичных низших слоёв от XVIII века до 1910-х</h1>
          <p className="hero-description">
            Сайт показывает, как костюм отражал модернизацию, рынок вещей,
            социальную мобильность и адаптацию бывших крестьян к городской
            среде. Одежда в этом проекте рассматривается как часть социальной
            истории города: через ткани, крой, степень изношенности и сочетание
            традиционных и европейских элементов можно проследить изменения в
            структуре общества, культуре потребления и образе жизни.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#/moscow">
              Перейти к Москве
            </a>
            <a className="secondary-button" href="#/workers">
              Посмотреть рабочих
            </a>
          </div>
        </div>

        <div className="hero-aside">
          <div className="stat-card">
            <span>Мини-группа</span>
            <p>
              Проект в мини-группах
              <br />
              Ахметов Артём Маратович 504980,
              <br />
              Гурьева Евгения Александровна 505051
              <br />
              ИРГ 2.3
            </p>
          </div>
          <div className="stat-card muted">
            <span>XIX-XX</span>
            <p>веков модернизации, когда одежда стала более массовой и городской</p>
          </div>
        </div>
      </section>

      <section className="overview-grid">
        {overviewCards.map((card) => (
          <article className="glass-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">Хронология</p>
          <h2>Переход от сословного костюма к городскому типу одежды</h2>
        </div>

        <div className="filter-row" role="tablist" aria-label="Фильтр по темам">
          {tags.map((tag) => (
            <button
              key={tag}
              className={activeTag === tag ? "filter-chip active" : "filter-chip"}
              onClick={() => setActiveTag(tag)}
              type="button"
            >
              {tag === "all" ? "Все темы" : tag}
            </button>
          ))}
        </div>

        <div className="timeline-list">
          {visibleItems.map((item) => (
            <article className="timeline-card" key={item.id}>
              <div className="timeline-meta">
                <span>{item.period}</span>
                <strong>{item.tag}</strong>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MoscowPage() {
  return (
    <div className="page-shell">
      <section className="section-block intro-panel">
        <div className="section-head">
          <p className="eyebrow">Исследование Москвы</p>
          <h1>Одежда как социальный индикатор городской жизни</h1>
        </div>
        <p className="lead-paragraph">
          Москва второй половины XIX века показана как пространство, где костюм
          выступал не просто предметом быта, а формой социальной коммуникации:
          по нему читались сословие, профессия, достаток, культурная
          ориентация и степень включённости человека в городскую среду.
        </p>
      </section>

      <section className="stacked-grid">
        {moscowThemes.map((theme) => (
          <article className="feature-card" key={theme.title}>
            <p className="feature-lead">{theme.lead}</p>
            <h2>{theme.title}</h2>
            <p>{theme.text}</p>
          </article>
        ))}
      </section>

      <section className="quote-band">
        <div>
          <p className="eyebrow">Вывод</p>
          <h2>К концу XIX века одежда стала заметно более унифицированной</h2>
        </div>
        <p>
          Несмотря на устойчивые различия между социальными группами, рост
          фабричного производства, расширение рынка и распространение модных
          элементов привели к формированию более общего городского костюма.
          Разница всё чаще выражалась не в форме одежды, а в качестве тканей,
          степени изношенности и деталях отделки. Даже бедные горожане
          стремились включать в гардероб хотя бы отдельные модные элементы,
          чтобы обозначить свою принадлежность к городской культуре.
        </p>
      </section>
    </div>
  );
}

function WorkersPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCard = workerCards[selectedIndex];

  return (
    <div className="page-shell">
      <section className="section-block intro-panel">
        <div className="section-head">
          <p className="eyebrow">Рабочий костюм</p>
          <h1>От косоворотки к городскому пиджаку</h1>
        </div>
        <p className="lead-paragraph">
          Рабочие сохраняли крестьянские формы одежды, но всё активнее включали
          городские элементы, особенно в праздничном и выходном костюме. Это
          смешение показывало, как деревенский человек приспосабливался к
          фабрике, улице, рынку и новому ритму городской жизни.
        </p>
      </section>

      <section className="interactive-panel">
        <div className="selector-column">
          {workerCards.map((card, index) => (
            <button
              key={card.title}
              className={
                selectedIndex === index ? "selector-button active" : "selector-button"
              }
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              {card.title}
            </button>
          ))}
        </div>

        <article className="detail-card">
          <p className="eyebrow">Разбор костюма</p>
          <h2>{activeCard.title}</h2>
          <ul className="detail-list">
            {activeCard.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="detail-note">
            Чем выше была квалификация рабочего и чем теснее его связь с
            городской средой, тем заметнее в костюме становились жилеты,
            пиджаки, рубашки с воротником и другие признаки городского облика.
            При этом рабочая одежда почти никогда не была полностью отделена от
            повседневной: специальная форма встречалась редко, а труд проходил
            в тех же вещах, которые человек носил в обычной жизни.
          </p>
        </article>
      </section>

      <section className="comparison-grid">
        <article className="comparison-card">
          <h3>Что сохранялось</h3>
          <p>
            Косоворотка, сапоги, тёмная верхняя одежда, простые ткани и общий
            приоритет практичности. Эти элементы связывали рабочего с
            крестьянским прошлым и физическим трудом.
          </p>
        </article>
        <article className="comparison-card">
          <h3>Что менялось</h3>
          <p>
            В выходном костюме всё чаще появлялись городские брюки, жилеты,
            недорогие пиджаки и более современный крой. Это отражало адаптацию к
            городской культуре и стремление выглядеть "по-городскому".
          </p>
        </article>
      </section>
    </div>
  );
}

function SourcesPage() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="page-shell">
      <section className="section-block intro-panel">
        <div className="section-head">
          <p className="eyebrow">Источники</p>
          <h1>Из каких исследований собран материал</h1>
        </div>
        <p className="lead-paragraph">
          В этом разделе собраны основные исследования и материалы, на которые
          опирается сайт. Каждый блок можно раскрыть и перейти по прямой ссылке
          к соответствующему источнику.
        </p>
      </section>

      <section className="accordion-list">
        {sourceEntries.map((entry, index) => {
          const isOpen = index === openIndex;

          return (
            <article className={isOpen ? "accordion-card open" : "accordion-card"} key={entry.title}>
              <button
                className="accordion-toggle"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                type="button"
              >
                <span>{entry.title}</span>
                <strong>{entry.type}</strong>
              </button>
              {isOpen ? (
                <div className="accordion-content">
                  {entry.summary ? <p>{entry.summary}</p> : null}
                  <a href={entry.href} target="_blank" rel="noreferrer">
                    Открыть источник
                  </a>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Проект о городской одежде и социальной истории.</p>
      <a href="#/sources">Перейти к источникам</a>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderedPage = {
    home: <HomePage />,
    moscow: <MoscowPage />,
    workers: <WorkersPage />,
    sources: <SourcesPage />,
  }[currentPage];

  return (
    <div className="site-frame">
      <Header currentPage={currentPage} />
      <main>{renderedPage}</main>
      <Footer />
    </div>
  );
}
