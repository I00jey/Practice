import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

interface BigImageAndContent {
    newContent: string;
    bigImageUrl?: string;
    newsDate: string;
}

interface ListResultItem {
    url: string;
    title: string;
    smallImageUrl?: string;
    bigImageUrl?: string;
    newsContent: string;
    newsDate: string;
}

const getOriginNews = async (
    originUrl: string
): Promise<BigImageAndContent | undefined> => {
    try {
        const response: AxiosResponse<ArrayBuffer> = await axios.get(
            originUrl,
            {
                responseType: "arrayBuffer",
            }
        );

        const newsDecoded: string = Buffer.from(response.data).toString(
            "utf-8"
        );
        const $ = cheerio.load(newsDecoded);

        const newContentArray = $("#leftColumn > div.WYSIWYG.articlePage > p");
        let newContent = "";
        newContentArray.siblings("p").each(function () {
            newContent += $(this).text() + "\n";
        });

        const bigImageUrl = $("#carouselImage").attr("src");
        const newsDate = $("#leftColumn > div:nth-child(6) > span")
            .first()
            .text()
            .trim();

        const bigImageAndContent: BigImageAndContent = {
            newContent,
            bigImageUrl,
            newsDate,
        };

        return bigImageAndContent;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

const getNewsList = async (newsFieldUrl: string): Promise<void> => {
    try {
        const response: AxiosResponse<ArrayBuffer> = await axios.get(
            newsFieldUrl,
            {
                responseType: "arrayBuffer",
            }
        );

        const listDecoded: string = Buffer.from(response.data).toString(
            "utf-8"
        );
        const $ = cheerio.load(listDecoded);

        const listArray = $(
            "#leftColumn > div.largeTitle > article:nth-child(n)"
        ).toArray();
        const listResult: ListResultItem[] = [];

        for (const dataList of listArray) {
            const smallImage = $(dataList).find("a > img");
            const smallImageUrl = smallImage.attr("data-src");
            const aFind = $(dataList).find("div.textDiv > a").first();
            const path = aFind.attr("href");
            const url = `https://kr.investing.com${path}`;
            const title = aFind.text().trim();

            try {
                const bigImageAndContent = await getOriginNews(url);
                if (bigImageAndContent) {
                    const newsContent = bigImageAndContent.newContent;
                    const bigImageUrl = bigImageAndContent.bigImageUrl;
                    const newsDate = bigImageAndContent.newsDate;

                    listResult.push({
                        url,
                        title,
                        smallImageUrl,
                        bigImageUrl,
                        newsContent,
                        newsDate,
                    });
                }
            } catch (error) {
                console.error("list1 push 에러");
                continue;
            }
        }

        console.log("listResult", listResult);
        console.log(listResult.length);
    } catch (error) {
        console.error("뉴스 리스트 불러오기 실패", error);
    }
};

// 뉴스 분야별 분리
// 주식
getNewsList("https://kr.investing.com/news/stock-market-news");

// 암호화폐
// getNewsList("https://kr.investing.com/news/cryptocurrency-news");

// 경제
// getNewsList("https://kr.investing.com/news/economy");
