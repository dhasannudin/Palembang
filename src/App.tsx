import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Simple Card components to replace the missing UI library
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Dashboard = () => {
  const rawData = `BULAN;KADE;JENIS;TON_DN;TON_LN
JANUARI;B;CC;15912;0
JANUARI;DE;CC;5001;0
JANUARI;DE;CK;0;19593
JANUARI;EX. PT. PN VII;CC;22760;0
JANUARI;H;CC;11259;0
JANUARI;I;CC;14914;1516
JANUARI;I;CK;0;4990
JANUARI;LONSUM;CC;8003;0
JANUARI;MSS;CC;650;0
JANUARI;TPK 1;CC;2805;0
JANUARI;TRIMITRA;CC;1084;0
FEBRUARI;B;CC;12146;3022
FEBRUARI;DE;CC;3301;0
FEBRUARI;DE;CK;4002;6955
FEBRUARI;EX PT. PN VII;CC;19052;0
FEBRUARI;H;CC;21327;0
FEBRUARI;I;CC;1044;0
FEBRUARI;LONSUM;CC;3501;0
FEBRUARI;MSS;CC;900;0
FEBRUARI;TRIMITRA;CC;925;0
MARET;B;CC;9051;0
MARET;DE;CC;1001;0
MARET;DE;CK;0;10366
MARET;EX PT. PN VII;CC;28960;0
MARET;H;CC;19002;0
MARET;I;CC;8253;4648
MARET;LONSUM;CC;9503;0
MARET;TRIMITRA;CC;1999;0
APRIL;B;CC;4998;0
APRIL;DE;CC;2501;3020
APRIL;DE;CK;3367;0
APRIL;EX PT. PN VII;CC;15897;0
APRIL;H;CC;32232;0
APRIL;I;CK;0;3300
APRIL;LONSUM;CC;3502;0
APRIL;TRIMITRA;CC;2797;0
MEI;B;CC;9250;0
MEI;DE;CK;6403;6000
MEI;EX. PT. PN VII;CC;15214;0
MEI;H;CC;23466;0
MEI;I;CC;6706;0
MEI;LONSUM;CC;3500;0
MEI;TRIMITRA;CC;2672;0
JUNI;B;CC;6053;4908
JUNI;DE;CK;4500;19950
JUNI;EX PT. PN VII;CC;23013;0
JUNI;H;CC;22329;0
JUNI;I;CC;0;998
JUNI;I;CK;0;3850
JUNI;LONSUM;CC;9606;0
JUNI;TRIMITRA;CC;3248;0
JULI;B;CC;8002;2926
JULI;DE;CK;0;24201
JULI;EX. PT. PN VII;CC;15605;0
JULI;H;CC;25266;0
JULI;H;CK;0;3821
JULI;LONSUM;CC;10001;0
AGUSTUS;B;CC;3500;0
AGUSTUS;DE;CC;1051;0
AGUSTUS;DE;CK;0;20180
AGUSTUS;EX. PT. PN VII;CC;5900;0
AGUSTUS;H;CC;27304;2000
AGUSTUS;LONSUM;CC;10505;0
AGUSTUS;TERMINAL SEI. LAIS;CC;994;0
AGUSTUS;TPK I;CC;2206;0
SEPTEMBER;B;CC;8502;4975
SEPTEMBER;B;CK;0;3300
SEPTEMBER;DE;CK;0;9111
SEPTEMBER;EX. PT. PN VII;CC;20967;0
SEPTEMBER;H;CC;21668;1500
SEPTEMBER;LONSUM;CC;3501;0
SEPTEMBER;SEI. LAIS;CC;2636;0
SEPTEMBER;TERMINAL SEI. LAIS;CC;1291;0
OKTOBER;B;CC;5052;0
OKTOBER;DE;CK;0;9910
OKTOBER;EX. PT, PN VII;CC;14121;0
OKTOBER;H;CC;49086;0
OKTOBER;I;CC;1110;0
OKTOBER;LONSUM;CC;10304;0
OKTOBER;TERMINAL SEI. LAIS;CC;3206;0
OKTOBER;TPK I;CC;2202;0
NOVEMBER;B;CC;17405;2978
NOVEMBER;B;CK;0;4950
NOVEMBER;DE;CC;1051;0
NOVEMBER;DE;CK;0;22596
NOVEMBER;EX. PT, PN VII;CC;36537;0
NOVEMBER;H;CC;9654;0
NOVEMBER;I;CC;37942;5188
NOVEMBER;I;CK;0;4000
NOVEMBER;LONSUM;CC;16005;0
NOVEMBER;TERMINAL SEI. LAIS;CC;5918;0
DESEMBER;B;CC;4501;5706
DESEMBER;DE;CK;0;14830
DESEMBER;EX. PT. PN VII;CC;23991;0
DESEMBER;H;CC;44379;3250
DESEMBER;I;CK;0;4359
DESEMBER;LONSUM;CC;9001;0
DESEMBER;TERMINAL SEI. LAIS;CC;4047;0`;

  const [selectedTab, setSelectedTab] = useState("overview");

  const processedData = useMemo(() => {
    const lines = rawData.trim().split("\n").slice(1); // Skip header
    const data = [];

    lines.forEach((line) => {
      if (line.trim() && !line.includes(";;;")) {
        // Skip empty lines and total line
        const [bulan, kade, jenis, ton_dn, ton_ln] = line.split(";");
        data.push({
          bulan,
          kade: kade.trim(),
          jenis,
          ton_dn: parseInt(ton_dn) || 0,
          ton_ln: parseInt(ton_ln) || 0,
          total: (parseInt(ton_dn) || 0) + (parseInt(ton_ln) || 0),
        });
      }
    });

    return data;
  }, []);

  // Monthly trend data
  const monthlyData = useMemo(() => {
    const months = [
      "JANUARI",
      "FEBRUARI",
      "MARET",
      "APRIL",
      "MEI",
      "JUNI",
      "JULI",
      "AGUSTUS",
      "SEPTEMBER",
      "OKTOBER",
      "NOVEMBER",
      "DESEMBER",
    ];

    return months.map((month) => {
      const monthData = processedData.filter((d) => d.bulan === month);
      const cc_dn = monthData
        .filter((d) => d.jenis === "CC")
        .reduce((sum, d) => sum + d.ton_dn, 0);
      const cc_ln = monthData
        .filter((d) => d.jenis === "CC")
        .reduce((sum, d) => sum + d.ton_ln, 0);
      const ck_dn = monthData
        .filter((d) => d.jenis === "CK")
        .reduce((sum, d) => sum + d.ton_dn, 0);
      const ck_ln = monthData
        .filter((d) => d.jenis === "CK")
        .reduce((sum, d) => sum + d.ton_ln, 0);

      return {
        month,
        "CC Domestik": cc_dn,
        "CC Luar Negeri": cc_ln,
        "CK Domestik": ck_dn,
        "CK Luar Negeri": ck_ln,
        "Total CC": cc_dn + cc_ln,
        "Total CK": ck_dn + ck_ln,
      };
    });
  }, [processedData]);

  // KADE performance data
  const kadeData = useMemo(() => {
    const kadeMap = {};

    processedData.forEach((d) => {
      if (!kadeMap[d.kade]) {
        kadeMap[d.kade] = {
          kade: d.kade,
          cc_total: 0,
          ck_total: 0,
          cc_dn: 0,
          cc_ln: 0,
          ck_dn: 0,
          ck_ln: 0,
        };
      }

      if (d.jenis === "CC") {
        kadeMap[d.kade].cc_total += d.total;
        kadeMap[d.kade].cc_dn += d.ton_dn;
        kadeMap[d.kade].cc_ln += d.ton_ln;
      } else {
        kadeMap[d.kade].ck_total += d.total;
        kadeMap[d.kade].ck_dn += d.ton_dn;
        kadeMap[d.kade].ck_ln += d.ton_ln;
      }
    });

    return Object.values(kadeMap).sort(
      (a, b) => b.cc_total + b.ck_total - (a.cc_total + a.ck_total)
    );
  }, [processedData]);

  // Summary statistics
  const summary = useMemo(() => {
    const totalCC = processedData
      .filter((d) => d.jenis === "CC")
      .reduce((sum, d) => sum + d.total, 0);
    const totalCK = processedData
      .filter((d) => d.jenis === "CK")
      .reduce((sum, d) => sum + d.total, 0);
    const totalDN = processedData.reduce((sum, d) => sum + d.ton_dn, 0);
    const totalLN = processedData.reduce((sum, d) => sum + d.ton_ln, 0);

    return {
      totalCC,
      totalCK,
      totalDN,
      totalLN,
      totalProduksi: totalCC + totalCK,
      percentageCC: ((totalCC / (totalCC + totalCK)) * 100).toFixed(1),
      percentageCK: ((totalCK / (totalCC + totalCK)) * 100).toFixed(1),
      percentageDN: ((totalDN / (totalDN + totalLN)) * 100).toFixed(1),
      percentageLN: ((totalLN / (totalDN + totalLN)) * 100).toFixed(1),
    };
  }, [processedData]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  const pieData = [
    {
      name: "Curah Cair Domestik",
      value: processedData
        .filter((d) => d.jenis === "CC")
        .reduce((sum, d) => sum + d.ton_dn, 0),
    },
    {
      name: "Curah Cair Luar Negeri",
      value: processedData
        .filter((d) => d.jenis === "CC")
        .reduce((sum, d) => sum + d.ton_ln, 0),
    },
    {
      name: "Curah Kering Domestik",
      value: processedData
        .filter((d) => d.jenis === "CK")
        .reduce((sum, d) => sum + d.ton_dn, 0),
    },
    {
      name: "Curah Kering Luar Negeri",
      value: processedData
        .filter((d) => d.jenis === "CK")
        .reduce((sum, d) => sum + d.ton_ln, 0),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Dashboard Produksi CC dan CK di Branch Palembang Tahun 2024
        </h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === "overview"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab("trends")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === "trends"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tren Bulanan
          </button>
          <button
            onClick={() => setSelectedTab("kade")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === "kade"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Data per KADE
          </button>
        </div>

        {selectedTab === "overview" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Produksi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {summary.totalProduksi.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Ton</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Curah Cair (CC)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {summary.totalCC.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.percentageCC}% dari total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Curah Kering (CK)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {summary.totalCK.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.percentageCK}% dari total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Rasio DN vs LN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">
                    {summary.percentageDN}% : {summary.percentageLN}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Domestik : Luar Negeri
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Distribution Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Produksi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name.split(" ")[0]} ${name.split(" ")[1]} ${(
                            percent * 100
                          ).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [value.toLocaleString(), "Ton"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 KADE Terbaik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kadeData.slice(0, 5).map((kade, index) => (
                      <div
                        key={kade.kade}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                ? "bg-orange-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {kade.kade}
                            </p>
                            <p className="text-sm text-gray-500">
                              Curah Cair: {kade.cc_total.toLocaleString()} |
                              Curah Kering: {kade.ck_total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            {(kade.cc_total + kade.ck_total).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Ton</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {selectedTab === "trends" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Tren Produksi Bulanan - Curah Cair vs Curah Kering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Ton"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Total CC"
                      stroke="#2563eb"
                      strokeWidth={3}
                      name="Total Curah Cair"
                    />
                    <Line
                      type="monotone"
                      dataKey="Total CK"
                      stroke="#16a34a"
                      strokeWidth={3}
                      name="Total Curah Kering"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Perbandingan Domestik vs Luar Negeri per Bulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Ton"]}
                    />
                    <Legend />
                    <Bar
                      dataKey="CC Domestik"
                      stackId="cc"
                      fill="#2563eb"
                      name="Curah Cair Domestik"
                    />
                    <Bar
                      dataKey="CC Luar Negeri"
                      stackId="cc"
                      fill="#3b82f6"
                      name="Curah Cair Luar Negeri"
                    />
                    <Bar
                      dataKey="CK Domestik"
                      stackId="ck"
                      fill="#16a34a"
                      name="Curah Kering Domestik"
                    />
                    <Bar
                      dataKey="CK Luar Negeri"
                      stackId="ck"
                      fill="#22c55e"
                      name="Curah Kering Luar Negeri"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "kade" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detail Produksi per KADE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          KADE
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CC Domestik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CC Luar Negeri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CK Domestik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CK Luar Negeri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {kadeData.map((kade) => (
                        <tr key={kade.kade} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {kade.kade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kade.cc_dn.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kade.cc_ln.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kade.ck_dn.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kade.ck_ln.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {(kade.cc_total + kade.ck_total).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
