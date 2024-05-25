import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const firmData = {
  id: 1,
  simulation_id: 73,
  admin_id: 1,
  firm_key: "onesmarter inc.",
  quarter: 1,
  net_income_to_revenues_firm_3: 4.5,
  net_income_to_revenues_worst: 4.5,
  net_income_to_revenues_average: 5.4,
  net_income_to_revenues_best: 5.9,
  change_in_net_income_to_revenues_firm_3: -1.7,
  change_in_net_income_to_revenues_worst: -1.7,
  change_in_net_income_to_revenues_average: -0.1,
  change_in_net_income_to_revenues_best: 1.0,
  return_on_assets_firm_3: 13.8,
  return_on_assets_worst: 13.8,
  return_on_assets_average: 16.4,
  return_on_assets_best: 18.0,
  net_asset_turns_firm_3: 3.0,
  net_asset_turns_worst: 2.8,
  net_asset_turns_average: 3.0,
  net_asset_turns_best: 3.0,
  inventory_turnover_firm_3: 4.5,
  inventory_turnover_worst: 3.9,
  inventory_turnover_average: 4.3,
  inventory_turnover_best: 4.7,
  fill_rate_firm_3: 91.1,
  fill_rate_worst: 91.1,
  fill_rate_average: 96.6,
  fill_rate_best: 100.0,
  unplanned_production_firm_3: 15.4,
  unplanned_production_worst: 15.4,
  unplanned_production_average: 12.8,
  unplanned_production_best: 6.4,
  failure_rate_firm_3: 7.2,
  failure_rate_worst: 7.5,
  failure_rate_average: 7.1,
  failure_rate_best: 2.8,
  controllable_procure_mfg_to_revenues_firm_3: 3.1,
  controllable_procure_mfg_to_revenues_worst: 3.1,
  controllable_procure_mfg_to_revenues_average: 2.1,
  controllable_procure_mfg_to_revenues_best: "N/A",
  transportation_expenses_per_unit_sold_firm_3: 34.1,
  transportation_expenses_per_unit_sold_worst: 34.1,
  transportation_expenses_per_unit_sold_average: 32.6,
  transportation_expenses_per_unit_sold_best: 31.1,
  forecasting_accuracy_firm_3: 81.8,
  forecasting_accuracy_worst: 81.8,
  forecasting_accuracy_average: 85.2,
  forecasting_accuracy_best: 87.7,
  marketing_service_to_revenues_firm_3: 8.7,
  marketing_service_to_revenues_worst: 9.0,
  marketing_service_to_revenues_average: 8.7,
  marketing_service_to_revenues_best: 8.5,
  change_in_market_share_firm_3: -0.1,
  change_in_market_share_worst: -1.0,
  change_in_market_share_average: 0.0,
  change_in_market_share_best: 0.5,
  customer_satisfaction_firm_3: 26.6,
  customer_satisfaction_worst: 24.4,
  customer_satisfaction_average: 25.3,
  customer_satisfaction_best: 26.6,
};
const EvaluationReportSalesPDF = ({ firmData }) => (
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
              {firmData.net_income_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.net_income_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.net_income_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.net_income_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Change in Net Income to Revenues</Text>
            <Text style={styles.cell}>
              {firmData.change_in_net_income_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_net_income_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_net_income_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_net_income_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Return on assets</Text>
            <Text style={styles.cell}>{firmData.return_on_assets_firm_3}%</Text>
            <Text style={styles.cell}>{firmData.return_on_assets_worst}%</Text>
            <Text style={styles.cell}>
              {firmData.return_on_assets_average}%
            </Text>
            <Text style={styles.cell}>{firmData.return_on_assets_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Net Assets Turns</Text>
            <Text style={styles.cell}>{firmData.net_asset_turns_firm_3}%</Text>
            <Text style={styles.cell}>{firmData.net_asset_turns_worst}%</Text>
            <Text style={styles.cell}>{firmData.net_asset_turns_average}%</Text>
            <Text style={styles.cell}>{firmData.net_asset_turns_best}%</Text>
          </View>
          {/* Add more financial metrics here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Operational</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Inventory Turnover</Text>
            <Text style={styles.cell}>
              {firmData.inventory_turnover_firm_3}
            </Text>
            <Text style={styles.cell}>{firmData.inventory_turnover_worst}</Text>
            <Text style={styles.cell}>
              {firmData.inventory_turnover_average}
            </Text>
            <Text style={styles.cell}>{firmData.inventory_turnover_best}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Fill Rate</Text>
            <Text style={styles.cell}>{firmData.fill_rate_firm_3}%</Text>
            <Text style={styles.cell}>{firmData.fill_rate_worst}%</Text>
            <Text style={styles.cell}>{firmData.fill_rate_average}%</Text>
            <Text style={styles.cell}>{firmData.fill_rate_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Unplanned Production</Text>
            <Text style={styles.cell}>
              {firmData.unplanned_production_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.unplanned_production_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.unplanned_production_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.unplanned_production_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Failure Rate</Text>
            <Text style={styles.cell}>{firmData.failure_rate_firm_3}%</Text>
            <Text style={styles.cell}>{firmData.failure_rate_worst}%</Text>
            <Text style={styles.cell}>{firmData.failure_rate_average}%</Text>
            <Text style={styles.cell}>{firmData.failure_rate_best}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>
              Controllable Procure & Mfg to Revenues
            </Text>
            <Text style={styles.cell}>
              {firmData.controllable_procure_mfg_to_revenues_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.controllable_procure_mfg_to_revenues_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.controllable_procure_mfg_to_revenues_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.controllable_procure_mfg_to_revenues_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>
              Transportation Expenses Per Unit Sold
            </Text>
            <Text style={styles.cell}>
              {firmData.transportation_expenses_per_unit_sold_firm_3}
            </Text>
            <Text style={styles.cell}>
              {firmData.transportation_expenses_per_unit_sold_worst}
            </Text>
            <Text style={styles.cell}>
              {firmData.transportation_expenses_per_unit_sold_average}
            </Text>
            <Text style={styles.cell}>
              {firmData.transportation_expenses_per_unit_sold_best}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Forecasting Accuracy</Text>
            <Text style={styles.cell}>
              {firmData.forecasting_accuracy_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.forecasting_accuracy_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.forecasting_accuracy_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.forecasting_accuracy_best}%
            </Text>
          </View>
          {/* Add more operational metrics here */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Customer</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Change in Market Share</Text>
            <Text style={styles.cell}>
              {firmData.change_in_market_share_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_market_share_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_market_share_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.change_in_market_share_best}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Customer Satisfaction</Text>
            <Text style={styles.cell}>
              {firmData.customer_satisfaction_firm_3}%
            </Text>
            <Text style={styles.cell}>
              {firmData.customer_satisfaction_worst}%
            </Text>
            <Text style={styles.cell}>
              {firmData.customer_satisfaction_average}%
            </Text>
            <Text style={styles.cell}>
              {firmData.customer_satisfaction_best}%
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
