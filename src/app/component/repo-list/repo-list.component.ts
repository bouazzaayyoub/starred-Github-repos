import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { RepoService } from 'src/app/services/repo.service';
import { Repo } from 'src/app/models/repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss'],
})
export class RepoListComponent implements OnInit {
  public repos: Repo[] = [];
  private repoSub: Subscription;

  private pageIndex: number = 0;

  public loaded = false;

  constructor(
    private repoService: RepoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.showSpinner();
    this.fetchRepoPage();
    this.updateIndex();
  }

  private fetchRepoPage(page: number = 0): void {
    this.repoSub = this.repoService.repos$.subscribe(
      (repos) => {
        this.repos = this.repos.concat(repos);
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
    this.repoService.getAllRepos(page);
  }

  onScroll() {
    this.loaded = false;
    this.showSpinner();
    this.updateIndex();
    this.fetchRepoPage(this.pageIndex);
  }

  private showSpinner() {
    if (!this.loaded) {
      this.spinner.show();
    }
  }

  private updateIndex() {
    this.pageIndex++;
  }
}
