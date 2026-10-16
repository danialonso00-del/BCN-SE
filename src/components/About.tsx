import Picture from './Picture';
import Frame from './Frame';
import Icon from './Icons';
import { SERVICES } from '../content';

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            About BCN Sport Events
          </p>
          <h2 id="about-title" className="h2" data-reveal>
            Two cities.
            <br />A shared ambition for sport.
          </h2>
          <div className="about__body" data-reveal>
            <p className="lead">
              BCN Sport Events is a Dubai-based sports consultancy with operations in Barcelona. We work across football
              academies, training and knowledge transfer, sports events, infrastructure and sports business — always
              around clear objectives and the people taking part.
            </p>
            <p>
              From defining an academy model or an event concept to structuring a learning programme, our focus is on
              connecting ideas, people and practical preparation.
            </p>
          </div>
          <ul className="about__areas" aria-label="Areas of work" data-reveal>
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a className="icon-host" href="#expertise">
                  <Icon name={s.icon} className="about__area-icon" />
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Frame className="about__figure" tag="BCN · DXB">
          <Picture
            name="about"
            widths={[640, 1024, 1600]}
            ratio={[1600, 1200]}
            alt="Concrete stadium facade with repeating structural fins, lit from within at dusk"
            sizes="(max-width: 900px) 100vw, 46vw"
            parallax={0.05}
          />
        </Frame>
      </div>
    </section>
  );
}
