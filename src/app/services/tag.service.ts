import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private readonly http: HttpClient) {}

  getPopularTags(): Observable<string[]> {
    return this.http.get<string[]>(
      `website-api::tag/${environment.projectId}/popular`,
    );
  }
}

