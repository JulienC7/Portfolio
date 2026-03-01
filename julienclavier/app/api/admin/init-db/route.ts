import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INIT_DB_TOKEN || 'initial-setup'}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'portfolio',
    });

    await connection.query('DELETE FROM projects');

    const projects = [
      [
        'Web Security CRUD',
        'web-security',
        'Application CRUD sur le thème des tortues ninja - Semaine Web Security',
        'Full Stack',
        '/projects/web-security.png',
        'https://web-security-1-oz2j.onrender.com/',
        '<h3>Objectifs du projet</h3><p>Développement d\'une application CRUD sécurisée pendant la semaine Web Security, avec un thème amusant basé sur les tortues ninja.</p><h3>Technologies utilisées</h3><ul><li>HTML</li><li>CSS</li><li>PHP</li></ul><h3>Fonctionnalités</h3><p>Système complet de gestion de posts avec authentification utilisateur, validation des données, protection contre les attaques XSS et CSRF.</p><h3>Sécurité</h3><p>Implémentation des meilleures pratiques en sécurité web : hachage des mots de passe, gestion des sessions, validation des entrées.</p>',
        JSON.stringify(['HTML', 'CSS', 'PHP']),
        'published',
        1,
        1,
      ],
      [
        'Mourning',
        'mourning',
        'Projet de creative development avec animations sur le thème du deuil',
        'Creative Development',
        '/projects/mourning.png',
        'https://mourning.vercel.app/',
        '<h3>Objectifs du projet</h3><p>Projet créatif d\'entraînement aux animations web. Exploration du thème du deuil à travers des animations fluides et des transitions élaborées.</p><h3>Technologies utilisées</h3><ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul><h3>Conception</h3><p>Approche sensible et respectueuse du sujet avec utilisation de palettes de couleurs subtiles et animations douces pour exprimer les émotions.</p><h3>Animations</h3><p>Focus sur la qualité des animations : transitions élaborées, parallax effects, et micro-interactions qui enrichissent l\'expérience utilisateur.</p>',
        JSON.stringify(['HTML', 'CSS', 'JavaScript']),
        'published',
        1,
        2,
      ],
      [
        'Eurockéennes',
        'eurockeennes',
        'Refonte du site officiel du festival Eurockéennes',
        'Web Development',
        '/projects/eurockeennes.png',
        'https://eurock.vercel.app/',
        '<h3>Objectifs du projet</h3><p>Refonte complète du site du festival Eurockéennes en tant que projet transversal 2025.</p><h3>Technologies utilisées</h3><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>PHP</li></ul><h3>Responsabilités</h3><p>Création d\'une interface moderne et responsive reflétant l\'identité du festival avec une navigation intuitive et un design épuré.</p><h3>Résultats</h3><p>Site deployed en production avec optimisation SEO et performance excellente. Accessible via eurock.vercel.app</p>',
        JSON.stringify(['HTML', 'CSS', 'JavaScript', 'PHP']),
        'published',
        1,
        3,
      ],
      [
        'LoL Card Exchange',
        'lol-card-exchange',
        'Premier vrai projet en coding - Collection et échange de cartes League of Legends',
        'Gaming',
        '/projects/lol-card-exchange.png',
        'https://lol-card-exchange-go75.onrender.com/',
        '<h3>Objectifs du projet</h3><p>Premier vrai projet de développement en coding. Application web pour gérer une collection de cartes League of Legends avec système d\'échange entre utilisateurs.</p><h3>Technologies utilisées</h3><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>PHP</li></ul><h3>Fonctionnalités</h3><p>Gestion de collection personnelle, système d\'échange avec d\'autres utilisateurs, affichage des cartes avec images et statistiques, profil utilisateur.</p><h3>Apprentissages</h3><p>Ce projet a marqué le début du parcours en développement web. Permet une gestion complète du cycle CRUD avec une base de données et un système d\'utilisateurs.</p>',
        JSON.stringify(['HTML', 'CSS', 'JavaScript', 'PHP']),
        'published',
        1,
        4,
      ],
    ];

    for (const project of projects) {
      await connection.query(
        `INSERT INTO projects (title, slug, description, category, image_url, project_link, details, technologies, status, featured, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        project
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Table projects mise à jour avec les 4 vrais projets',
      database: process.env.MYSQL_DATABASE || 'portfolio',
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update projects',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
