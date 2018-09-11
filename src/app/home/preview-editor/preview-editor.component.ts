
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
    public dialogRef: MatDialogRef<PreviewEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  ngOnInit() {
    this.editor = new Editor({
      el: this.editElementRef.nativeElement,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '100%',
      width: '100%'
    });
  }

  cancel(): void {
    this.dialogRef.close('取消');
  }

  async save() {
    try {
    } catch (err) {
      return;
    }
    this.dialogRef.close('修改成功')
  }

}
