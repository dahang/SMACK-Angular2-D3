import { SMACKAngular2D3Page } from './app.po';

describe('smack-angular2-d3 App', function() {
  let page: SMACKAngular2D3Page;

  beforeEach(() => {
    page = new SMACKAngular2D3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
