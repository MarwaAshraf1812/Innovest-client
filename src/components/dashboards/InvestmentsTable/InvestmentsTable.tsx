import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projectsData = [
  {
    projectName: "SolarTech Solutions",
    investor: "John Doe",
    amount: "$50,000",
    date: "2024-10-01",
  },
  {
    projectName: "EcoBuild Construction",
    investor: "Jane Smith",
    amount: "$75,000",
    date: "2024-10-15",
  },
  {
    projectName: "SmartAgriTech",
    investor: "Michael Brown",
    amount: "$120,000",
    date: "2024-09-25",
  },
  {
    projectName: "FinConnect",
    investor: "Sophia Johnson",
    amount: "$90,000",
    date: "2024-11-05",
  },
  {
    projectName: "HealthPlus Devices",
    investor: "David Lee",
    amount: "$60,000",
    date: "2024-10-20",
  },
];

const InvestmentsTable = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-main_blue">
        Projects Invested
      </h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption className="text-main_blue">A list of investments made in projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Investor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectsData.map((project) => (
              <TableRow key={project.projectName}>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.investor}</TableCell>
                <TableCell>{project.amount}</TableCell>
                <TableCell>{project.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestmentsTable;
