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

const ProductReportSalesPDF = ({ reportData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.heading}>
        <View>
          <Text>FIRM 3: InterSet BV</Text>
          <Text>PERFORMANCE Product REPORT, MONTH 23</Text>
        </View>
        <View>
          <Text>INDUSTRY AAA</Text>
          <Text>PAGE 1</Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Metric</Text>
          <Text style={styles.tableColHeader}>All Regions</Text>
          <Text style={styles.tableColHeader}>Region 1</Text>
          <Text style={styles.tableColHeader}>Region 2</Text>
          <Text style={styles.tableColHeader}>Region 3</Text>
        </View>

        {/* Sales Volume Section */}
        <View style={styles.sectionHeader}>
          <Text>SALES VOLUME</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales Volume Channel 1</Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_1_channel_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_2_channel_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_3_channel_1}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales Volume Channel 2</Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_1_channel_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_2_channel_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_region_3_channel_2}
          </Text>
        </View>

        {/* Unfilled Orders Section */}
        <View style={styles.sectionHeader}>
          <Text>UNFILLED ORDERS</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Unfilled Orders All Regions</Text>
          <Text style={styles.tableCol}>
            {reportData?.unfilled_orders_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.unfilled_orders_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.unfilled_orders_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.unfilled_orders_region_3}
          </Text>
        </View>

        {/* Prices Section */}
        <View style={styles.sectionHeader}>
          <Text>PRICES</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Price Channel 1</Text>
          <Text style={styles.tableCol}>{reportData?.price_all_regions}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Price Channel 2</Text>
          <Text style={styles.tableCol}>{reportData?.price_all_regions}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_3}</Text>
        </View>

        {/* Revenue Section */}
        <View style={styles.sectionHeader}>
          <Text>REVENUE</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Revenue All Regions</Text>
          <Text style={styles.tableCol}>{reportData?.revenue_all_regions}</Text>
          <Text style={styles.tableCol}>{reportData?.revenue_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.revenue_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.revenue_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Product Costs All Regions</Text>
          <Text style={styles.tableCol}>
            {reportData?.product_costs_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.product_costs_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.product_costs_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.product_costs_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Order Processing</Text>
          <Text style={styles.tableCol}>
            {reportData?.order_processing_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.order_processing_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.order_processing_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.order_processing_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Replacement Parts</Text>
          <Text style={styles.tableCol}>
            {reportData?.replacement_parts_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.replacement_parts_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.replacement_parts_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.replacement_parts_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>RFID Costs</Text>
          <Text style={styles.tableCol}>
            {reportData?.rfid_costs_all_regions}
          </Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Duties & Tariffs</Text>
          <Text style={styles.tableCol}>
            {reportData?.duties_tariffs_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.duties_tariffs_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.duties_tariffs_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.duties_tariffs_region_3}
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text>GROSS MARGIN</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Gross Margin</Text>
          <Text style={styles.tableCol}>
            {reportData?.gross_margin_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.gross_margin_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.gross_margin_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.gross_margin_region_3}
          </Text>
        </View>

        {/* Operating Income Section */}
        <View style={styles.sectionHeader}>
          <Text>OPERATING INCOME</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Operating Income</Text>
          <Text style={styles.tableCol}>
            {reportData?.operating_income_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.operating_income_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.operating_income_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.operating_income_region_3}
          </Text>
        </View>

        {/* Fixed Costs Section */}
        <View style={styles.sectionHeader}>
          <Text>FIXED COSTS</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Administrative Overhead </Text>
          <Text style={styles.tableCol}>
            {reportData?.administrative_overhead_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.administrative_overhead_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.administrative_overhead_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.administrative_overhead_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Forecast Inaccuracy</Text>
          <Text style={styles.tableCol}>
            {reportData?.forecast_inaccuracy_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.forecast_inaccuracy_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.forecast_inaccuracy_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.forecast_inaccuracy_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Marketing , CH1</Text>
          <Text style={styles.tableCol}>
            {reportData?.marketing_all_regions}
          </Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Marketing, CH2</Text>
          <Text style={styles.tableCol}>
            {reportData?.marketing_all_regions}
          </Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.marketing_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Price Change</Text>
          <Text style={styles.tableCol}>{reportData?.price_all_regions}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.price_region_3}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Service Outsourcing</Text>
          <Text style={styles.tableCol}>
            {reportData?.service_outsourcing_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.service_outsourcing_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.service_outsourcing_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.service_outsourcing_region_3}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Total Fixed Costs</Text>
          <Text style={styles.tableCol}>
            {reportData?.total_fixed_costs_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.total_fixed_costs_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.total_fixed_costs_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.total_fixed_costs_region_3}
          </Text>
        </View>
        {/* RFID Section */}
        <View style={styles.sectionHeader}>
          <Text>RFID</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>RFID</Text>
          <Text style={styles.tableCol}>
            {reportData?.rfid_costs_all_regions}
          </Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_1}</Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_2}</Text>
          <Text style={styles.tableCol}>{reportData?.rfid_costs_region_3}</Text>
        </View>
        {/* Emergency Carrier Section */}
        <View style={styles.sectionHeader}>
          <Text>Emergency Carrier</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Emergency Carrier </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_carrier_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_carrier_region_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_carrier_region_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.emergency_carrier_region_3}
          </Text>
        </View>
        {/* SALES VOLUME FORECAST Section */}
        <View style={styles.sectionHeader}>
          <Text>SALES VOLUME FORECAST</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales Volume Forecast Channel 1 </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_1_channel_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_2_channel_1}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_3_channel_1}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sales Volume Forecast Channel 2 </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_all_regions}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_1_channel_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_2_channel_2}
          </Text>
          <Text style={styles.tableCol}>
            {reportData?.sales_volume_forecast_region_3_channel_2}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProductReportSalesPDF;
