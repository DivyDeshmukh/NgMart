import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userInfo!: { userData: User | null; authStatus: boolean };
  searchForm!: FormGroup;
  catogoriesList1: string[] = [
    'Clothing',
    'Earpads',
    'Headphones',
    'Accessories',
    'Electronics',
    'Stationary',
  ];
  categoriesList2: string[] = [
    'All',
    "Men's Clothing",
    'Jewelery',
    'Electronics',
    "Women's clothing",
  ];
  languageCode: string = 'en';

  constructor(
    private userData: UserDataService,
    private translateService: TranslateService
  ) {
    const userLang = navigator.language || 'en';
    this.languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(this.languageCode);
    this.translateService.use(this.languageCode);
    this.userData.behaviorLangCode.subscribe((code) =>
      this.translateService.use(code)
    );
  }

  ngOnInit(): void {
    this.userData.behaviorSubject.subscribe(
      (userData) => (this.userInfo = userData)
    );
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
  }
}
