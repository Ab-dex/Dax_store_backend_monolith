import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/_health")
  @ApiOperation({
    description: "Check if the server and endpoint is working",
    summary: "Get root endpoint"
    
    })
  @ApiOkResponse({
      description: "Success"
  })
 
  getHello(): string {
    return this.appService.getOk();
  }
}
