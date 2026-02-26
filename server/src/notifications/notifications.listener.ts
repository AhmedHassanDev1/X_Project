import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NotificationsService } from "./notifications.service";
import { InteractionsGateway } from "src/interactions/interactions.gateway";
import { ContentService } from "src/content/content.service";

@Injectable()
export class NotificationsListener {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly interactionsGateway: InteractionsGateway,
        // private readonly postsService: ContentService
    ) { }

    @OnEvent('interaction.created')
    async handleInteraction(event: { userId: string; postId: string; interaction_type: string, action: string }) {
        const interactionsList = ['like', 'repost', "replay", "follow", "view"]


        if (!interactionsList.includes(event.interaction_type)) return;

        const post = { author: "694c11c8255366f24634ccc3" }
        let res;
        if (post.author !== event.userId) {
            res = await this.notificationsService.create(event.userId, post.author, event.interaction_type, event.postId);
            this.interactionsGateway.emitToUser(event.userId,{message:"has notification"})
        }
        if (interactionsList.filter(el => el !== "follow").includes(event.interaction_type)) {
            this.interactionsGateway.emitToAll({
                post_id: event.postId,
                interaction_type: event.interaction_type,
                action: event.action,
            });
        }
        

    }


}
