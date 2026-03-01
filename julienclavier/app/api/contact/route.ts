import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  nom: string;
  email: string;
  telephone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'julien.clavier95@gmail.com';

    if (!resendApiKey) {
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY manquante dans les variables d\'environnement' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body: ContactData = await request.json();

    const { nom, email, telephone, message } = body;

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis' },
        { status: 400 }
      );
    }

    console.log('📧 ✓ Formulaire reçu:', { nom, email, telephone, messageLength: message.length });

    const ownerEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: receiverEmail,
      replyTo: email,
      subject: `Nouveau message de ${nom}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #efe8d8;">
          <h2 style="color: #171717; font-size: 24px; margin-bottom: 20px;">Nouveau message de contact</h2>
          <p style="margin: 15px 0;"><strong>Nom :</strong> ${nom}</p>
          <p style="margin: 15px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          ${telephone ? `<p style="margin: 15px 0;"><strong>Téléphone :</strong> ${telephone}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">
          <p style="margin: 15px 0;"><strong>Message :</strong></p>
          <p style="margin: 15px 0; white-space: pre-wrap;">${message.replace(/\n/g, '\n')}</p>
        </div>
      `,
    });

    if (ownerEmailResponse.error) {
      throw new Error(`Erreur Resend: ${ownerEmailResponse.error.message}`);
    }

    console.log('✅ Email propriétaire envoyé - ID:', ownerEmailResponse.data?.id);

    if (email === receiverEmail) {
      const confirmationEmailResponse = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirmation de réception - Portfolio Julien Clavier',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #efe8d8;">
            <h2 style="color: #171717; font-size: 24px; margin-bottom: 20px;">Merci de votre message !</h2>
            <p style="margin: 15px 0;">Bonjour ${nom},</p>
            <p style="margin: 15px 0;">J'ai bien reçu votre message et je vous répondrai dans les meilleurs délais.</p>
            <p style="margin: 30px 0; color: #4a4a4a;">Cordialement,<br><strong>Julien Clavier</strong></p>
          </div>
        `,
      });

      if (confirmationEmailResponse.error) {
        console.warn('⚠️ Avertissement: Email de confirmation non envoyé', confirmationEmailResponse.error);
      } else {
        console.log('✅ Email de confirmation envoyé - ID:', confirmationEmailResponse.data?.id);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message reçu ! Je vous répondrai rapidement.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { success: false, error: `Erreur: ${errorMessage}` },
      { status: 500 }
    );
  }
}
