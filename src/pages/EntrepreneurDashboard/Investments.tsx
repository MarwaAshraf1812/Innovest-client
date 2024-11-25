import InvestmentsInsights from "@/components/dashboards/InvestmentsInsights/InvestmentsInsights";
import InvestmentsOverview from "@/components/dashboards/InvestmentsOverview/InvestmentsOverview";
import InvestmentsTable from "@/components/dashboards/InvestmentsTable/InvestmentsTable";

const Investments = () => {
  return (
    <div className="container mx-auto mt-4">
      <div>
        <InvestmentsOverview />
      </div>

      <div>
        <InvestmentsTable />
      </div>

      <div>
        <InvestmentsInsights />
      </div>
    </div>
  );
};

export default Investments;
