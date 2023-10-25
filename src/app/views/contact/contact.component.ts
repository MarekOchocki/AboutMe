import { Component, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription, delay, of } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('navigationEnter', [
      transition(':enter', [
        animate('0.3s', keyframes([
          style({ opacity: '0' }),
          style({ opacity: '1' })
        ]))
      ])
    ],
  )]
})
export class ContactComponent implements OnDestroy {
  private animationSubscription = new Subscription();
  private shouldDisplayEmailAsCopied = false;
  private readonly email = 'marek_ochocki@vp.pl';
  private readonly copiedText = 'copied!';

  constructor(private clipboard: Clipboard) {

  }

  ngOnDestroy(): void {
    this.animationSubscription.unsubscribe();
  }

  public copyEmailAddress() {
    this.shouldDisplayEmailAsCopied = true;
    this.clipboard.copy(this.email);

    this.animationSubscription.unsubscribe();
    this.animationSubscription = of(false).pipe(delay(1300)).subscribe(highlighted => {
      this.shouldDisplayEmailAsCopied = highlighted;
    });
  }

  public getDisplayText(): string {
    return this.shouldDisplayEmailAsCopied ? this.copiedText : this.email;
  }

  public isTextHighlighted(): boolean {
    return this.shouldDisplayEmailAsCopied;
  }
}
