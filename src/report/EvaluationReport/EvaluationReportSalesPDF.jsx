import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const EvaluationReportSalesPDF = ({ reportData }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header}>Performance Evaluation Report</Text>
      <Text style={styles.subHeader}>FIRM 3: InterSet BV</Text>
      <Text style={styles.subHeader}>MONTH 23</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.cell}>Metric</Text>
          <Text style={styles.cell}>Firm 3</Text>
          <Text style={styles.cell}>Worst</Text>
          <Text style={styles.cell}>Industry Average</Text>
          <Text style={styles.cell}>Best</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Financial</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Net Income to Revenues</Text>
            <Text style={styles.cell}>
              {reportData.net_income_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.net_income_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.net_income_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.net_income_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Change in Net Income to Revenues</Text>
            <Text style={styles.cell}>
              {reportData.change_in_net_income_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_net_income_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_net_income_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_net_income_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Return on assets</Text>
            <Text style={styles.cell}>
              {reportData.return_on_assets_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.return_on_assets_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.return_on_assets_average}%
            </Text>
            <Text style={styles.cell}>{reportData.return_on_assets_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Net Assets Turns</Text>
            <Text style={styles.cell}>
              {reportData.net_asset_turns_firm_3}%
            </Text>
            <Text style={styles.cell}>{reportData.net_asset_turns_worst}%</Text>
            <Text style={styles.cell}>
              {reportData.net_asset_turns_average}%
            </Text>
            <Text style={styles.cell}>{reportData.net_asset_turns_best}%</Text>
          </View>
          {/* Add more financial metrics here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Operational</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Inventory Turnover</Text>
            <Text style={styles.cell}>
              {reportData.inventory_turnover_firm_3}
            </Text>
            <Text style={styles.cell}>
              {reportData.inventory_turnover_worst}
            </Text>
            <Text style={styles.cell}>
              {reportData.inventory_turnover_average}
            </Text>
            <Text style={styles.cell}>
              {reportData.inventory_turnover_best}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Fill Rate</Text>
            <Text style={styles.cell}>{reportData.fill_rate_firm_3}%</Text>
            <Text style={styles.cell}>{reportData.fill_rate_worst}%</Text>
            <Text style={styles.cell}>{reportData.fill_rate_average}%</Text>
            <Text style={styles.cell}>{reportData.fill_rate_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Unplanned Production</Text>
            <Text style={styles.cell}>
              {reportData.unplanned_production_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.unplanned_production_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.unplanned_production_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.unplanned_production_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Failure Rate</Text>
            <Text style={styles.cell}>{reportData.failure_rate_firm_3}%</Text>
            <Text style={styles.cell}>{reportData.failure_rate_worst}%</Text>
            <Text style={styles.cell}>{reportData.failure_rate_average}%</Text>
            <Text style={styles.cell}>{reportData.failure_rate_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>
              Controllable Procure & Mfg to Revenues
            </Text>
            <Text style={styles.cell}>
              {reportData.controllable_procure_mfg_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.controllable_procure_mfg_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.controllable_procure_mfg_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.controllable_procure_mfg_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>
              Transportation Expenses Per Unit Sold
            </Text>
            <Text style={styles.cell}>
              {reportData.transportation_expenses_per_unit_sold_firm_3}
            </Text>
            <Text style={styles.cell}>
              {reportData.transportation_expenses_per_unit_sold_worst}
            </Text>
            <Text style={styles.cell}>
              {reportData.transportation_expenses_per_unit_sold_average}
            </Text>
            <Text style={styles.cell}>
              {reportData.transportation_expenses_per_unit_sold_best}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Forecasting Accuracy</Text>
            <Text style={styles.cell}>
              {reportData.forecasting_accuracy_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.forecasting_accuracy_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.forecasting_accuracy_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.forecasting_accuracy_best}%
            </Text>
          </View>
          {/* Add more operational metrics here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Customer</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Change in Market Share</Text>
            <Text style={styles.cell}>
              {reportData.change_in_market_share_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_market_share_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_market_share_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.change_in_market_share_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Customer Satisfaction</Text>
            <Text style={styles.cell}>
              {reportData.customer_satisfaction_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {reportData.customer_satisfaction_worst}%
            </Text>
            <Text style={styles.cell}>
              {reportData.customer_satisfaction_average}%
            </Text>
            <Text style={styles.cell}>
              {reportData.customer_satisfaction_best}%
            </Text>
          </View>
          {/* Add more customer metrics here */}
        </View>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    width: "100%",
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  cell: {
    width: "20%",
    textAlign: "center",
    fontSize: 15,
  },
});

export default EvaluationReportSalesPDF;
