import { ProjectionData } from "./types";  // adjust path if needed

export const projections: ProjectionData = {
  projections: [
    {
      indicator_key: "co2_emissions",
      name: "CO2 Emissionen",
      category: "Naturverbrauch_",
      source: "Our World in Data",
      strategy: "Halte Emission konstant. Kein Umbau Richtung carbon free. Nimmt Hitze und Umweltzerstörung in Kauf.",
      alternative: ["Reduziere CO2 Emissionen moderat.",[-0.1,-0.1,-0.1]],
      paths: {
        unit: "Gt",
        data: {
          1980: { rate: null, trend: null, value: 1100 },
          1995: { rate: null, trend: null, value: 1488.9 },
          2010: { rate: null, trend: null, value: 2011.1 },
          2025: { rate: 40, trend: 0, value: 2599.9 },
          2040: { rate: null, trend: 0, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    // global average temp in C above pre-industrial
    {
      indicator_key: "global_temp",
      name: "Globale Durchschnittstemperatur",
      category: "Naturverbrauch_",
      source: "NASA GISS",
      strategy: "Folgt der CO2 Entwicklung.",
      paths: {
        unit: "°C above pre-industrial",
        data: {
          1980: { rate: null, trend: null, value: 0.27 },
          1995: { rate: null, trend: null, value: 0.44 },
          2010: { rate: null, trend: null, value: 0.73 },
          2025: { rate: 0.02, trend: 0.0007, value: 1.28 },
          2040: { rate: null, trend: 0.00125, value: null },
          2055: { rate: null, trend: 0.0015, value: null },
        },
      },
    },
    // mining waste in Gt (gigaton = billion tons)
    {
      indicator_key: "mining_waste_dump",
      name: "Minenabraum",
      category: "Naturverbrauch_",
      source: "Earthworks",
      strategy: "Reduziere beschleunigten Abbau von Mineralien moderat. Zunahme wird verringert.",
      paths: {
        unit: "Gt",
        data: {
          1980: { rate: null, trend: null, value: 700 },
          1995: { rate: null, trend: null, value: 900.1 },
          2010: { rate: null, trend: null, value: 1400.2 },
          2025: { rate: 100, trend: 4, value: 2500.3 },
          2040: { rate: null, trend: 3, value: null },
          2055: { rate: null, trend: 2, value: null },
        },
      },
    },
    {
      indicator_key: "forests_area",
      name: "Wälder",
      category: "Naturverbrauch_",
      source: "FAO",
      strategy: "Reduziere Abholzungsrate moderat.",
      paths: {
        unit: "000 km²",
        data: {
          1980: { rate: null, trend: null, value: 43000 },
          1995: { rate: null, trend: null, value: 42384.2 },
          2010: { rate: null, trend: null, value: 41729.9 },
          2025: { rate: -52, trend: -0.5, value: 41000 },
          2040: { rate: null, trend: -0.5, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "soils_area",
      name: "Böden & Acker",
      category: "Naturverbrauch_",
      source: "FAO",
      strategy: "Reduziere Bodenerosion moderat.",
      paths: {
        unit: "000 km²",
        data: {
          1980: { rate: null, trend: null, value: 49000 },
          1995: { rate: null, trend: null, value: 48796.8 },
          2010: { rate: null, trend: null, value: 48452.3 },
          2025: { rate: -33, trend: -0.327, value: 48000 },
          2040: { rate: null, trend: -0.333, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "unemployment_rate",
      name: "Arbeitslosenquote",
      category: "Menschheit",
      source: "World Bank",
      strategy: "Arbeitslosenquote folgt der wirtschaftlichen Entwicklung (GDP). Keine aktiven Maßnahmen.",
      paths: {
        unit: "%",
        data: {
          1980: { rate: null, trend: null, value: 6.5 },
          1995: { rate: null, trend: null, value: 6.2 },
          2010: { rate: null, trend: null, value: 6.2 },
          2025: { rate: -0.1, trend: 0.008, value: 5 },
          2040: { rate: null, trend: 0, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "avg_country_gini",
      name: "Durchschnittliche Länderungleichheit, 100 = max inequality",
      category: "Menschheit",
      source: "World Bank",
      strategy: "Durchschnittliche Länderungleichheit folgt der wirtschaftlichen Entwicklung (GDP). Keine aktiven Maßnahmen.",
      paths: {
        unit: "index",
        data: {
          1980: { rate: null, trend: null, value: 35 },
          1995: { rate: null, trend: null, value: 38 },
          2010: { rate: null, trend: null, value: 39 },
          2025: { rate: 0, trend: 0.007, value: 39.5 },
          2040: { rate: null, trend: 0, value: null },
          2055: { rate: null, trend: 0.008, value: null },
        },
      },
    },
    {
      indicator_key: "happiness_index",
      name: "Glücksindex, 10 = max happiness",
      category: "Menschheit",
      source: "World Happiness Report",
      strategy: "Glücksindex folgt dem Gleichheitsindex und der Arbeitslosenquote. Keine aktiven Maßnahmen.",
      paths: {
        unit: "index",
        data: {
          1980: { rate: null, trend: null, value: 5.5 },
          1995: { rate: null, trend: null, value: 5.3 },
          2010: { rate: null, trend: null, value: 5.4 },
          2025: { rate: -0.005, trend: 0.000, value: 5.7 },
          2040: { rate: null, trend: -0.002, value: null },
          2055: { rate: null, trend: -0.003, value: null },
        },
      },
    },
    {
      indicator_key: "life_expectancy",
      name: "Lebenserwartung",
      category: "Menschheit",
      source: "World Bank",
      strategy: "Erwartete Lebenserwartung folgt der Arbeitslosenquote, Zustand der Natur und Erderwärmung. Aktive Maßnahmen erst ab 2040. Massive Investition in Kühlungstechnologien.",
      paths: {
        unit: "years",
        data: {
          1980: { rate: null, trend: null, value: 62 },
          1995: { rate: null, trend: null, value: 66 },
          2010: { rate: null, trend: null, value: 70.5 },
          2025: { rate: 0.02, trend: -0.007, value: 73.6 },
          2040: { rate: null, trend: -0.015, value: null },
          2055: { rate: null, trend: -0.025, value: null },
        },
      },
    },
    {
      indicator_key: "gdp_per_cap",
      name: "GDP per Capita (PPP)",
      category: "Wirtschaft",
      source: "World Bank",
      strategy: "Wirtschaftswachstum folgt der Dynamik des Marktes. Massnahmen flankieren den Prozess zur Sicherung eines Wachstums.",
      paths: {
        unit: "k USD",
        data: {
          1980: { rate: null, trend: null, value: 6.5 },
          1995: { rate: null, trend: null, value: 9 },
          2010: { rate: null, trend: null, value: 14.5 },
          2025: { rate: 0.5, trend: -0.013, value: 19.6 },
          2040: { rate: null, trend: -0.011, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "debt_per_cap",
      name: "Global Debt per Capita",
      category: "Wirtschaft",
      source: "Institute of International Finance",
      strategy: "Globale Verschuldung folgt der wirtschaftlichen Entwicklung (GDP) und aktuelle Krisen. Keine langfristig ausgerichtete Maßnahmen.",
      paths: {
        unit: "k USD per person",
        data: {
          1980: { rate: null, trend: null, value: 5 },
          1995: { rate: null, trend: null, value: 12 },
          2010: { rate: null, trend: null, value: 22 },
          2025: { rate: 0.6, trend: -0.017, value: 32.7 },
          2040: { rate: null, trend: -0.001, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "disp_income_per_cap",
      name: "Global Disposable Income per Capita",
      category: "Wirtschaft",
      source: "Institute of International Finance",
      strategy: "Globale verfügbare Einkommen folgt den Mechanismen des Marktes. Wächst schwächer als das GDP. Hitze und Umweltverschlechterung haben ab 2040 einen negativen Einfluss.",
      paths: {
        unit: "k USD per person",
        data: {
          1980: { rate: null, trend: null, value: 7.5 },
          1995: { rate: null, trend: null, value: 9.4 },
          2010: { rate: null, trend: null, value: 13 },
          2025: { rate: 0.3, trend: -0.013, value: 15.5 },
          2040: { rate: null, trend: -0.009, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },
    {
      indicator_key: "wealth_per_cap",
      name: "Global Wealth per Capita",
      category: "Wirtschaft",
      source: "Credit Suisse",
      strategy: "Wohlstandsteigerung hauptsächlich durch kapitalintensive opportunistische private Investitionen. Keine aktiven Maßnahmen.",
      paths: {
        unit: "k USD per person",
        data: {
          1980: { rate: null, trend: null, value: 10 },
          1995: { rate: null, trend: null, value: 15 },
          2010: { rate: null, trend: null, value: 35 },
          2025: { rate: 0.5, trend: 0.02, value: 58 },
          2040: { rate: null, trend: 0.013, value: null },
          2055: { rate: null, trend: 0, value: null },
        },
      },
    },



    {
      indicator_key: "top_1_percent_eff_tax_rate",
      name: "Top 1% Effective Tax Rate",
      category: "Wirtschaft",
      source: "ChatGPT",
      strategy: "Steuerprivilegien für die obersten 1% bleiben bestehen, werden aber nicht ausgedehnt.",
      paths: {
        unit: "% of income",
        data: {
          1980: { rate: null, trend: null, value: 15 },
          1995: { rate: null, trend: null, value: 13 },
          2010: { rate: null, trend: null, value: 9 },
          2025: { rate: 0.0,  trend: 0.0, value: 5 },
          2040: { rate: null, trend: 0.0, value: null },
          2055: { rate: null, trend: 0.0, value: null },
        },
      },
    },
    {
      indicator_key: "population",
      name: "Global Population",
      category: "Menschheit",
      source: "UN DESA",
      strategy: "Bevölkerungswachstum folgt den UN DESA Projektionen. Zunehmende Urbanisierung und Bildung führt zu einem Abflachen.",
      paths: {
        unit: "G people",
        data: {
          1980: { rate: null, trend: null, value: 4.45 },
          1995: { rate: null, trend: null, value: 5.73 },
          2010: { rate: null, trend: null, value: 6.92 },
          2025: { rate: 0.06, trend: -0.002, value: 8.14 },
          2040: { rate: null, trend: -0.002, value: null },
          2055: { rate: null, trend: -0.002, value: null },
        },
      },
    },
    {
      indicator_key: "reaction_per_cap",
      name: "Global Reaction Fund per Capita",
      category: "Wirtschaft",
      source: "UN Environment Programme",
      strategy: "Reaktionsfonds für Klimaanpassung und Katastrophenhilfe wird moderat erhöht, um auf zunehmende Umweltkrisen zu reagieren. Ab 2040 massive Erhöhung in Kühlungs- und Katastrophenbewältigungstechnologien um Landstriche über 29°C bewohnbar zu halten.",
      paths: {
        unit: "USD per person per year",
        data: {
          1980: { rate: null, trend: null, value: 2 },
          1995: { rate: null, trend: null, value: 5 },
          2010: { rate: null, trend: null, value: 12 },
          2025: { rate: 0.5, trend: 0.1, value: 19 },
          2040: { rate: null, trend: 0.5, value: null },
          2055: { rate: null, trend: 0.5, value: null },
        },
      },
    },
  ],
};


