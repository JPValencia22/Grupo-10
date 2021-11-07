// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {get} from '@loopback/rest';


export class SaludoController {

  @get('/saludo10')
  saludo():string{
    return "Hola grupo 10";
  }
}
