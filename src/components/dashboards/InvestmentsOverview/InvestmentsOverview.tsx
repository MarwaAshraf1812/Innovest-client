import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvestmentsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-main_blue">Total Funding</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">$50,000</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-main_blue">Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-main_blue">Approved Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-2xl font-bold">5</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentsOverview;
