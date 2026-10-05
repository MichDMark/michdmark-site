export function DisciplineMap() {
    return (
        <section className="discipline-map" aria-labelledby="discipline-map-title">
            <h2 id="discipline-map-title" className="visually-hidden">Áreas de interés de Mich DMark</h2>
            <div className="map-kicker" aria-hidden="true">
                <span>ÁREAS DE INTERÉS</span>
                <span>TECNOLOGÍA</span>
            </div>
            <div
                className="map-canvas"
                role="img"
                aria-label="Mich DMark conectado con software, inteligencia artificial aplicada y hardware."
            >
                <svg className="map-lines" viewBox="0 0 520 330" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id="discipline-line" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#f21648" stopOpacity="0.8" />
                            <stop offset="1" stopColor="#43d9ff" stopOpacity="0.72" />
                        </linearGradient>
                    </defs>
                    <path d="M260 74 C220 130 128 155 78 250" fill="none" stroke="url(#discipline-line)" strokeWidth="1.5" />
                    <path d="M260 74 L260 250" fill="none" stroke="url(#discipline-line)" strokeWidth="1.5" />
                    <path d="M260 74 C300 130 392 155 442 250" fill="none" stroke="url(#discipline-line)" strokeWidth="1.5" />
                    <circle cx="260" cy="74" r="3" fill="#f21648" />
                    <circle cx="78" cy="250" r="3" fill="#43d9ff" />
                    <circle cx="260" cy="250" r="3" fill="#43d9ff" />
                    <circle cx="442" cy="250" r="3" fill="#43d9ff" />
                </svg>
                <div className="map-node map-node-origin">Mich DMark</div>
                <div className="map-node map-node-discipline map-node-software">Software</div>
                <div className="map-node map-node-discipline">IA aplicada</div>
                <div className="map-node map-node-discipline map-node-hardware">Hardware</div>
            </div>
            <p className="map-caption">Tecnología accesible e inteligencia artificial aplicada a software y hardware.</p>
        </section>
    );
}
