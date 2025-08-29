import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Memory from '#models/memory'

export default class extends BaseSeeder {
  async run() {
    await Memory.createMany([
      {
        title: 'Optimisation des réseaux SDN avec OpenFlow',
        authors: 'A. Traoré, M. Konaté',
        year: 2024,
        filiere: 'Informatique',
        keywords: 'SDN, OpenFlow, réseaux, optimisation, virtualisation',
        abstract:
          "Cette étude propose une approche innovante pour l'optimisation des réseaux Software-Defined Networking (SDN) en utilisant le protocole OpenFlow. L'objectif est d'améliorer les performances et la flexibilité des infrastructures réseau modernes.",
        filePath: '/memories/sdn-optimisation-2024.pdf',
      },
      {
        title: 'Détection de fraudes par intelligence artificielle',
        authors: 'M. Sow, F. Ouédraogo',
        year: 2023,
        filiere: 'Informatique',
        keywords: 'IA, machine learning, détection fraude, sécurité, algorithmes',
        abstract:
          "Développement d'un système de détection de fraudes basé sur l'intelligence artificielle et le machine learning. L'étude couvre les aspects techniques et l'efficacité des différents algorithmes de détection.",
        filePath: '/memories/fraud-detection-ai-2023.pdf',
      },
      {
        title: "Marketing digital dans l'enseignement supérieur",
        authors: 'F. Diallo, A. Bamba',
        year: 2022,
        filiere: 'Gestion',
        keywords: 'marketing digital, enseignement, stratégie, communication, étudiants',
        abstract:
          "Analyse des stratégies de marketing digital adaptées au secteur de l'enseignement supérieur. Étude des canaux de communication et des outils numériques pour attirer et fidéliser les étudiants.",
        filePath: '/memories/marketing-enseignement-2022.pdf',
      },
      {
        title: 'Blockchain et sécurité des transactions financières',
        authors: 'K. Zongo, P. Kaboré',
        year: 2023,
        filiere: 'Informatique',
        keywords: 'blockchain, sécurité, transactions, cryptomonnaies, fintech',
        abstract:
          "Étude de l'application de la technologie blockchain pour sécuriser les transactions financières. Analyse des avantages et défis de cette technologie émergente dans le secteur bancaire.",
        filePath: '/memories/blockchain-finance-2023.pdf',
      },
      {
        title: 'Gestion des déchets électroniques au Burkina Faso',
        authors: 'S. Ouattara, R. Sanou',
        year: 2022,
        filiere: 'Sciences',
        keywords: 'déchets électroniques, environnement, recyclage, développement durable',
        abstract:
          'Étude sur la gestion des déchets électroniques au Burkina Faso. Analyse des impacts environnementaux et proposition de solutions durables pour la collecte et le recyclage.',
        filePath: '/memories/dechets-electroniques-2022.pdf',
      },
      {
        title: 'Analyse des systèmes de microfinance rurale',
        authors: 'B. Ouédraogo, L. Traoré',
        year: 2021,
        filiere: 'Économie',
        keywords: 'microfinance, développement rural, inclusion financière, pauvreté',
        abstract:
          'Étude des systèmes de microfinance en milieu rural au Burkina Faso. Analyse de leur impact sur le développement économique et la réduction de la pauvreté.',
        filePath: '/memories/microfinance-rurale-2021.pdf',
      },
      {
        title: 'Protection des données personnelles en droit burkinabè',
        authors: 'A. Kaboré, M. Ouédraogo',
        year: 2023,
        filiere: 'Droit',
        keywords: 'protection données, vie privée, droit numérique, réglementation',
        abstract:
          'Analyse de la protection des données personnelles dans le cadre juridique burkinabè. Étude des enjeux légaux et des mécanismes de protection des citoyens.',
        filePath: '/memories/protection-donnees-2023.pdf',
      },
      {
        title: 'Intelligence artificielle et diagnostic médical',
        authors: 'D. Sanou, K. Ouattara',
        year: 2024,
        filiere: 'Sciences',
        keywords: 'IA, médecine, diagnostic, imagerie médicale, santé',
        abstract:
          "Application de l'intelligence artificielle dans le diagnostic médical. Étude des algorithmes de reconnaissance d'images pour l'aide au diagnostic radiologique.",
        filePath: '/memories/ia-diagnostic-medical-2024.pdf',
      },
    ])
  }
}
