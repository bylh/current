import { Directive, ViewContainerRef, TemplateRef, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

interface AppPageDir {
  sub?: boolean,
  header?: string
}
@Directive({
  selector: '[appPage]'
})
export class PageDirective implements OnInit {
  // private hasView = false;

  @Input() appPage: AppPageDir = {
    sub: false
  };
    constructor(
      protected elementRef: ElementRef,
      protected renderer: Renderer2
      // private viewContainerRef: ViewContainerRef, 
      // private templateRef: TemplateRef<any>,

    ) { }

// @Input() set appPage(condition: boolean) {
//   if (!condition && !this.hasView) {
//     this.viewContainerRef.createEmbeddedView(this.templateRef);
//     this.hasView = true;
//   } else if (condition && this.hasView) {
//     this.viewContainerRef.clear();
//     this.hasView = false;
//   }
// }
ngOnInit() {
  if (this.appPage.sub) {
    this.renderer.addClass(this.elementRef.nativeElement, 'bylh-sub-page-base');
    this.renderer.addClass(this.elementRef.nativeElement, 'bylh-header');
    this.renderer.addClass(this.elementRef.nativeElement, 'bylh-footer');
  }
  this.renderer.addClass(this.elementRef.nativeElement, 'bylh-page-base');
  this.renderer.addClass(this.elementRef.nativeElement, 'bylh-content');
  this.renderer.addClass(this.elementRef.nativeElement, 'mat-app-background');
}

}
