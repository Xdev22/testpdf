const invoiceData = {
  id: "12345", // Numéro de la facture
  date: "06/12/2024", // Date de la facture
  customer: {
    name: "Jean Dupont", // Nom du client
    address: "12 rue des Lilas ", // Adresse du client
    city: "Paris", // Ville du client
    zipCode: "75001", // Code postal du client
    country: "France", // Pays du client
  },
  items: [
    {
      description: "Consultation initiale", // Description de l'article
      quantity: 1, // Quantité
      unitPrice: 100.0, // Prix unitaire
    },
    {
      description: "Développement web", // Description de l'article
      quantity: 5, // Quantité
      unitPrice: 200.0, // Prix unitaire
    },
  ],
  total: 1100.0, // Total de la facture
};

export default invoiceData;
