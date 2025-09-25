/**
 * YAML data loading utility for World-Sim TypeScript Package
 * Loads projection data and creates immutable copy
 */

import * as yaml from 'js-yaml';
import lodash from 'lodash';
import { readFileSync } from 'fs';

const { cloneDeep } = lodash;
import { ProjectionData } from './types.js';

/**
 * Loads YAML projection data and returns a deep copy
 * Original data is preserved for reset functionality
 * 
 * @param yamlPath - Path to the projections.yaml file
 * @returns ProjectionData object with loaded indicators
 * @throws Error if file cannot be read or parsed
 */
export function loadData(yamlPath: string): ProjectionData {
  try {
    // Read YAML file
    const fileContents = readFileSync(yamlPath, 'utf8');
    
    // Parse YAML to JavaScript object
    const rawData = yaml.load(fileContents) as ProjectionData;
    
    // Validate basic structure
    if (!rawData || !rawData.projections || !Array.isArray(rawData.projections)) {
      throw new Error('Invalid YAML structure: missing projections array');
    }
    
    // Validate each indicator
    for (const indicator of rawData.projections) {
      if (!indicator.indicator_key || !indicator.name || !indicator.paths || !indicator.paths.data) {
        throw new Error(`Invalid indicator structure: ${indicator.indicator_key || 'unknown'}`);
      }
    }
    
    // Return deep copy to prevent accidental mutation of original data
    return cloneDeep(rawData);
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load YAML data from ${yamlPath}: ${error.message}`);
    }
    throw new Error(`Failed to load YAML data from ${yamlPath}: Unknown error`);
  }
}

/**
 * Creates a fresh copy of projection data
 * Useful for resetting to original state
 * 
 * @param data - Original projection data
 * @returns Deep copy of the data
 */
export function cloneData(data: ProjectionData): ProjectionData {
  return cloneDeep(data);
}