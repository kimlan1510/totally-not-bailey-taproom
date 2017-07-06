import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "style",
  pure: false
})

export class StylePipe implements PipeTransform{
  transform(input: Keg[], desiredStyle) {
    var output: Keg[] = [];
    if(desiredStyle === "IPA"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "IPA"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else if(desiredStyle === "Lager"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "Lager"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else if(desiredStyle === "Ale"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "Ale"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else if(desiredStyle === "Belgian"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "Belgian"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else if(desiredStyle === "Sour"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "Sour"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else if(desiredStyle === "Saison"){
      for(var i=0; i<input.length; i++){
        if(input[i].style === "Saison"){
          output.push(input[i]);
        }
      }
      return output;
    }
    else{
      return input;
    }
  }

}
