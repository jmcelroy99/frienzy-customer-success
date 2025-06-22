
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, TrendingUp, Users, Building2 } from "lucide-react";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30");
  const [tierFilter, setTierFilter] = useState("all");

  // Mock data for companies
  const companies = [
    {
      id: 1,
      name: "Adventure Tours Co.",
      successfulTrips: 12,
      totalTrips: 15,
      avgGuestsPerTrip: 4.8,
      lastTripDate: "2024-06-20",
      accountTier: "$500/mo",
      customerAge: 45,
      tier: "premium"
    },
    {
      id: 2,
      name: "Coastal Escapes",
      successfulTrips: 8,
      totalTrips: 12,
      avgGuestsPerTrip: 3.2,
      lastTripDate: "2024-06-19",
      accountTier: "$250/mo",
      customerAge: 30,
      tier: "standard"
    },
    {
      id: 3,
      name: "Urban Explorer Ltd",
      successfulTrips: 6,
      totalTrips: 8,
      avgGuestsPerTrip: 5.1,
      lastTripDate: "2024-06-18",
      accountTier: "Custom",
      customerAge: 120,
      tier: "enterprise"
    },
    {
      id: 4,
      name: "Mountain Peak Adventures",
      successfulTrips: 4,
      totalTrips: 7,
      avgGuestsPerTrip: 2.8,
      lastTripDate: "2024-06-15",
      accountTier: "$250/mo",
      customerAge: 60,
      tier: "standard"
    },
    {
      id: 5,
      name: "Sunset Safari Tours",
      successfulTrips: 2,
      totalTrips: 5,
      avgGuestsPerTrip: 3.5,
      lastTripDate: "2024-06-10",
      accountTier: "$100/mo",
      customerAge: 25,
      tier: "basic"
    },
    {
      id: 6,
      name: "Heritage Walks",
      successfulTrips: 0,
      totalTrips: 3,
      avgGuestsPerTrip: 1.2,
      lastTripDate: "2024-05-28",
      accountTier: "$100/mo",
      customerAge: 90,
      tier: "basic"
    },
    {
      id: 7,
      name: "City Bike Tours",
      successfulTrips: 1,
      totalTrips: 2,
      avgGuestsPerTrip: 2.0,
      lastTripDate: "2024-06-21",
      accountTier: "$250/mo",
      customerAge: 8,
      tier: "standard"
    }
  ];

  const getUsageBadge = (successfulTrips: number, customerAge: number) => {
    if (customerAge < 14) {
      return { emoji: "⚪️", label: "New", variant: "outline" as const };
    }
    if (successfulTrips === 0) {
      return { emoji: "🟡", label: "At-Risk", variant: "destructive" as const };
    }
    if (successfulTrips > 3) {
      return { emoji: "🔥", label: "High Value", variant: "default" as const };
    }
    return null;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise": return "bg-purple-100 text-purple-800";
      case "premium": return "bg-blue-100 text-blue-800";
      case "standard": return "bg-green-100 text-green-800";
      case "basic": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredCompanies = companies
    .filter(company => {
      if (tierFilter === "all") return true;
      return company.tier === tierFilter;
    })
    .sort((a, b) => b.successfulTrips - a.successfulTrips);

  const totalSuccessfulTrips = companies.reduce((sum, company) => sum + company.successfulTrips, 0);
  const activeCompanies = companies.filter(company => company.successfulTrips > 0).length;
  const avgSuccessfulTrips = Math.round(totalSuccessfulTrips / companies.length * 10) / 10;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Frienzy PLG Dashboard</h1>
            <p className="text-gray-600 mt-1">Companies ranked by successful trips in the last {dateRange} days</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tiers</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{companies.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCompanies}</div>
              <div className="text-sm text-gray-500">With successful trips</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Successful Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalSuccessfulTrips}</div>
              <div className="text-sm text-gray-500">Last {dateRange} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg per Company</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{avgSuccessfulTrips}</div>
              <div className="text-sm text-gray-500">Successful trips</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Company Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead className="text-center">Successful Trips ({dateRange}d)</TableHead>
                  <TableHead className="text-center">Total Trips Created</TableHead>
                  <TableHead className="text-center">Avg Guests per Trip</TableHead>
                  <TableHead className="text-center">Last Trip Created</TableHead>
                  <TableHead className="text-center">Account Tier</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company, index) => {
                  const badge = getUsageBadge(company.successfulTrips, company.customerAge);
                  
                  return (
                    <TableRow key={company.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-500">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{company.name}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold text-lg text-blue-600">
                          {company.successfulTrips}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-gray-600">{company.totalTrips}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{company.avgGuestsPerTrip}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-gray-600 text-sm">
                          {formatDate(company.lastTripDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getTierColor(company.tier)}>
                          {company.accountTier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {badge && (
                          <Badge variant={badge.variant} className="gap-1">
                            <span>{badge.emoji}</span>
                            {badge.label}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
