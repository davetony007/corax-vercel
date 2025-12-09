export interface StrainReview {
  name: string;
  price?: string;
  rating?: string;
  notes: string;
}

export interface Review {
  strain: string;
  score: string;
  approval: string;
  videoId?: string;
  videoTitle?: string;
  source?: string;
}

export interface CoffeeshopData {
  id: string;
  name: string;
  location: string;
  address: string;
  coordinates: [number, number]; // [latitude, longitude]
  rating: number;
  tags: string[];
  videoIds: string[]; // Array of YouTube video IDs featuring this shop
  shortIds: string[]; // Array of YouTube shorts IDs featuring this shop
  description: string;
  detailedReview?: string;
  strainReviews?: StrainReview[];
  image: string;
  menuImages?: string[];
  reviews?: Review[];
  coraxApproved?: boolean;
  recommended?: boolean;
}

// Coffeeshop locations generated from CSV data
export const coffeeshops: CoffeeshopData[] = [
  {
    "id": "1",
    "name": "The 4 Floors",
    "location": "Rotterdam",
    "address": "Eendrachtsweg 29, Rotterdam 3012 LB",
    "coordinates": [
      51.9152649,
      4.4750819
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/1.svg",
    "menuImages": [
      "/menus/the-4-floors-11-11-25.png"
    ]
  },
  {
    "id": "2",
    "name": "137",
    "location": "Amsterdam",
    "address": "Brouwersgracht 137, 1015 GE Amsterdam",
    "coordinates": [
      52.3814043,
      4.8862983
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "QVpMoKOxd2A",
      "KFAKQAdY2pU",
      "rw_EVmnyjYQ",
      "1LVHf_41jEQ",
      "KbhKyMrMXHg",
      "cNARVqHpigI",
      "4b3NDVZV3Zk",
      "utuU8EA_KHk",
      "7kwicBefV1w",
      "4YkGp6JhzRE",
      "nCorJMnfO8M",
      "8TNwFAxZBg4",
      "fS8THioQvhU",
      "QMhjG6EdZ4A",
      "6anPRuuA-SE",
      "HA7CBmz04SQ",
      "Yc16xcKSXqU"
    ],
    "shortIds": [
      "VQwpWVtXdc8",
      "ra08qUwf8zo",
      "XeV-Z0Tk0DA"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/2.jpg",
    "menuImages": [
      "/menus/137-17-01-25.png"
    ]
  },
  {
    "id": "3",
    "name": "1e Hulp",
    "location": "Amsterdam",
    "address": "Marnixstraat 194, 1016 TL Amsterdam",
    "coordinates": [
      52.371563,
      4.8758367
    ],
    "rating": 0,
    "tags": [
      "Historic",
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [
      "O_xCqN0i3LE",
      "aIGzI2NVj8E"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/3.jpg",
    "menuImages": [
      "/menus/1e-hulp-22-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Candy Coffin",
        "score": "€14, originally grown by DJ",
        "approval": "€14, originally grown by DJ",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "4",
    "name": "Chillie Kiki",
    "location": "Almere",
    "address": "Schoolstraat 260, Almere-Haven 1354 HX",
    "coordinates": [
      52.3368873,
      5.2212593
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Almere",
    "image": "/images/shops/4.jpg",
    "menuImages": [
      "/menus/chillie-kiki-12-07-25.png"
    ]
  },
  {
    "id": "5",
    "name": "Coffeeshop Haarlem",
    "location": "Haarlem",
    "address": "Doelstraat 29, Haarlem 2011 XB",
    "coordinates": [
      52.3777618,
      4.630716
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/5.jpg",
    "menuImages": [
      "/menus/coffeeshop-haarlem-11-10-25.png"
    ]
  },
  {
    "id": "6",
    "name": "Mississippi",
    "location": "Maastricht",
    "address": "Maaspromenade 11, Maastricht 6211 AE",
    "coordinates": [
      50.8532616,
      5.6946863
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/6.jpg",
    "menuImages": [
      "/menus/mississippi-25-10-25.png"
    ]
  },
  {
    "id": "7",
    "name": "Waterworld",
    "location": "Den Haag",
    "address": "Gedempte Burgwal 55, 2512 BS den Haag",
    "coordinates": [
      52.074799,
      4.3109111
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/7.jpg",
    "menuImages": [
      "/menus/waterworld-22-11-25.png"
    ]
  },
  {
    "id": "8",
    "name": "Halicarnas",
    "location": "Venray",
    "address": "Henseniusstraat 47, Venray 5801 AW",
    "coordinates": [
      51.5226328,
      5.9750298
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Venray",
    "image": "/images/shops/8.jpg",
    "menuImages": [
      "/menus/halicarnas-15-08-25.png"
    ]
  },
  {
    "id": "9",
    "name": "420 Cafe (de Kuil)",
    "location": "Amsterdam",
    "address": "Oudebrugsteeg 27, 1012 JN Amsterdam",
    "coordinates": [
      52.3759282,
      4.8958867
    ],
    "rating": 0,
    "tags": [
      "Unique Vibe"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/9.svg",
    "menuImages": [
      "/menus/420-cafe-de-kuil-06-09-25.png"
    ],
    "reviews": [
      {
        "strain": "White Widow",
        "score": "**Mixed** (Smoked not good at all, but gave real old school vibes, actually liked the effect)",
        "approval": "**Mixed** (Smoked not good at all, but gave real old school vibes, actually liked the effect)",
        "videoId": "y21L6JgNx48",
        "videoTitle": "2000s Flashback: White Widow from Coffeeshop 420 Amsterdam.. Is It Smokable?"
      }
    ]
  },
  {
    "id": "10",
    "name": "Missouri",
    "location": "Maastricht",
    "address": "Hoogbrugstraat 31, Maastricht 6221 CN",
    "coordinates": [
      50.8472162,
      5.7004894
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/10.jpg",
    "menuImages": [
      "/menus/missouri-25-04-25.png"
    ]
  },
  {
    "id": "11",
    "name": "City Hall",
    "location": "Amsterdam",
    "address": "Oudezijds Voorburgwal 189, Amsterdam 1012 EW",
    "coordinates": [
      52.3715038,
      4.895798
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "gMABHZYfrRA"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/11.jpg",
    "menuImages": [
      "/menus/city-hall-26-08-25.png"
    ]
  },
  {
    "id": "12",
    "name": "Le Mistral",
    "location": "Den Haag",
    "address": "Weimarstraat 378, 2562 HW The Hague",
    "coordinates": [
      52.0721052,
      4.274657
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/12.jpg",
    "menuImages": [
      "/menus/le-mistral-10-11-25.png"
    ]
  },
  {
    "id": "13",
    "name": "De Wedren",
    "location": "Nijmegen",
    "address": "Prins Bernhardstraat 71, Nijmegen 6521 AD",
    "coordinates": [
      51.838565,
      5.8694722
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/13.jpg",
    "menuImages": [
      "/menus/de-wedren-04-10-25.png"
    ]
  },
  {
    "id": "14",
    "name": "7th Heaven",
    "location": "Amsterdam",
    "address": "Brouwersgracht 137, 1015 GE Amsterdam",
    "coordinates": [
      52.3814043,
      4.8862983
    ],
    "rating": 0,
    "tags": [
      "Top Pick"
    ],
    "videoIds": [
      "4YkGp6JhzRE",
      "QMhjG6EdZ4A",
      "6anPRuuA-SE"
    ],
    "shortIds": [
      "wHAOravKVU4",
      "EZct3MG0iMs"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/14.jpg",
    "menuImages": [
      "/menus/7th-heaven-23-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Holy Kosher",
        "score": "**Absolutely approved**",
        "approval": "**Absolutely approved**",
        "videoId": "4ZHOec2xyiY",
        "videoTitle": "The Kosher From This Coffeeshop Hits Different"
      },
      {
        "strain": "Holy Kosher",
        "score": "**Proper stuff** (Smells very good)",
        "approval": "**Proper stuff** (Smells very good)",
        "videoId": "wHAOravKVU4",
        "videoTitle": "7TH HEAVEN HOLY KOSHER PROPER BUD OR RIP OFF ?"
      },
      {
        "strain": "Sunset Sherbet",
        "score": "N/A",
        "approval": "N/A",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "15",
    "name": "Mix",
    "location": "Enschede",
    "address": "Haverstraatpassage 44-46, Enschede 7511 EX",
    "coordinates": [
      52.2207482,
      6.8982221
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Enschede",
    "image": "/images/shops/15.jpg",
    "menuImages": [
      "/menus/mix-03-10-25.png"
    ]
  },
  {
    "id": "16",
    "name": "Club 69",
    "location": "Maastricht",
    "address": "Grote Gracht 97, Maastricht 6211 SV",
    "coordinates": [
      50.8498754,
      5.6858469
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/16.jpg",
    "menuImages": [
      "/menus/club-69-08-09-25.png"
    ]
  },
  {
    "id": "17",
    "name": "Willie Wortel Indica",
    "location": "Haarlem",
    "address": "Koudenhorn 58, 2011 JD Haarlem",
    "coordinates": [
      52.3822784,
      4.6428257
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/17.svg",
    "menuImages": [
      "/menus/willie-wortel-indica-01-08-25.png"
    ]
  },
  {
    "id": "18",
    "name": "Mon Camarade",
    "location": "Rotterdam",
    "address": "1e Middellandstraat 10a, 3014 BD, Rotterdam",
    "coordinates": [
      51.9196576,
      4.4659643
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/18.jpg",
    "menuImages": [
      "/menus/mon-camarade-06-09-25.png"
    ]
  },
  {
    "id": "19",
    "name": "Aarden",
    "location": "Vlissingen",
    "address": "Nieuwstraat 1, Vlissingen 4381CN",
    "coordinates": [
      51.4415791,
      3.5743897
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Vlissingen",
    "image": "/images/shops/19.jpg",
    "menuImages": [
      "/menus/aarden-29-04-25.png"
    ]
  },
  {
    "id": "20",
    "name": "Happy Feelings",
    "location": "Amsterdam",
    "address": "Kerkstraat 51, 1017 GC Amsterdam",
    "coordinates": [
      52.3652526,
      4.8858771
    ],
    "rating": 0,
    "tags": [
      "Top Pick"
    ],
    "videoIds": [
      "Oj50ohly8EQ"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/20.svg",
    "menuImages": [
      "/menus/happy-feelings-28-11-25.jpg",
      "/menus/happy-feelings-14-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Blue Nerds",
        "score": "**Absolutely super duper highly mega approved**",
        "approval": "**Absolutely super duper highly mega approved**",
        "videoId": "jaUfPJbLUqU",
        "videoTitle": "This One Is Super Duper Mega Highly Approved"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "21",
    "name": "Happy People",
    "location": "Amsterdam",
    "address": "Dapperstraat 2, 1093 BT Amsterdam",
    "coordinates": [
      52.3651803,
      4.9258144
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/21.jpg",
    "menuImages": [
      "/menus/happy-people-25-04-25.png"
    ]
  },
  {
    "id": "22",
    "name": "Willie Wortel Sativa",
    "location": "Haarlem",
    "address": "Kruisweg 46, 2011 LD Haarlem",
    "coordinates": [
      52.3869149,
      4.6365031
    ],
    "rating": 0,
    "tags": [
      "Good Prices"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/22.svg",
    "menuImages": [
      "/menus/willie-wortel-sativa-14-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Arteimus Mints",
        "score": "**8.5** (Excellent piece of butt)",
        "approval": "**8.5** (Excellent piece of butt)",
        "videoId": "1Xd8A087u40",
        "videoTitle": "I Bought Something Expensive In A Coffeeshop That Is Known To Be Cheap"
      },
      {
        "strain": "Grape Gas",
        "score": "**Absolutely approved** (Very clean, tastes great)",
        "approval": "**Absolutely approved** (Very clean, tastes great)",
        "videoId": "rJjqQVcmRgk",
        "videoTitle": "This Coffeeshop Is Known To Have Top Shelf Flower For Budget Prices"
      },
      {
        "strain": "Skittles",
        "score": "**4.2** (Worst Skittle ever tried, smoking completely black ash, burns in throat, doesn't smell or look like Skittles)",
        "approval": "**4.2** (Worst Skittle ever tried, smoking completely black ash, burns in throat, doesn't smell or look like Skittles)",
        "videoId": "zC-Nr652leA",
        "videoTitle": "WORST Z I EVER HAD - Amsterdam Coffeeshops"
      },
      {
        "strain": "Skittles",
        "score": "**4.2** (Worst Skittle ever tried, smoking completely black ash, burns in throat)",
        "approval": "**4.2** (Worst Skittle ever tried, smoking completely black ash, burns in throat)",
        "videoId": "zC-Nr652leA",
        "videoTitle": "WORST Z I EVER HAD - Amsterdam Coffeeshops"
      },
      {
        "strain": "Cookies and Cream",
        "score": "**Must be good**, so strong smell, very stanky",
        "approval": "**Must be good**, so strong smell, very stanky",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "23",
    "name": "Aarden Plan B",
    "location": "Goes",
    "address": "Grote Markt 7, Goes 4461 AH",
    "coordinates": [
      51.5045274,
      3.8898763
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Goes",
    "image": "/images/shops/23.jpg",
    "menuImages": [
      "/menus/aarden-plan-b-22-10-25.png"
    ]
  },
  {
    "id": "24",
    "name": "CoffeeshopAmsterdam",
    "location": "Amsterdam",
    "address": "Haarlemmerstraat 44, 1013 ES, Amsterdam",
    "coordinates": [
      52.380066,
      4.8929225
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "aW6-IiRVcXs"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/24.svg",
    "menuImages": [
      "/menus/coffeeshopamsterdam-27-08-25.png"
    ]
  },
  {
    "id": "25",
    "name": "Willie Wortel's Sinsemilla",
    "location": "Haarlem",
    "address": "Houtplein16a, Haarlem 2012 DH",
    "coordinates": [
      52.375135,
      4.630367
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/25.jpg",
    "menuImages": [
      "/menus/willie-wortels-sinsemilla-31-08-25.png"
    ]
  },
  {
    "id": "26",
    "name": "Mr. K's",
    "location": "Amsterdam",
    "address": "2e Laurierdwarsstraat 44, Amsterdam 1016 RB",
    "coordinates": [
      52.3735,
      4.8804
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "cDRL5ofqJwM"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/26.svg",
    "menuImages": [
      "/menus/mr-ks-21-08-25.png"
    ]
  },
  {
    "id": "27",
    "name": "Happy Smile",
    "location": "Den Haag",
    "address": "Verheeskade 30, 2521 BN Den Haag",
    "coordinates": [
      52.0625673,
      4.3175075
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/27.jpg",
    "menuImages": [
      "/menus/happy-smile-14-07-25.png"
    ]
  },
  {
    "id": "28",
    "name": "Saint",
    "location": "Amsterdam",
    "address": "Regulierssteeg 2, Amsterdam 1017 CP",
    "coordinates": [
      52.3668283,
      4.8949199
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "8b0Sr2CCJDs"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/28.jpg",
    "menuImages": [
      "/menus/saint-02-02-25.png"
    ]
  },
  {
    "id": "29",
    "name": "Sandman",
    "location": "Haarlem",
    "address": "Zomervaart 154, Haarlem 2033 DC",
    "coordinates": [
      52.3764799,
      4.6502913
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "Jb9iqikc_Zw"
    ],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/29.svg",
    "menuImages": [
      "/menus/sandman-09-01-25.png"
    ]
  },
  {
    "id": "30",
    "name": "Yanks",
    "location": "Zandvoort",
    "address": "Dorpsplein 2, 2042 JK Zandvoort",
    "coordinates": [
      52.372519,
      4.5275001
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Zandvoort",
    "image": "/images/shops/30.jpg",
    "menuImages": [
      "/menus/yanks-11-09-25.png"
    ],
    "reviews": [
      {
        "strain": "AK-47",
        "score": "Sketchy shop, no card payment",
        "approval": "Sketchy shop, no card payment",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "31",
    "name": "96",
    "location": "Amsterdam",
    "address": "Jan Pieter Heijestraat 96, 1053 GT Amsterdam",
    "coordinates": [
      52.3635636,
      4.8632801
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/31.jpg",
    "menuImages": [
      "/menus/96-25-08-25.png"
    ]
  },
  {
    "id": "32",
    "name": "Happy Days",
    "location": "Hoensbroek",
    "address": "Akerstraat Noord 220, Hoensbroek 6431 HT",
    "coordinates": [
      50.9276532,
      5.9399037
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hoensbroek",
    "image": "/images/shops/32.jpg",
    "menuImages": [
      "/menus/happy-days-02-07-25.png"
    ]
  },
  {
    "id": "33",
    "name": "de Muze",
    "location": "Tilburg",
    "address": "Tuinstraat 43, 5038 DA Tilburg",
    "coordinates": [
      51.5574794,
      5.0856881
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/33.jpg",
    "menuImages": [
      "/menus/de-muze-05-09-25.png"
    ]
  },
  {
    "id": "34",
    "name": "Abraxas",
    "location": "Amsterdam",
    "address": "Jonge Roelensteeg 12 - 14, 1012 PL Amsterdam",
    "coordinates": [
      52.3720587,
      4.8911669
    ],
    "rating": 0,
    "tags": [
      "Historic",
      "Unique Vibe"
    ],
    "videoIds": [],
    "shortIds": [
      "YBjRSYNXKkY",
      "FIVHhCvTyF4"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/34.jpg",
    "menuImages": [
      "/menus/abraxas-08-09-25.png"
    ]
  },
  {
    "id": "35",
    "name": "Columbus",
    "location": "Harderwijk",
    "address": "Vijhestraat 3, Harderwijk 3841 CW",
    "coordinates": [
      52.3497262,
      5.6152379
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Harderwijk",
    "image": "/images/shops/35.svg",
    "menuImages": [
      "/menus/columbus-06-10-25.png"
    ]
  },
  {
    "id": "36",
    "name": "Hashtag",
    "location": "Amsterdam",
    "address": "Reguliersgracht 27, Amsterdam 1017 LK",
    "coordinates": [
      52.3639288,
      4.8962296
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "mcoGoW1D3Go",
      "nCorJMnfO8M",
      "BkCVRymxvWw"
    ],
    "shortIds": [
      "QMBkff3w9L0",
      "T2G4iGHrznQ",
      "NwD9I2pmSfo"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/36.jpg",
    "menuImages": [
      "/menus/hashtag-31-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Jellonate",
        "score": "**Absolutely approved**",
        "approval": "**Absolutely approved**",
        "videoId": "XthSfh6a3lg",
        "videoTitle": "7up as a flower"
      },
      {
        "strain": "Grape Gas",
        "score": "**Absolutely approved** (Smell and aesthetics 10 out of 10)",
        "approval": "**Absolutely approved** (Smell and aesthetics 10 out of 10)",
        "videoId": "ZItjgqixDGc",
        "videoTitle": "Godly Gassy Grapness"
      },
      {
        "strain": "White Sherbet",
        "score": "**Absolutely approved**",
        "approval": "**Absolutely approved**",
        "videoId": "Ixzw9WtGwdk",
        "videoTitle": "This Shop Just Opened 2 Years Ago And Already Won Several Cups"
      },
      {
        "strain": "Ztopia",
        "score": "**Killer, approved** (Smokes like a Cali for €18)",
        "approval": "**Killer, approved** (Smokes like a Cali for €18)",
        "videoId": "QMBkff3w9L0",
        "videoTitle": "Is This 18 € Cali From Coffeeshop Hashtag Any Good?"
      },
      {
        "strain": "Gelonate (Original Kelly Import)",
        "score": "**Tastes absolutely amazing** (Better than Solo's Cup winner Gelonate)",
        "approval": "**Tastes absolutely amazing** (Better than Solo's Cup winner Gelonate)",
        "videoTitle": ""
      },
      {
        "strain": "Donny Burger",
        "score": "**Could be an absolute banger**, stank very bad",
        "approval": "**Could be an absolute banger**, stank very bad",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "37",
    "name": "Sativa",
    "location": "Amsterdam",
    "address": "Spuistraat 118, 1012 VA, Amsterdam",
    "coordinates": [
      52.3746084,
      4.8902812
    ],
    "rating": 0,
    "tags": [
      "Good Prices"
    ],
    "videoIds": [
      "3vG1w0x6xf0",
      "8TNwFAxZBg4",
      "6anPRuuA-SE",
      "HA7CBmz04SQ",
      "Yc16xcKSXqU"
    ],
    "shortIds": [
      "V3ZxvlE3Gu0",
      "2SmAUkA3swA",
      "PUhi28E-WNw",
      "NwD9I2pmSfo",
      "T71VzOK8xxE",
      "MEvaWrj0w4g"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/37.jpg",
    "menuImages": [
      "/menus/sativa-31-10-25.png"
    ]
  },
  {
    "id": "38",
    "name": "Africa",
    "location": "Tilburg",
    "address": "Koopvaardijstraat 46, Tilburg 5017 BG",
    "coordinates": [
      51.5530981,
      5.0904485
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "6884VkL0nDg"
    ],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/38.jpg",
    "menuImages": [
      "/menus/africa-04-06-25.png"
    ]
  },
  {
    "id": "39",
    "name": "Headlines",
    "location": "Zaandam",
    "address": "Rozengracht 90, Zaandam 1506 SE",
    "coordinates": [
      52.4392608,
      4.8222307
    ],
    "rating": 0,
    "tags": [
      "Good Prices"
    ],
    "videoIds": [],
    "shortIds": [
      "mdHNQFiHNcU"
    ],
    "description": "Coffeeshop located in Zaandam",
    "image": "/images/shops/39.jpg",
    "menuImages": [
      "/menus/headlines-03-09-25.png"
    ],
    "reviews": [
      {
        "strain": "ZOWAHH (Skittles x Sour Diesel)",
        "score": "**8.1 approved** (Absolutely spectacular for €11, completely white smoking, very nice in the throat, Skittles dominating)",
        "approval": "**8.1 approved** (Absolutely spectacular for €11, completely white smoking, very nice in the throat, Skittles dominating)",
        "videoTitle": "ZOWAHH - MORE LEGAL FLOWER"
      },
      {
        "strain": "Wedding Cake (Legal, Outdoor)",
        "score": "Canadala breeder",
        "approval": "Canadala breeder",
        "videoTitle": ""
      },
      {
        "strain": "ZOWAHH (Skittles x Sour Diesel)",
        "score": "**8.1 approved** (Absolutely spectacular for €11, completely white smoking)",
        "approval": "**8.1 approved** (Absolutely spectacular for €11, completely white smoking)",
        "videoTitle": "ZOWAHH - MORE LEGAL FLOWER"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "40",
    "name": "Cool Running",
    "location": "Maastricht",
    "address": "Brusselsestraat 35, Maastricht 6211 PB",
    "coordinates": [
      50.8495337,
      5.6843894
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/40.jpg",
    "menuImages": [
      "/menus/cool-running-05-03-25.png"
    ]
  },
  {
    "id": "41",
    "name": "Nebula",
    "location": "Den Haag",
    "address": "Boerenstraat 89-a, The Hague 2572 HV",
    "coordinates": [
      52.0636377,
      4.2939181
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/41.jpg",
    "menuImages": [
      "/menus/nebula-19-06-25.png"
    ]
  },
  {
    "id": "42",
    "name": "De Schavuit",
    "location": "Groningen",
    "address": "Schuitendiep 62, Groningen 9711 RE",
    "coordinates": [
      53.2181579,
      6.5734415
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/42.jpg",
    "menuImages": [
      "/menus/de-schavuit-20-07-25.png"
    ]
  },
  {
    "id": "43",
    "name": "Zero Zero",
    "location": "Arnhem",
    "address": "Hommelseweg 19, 6821 LA, Arnhem",
    "coordinates": [
      51.9863376,
      5.9141355
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/43.jpg",
    "menuImages": [
      "/menus/zero-zero-15-11-25.png"
    ]
  },
  {
    "id": "44",
    "name": "Scolo",
    "location": "Ijmuiden",
    "address": "Snelliusstraat 21, IJmuiden 1973 PA",
    "coordinates": [
      52.4603846,
      4.6030081
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Ijmuiden",
    "image": "/images/shops/44.jpg",
    "menuImages": [
      "/menus/scolo-15-08-25.png"
    ]
  },
  {
    "id": "45",
    "name": "Aktama 2",
    "location": "Amsterdam",
    "address": "Hudsonstraat 156, Amsterdam 1057 ST",
    "coordinates": [
      52.3696532,
      4.8524681
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/45.jpg",
    "menuImages": [
      "/menus/aktama-2-16-10-25.png"
    ]
  },
  {
    "id": "46",
    "name": "Crackers",
    "location": "Tilburg",
    "address": "Bredaseweg 165, Tilburg 5038 ND",
    "coordinates": [
      51.5558126,
      5.0709858
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/46.jpg",
    "menuImages": [
      "/menus/crackers-08-04-25.png"
    ]
  },
  {
    "id": "47",
    "name": "High Society",
    "location": "Leiden",
    "address": "Lange Scheistraat 5, 2312 CG, Leiden",
    "coordinates": [
      52.1630397,
      4.4880236
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Leiden",
    "image": "/images/shops/47.svg",
    "menuImages": [
      "/menus/high-society-14-01-25.png"
    ]
  },
  {
    "id": "48",
    "name": "New Amsterdam",
    "location": "Amsterdam",
    "address": "Hoofdweg 226, 1057 DG, Amsterdam",
    "coordinates": [
      52.3669857,
      4.8528822
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/48.jpg",
    "menuImages": [
      "/menus/new-amsterdam-28-08-25.png"
    ],
    "reviews": [
      {
        "strain": "Gelato Skittles",
        "score": "**0 out of 10 points** (Tastes very weird/like medicine, potentially sprayed/contaminated; thrown away)",
        "approval": "**0 out of 10 points** (Tastes very weird/like medicine, potentially sprayed/contaminated; thrown away)",
        "videoId": "MthsSJakfHQ",
        "videoTitle": "Contaminated Flower? Amsterdam Coffeeshops"
      }
    ]
  },
  {
    "id": "49",
    "name": "Sensemillia",
    "location": "Amsterdam",
    "address": "Gillis van Ledenberchstraat 135-HS, Amsterdam 1052 LE",
    "coordinates": [
      52.375112,
      4.871317
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/49.jpg",
    "menuImages": [
      "/menus/sensemillia-25-08-25.png"
    ]
  },
  {
    "id": "50",
    "name": "De Ambassade",
    "location": "Zwijndrecht",
    "address": "IJsselmeer 27, Zwijndrecht 3332 EX",
    "coordinates": [
      51.8225409,
      4.6494991
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Zwijndrecht",
    "image": "/images/shops/50.svg",
    "menuImages": [
      "/menus/de-ambassade-08-03-25.png"
    ]
  },
  {
    "id": "51",
    "name": "New Times",
    "location": "Amsterdam",
    "address": "Spuistraat 260, 1012 VW Amsterdam",
    "coordinates": [
      52.3705633,
      4.8888462
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["6anPRuuA-SE"],
    "shortIds": [
      "FaUxzEJR6kQ",
      "BrQO9sms6ck"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/51.jpg",
    "menuImages": [
      "/menus/new-times-11-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Trap Scotty (Kelly Import)",
        "score": "**Fire stuff**, super nice tops",
        "approval": "**Fire stuff**, super nice tops",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "52",
    "name": "Cremers",
    "location": "Den Haag",
    "address": "Prinsestraat 84, 2513 CG 's-Gravenhage ( Den Haag )",
    "coordinates": [
      52.0792074,
      4.3049173
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/52.jpg",
    "menuImages": [
      "/menus/cremers-28-06-25.png"
    ]
  },
  {
    "id": "53",
    "name": "Amigo",
    "location": "Rotterdam",
    "address": "'s Gravendijkwal 138b, Rotterdam 3015 CC",
    "coordinates": [
      51.9130604,
      4.4640622
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/53.svg",
    "menuImages": [
      "/menus/amigo-29-08-25.png"
    ]
  },
  {
    "id": "54",
    "name": "The Crow",
    "location": "Den Haag",
    "address": "Hooikade 7, The Hague 2514 BH",
    "coordinates": [
      52.0850351,
      4.3133932
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/54.jpg",
    "menuImages": [
      "/menus/the-crow-23-11-25.png"
    ]
  },
  {
    "id": "55",
    "name": "Sensi Shop",
    "location": "Winterswijk",
    "address": "Jonenstraat 8, Winterswijk 7101 GA",
    "coordinates": [
      51.9709048,
      6.7155669
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Winterswijk",
    "image": "/images/shops/55.svg",
    "menuImages": [
      "/menus/sensi-shop-23-08-25.png"
    ]
  },
  {
    "id": "56",
    "name": "Amnesia",
    "location": "Amsterdam",
    "address": "Herengracht 133, 1015 BG Amsterdam",
    "coordinates": [
      52.3755551,
      4.8890435
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["aW6-IiRVcXs"],
    "shortIds": [
      "6GW-s_yGR5Y"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/56.jpg",
    "menuImages": [
      "/menus/amnesia-21-10-25.png"
    ]
  },
  {
    "id": "57",
    "name": "Crush",
    "location": "Amsterdam",
    "address": "Marnixstraat 383, 1016 XR Amsterdam",
    "coordinates": [
      52.3657219,
      4.8801482
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "kW3JA08umHI",
      "fS8THioQvhU"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/57.jpg",
    "menuImages": [
      "/menus/crush-18-01-25.png"
    ]
  },
  {
    "id": "58",
    "name": "New Times 2",
    "location": "Amsterdam",
    "address": "Amstelstraat 35, Amsterdam 1017 DA",
    "coordinates": [
      52.3662607,
      4.8993897
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/58.jpg",
    "menuImages": [
      "/menus/new-times-2-04-08-25.png"
    ]
  },
  {
    "id": "59",
    "name": "Culture Boat",
    "location": "Utrecht",
    "address": "Wittevrouwensingel 206, Utrecht 3572 CE",
    "coordinates": [
      52.0969826,
      5.1267368
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Utrecht",
    "image": "/images/shops/59.jpg",
    "menuImages": [
      "/menus/culture-boat-23-09-25.png"
    ]
  },
  {
    "id": "60",
    "name": "New York",
    "location": "Rotterdam",
    "address": "Paul Krugerstraat 42, Rotterdam 3072 GM",
    "coordinates": [
      51.902108,
      4.5027096
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "Wv0z4jp-o_I"
    ],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/60.jpg",
    "menuImages": [
      "/menus/new-york-28-10-25.png"
    ]
  },
  {
    "id": "61",
    "name": "Shiva",
    "location": "Tilburg",
    "address": "Koestraat 12, Tilburg 5014 ED",
    "coordinates": [
      51.5664935,
      5.0952875
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/61.jpg",
    "menuImages": [
      "/menus/shiva-28-09-25.png"
    ]
  },
  {
    "id": "62",
    "name": "Dakota",
    "location": "Nijmegen",
    "address": "Lange Hezelstraat 113a, Nijmegen 6511 CG",
    "coordinates": [
      51.8483596,
      5.8559387
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/62.jpg",
    "menuImages": [
      "/menus/dakota-21-07-25.png"
    ]
  },
  {
    "id": "63",
    "name": "Siberie",
    "location": "Amsterdam",
    "address": "Brouwersgracht 11, 1015 GA Amsterdam",
    "coordinates": [
      52.378892,
      4.893038
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus",
      "Good Prices",
      "Historic"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/63.jpg",
    "menuImages": [
      "/menus/siberie-27-11-25.jpg",
      "/menus/siberie-26-08-25.png"
    ],
    "reviews": [
      {
        "strain": "Blue Sherbet",
        "score": "**Crazy** (Might be the strain of the year, gassy, creamy, fruity)",
        "approval": "**Crazy** (Might be the strain of the year, gassy, creamy, fruity)",
        "videoId": "hLoKkJbz4YQ",
        "videoTitle": "4 Local Cali Flowers From The Best Coffeeshop in Amsterdam"
      },
      {
        "strain": "Blueberry Pie",
        "score": "**Approved** (Super nice, nice combustion, love it)",
        "approval": "**Approved** (Super nice, nice combustion, love it)",
        "videoId": "hLoKkJbz4YQ",
        "videoTitle": "4 Local Cali Flowers From The Best Coffeeshop in Amsterdam"
      },
      {
        "strain": "Chocolate Diesel",
        "score": "**Approved** (Very nice taste, quality of the butts is very nice, smokes great)",
        "approval": "**Approved** (Very nice taste, quality of the butts is very nice, smokes great)",
        "videoId": "hLoKkJbz4YQ",
        "videoTitle": "4 Local Cali Flowers From The Best Coffeeshop in Amsterdam"
      },
      {
        "strain": "Mochi Gelato",
        "score": "**I love it** (Spiny tasty fruity)",
        "approval": "**I love it** (Spiny tasty fruity)",
        "videoId": "hLoKkJbz4YQ",
        "videoTitle": "4 Local Cali Flowers From The Best Coffeeshop in Amsterdam"
      },
      {
        "strain": "Blow Pop (Cali strain)",
        "score": "**8.7 approved** (Smokes like a €35 Tenko, super fat O-ring, chalk-white ash, super high THC content)",
        "approval": "**8.7 approved** (Smokes like a €35 Tenko, super fat O-ring, chalk-white ash, super high THC content)",
        "videoId": "nknpY8Tv2ck",
        "videoTitle": "Blanco Cookies and Blow Pop From One Of The Best Coffeeshops in Amsterdam"
      },
      {
        "strain": "Blanco Cookies",
        "score": "**8.0** (Very positively surprised, smokes super good, soft, effect is strong and immediate, nice fat oil ring)",
        "approval": "**8.0** (Very positively surprised, smokes super good, soft, effect is strong and immediate, nice fat oil ring)",
        "videoId": "nknpY8Tv2ck",
        "videoTitle": "Blanco Cookies and Blow Pop From One Of The Best Coffeeshops in Amsterdam"
      },
      {
        "strain": "Blanco Cookies",
        "score": "**8.0** (Very positively surprised, smokes super good, soft, nice fat oil ring)",
        "approval": "**8.0** (Very positively surprised, smokes super good, soft, nice fat oil ring)",
        "videoId": "nknpY8Tv2ck",
        "videoTitle": "Blanco Cookies and Blow Pop From One Of The Best Coffeeshops in Amsterdam"
      },
      {
        "strain": "Blow Pop (Cali strain)",
        "score": "**8.7 approved** (Smokes like a €35 Tenko, super fat O-ring, chalk-white ash)",
        "approval": "**8.7 approved** (Smokes like a €35 Tenko, super fat O-ring, chalk-white ash)",
        "videoId": "nknpY8Tv2ck",
        "videoTitle": "Blanco Cookies and Blow Pop From One Of The Best Coffeeshops in Amsterdam"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "64",
    "name": "No Limit",
    "location": "Den Haag",
    "address": "Witte de Withstraat 4a, The Hague 2518 CT",
    "coordinates": [
      52.080708,
      4.2962318
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/64.jpg",
    "menuImages": [
      "/menus/no-limit-01-02-25.png"
    ]
  },
  {
    "id": "65",
    "name": "Ankara",
    "location": "Emmen",
    "address": "Minister Kanstraat 3, Emmen 7811 GN",
    "coordinates": [
      52.7871884,
      6.8951448
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Emmen",
    "image": "/images/shops/65.jpg",
    "menuImages": [
      "/menus/ankara-09-09-25.png"
    ]
  },
  {
    "id": "66",
    "name": "Dampkring",
    "location": "Amsterdam",
    "address": "Handboogstraat 29, 1012 XM Amsterdam",
    "coordinates": [
      52.3677518,
      4.8905051
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Historic",
      "Unique Vibe",
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [
      "NO5dpip7w_g",
      "0EjDCMu-0Jg"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/66.jpg",
    "menuImages": [
      "/menus/dampkring-12-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Zootopia",
        "score": "**Absolutely approved** (Ash looks like perfect, 10 out of 10)",
        "approval": "**Absolutely approved** (Ash looks like perfect, 10 out of 10)",
        "videoId": "HS0KMEI11M8",
        "videoTitle": "This Coffeeshop Sells Excellent Products Since Decades"
      },
      {
        "strain": "Rainbow Guava",
        "score": "**Magnific brand approved** (Looks super nice, excellent butts, service magnific, good vibes)",
        "approval": "**Magnific brand approved** (Looks super nice, excellent butts, service magnific, good vibes)",
        "videoId": "NO5dpip7w_g",
        "videoTitle": "Tasting The Rainbow at Coffeeshop Dampkring"
      },
      {
        "strain": "Rainbow Guava",
        "score": "**Magnific brand approved** (Looks super nice, excellent butts, good vibes)",
        "approval": "**Magnific brand approved** (Looks super nice, excellent butts, good vibes)",
        "videoId": "NO5dpip7w_g",
        "videoTitle": "Tasting The Rainbow at Coffeeshop Dampkring"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "67",
    "name": "The Hit",
    "location": "Amsterdam",
    "address": "Rusland 16, Amsterdam 1012 CL",
    "coordinates": [
      52.3700049,
      4.896309
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": ["nCorJMnfO8M",
      "6anPRuuA-SE"],
    "shortIds": [
      "583cfdPXeew"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/67.jpg",
    "menuImages": [
      "/menus/the-hit-02-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Permanent Candy",
        "score": "**9.5** (Spectacular)",
        "approval": "**9.5** (Spectacular)",
        "videoId": "1_uRD33s_ws",
        "videoTitle": "This Shop's Loose Cali Menu's Highest Price Is 15 Euro"
      },
      {
        "strain": "Black Cherry Gelato",
        "score": "**9.4** (Super clean, very impressed)",
        "approval": "**9.4** (Super clean, very impressed)",
        "videoId": "e8ygIW0e_js",
        "videoTitle": "You Need To Go To Amsterdam Now - The FLower At The Moment Is Incredible"
      },
      {
        "strain": "Blue Lemon Mochi",
        "score": "**Highly approved**",
        "approval": "**Highly approved**",
        "videoId": "9g9nYLEDgO8",
        "videoTitle": "I Never Thought I'd Say It But I Like Giraffe 🐱"
      },
      {
        "strain": "Gyr Pussy",
        "score": "**Definitely approved**",
        "approval": "**Definitely approved**",
        "videoId": "9g9nYLEDgO8",
        "videoTitle": "I Never Thought I'd Say It But I Like Giraffe 🐱"
      },
      {
        "strain": "Bubba White runs (Frozen sift/Chocolate bar)",
        "score": "**Absolutely approved**",
        "approval": "**Absolutely approved**",
        "videoId": "v3rOTP8rdCk",
        "videoTitle": "I Have Finally Tested Amsterdam Coffeeshops' Famous Chocolate"
      },
      {
        "strain": "Cheesecake (Chocolate bar)",
        "score": "(Implied high approval based on quality and Mountain Monkeys maker)",
        "approval": "(Implied high approval based on quality and Mountain Monkeys maker)",
        "videoId": "v3rOTP8rdCk",
        "videoTitle": "I Have Finally Tested Amsterdam Coffeeshops' Famous Chocolate"
      },
      {
        "strain": "Blue Sherbet",
        "score": "**7.5** (Smokes super smooth, same source as Shopeito but €2.50 more expensive, still a good option)",
        "approval": "**7.5** (Smokes super smooth, same source as Shopeito but €2.50 more expensive, still a good option)",
        "videoId": "RJyW1doURog",
        "videoTitle": "This Used To Be A Plug - How Is Their Blue Sherbert?"
      },
      {
        "strain": "Blue Sherbet",
        "score": "**7.5** (Smokes super smooth, good option)",
        "approval": "**7.5** (Smokes super smooth, good option)",
        "videoId": "RJyW1doURog",
        "videoTitle": "This Used To Be A Plug - How Is Their Blue Sherbert?"
      },
      {
        "strain": "Blue Lemon Mochi",
        "score": "**Highly approved** (Inhale extremely clean, fat oil ring)",
        "approval": "**Highly approved** (Inhale extremely clean, fat oil ring)",
        "videoId": "9g9nYLEDgO8",
        "videoTitle": "I Never Thought I'd Say It But I Like Giraffe 🐱"
      },
      {
        "strain": "Bubba White runs (Frozen sift/Chocolate bar)",
        "score": "**Absolutely approved** (Great taste)",
        "approval": "**Absolutely approved** (Great taste)",
        "videoId": "v3rOTP8rdCk",
        "videoTitle": "I Have Finally Tested Amsterdam Coffeeshops' Famous Chocolate"
      }
    ],
    "coraxApproved": true,
    "recommended": true
  },
  {
    "id": "68",
    "name": "Dees Cafe",
    "location": "Groningen",
    "address": "Papengang 3, Groningen 9711 PA",
    "coordinates": [
      53.2174324,
      6.5704369
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/68.jpg",
    "menuImages": [
      "/menus/dees-cafe-20-07-25.png"
    ]
  },
  {
    "id": "69",
    "name": "Anna",
    "location": "Purmerend",
    "address": "Gedempte Singelgracht 19, Purmerend 1441 AN",
    "coordinates": [
      52.5107891,
      4.9457493
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "xxw1KjwHFCI",
      "4IPF1do1I5A",
      "aESVM-DnwtU"
    ],
    "description": "Coffeeshop located in Purmerend",
    "image": "/images/shops/69.jpg",
    "menuImages": [
      "/menus/anna-14-01-25.png"
    ]
  },
  {
    "id": "70",
    "name": "Skunk Station",
    "location": "Roermond",
    "address": "Randweg 3, Roermond 6045 JK",
    "coordinates": [
      51.1636462,
      6.0559517
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Roermond",
    "image": "/images/shops/70.svg",
    "menuImages": [
      "/menus/skunk-station-30-08-25.png"
    ]
  },
  {
    "id": "71",
    "name": "Demo",
    "location": "Den Haag",
    "address": "Herenstraat 8c, The Hague 2511 EA",
    "coordinates": [
      52.0802467,
      4.3171821
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/71.jpg",
    "menuImages": [
      "/menus/demo-28-02-25.png"
    ]
  },
  {
    "id": "72",
    "name": "Sky High",
    "location": "Rotterdam",
    "address": "Nieuwe Binnenweg 59, Rotterdam 3014 GD",
    "coordinates": [
      51.9165286,
      4.4699866
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/72.jpg",
    "menuImages": [
      "/menus/sky-high-30-01-25.png"
    ]
  },
  {
    "id": "73",
    "name": "Dizzy Duck Downtown",
    "location": "Den Haag",
    "address": "Fluwelen Burgwal 1-C, The Hague 2511 CH",
    "coordinates": [
      52.0800153,
      4.3182899
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/73.jpg",
    "menuImages": [
      "/menus/dizzy-duck-downtown-20-10-25.png"
    ]
  },
  {
    "id": "74",
    "name": "Atlas",
    "location": "Amsterdam",
    "address": "Parlevinker 8, 1034 PZ, Amsterdam",
    "coordinates": [
      52.4115426,
      4.9222305
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/74.jpg",
    "menuImages": [
      "/menus/atlas-29-09-25.png"
    ]
  },
  {
    "id": "75",
    "name": "Dizzy Duck",
    "location": "Den Haag",
    "address": "Trompstraat 210, 2518 BR Den Haag",
    "coordinates": [
      52.0837055,
      4.2991208
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/75.jpg",
    "menuImages": [
      "/menus/dizzy-duck-18-11-25.png"
    ]
  },
  {
    "id": "76",
    "name": "Hunters Haarlem",
    "location": "Haarlem",
    "address": "Schoterweg 66, 2021 HP Haarlem",
    "coordinates": [
      52.3925236,
      4.6405476
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/76.svg",
    "menuImages": [
      "/menus/hunters-haarlem-16-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Blue Soap",
        "score": "**Okay** (Not my favorite)",
        "approval": "**Okay** (Not my favorite)",
        "videoId": "hzJVrSzvsoQ",
        "videoTitle": "First Time Visiting This Huge Coffeeshop Chain"
      },
      {
        "strain": "Black Cherry Gelato",
        "score": "**Absolutely approved** (Way better)",
        "approval": "**Absolutely approved** (Way better)",
        "videoId": "hzJVrSzvsoQ",
        "videoTitle": "First Time Visiting This Huge Coffeeshop Chain"
      },
      {
        "strain": "Exodus Cheese",
        "score": "Smells awesome, gives old cheese vibes",
        "approval": "Smells awesome, gives old cheese vibes",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "77",
    "name": "Old Church 2",
    "location": "Amsterdam",
    "address": "Amstel 8, 1017 AA Amsterdam",
    "coordinates": [
      52.3669671,
      4.8941617
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Historic"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/77.jpg",
    "menuImages": [
      "/menus/old-church-2-23-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Crumbled Lime (Legal experiment)",
        "score": "**9.2 approved** (Crazy, absolutely fat oil ring, tastes like a limey diesel, gives old school vibes)",
        "approval": "**9.2 approved** (Crazy, absolutely fat oil ring, tastes like a limey diesel, gives old school vibes)",
        "videoId": "OWBy8NKW9Ms",
        "videoTitle": "Crazy Crumbled Lime Dessert From A Coffeeshop in Amsterdam"
      },
      {
        "strain": "Wizard Trees Zang Banger (Cup winner)",
        "score": "**7.6** (Burning very clean, oil ring is super nice/fat, but tops aren't as strong as expected for the high price)",
        "approval": "**7.6** (Burning very clean, oil ring is super nice/fat, but tops aren't as strong as expected for the high price)",
        "videoId": "JYjIfFKf6Y4",
        "videoTitle": "Wizard Trees Cup Winner From The Old Church"
      },
      {
        "strain": "Wizard Trees Zang Banger (Cup winner)",
        "score": "**7.6** (Burning very clean, oil ring is super nice/fat, but tops aren't as strong as expected)",
        "approval": "**7.6** (Burning very clean, oil ring is super nice/fat, but tops aren't as strong as expected)",
        "videoId": "JYjIfFKf6Y4",
        "videoTitle": "Wizard Trees Cup Winner From The Old Church"
      },
      {
        "strain": "Exodus Cheese",
        "score": "Proper, smell nice, looks nice, very curious",
        "approval": "Proper, smell nice, looks nice, very curious",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "78",
    "name": "Sky",
    "location": "Breda",
    "address": "Haagweg 56, Breda 4814 GE",
    "coordinates": [
      51.5844248,
      4.7600157
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/78.jpg",
    "menuImages": [
      "/menus/sky-31-10-25.png"
    ]
  },
  {
    "id": "79",
    "name": "Hunter's West",
    "location": "Amsterdam",
    "address": "Orteliusstraat 193, Amsterdam 1056 NP",
    "coordinates": [
      52.3699972,
      4.8490427
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/79.jpg",
    "menuImages": [
      "/menus/hunters-west-04-08-25.png"
    ]
  },
  {
    "id": "80",
    "name": "DNA",
    "location": "Amsterdam",
    "address": "Achillesstraat 104, 1076 RH Amsterdam",
    "coordinates": [
      52.3449975,
      4.8641884
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "cDRL5ofqJwM"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/80.jpg",
    "menuImages": [
      "/menus/dna-22-09-25.png"
    ]
  },
  {
    "id": "81",
    "name": "Omigo",
    "location": "Arnhem",
    "address": "Beekstraat 83, Arnhem 6811 DX",
    "coordinates": [
      51.9811546,
      5.9112041
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/81.jpg",
    "menuImages": [
      "/menus/omigo-06-02-25.png"
    ]
  },
  {
    "id": "82",
    "name": "Slow Motion",
    "location": "Maastricht",
    "address": "Bourgognestraat 10a, Maastricht 6221 BX",
    "coordinates": [
      50.848794,
      5.7041775
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/82.jpg",
    "menuImages": [
      "/menus/slow-motion-06-03-25.png"
    ]
  },
  {
    "id": "83",
    "name": "Coffeeshop Oost",
    "location": "Amsterdam",
    "address": "3e Oosterparkstraat 73, Amsterdam 1091 JV",
    "coordinates": [
      52.35640285,
      4.92080397
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "1LVHf_41jEQ",
      "Rm3cC3dRfmE",
      "mm-IwcBRMJQ",
      "7dMLJkR5nv8"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/83.jpg",
    "menuImages": [
      "/menus/coffeeshop-oost-27-11-25.jpg",
      "/menus/coffeeshop-oost-12-08-25.png"
    ]
  },
  {
    "id": "84",
    "name": "Doctor Green",
    "location": "Den Haag",
    "address": "Herenstraat 7, The Hague 2511 CZ",
    "coordinates": [
      52.0800022,
      4.3169097
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/84.jpg",
    "menuImages": [
      "/menus/doctor-green-23-11-25.png"
    ]
  },
  {
    "id": "85",
    "name": "Hunter's Rembrandtsquare",
    "location": "Amsterdam",
    "address": "Utrechtsestraat 14, 1017 VN Amsterdam",
    "coordinates": [
      52.3654806,
      4.8975372
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/85.jpg",
    "menuImages": [
      "/menus/hunters-rembrandtsquare-19-05-25.png"
    ]
  },
  {
    "id": "86",
    "name": "Tha Dogg House",
    "location": "Amsterdam",
    "address": "Marnixstraat 333, Amsterdam 1016 TC",
    "coordinates": [
      52.3726966,
      4.8761179
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/86.jpg",
    "menuImages": [
      "/menus/tha-dogg-house-03-08-25.png"
    ]
  },
  {
    "id": "87",
    "name": "Hunter's Zandvoort",
    "location": "Zandvoort",
    "address": "Stationsstraat 9 - 11, 2042 LD, Zandvoort",
    "coordinates": [
      52.3748378,
      4.5294383
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Zandvoort",
    "image": "/images/shops/87.jpg",
    "menuImages": [
      "/menus/hunters-zandvoort-24-09-25.png"
    ]
  },
  {
    "id": "88",
    "name": "Smokerdam",
    "location": "Amsterdam",
    "address": "Vechtstraat 63, 1079 JA Amsterdam",
    "coordinates": [
      52.3459957,
      4.906525
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/88.jpg",
    "menuImages": [
      "/menus/smokerdam-16-09-25.png"
    ]
  },
  {
    "id": "89",
    "name": "Dolphins",
    "location": "Amsterdam",
    "address": "Kerkstraat 39, 1017 GB Amsterdam",
    "coordinates": [
      52.3656175,
      4.8852579
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/89.jpg",
    "menuImages": [
      "/menus/dolphins-08-11-25.png"
    ]
  },
  {
    "id": "90",
    "name": "Hunter's Downtown",
    "location": "Amsterdam",
    "address": "Utrechtsestraat 14, Amsterdam 1017 VN",
    "coordinates": [
      52.3654806,
      4.8975372
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/90.jpg",
    "menuImages": [
      "/menus/hunter-s-downtown-24-11-25.jpg",
      "/menus/hunters-downtown-19-08-25.png"
    ]
  },
  {
    "id": "91",
    "name": "Smokery",
    "location": "Wormerveer",
    "address": "Marktstraat 33, Wormerveer 1521 DW",
    "coordinates": [
      52.4929587,
      4.789355
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Wormerveer",
    "image": "/images/shops/91.jpg",
    "menuImages": [
      "/menus/smokery-27-09-25.png"
    ]
  },
  {
    "id": "92",
    "name": "Bagheera",
    "location": "Amsterdam",
    "address": "Kloveniersburgwal 60, Amsterdam 1012 CX",
    "coordinates": [
      52.3700453,
      4.8973656
    ],
    "rating": 0,
    "tags": [
      "Top Pick"
    ],
    "videoIds": [],
    "shortIds": [
      "JUDFJ1pdrm8",
      "ztWVdTc3Js0",
      "0HMfZvpIbZ8",
      "qfHv91vepBQ",
      "fjnnJAS1gus",
      "scQKBbEjArg",
      "qsYZAV71qSQ",
      "mBJi1Yx7AKU"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/92.jpg",
    "menuImages": [
      "/menus/bagheera-02-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Blue Z",
        "score": "**9.1** (Almost immaculate, especially for the price)",
        "approval": "**9.1** (Almost immaculate, especially for the price)",
        "videoId": "qfHv91vepBQ",
        "videoTitle": "Bagheera With Some Blue Z For 15"
      },
      {
        "strain": "Lemon Bubble",
        "score": "**9.2** (Absolutely crazy, perfect combination, Absolutely approved)",
        "approval": "**9.2** (Absolutely crazy, perfect combination, Absolutely approved)",
        "videoId": "6GW-s_yGR5Y",
        "videoTitle": "Found A New Alternative For When My Amnesia Is Out Of Stock"
      },
      {
        "strain": "Cotton Candy",
        "score": "**7.2** (A little bit scratchy)",
        "approval": "**7.2** (A little bit scratchy)",
        "videoId": "0HMfZvpIbZ8",
        "videoTitle": "More From Coffeeshop Bagheera's New Menu"
      },
      {
        "strain": "Miracle Mints",
        "score": "**Highly approved**",
        "approval": "**Highly approved**",
        "videoId": "6KpeMKNqhpA",
        "videoTitle": "This Amsterdam Coffeeshop Just Can't Stop Winning"
      },
      {
        "strain": "Tpie Birds Fizzy Oreoless (Dab)",
        "score": "**Absolute recommended**",
        "approval": "**Absolute recommended**",
        "videoId": "ztWVdTc3Js0",
        "videoTitle": "I Got Some Magic Honey From Bagheera's New Menu"
      },
      {
        "strain": "Trump",
        "score": "Looks very nice, permanent markerish, smells gassy",
        "approval": "Looks very nice, permanent markerish, smells gassy",
        "videoTitle": ""
      },
      {
        "strain": "Kosher Kush",
        "score": "Smells pretty nice, looks good, way better than Rocket's",
        "approval": "Smells pretty nice, looks good, way better than Rocket's",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "93",
    "name": "Hunter's North - Papaverweg",
    "location": "Amsterdam",
    "address": "Papaverweg 2, Amsterdam 1032 KH",
    "coordinates": [
      52.3934497,
      4.9129591
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/93.jpg",
    "menuImages": [
      "/menus/hunters-north-papaverweg-02-10-25.png"
    ]
  },
  {
    "id": "94",
    "name": "Smokey",
    "location": "Amsterdam",
    "address": "Rembrandtplein 24, 1017 CV Amsterdam",
    "coordinates": [
      52.3656552,
      4.8964012
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/94.svg",
    "menuImages": [
      "/menus/smokey-02-02-25.png"
    ]
  },
  {
    "id": "95",
    "name": "The Otherside",
    "location": "Amsterdam",
    "address": "Reguliersdwarsstraat 6, 1017 BM Amsterdam",
    "coordinates": [
      52.3667758,
      4.8892531
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/95.jpg",
    "menuImages": [
      "/menus/the-otherside-30-07-25.png"
    ]
  },
  {
    "id": "96",
    "name": "Balboa Family",
    "location": "Amsterdam",
    "address": "Halvemaansteeg 1, 1017 CR Amsterdam",
    "coordinates": [
      52.3668215,
      4.8958891
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/96.jpg",
    "menuImages": [
      "/menus/balboa-family-11-09-25.png"
    ]
  },
  {
    "id": "97",
    "name": "Hunter's North - Waterlandplein",
    "location": "Amsterdam",
    "address": "Waterlandplein 7, Amsterdam 1024 LL",
    "coordinates": [
      52.3923061,
      4.9563296
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/97.jpg",
    "menuImages": [
      "/menus/hunters-north-waterlandplein-25-06-25.png"
    ]
  },
  {
    "id": "98",
    "name": "Het Ballonnetje",
    "location": "Amsterdam",
    "address": "Roetersstraat 12, 1018 WD Amsterdam",
    "coordinates": [
      52.3634565,
      4.9104761
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Good Prices"
    ],
    "videoIds": [
      "mcoGoW1D3Go"
    ],
    "shortIds": [
      "rDXtBTm8elA",
      "5naLKfFe9l0"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/98.jpg",
    "menuImages": [
      "/menus/het-ballonnetje-31-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Blue Nerds",
        "score": "**Really really like this** (Implied strong approval)",
        "approval": "**Really really like this** (Implied strong approval)",
        "videoId": "5E_mU5IoDuk",
        "videoTitle": "A Good Traditional Dutch Coffeeshop With Consistently Good Products"
      },
      {
        "strain": "Original Z (Local Menu)",
        "score": "€15, smells super nice",
        "approval": "€15, smells super nice",
        "videoTitle": ""
      },
      {
        "strain": "Rainbow Runtz",
        "score": "Stanks so bad, **very hyped** (Killer)",
        "approval": "Stanks so bad, **very hyped** (Killer)",
        "videoTitle": ""
      }
    ],
    "coraxApproved": true
  },
  {
    "id": "99",
    "name": "Hunter's Rotterdam",
    "location": "Rotterdam",
    "address": "Henegouwerlaan 73, Rotterdam 3021 CT",
    "coordinates": [
      51.9196468,
      4.4629857
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/99.jpg",
    "menuImages": [
      "/menus/hunters-rotterdam-07-11-25.png"
    ]
  },
  {
    "id": "100",
    "name": "Double AA",
    "location": "Leiden",
    "address": "Nieuwe Beestenmarkt 5, 2312 CG Leiden",
    "coordinates": [
      52.1631766,
      4.4862325
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Leiden",
    "image": "/images/shops/100.jpg",
    "menuImages": [
      "/menus/double-aa-01-08-25.png"
    ]
  },
  {
    "id": "101",
    "name": "de Overkant Hortus",
    "location": "Amsterdam",
    "address": "Nieuwe Herengracht 71, 1011 RR Amsterdam",
    "coordinates": [
      52.3673301,
      4.9065076
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/101.jpg",
    "menuImages": [
      "/menus/de-overkant-hortus-26-08-25.png"
    ]
  },
  {
    "id": "102",
    "name": "Smoky",
    "location": "Maastricht",
    "address": "Maaspromenade 13, Maastricht 6211 HS",
    "coordinates": [
      50.8528776,
      5.6946306
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/102.jpg",
    "menuImages": [
      "/menus/smoky-18-07-25.png"
    ]
  },
  {
    "id": "103",
    "name": "Balou",
    "location": "Amsterdam",
    "address": "Halvemaansteeg 5, 1017 CR Amsterdam",
    "coordinates": [
      52.3667407,
      4.8959047
    ],
    "rating": 0,
    "tags": [
      "Good Prices"
    ],
    "videoIds": [],
    "shortIds": [
      "a4GZxJZwVdE",
      "CA7L3tE0vZQ",
      "qvlFjJFd-rc",
      "KpDPsvIrVK8",
      "cph41ts544c",
      "R4TUIPnHZTY",
      "hP9wXiWy7fo",
      "3Z4SVbrL8tI"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/103.jpg",
    "menuImages": [
      "/menus/balou-02-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Ztopia",
        "score": "**Very good Z** (I like it)",
        "approval": "**Very good Z** (I like it)",
        "videoId": "a4GZxJZwVdE",
        "videoTitle": "Another Z From Balou But For Less Than Half The Price"
      },
      {
        "strain": "Lemon Cherry Gelato (LCG)",
        "score": "**Absolutely approved**",
        "approval": "**Absolutely approved**",
        "videoId": "rIsdIY7e58w",
        "videoTitle": "Can You Still Find Some Proper LCG in 2025?"
      },
      {
        "strain": "White Truffles",
        "score": "**Absolutely approved** (Absolutely love the taste)",
        "approval": "**Absolutely approved** (Absolutely love the taste)",
        "videoId": "B6SU4jE3Ogo",
        "videoTitle": "Crazy Tasting Flower"
      },
      {
        "strain": "Zillium",
        "score": "Highly positive (Incredible aroma, so flavorful)",
        "approval": "Highly positive (Incredible aroma, so flavorful)",
        "videoId": "Y-ydfCNEKhs",
        "videoTitle": "ONE IN A ZILLION"
      },
      {
        "strain": "Permanent Marker",
        "score": "**Definitely gets an approved**",
        "approval": "**Definitely gets an approved**",
        "videoId": "qvlFjJFd-rc",
        "videoTitle": "The Next Permanent Marker In The Test: Coffeeshop Balou Amsterdam"
      },
      {
        "strain": "Tropicana Cherry",
        "score": "**Absolutely approved** (Very fine and pure)",
        "approval": "**Absolutely approved** (Very fine and pure)",
        "videoId": "D0P15FPVIEI",
        "videoTitle": "Very Fine And Smooth Taste For The Most Distinguished Gentle(wo)men"
      },
      {
        "strain": "Zillium",
        "score": "**Highly positive** (Incredible aroma, so flavorful)",
        "approval": "**Highly positive** (Incredible aroma, so flavorful)",
        "videoId": "Y-ydfCNEKhs",
        "videoTitle": "ONE IN A ZILLION"
      },
      {
        "strain": "Baking Bad Chocolate Balls (Rosin infused edible)",
        "score": "**Fucking awesome taste**, very confident they're going to be good",
        "approval": "**Fucking awesome taste**, very confident they're going to be good",
        "videoTitle": ""
      },
      {
        "strain": "Dantis Inferno X White Truffel",
        "score": "Pretty expensive, pretty frosty",
        "approval": "Pretty expensive, pretty frosty",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "104",
    "name": "The Snoop",
    "location": "Haarlem",
    "address": "Rijksstraatweg 198, Haarlem 2022 DH",
    "coordinates": [
      52.4071135,
      4.649843
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/104.jpg",
    "menuImages": [
      "/menus/the-snoop-18-05-25.png"
    ]
  },
  {
    "id": "105",
    "name": "Oya",
    "location": "Gouda",
    "address": "Lange Groenendaal 104, 2801 LV Gouda",
    "coordinates": [
      52.0104644,
      4.7074187
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Gouda",
    "image": "/images/shops/105.svg",
    "menuImages": [
      "/menus/oya-04-11-25.png"
    ]
  },
  {
    "id": "106",
    "name": "Jamaica",
    "location": "Nijmegen",
    "address": "van Welderenstraat 96, 6522 MS, Nijmegen",
    "coordinates": [
      51.8430694,
      5.8627182
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/106.jpg",
    "menuImages": [
      "/menus/jamaica-27-10-25.png"
    ]
  },
  {
    "id": "107",
    "name": "BarberShop",
    "location": "Hellevoetsluis",
    "address": "Kerkstraat 24, Hellevoetsluis 3221 AG",
    "coordinates": [
      51.8228018,
      4.130285
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hellevoetsluis",
    "image": "/images/shops/107.jpg",
    "menuImages": [
      "/menus/barbershop-14-07-25.png"
    ]
  },
  {
    "id": "108",
    "name": "Dreadlock",
    "location": "Nijmegen",
    "address": "Vlaamsegas 40, Nijmegen 6511 HR",
    "coordinates": [
      51.84374,
      5.8627172
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/108.jpg",
    "menuImages": [
      "/menus/dreadlock-18-07-25.png"
    ]
  },
  {
    "id": "109",
    "name": "Solo",
    "location": "Amsterdam",
    "address": "Korte Koningsstraat 2, 1011 GA Amsterdam",
    "coordinates": [
      52.3718645,
      4.9026614
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus",
      "Unique Vibe"
    ],
    "videoIds": [
      "mcoGoW1D3Go"
    ],
    "shortIds": [
      "pNltP8J9Bhc",
      "ipc_VZqIqAQ",
      "4IPF1do1I5A",
      "VLhy5CFkuZc"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/109.jpg",
    "menuImages": [
      "/menus/solo-20-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Asai Zoda",
        "score": "**Absolute approved** (Very smooth, soft, sweet)",
        "approval": "**Absolute approved** (Very smooth, soft, sweet)",
        "videoId": "UVCZb3i-6Y4",
        "videoTitle": "This Coffeeshop Is Just Behind The Red Light District and Delivers Since Years, This Coffeeshop Is Just Behind The Red Light District and Delivers Since Years - Censored Version"
      },
      {
        "strain": "Skittles",
        "score": "**My favorite Skittles** (Absolute sweetness, softness, I love it)",
        "approval": "**My favorite Skittles** (Absolute sweetness, softness, I love it)",
        "videoId": "ipc_VZqIqAQ",
        "videoTitle": "Bought These Three Fruity Sweets At Coffeeshop Solo Amsterdam"
      },
      {
        "strain": "Tropicana Cherry",
        "score": "**Fucking awesome, I love it** (Reviewer notes it is likely renamed diesel)",
        "approval": "**Fucking awesome, I love it** (Reviewer notes it is likely renamed diesel)",
        "videoId": "ipc_VZqIqAQ",
        "videoTitle": "Bought These Three Fruity Sweets At Coffeeshop Solo Amsterdam"
      },
      {
        "strain": "Sunset Sherbet",
        "score": "**I still rather go to Solo** (95% of the quality of the 7 Heaven version, tastes way fruiter, but misses the sherbet taste)",
        "approval": "**I still rather go to Solo** (95% of the quality of the 7 Heaven version, tastes way fruiter, but misses the sherbet taste)",
        "videoId": "ipc_VZqIqAQ",
        "videoTitle": "Bought These Three Fruity Sweets At Coffeeshop Solo Amsterdam"
      },
      {
        "strain": "Pink Crunts",
        "score": "**5.7** (Mediocre weed, burning relatively good but pretty dark, felt it in the throat, no comparison with their Skittles)",
        "approval": "**5.7** (Mediocre weed, burning relatively good but pretty dark, felt it in the throat, no comparison with their Skittles)",
        "videoId": "pNltP8J9Bhc",
        "videoTitle": "Zkittles Was Out At Solo So I Got This"
      },
      {
        "strain": "Frozen Skittles Hash (Hush)",
        "score": "**Absolute crazy** (Smell is incredible, reminds reviewer of caramel cream/caramellos, very old schoolish but also new schoolish)",
        "approval": "**Absolute crazy** (Smell is incredible, reminds reviewer of caramel cream/caramellos, very old schoolish but also new schoolish)",
        "videoId": "I34QwW_jrYk",
        "videoTitle": "Mad Frozen Z Cali Chocolate Bar"
      },
      {
        "strain": "Pink Crunts",
        "score": "**5.7** (Mediocre weed, burning relatively good but pretty dark, felt it in the throat)",
        "approval": "**5.7** (Mediocre weed, burning relatively good but pretty dark, felt it in the throat)",
        "videoId": "pNltP8J9Bhc",
        "videoTitle": "Zkittles Was Out At Solo So I Got This"
      },
      {
        "strain": "Tropicana Cherry",
        "score": "**Fucking awesome, I love it**",
        "approval": "**Fucking awesome, I love it**",
        "videoId": "ipc_VZqIqAQ",
        "videoTitle": "Bought These Three Fruity Sweets At Coffeeshop Solo Amsterdam"
      },
      {
        "strain": "Sunset Sherbet",
        "score": "**I still rather go to Solo** (95% quality of 7 Heaven version, tastes way fruiter)",
        "approval": "**I still rather go to Solo** (95% quality of 7 Heaven version, tastes way fruiter)",
        "videoId": "ipc_VZqIqAQ",
        "videoTitle": "Bought These Three Fruity Sweets At Coffeeshop Solo Amsterdam"
      },
      {
        "strain": "Frozen Skittles Hash (Hush)",
        "score": "**Absolute crazy** (Incredible smell, old schoolish but also new schoolish)",
        "approval": "**Absolute crazy** (Incredible smell, old schoolish but also new schoolish)",
        "videoId": "I34QwW_jrYk",
        "videoTitle": "Mad Frozen Z Cali Chocolate Bar"
      },
      {
        "strain": "Gelonate (Cannabis Cup Winner, Kelly Import)",
        "score": "Super nice, nice lemony smell",
        "approval": "Super nice, nice lemony smell",
        "videoTitle": ""
      },
      {
        "strain": "Skittles",
        "score": "Smelled super nice, really really fruity",
        "approval": "Smelled super nice, really really fruity",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "110",
    "name": "Dreamland",
    "location": "Haarlem",
    "address": "Brouwersplein 44, Haarlem 2013 PH",
    "coordinates": [
      52.3813548,
      4.6216945
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "utuU8EA_KHk"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/110.svg",
    "menuImages": [
      "/menus/dreamland-27-04-25.png"
    ]
  },
  {
    "id": "111",
    "name": "Joe Cool",
    "location": "Ijmuiden",
    "address": "Kanaalstraat 25, IJmuiden 1975 BA",
    "coordinates": [
      52.4630863,
      4.5898807
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Ijmuiden",
    "image": "/images/shops/111.jpg",
    "menuImages": [
      "/menus/joe-cool-20-11-25.png"
    ]
  },
  {
    "id": "112",
    "name": "Space Ball",
    "location": "Den Haag",
    "address": "Wagenstraat 115a, The Hague 2512 AS",
    "coordinates": [
      52.0750069,
      4.3140269
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/112.jpg",
    "menuImages": [
      "/menus/space-ball-16-05-25.png"
    ]
  },
  {
    "id": "113",
    "name": "De Palm",
    "location": "Apeldoorn",
    "address": "Asselsestraat 116-118, 7311 ES Apeldoorn",
    "coordinates": [
      52.2127816,
      5.9550165
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Apeldoorn",
    "image": "/images/shops/113.jpg",
    "menuImages": [
      "/menus/de-palm-13-09-25.png"
    ]
  },
  {
    "id": "114",
    "name": "Dreams",
    "location": "Rotterdam",
    "address": "Slaghekstraat 58a, Rotterdam 3074 LN",
    "coordinates": [
      51.8974364,
      4.5114451
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "xxw1KjwHFCI",
      "Jb9iqikc_Zw",
      "Ig651bJ61Sw"
    ],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/114.svg",
    "menuImages": [
      "/menus/dreams-17-02-25.png"
    ],
    "reviews": [
      {
        "strain": "Sweet Dreams (Z and Kush mix)",
        "score": "Tastes very... (Expensive at €85/3.5g)",
        "approval": "Tastes very... (Expensive at €85/3.5g)",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "115",
    "name": "De Driemaster",
    "location": "Groningen",
    "address": "Nieuweweg 18, Groningen 9711 TD",
    "coordinates": [
      53.2184008,
      6.5745409
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/115.jpg",
    "menuImages": [
      "/menus/de-driemaster-20-07-25.png"
    ]
  },
  {
    "id": "116",
    "name": "Barneys",
    "location": "Amsterdam",
    "address": "Haarlemmerstraat 102, 1013 EW Amsterdam",
    "coordinates": [
      52.3806959,
      4.8908889
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/116.svg",
    "menuImages": [
      "/menus/barneys-11-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Sour Strawberry",
        "score": "**Absolutely highly approved**",
        "approval": "**Absolutely highly approved**",
        "videoId": "jBDC2uo5b5Y",
        "videoTitle": "This Coffeeshop Won Six Awards But How Is Their Bud"
      },
      {
        "strain": "Cherry Poppers",
        "score": "**9.3 out of 10 approved** (Immediately super white smoking, fat oil ringing, super clean)",
        "approval": "**9.3 out of 10 approved** (Immediately super white smoking, fat oil ringing, super clean)",
        "videoId": "SGs8a1CLAic",
        "videoTitle": "Coffeeshop Barney's Amsterdam Is Back In The Game"
      },
      {
        "strain": "Insane OG (B-Real's OG)",
        "score": "**8.3 out of 10** (Definitely one of the better ones, top shelf, nice oil ring, smoking super clear)",
        "approval": "**8.3 out of 10** (Definitely one of the better ones, top shelf, nice oil ring, smoking super clear)",
        "videoId": "-rQyav71EbY",
        "videoTitle": "InsaneOG: B-Real's (Cypress Hill) Own OG"
      },
      {
        "strain": "Uncle Snoop (Snoop Dogg's strain)",
        "score": "**8.6** (Super nice taste, very strong tops, fantastic smell, top shelf)",
        "approval": "**8.6** (Super nice taste, very strong tops, fantastic smell, top shelf)",
        "videoId": "73YflNrmTzA",
        "videoTitle": "Snoop Dogg's Own Flower From Barney's Amsterdam"
      },
      {
        "strain": "Cherry Poppers",
        "score": "**9.3 out of 10 approved** (Super white smoking, fat oil ringing, super clean)",
        "approval": "**9.3 out of 10 approved** (Super white smoking, fat oil ringing, super clean)",
        "videoId": "SGs8a1CLAic",
        "videoTitle": "Coffeeshop Barney's Amsterdam Is Back In The Game"
      },
      {
        "strain": "Insane OG (B-Real's OG)",
        "score": "**8.3 out of 10** (Definitely one of the better ones, top shelf, smoking super clear)",
        "approval": "**8.3 out of 10** (Definitely one of the better ones, top shelf, smoking super clear)",
        "videoId": "-rQyav71EbY",
        "videoTitle": "InsaneOG: B-Real's (Cypress Hill) Own OG"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "117",
    "name": "John and Co.",
    "location": "Hellevoetsluis",
    "address": "Stephensonweg 1, Hellevoetsluis 3225 LW",
    "coordinates": [
      51.839005,
      4.1699422
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hellevoetsluis",
    "image": "/images/shops/117.svg",
    "menuImages": [
      "/menus/john-and-co-24-07-25.png"
    ]
  },
  {
    "id": "118",
    "name": "de Baron",
    "location": "Breda",
    "address": "Boschstraat 127, 4811 GG Breda",
    "coordinates": [
      51.5915588,
      4.7847362
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/118.svg",
    "menuImages": [
      "/menus/de-baron-20-06-25.png"
    ]
  },
  {
    "id": "119",
    "name": "Paradijs",
    "location": "Breda",
    "address": "Sint Annastraat 3, Breda 4811 XK",
    "coordinates": [
      51.5886589,
      4.7781058
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/119.jpg",
    "menuImages": [
      "/menus/paradijs-20-06-25.png"
    ]
  },
  {
    "id": "120",
    "name": "Dutch Flowers",
    "location": "Hilversum",
    "address": "Leeuwenstraat 25, Hilversum 1211 ES",
    "coordinates": [
      52.225803,
      5.1792505
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hilversum",
    "image": "/images/shops/120.jpg",
    "menuImages": [
      "/menus/dutch-flowers-09-04-25.png"
    ]
  },
  {
    "id": "121",
    "name": "Join Us 2",
    "location": "Haarlem",
    "address": "Schalkwijkerstraat 23, Haarlem 2033 JB",
    "coordinates": [
      52.3752723,
      4.6437807
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/121.svg",
    "menuImages": [
      "/menus/join-us-2-30-04-25.png"
    ]
  },
  {
    "id": "122",
    "name": "Paradox",
    "location": "Amsterdam",
    "address": "1e Bloemdwarsstraat 2, 1016 KS Amsterdam",
    "coordinates": [
      52.374645,
      4.881259
    ],
    "rating": 0,
    "tags": [
      "Unique Vibe"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/122.jpg",
    "menuImages": [
      "/menus/paradox-11-09-25.png"
    ]
  },
  {
    "id": "123",
    "name": "Dutch Gold",
    "location": "Alphen Aan Den Rijn",
    "address": "Hooftstraat 96, Alphen aan den Rijn 2406 GM",
    "coordinates": [
      52.1330296,
      4.6639289
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Alphen Aan Den Rijn",
    "image": "/images/shops/123.svg",
    "menuImages": [
      "/menus/dutch-gold-11-01-25.png"
    ]
  },
  {
    "id": "124",
    "name": "Speak Easy",
    "location": "Arnhem",
    "address": "Varkensstraat 3, Arnhem 6811 GM",
    "coordinates": [
      51.9818438,
      5.9039377
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/124.jpg",
    "menuImages": [
      "/menus/speak-easy-18-07-25.png"
    ]
  },
  {
    "id": "125",
    "name": "Basjoe",
    "location": "Amsterdam",
    "address": "Kloveniersburgwal 62, 1012 CX Amsterdam",
    "coordinates": [
      52.3700093,
      4.8973511
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/125.jpg",
    "menuImages": [
      "/menus/basjoe-11-09-25.png"
    ]
  },
  {
    "id": "126",
    "name": "Pasja",
    "location": "Tilburg",
    "address": "Bredaseweg 123, 5038 NC Tilburg",
    "coordinates": [
      51.5556981,
      5.0725021
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/126.jpg",
    "menuImages": [
      "/menus/pasja-21-05-25.png"
    ]
  },
  {
    "id": "127",
    "name": "Spirit",
    "location": "Amsterdam",
    "address": "Westerstraat 121, Amsterdam 1015 LZ",
    "coordinates": [
      52.3781714,
      4.8829411
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "5uzlKxUX2js"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/127.svg",
    "menuImages": [
      "/menus/spirit-21-09-25.png"
    ],
    "reviews": [
      {
        "strain": "Jet Fuel Lab Bomba",
        "score": "€11, no label",
        "approval": "€11, no label",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "128",
    "name": "Pas Op",
    "location": "Schiedam",
    "address": "Hoofdstraat 311, Schiedam 3114 GE",
    "coordinates": [
      51.9087046,
      4.4064326
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Schiedam",
    "image": "/images/shops/128.svg",
    "menuImages": [
      "/menus/pas-op-27-10-25.png"
    ]
  },
  {
    "id": "129",
    "name": "Bazar",
    "location": "Apeldoorn",
    "address": "Marktstraat 8, 7511 LH Apeldoorn",
    "coordinates": [
      52.2145759,
      5.963918
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Apeldoorn",
    "image": "/images/shops/129.jpg",
    "menuImages": [
      "/menus/bazar-13-09-25.png"
    ]
  },
  {
    "id": "130",
    "name": "De Kade",
    "location": "Amsterdam",
    "address": "Stadionkade 107, 1076 BN Amsterdam",
    "coordinates": [
      52.3435253,
      4.86442
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/130.jpg",
    "menuImages": [
      "/menus/de-kade-13-09-25.png"
    ]
  },
  {
    "id": "131",
    "name": "Splif II",
    "location": "Purmerend",
    "address": "Achterdijk 76, Purmerend 1441 DJ",
    "coordinates": [
      52.5086338,
      4.9512353
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Purmerend",
    "image": "/images/shops/131.jpg",
    "menuImages": [
      "/menus/splif-ii-16-01-25.png"
    ]
  },
  {
    "id": "132",
    "name": "Pax de Boot",
    "location": "Breda",
    "address": "Nijverheidssingel 8, Breda 4811 VS",
    "coordinates": [
      51.590534,
      4.766057
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/132.svg",
    "menuImages": [
      "/menus/pax-de-boot-23-01-25.png"
    ]
  },
  {
    "id": "133",
    "name": "Easy Max",
    "location": "Haarlem",
    "address": "Barrevoetestraat 23, Haarlem 2011 WN",
    "coordinates": [
      52.3799621,
      4.63104
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/133.svg",
    "menuImages": [
      "/menus/easy-max-18-10-25.png"
    ]
  },
  {
    "id": "134",
    "name": "The Squad",
    "location": "Zaandam",
    "address": "Parkstraat 8, Zaandam 1503 WD",
    "coordinates": [
      52.4448126,
      4.8186722
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Zaandam",
    "image": "/images/shops/134.jpg",
    "menuImages": [
      "/menus/the-squad-26-09-25.png"
    ]
  },
  {
    "id": "135",
    "name": "Easy Times",
    "location": "Amsterdam",
    "address": "Prinsengracht 476, 1017 KG Amsterdam",
    "coordinates": [
      52.3643312,
      4.8850229
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": [
      "kW3JA08umHI",
      "fS8THioQvhU",
      "W82ua6zEh2w",
      "LKcN_LbOekI",
      "ys40nIDmptI",
      "sfr2BaAMlG4"
    ],
    "shortIds": [
      "3IrWGw6nd1U",
      "DEUQFfPJdRs"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/135.jpg",
    "menuImages": [
      "/menus/easy-times-10-09-25.png"
    ],
    "reviews": [
      {
        "strain": "Old Amsterdam Dreams (cheese and kush mix)",
        "score": "**Perfect**",
        "approval": "**Perfect**",
        "videoTitle": ""
      },
      {
        "strain": "Dreams Gold / Kosher Dreams",
        "score": "**Absolutely awesome**",
        "approval": "**Absolutely awesome**",
        "videoTitle": ""
      },
      {
        "strain": "Original Kosher Kush",
        "score": "**Original**, known for quality (Super nice batch, butts look super awesome)",
        "approval": "**Original**, known for quality (Super nice batch, butts look super awesome)",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "136",
    "name": "Kadinsky 2",
    "location": "Amsterdam",
    "address": "Zoutsteeg 14, Amsterdam 1012 LX",
    "coordinates": [
      52.3742268,
      4.8936043
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/136.jpg",
    "menuImages": [
      "/menus/kadinsky-2-08-09-25.png"
    ]
  },
  {
    "id": "137",
    "name": "de Steeg",
    "location": "Woerden",
    "address": "Rietveld 1, Woerden 3443 XA",
    "coordinates": [
      52.0867645,
      4.861474
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Woerden",
    "image": "/images/shops/137.jpg",
    "menuImages": [
      "/menus/de-steeg-21-11-25.png"
    ]
  },
  {
    "id": "138",
    "name": "Easy Going",
    "location": "Maastricht",
    "address": "Hoenderstraat 8, Maastricht 6211 EM",
    "coordinates": [
      50.8512779,
      5.6934597
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/138.jpg",
    "menuImages": [
      "/menus/easy-going-12-08-25.png"
    ]
  },
  {
    "id": "139",
    "name": "Stepping Inn",
    "location": "Heerhugowaard",
    "address": "Raadhuisstraat 12, Heerhugowaard 1701 EK",
    "coordinates": [
      52.6700696,
      4.8445542
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Heerhugowaard",
    "image": "/images/shops/139.jpg",
    "menuImages": [
      "/menus/stepping-inn-16-01-25.png"
    ]
  },
  {
    "id": "140",
    "name": "Easy Times 2",
    "location": "Amsterdam",
    "address": "Reguliersdwarsstraat 29, Amsterdam 1017 BJ",
    "coordinates": [
      52.3665552,
      4.8902393
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/140.jpg",
    "menuImages": [
      "/menus/easy-times-2-12-04-25.png"
    ]
  },
  {
    "id": "141",
    "name": "Stepping Out",
    "location": "Alkmaar",
    "address": "Ritsevoort 30, Alkmaar 1811 DP",
    "coordinates": [
      52.6303029,
      4.7427266
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Alkmaar",
    "image": "/images/shops/141.jpg",
    "menuImages": [
      "/menus/stepping-out-02-08-25.png"
    ]
  },
  {
    "id": "142",
    "name": "Katsu",
    "location": "Amsterdam",
    "address": "1e van der Helststraat 70, Amsterdam 1072 NZ",
    "coordinates": [
      52.35667,
      4.89266
    ],
    "rating": 0,
    "tags": [
      "Unique Vibe"
    ],
    "videoIds": [
      "cDRL5ofqJwM"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/142.jpg",
    "menuImages": [
      "/menus/katsu-25-10-25.png"
    ]
  },
  {
    "id": "143",
    "name": "Pink",
    "location": "Eindhoven",
    "address": "Willemstraat 35a, 5611 HB Eindhoven",
    "coordinates": [
      51.4382615,
      5.4728075
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Eindhoven",
    "image": "/images/shops/143.jpg",
    "menuImages": [
      "/menus/pink-26-05-25.png"
    ]
  },
  {
    "id": "144",
    "name": "Bij",
    "location": "Amsterdam",
    "address": "Bonairestraat 78, 1058 XL Amsterdam",
    "coordinates": [
      52.3620629,
      4.8554224
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/144.jpg",
    "menuImages": [
      "/menus/bij-04-08-25.png"
    ]
  },
  {
    "id": "145",
    "name": "Empire",
    "location": "Haarlem",
    "address": "Krocht 8, 2011 PT Haarlem",
    "coordinates": [
      52.3829071,
      4.6347896
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "qbYA72uwerA",
      "RbYyvt3yYoQ"
    ],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/145.jpg",
    "menuImages": [
      "/menus/empire-01-11-25.png"
    ],
    "detailedReview": "",
    "coraxApproved": true
  },
  {
    "id": "146",
    "name": "Espresso",
    "location": "Mijdrecht",
    "address": "Rondweg 1B, 3641 SC Mijdrecht",
    "coordinates": [
      52.208565,
      4.8698089
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Mijdrecht",
    "image": "/images/shops/146.jpg",
    "menuImages": [
      "/menus/espresso-23-08-25.png"
    ]
  },
  {
    "id": "147",
    "name": "Pit Stop",
    "location": "Alphen Aan Den Rijn",
    "address": "Hooftstraat 102, Alphen aan den Rijn 2406 GM",
    "coordinates": [
      52.1330755,
      4.6639229
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Alphen Aan Den Rijn",
    "image": "/images/shops/147.jpg",
    "menuImages": [
      "/menus/pit-stop-06-03-25.png"
    ]
  },
  {
    "id": "148",
    "name": "Birdy",
    "location": "Haarlem",
    "address": "Schoterweg 19, 2021 HZ Haarlem",
    "coordinates": [
      52.3914388,
      4.6404898
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/148.jpg",
    "menuImages": [
      "/menus/birdy-12-09-25.png"
    ]
  },
  {
    "id": "149",
    "name": "Black Sea",
    "location": "Enschede",
    "address": "Stadsgravenstraat 8, Enschede 7511 ES",
    "coordinates": [
      52.2212492,
      6.8943875
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Enschede",
    "image": "/images/shops/149.jpg",
    "menuImages": [
      "/menus/black-sea-01-11-25.png"
    ]
  },
  {
    "id": "150",
    "name": "Stud",
    "location": "Amsterdam",
    "address": "Molukkenstraat 581, Amsterdam 1095 BJ",
    "coordinates": [
      52.3587588,
      4.9410675
    ],
    "rating": 0,
    "tags": [
      "Good Prices"
    ],
    "videoIds": [],
    "shortIds": [
      "-hq7UZO5t6M"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/150.svg",
    "menuImages": [
      "/menus/stud-19-11-25.png"
    ],
    "reviews": [
      {
        "strain": "GAK (G13 x AK-47)",
        "score": "**5.0 out of 10** (Doesn't have a real thick oil ring, burns a bit stark, taste is not as good)",
        "approval": "**5.0 out of 10** (Doesn't have a real thick oil ring, burns a bit stark, taste is not as good)",
        "videoId": "-hq7UZO5t6M",
        "videoTitle": "A Viewer Recommended Me To Buy This From The Stud"
      },
      {
        "strain": "Lemon Cherry Gelato (LCG)",
        "score": "**Way better** (Than the GAK)",
        "approval": "**Way better** (Than the GAK)",
        "videoId": "-hq7UZO5t6M",
        "videoTitle": "A Viewer Recommended Me To Buy This From The Stud"
      }
    ]
  },
  {
    "id": "151",
    "name": "Blackstar",
    "location": "Amsterdam",
    "address": "Rozengracht 1a, 1016 LP Amsterdam",
    "coordinates": [
      52.373704,
      4.8825672
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/151.svg",
    "menuImages": [
      "/menus/blackstar-25-08-25.png"
    ]
  },
  {
    "id": "152",
    "name": "The Plug Utopia",
    "location": "Amsterdam",
    "address": "Nieuwezijds Voorburgwal 132, Amsterdam 1012 SH",
    "coordinates": [
      52.3750993,
      4.8916121
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/152.jpg",
    "menuImages": [
      "/menus/the-plug-utopia-22-03-25.png"
    ],
    "reviews": [
      {
        "strain": "Tropicana Cherry",
        "score": "Killer, €15/g",
        "approval": "Killer, €15/g",
        "videoTitle": ""
      }
    ],
    "coraxApproved": true
  },
  {
    "id": "153",
    "name": "Family First",
    "location": "Amsterdam",
    "address": "Amstel 36, Amsterdam 1017 AB",
    "coordinates": [
      52.3671654,
      4.903021
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": [
      "nCorJMnfO8M",
      "6anPRuuA-SE",
      "6JPXRth0fk4",
      "W82ua6zEh2w",
      "LKcN_LbOekI"
    ],
    "shortIds": [
      "al1tOcGeH9o",
      "gSSk3KxNC7c",
      "KdR6QB9BgaQ",
      "3sgNRc0Bnlk",
      "qcK1hRfTVoU",
      "PD74zOnpMBc",
      "4SEWWPD_phA"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/153.jpg",
    "menuImages": [
      "/menus/family-first-07-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Niche (Rosin)",
        "score": "**Very high quality**",
        "approval": "**Very high quality**",
        "videoId": "al1tOcGeH9o",
        "videoTitle": "Honey Tasting At Family First"
      },
      {
        "strain": "TenCo Oysters",
        "score": "**8.7** (Crazy, super fresh, fat O-ring, very nice taste—lemon balmy and sweet)",
        "approval": "**8.7** (Crazy, super fresh, fat O-ring, very nice taste—lemon balmy and sweet)",
        "videoId": "KdR6QB9BgaQ",
        "videoTitle": "Got The Freshest TenCo From Family First"
      },
      {
        "strain": "Redbeard",
        "score": "**7.0 approved** (Very berryish and fresh, clean burn, makes reviewer euphoric and talkative, but reviewer disliked the fluffy and small butts)",
        "approval": "**7.0 approved** (Very berryish and fresh, clean burn, makes reviewer euphoric and talkative, but reviewer disliked the fluffy and small butts)",
        "videoId": "npz8KH2S5a0",
        "videoTitle": "Wanted Some Z - Got Some Redbeard"
      },
      {
        "strain": "Redbeard",
        "score": "**7.0 approved** (Very berryish and fresh, clean burn, euphoric)",
        "approval": "**7.0 approved** (Very berryish and fresh, clean burn, euphoric)",
        "videoId": "npz8KH2S5a0",
        "videoTitle": "Wanted Some Z - Got Some Redbeard"
      },
      {
        "strain": "TenCo Oysters",
        "score": "**8.7** (Crazy, super fresh, fat O-ring, very nice taste)",
        "approval": "**8.7** (Crazy, super fresh, fat O-ring, very nice taste)",
        "videoId": "KdR6QB9BgaQ",
        "videoTitle": "Got The Freshest TenCo From Family First"
      },
      {
        "strain": "Redbeard (local)",
        "score": "**Absolute favorite**, constantly high quality, gives a euphoric feeling",
        "approval": "**Absolute favorite**, constantly high quality, gives a euphoric feeling",
        "videoTitle": ""
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "154",
    "name": "Sultan",
    "location": "Rotterdam",
    "address": "Eksterstraat 16 , Rotterdam 3083 XB",
    "coordinates": [
      51.8898142,
      4.4743534
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/154.jpg",
    "menuImages": [
      "/menus/sultan-10-11-25.png"
    ]
  },
  {
    "id": "155",
    "name": "Black Widow",
    "location": "Maastricht",
    "address": "Bosscherweg 165, Maastricht 6219 AA",
    "coordinates": [
      50.8625064,
      5.688255
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/155.jpg",
    "menuImages": [
      "/menus/black-widow-21-11-25.png"
    ]
  },
  {
    "id": "156",
    "name": "De Kink",
    "location": "Ede",
    "address": "De Halte 81, Ede 6711 NZ",
    "coordinates": [
      52.0423619,
      5.6676993
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Ede",
    "image": "/images/shops/156.jpg",
    "menuImages": [
      "/menus/de-kink-04-11-25.png"
    ]
  },
  {
    "id": "157",
    "name": "Superfly",
    "location": "Hoofddorp",
    "address": "Kruisweg 1043, 2131 CS Hoofddorp",
    "coordinates": [
      52.3071492,
      4.6905653
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hoofddorp",
    "image": "/images/shops/157.jpg",
    "menuImages": [
      "/menus/superfly-27-11-25.jpg",
      "/menus/superfly-26-09-25.png"
    ]
  },
  {
    "id": "158",
    "name": "De Blikken Deur",
    "location": "Deventer",
    "address": "Nieuwstraat 70, Deventer 7411 LN",
    "coordinates": [
      52.2549243,
      6.1539817
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Deventer",
    "image": "/images/shops/158.jpg",
    "menuImages": [
      "/menus/de-blikken-deur-01-04-25.png"
    ]
  },
  {
    "id": "159",
    "name": "Fantasia",
    "location": "Maastricht",
    "address": "Sint Annalaan 3a, Maastricht 6214 AA",
    "coordinates": [
      50.8491698,
      5.6767943
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/159.jpg",
    "menuImages": [
      "/menus/fantasia-05-03-25.png"
    ]
  },
  {
    "id": "160",
    "name": "Koffie en Dromen",
    "location": "Lelystad",
    "address": "Noord Stationsweg 21, Lelystad 8232 JT",
    "coordinates": [
      52.518536,
      5.471422
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Lelystad",
    "image": "/images/shops/160.jpg",
    "menuImages": [
      "/menus/koffie-en-dromen-25-01-25.png"
    ]
  },
  {
    "id": "161",
    "name": "Strain Fellows",
    "location": "Den Haag",
    "address": "Marnixstraat 59, The Hague 2518 PW",
    "coordinates": [
      52.0778806,
      4.2900581
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/161.jpg",
    "menuImages": [
      "/menus/strain-fellows-23-06-25.png"
    ]
  },
  {
    "id": "162",
    "name": "Koffie en Dromen (Blowboot)",
    "location": "Almere",
    "address": "Festivalplein 19, Almere 1315 KL",
    "coordinates": [
      52.374118,
      5.2229677
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Almere",
    "image": "/images/shops/162.jpg",
    "menuImages": [
      "/menus/koffie-en-dromen-blowboot-21-10-25.png"
    ]
  },
  {
    "id": "163",
    "name": "The Plug Amersfoort",
    "location": "Amersfoort",
    "address": "Amersfoortsestraat 12, Amersfoort 3821 CB",
    "coordinates": [
      52.1723355,
      5.4363026
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amersfoort",
    "image": "/images/shops/163.jpg",
    "menuImages": [
      "/menus/the-plug-amersfoort-01-10-25.png"
    ]
  },
  {
    "id": "164",
    "name": "Flower Power",
    "location": "Amsterdam",
    "address": "Rozengracht 139, 1016 LV Amsterdam",
    "coordinates": [
      52.3727074,
      4.8786137
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "fS8THioQvhU",
      "sfr2BaAMlG4"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/164.jpg",
    "menuImages": [
      "/menus/flower-power-11-09-25.png"
    ]
  },
  {
    "id": "165",
    "name": "Kosbor",
    "location": "Maastricht",
    "address": "Kleine Gracht 3, 6211 CA Maastricht",
    "coordinates": [
      50.8526895,
      5.6930961
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/165.jpg",
    "menuImages": [
      "/menus/kosbor-02-02-25.png"
    ]
  },
  {
    "id": "166",
    "name": "The Plug Store",
    "location": "Amsterdam",
    "address": "Singel 14, Amsterdam 1013 GA",
    "coordinates": [
      52.379037,
      4.8938
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/166.jpg",
    "menuImages": [
      "/menus/the-plug-store-13-11-25.png"
    ]
  },
  {
    "id": "167",
    "name": "Superskunk",
    "location": "Amsterdam",
    "address": "Prinsengracht 480, 1017 KG Amsterdam",
    "coordinates": [
      52.3642501,
      4.8851261
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["8b0Sr2CCJDs"],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/167.jpg",
    "menuImages": [
      "/menus/superskunk-20-09-25.png"
    ]
  },
  {
    "id": "168",
    "name": "Kronkel",
    "location": "Nijmegen",
    "address": "Vlaamsegas 26-36, Nijmegen 6511 HR",
    "coordinates": [
      51.843677,
      5.8628498
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/168.jpg",
    "menuImages": [
      "/menus/kronkel-12-06-25.png"
    ]
  },
  {
    "id": "169",
    "name": "Fly",
    "location": "Den Haag",
    "address": "Veenkade 46, The Hague 2513 EH",
    "coordinates": [
      52.0792339,
      4.3008464
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/169.jpg",
    "menuImages": [
      "/menus/fly-27-10-25.png"
    ]
  },
  {
    "id": "170",
    "name": "Pluto",
    "location": "Rotterdam",
    "address": "Nieuwe Binnenweg 54, 3015 BB Rotterdam",
    "coordinates": [
      51.916023,
      4.4690746
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/170.jpg",
    "menuImages": [
      "/menus/pluto-21-08-25.png"
    ]
  },
  {
    "id": "171",
    "name": "Fly'n'Hy",
    "location": "Breda",
    "address": "Houtmarkt 23, Breda 4811 JC",
    "coordinates": [
      51.5864153,
      4.7773411
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/171.jpg",
    "menuImages": [
      "/menus/flynhy-15-07-25.png"
    ]
  },
  {
    "id": "172",
    "name": "de Kroon",
    "location": "Amsterdam",
    "address": "Oudebrugsteeg 26, 1012 JP Amsterdam",
    "coordinates": [
      52.3759804,
      4.8959932
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/172.svg",
    "menuImages": [
      "/menus/de-kroon-12-09-25.png"
    ]
  },
  {
    "id": "173",
    "name": "SWED a Snoop Dogg Store",
    "location": "Amsterdam",
    "address": "Marnixstraat 333, Amsterdam 1016 TC",
    "coordinates": [
      52.3726966,
      4.8761179
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/173.svg",
    "menuImages": [
      "/menus/swed-a-snoop-dogg-store-02-02-25.png"
    ]
  },
  {
    "id": "174",
    "name": "De Kruidenier Cannabis Takeaway",
    "location": "Haarlem",
    "address": "Nassaulaan 54, 2011 PE Haarlem",
    "coordinates": [
      52.3837882,
      4.6333742
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/174.svg",
    "menuImages": [
      "/menus/de-kruidenier-cannabis-takeaway-03-11-25.png"
    ]
  },
  {
    "id": "175",
    "name": "Taffne",
    "location": "Beverwijk",
    "address": "Markt 59, 1941 BM, Beverwijk",
    "coordinates": [
      52.4828062,
      4.6556149
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Beverwijk",
    "image": "/images/shops/175.svg",
    "menuImages": [
      "/menus/taffne-15-08-25.png"
    ]
  },
  {
    "id": "176",
    "name": "Bluebird",
    "location": "Amsterdam",
    "address": "Sint Antoniesbreestraat 71, 1011 HB Amsterdam",
    "coordinates": [
      52.3699968,
      4.9008904
    ],
    "rating": 0,
    "tags": [
      "Unique Vibe"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/176.jpg",
    "menuImages": [
      "/menus/bluebird-25-08-25.png"
    ]
  },
  {
    "id": "177",
    "name": "Free I",
    "location": "Amsterdam",
    "address": "Reguliersdwarsstraat 70, 1017 BN Amsterdam",
    "coordinates": [
      52.3659633,
      4.8934563
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/177.svg",
    "menuImages": [
      "/menus/free-i-24-11-25.png"
    ]
  },
  {
    "id": "178",
    "name": "Take a Break",
    "location": "Amersfoort",
    "address": "Terminalweg 11, Amersfoort 3821 AJ",
    "coordinates": [
      52.178284,
      5.4140637
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amersfoort",
    "image": "/images/shops/178.svg",
    "menuImages": [
      "/menus/take-a-break-05-04-25.png"
    ]
  },
  {
    "id": "179",
    "name": "Popeye",
    "location": "Amsterdam",
    "address": "Haarlemmerstraat 63, 1013 EK Amsterdam",
    "coordinates": [
      52.3799353,
      4.892811
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["6JPXRth0fk4"],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/179.jpg",
    "menuImages": [
      "/menus/popeye-10-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Dutch cheese",
        "score": "N/A",
        "approval": "N/A",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "180",
    "name": "Freedom",
    "location": "Amsterdam",
    "address": "Van Hogendorpstraat 201, 1051 CA Amsterdam",
    "coordinates": [
      52.3825522,
      4.871201
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "Oj50ohly8EQ"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/180.jpg",
    "menuImages": [
      "/menus/freedom-09-11-25.png"
    ]
  },
  {
    "id": "181",
    "name": "'t Kunsje",
    "location": "Nijmegan",
    "address": "2e Walstraat 108, 6511 LW Nijmegan",
    "coordinates": [
      51.84346,
      5.862269
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegan",
    "image": "/images/shops/181.jpg",
    "menuImages": [
      "/menus/t-kunsje-19-11-25.png"
    ]
  },
  {
    "id": "182",
    "name": "Bob Marley",
    "location": "Rotterdam",
    "address": "Nieuwe Binnenweg 403a, Rotterdam 3023 EM",
    "coordinates": [
      51.9109522,
      4.4516386
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/182.jpg",
    "menuImages": [
      "/menus/bob-marley-31-07-25.png"
    ]
  },
  {
    "id": "183",
    "name": "Terps Army 2",
    "location": "Amsterdam",
    "address": "Zieseniskade 22, Amsterdam 1017 RT",
    "coordinates": [
      52.361676,
      4.886242
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/183.jpg",
    "menuImages": [
      "/menus/terps-army-2-02-08-25.png"
    ],
    "reviews": [
      {
        "strain": "Original Z (Skittles)",
        "score": "€16.80 for 1.05g, looks very nice",
        "approval": "€16.80 for 1.05g, looks very nice",
        "videoTitle": ""
      },
      {
        "strain": "Sherbanger Kelly import",
        "score": "**Absolute favorite**, quality always awesome, never disappointed",
        "approval": "**Absolute favorite**, quality always awesome, never disappointed",
        "videoTitle": ""
      },
      {
        "strain": "OG18",
        "score": "**Very good batches**, proper OG",
        "approval": "**Very good batches**, proper OG",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "184",
    "name": "Funny People 2",
    "location": "Amsterdam",
    "address": "Tt. Vasumweg 4C, Amsterdam 1033 SC",
    "coordinates": [
      52.4019561,
      4.8984972
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/184.jpg",
    "menuImages": [
      "/menus/funny-people-2-04-09-25.png"
    ]
  },
  {
    "id": "185",
    "name": "Prix d'Ami",
    "location": "Amsterdam",
    "address": "Haringpakkerssteeg 3, Amsterdam 1012 LR",
    "coordinates": [
      52.3768482,
      4.8972025
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [
      "6anPRuuA-SE",
      "6JPXRth0fk4"
    ],
    "shortIds": [
      "UCpKw6BKmHY"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/185.jpg",
    "menuImages": [
      "/menus/prix-dami-01-11-25.png"
    ],
    "reviews": [
      {
        "strain": "Kosher Kush",
        "score": "€14, smells super awesome",
        "approval": "€14, smells super awesome",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "186",
    "name": "Boerejongens Centrum",
    "location": "Amsterdam",
    "address": "Utrechtsestraat 21, 1017 VH Amsterdam",
    "coordinates": [
      52.364853,
      4.8980251
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["sfr2BaAMlG4"],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/186.svg",
    "menuImages": [
      "/menus/boerejongens-centrum-02-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Zanka (Kelly menu)",
        "score": "Looked so good, smelled awesome",
        "approval": "Looked so good, smelled awesome",
        "videoTitle": ""
      },
      {
        "strain": "Gelato 41",
        "score": "**So good**, really on Kelly level, **excellent stuff**",
        "approval": "**So good**, really on Kelly level, **excellent stuff**",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "187",
    "name": "The Future",
    "location": "Apeldoorn",
    "address": "Nieuwstraat 64, Apeldoorn 7311 BT",
    "coordinates": [
      52.2153904,
      5.9593751
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Apeldoorn",
    "image": "/images/shops/187.jpg",
    "menuImages": [
      "/menus/the-future-13-09-25.png"
    ]
  },
  {
    "id": "188",
    "name": "Terps Army",
    "location": "Amsterdam",
    "address": "Nieuwe Nieuwstraat 32, 1012 NH Amsterdam",
    "coordinates": [
      52.3753772,
      4.8935768
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus"
    ],
    "videoIds": ["4YkGp6JhzRE",
      "I0ObhAANa0U",
      "QMhjG6EdZ4A",
      "6anPRuuA-SE",
      "W82ua6zEh2w",
      "LKcN_LbOekI"],
    "shortIds": [
      "dUvtId3Gvn8",
      "NgKuUG5K5hs",
      "x2sto04wVqA",
      "BMRGrxjuVzg"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/188.jpg",
    "menuImages": [
      "/menus/terps-army-09-08-25.png"
    ]
  },
  {
    "id": "189",
    "name": "Boerejongens Sloterdijk",
    "location": "Amsterdam",
    "address": "Humberweg 2, Amsterdam 1043 AL",
    "coordinates": [
      52.3913349,
      4.8297887
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/189.jpg",
    "menuImages": [
      "/menus/boerejongens-sloterdijk-29-09-25.png"
    ]
  },
  {
    "id": "190",
    "name": "ProGram",
    "location": "Amsterdam",
    "address": "Daniel Stalpertstraat 78, Amsterdam 1072 XK",
    "coordinates": [
      52.3560697,
      4.8910319
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/190.jpg",
    "menuImages": [
      "/menus/program-02-07-25.png"
    ]
  },
  {
    "id": "191",
    "name": "Boerejongens West",
    "location": "Amsterdam",
    "address": "Baarsjesweg 239, Amsterdam 1058 AA",
    "coordinates": [
      52.3623061,
      4.8575482
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/191.jpg",
    "menuImages": [
      "/menus/boerejongens-west-04-08-25.png"
    ]
  },
  {
    "id": "192",
    "name": "Promenade",
    "location": "Hilversum",
    "address": "Naarderstraat 11, Hilversum 1211 AH",
    "coordinates": [
      52.2273664,
      5.1763078
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hilversum",
    "image": "/images/shops/192.svg",
    "menuImages": [
      "/menus/promenade-03-09-25.png"
    ]
  },
  {
    "id": "193",
    "name": "Thunderbird",
    "location": "Enschede",
    "address": "Wilhelminastraat  3, Enschede 7511 DM",
    "coordinates": [
      52.2207084,
      6.8991134
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Enschede",
    "image": "/images/shops/193.jpg",
    "menuImages": [
      "/menus/thunderbird-13-11-25.png"
    ]
  },
  {
    "id": "194",
    "name": "The Game",
    "location": "Delft",
    "address": "Breestraat 30, 2611 RG Delft",
    "coordinates": [
      52.0083712,
      4.3611844
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "SGs8a1CLAic"
    ],
    "description": "Coffeeshop located in Delft",
    "image": "/images/shops/194.jpg",
    "menuImages": [
      "/menus/the-game-11-08-25.png"
    ]
  },
  {
    "id": "195",
    "name": "Boerejongens Almere",
    "location": "Almere",
    "address": "Grote Markt 23, Almere 1315 JA",
    "coordinates": [
      52.372407,
      5.2171786
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Almere",
    "image": "/images/shops/195.jpg",
    "menuImages": [
      "/menus/boerejongens-almere-27-11-25.jpg",
      "/menus/boerejongens-almere-29-09-25.png"
    ]
  },
  {
    "id": "196",
    "name": "Purple",
    "location": "Vlissingen",
    "address": "Aagje Dekenstraat 7a, Vlissingen 4381 RM",
    "coordinates": [
      51.4456744,
      3.5723975
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "XeV-Z0Tk0DA"
    ],
    "description": "Coffeeshop located in Vlissingen",
    "image": "/images/shops/196.jpg",
    "menuImages": [
      "/menus/purple-03-05-25.png"
    ]
  },
  {
    "id": "197",
    "name": "Level013",
    "location": "Tilburg",
    "address": "St. Annaplein 13, Tilburg 5038 TV",
    "coordinates": [
      51.5538416,
      5.0791878
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/197.jpg",
    "menuImages": [
      "/menus/level013-29-09-25.png"
    ]
  },
  {
    "id": "198",
    "name": "Purple Rain",
    "location": "Breda",
    "address": "Willemstraat 12, Breda 4811 AK",
    "coordinates": [
      51.5934725,
      4.7798704
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/198.svg",
    "menuImages": [
      "/menus/purple-rain-14-08-25.png"
    ]
  },
  {
    "id": "199",
    "name": "The Border",
    "location": "Amsterdam",
    "address": "Amstelveenseweg 1160, Amsterdam 1081 JW",
    "coordinates": [
      52.3220211,
      4.8570646
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "-xdiMGXL1Ro"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/199.jpg",
    "menuImages": [
      "/menus/the-border-22-01-25.png"
    ],
    "reviews": [
      {
        "strain": "Lemon Hash Block (Hush)",
        "score": "**7.2** (Very good for the price, super fresh, nice blonde soft chocolate bar, immediate sativa effect, would buy it)",
        "approval": "**7.2** (Very good for the price, super fresh, nice blonde soft chocolate bar, immediate sativa effect, would buy it)",
        "videoId": "-xdiMGXL1Ro",
        "videoTitle": "Hitting The Border Like A Refugee"
      },
      {
        "strain": "Lemon Hash Block (Hush)",
        "score": "**7.2** (Very good for the price, super fresh, would buy it)",
        "approval": "**7.2** (Very good for the price, super fresh, would buy it)",
        "videoId": "-xdiMGXL1Ro",
        "videoTitle": "Hitting The Border Like A Refugee"
      }
    ]
  },
  {
    "id": "200",
    "name": "Toermalijn",
    "location": "Tilburg",
    "address": "Besterdring 187, 5014 HK Tilburg",
    "coordinates": [
      51.5629759,
      5.0908087
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/200.jpg",
    "menuImages": [
      "/menus/toermalijn-19-11-25.png"
    ]
  },
  {
    "id": "201",
    "name": "Rag-a-Muffin",
    "location": "Groningen",
    "address": "Noorderstationsstraat 15, Groningen 9716 AN",
    "coordinates": [
      53.2287405,
      6.5597747
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/201.jpg",
    "menuImages": [
      "/menus/rag-a-muffin-20-07-25.png"
    ]
  },
  {
    "id": "202",
    "name": "Loft",
    "location": "Amsterdam",
    "address": "Jan van Galenstraat 285, 1056 CA Amsterdam",
    "coordinates": [
      52.3725755,
      4.8495299
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/202.jpg",
    "menuImages": [
      "/menus/loft-14-08-25.png"
    ]
  },
  {
    "id": "203",
    "name": "Tops",
    "location": "Den Helder",
    "address": "Koningstraat 34, Den Helder 1781 KH",
    "coordinates": [
      52.9612832,
      4.7616847
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "_mLWoNM3sWw"
    ],
    "description": "Coffeeshop located in Den Helder",
    "image": "/images/shops/203.jpg",
    "menuImages": [
      "/menus/tops-31-07-25.png"
    ]
  },
  {
    "id": "204",
    "name": "het Gelderse",
    "location": "Amsterdam",
    "address": "Geldersekade 54, 1012 BK Amsterdam",
    "coordinates": [
      52.3749581,
      4.9012747
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/204.jpg",
    "menuImages": [
      "/menus/het-gelderse-21-09-25.png"
    ]
  },
  {
    "id": "205",
    "name": "London",
    "location": "Den Haag",
    "address": "Torenstraat 81, The Hague 2513 BP",
    "coordinates": [
      52.0788502,
      4.3042466
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/205.jpg",
    "menuImages": [
      "/menus/london-18-11-25.png"
    ]
  },
  {
    "id": "206",
    "name": "Trefpunt",
    "location": "Amsterdam",
    "address": "Zeeburgerdijk 33, Amsterdam 1093 SL",
    "coordinates": [
      52.3661308,
      4.9298273
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/206.svg",
    "menuImages": [
      "/menus/trefpunt-02-07-25.png"
    ]
  },
  {
    "id": "207",
    "name": "The Box",
    "location": "Scheveningen",
    "address": "Havenkade 16, Scheveningen 2586 TS",
    "coordinates": [
      52.1079993,
      4.2781299
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Scheveningen",
    "image": "/images/shops/207.jpg",
    "menuImages": [
      "/menus/the-box-11-11-25.png"
    ]
  },
  {
    "id": "208",
    "name": "Get Down To It",
    "location": "Amsterdam",
    "address": "Korte Leidsedwarsstraat 77-79, 1017 PW Amsterdam",
    "coordinates": [
      52.3651045,
      4.8820583
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "ys40nIDmptI"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/208.jpg",
    "menuImages": [
      "/menus/get-down-to-it-27-07-25.png"
    ]
  },
  {
    "id": "209",
    "name": "De Loods",
    "location": "Amersfoort",
    "address": "Textielweg 11, Amersfoort 3812 RV",
    "coordinates": [
      52.1648274,
      5.3700662
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amersfoort",
    "image": "/images/shops/209.svg",
    "menuImages": [
      "/menus/de-loods-17-09-25.png"
    ]
  },
  {
    "id": "210",
    "name": "Rastafarihouse Boni",
    "location": "Maastricht",
    "address": "Stenenbrug 7, Maastricht 6211 HP",
    "coordinates": [
      50.8463063,
      5.692428
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/210.jpg",
    "menuImages": [
      "/menus/rastafarihouse-boni-05-03-25.png"
    ]
  },
  {
    "id": "211",
    "name": "The Reef",
    "location": "Rotterdam",
    "address": "Oppert 1, Rotterdam 3011 HS",
    "coordinates": [
      51.9228161,
      4.4829155
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/211.jpg",
    "menuImages": [
      "/menus/the-reef-05-02-25.png"
    ]
  },
  {
    "id": "212",
    "name": "Goa",
    "location": "Amsterdam",
    "address": "Kloveniersburgwal 42, 1012 CW Amsterdam",
    "coordinates": [
      52.3712664,
      4.8985347
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "fS8THioQvhU"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/212.jpg",
    "menuImages": [
      "/menus/goa-31-05-25.png"
    ],
    "reviews": [
      {
        "strain": "Cookies and Cream",
        "score": "Smells very creamy",
        "approval": "Smells very creamy",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "213",
    "name": "Reefer",
    "location": "Amsterdam",
    "address": "Sint Antoniesbreestraat 77, 1011 HB Amsterdam",
    "coordinates": [
      52.3697849,
      4.9009948
    ],
    "rating": 0,
    "tags": [],
    "videoIds": ["6anPRuuA-SE"],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/213.jpg",
    "menuImages": [
      "/menus/reefer-20-09-25.png"
    ],
    "reviews": [
      {
        "strain": "Geishas",
        "score": "€18.80 for 0.99g, staff were very enthusiastic",
        "approval": "€18.80 for 0.99g, staff were very enthusiastic",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "214",
    "name": "Lucky Luke",
    "location": "Arnhem",
    "address": "Sonsbeeksingel 91, Arnhem 6821 AC",
    "coordinates": [
      51.9860499,
      5.913873
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/214.jpg",
    "menuImages": [
      "/menus/lucky-luke-22-08-25.png"
    ]
  },
  {
    "id": "215",
    "name": "Buggy",
    "location": "Nijmegen",
    "address": "Platenmakersstraat 8, Nijmegen 6511 TZ",
    "coordinates": [
      51.84756,
      5.8654751
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Nijmegen",
    "image": "/images/shops/215.jpg",
    "menuImages": [
      "/menus/buggy-09-11-25.png"
    ]
  },
  {
    "id": "216",
    "name": "The Goat",
    "location": "Den Haag",
    "address": "Spui 241, The Hague 2511 BP",
    "coordinates": [
      52.0755609,
      4.3185108
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/216.jpg",
    "menuImages": [
      "/menus/the-goat-13-08-25.png"
    ]
  },
  {
    "id": "217",
    "name": "Regine",
    "location": "Haarlem",
    "address": "Gedempte Oudegracht 28, 2011 GP Haarlem",
    "coordinates": [
      52.3815247,
      4.6318062
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/217.svg",
    "menuImages": [
      "/menus/regine-09-10-25.png"
    ]
  },
  {
    "id": "218",
    "name": "Tweede Kamer",
    "location": "Amsterdam",
    "address": "Heisteeg 6, 1012 WC Amsterdam",
    "coordinates": [
      52.368831,
      4.888386
    ],
    "rating": 0,
    "tags": [
      "Historic"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/218.jpg",
    "menuImages": [
      "/menus/tweede-kamer-08-09-25.png"
    ]
  },
  {
    "id": "219",
    "name": "Relax",
    "location": "Amsterdam",
    "address": "Binnen Oranjestraat 9, 1013 HZ Amsterdam",
    "coordinates": [
      52.3821898,
      4.8871854
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "6JPXRth0fk4"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/219.svg",
    "menuImages": [
      "/menus/relax-25-11-25.png"
    ]
  },
  {
    "id": "220",
    "name": "'t Grasje",
    "location": "Utrecht",
    "address": "Obrechtstraat 1, 3572 EA Utrecht",
    "coordinates": [
      52.0955408,
      5.1294621
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Utrecht",
    "image": "/images/shops/220.jpg",
    "menuImages": [
      "/menus/t-grasje-15-06-25.png"
    ]
  },
  {
    "id": "221",
    "name": "Twins",
    "location": "Heerlen",
    "address": "Honigmannstraat 49, Heerlen 6411 LJ",
    "coordinates": [
      50.8883436,
      5.9754057
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Heerlen",
    "image": "/images/shops/221.jpg",
    "menuImages": [
      "/menus/twins-02-07-25.png"
    ]
  },
  {
    "id": "222",
    "name": "The Grass Company",
    "location": "Tilburg",
    "address": "Spoorlaan 360, Tilburg 5038 CD",
    "coordinates": [
      51.5596863,
      5.0869322
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/222.jpg",
    "menuImages": [
      "/menus/the-grass-company-19-11-25.png"
    ]
  },
  {
    "id": "223",
    "name": "Majestic",
    "location": "Breda",
    "address": "Boschstraat 154, Breda 4811 GL",
    "coordinates": [
      51.5910963,
      4.7841967
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/223.svg",
    "menuImages": [
      "/menus/majestic-15-07-25.png"
    ]
  },
  {
    "id": "224",
    "name": "The Grass Company 2",
    "location": "Tilburg",
    "address": "Piusstraat 124, Tilburg 5021 JC",
    "coordinates": [
      51.5504063,
      5.0886777
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Tilburg",
    "image": "/images/shops/224.jpg",
    "menuImages": [
      "/menus/the-grass-company-2-22-10-25.png"
    ]
  },
  {
    "id": "225",
    "name": "Relaxed",
    "location": "Leiden",
    "address": "Janvossensteeg 6- 8, 2312 WE Leiden",
    "coordinates": [
      52.1617363,
      4.4924009
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Leiden",
    "image": "/images/shops/225.svg",
    "menuImages": [
      "/menus/relaxed-20-05-25.png"
    ]
  },
  {
    "id": "226",
    "name": "Magic",
    "location": "Doetinchem",
    "address": "Veemarkt 10, Doetinchem 7001 EE",
    "coordinates": [
      51.965684,
      6.2949856
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "ztWVdTc3Js0"
    ],
    "description": "Coffeeshop located in Doetinchem",
    "image": "/images/shops/226.jpg",
    "menuImages": [
      "/menus/magic-28-08-25.png"
    ]
  },
  {
    "id": "227",
    "name": "Relax Zuid",
    "location": "Amsterdam",
    "address": "Vechtstraat 9, Amsterdam 1078 RE",
    "coordinates": [
      52.3484608,
      4.9056303
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/227.jpg",
    "menuImages": [
      "/menus/relax-zuid-25-11-25.png"
    ]
  },
  {
    "id": "228",
    "name": "Marbella Special Farmers",
    "location": "Den Haag",
    "address": "Weimarstraat 244, The Hague 2562 HR",
    "coordinates": [
      52.0745032,
      4.2788212
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/228.jpg",
    "menuImages": [
      "/menus/marbella-special-farmers-08-11-25.png"
    ]
  },
  {
    "id": "229",
    "name": "El Marssa",
    "location": "Amsterdam",
    "address": "Witte de Withstraat 106, 1057 ZG Amsterdam",
    "coordinates": [
      52.3689919,
      4.8592895
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/229.jpg",
    "menuImages": [
      "/menus/el-marssa-25-08-25.png"
    ]
  },
  {
    "id": "230",
    "name": "Tyson 2.0",
    "location": "Amsterdam",
    "address": "Spuistraat 222, 1012 VA Amsterdam",
    "coordinates": [
      52.371476,
      4.8891563
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/230.jpg",
    "menuImages": [
      "/menus/tyson-20-11-10-25.png"
    ]
  },
  {
    "id": "231",
    "name": "Green Place 2",
    "location": "Amsterdam",
    "address": "Haarlemmerstraat 6, Amsterdam 1013 ER",
    "coordinates": [
      52.3794229,
      4.8940052
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/231.svg",
    "menuImages": [
      "/menus/green-place-2-08-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Sour Cream",
        "score": "Locally grown, €12; reviewer was \"pissed\" at the staff",
        "approval": "Locally grown, €12; reviewer was \"pissed\" at the staff",
        "videoTitle": ""
      },
      {
        "strain": "DOA (real deal)",
        "score": "**Top shelf**, getting that real deal 100%",
        "approval": "**Top shelf**, getting that real deal 100%",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "232",
    "name": "Green Place",
    "location": "Amsterdam",
    "address": "Kloveniersburgwal 4, 1012 CT Amsterdam",
    "coordinates": [
      52.3718668,
      4.8990253
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "F8C_RsNvqtY",
      "1LVHf_41jEQ",
      "4b3NDVZV3Zk",
      "6anPRuuA-SE",
      "W82ua6zEh2w",
      "LKcN_LbOekI"
    ],
    "shortIds": [
      "A_4KRaKb0Ps",
      "6G8jpcD3kpw",
      "zdjAAZGt9QY",
      "CaBfmHqrrmI"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/232.jpg",
    "menuImages": [
      "/menus/green-place-27-10-25.png"
    ]
  },
  {
    "id": "233",
    "name": "Uncle Sam",
    "location": "Arnhem",
    "address": "Driekoningenstraat 21a, Arnhem 6828 EL",
    "coordinates": [
      51.984032,
      5.9207225
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/233.jpg",
    "menuImages": [
      "/menus/uncle-sam-31-10-25.png"
    ]
  },
  {
    "id": "234",
    "name": "Republiek",
    "location": "Amsterdam",
    "address": "2e Nassaustraat 1A, 1052 BJ, Amsterdam",
    "coordinates": [
      52.382153,
      4.878594
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/234.jpg",
    "menuImages": [
      "/menus/republiek-28-04-25.png"
    ]
  },
  {
    "id": "235",
    "name": "Bushdocter",
    "location": "Amsterdam",
    "address": "Thorbeckeplein 28, 1017 CS Amsterdam",
    "coordinates": [
      52.3651124,
      4.8955556
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/235.jpg",
    "menuImages": [
      "/menus/bushdocter-07-10-25.png"
    ]
  },
  {
    "id": "236",
    "name": "Mary Jane",
    "location": "Maastricht",
    "address": "Hoogbrugstraat 4, Maastricht 6221 CR",
    "coordinates": [
      50.8473896,
      5.7019672
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/236.jpg",
    "menuImages": [
      "/menus/mary-jane-17-07-25.png"
    ]
  },
  {
    "id": "237",
    "name": "Upstairs",
    "location": "Eindhoven",
    "address": "Stratumseind 25, 5611 EN Eindhoven",
    "coordinates": [
      51.4369454,
      5.480474
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Eindhoven",
    "image": "/images/shops/237.jpg",
    "menuImages": [
      "/menus/upstairs-06-04-25.png"
    ]
  },
  {
    "id": "238",
    "name": "The Greengrocers",
    "location": "Haarlem",
    "address": "Lange Veerstraat 47, Haarlem 2011 DA",
    "coordinates": [
      52.3799031,
      4.6377233
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/238.jpg",
    "menuImages": [
      "/menus/the-greengrocers-05-09-25.png"
    ]
  },
  {
    "id": "239",
    "name": "The Canna Club",
    "location": "Den Haag",
    "address": "Nieuwstraat 4, The Hague 2511 AV",
    "coordinates": [
      52.0773953,
      4.3085927
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/239.jpg",
    "menuImages": [
      "/menus/the-canna-club-02-06-25.png"
    ]
  },
  {
    "id": "240",
    "name": "Greenhouse Centrum",
    "location": "Amsterdam",
    "address": "Oudezijds Voorburgwal 191, 1012 EW Amsterdam",
    "coordinates": [
      52.371476,
      4.895748
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [
      "fS8THioQvhU",
      "6JPXRth0fk4"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/240.jpg",
    "menuImages": [
      "/menus/greenhouse-centrum-06-09-25.png"
    ]
  },
  {
    "id": "241",
    "name": "Retro",
    "location": "Groningen",
    "address": "Boterdiep 42, Groningen 9712 LR",
    "coordinates": [
      53.2239209,
      6.56434
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/241.jpg",
    "menuImages": [
      "/menus/retro-20-07-25.png"
    ]
  },
  {
    "id": "242",
    "name": "Maxcys",
    "location": "Maastricht",
    "address": "Rechtstraat 60a, 6221 EK, Maastricht",
    "coordinates": [
      50.8486712,
      5.6980925
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/242.svg",
    "menuImages": [
      "/menus/maxcys-25-04-25.png"
    ]
  },
  {
    "id": "243",
    "name": "V.I.P. Shop",
    "location": "Utrecht",
    "address": "1e Daalsedijk 294, 3513 TL, Utrecht",
    "coordinates": [
      52.0973055,
      5.1050372
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Utrecht",
    "image": "/images/shops/243.svg",
    "menuImages": [
      "/menus/vip-shop-29-03-25.png"
    ]
  },
  {
    "id": "244",
    "name": "Greenhouse Cookies",
    "location": "Amsterdam",
    "address": "Haarlemmerstraat 64, Amsterdam 1013 ET",
    "coordinates": [
      52.3802868,
      4.8921479
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/244.jpg",
    "menuImages": [
      "/menus/greenhouse-cookies-07-10-25.png"
    ]
  },
  {
    "id": "245",
    "name": "Maximillian",
    "location": "Haarlem",
    "address": "Gedempte Oudegracht 123, 2011GP Haarlem",
    "coordinates": [
      52.3781921,
      4.6358086
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Haarlem",
    "image": "/images/shops/245.jpg",
    "menuImages": [
      "/menus/maximillian-21-08-25.png"
    ]
  },
  {
    "id": "246",
    "name": "Vliegende Hollander",
    "location": "Groningen",
    "address": "Gedempte Zuiderdiep 63, 9711 HC Groningen",
    "coordinates": [
      53.2148187,
      6.5667104
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/246.jpg",
    "menuImages": [
      "/menus/vliegende-hollander-20-07-25.png"
    ]
  },
  {
    "id": "247",
    "name": "Reykjavik",
    "location": "Groningen",
    "address": "Spilsluizen 6, Groningen 9712 NS",
    "coordinates": [
      53.2216395,
      6.5648979
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/247.jpg",
    "menuImages": [
      "/menus/reykjavik-20-07-25.png"
    ]
  },
  {
    "id": "248",
    "name": "Greenhouse Effect",
    "location": "Amsterdam",
    "address": "Nieuwmarkt 14, Amsterdam 1012 CR",
    "coordinates": [
      52.3728237,
      4.8998313
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/248.svg",
    "menuImages": [
      "/menus/greenhouse-effect-04-09-25.png"
    ]
  },
  {
    "id": "249",
    "name": "Casa",
    "location": "Zoetermeer",
    "address": "Amerikaweg 145, 2717AV Zoetermeer",
    "coordinates": [
      52.0633298,
      4.4694618
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Zoetermeer",
    "image": "/images/shops/249.jpg",
    "menuImages": [
      "/menus/casa-06-04-25.png"
    ]
  },
  {
    "id": "250",
    "name": "Vondel",
    "location": "Amsterdam",
    "address": "Overtoom 451-hs, 1054 kh Amsterdam",
    "coordinates": [
      52.3619,
      4.8654
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/250.jpg",
    "menuImages": [
      "/menus/vondel-03-05-25.png"
    ]
  },
  {
    "id": "251",
    "name": "The Cat",
    "location": "Breda",
    "address": "Marterring 1, Breda 4817 GV",
    "coordinates": [
      51.5869792,
      4.8052436
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Breda",
    "image": "/images/shops/251.svg",
    "menuImages": [
      "/menus/the-cat-21-07-25.png"
    ]
  },
  {
    "id": "252",
    "name": "Rock-It",
    "location": "Amsterdam",
    "address": "Nieuwmarkt 12, 1012 CR Amsterdam",
    "coordinates": [
      52.3728509,
      4.8998169
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "GMo2UwNtJ3Q"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/252.jpg",
    "menuImages": [
      "/menus/rock-it-25-02-25.png"
    ],
    "reviews": [
      {
        "strain": "Kosher Kush",
        "score": "Smells not very good, \"weirdest kosher kush\"",
        "approval": "Smells not very good, \"weirdest kosher kush\"",
        "videoTitle": ""
      }
    ]
  },
  {
    "id": "253",
    "name": "Voyagers",
    "location": "Amsterdam",
    "address": "Geldersekade 2, Amsterdam",
    "coordinates": [
      52.3731441,
      4.9012672
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/253.jpg",
    "menuImages": [
      "/menus/voyagers-05-08-25.png"
    ]
  },
  {
    "id": "254",
    "name": "Catch 33",
    "location": "Amsterdam",
    "address": "Nassaukade 33, 1052 CK Amsterdam",
    "coordinates": [
      52.3826604,
      4.8798074
    ],
    "rating": 0,
    "tags": [
      "Quality Focus"
    ],
    "videoIds": [
      "sfr2BaAMlG4"
    ],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/254.jpg",
    "menuImages": [
      "/menus/catch-33-15-06-25.png"
    ],
    "reviews": [
      {
        "strain": "Dolato (Rosin from Lacalada)",
        "score": "**Luxurious experience** (Incredibly smooth)",
        "approval": "**Luxurious experience** (Incredibly smooth)",
        "videoId": "QUGyYjljFd4",
        "videoTitle": "You Told Me They Have The Best Rosin And Oh Boy What Should I Say"
      },
      {
        "strain": "Dolato (Rosin from Lacalada)",
        "score": "**Luxurious experience** (Incredibly smooth, possibly the best ever tried)",
        "approval": "**Luxurious experience** (Incredibly smooth, possibly the best ever tried)",
        "videoId": "QUGyYjljFd4",
        "videoTitle": "You Told Me They Have The Best Rosin And Oh Boy What Should I Say"
      }
    ],
    "detailedReview": "",
    "coraxApproved": true
  },
  {
    "id": "255",
    "name": "Green House Secret Farmers",
    "location": "Den Haag",
    "address": "Elandstraat 18, The Hague 2513 GR",
    "coordinates": [
      52.0820546,
      4.3004808
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Den Haag",
    "image": "/images/shops/255.jpg",
    "menuImages": [
      "/menus/green-house-secret-farmers-13-07-25.png"
    ]
  },
  {
    "id": "256",
    "name": "De Vriendschap",
    "location": "Gouda",
    "address": "Cappenersteeg  30, Gouda 2801 XP",
    "coordinates": [
      52.0123934,
      4.7130902
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Gouda",
    "image": "/images/shops/256.jpg",
    "menuImages": [
      "/menus/de-vriendschap-04-11-25.png"
    ]
  },
  {
    "id": "257",
    "name": "Club Media",
    "location": "Amsterdam",
    "address": "Gerard Doustraat 83-85, 1072 VN Amsterdam",
    "coordinates": [
      52.355811,
      4.8918846
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [
      "KbhKyMrMXHg",
      "LAUP_ANF7Is"
    ],
    "shortIds": [
      "sK6kSJZ892k",
      "foYynCLZQe4"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/257.jpg",
    "menuImages": [
      "/menus/club-media-12-09-25.png"
    ]
  },
  {
    "id": "258",
    "name": "Mediterrane (Drewissharing)",
    "location": "Amsterdam",
    "address": "Spuistraat 80, Amsterdam 1012 TX",
    "coordinates": [
      52.3755984,
      4.8915489
    ],
    "rating": 0,
    "tags": [
      "Quality Focus",
      "Unique Vibe"
    ],
    "videoIds": ["sfr2BaAMlG4"],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/258.jpg",
    "menuImages": [
      "/menus/mediterrane-drewissharing-11-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Wizard Tree Blue Magic (Z mix)",
        "score": "**Crazy** / **One of the best Z mixes** (So oily, so terppy, sweet fruity gassy, fulfilling white ash prophecy)",
        "approval": "**Crazy** / **One of the best Z mixes** (So oily, so terppy, sweet fruity gassy, fulfilling white ash prophecy)",
        "videoId": "PIu9DZPsyF4",
        "videoTitle": "This Wizard Trees From CoffeeShop DrewIsSharing Might Be One Of The Bests Out There Right Now"
      },
      {
        "strain": "Original Z (Kelly Import)",
        "score": "€22/g",
        "approval": "€22/g",
        "videoTitle": ""
      },
      {
        "strain": "Wizard Tree Blue Magic (Z mix)",
        "score": "**Crazy** / **One of the best Z mixes** (So oily, so terppy, sweet fruity gassy)",
        "approval": "**Crazy** / **One of the best Z mixes** (So oily, so terppy, sweet fruity gassy)",
        "videoId": "PIu9DZPsyF4",
        "videoTitle": "This Wizard Trees From CoffeeShop DrewIsSharing Might Be One Of The Bests Out There Right Now"
      }
    ],
    "coraxApproved": true,
    "detailedReview": ""
  },
  {
    "id": "259",
    "name": "Greenhouse Strain Hunters",
    "location": "Amsterdam",
    "address": "Singel 387, 1012 WN Amsterdam",
    "coordinates": [
      52.3687535,
      4.8882265
    ],
    "rating": 0,
    "tags": [
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/259.jpg",
    "menuImages": [
      "/menus/greenhouse-strain-hunters-05-02-25.png"
    ]
  },
  {
    "id": "260",
    "name": "Rokade",
    "location": "Hengelo",
    "address": "Deldenerstraat 14, Hengelo 7551 AE",
    "coordinates": [
      52.2664551,
      6.789756
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hengelo",
    "image": "/images/shops/260.jpg",
    "menuImages": [
      "/menus/rokade-29-09-25.png"
    ]
  },
  {
    "id": "261",
    "name": "Catweazle",
    "location": "Culemborg",
    "address": "Kattenstraat 7, Culemborg 4101 BL",
    "coordinates": [
      51.9585052,
      5.2239533
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Culemborg",
    "image": "/images/shops/261.jpg",
    "menuImages": [
      "/menus/catweazle-19-02-25.png"
    ]
  },
  {
    "id": "262",
    "name": "Green Valley",
    "location": "Ede",
    "address": "De Halte 21A, Ede 6711 NZ",
    "coordinates": [
      52.0426217,
      5.6680514
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Ede",
    "image": "/images/shops/262.jpg",
    "menuImages": [
      "/menus/green-valley-21-09-25.png"
    ]
  },
  {
    "id": "263",
    "name": "De Medley",
    "location": "Groningen",
    "address": "Gedempte Zuiderdiep 64, Groningen 9711 HK",
    "coordinates": [
      53.2144687,
      6.566867
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/263.jpg",
    "menuImages": [
      "/menus/de-medley-11-11-25.png"
    ]
  },
  {
    "id": "264",
    "name": "Central",
    "location": "Amsterdam",
    "address": "Prins Hendrikkade 89, 1012 EA Amsterdam",
    "coordinates": [
      52.3767148,
      4.9019324
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "1C7WWWTR-5Y"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/264.jpg",
    "menuImages": [
      "/menus/central-25-06-25.png"
    ]
  },
  {
    "id": "265",
    "name": "Grey Area",
    "location": "Amsterdam",
    "address": "Oude Leliestraat 2, 1015 AW Amsterdam",
    "coordinates": [
      52.3746743,
      4.888856
    ],
    "rating": 0,
    "tags": [
      "Top Pick",
      "Quality Focus",
      "Historic",
      "Tourist Friendly"
    ],
    "videoIds": [],
    "shortIds": [
      "Wv0z4jp-o_I",
      "Qa-fZN-zGn4"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/265.jpg",
    "menuImages": [
      "/menus/grey-area-27-10-25.png"
    ],
    "reviews": [
      {
        "strain": "Candy Rain (Strain Gang)",
        "score": "**Absolutely highly approved** (Reviewer was very impressed)",
        "approval": "**Absolutely highly approved** (Reviewer was very impressed)",
        "videoId": "Wv0z4jp-o_I",
        "videoTitle": "I Obtained Some New York Flower (Found Out They Are Available At Grey Area)"
      }
    ],
    "recommended": true,
    "coraxApproved": true
  },
  {
    "id": "266",
    "name": "The Wall",
    "location": "Eindhoven",
    "address": "Marconilaan 23c, Eindhoven 5612 HM",
    "coordinates": [
      51.4513488,
      5.4635016
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Eindhoven",
    "image": "/images/shops/266.jpg",
    "menuImages": [
      "/menus/the-wall-07-06-25.png"
    ]
  },
  {
    "id": "267",
    "name": "Rookies",
    "location": "Amsterdam",
    "address": "Korte Leidsedwarsstraat 145-147, 1017 PZ Amsterdam",
    "coordinates": [
      52.3633756,
      4.8845454
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/267.jpg",
    "menuImages": [
      "/menus/rookies-27-08-25.png"
    ]
  },
  {
    "id": "268",
    "name": "Chapiteau",
    "location": "Amsterdam",
    "address": "Van Boetzelaerstraat 31, 1051 CT Amsterdam",
    "coordinates": [
      52.3823631,
      4.8730538
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [
      "ZaZ_i6-lDBI",
      "RoLwu9X_3Mg"
    ],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/268.jpg",
    "menuImages": [
      "/menus/chapiteau-25-08-25.png"
    ],
    "detailedReview": "",
    "coraxApproved": true
  },
  {
    "id": "269",
    "name": "Roots",
    "location": "Amersfoort",
    "address": "Snouckaertlaan 30, Amersfoort 3811 MB",
    "coordinates": [
      52.1532811,
      5.3828477
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amersfoort",
    "image": "/images/shops/269.svg",
    "menuImages": [
      "/menus/roots-05-10-25.png"
    ]
  },
  {
    "id": "270",
    "name": "de Walm",
    "location": "Arnhem",
    "address": "Sonsbeeksingel 115, 6822 BJ Arnhem",
    "coordinates": [
      51.9859738,
      5.9153414
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Arnhem",
    "image": "/images/shops/270.jpg",
    "menuImages": [
      "/menus/de-walm-18-07-25.png"
    ]
  },
  {
    "id": "271",
    "name": "De Groene Gaper",
    "location": "Hoofddorp",
    "address": "Graftermeerstraat 10, Hoofddorp 2131 AC",
    "coordinates": [
      52.3119033,
      4.6948506
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Hoofddorp",
    "image": "/images/shops/271.jpg",
    "menuImages": [
      "/menus/de-groene-gaper-26-09-25.png"
    ]
  },
  {
    "id": "272",
    "name": "Metamorphose",
    "location": "Groningen",
    "address": "Oude Boteringestraat 53, Groningen 9712 GE",
    "coordinates": [
      53.2203673,
      6.5637003
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Groningen",
    "image": "/images/shops/272.jpg",
    "menuImages": [
      "/menus/metamorphose-20-07-25.png"
    ]
  },
  {
    "id": "273",
    "name": "Charlois",
    "location": "Rotterdam",
    "address": "Bas Jungeriusstraat 161b, Rotterdam 3081 VB",
    "coordinates": [
      51.8920984,
      4.4809454
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Rotterdam",
    "image": "/images/shops/273.jpg",
    "menuImages": [
      "/menus/charlois-06-09-25.png"
    ]
  },
  {
    "id": "274",
    "name": "Cheech & Chong's 2",
    "location": "Amsterdam",
    "address": "De Clercqstraat 30, 1052 NE Amsterdam",
    "coordinates": [
      52.3713552,
      4.8714487
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Amsterdam",
    "image": "/images/shops/274.svg",
    "menuImages": [
      "/menus/cheech-chongs-2-25-08-25.png"
    ]
  },
  {
    "id": "275",
    "name": "The Roundabout 69",
    "location": "Maastricht",
    "address": "Brusselsestraat 146, Maastricht 6211 PJ",
    "coordinates": [
      50.8496427,
      5.6788141
    ],
    "rating": 0,
    "tags": [],
    "videoIds": [],
    "shortIds": [],
    "description": "Coffeeshop located in Maastricht",
    "image": "/images/shops/275.jpg",
    "menuImages": [
      "/menus/the-roundabout-69-18-07-25.png"
    ]
  }
];

export const filterTags = [
  "All",
  "Top Pick",
  "Tourist Friendly",
  "Local Favorite",
  "Quality Focus",
  "Good Prices",
  "Unique Vibe",
  "Historic"
];
