import { min } from "lodash";
import { InterventionData } from "./types";

export const interventions: InterventionData = {
  co2_emissions: [
      { // default option
            description: "Halte Emission konstant. Kein Umbau Richtung carbon free. Nimmt Hitze und Umweltzerstörung in Kauf.",
            impacts: {} // delta to default projection
      },
      { // aggressive reduction
            description: "Aggressive Reduktion der Emissionen. Sofortige Maßnahmen zur Reduzierung der CO2-Emissionen.",
            impacts: {
            co2_emissions:              { 2025: -0.5   , 2040: -1.0   , 2055: -1.5    , unit: "Gt" },
            global_temp:                { 2025: -0.0003, 2040: -0.0006, 2055: -0.001  , unit: "°C above pre-industrial" },
            // mining_waste_dump:          { 2025: -0.1   , 2040: -0.2   , 2055: -0.3    , unit: "Gt" },
            // unemployment_rate:          { 2025:  0.02  , 2040:  0.03  , 2055:  0.04   , unit: "%" },
            // forests_area:               { 2025:  0.1   , 2040:  0.2   , 2055:  0.3    , unit: "000 km²" },
            // soils_area:                 { 2025:  0.05  , 2040:  0.1   , 2055:  0.15   , unit: "000 km²" },
            // gdp_per_cap:                { 2025: -0.01  , 2040: -0.015 , 2055: -0.02   , unit: "k USD" },
            // debt_per_cap:               { 2025:  0.02  , 2040:  0.03  , 2055:  0.04   , unit: "k USD per person" },
            // disp_income_per_cap:        { 2025: -0.01  , 2040: -0.015 , 2055: -0.02   , unit: "k USD per person" },
            // wealth_per_cap:             { 2025: -0.01  , 2040: -0.015 , 2055: -0.02   , unit: "k USD per person" },
            // top_1_percent_eff_tax_rate: { 2025:  0.01  , 2040:  0.015 , 2055:  0.02   , unit: "% of income" },
            // avg_country_gini:           { 2025: -0.01  , 2040: -0.015 , 2055: -0.02   , unit: "index" },
            // happiness_index:            { 2025:  0.01  , 2040:  0.015 , 2055:  0.02   , unit: "index" },
            // life_expectancy:            { 2025:  0.005 , 2040:  0.01  , 2055:  0.015  , unit: "years" },
            // population:                 { 2025: -0.001 , 2040: -0.002 , 2055: -0.003  , unit: "G people" },
            reaction_per_cap:           { 2025:  0.05  , 2040:  0.1   , 2055:  0.15   , unit: "USD per person per year" }
            }
      }
  ],
  mining_waste_dump: [
    { // default option
      description: "Reduziere beschleunigten Abbau von Mineralien moderat. Zunahme wird verringert.",
      impacts: {}
    },
      { // strong reduction
      description: "Starke Reduktion des Erzabbaus. Strenge Regulierungen und Förderung von Recycling.",
      impacts: {
        mining_waste_dump:          { 2025: -4  , 2040: -4  , 2055: -4   , unit: "Gt" },
        // forests_area:               { 2025:  0.1  , 2040:  0.2  , 2055:  0.3   , unit: "000 km²" },
        // soils_area:                 { 2025:  0.05 , 2040:  0.1  , 2055:  0.15  , unit: "000 km²" },
        unemployment_rate:          { 2025:  0.02 , 2040:  -0.08 , 2055:  -0.08  , unit: "%" },
        // gdp_per_cap:                { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD" },
        // debt_per_cap:               { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD per person" },
        // disp_income_per_cap:        { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        // wealth_per_cap:             { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        // top_1_percent_eff_tax_rate: { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "% of income" },
        // avg_country_gini:           { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        // happiness_index:            { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        // life_expectancy:            { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        reaction_per_cap:           { 2025:  0.02 , 2040:  0.04 , 2055:  0.06  , unit: "USD per person per year" }
       }
    }
  ],
  forests_area: [
    { // default option
      description: "Folge dem Erzabbau und Ausbau regenerativer Energien. Keine aktiven Maßnahmen.",
      impacts: { 

      }
    },
    { // aggressive reforestation
      description: "Aggressive Wiederaufforstung und Schutz bestehender Wälder. Massive Investitionen in Aufforstungsprojekte weltweit.",
      impacts: {
        forests_area:       { 2025:  0.6  , 2040:  0.8  , 2055:  1.0   , unit: "000 km²" },
        co2_emissions:      { 2025: -0.2  , 2040: -0.4  , 2055: -0.6   , unit: "Gt" },
        global_temp:        { 2025: -0.0001, 2040: -0.0002, 2055: -0.0003, unit: "°C above pre-industrial" },
        mining_waste_dump:  { 2025: -0.1  , 2040: -0.2  , 2055: -0.3   , unit: "Gt" },
        soils_area:         { 2025:  0.1  , 2040:  0.2  , 2055:  0.3   , unit: "000 km²" },
        unemployment_rate:  { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "%" },
        gdp_per_cap:        { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD" },
        debt_per_cap:       { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD per person" },
        disp_income_per_cap:{ 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        wealth_per_cap:     { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        top_1_percent_eff_tax_rate:{ 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "% of income" },
        avg_country_gini:   { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        happiness_index:    { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        life_expectancy:    { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" }
      }
    }
  ],
  soils_area: [
    { // default option
      description: "Folge dem Erzabbau und Ausbau regenerativer Energien. Keine aktiven Maßnahmen.",
      impacts: { 

      }
    }
  ],
  unemployment_rate: [
    { // default option
      description: "Arbeitslosenquote folgt den anderen Indikatoren. Keine aktiven Maßnahmen.",
      impacts: {}
    },
    { // job resilience program
      description: "Erhohe Resilienz des Arbeitsmarktes gegenüber transformativen Veränderungen durch Ausstieg aus der Verwendung fossiler Energien und Einstieg in Recycling.",
      impacts: {
        unemployment_rate:   { 2025: -0.01 , 2040: -0.02 , 2055: -0.03 , unit: "%" },
        happiness_index:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        disp_income_per_cap: { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" },
        wealth_per_cap:      { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        avg_country_gini:    { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        life_expectancy:     { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        gdp_per_cap:         { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD" },
        reaction_per_cap:    { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "USD per person per year"
      }
      }
  ],
  avg_country_gini: [
    { // default option§
      description: "Durchschnittliche Länderungleichheit folgt der wirtschaftlichen Entwicklung (GDP). Keine aktiven Maßnahmen.",
      impacts: {}
    },        
    {   
      description: "Einführung eines Malus-Systems anstatt eines Rabatt-Systems für umweltschädlichen Konsum. Förderung nachhaltiger Produkte.",
      impacts: {
        co2_emissions:              { 2025: -0.2  , 2040: -0.4  , 2055: -0.6   , unit: "Gt" },
        happiness_index:            { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        unemployment_rate:          { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "%" },
        gdp_per_cap:                { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD" },
        debt_per_cap:               { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD per person" },
        disp_income_per_cap:        { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        wealth_per_cap:             { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        top_1_percent_eff_tax_rate: { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "% of income" },
        avg_country_gini:           { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        life_expectancy:            { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" }
      }
    }
  ],
  happiness_index: [
    { // default option
      description: "Glücksindex folgt dem Gleichheitsindex und der Arbeitslosenquote. Keine aktiven Maßnahmen.",
      impacts: {}
    },
  {
      description: "Investitionen in Gestaltungsmöglichkeiten für auch die ärmeren Bevölkerungsschichten. Eigenanbau, Werkstätten, Bildung. Versuch einer Entkopplung des Glücksempfindens vom materiellen Erfolg und Konsum.",
      impacts: {
        happiness_index:     { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "index" },
        unemployment_rate:   { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "%" },
        avg_country_gini:    { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        life_expectancy:     { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        disp_income_per_cap: { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" },
        wealth_per_cap:      { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" },
        gdp_per_cap:         { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD" },
        debt_per_cap:        { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD per person" }
      }
    }
  ],
  life_expectancy: [
    { // default option
      description: "Erwartete Lebenserwartung folgt den Trends der anderen Indikatoren. Aktive Maßnahmen erst ab 2040. Massive Investition in Kühlungstechnologien.",
      impacts: {}
    },
    { // health investment
      description: "Frühzeitige Investitionen in Gesundheitsinfrastruktur und Prävention. Verbesserung der allgemeinen Gesundheitsversorgung.",
      impacts: {
        life_expectancy:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "years" },
        happiness_index:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        unemployment_rate:   { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "%" },
        avg_country_gini:    { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" },
        disp_income_per_cap: { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "k USD per person" },
        wealth_per_cap:      { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "k USD per person" },
        gdp_per_cap:         { 2025: -0.002, 2040: -0.004, 2055: -0.006 , unit: "k USD" },
        debt_per_cap:        { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" }
      }
    } 
  ],
  gdp_per_cap: [
    { // default option
      description: "Wirtschaftswachstum folgt der Dynamik des Marktes. Massnahmen flankieren den Prozess zur Sicherung eines Wachstums.",
      impacts: {}
    },
    { // Investitionsentscheidungen werden nicht von Kapitalbesitzern getroffen
      description: "Investitionsentscheidungen werden werden weniger von Kapitalbesitzern getroffen sondern mehr von der Gesellschaft als Ganzes.",
      impacts: {}
    }
  ],
  debt_per_cap: [
    { // default option
      description: "Globale Verschuldung folgt der wirtschaftlichen Entwicklung (GDP) und aktuelle Krisen. Keine langfristig ausgerichtete Maßnahmen.",
      impacts: {}
    },
    { // debt forgiveness
      description: "Schuldenvergebung für ärmere Länder zur Förderung nachhaltiger Entwicklung und Armutsbekämpfung.",
      impacts: {
        debt_per_cap:        { 2025: -0.02 , 2040: -0.03 , 2055: -0.04  , unit: "k USD per person" },
        gdp_per_cap:         { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD" },
        disp_income_per_cap: { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" },
        wealth_per_cap:      { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD per person" },
        happiness_index:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        life_expectancy:     { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        unemployment_rate:   { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "%" },
        avg_country_gini:    { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "index" }
      }
    }
  ],
  disp_income_per_cap: [
    { // default option
      description: "Globale verfügbare Einkommen folgt den Mechanismen des Marktes. Keine aktiven Massnahmen.",
      impacts: {}
    },
    { // Kaufkraft steigern durch ermöglichung von Eigenleistung in Kooperativen
      description: "Kaufkraft der ärmeren Bevölkerungsschichten wird durch Förderung von Genossenschaften und Eigenleistung gesteigert.",
      impacts: {
        disp_income_per_cap: { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "k USD per person" },
        happiness_index:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        unemployment_rate:   { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "%" },
        avg_country_gini:    { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "index" },
        life_expectancy:     { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        gdp_per_cap:         { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "k USD" },
        debt_per_cap:        { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "k USD per person" }
      }
    }
  ],
  wealth_per_cap: [
    { // default option
      description: "Wohlstandsteigerung hauptsächlich durch kapitalintensive opportunistische private Investitionen. Keine aktiven Maßnahmen.",
      impacts: {}
    },
    { // wealth redistribution
      description: "Lokale Konkurrenz um die optimale nachhaltige Produktion wird durch gezielte Fördermaßnahmen gestärkt, und vor globaler Konkurrenz geschützt.",
      impacts: {
        wealth_per_cap:      { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "k USD per person" },
        avg_country_gini:    { 2025: -0.02 , 2040: -0.03 , 2055: -0.04  , unit: "index" },
        happiness_index:     { 2025:  0.01 , 2040:  0.015, 2055:  0.02  , unit: "index" },
        life_expectancy:     { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "years" },
        disp_income_per_cap: { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        gdp_per_cap:         { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "k USD" },
        debt_per_cap:        { 2025:  0.02 , 2040:  0.03 , 2055:  0.04  , unit: "k USD per person" },
        unemployment_rate:   { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "%" }
      }
    }
  ],
  top_1_percent_eff_tax_rate: [
    { // default option
      description: "Steuerprivilegien für die obersten 1% bleiben bestehen, werden aber nicht ausgedehnt.",
      impacts: {}
    },
    { // wealth tax
      description: "Einführung einer Vermögenssteuer für die obersten 1%, um Ungleichheit zu verringern und den Umbau zu finanzieren.",
      impacts: {
        top_1_percent_eff_tax_rate: { 2025:  0.01 , 2040:  0.015, 2055:  0.02  , unit: "% of income" },
        avg_country_gini:           { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "index" },
        happiness_index:            { 2025:  0.005, 2040:  0.01 , 2055:  0.015 , unit: "index" },
        life_expectancy:            { 2025:  0.002, 2040:  0.004, 2055:  0.006 , unit: "years" },
        disp_income_per_cap:        { 2025: -0.005, 2040: -0.01 , 2055: -0.015 , unit: "k USD per person" },
        wealth_per_cap:             { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "k USD per person" },
        gdp_per_cap:                { 2025: -0.01 , 2040: -0.015, 2055: -0.02  , unit: "k USD" },
        debt_per_cap:               { 2025:  0.02 , 2040:  0.03 , 2055:  0.04  , unit: "k USD per person" },
        unemployment_rate:          { 2025:  0.01 , 2040:  0.02 , 2055:  0.03  , unit: "%" }
      }
    }
  ],
  population: [
    { // default option
      description: "Bevölkerungswachstum folgt den UN DESA Projektionen. Keine aktiven Maßnahmen.",
      impacts: {}
    }
  ],
  reaction_per_cap: [
    { // default option
      description: "Summe der Investitionen für die oben genannten Maßnahmen.",
      impacts: {}
    }
  ]
};