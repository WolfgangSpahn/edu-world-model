import { ProjectionData } from "./types";  // adjust path if needed

export const projections: ProjectionData = {
  projections: [
    {
      indicator_key: "co2_emissions",
      name: "CO2 Emissionen",
      paths: {
        unit: "Gt",
        data: {
          1980: { rate: 20, trend: 0.74, value: 1100 },
          1995: { rate: 31.1, trend: 0.447, value: 1488.9 },
          2010: { rate: 37.8, trend: 0.147, value: 2011.1 },
          2025: { rate: 40, trend: 0, value: 2599.9 },
          2040: { rate: 40, trend: 0, value: 3199.9 },
          2055: { rate: 40, trend: 0, value: 3799.9 },
        },
      },
    },
    {
      indicator_key: "mining_waste_dump",
      name: "Minenabraum",
      paths: {
        unit: "Gt",
        data: {
          1980: { rate: 10, trend: 0.667, value: 700 },
          1995: { rate: 20, trend: 2, value: 900.1 },
          2010: { rate: 50, trend: 3.333, value: 1400.2 },
          2025: { rate: 100, trend: 4, value: 2500.3 },
          2040: { rate: 160, trend: 4, value: 4480.3 },
          2055: { rate: 220, trend: 0, value: 7360.3 },
        },
      },
    },
    {
      indicator_key: "forests_area",
      name: "Wälder",
      paths: {
        unit: "000 km²",
        data: {
          1980: { rate: -40.6, trend: -0.087, value: 43000 },
          1995: { rate: -41.9, trend: -0.253, value: 42384.2 },
          2010: { rate: -45.7, trend: -0.42, value: 41729.9 },
          2025: { rate: -52, trend: -0.5, value: 41000 },
          2040: { rate: -59.5, trend: -0.5, value: 40160 },
          2055: { rate: -67, trend: 0, value: 39207.5 },
        },
      },
    },
    {
      indicator_key: "soils_area",
      name: "Böden & Acker",
      paths: {
        unit: "000 km²",
        data: {
          1980: { rate: -8.1, trend: -0.7, value: 49000 },
          1995: { rate: -18.6, trend: -0.553, value: 48796.8 },
          2010: { rate: -26.9, trend: -0.407, value: 48452.3 },
          2025: { rate: -33, trend: -0.327, value: 48000 },
          2040: { rate: -37.9, trend: -0.333, value: 47465.4 },
          2055: { rate: -42.9, trend: 0, value: 46856.6 },
        },
      },
    },
    {
      indicator_key: "unemployment_rate",
      name: "Unemployment Rate",
      paths: {
        unit: "%",
        data: {
          1980: { rate: 0, trend: 0, value: 6.5 },
          1995: { rate: 0, trend: 0, value: 6.2 },
          2010: { rate: 0, trend: -0.007, value: 6.2 },
          2025: { rate: -0.1, trend: 0.008, value: 5 },
          2040: { rate: 0.02, trend: 0, value: 5.3 },
          2055: { rate: 0.02, trend: 0, value: 5.6 },
        },
      },
    },
    {
      indicator_key: "avg_country_gini",
      name: "Average Country Inequality (Mean National Gini Index), 100 = max inequality",
      paths: {
        unit: "index (0-100)",
        data: {
          1980: { rate: 0.2, trend: 0, value: 35 },
          1995: { rate: 0.2, trend: -0.013, value: 38 },
          2010: { rate: 0, trend: 0, value: 39 },
          2025: { rate: 0, trend: 0.007, value: 39.5 },
          2040: { rate: 0.1, trend: 0, value: 40.5 },
          2055: { rate: 0.1, trend: 0, value: 41.5 },
        },
      },
    },
    {
      indicator_key: "happiness_index",
      name: "Happiness Index",
      paths: {
        unit: "index (0-10)",
        data: {
          1980: { rate: 0, trend: -0.001, value: 5.5 },
          1995: { rate: -0.01, trend: 0.001, value: 5.3 },
          2010: { rate: 0.01, trend: -0.001, value: 5.4 },
          2025: { rate: 0, trend: -0.001, value: 5.7 },
          2040: { rate: -0.01, trend: 0, value: 5.6 },
          2055: { rate: -0.01, trend: 0, value: 5.5 },
        },
      },
    },
    {
      indicator_key: "life_expectancy",
      name: "Life Expectancy at Birth",
      paths: {
        unit: "years",
        data: {
          1980: { rate: 0.02, trend: 0.003, value: 62 },
          1995: { rate: 0.025, trend: 0.003, value: 66 },
          2010: { rate: 0.03, trend: -0.007, value: 70.5 },
          2025: { rate: 0.02, trend: -0.007, value: 73.6 },
          2040: { rate: 0.01, trend: -0.005, value: 75 },
          2055: { rate: 0.02, trend: 0, value: 75.2 },
        },
      },
    },
    {
      indicator_key: "gdp_per_cap",
      name: "GDP per Capita (PPP)",
      paths: {
        unit: "k USD",
        data: {
          1980: { rate: 0.2, trend: -0.002, value: 6.5 },
          1995: { rate: 0.17, trend: 0.013, value: 9 },
          2010: { rate: 0.37, trend: 0.009, value: 14.5 },
          2025: { rate: 0.5, trend: -0.013, value: 19.6 },
          2040: { rate: 0.3, trend: -0.011, value: 24 },
          2055: { rate: 0.13, trend: 0, value: 26 },
        },
      },
    },
    {
      indicator_key: "debt_per_cap",
      name: "Global Debt per Capita",
      paths: {
        unit: "k USD per person",
        data: {
          1980: { rate: 0.2, trend: 0.018, value: 5 },
          1995: { rate: 0.47, trend: 0.013, value: 12 },
          2010: { rate: 0.67, trend: -0.005, value: 22 },
          2025: { rate: 0.6, trend: -0.017, value: 32.7 },
          2040: { rate: 0.35, trend: -0.001, value: 38 },
          2055: { rate: 0.33, trend: 0, value: 43 },
        },
      },
    },
    {
      indicator_key: "wealth_per_cap",
      name: "Global Wealth per Capita",
      paths: {
        unit: "k USD per person",
        data: {
          1980: { rate: 0.25, trend: 0.005, value: 10 },
          1995: { rate: 0.33, trend: 0.067, value: 15 },
          2010: { rate: 1.33, trend: -0.055, value: 35 },
          2025: { rate: 0.5, trend: 0.02, value: 58 },
          2040: { rate: 0.8, trend: 0.013, value: 70 },
          2055: { rate: 1, trend: 0, value: 85 },
        },
      },
    },
    {
      indicator_key: "population",
      name: "Global Population",
      paths: {
        unit: "G people",
        data: {
          1980: { rate: 0.09, trend: -0.001, value: 4.45 },
          1995: { rate: 0.08, trend: -0.001, value: 5.73 },
          2010: { rate: 0.07, trend: -0.001, value: 6.92 },
          2025: { rate: 0.06, trend: 0.002, value: 8.14 },
          2040: { rate: 0.09, trend: -0.003, value: 9.5 },
          2055: { rate: 0.04, trend: 0, value: 10.1 },
        },
      },
    },
    {
      indicator_key: "reaction_per_cap",
      name: "Global Reaction Fund per Capita (UNO → GRA)",
      paths: {
        unit: "USD per person per year",
        data: {
          1980: { rate: 0.2, trend: 0.0, value: 2 },
          1995: { rate: 0.3, trend: 0.0, value: 5 },
          2010: { rate: 0.5, trend: 0.0, value: 12 },
          2025: { rate: 0.5, trend: 0.1, value: 19 },
          2040: { rate: 13, trend: 0.5, value: 211 },
          2055: { rate: 14, trend: 0.5, value: 421 }, // 1.5% of GDP
        },
      },
    },
  ],
};


