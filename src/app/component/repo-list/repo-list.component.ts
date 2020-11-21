import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepoService } from 'src/app/api/repo.service';
import { Repo } from 'src/app/models/repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss'],
})
export class RepoListComponent implements OnInit {
  public repos: Repo[] = [];
  private reposSub: Subscription;

  public loaded = false;

  constructor(private repoService: RepoService) {}

  ngOnInit() {
    this.reposSub = this.repoService.repos$.subscribe(
      (repos) => {
        this.repos = repos;
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
    this.repoService.getAllRepos();
  }
}
