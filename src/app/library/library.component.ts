import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';


@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.css'],
    providers:[LibraryService]
})

export class LibraryComponent{

}

