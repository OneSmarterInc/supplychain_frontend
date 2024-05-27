import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 12,
    padding: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    backgroundColor: "#E4E4E4",
    textAlign: "center",
    padding: 4,
    fontWeight: "bold",
  },
  tableCol: {
    width: "20%",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    borderBottomStyle: "solid",
    textAlign: "center",
    padding: 4,
  },
  sectionHeader: {
    backgroundColor: "#F0F0F0",
    padding: 4,
    fontWeight: "bold",
  },
});

const FGInventorySalesPDF = ({ reportData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.heading}>
        <View>
          <Text>FIRM 1: SRTM Pty.</Text>
          <Text>FINISHED GOODS INVENTORY REPORT, MONTH 56</Text>
        </View>
        <View>
          <Text>INDUSTRY HHH</Text>
          <Text>PAGE 1</Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Metric</Text>
          <Text style={styles.tableColHeader}>Product 1-0</Text>
          <Text style={styles.tableColHeader}>Product 1-1</Text>
          <Text style={styles.tableColHeader}>Product 1-2</Text>
        </View>

        {/* Beginning Inventory Section */}
        <View style={styles.sectionHeader}>
          <Text>BEGINNING INVENTORY</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Beginning Inventory</Text>
          <Text style={styles.tableCol}>
            {reportData?.beginning_inventory_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.beginning_inventory_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.beginning_inventory_product_1_2}
          </Text>
        </View>

        {/* Regular Production Section */}
        <View style={styles.sectionHeader}>
          <Text>REGULAR PRODUCTION</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Regular Production</Text>
          <Text style={styles.tableCol}>
            {reportData?.regular_production_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.regular_production_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.regular_production_product_1_2}
          </Text>
        </View>

        {/* Emergency Production Section */}
        <View style={styles.sectionHeader}>
          <Text>EMERGENCY PRODUCTION</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Emergency Production</Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_production_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_production_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_production_product_1_2}
          </Text>
        </View>

        {/* Postponed Production Section */}
        <View style={styles.sectionHeader}>
          <Text>POSTPONED PRODUCTION</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Postponed Production</Text>
          <Text style={styles.tableCol}>
            {reportData?.postponed_production_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.postponed_production_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.postponed_production_product_1_2}
          </Text>
        </View>

        {/* Available Inventory Section */}
        <View style={styles.sectionHeader}>
          <Text>AVAILABLE INVENTORY</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Available Inventory</Text>
          <Text style={styles.tableCol}>
            {reportData?.available_inventory_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.available_inventory_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.available_inventory_product_1_2}
          </Text>
        </View>

        {/* Shipments to DC2 Section */}
        <View style={styles.sectionHeader}>
          <Text>SHIPMENTS TO DC2</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Shipments to DC2 Surface</Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_surface_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_surface_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_surface_product_1_2}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Shipments to DC2 Air</Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_air_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_air_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_air_product_1_2}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Shipments toDC2 Emergency</Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_emergency_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_emergency_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.shipments_to_dc2_emergency_product_1_2}
          </Text>
        </View>

        {/* Sales Section */}
        <View style={styles.sectionHeader}>
          <Text>SALES</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales, Region 1</Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_region_1_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_region_1_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_region_1_product_1_2}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales, Other Regions</Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_other_regions_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_other_regions_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_other_regions_product_1_2}
          </Text>
        </View>

        {/* Ending Inventory Section */}
        <View style={styles.sectionHeader}>
          <Text>ENDING INVENTORY</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Ending Inventory</Text>
          <Text style={styles.tableCol}>
            {reportData?.ending_inventory_product_1_0}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.ending_inventory_product_1_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.ending_inventory_product_1_2}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default FGInventorySalesPDF;
