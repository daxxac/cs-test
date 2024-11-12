import { Injectable }                                              from '@angular/core';
import { BehaviorSubject }                                         from 'rxjs';
import { ConnectionStatus, SearchResult, SearchState, SearchType } from '@/types/search.types';

export interface SearchResultGroup {
  type: SearchType;
  isExpanded: boolean;
  results: SearchResult[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _searchState = new BehaviorSubject<SearchState>({
    selectedType: 'all',
    searchText: '',
    results: []
  });

  public searchState$ = this._searchState.asObservable();

  private _mockData: SearchResult[] = [
    {
      id: '1',
      icon: 'sensors',
      type: SearchType.Zones,
      name: 'Sensor 1',
      subtype: 'Zone 1',
      connectionStatus: ConnectionStatus.Stable
    },
    {
      id: '2',
      icon: 'sensors',
      type: SearchType.Zones,
      name: 'Sensor 2',
      subtype: 'Zone 2',
      connectionStatus: ConnectionStatus.Unstable
    }, {
      id: '3',
      icon: 'sensors',
      type: SearchType.Zones,
      name: 'Sensor 3',
      subtype: 'Zone 2',
      connectionStatus: ConnectionStatus.Unstable
    },
    {
      id: '3',
      icon: 'pin_drop',
      type: SearchType.Sites,
      subtype: 'Site 1',
      name: 'Site 1',
      connectionStatus: ConnectionStatus.Disconnected
    },
    {
      id: '4',
      icon: 'pin_drop',
      type: SearchType.Sites, subtype: 'Site 2', name: 'Site 2', connectionStatus: ConnectionStatus.Stable
    },

    { id: '5', icon: 'location_on', type: SearchType.Placemarks, subtype: 'Placemark 1', name: 'Placemark 1' },
    { id: '6', icon: 'location_on', type: SearchType.Placemarks, subtype: 'Placemark 2', name: 'Placemark 2' },
    { id: '7', icon: 'layers', type: SearchType.Layers, subtype: 'Layer 1', name: 'Layer 1' },
    {
      id: '8',
      icon: 'layers',
      type: SearchType.Layers, subtype: 'Layer 2', name: 'Layer 2'
    },
    {
      id: '9',
      icon: 'layers',
      type: SearchType.Layers, subtype: 'Layer 3', name: 'Layer 3'
    }
  ];

  constructor() {
    this._initializeMockData();
  }

  private _initializeMockData(): void {
    this._searchState.next({
      ...this._searchState.value,
      results: this._groupResultsByType(this._mockData)
    });
  }

  private _groupResultsByType(results: SearchResult[]): SearchResultGroup[] {
    const groupedResults: SearchResultGroup[] = [];

    Object.values(SearchType).forEach(type => {
      const resultsByType = results.filter(result => result.type === type);
      if ( resultsByType.length > 0 ) {
        groupedResults.push({
          type,
          isExpanded: true,
          results: resultsByType
        });
      }
    });

    return groupedResults;
  }

  public updateSearchCriteria(type: SearchType | 'all', searchText: string): void {
    const filteredResults = this._filterResults(this._mockData, type, searchText);
    this._searchState.next({
      selectedType: type,
      searchText,
      results: filteredResults
    });
  }

  private _filterResults(results: SearchResult[], type: SearchType | 'all', searchText: string): SearchResultGroup[] {
    const filteredGroups: SearchResultGroup[] = [];

    Object.values(SearchType).forEach(groupType => {
      if ( type !== 'all' && groupType !== type ) return;

      const filteredResults = results.filter(result => {
        const matchesType = result.type === groupType;
        const matchesSearch = !searchText || result.name.toLowerCase().includes(searchText.toLowerCase()) || result.subtype.toLowerCase().includes(searchText.toLowerCase());
        return matchesType && matchesSearch;
      });

      if ( filteredResults.length > 0 ) {
        filteredGroups.push({
          type: groupType,
          isExpanded: true,
          results: filteredResults
        });
      }
    });

    return filteredGroups;
  }
}
