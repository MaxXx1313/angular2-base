import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'; // fucking shit
import { Http, Headers, Response } from '@angular/http';

const PROXY_URL = 'http://localhost:8888/proxy';
const PROXY_HEADER = 'X-Request-To';


const API_URL = 'http://localhost:8080';
const API_VER = 1;


/**
 *
 */
@Injectable()
export class AuthService {

  private _token:Token;
  use_proxy:boolean = false;

  /**
   *
   */
  constructor(private http: Http){

  }

  /**
   * @param {'get'|'post'|'put'|'delete'} method
   * @param {string} path
   * @param {object} params - url params
   * @param {any} data - data (post|put only)
   */
  public request(method:string, path:string, params:Object={}, data:any=null):Promise<any>{
    params = params || {};
    method = method.toUpperCase();

    // make url
    var paramStr = Object.keys(params).reduce((r,i)=>r+'&'+i+'='+params[i], '');

    if(data){
      // remove undefined properties
      Object.keys(data).forEach(name=>{
        if(typeof data[name] === 'undefined' || data[name] === null){
          delete data[name];
        }
      })
    }

    // TODO: this is a stub!!
    var url = API_URL+'/'+path + '?v=' + API_VER + paramStr
    + '&token=' + this._token.access_token;


    return ((this.use_proxy)
      ? this.request_proxy(method, url, data)
      : this.request_direct(method, url, data)
      )
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  /**
   *
   */
  private request_direct(method:string, url:string, data?:any):Promise<Response>{
    // return this.http.get(url/*, {cache:false}*/)
    return this.http.request(url, {method:method, body:data}).toPromise();
        /*, {cache:false}*/
  }

  /**
   *
   */
  // for develop only
  private request_proxy(method:string, url:string, data?:any):Promise<Response>{
    var headers = {};
    headers[PROXY_HEADER] = url;

    // "helperName" helps to distinguish request better in chrome console
    // actually, don't mean any serious
    var q = (''+url).split('?', 1)[0];
    var helperName = q.substr( q.lastIndexOf('/') + 1 );
    return this.http.request(PROXY_URL+'?'+helperName, {method:method, body:data, headers:new Headers(headers)}).toPromise();
  }



  // for develop only
  public requestStub(data:any):Promise<any>{
    data.json = function(){return data;}// hotfix: response.json is not a function
    return Promise.resolve(data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }


  /**
   * Handle error messages
   */
  private handleResponse(response:Response):Promise<any>{
    console.log('handleResponse', response);
    // extract response body
    var data:any = response.json();
    if(data.error){
      return Promise.reject(data.error);
    }else{
      return Promise.resolve(data.response);
    }
  }

  /**
   * handle system error
   */
  private handleError(error: Error|RequestError): Promise<Error> {
    console.error('An error occurred', error); // for demo purposes only

    // combime both variants: custom error and common error
    let e = {
      name:    (<RequestError> error).error_reason      || (<Error> error).name,
      message: (<RequestError> error).error_description || (<Error> error).message
    }
    return Promise.reject(e);
  }



  /**
   *
   */
  isAuthorized():boolean{
    return this._token && this._token.access_token && this._token.expired_at > Date.now();
  }


  /**
   *
   */
  getId():number{
    return 123;
    // return this._token && this._token.user_id;
  }

  // authorize():Promise<any>{
  //   return this.auth.authorize();
  // }




  /**
   * @return {Token}
   */
  protected loadToken():Token{
    var token = null;
    if(localStorage['token']){
      try{
        token = JSON.parse(localStorage['token']);
      }catch(e){
        console.warn('Unable to load token: ', e);
      }
    }

    if(token && token.expired_at && token.expired_at < Date.now()){
      token = null;
    }

    return token;
  }


  /**
   * Set and Save token
   * @param {Token} tokenData
   */
  public setToken(token:Token):void{
    token.expired_at = Date.now() + ( token.expires_in - 60) * 1000; // reserve 1 min for network operations

    this._token = token;
    localStorage['token'] = JSON.stringify(token);
  }


}//-AuthService


interface Token{
  expired_at:number
  expires_in:number
  access_token:string
  user_id:number
}



/**
 *
 */
export interface User{
  id:number
  name:string
  first_name:string
  last_name:string
  photo_50:string
}

export interface RequestError{
  error:string
  error_reason:string
  error_description:string
}
