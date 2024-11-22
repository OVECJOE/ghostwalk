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
    AuthModule,
    UserModule,
    ChannelModule,
    MessageModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "client", "build"),
      exclude: ["/api*"],
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
