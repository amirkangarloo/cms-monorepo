import { Global, Module } from "@nestjs/common";
import { DbService } from "apps/api/src/db/db.service";

@Global()
@Module({
    providers: [DbService],
    exports: [DbService],
})
export class DbModule { }