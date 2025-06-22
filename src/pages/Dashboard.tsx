
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, MapPin, Calendar, Search, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("value");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for customer businesses
  const businesses = [
    {
      id: 1,
      name: "Adventure Tours Co.",
      logo: "AT",
      successfulTrips: 145,
      totalItineraryItems: 890,
      totalGuests: 2340,
      valueScore: 98,
      trend: "up",
      trendPercent: 15,
      avgTripRating: 4.8,
      lastActivity: "2 hours ago",
      tier: "Enterprise"
    },
    {
      id: 2,
      name: "Coastal Escapes",
      logo: "CE",
      successfulTrips: 132,
      totalItineraryItems: 756,
      totalGuests: 1980,
      valueScore: 94,
      trend: "up",
      trendPercent: 8,
      avgTripRating: 4.7,
      lastActivity: "1 day ago",
      tier: "Pro"
    },
    {
      id: 3,
      name: "Urban Explorer Ltd",
      logo: "UE",
      successfulTrips: 98,
      totalItineraryItems: 654,
      totalGuests: 1560,
      valueScore: 87,
      trend: "up",
      trendPercent: 12,
      avgTripRating: 4.6,
      lastActivity: "5 hours ago",
      tier: "Pro"
    },
    {
      id: 4,
      name: "Mountain Peak Adventures",
      logo: "MP",
      successfulTrips: 89,
      totalItineraryItems: 534,
      totalGuests: 1245,
      valueScore: 82,
      trend: "down",
      trendPercent: -3,
      avgTripRating: 4.5,
      lastActivity: "3 days ago",
      tier: "Standard"
    },
    {
      id: 5,
      name: "Sunset Safari Tours",
      logo: "SS",
      successfulTrips: 76,
      totalItineraryItems: 445,
      totalGuests: 998,
      valueScore: 78,
      trend: "up",
      trendPercent: 5,
      avgTripRating: 4.4,
      lastActivity: "1 day ago",
      tier: "Standard"
    },
    {
      id: 6,
      name: "Heritage Walks",
      logo: "HW",
      successfulTrips: 54,
      totalItineraryItems: 298,
      totalGuests: 678,
      valueScore: 65,
      trend: "down",
      trendPercent: -8,
      avgTripRating: 4.2,
      lastActivity: "1 week ago",
      tier: "Basic"
    }
  ];

  // Chart data
  const monthlyTrends = [
    { month: "Jan", trips: 65, guests: 1200 },
    { month: "Feb", trips: 78, guests: 1450 },
    { month: "Mar", trips: 89, guests: 1680 },
    { month: "Apr", trips: 95, guests: 1890 },
    { month: "May", trips: 112, guests: 2100 },
    { month: "Jun", trips: 125, guests: 2340 }
  ];

  const tierDistribution = [
    { name: "Enterprise", value: 1, color: "#8b5cf6" },
    { name: "Pro", value: 2, color: "#3b82f6" },
    { name: "Standard", value: 2, color: "#10b981" },
    { name: "Basic", value: 1, color: "#f59e0b" }
  ];

  const filteredBusinesses = businesses
    .filter(business => 
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "trips":
          return b.successfulTrips - a.successfulTrips;
        case "guests":
          return b.totalGuests - a.totalGuests;
        case "items":
          return b.totalItineraryItems - a.totalItineraryItems;
        default:
          return b.valueScore - a.valueScore;
      }
    });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Enterprise": return "bg-purple-100 text-purple-800";
      case "Pro": return "bg-blue-100 text-blue-800";
      case "Standard": return "bg-green-100 text-green-800";
      case "Basic": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Success Dashboard</h1>
            <p className="text-gray-600 mt-1">Track business value and engagement across Frienzy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value">Value Score</SelectItem>
                <SelectItem value="trips">Successful Trips</SelectItem>
                <SelectItem value="guests">Total Guests</SelectItem>
                <SelectItem value="items">Itinerary Items</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{businesses.length}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Successful Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {businesses.reduce((sum, b) => sum + b.successfulTrips, 0)}
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">+18% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {businesses.reduce((sum, b) => sum + b.totalGuests, 0).toLocaleString()}
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Avg Value Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(businesses.reduce((sum, b) => sum + b.valueScore, 0) / businesses.length)}
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">+5% this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="trips" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="guests" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tier Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tierDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tierDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {tierDistribution.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: tier.color }}
                      />
                      <span className="text-sm">{tier.name}</span>
                    </div>
                    <span className="text-sm font-medium">{tier.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Ranking Table */}
        <Card>
          <CardHeader>
            <CardTitle>Business Value Ranking</CardTitle>
            <p className="text-sm text-gray-600">Ranked by overall value derived from Frienzy platform</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBusinesses.map((business, index) => (
                <div
                  key={business.id}
                  className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded">
                      {index + 1}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg">
                      {business.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{business.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getTierColor(business.tier)}>
                          {business.tier}
                        </Badge>
                        <span className="text-sm text-gray-500">Last active: {business.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="font-bold text-lg">{business.valueScore}</div>
                      <div className="text-xs text-gray-500">Value Score</div>
                      <div className={`flex items-center justify-center mt-1 ${
                        business.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {business.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="text-xs ml-1">{Math.abs(business.trendPercent)}%</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-600">{business.successfulTrips}</div>
                      <div className="text-xs text-gray-500">Successful Trips</div>
                      <div className="flex items-center justify-center mt-1">
                        <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">This month</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-lg text-green-600">{business.totalItineraryItems}</div>
                      <div className="text-xs text-gray-500">Itinerary Items</div>
                      <div className="flex items-center justify-center mt-1">
                        <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">Total created</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-lg text-purple-600">{business.totalGuests.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total Guests</div>
                      <div className="flex items-center justify-center mt-1">
                        <Users className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">★ {business.avgTripRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
