import { Component, Input, OnInit } from '@angular/core';
import { Repo } from 'src/app/models/repo.model';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent implements OnInit {
  @Input() repo: Repo;

  constructor() {}

  ngOnInit() {}
}
