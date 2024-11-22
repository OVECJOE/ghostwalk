import { Controller, Request, UseGuards } from "@nestjs/common";
import { Get, Res } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { join } from "path";

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get("*")
  // getRoot(@Res() res) {
  //   res.sendFile(join(__dirname, "..", "..", "client", "build", "index.html"));
  // }
}
