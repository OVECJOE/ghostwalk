import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from "./channel/channel.module";
import { MessageModule } from "./message/message.module";
import { UserModule } from "./user/user.module";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "client", "build"),
      serveRoot: "/",
      serveStaticOptions: {
        setHeaders(res, path) {
          if (path.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
          } else if (path.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css");
          } else if (path.endsWith(".json")) {
            res.setHeader("Content-Type", "application/json");
          } else if (path.endsWith(".html")) {
            res.setHeader("Content-Type", "text/html");
          }
        },
      },
      exclude: ["/api*"],
    }),
    AuthModule,
    UserModule,
    ChannelModule,
    MessageModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
