#!/usr/bin/env python3
import yaml
import re

def convert_to_dense_format(file_path: str) -> None:
    """Convert YAML from verbose to compact dense format."""
    
    # Read the current file
    with open(file_path, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)
    
    # Convert back to YAML with proper formatting
    yaml_output = yaml.dump(data, default_flow_style=False, indent=2, sort_keys=False, allow_unicode=True)
    
    # Post-process to create compact format for year data
    def format_compact_year(match):
        year = match.group(1)
        rate_str = match.group(2).strip()
        trend_str = match.group(3).strip()
        value_str = match.group(4).strip()
        
        try:
            rate = float(rate_str)
            trend = float(trend_str)
            value = float(value_str)
        except ValueError:
            return match.group(0)  # Return original if parsing fails
        
        # Format numbers with proper + signs and clean formatting
        def format_num(num):
            if num == 0:
                return "0"
            elif num == int(num):  # Remove .0 for whole numbers
                if num > 0:
                    return f"+{int(num)}"
                else:
                    return f"{int(num)}"
            else:
                # Keep decimals, add + for positive
                if num > 0:
                    return f"+{num:g}"
                else:
                    return f"{num:g}"
        
        return f"      {year}: {{ rate: {format_num(rate)}, trend: {format_num(trend)}, value: {format_num(value)} }}"
    
    # Replace the expanded YAML format with compact format
    # Match the verbose YAML structure with quotes around years
    pattern = r"      '(\d{4})':\s*\n        rate:\s*([+-]?\d+(?:\.\d+)?)\s*\n        trend:\s*([+-]?\d+(?:\.\d+)?)\s*\n        value:\s*([+-]?\d+(?:\.\d+)?)"
    yaml_output = re.sub(pattern, format_compact_year, yaml_output)
    
    # Also handle unquoted years
    pattern2 = r"      (\d{4}):\s*\n        rate:\s*([+-]?\d+(?:\.\d+)?)\s*\n        trend:\s*([+-]?\d+(?:\.\d+)?)\s*\n        value:\s*([+-]?\d+(?:\.\d+)?)"
    yaml_output = re.sub(pattern2, format_compact_year, yaml_output)
    
    # Clean up any remaining quotes around unit names
    yaml_output = yaml_output.replace("unit: 'Gt'", 'unit: "Gt"')
    yaml_output = yaml_output.replace("unit: '000 km²'", 'unit: "000 km²"')
    yaml_output = yaml_output.replace("unit: '%'", 'unit: "%"')
    yaml_output = yaml_output.replace("unit: 'index (0-100)'", 'unit: "index (0-100)"')
    yaml_output = yaml_output.replace("unit: 'index (0-10)'", 'unit: "index (0-10)"')
    yaml_output = yaml_output.replace("unit: 'years'", 'unit: "years"')
    yaml_output = yaml_output.replace("unit: 'k USD'", 'unit: "k USD"')
    yaml_output = yaml_output.replace("unit: 'k USD per person'", 'unit: "k USD per person"')
    yaml_output = yaml_output.replace("unit: 'G people'", 'unit: "G people"')
    yaml_output = yaml_output.replace("unit: 'GUSD/year'", 'unit: "GUSD/year"')
    
    # Write the updated file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(yaml_output)
    
    print(f"✅ Converted {file_path} to dense compact format")

def main():
    """Main function to run the conversion."""
    file_path = './data/projections.yaml'
    convert_to_dense_format(file_path)

if __name__ == "__main__":
    main()