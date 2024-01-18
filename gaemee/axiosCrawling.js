// const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const axios = require("axios");

// 매개변수 -> 크롤리하고자 하는 웹 페이지의 URL
const getOriginNews = async (originUrl) => {
    try {
        // Axios 사용하여 웹 페이지의 HTML을 가져옴
        const response = await axios.get(originUrl, {
            responseType: "arrayBuffer",
        });
        // response.data를 Buffer로 변환하고, toString()을 사용하여 인코딩 적용
        const newsDecoded = Buffer.from(response.data).toString("utf-8");
        // cheerio를 사용하여 HTML를 파싱
        const $ = cheerio.load(newsDecoded);
        // 원하는 정보를 추출하여 출력 또는 다른 작업 수행
        const newContent = $("#dic_area").text().trim();
        const bigImageUrl = $("#img1").attr("data-src");
        const newsDate = $(
            "#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"
        )
            .first()
            .text()
            .trim();
        // console.log(newsDate);
        var bigImageAndContent = {
            newContent,
            bigImageUrl,
            newsDate,
        };
        return bigImageAndContent;
    } catch (error) {
        return;
    }
};

const getNewsList = async (newsFieldUrl) => {
    try {
        // Axios 사용하여 웹 페이지의 HTML을 가져옴
        // get 함수를 사용하여 지정된 URL에서 GET 요청을 보냄
        const response = await axios.get(
            newsFieldUrl,
            // 서버로부터 받은 (이진) 데이터를 arrayBuffer 형태로 받아오도록 설정
            {
                responseType: "arraybuffer",
                // 응답 데이터의 인코딩을 binary로 설정, 텍스트가 아닌 이진 데이터를 받아온다는 것을 명시
                responseEncoding: "binary",
            }
        );

        // 방법 1
        // iconv-lite를 사용하여 EUC-KR로 인코딩된 데이터를 UTF-8로 디코딩
        // response.data는 이진 데이터
        // const listDecoded = iconv.decode(response.data, "euc-kr");

        // 방법 2
        // node.js 11부터는 TextDecoder를 사용할 수 있음
        // TextDecoder는 특정 문자 인코딩을 사용하여 이진 데이터를 텍스트로 디코딩하는 데 사용되는 js의 내장 객체
        // EUC-KR 문자 인코딩을 사용하는 TextDecoder 객체를 생성
        const decoder = new TextDecoder("euc-kr");
        // decoder.decode : TextDecorder 객체를 사용하여 이진 데이터를 디코딩
        // response.data : 이진 데이터
        const listDecoded = decoder.decode(response.data);

        // cheerio를 사용하여 HTML를 파싱
        const $ = cheerio.load(listDecoded);
        // 원하는 정보를 추출하여 출력 또는 다른 작업 수행

        const listArray = $(
            "#main_content > div.list_body.newsflash_body > ul.type06_headline > li:nth-child(n)"
        ).toArray();
        var listResult = [];
        for (const dataList of listArray) {
            const smallImage = $(dataList).find("a > img");
            const smallImageUrl = smallImage.attr("src");
            const aFind = $(dataList).find("dl > dt:nth-child(2) > a").first();
            const path = aFind.attr("href");
            // console.log(path);
            const url = `${path}`;
            const title = aFind.text().trim();
            // const title = iconv.decode(aFind.text().trim(), "utf-8");

            try {
                const bigImageAndContent = await getOriginNews(url);
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
            } catch (error) {
                // console.log("list1 push 에러");
                continue;
            }
        }
        const listArray2 = $(
            "#main_content > div.list_body.newsflash_body > ul.type06 > li:nth-child(n)"
        ).toArray();
        for (const dataList of listArray2) {
            const smallImage2 = $(dataList).find("a > img");
            const smallImageUrl2 = smallImage2.attr("src");
            const aFind2 = $(dataList).find("dl > dt:nth-child(2) > a").first();
            const path2 = aFind2.attr("href");
            const url2 = `${path2}`;
            const title2 = aFind2.text().trim();
            // const title2 = iconv.decode(aFind2.text().trim(), "euc-kr");

            try {
                const bigImageAndContent = await getOriginNews(url2);
                const newsContent2 = bigImageAndContent.newContent;
                const bigImageUrl2 = bigImageAndContent.bigImageUrl;
                const newsDate = bigImageAndContent.newsDate;

                listResult.push({
                    url: url2,
                    title: title2,
                    smallImageUrl: smallImageUrl2,
                    bigImageUrl: bigImageUrl2,
                    newsContent: newsContent2,
                    newsDate,
                });
            } catch (error) {
                // console.log("list2 push 에러");
                continue;
            }
        }
        console.log("listResult", listResult);
        console.log(listResult.length);
    } catch (error) {
        // console.log("뉴스 리스트 불러오기 실패", error);
    }
};

// 뉴스 분야별 분리
// 주식
// getNewsList(
//     "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=258"
// );

// 금융
// getNewsList(
//     "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259"
// );

// 글로벌 경제
// getNewsList(
//     "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=262"
// );
