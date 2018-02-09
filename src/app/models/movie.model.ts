

export class Movie{

   public title:string;
   public description:string;
   public actors:[string];
   public director:string;
   public producers:[string];
   public year:string;

   constructor(title:string,description:string,actors:[string],director:string,producers:[string],year:string){
       this.title = title;
       this.description = description;
       this.actors = actors;
       this.director = director;
       this.producers = producers;
       this.year = year;
   }



}