import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bylh-search',
  templateUrl: './bylh-search.component.html',
  styleUrls: ['./bylh-search.component.scss']
})
export class BylhSearchComponent implements OnInit {

  @Input() key: string;

  @Output() valueChanged = new EventEmitter<string>();

  debouncer = new Subject<string>();

  constructor() {
    // this.valueChanged.emit(this.key);
    this.debouncer.pipe(debounce(() => timer(500))).subscribe(value => this.valueChanged.emit(value));
  }

  ngOnInit() {
  }

  // ngmode Change
  valueChange(value: string) {
    this.key = value;
    this.debouncer.next(this.key);
  }
  // 失去焦点
  onBlur(event) {
    console.log('blur', event, this.key);
  }
  // 获得焦点
  onFocus(event) {
    console.log('focus', event, this.key);
  }
}
