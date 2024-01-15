const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getEconomy = () => {
    request(
        {
            url: "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101",

            method: "GET",
            encoding: null,
        },
        (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            if (response.statusCode === 200) {
                console.log("response ok");
                const bodyDecoded = iconv.decode(body, "euc-kr");
                const $ = cheerio.load(bodyDecoded);

                const economyArray = $(
                    "#main_content > div > div._persist > div.section_headline > ul > li:nth-child(n)"
                ).toArray();

                var economyresult = [];
                economyArray.forEach((dataList) => {
                    const image = $(dataList)
                        .find("div.sh_thumb > div")
                        .first()
                        .find("img");
                    const imageUrl = image.attr("src");
                    const aFind = $(dataList).find("div.sh_text > a").first();
                    const path = aFind.attr("href");
                    const newsUrl = `${path}`;
                    const newsTitle = aFind.text().trim();

                    economyresult.push({
                        newsUrl,
                        newsTitle,
                        imageUrl,
                    });
                });
                console.log("economyresult", economyresult);
            }
        }
    );
};
getEconomy();

const getfinanceNews = () => {
    request(
        {
            url: "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259",
            method: "GET",
            encoding: null,
        },
        (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            if (response.statusCode === 200) {
                console.log("response ok");
                const bodyDecoded = iconv.decode(body, "euc-kr");
                const $ = cheerio.load(bodyDecoded);

                const financeArray = $(
                    "#main_content > div.list_body.newsflash_body > ul.type06_headline > li:nth-child(n)"
                ).toArray();

                var financeyresult = [];
                financeArray.forEach((dataList) => {
                    const image = $(dataList).find("a > img");
                    const imageUrl = image.attr("src");
                    const aFind = $(dataList)
                        .find("dl > dt:nth-child(2) > a")
                        .first();
                    const path = aFind.attr("href");
                    const url = `${path}`;
                    const title = aFind.text().trim();

                    financeyresult.push({
                        url,
                        title,
                        imageUrl,
                    });
                });
                console.log("financeyresult", financeyresult);
            }
        }
    );
};
getfinanceNews();
