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
      <Page size="A4">
        <View>
          <View style={styles.heading}>
            <View>
              <Text>FIRM 7: Los Descodificadores </Text>
              <Text> CORPORATE P&L STATEMENT, MONTH 25 </Text>
            </View>
            <View>
              <Text>INDUSTRY BBB</Text>
              <Text>PAGE 5</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Metric</Text>
              <Text style={styles.cellheader}>All Products</Text>
              <Text style={styles.cellheader}>Product 7-1</Text>
              <Text style={styles.cellheader}>Product 7-2</Text>
            </View>
            {/* Render sales data */}
            {Object.entries(salesData).map(([key, value], index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cellhead}>{key}</Text>
                <Text style={styles.cell}>{value["All Products"]}</Text>
                <Text style={styles.cell}>{value["Product 7-1"]}</Text>
                <Text style={styles.cell}>{value["Product 7-2"]}</Text>
              </View>
            ))}
            {/* Render revenues */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Revenue</Text>
              <Text style={styles.cell}>{Revenues["All Products"]}</Text>
              <Text style={styles.cell}>{Revenues["Product 7-1"]}</Text>
              <Text style={styles.cell}>{Revenues["Product 7-2"]}</Text>
            </View>
            {/* Render revenue details */}
            {Object.entries(Revenues.details).map(
              ([detailKey, detailValue], index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.cellhead}>- {detailKey}</Text>
                  <Text style={styles.cell}>{detailValue["All Products"]}</Text>
                  <Text style={styles.cell}>{detailValue["Product 7-1"]}</Text>
                  <Text style={styles.cell}>{detailValue["Product 7-2"]}</Text>
                </View>
              )
            )}
            {/* Render gross margin */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Gross Margin</Text>
              <Text style={styles.cell}>{GrossMargin["All Products"]}</Text>
              <Text style={styles.cell}>{GrossMargin["Product 7-1"]}</Text>
              <Text style={styles.cell}>{GrossMargin["Product 7-2"]}</Text>
            </View>
            {/* Render Fixed_Other_Costs */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Fixed_Other_Costs</Text>
            </View>
            {/* Render Fixed_Other_Costs details */}
            {Object.entries(Fixed_Other_Costs.details).map(
              ([detailKey, detailValue], index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.cellhead}>- {detailKey}</Text>
                  <Text style={styles.cell}>{detailValue["All Products"]}</Text>
                  <Text style={styles.cell}>{detailValue["Product 7-1"]}</Text>
                  <Text style={styles.cell}>{detailValue["Product 7-2"]}</Text>
                </View>
              )
            )}
            {/* Render OperatingIncome */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Operating Income</Text>
              <Text style={styles.cell}>{OperatingIncome["All Products"]}</Text>
              <Text style={styles.cell}>{OperatingIncome["Product 7-1"]}</Text>
              <Text style={styles.cell}>{OperatingIncome["Product 7-2"]}</Text>
            </View>
            {/* Render NonOperatingIncome */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>NonOperatingIncome</Text>
              <Text style={styles.cell}>
                {NonOperatingIncome["All Products"]}
              </Text>
              <Text style={styles.cell}>
                {NonOperatingIncome["Product 7-1"]}
              </Text>
              <Text style={styles.cell}>
                {NonOperatingIncome["Product 7-2"]}
              </Text>
            </View>

            {/* Render Taxes */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>Taxes</Text>
              <Text style={styles.cell}>{Taxes["All Products"]}</Text>
              <Text style={styles.cell}>{Taxes["Product 7-1"]}</Text>
              <Text style={styles.cell}>{Taxes["Product 7-2"]}</Text>
            </View>
            {/* Render NetIncome */}
            <View style={styles.tableRow}>
              <Text style={styles.cellhead}>NetIncome</Text>
              <Text style={styles.cell}>{NetIncome["All Products"]}</Text>
              <Text style={styles.cell}>{NetIncome["Product 7-1"]}</Text>
              <Text style={styles.cell}>{NetIncome["Product 7-2"]}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    padding: "20px",
    margin: "4px",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    margin: "4px",
    pageWrap: "wrap", // Prevent table from breaking across pages
  },
  tableRow: {
    flexDirection: "row",
    display: "table-row",
    break: "avoid", // Prevent row from breaking across pages
  },
  cell: {
    display: "table-cell",
    padding: 5,
    width: "120px",
    textAlign: "start",
    borderStyle: "solid",
    borderWidth: 1,
    color: "gray",
  },
  cellheader: {
    display: "table-cell",
    padding: 5,
    width: "120px",
    textAlign: "start",
    borderStyle: "solid",
    borderWidth: 1,
    color: "black",
  },
  cellhead: {
    display: "table-cell",
    padding: 5,
    width: "210px",
    textAlign: "start",
    borderStyle: "solid",
    borderWidth: 1,
    fontWeight: "bold",
  },
});
