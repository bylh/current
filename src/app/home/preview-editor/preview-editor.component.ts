
import { HomeService, Article } from './../home.service';

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
    @Inject(MAT_DIALOG_DATA) public data: Article) {
    console.log(this.data);
  }

  ngOnInit() {

    try {
      this.editor = new Editor({
        el: this.editElementRef.nativeElement,
        // viewer: true,
        // initialEditType: 'markdown',
        previewStyle: 'vertical', // tab  vertical
        initialEditType: 'wysiwyg', // markdown, wysiwyg
        // initialValue: '# hello', // 这个初始值为markdown
        language: 'zh',
        height: '100%',
        width: '100%'
      });
      if (this.data.md != null) {
        this.editor.setMarkdown(this.data.md);
      } else if (this.data.html != null) {
        this.editor.setHtml(this.data.html);
      }

    } catch (err) {
      console.log('创建编辑器出错', err);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  async save() {
    try {
      this.data.html = this.editor.getHtml();
      this.data.md = this.editor.getMarkdown();
      await this.homeService.saveArticle(this.data);
    } catch (err) {
      console.log('保存失败', err);
      return;
    }
    this.dialogRef.close(this.data);
  }

}
