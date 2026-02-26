import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { TempFileDTO } from "src/interactions/dto/upload.dto";
import { CloudinaryService } from "./cloud.service";
import { createClient, RedisClientType } from 'redis';


@Injectable()
export class TempFilesManagmentService {
    private redisClient: any;
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: any,
        private readonly cloud: CloudinaryService
    ) {
        this.redisClient = createClient({ url: "redis://localhost:6378" });
        this.redisClient.connect().catch(console.error);
    }

    // When upload temporary file  
    async add(data: TempFileDTO) {

        let { public_id } = data
        await this.cacheManager.hset(`temp:file:${public_id}`, {
            TempFileDTO
        });

    }

    // When upload save post 
    async saved(public_id: string) { }

    // When the temporary file expires 
    async remove(public_id: string) {
        await this.cacheManager.hdel(`temp:file:${public_id}`)
    }

    async fileslist(): Promise<TempFileDTO[]> {
        const files = await this.redisClient.keys('temp:file:*');
        return files
    }

}


