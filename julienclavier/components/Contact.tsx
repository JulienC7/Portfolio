"use client";

import { useState } from "react";
import "@/styles/Contact.scss";

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setSuccess(true);
      setFormData({
        nom: "",
        email: "",
        telephone: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact</h2>

            <div className="info-section">
              <h3>Écris moi directement :</h3>
              <p>
                <a href="mailto:julien.clavier95@gmail.com">
                  julien.clavier95@gmail.com
                </a>
              </p>
            </div>

            <div className="info-section">
              <h3>Réseaux</h3>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/julienclavier"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/julienclavier"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Localisation</h3>
              <p>Paris, France</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Nom & Prénom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Votre email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Votre téléphone"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Votre message"
                rows={6}
              />
            </div>

            {success && (
              <div className="success-message">
                ✓ Message envoyé avec succès ! Je vous répondrai rapidement.
              </div>
            )}

            {error && <div className="error-message">✗ {error}</div>}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
