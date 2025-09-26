import DashboardClient from "@/components/dashboard/DashboardClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container py-8">
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Interviewer Dashboard</CardTitle>
          <CardDescription>Review and manage candidate interview sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardClient />
        </CardContent>
       </Card>
    </div>
  );
}
