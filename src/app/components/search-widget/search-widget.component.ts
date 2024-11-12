import { Component, OnInit, ChangeDetectionStrategy }              from '@angular/core';
import { SearchService }                                           from '@/services/search.service';
import { ConnectionStatus, SearchResult, SearchState, SearchType } from '@/types/search.types';
import { Observable }                                              from 'rxjs';

interface GroupedResults {
  subtype: string;
  items: SearchResult[];
}

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: [ './search-widget.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWidgetComponent implements OnInit {
  searchState$: Observable<SearchState>;
  searchText: string = '';
  selectedType: SearchType | 'all' = 'all';
  searchTypes = Object.values(SearchType);

  expandedTypes: Set<string> = new Set();
  expandedSubtypes: Set<string> = new Set();

  constructor(private searchService: SearchService) {
    this.searchState$ = this.searchService.searchState$;
  }

  ngOnInit(): void {
    this.onSearch();
    this.searchService.searchState$.subscribe(state => {
      this.expandedTypes = new Set(state.results.map(result => result.type));
      this.expandedSubtypes = new Set(state.results.flatMap(result => result.results.map(r => r.subtype)));
    });
  }

  onSearch(): void {
    this.searchService.updateSearchCriteria(this.selectedType, this.searchText);
  }

  getConnectionStatusClass(status: ConnectionStatus | undefined): string {
    if ( !status ) return '';
    return `status-${ status.toLowerCase() }`;
  }

  groupBySubtype(results: SearchResult[]): GroupedResults[] {
    if ( !results?.length ) return [];

    const groupedMap = new Map<string, SearchResult[]>();

    results.forEach(result => {
      if ( !groupedMap.has(result.subtype) ) {
        groupedMap.set(result.subtype, []);
      }
      groupedMap.get(result.subtype)?.push(result);
    });

    return Array.from(groupedMap.entries()).map(([ subtype, items ]) => ({
      subtype,
      items
    }));
  }

  toggleType(type: string): void {
    if ( this.expandedTypes.has(type) ) {
      this.expandedTypes.delete(type);
    } else {
      this.expandedTypes.add(type);
    }
  }

  toggleSubtype(subtype: string): void {
    if ( this.expandedSubtypes.has(subtype) ) {
      this.expandedSubtypes.delete(subtype);
    } else {
      this.expandedSubtypes.add(subtype);
    }
  }

  isTypeExpanded(type: string): boolean {
    return this.expandedTypes.has(type);
  }

  isSubtypeExpanded(subtype: string): boolean {
    return this.expandedSubtypes.has(subtype);
  }

  trackByType(index: number, item: any): string {
    return item.type;
  }

  trackBySubtype(index: number, item: GroupedResults): string {
    return item.subtype;
  }

  trackByResult(index: number, item: SearchResult): string {
    return item.id;
  }

  getTypeIcon(subtype: SearchType): string {
    switch (subtype) {
      case SearchType.Layers: return 'layers';
      case SearchType.Placemarks: return 'place';
      case SearchType.Sites: return 'location_on';
      case SearchType.Zones: return 'pin_drop';
      default: return '';
    }
  }
}

