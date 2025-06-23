import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, TrendingUp, Users, Building2, ArrowUpDown, Filter, ChevronDown } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30");
  const [reverseOrder, setReverseOrder] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({
    "personal": true,
    "business": true,
  });
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setCompanies([]);
    const fetchData = async () => {
      try {
        // Create query parameters from current state
        const params = new URLSearchParams({
          dateRange: dateRange,
          filterBy: selectedTypes.personal && selectedTypes.business ? "all" : selectedTypes.personal ? "personal" : "business",
          sortType: reverseOrder ? "ASC" : "DESC",
          offset: "0",
          limit: "100",
        });

        const data = await fetch(`${API_BASE_URL}/dashboard/customer-success?${params}`);
        const json = await data.json();
        if (json.status && json.data && json.data.customers) {
          setCompanies(json.data.customers);
        } else {
          setCompanies([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, reverseOrder, selectedTypes]);

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "personal": return "bg-purple-100 text-purple-800";
      case "business": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case "personal": return "Personal";
      case "business": return "Business";
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTypeToggle = (type: string, checked: boolean) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const totalSuccessfulTrips = useMemo(() => companies.reduce((sum, company) => sum + company.successfulTrips, 0), [companies]);
  const activeCompanies = useMemo(() => companies.filter(company => company.successfulTrips > 0).length, [companies]);
  const avgSuccessfulTrips = useMemo(() => Math.round(totalSuccessfulTrips / companies.length * 10) / 10, [companies, totalSuccessfulTrips]);

  const getSelectedTypesCount = () => {
    return Object.values(selectedTypes).filter(Boolean).length;
  };

  const getFilterButtonText = () => {
    const count = getSelectedTypesCount();
    if (count === 2) return "All Types";
    if (count === 0) return "No Types";
    return `${count} Type${count > 1 ? 's' : ''}`;
  };

  // Loading skeleton components
  const LoadingKPICards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const LoadingTable = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead className="text-center">Successful Trips (30d)</TableHead>
              <TableHead className="text-center">Total Trips Created</TableHead>
              <TableHead className="text-center">Avg Guests per Trip</TableHead>
              <TableHead className="text-center">Last Trip Created</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-6 w-8 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-12 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-20 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-6 w-16 mx-auto rounded-full" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Success Dashboard</h1>
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
              <Filter className="h-4 w-4 text-gray-500" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {getFilterButtonText()}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Filter by Customer Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedTypes["personal"]}
                    onCheckedChange={(checked) => handleTypeToggle("personal", checked)}
                  >
                    Personal
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedTypes["business"]}
                    onCheckedChange={(checked) => handleTypeToggle("business", checked)}
                  >
                    Business
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <Toggle 
                pressed={reverseOrder} 
                onPressedChange={setReverseOrder}
                aria-label="Reverse ranking order"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
              >
                Reverse Order
              </Toggle>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        {isLoading ? (
          <LoadingKPICards />
        ) : (
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
        )}

        {/* Main Leaderboard Table */}
        {isLoading ? (
          <LoadingTable />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Value Leaderboard
                {reverseOrder && (
                  <Badge variant="outline" className="ml-2 text-blue-600 border-blue-300">
                    Least to Most
                  </Badge>
                )}
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
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company, index) => {
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
                          <Badge className={getTypeColor(company.type)}>
                            {getTypeDisplayName(company.type)}
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
