import { Controller, Get, Route } from 'tsoa';

@Route('my_test')
export class MyTestController extends Controller {
  @Get()
  public async get(): Promise<string> {
    return "test";
  }
}

