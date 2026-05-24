import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

// Mock anonymized data preview
const previewData = [
  {
    id: "REC-001",
    company_name: "PT ******* Sejahtera",
    email: "contact@******.co.id",
    phone: "+62 21 *** *** **",
    city: "Jakarta",
    industry: "Technology",
    employees: "100-500",
    revenue_range: "10B - 50B",
  },
  {
    id: "REC-002",
    company_name: "CV ***** Mandiri",
    email: "info@*****.com",
    phone: "+62 31 *** *** **",
    city: "Surabaya",
    industry: "Manufacturing",
    employees: "50-100",
    revenue_range: "1B - 10B",
  },
  {
    id: "REC-003",
    company_name: "PT ****** Global",
    email: "admin@******.id",
    phone: "+62 22 *** *** **",
    city: "Bandung",
    industry: "Retail",
    employees: "500-1000",
    revenue_range: "50B - 100B",
  },
  {
    id: "REC-004",
    company_name: "PT ******* Indonesia",
    email: "sales@******.co.id",
    phone: "+62 61 *** *** **",
    city: "Medan",
    industry: "Finance",
    employees: "100-500",
    revenue_range: "10B - 50B",
  },
  {
    id: "REC-005",
    company_name: "CV **** Abadi",
    email: "hello@****.com",
    phone: "+62 24 *** *** **",
    city: "Semarang",
    industry: "Healthcare",
    employees: "10-50",
    revenue_range: "500M - 1B",
  },
];

const maskedFields = ["company_name", "email", "phone"];

export default function DataPreviewTable() {
  const renderCell = (key: string, value: string) => {
    const isMasked = maskedFields.includes(key);
    
    if (isMasked) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground/70 blur-[2px] select-none">
            {value}
          </span>
          <Lock className="w-3 h-3 text-muted-foreground/50" />
        </div>
      );
    }
    
    return <span className="text-foreground">{value}</span>;
  };

  return (
    <div className="relative rounded-lg border border-border overflow-hidden">
      {/* Masked Overlay Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">ID</TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Company
                <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0 border-accent/30 text-accent">
                  Masked
                </Badge>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Email
                <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0 border-accent/30 text-accent">
                  Masked
                </Badge>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Phone
                <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0 border-accent/30 text-accent">
                  Masked
                </Badge>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">City</TableHead>
              <TableHead className="text-muted-foreground font-medium">Industry</TableHead>
              <TableHead className="text-muted-foreground font-medium">Employees</TableHead>
              <TableHead className="text-muted-foreground font-medium">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row) => (
              <TableRow key={row.id} className="border-border hover:bg-secondary/30">
                <TableCell className="font-mono text-xs text-primary">{row.id}</TableCell>
                <TableCell>{renderCell("company_name", row.company_name)}</TableCell>
                <TableCell>{renderCell("email", row.email)}</TableCell>
                <TableCell>{renderCell("phone", row.phone)}</TableCell>
                <TableCell>{renderCell("city", row.city)}</TableCell>
                <TableCell>{renderCell("industry", row.industry)}</TableCell>
                <TableCell>{renderCell("employees", row.employees)}</TableCell>
                <TableCell>{renderCell("revenue_range", row.revenue_range)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Info */}
      <div className="relative z-20 px-4 py-3 bg-secondary/30 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Menampilkan 5 dari {">"}250,000 records • Data sensitif dimasking untuk preview
        </p>
      </div>
    </div>
  );
}
