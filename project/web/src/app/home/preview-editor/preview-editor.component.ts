import { HomeService } from './../home.service';

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../auth.service';
import Editor from 'tui-editor';
@Component({
  selector: 'preview-editor',
  templateUrl: './preview-editor.component.html',
  styleUrls: ['./preview-editor.component.scss']
})
export class PreviewEditorComponent implements OnInit {
  @ViewChild('editSection') editElementRef: ElementRef;
  public editor: Editor;
  constructor(
    public auth: AuthService,
    public homeService: HomeService,
    public dialogRef: MatDialogRef<PreviewEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  ngOnInit() {
   
    this.editor = new Editor({
      el: this.editElementRef.nativeElement,
      // viewer: true,
      // initialEditType: 'markdown',
      previewStyle: 'vertical',
      // initialValue: '# hello', // 这个初始值为markdown
      height: '100%',
      width: '100%'
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  async save() {
    let html: string;
    try {
      html = this.editor.getHtml();
      await this.homeService.saveHtml(this.auth.getUserId(), html);
    } catch (err) {
      console.log('保存失败');
      return;
    }
    this.dialogRef.close(html);
  }

}
