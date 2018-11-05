import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

// 转换为可加载的安全资源
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(protected dom: DomSanitizer) { }
  public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.dom.bypassSecurityTrustHtml(value);
      case 'style':
        return this.dom.bypassSecurityTrustStyle(value);
      case 'script':
        return this.dom.bypassSecurityTrustScript(value);
      case 'url':
        return this.dom.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.dom.bypassSecurityTrustResourceUrl(value);
      default:
        return value;
    }
  }
}

@Pipe({
  name: 'spread'
})
export class ArraySpreadPipe implements PipeTransform {
  constructor() { }
  public transform(arr: Array<any>, att: string = null): string {
    if(att == null) {
      return arr.join(', ');
    }
    
    return arr.map(value => value[att]).join(', ');
  }
}
