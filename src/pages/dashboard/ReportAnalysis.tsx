
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format, startOfMonth, endOfMonth, startOfYear, endOfYear, isSameDay, isSameMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronDown, Download, BarChart, Users, DollarSign, TrendingUp, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";

// Sample data for demonstration
const generateDailyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = addDays(today, -i);
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      customers: Math.floor(Math.random() * 30),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      services: Math.floor(Math.random() * 40) + 5,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const month = today.getMonth() - i;
    const year = today.getFullYear() + Math.floor((today.getMonth() - i) / 12);
    const date = new Date(year, (month + 12) % 12, 1);
    data.push({
      date: format(date, 'yyyy-MM'),
      customers: Math.floor(Math.random() * 300) + 100,
      revenue: Math.floor(Math.random() * 500000) + 100000,
      services: Math.floor(Math.random() * 400) + 50,
    });
  }
  return data;
};

const generateYearlyData = () => {
  const data = [];
  const currentYear = new Date().getFullYear();
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    data.push({
      date: `${year}`,
      customers: Math.floor(Math.random() * 3000) + 1000,
      revenue: Math.floor(Math.random() * 5000000) + 1000000,
      services: Math.floor(Math.random() * 4000) + 500,
    });
  }
  return data;
};

const generateTopServices = () => {
  return [
    { name: "基礎臉部護理", value: 30 },
    { name: "深層清潔", value: 25 },
    { name: "全臉煥膚", value: 20 },
    { name: "美甲服務", value: 15 },
    { name: "頭髮護理", value: 10 }
  ];
};

const topCustomersData = [
  { id: 1, name: "林小美", visits: 12, spent: 36000, lastVisit: "2025-04-01" },
  { id: 2, name: "王大明", visits: 8, spent: 24000, lastVisit: "2025-04-05" },
  { id: 3, name: "張美美", visits: 7, spent: 21000, lastVisit: "2025-03-28" },
  { id: 4, name: "陳小華", visits: 6, spent: 18000, lastVisit: "2025-04-10" },
  { id: 5, name: "李大毛", visits: 5, spent: 15000, lastVisit: "2025-03-15" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ReportAnalysisPage = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  });
  const [dataView, setDataView] = useState<'chart' | 'table'>('chart');
  
  const dailyData = generateDailyData();
  const monthlyData = generateMonthlyData();
  const yearlyData = generateYearlyData();
  const topServices = generateTopServices();
  
  const getDisplayData = () => {
    switch (timeframe) {
      case 'daily':
        return dailyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  };
  
  const getDateRangeText = () => {
    if (!date?.from) return "";
    if (!date.to) {
      return format(date.from, "yyyy-MM-dd");
    }
    return `${format(date.from, "yyyy-MM-dd")} ~ ${format(date.to, "yyyy-MM-dd")}`;
  };
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as 'daily' | 'monthly' | 'yearly');
    
    if (value === 'daily') {
      setDate({
        from: addDays(new Date(), -7),
        to: new Date()
      });
    } else if (value === 'monthly') {
      setDate({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date())
      });
    } else if (value === 'yearly') {
      setDate({
        from: startOfYear(new Date()),
        to: endOfYear(new Date())
      });
    }
  };
  
  const calculateTotals = (data: any[]) => {
    return data.reduce((acc, item) => {
      return {
        customers: acc.customers + item.customers,
        revenue: acc.revenue + item.revenue,
        services: acc.services + item.services
      };
    }, { customers: 0, revenue: 0, services: 0 });
  };
  
  const totals = calculateTotals(getDisplayData());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">報表分析</h1>
            <p className="text-beauty-muted">查看客戶、營收與服務數據</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="選擇時間範圍" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">日報表</SelectItem>
                <SelectItem value="monthly">月報表</SelectItem>
                <SelectItem value="yearly">年報表</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto justify-start text-left font-normal flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {getDateRangeText() || <span>選擇日期範圍</span>}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總客戶數</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.customers}</div>
              <p className="text-xs text-muted-foreground">
                {timeframe === 'daily' ? '近7天' : timeframe === 'monthly' ? '本月' : '年度'} 客戶總數
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總營收</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NT$ {totals.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {timeframe === 'daily' ? '近7天' : timeframe === 'monthly' ? '本月' : '年度'} 營收總額
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">總服務數</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.services}</div>
              <p className="text-xs text-muted-foreground">
                {timeframe === 'daily' ? '近7天' : timeframe === 'monthly' ? '本月' : '年度'} 服務總數
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>營收趨勢</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" 
                    size="sm" 
                    className={dataView === 'chart' ? 'bg-primary text-primary-foreground' : ''}
                    onClick={() => setDataView('chart')}
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    圖表
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={dataView === 'table' ? 'bg-primary text-primary-foreground' : ''}
                    onClick={() => setDataView('table')}
                  >
                    <Search className="h-4 w-4 mr-1" />
                    明細
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              {dataView === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getDisplayData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={50} 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`NT$ ${value.toLocaleString()}`, '營收']}
                      labelFormatter={(label) => `日期: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="營收"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="overflow-x-auto h-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>日期</TableHead>
                        <TableHead>客戶數</TableHead>
                        <TableHead>營收 (NT$)</TableHead>
                        <TableHead>服務數</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDisplayData().map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.customers}</TableCell>
                          <TableCell>{item.revenue.toLocaleString()}</TableCell>
                          <TableCell>{item.services}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>熱門服務</CardTitle>
              <CardDescription>按服務預約量排名</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topServices}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {topServices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '佔比']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>頂級客戶</CardTitle>
            <CardDescription>按消費金額排名</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客戶姓名</TableHead>
                  <TableHead>來訪次數</TableHead>
                  <TableHead>消費總額 (NT$)</TableHead>
                  <TableHead>最近造訪</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.visits}</TableCell>
                    <TableCell>{customer.spent.toLocaleString()}</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportAnalysisPage;
