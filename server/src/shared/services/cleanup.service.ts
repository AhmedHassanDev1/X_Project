import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TempFilesManagmentService } from './tempFiles.service';
import { CloudinaryService } from './cloud.service';
@Injectable()
export class CleanupService {
    private readonly logger = new Logger(CleanupService.name);

    constructor(
        private readonly tempFilesService: TempFilesManagmentService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    // Cron Job كل 10 دقائق
    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleCleanup() {
        this.logger.log('Running temp files cleanup...');
        const tempFiles = await this.tempFilesService.fileslist(); // كل الملفات المؤقتة

        for (const file of tempFiles) {
            const ageInSeconds = (Date.now() - file.uploadedAt) / 1000;

            if (ageInSeconds > (86400)) {
                try {
                    await this.cloudinaryService.deleteFile(file.public_id);
                    this.tempFilesService.remove(file.public_id);
                    this.logger.log(`Deleted temp file: ${file.public_id}`);
                } catch (error) {
                    this.logger.error(`Failed to delete ${file.public_id}: ${error.message}`);
                }
            }
        }
    }
}
