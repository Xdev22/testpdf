import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles pour la facture
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  idContent: {
    marginBottom: 10,
  },
  address: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    width: "33%",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  tableCellLast: {
    width: "33%",
    padding: 5,
  },
  total: {
    marginTop: 20,
    fontWeight: "bold",
  },
});

const Invoice = ({ number, date, customer, items, total }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Facture</Text>
        <View style={styles.idContent}>
          <Text>Facture n°{number}</Text>
          <Text>Date: {date}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Adresse du Client</Text>
        <Text style={styles.address}>{customer.name}</Text>
        <Text style={styles.address}>{customer.address}</Text>
        <Text style={styles.address}>
          {customer.city}, {customer.zipCode}
        </Text>
        <Text style={styles.address}>{customer.country}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Détails de la Facture</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Quantité</Text>
            <Text style={styles.tableCellLast}>Prix Unitaire</Text>
          </View>
          {items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCellLast}>{item.unitPrice} €</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.total}>
        <Text>Total: {total} €</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
