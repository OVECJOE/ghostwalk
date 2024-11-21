import { Sequelize } from "sequelize-typescript";
import { Channel } from "src/channel/channel.entity";
import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const urlParts = new URL(process.env.DATABASE_URL);
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: urlParts.hostname,
        port: +urlParts.port,
        username: urlParts.username,
        password: urlParts.password,
        database: urlParts.pathname.substring(1),
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
