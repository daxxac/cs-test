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
    type: SearchType;
    subtype: string;
    name: string;
    connectionStatus?: ConnectionStatus;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}
