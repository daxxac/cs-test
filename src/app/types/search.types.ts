// models/search.types.ts
export enum SearchType {
  Zones = 'Zones',
  Sites = 'Sites',
  Placemarks = 'Placemarks',
  Layers = 'Layers',
}

export enum ConnectionStatus {
  Stable = 'stable',
  Unstable = 'unstable',
  Disconnected = 'disconnected',
}

export interface SearchResult {
  id: string;
  icon: string;
  type: SearchType;
  subtype: string;
  name: string;
  connectionStatus?: ConnectionStatus;
  isSelected?: boolean;
}

export interface SearchState {
  selectedType: SearchType | 'all';
  searchText: string;
  results: SearchResultGroup[];
}

export interface SearchResultGroup {
  type: SearchType;
  isExpanded: boolean;
  results: SearchResult[];
}
