import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightNumbers'
})
export class HighlightNumbersPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

 transform(value: string): SafeHtml {
    if (!value) return '';

    // يلوّن الرقم والعملة بدون تعديل المسافة اللي بينهم
    const highlighted = value.replace(
     /([#\d]+)/g,
  `<span class="text-primary">$1</span>`
);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
  }
