'use client';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2>UNE FORMATION SOLIDE<br />TOURNÉE VERS L'AVENIR</h2>
          <p>
            Étudiant en Développement Web à l'IIM, je me consacre à la conception d'interfaces performantes et à la résolution de problématiques techniques concrètes.
          </p>
          <p>
            Mon approche repose sur deux piliers : une rigueur d'exécution indispensable au code de qualité et une curiosité technologique qui me pousse à explorer de nouveaux frameworks et langages. À travers mes projets académiques et personnels, je m'attache à transformer des concepts complexes en solutions fluides et maintenables.
          </p>
        </div>
        <div className="about-image">
          <img
            src="/about/30-ans-IIM-Digital-School.webp"
            alt="IIM Digital School"
            className="about-school-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
