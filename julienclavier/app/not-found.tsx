import Link from 'next/link';
import '@/styles/NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        
        <h1 className="error-title">Page non trouvée</h1>
        
        <p className="error-description">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="error-actions">
          <Link href="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/#contact" className="btn btn-secondary">
            Me contacter
          </Link>
        </div>

        <div className="error-footer">
          <p>Si vous pensez que c'est une erreur, n'hésitez pas à me contacter.</p>
        </div>
      </div>
    </div>
  );
}
