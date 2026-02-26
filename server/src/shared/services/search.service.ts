import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class SeachService {
    constructor(private readonly esService: ElasticsearchService) { }
    async indexing(index: string, doc) {
        console.log(doc);

        let document = (({ text, media, createdAt }) => ({ text, media, createdAt }))(doc)
        try {

            await this.esService.index({
                index,
                id: doc?._id,
                document
            })

        } catch (error) {
            console.log(error);

        }
    }
    async bookmarkIndexing(document) {
        console.log(document);
        
        try {
          let res=  await this.esService.index({
                index:"bookmarks",
                document
            })
              
        } catch (error) {
            console.log(error);

        }
    }

    async deleteBookmark(userId: string, postId: string) {
        return await this.esService.deleteByQuery({
            index: "bookmarks",
            query: {
                bool: {
                    must: [
                        { term: { user_id: userId } },
                        { term: { post_id: postId } }
                    ]
                }
            }
        });
    }
    async search(index: string, body) {
        const result = await this.esService.search({
            index,
            body,
        });
       

        return result;
    }
}