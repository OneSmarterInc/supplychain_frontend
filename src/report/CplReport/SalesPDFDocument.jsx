import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const SalesPDFDocument = ({
  salesData,
  Revenues,
  GrossMargin,
  Fixed_Other_Costs,
  OperatingIncome,
  NonOperatingIncome,
  Taxes,
  NetIncome,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.header}>CORPORATE P&L STATEMENT</Text>
          </View>
          <View style={styles.table}>
            {/* Table Headers */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Metric</Text>
              <Text style={styles.cellheader}>All Products</Text>
              <Text style={styles.cellheader}>Product 7-1</Text>
              <Text style={styles.cellheader}>Product 7-2</Text>
            </View>
            {/* Render Sales Data */}
            {Object.entries(salesData).map(([key, value], index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cellhead}>{key}</Text>
                <Text style={styles.cell}>{value["All Products"]}</Text>
                <Text style={styles.cell}>{value["Product 7-1"]}</Text>
                <Text style={styles.cell}>{value["Product 7-2"]}</Text>
              </View>
            ))}
            {/* Render Additional Financial Details */}
            {[
              { title: "Revenue", data: Revenues },
              { title: "Gross Margin", data: GrossMargin },
              { title: "Operating Income", data: OperatingIncome },
              { title: "NonOperating Income", data: NonOperatingIncome },
              { title: "Taxes", data: Taxes },
              { title: "Net Income", data: NetIncome },
            ].map((item, index) => (
              <View key={index}>
                <View style={styles.tableRow}>
                  <Text style={styles.cellhead}>{item.title}</Text>
                  <Text style={styles.cell}>{item.data["All Products"]}</Text>
                  <Text style={styles.cell}>{item.data["Product 7-1"]}</Text>
                  <Text style={styles.cell}>{item.data["Product 7-2"]}</Text>
                </View>
                {item.data.details &&
                  Object.entries(item.data.details).map(
                    ([detailKey, detailValue], i) => (
                      <View style={styles.tableRow} key={i}>
                        <Text style={styles.cellhead}>- {detailKey}</Text>
                        <Text style={styles.cell}>
                          {detailValue["All Products"]}
                        </Text>
                        <Text style={styles.cell}>
                          {detailValue["Product 7-1"]}
                        </Text>
                        <Text style={styles.cell}>
                          {detailValue["Product 7-2"]}
                        </Text>
                      </View>
                    )
                  )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f8f9fa",
  },
  headingContainer: {
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    display: "table-row",
    backgroundColor: "#fefefe",
  },
  cell: {
    display: "table-cell",
    padding: 8,
    fontSize: 10,
    width: "120px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    color: "#333333",
  },
  cellheader: {
    display: "table-cell",
    padding: 8,
    fontSize: 10,
    width: "120px",
    textAlign: "center",
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    color: "#1a5276",
    backgroundColor: "#ecf0f1",
  },
  cellhead: {
    display: "table-cell",
    padding: 8,
    fontSize: 10,
    width: "150px",
    fontWeight: "bold",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    color: "#2c3e50",
  },
});
