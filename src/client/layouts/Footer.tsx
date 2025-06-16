function Footer() {
    return (
        <footer className="magic-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>La Boutique de Gandalf</h3>
                    <p>Votre fournisseur officiel d'artéfacts magiques depuis l'Âge des Elfes</p>
                    <div className="magic-symbols">
                        {['🔮', '🧙', '⚡', '🧝', '🧌'].map((symbol, index) => (
                            <span key={index} className="magic-symbol">{symbol}</span>
                        ))}
                    </div>
                </div>
                
                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="/grimoires">Grimoires anciens</a></li>
                        <li><a href="/baguettes">Baguettes magiques</a></li>
                        <li><a href="/pierres">Pierres de pouvoir</a></li>
                        <li><a href="/potions">Potions mystérieuses</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>🦉 Envoyez un hibou à:</p>
                    <p>La Tour Blanche, Minas Tirith</p>
                    <p>🕊️ Ou par pigeon voyageur</p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© Troisième Âge - Tous droits réservés. Les sorts sont à utiliser avec modération.</p>
                <p className="disclaimer">
                    Attention: La Boutique de Gandalf décline toute responsabilité en cas de transformation accidentelle en troll.
                </p>
                {
                    localStorage.getItem("user") && 
                    <button 
                        onClick={() => {
                            localStorage.removeItem("user")
                            window.location.reload() 
                        }}
                        className="btn magic-button position-relative"
                        >
                        Déconnecter
                    </button>
                }
               

            </div>
        </footer>
    )
}

export default Footer;