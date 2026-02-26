import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { ElasticsearchModule, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

import { SeachService } from "../services/search.service";
@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService): ElasticsearchModuleOptions => ({
                node:"http://localhost:9200",// config.get<string>("ELASTIC_SEARCH_URL"),
                maxRetries: 10,
                requestTimeout: 60000,
                pingTimeout: 60000,
                sniffOnStart: false,
                
                auth: {
                    username:"elastic", //config.get("ELASTIC_SEARCH_NAME") as string,
                    password: "elastic123"//config.get("ELASTIC_SEARCH_PASS") as string,
                },
            })
        })
    ],
    providers: [SeachService],
    exports: [SeachService],
})
export class SearchModule { }