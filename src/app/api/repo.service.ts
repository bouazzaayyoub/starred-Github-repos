import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from '../models/repo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private repos: Repo[];
  public repos$ = new Subject<any[]>();
  private data;

  constructor(private http: HttpClient) {}

  emitRepos() {
    this.repos$.next(this.repos);
  }

  getAllRepos(page: number = 1) {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    this.http
      .get(
        `https://api.github.com/search/repositories?q=created:>${date
          .toJSON()
          .slice(0, 10)}&sort=stars&order=desc&page=${page}`
      )
      .subscribe(
        (data) => {
          if (data) {
            this.data = data;
            this.repos = this.data.items.map((rp) => {
              return {
                name: rp.name,
                description: rp.description,
                nbreStars: rp.stargazers_count,
                nbreIssues: rp.open_issues_count,
                owner: rp.owner.avatar_url,
              };
            });
            this.emitRepos();
          }
        },
        (error) => console.log('Could not load repos.')
      );
  }
}
