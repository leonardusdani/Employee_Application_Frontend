import { EmployeeApplicationPage } from './app.po';

describe('employee-application App', () => {
  let page: EmployeeApplicationPage;

  beforeEach(() => {
    page = new EmployeeApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
