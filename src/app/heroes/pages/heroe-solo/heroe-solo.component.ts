import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe-solo',
  templateUrl: './heroe-solo.component.html',
  styles: [`
    img{
      width: 100%;
      height: 100%;
    }
  `
  ]
})
export class HeroeSoloComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService) { }

  heroe!: Heroe; 

  ngOnInit(): void {
      //recibir id del heroe
      this.activatedRoute.params.pipe(
        switchMap(({id})=> this.heroesService.getHeroePorId(id))
      ).subscribe((heroe:Heroe)=> this.heroe = heroe)
  }

}

