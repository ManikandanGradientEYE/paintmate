export type Language = "en" | "hi" | "pa";

export interface Dictionary {
  /* ---------- global / nav ---------- */
  brandTagline: string;
  navHome: string;
  navPaintShop: string;
  navMenu: string;
  navLanguage: string;
  getAQuote: string;
  announceBar: string;

  /* ---------- home: hero + before/after ---------- */
  homeHeroTitle: string;
  homeHeroTitleAccent: string;
  homeHeroSub: string;
  homeHeroSubBold: string;
  baLabel: string;

  /* ---------- home: about + stats ---------- */
  aboutTitle: string;
  aboutBody: string;
  marqueeText: string;
  statYearsN: string;
  statYearsT: string;
  statFacilityN: string;
  statFacilityT: string;
  statIsoN: string;
  statIsoT: string;
  statPlantsN: string;
  statPlantsT: string;

  /* ---------- home: why us ---------- */
  whyUsTitle: string;
  whySplashTitle: string;
  whySplashBody: string;
  why1Title: string;
  why1Body: string;
  why2Title: string;
  why2Body: string;
  why3Title: string;
  why3Body: string;

  /* ---------- home: our work ---------- */
  workTitle: string;
  workTagLocation: string;
  workTagVilla: string;
  workTagNorbu: string;
  workViewGallery: string;

  /* ---------- home: colour ---------- */
  colourTitle: string;
  colourBody: string;
  roomLiving: string;
  roomKitchen: string;
  roomKids: string;
  roomBed: string;

  /* ---------- home: journey ---------- */
  journeyTitle: string;
  journeyLead: string;
  step1Label: string;
  step1Body: string;
  step2Label: string;
  step2Body: string;
  step3Label: string;
  step3Body: string;
  step4Label: string;
  step4Body: string;

  /* ---------- home: reviews ---------- */
  reviewsTitle: string;
  reviewBody: string;
  reviewName: string;
  reviewRole: string;

  /* ---------- footer ---------- */
  footerConnect: string;
  footerVenture: string;
  footerMade: string;
  footerRights: string;
  footerFine: string;

  /* ---------- shop hero ---------- */
  shopHeroTitle: string;
  shopHeroTitleAccent: string;
  shopHeroLead: string;
  shopHeroLeadBold: string;
  shopIntroBody: string;
  heroBadgeDelivery: string;
  heroBadgeShadeMatching: string;

  /* ---------- shop: calculator ---------- */
  calcHeading: string;
  calcOr: string;
  calcSetExactArea: string;
  calcSurface: string;
  calcInterior: string;
  calcExterior: string;
  calcCoats: string;

  /* ---------- shop: paints ---------- */
  paintChooseYourPaint: string;
  paintRecommended: string;
  paintOtherBrands: string;
  paintPricesIndicative: string;
  paintWhyThisPick: string;
  tierValue: string;
  tierPremium: string;

  /* ---------- shop: add-ons ---------- */
  addOnsTitle: string;
  addPainter: string;
  paintPainterNote: string;

  /* ---------- shop: shades ---------- */
  shadeHeading: string;
  shadeAll: string;
  shadeCountLabel: (count: number) => string;
  shadeCustomMatching: string;
  customShadeTitle: string;
  customShadeBrandPlaceholder: string;
  customShadeCodePlaceholder: string;
  customShadeNotePlaceholder: string;
  customShadeHelp: string;
  confusedTitle: string;
  confusedBody: string;

  /* ---------- shop: estimate ---------- */
  estimateYourEstimate: string;
  estimateRangeLabel: string;
  estimatePrimerLabel: string;
  estimatePaintLabel: (name: string, coats: number) => string;
  estimatePaintPrimerSubtotal: string;
  estimateGstOn: string;
  estimateWallPutty: string;
  estimateBagsKgLabel: (bags: number, kg: number) => string;
  estimatePainter: string;
  estimatePainterCount: (count: number) => string;
  estimateDelivery: string;
  estimateFree: string;
  estimateConfirmedOnWhatsApp: string;
  estimateEstimatedTotal: string;
  estimateDiscountNote: string;

  /* ---------- shop: delivery + lead form ---------- */
  deliveryTitle: string;
  locationNamePlaceholder: string;
  locationPhonePlaceholder: string;
  locationNameError: string;
  locationPhoneError: string;
  locationLocalityPlaceholder: string;
  locationOutsideLudhiana: string;
  locationGetQuoteButton: string;
  locationSending: string;
  locationRoughEstimate: string;
  locationThanksName: (name: string) => string;
  locationWillReachOut: (phone: string) => string;

  /* ---------- shop: sticky bar ---------- */
  stickyYourEstimate: string;
  stickyKnowDetails: string;
  stickyViewBreakdown: string;
  stickyHideBreakdown: string;
}

export const dictionaries: Record<Language, Dictionary> = {
  en: {
    brandTagline: "A Jiwan Group Venture",
    navHome: "Home",
    navPaintShop: "Paint Shop",
    navMenu: "Menu",
    navLanguage: "Language",
    getAQuote: "Get a Quote",
    announceBar: "2-Hour Delivery Across Ludhiana",

    homeHeroTitle: "Create a home that feels like it was made",
    homeHeroTitleAccent: "just for you",
    homeHeroSub: "Every detail, every feeling,",
    homeHeroSubBold: "uniquely yours",
    baLabel: "Experience the before after",

    aboutTitle: "About Paint Mate",
    aboutBody:
      "From a small polishing-materials shop in 1966, Jiwan Group has grown into one of Punjab's most trusted manufacturers of paints, coatings and industrial chemicals, with four plants in Ludhiana, an in-house resin plant, and X-Rite computerised colour matching. Paint Mate brings that manufacturing depth straight to your site.",
    marqueeText: "A Jiwan Group Venture.",
    statYearsN: "58+",
    statYearsT: "Years of Trust",
    statFacilityN: "34,000",
    statFacilityT: "SQ. Yards Facility",
    statIsoN: "ISO 9001 14001",
    statIsoT: "Certificate",
    statPlantsN: "4",
    statPlantsT: "Plants In Ludhiana",

    whyUsTitle: "Why Us",
    whySplashTitle: "More than paint. We're your paint mate.",
    whySplashBody:
      "Painting your space shouldn't feel complicated. Paint Mate brings shade selection, quantity guidance, coating expertise and easy ordering into one seamless experience. Backed by Jiwan Group's decades of manufacturing expertise, we help you make the right choice with confidence, and get it delivered without the usual hassle.",
    why1Title: "Choose with confidence",
    why1Body: "Find the right shade, finish and coating without the guesswork.",
    why2Title: "Know what you need",
    why2Body: "Get accurate quantity guidance and avoid unnecessary excess.",
    why3Title: "Buy without the hassle",
    why3Body: "Choose, order on WhatsApp, and get it delivered to your doorstep.",

    workTitle: "Our Work",
    workTagLocation: "Location",
    workTagVilla: "Serene Family Villa",
    workTagNorbu: "Norbu The Montanna — IHCL Seleqtions",
    workViewGallery: "View Gallery",

    colourTitle: "Get the experience of colour",
    colourBody:
      "With Jiwan Group's flagship products, create any shade you envision. Complete colour customisation, crafted to match your exact requirements.",
    roomLiving: "Living Room",
    roomKitchen: "Kitchen",
    roomKids: "Kids Room",
    roomBed: "Bed Room",

    journeyTitle: "Get your journey started",
    journeyLead: "In just 4 simple steps",
    step1Label: "Choose",
    step1Body:
      "Define the space, surface, colour direction, finish and budget. Shade discovery, matching and quantity guidance turn an idea into a workable brief.",
    step2Label: "Calculate",
    step2Body:
      "Work out how much paint you need based on your surface and project requirements.",
    step3Label: "Select",
    step3Body:
      "Choose the right coating system and finish for your surface, space and purpose.",
    step4Label: "Order",
    step4Body:
      "Place your order easily on WhatsApp and get your paint materials delivered to your doorstep.",

    reviewsTitle: "Know from our customers",
    reviewBody:
      "Their products deliver outstanding quality, speedy supplies, and cost-effectiveness, matching the standards of leading brands like Berger and Asian Paints. Jiwan Paints' expertise in colour matching ensures any shade can be achieved.",
    reviewName: "Rishi Chopra",
    reviewRole: "Chopra Industries Pvt. Ltd., Ludhiana",

    footerConnect: "Connect with us",
    footerVenture: "A Jiwan Group venture.",
    footerMade: "Paint made in Ludhiana, delivered in Ludhiana.",
    footerRights: "@2026 Paint Mate · All Rights Reserved",
    footerFine:
      "A Jiwan Group Venture · Shades are for reference, slight variation from the final product is normal.",

    shopHeroTitle: "Your one-stop",
    shopHeroTitleAccent: "Paint Shop",
    shopHeroLead: "Paints, primers, putty, tools and painters,",
    shopHeroLeadBold: "all in one place.",
    shopIntroBody:
      "Paint Mate helps you plan, price and order everything needed for a paint job: paints, primers, putty, tools and painter support. Featuring trusted products from Jiwan Paints.",
    heroBadgeDelivery: "Same / 2-day delivery in Ludhiana",
    heroBadgeShadeMatching: "Custom shade matching usually ready in approx. 2 days",

    calcHeading: "What size is your home?",
    calcOr: "OR",
    calcSetExactArea: "Set the exact wall area",
    calcSurface: "Surface",
    calcInterior: "Interior",
    calcExterior: "Exterior",
    calcCoats: "Coats",

    paintChooseYourPaint: "Choose your paint",
    paintRecommended: "Recommended",
    paintOtherBrands: "Other Brands",
    paintPricesIndicative:
      "Prices for other brands are approx. MRP indicative only. Final price confirmed on WhatsApp",
    paintWhyThisPick: "Why this pick",
    tierValue: "Value",
    tierPremium: "Premium",

    addOnsTitle: "Add ons",
    addPainter: "Add Painter",
    paintPainterNote: "Painter labour — quote confirmed on WhatsApp based on scope.",

    shadeHeading: "Choose your shades",
    shadeAll: "ALL",
    shadeCountLabel: (count) => `${count} shades`,
    shadeCustomMatching: "Custom shades matching usually ready in approx. 2 days",
    customShadeTitle: "Have a shade from another brand",
    customShadeBrandPlaceholder: "Brand/Shade card name",
    customShadeCodePlaceholder: "Shade code/name",
    customShadeNotePlaceholder: "Note (optional)",
    customShadeHelp:
      "Paint Mate can match shades from any card using Jiwan's X-Rite shade-matching. Usually ready in approx. 2 days.",
    confusedTitle: "Still confused!",
    confusedBody: "Check out a preview of your shade.",

    estimateYourEstimate: "YOUR ESTIMATE",
    estimateRangeLabel: "est. range",
    estimatePrimerLabel: "Primer (1 coat)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} coat${coats > 1 ? "s" : ""})`,
    estimatePaintPrimerSubtotal: "Paint + primer subtotal",
    estimateGstOn: "GST (18%) on paint + primer",
    estimateWallPutty: "Wall putty (incl. GST)",
    estimateBagsKgLabel: (bags, kg) => `${bags} bag${bags > 1 ? "s" : ""} / ${kg} kg`,
    estimatePainter: "Painter",
    estimatePainterCount: (count) => `${count} painter${count > 1 ? "s" : ""}`,
    estimateDelivery: "Delivery",
    estimateFree: "Free",
    estimateConfirmedOnWhatsApp: "Confirmed on WhatsApp",
    estimateEstimatedTotal: "Estimated total",
    estimateDiscountNote:
      "First order: 5% off. Second order: 10% off. Discount confirmed on final WhatsApp quote.",

    deliveryTitle: "Where do you need delivery?",
    locationNamePlaceholder: "Your name",
    locationPhonePlaceholder: "Contact number",
    locationNameError: "Enter your full name",
    locationPhoneError: "Enter a valid contact number",
    locationLocalityPlaceholder: "Enter area/locality in Ludhiana",
    locationOutsideLudhiana: "Outside Ludhiana? Delivery charge confirmed on WhatsApp.",
    locationGetQuoteButton: "Get quote on Whatsapp",
    locationSending: "Sending...",
    locationRoughEstimate: "Rough estimate only. Final quote confirmed on WhatsApp.",
    locationThanksName: (name) => `Thanks, ${name}!`,
    locationWillReachOut: (phone) =>
      `Our team will reach out on ${phone} shortly to confirm your quote and shade.`,

    stickyYourEstimate: "Your estimate",
    stickyKnowDetails: "Know Details",
    stickyViewBreakdown: "View estimate breakdown",
    stickyHideBreakdown: "Hide estimate breakdown",
  },

  hi: {
    brandTagline: "जीवन ग्रुप का उद्यम",
    navHome: "होम",
    navPaintShop: "पेंट शॉप",
    navMenu: "मेन्यू",
    navLanguage: "भाषा",
    getAQuote: "कोटेशन लें",
    announceBar: "पूरे लुधियाना में 2 घंटे में डिलीवरी",

    homeHeroTitle: "ऐसा घर बनाएँ जो लगे",
    homeHeroTitleAccent: "सिर्फ़ आपके लिए बना है",
    homeHeroSub: "हर बारीकी, हर एहसास,",
    homeHeroSubBold: "बिल्कुल आपका अपना",
    baLabel: "पहले और बाद का फ़र्क़ देखिए",

    aboutTitle: "पेंट मेट के बारे में",
    aboutBody:
      "1966 में पॉलिशिंग सामग्री की एक छोटी दुकान से शुरू होकर, जीवन ग्रुप आज पंजाब के सबसे भरोसेमंद पेंट, कोटिंग और औद्योगिक रसायन निर्माताओं में से एक है — लुधियाना में चार प्लांट, अपना रेज़िन प्लांट और X-Rite कंप्यूटरीकृत कलर मैचिंग के साथ। पेंट मेट उसी निर्माण क्षमता को सीधे आपकी साइट तक पहुँचाता है।",
    marqueeText: "जीवन ग्रुप का उद्यम।",
    statYearsN: "58+",
    statYearsT: "साल का भरोसा",
    statFacilityN: "34,000",
    statFacilityT: "वर्ग गज़ फैसिलिटी",
    statIsoN: "ISO 9001 14001",
    statIsoT: "प्रमाणित",
    statPlantsN: "4",
    statPlantsT: "लुधियाना में प्लांट",

    whyUsTitle: "हम ही क्यों",
    whySplashTitle: "सिर्फ़ पेंट नहीं। हम आपके पेंट मेट हैं।",
    whySplashBody:
      "अपनी जगह को पेंट कराना उलझन भरा नहीं होना चाहिए। पेंट मेट शेड चुनाव, मात्रा की सलाह, कोटिंग विशेषज्ञता और आसान ऑर्डरिंग — सब एक ही सहज अनुभव में लाता है। जीवन ग्रुप के दशकों के निर्माण अनुभव के साथ, हम आपको सही चुनाव भरोसे के साथ करने में मदद करते हैं और बिना किसी झंझट के डिलीवरी देते हैं।",
    why1Title: "भरोसे के साथ चुनें",
    why1Body: "बिना अंदाज़े के सही शेड, फ़िनिश और कोटिंग चुनें।",
    why2Title: "जानें कितना चाहिए",
    why2Body: "सही मात्रा की सलाह पाएँ और बेवजह की बर्बादी से बचें।",
    why3Title: "बिना झंझट ख़रीदें",
    why3Body: "चुनें, WhatsApp पर ऑर्डर करें और घर बैठे डिलीवरी पाएँ।",

    workTitle: "हमारा काम",
    workTagLocation: "लोकेशन",
    workTagVilla: "सुकून भरा फैमिली विला",
    workTagNorbu: "नोरबू द मोंटाना — IHCL सेलेक्शंस",
    workViewGallery: "गैलरी देखें",

    colourTitle: "रंगों का अनुभव पाएँ",
    colourBody:
      "जीवन ग्रुप के प्रमुख उत्पादों के साथ, कोई भी शेड बनाएँ जो आप सोचें। पूरी कलर कस्टमाइज़ेशन, आपकी ज़रूरत के मुताबिक तैयार।",
    roomLiving: "लिविंग रूम",
    roomKitchen: "किचन",
    roomKids: "किड्स रूम",
    roomBed: "बेडरूम",

    journeyTitle: "अपनी शुरुआत करें",
    journeyLead: "सिर्फ़ 4 आसान क़दमों में",
    step1Label: "चुनें",
    step1Body:
      "जगह, सतह, रंग की दिशा, फ़िनिश और बजट तय करें। शेड खोज, मैचिंग और मात्रा की सलाह आपके विचार को एक ठोस योजना बना देती है।",
    step2Label: "गणना करें",
    step2Body: "अपनी सतह और प्रोजेक्ट के हिसाब से जानें कि कितना पेंट चाहिए।",
    step3Label: "चयन करें",
    step3Body: "अपनी सतह, जगह और ज़रूरत के लिए सही कोटिंग सिस्टम और फ़िनिश चुनें।",
    step4Label: "ऑर्डर करें",
    step4Body: "WhatsApp पर आसानी से ऑर्डर करें और अपना पेंट मटीरियल घर बैठे पाएँ।",

    reviewsTitle: "हमारे ग्राहकों से जानें",
    reviewBody:
      "इनके उत्पाद बेहतरीन गुणवत्ता, तेज़ सप्लाई और किफ़ायत देते हैं — बर्जर और एशियन पेंट्स जैसे बड़े ब्रांड के स्तर के बराबर। कलर मैचिंग में जीवन पेंट्स की महारत से कोई भी शेड बनाया जा सकता है।",
    reviewName: "ऋषि चोपड़ा",
    reviewRole: "चोपड़ा इंडस्ट्रीज़ प्रा. लि., लुधियाना",

    footerConnect: "हमसे जुड़ें",
    footerVenture: "जीवन ग्रुप का उद्यम।",
    footerMade: "लुधियाना में बना पेंट, लुधियाना में डिलीवर।",
    footerRights: "@2026 पेंट मेट · सर्वाधिकार सुरक्षित",
    footerFine:
      "जीवन ग्रुप का उद्यम · शेड केवल संदर्भ के लिए हैं; अंतिम उत्पाद में मामूली अंतर सामान्य है।",

    shopHeroTitle: "आपकी वन-स्टॉप",
    shopHeroTitleAccent: "पेंट शॉप",
    shopHeroLead: "पेंट, प्राइमर, पुट्टी, औज़ार और पेंटर,",
    shopHeroLeadBold: "सब एक ही जगह।",
    shopIntroBody:
      "पेंट मेट आपकी मदद करता है पेंट जॉब की योजना बनाने, कीमत जानने और ऑर्डर करने में: पेंट, प्राइमर, पुट्टी, औज़ार और पेंटर सहायता। जीवन पेंट्स के भरोसेमंद उत्पादों के साथ।",
    heroBadgeDelivery: "लुधियाना में उसी दिन / 2 दिन में डिलीवरी",
    heroBadgeShadeMatching: "कस्टम शेड मैचिंग आमतौर पर लगभग 2 दिन में तैयार",

    calcHeading: "आपके घर का साइज़ क्या है?",
    calcOr: "या",
    calcSetExactArea: "सही दीवार क्षेत्रफल सेट करें",
    calcSurface: "सतह",
    calcInterior: "इंटीरियर",
    calcExterior: "एक्सटीरियर",
    calcCoats: "कोट",

    paintChooseYourPaint: "अपना पेंट चुनें",
    paintRecommended: "अनुशंसित",
    paintOtherBrands: "अन्य ब्रांड",
    paintPricesIndicative:
      "अन्य ब्रांड की कीमतें अनुमानित MRP हैं, केवल संकेत के लिए। अंतिम कीमत WhatsApp पर तय होगी",
    paintWhyThisPick: "यह क्यों चुनें",
    tierValue: "वैल्यू",
    tierPremium: "प्रीमियम",

    addOnsTitle: "ऐड ऑन",
    addPainter: "पेंटर जोड़ें",
    paintPainterNote: "पेंटर की मज़दूरी — काम के अनुसार कोटेशन WhatsApp पर तय होगा।",

    shadeHeading: "अपने शेड चुनें",
    shadeAll: "सभी",
    shadeCountLabel: (count) => `${count} शेड्स`,
    shadeCustomMatching: "कस्टम शेड मैचिंग आमतौर पर लगभग 2 दिन में तैयार",
    customShadeTitle: "किसी और ब्रांड का शेड चाहिए",
    customShadeBrandPlaceholder: "ब्रांड/शेड कार्ड का नाम",
    customShadeCodePlaceholder: "शेड कोड/नाम",
    customShadeNotePlaceholder: "नोट (वैकल्पिक)",
    customShadeHelp:
      "पेंट मेट जीवन की X-Rite शेड-मैचिंग से किसी भी कार्ड का शेड मैच कर सकता है। आमतौर पर लगभग 2 दिन में तैयार।",
    confusedTitle: "अब भी उलझन है!",
    confusedBody: "अपने शेड का प्रीव्यू देखें।",

    estimateYourEstimate: "आपका अनुमान",
    estimateRangeLabel: "अनुमानित सीमा",
    estimatePrimerLabel: "प्राइमर (1 कोट)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} कोट)`,
    estimatePaintPrimerSubtotal: "पेंट + प्राइमर उप-योग",
    estimateGstOn: "पेंट + प्राइमर पर GST (18%)",
    estimateWallPutty: "वॉल पुट्टी (GST सहित)",
    estimateBagsKgLabel: (bags, kg) => `${bags} बैग / ${kg} किलो`,
    estimatePainter: "पेंटर",
    estimatePainterCount: (count) => `${count} पेंटर`,
    estimateDelivery: "डिलीवरी",
    estimateFree: "मुफ़्त",
    estimateConfirmedOnWhatsApp: "WhatsApp पर तय होगा",
    estimateEstimatedTotal: "अनुमानित कुल राशि",
    estimateDiscountNote:
      "पहला ऑर्डर: 5% छूट। दूसरा ऑर्डर: 10% छूट। छूट की पुष्टि अंतिम WhatsApp कोटेशन पर होगी।",

    deliveryTitle: "डिलीवरी कहाँ चाहिए?",
    locationNamePlaceholder: "आपका नाम",
    locationPhonePlaceholder: "संपर्क नंबर",
    locationNameError: "अपना पूरा नाम दर्ज करें",
    locationPhoneError: "सही संपर्क नंबर दर्ज करें",
    locationLocalityPlaceholder: "लुधियाना में इलाका/लोकैलिटी दर्ज करें",
    locationOutsideLudhiana: "लुधियाना के बाहर? डिलीवरी शुल्क की पुष्टि WhatsApp पर होगी।",
    locationGetQuoteButton: "WhatsApp पर कोटेशन लें",
    locationSending: "भेजा जा रहा है...",
    locationRoughEstimate: "यह केवल अनुमानित है। अंतिम कोटेशन WhatsApp पर तय होगा।",
    locationThanksName: (name) => `धन्यवाद, ${name}!`,
    locationWillReachOut: (phone) =>
      `हमारी टीम जल्द ही ${phone} पर आपसे संपर्क करके आपकी कोटेशन और शेड कन्फर्म करेगी।`,

    stickyYourEstimate: "आपका अनुमान",
    stickyKnowDetails: "विवरण देखें",
    stickyViewBreakdown: "अनुमान का विवरण देखें",
    stickyHideBreakdown: "अनुमान का विवरण छुपाएं",
  },

  pa: {
    brandTagline: "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ",
    navHome: "ਹੋਮ",
    navPaintShop: "ਪੇਂਟ ਸ਼ਾਪ",
    navMenu: "ਮੀਨੂ",
    navLanguage: "ਭਾਸ਼ਾ",
    getAQuote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    announceBar: "ਪੂਰੇ ਲੁਧਿਆਣਾ ਵਿੱਚ 2 ਘੰਟੇ ਵਿੱਚ ਡਿਲੀਵਰੀ",

    homeHeroTitle: "ਅਜਿਹਾ ਘਰ ਬਣਾਓ ਜੋ ਲੱਗੇ",
    homeHeroTitleAccent: "ਸਿਰਫ਼ ਤੁਹਾਡੇ ਲਈ ਬਣਿਆ ਹੈ",
    homeHeroSub: "ਹਰ ਬਾਰੀਕੀ, ਹਰ ਅਹਿਸਾਸ,",
    homeHeroSubBold: "ਬਿਲਕੁਲ ਤੁਹਾਡਾ ਆਪਣਾ",
    baLabel: "ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ ਦਾ ਫ਼ਰਕ ਦੇਖੋ",

    aboutTitle: "ਪੇਂਟ ਮੇਟ ਬਾਰੇ",
    aboutBody:
      "1966 ਵਿੱਚ ਪਾਲਿਸ਼ਿੰਗ ਸਮੱਗਰੀ ਦੀ ਇੱਕ ਛੋਟੀ ਦੁਕਾਨ ਤੋਂ ਸ਼ੁਰੂ ਹੋ ਕੇ, ਜੀਵਨ ਗਰੁੱਪ ਅੱਜ ਪੰਜਾਬ ਦੇ ਸਭ ਤੋਂ ਭਰੋਸੇਯੋਗ ਪੇਂਟ, ਕੋਟਿੰਗ ਅਤੇ ਉਦਯੋਗਿਕ ਰਸਾਇਣ ਨਿਰਮਾਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ — ਲੁਧਿਆਣਾ ਵਿੱਚ ਚਾਰ ਪਲਾਂਟ, ਆਪਣਾ ਰੈਜ਼ਿਨ ਪਲਾਂਟ ਅਤੇ X-Rite ਕੰਪਿਊਟਰੀਕ੍ਰਿਤ ਕਲਰ ਮੈਚਿੰਗ ਨਾਲ। ਪੇਂਟ ਮੇਟ ਉਸੇ ਨਿਰਮਾਣ ਸਮਰੱਥਾ ਨੂੰ ਸਿੱਧਾ ਤੁਹਾਡੀ ਸਾਈਟ ਤੱਕ ਪਹੁੰਚਾਉਂਦਾ ਹੈ।",
    marqueeText: "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ।",
    statYearsN: "58+",
    statYearsT: "ਸਾਲਾਂ ਦਾ ਭਰੋਸਾ",
    statFacilityN: "34,000",
    statFacilityT: "ਵਰਗ ਗਜ਼ ਫੈਸਿਲਿਟੀ",
    statIsoN: "ISO 9001 14001",
    statIsoT: "ਪ੍ਰਮਾਣਿਤ",
    statPlantsN: "4",
    statPlantsT: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਪਲਾਂਟ",

    whyUsTitle: "ਅਸੀਂ ਹੀ ਕਿਉਂ",
    whySplashTitle: "ਸਿਰਫ਼ ਪੇਂਟ ਨਹੀਂ। ਅਸੀਂ ਤੁਹਾਡੇ ਪੇਂਟ ਮੇਟ ਹਾਂ।",
    whySplashBody:
      "ਆਪਣੀ ਥਾਂ ਨੂੰ ਪੇਂਟ ਕਰਵਾਉਣਾ ਉਲਝਣ ਭਰਿਆ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ। ਪੇਂਟ ਮੇਟ ਸ਼ੇਡ ਦੀ ਚੋਣ, ਮਾਤਰਾ ਦੀ ਸਲਾਹ, ਕੋਟਿੰਗ ਮਾਹਰਤਾ ਅਤੇ ਸੌਖੀ ਆਰਡਰਿੰਗ — ਸਭ ਇੱਕੋ ਸਹਿਜ ਤਜਰਬੇ ਵਿੱਚ ਲਿਆਉਂਦਾ ਹੈ। ਜੀਵਨ ਗਰੁੱਪ ਦੇ ਦਹਾਕਿਆਂ ਦੇ ਨਿਰਮਾਣ ਤਜਰਬੇ ਨਾਲ, ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਹੀ ਚੋਣ ਭਰੋਸੇ ਨਾਲ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਾਂ ਅਤੇ ਬਿਨਾਂ ਕਿਸੇ ਝੰਜਟ ਦੇ ਡਿਲੀਵਰੀ ਦਿੰਦੇ ਹਾਂ।",
    why1Title: "ਭਰੋਸੇ ਨਾਲ ਚੁਣੋ",
    why1Body: "ਬਿਨਾਂ ਅੰਦਾਜ਼ੇ ਦੇ ਸਹੀ ਸ਼ੇਡ, ਫ਼ਿਨਿਸ਼ ਅਤੇ ਕੋਟਿੰਗ ਚੁਣੋ।",
    why2Title: "ਜਾਣੋ ਕਿੰਨਾ ਚਾਹੀਦਾ",
    why2Body: "ਸਹੀ ਮਾਤਰਾ ਦੀ ਸਲਾਹ ਲਵੋ ਅਤੇ ਬੇਲੋੜੀ ਬਰਬਾਦੀ ਤੋਂ ਬਚੋ।",
    why3Title: "ਬਿਨਾਂ ਝੰਜਟ ਖ਼ਰੀਦੋ",
    why3Body: "ਚੁਣੋ, WhatsApp ਉੱਤੇ ਆਰਡਰ ਕਰੋ ਅਤੇ ਘਰ ਬੈਠੇ ਡਿਲੀਵਰੀ ਲਵੋ।",

    workTitle: "ਸਾਡਾ ਕੰਮ",
    workTagLocation: "ਲੋਕੇਸ਼ਨ",
    workTagVilla: "ਸ਼ਾਂਤ ਫੈਮਿਲੀ ਵਿਲਾ",
    workTagNorbu: "ਨੋਰਬੂ ਦ ਮੋਂਟਾਨਾ — IHCL ਸਲੈਕਸ਼ਨਜ਼",
    workViewGallery: "ਗੈਲਰੀ ਦੇਖੋ",

    colourTitle: "ਰੰਗਾਂ ਦਾ ਤਜਰਬਾ ਲਵੋ",
    colourBody:
      "ਜੀਵਨ ਗਰੁੱਪ ਦੇ ਪ੍ਰਮੁੱਖ ਉਤਪਾਦਾਂ ਨਾਲ, ਕੋਈ ਵੀ ਸ਼ੇਡ ਬਣਾਓ ਜੋ ਤੁਸੀਂ ਸੋਚਦੇ ਹੋ। ਪੂਰੀ ਕਲਰ ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ, ਤੁਹਾਡੀ ਲੋੜ ਮੁਤਾਬਕ ਤਿਆਰ।",
    roomLiving: "ਲਿਵਿੰਗ ਰੂਮ",
    roomKitchen: "ਕਿਚਨ",
    roomKids: "ਕਿਡਜ਼ ਰੂਮ",
    roomBed: "ਬੈੱਡਰੂਮ",

    journeyTitle: "ਆਪਣੀ ਸ਼ੁਰੂਆਤ ਕਰੋ",
    journeyLead: "ਸਿਰਫ਼ 4 ਸੌਖੇ ਕਦਮਾਂ ਵਿੱਚ",
    step1Label: "ਚੁਣੋ",
    step1Body:
      "ਥਾਂ, ਸਤ੍ਹਾ, ਰੰਗ ਦੀ ਦਿਸ਼ਾ, ਫ਼ਿਨਿਸ਼ ਅਤੇ ਬਜਟ ਤੈਅ ਕਰੋ। ਸ਼ੇਡ ਦੀ ਖੋਜ, ਮੈਚਿੰਗ ਅਤੇ ਮਾਤਰਾ ਦੀ ਸਲਾਹ ਤੁਹਾਡੇ ਵਿਚਾਰ ਨੂੰ ਇੱਕ ਠੋਸ ਯੋਜਨਾ ਬਣਾ ਦਿੰਦੀ ਹੈ।",
    step2Label: "ਗਿਣਤੀ ਕਰੋ",
    step2Body: "ਆਪਣੀ ਸਤ੍ਹਾ ਅਤੇ ਪ੍ਰੋਜੈਕਟ ਮੁਤਾਬਕ ਜਾਣੋ ਕਿ ਕਿੰਨਾ ਪੇਂਟ ਚਾਹੀਦਾ ਹੈ।",
    step3Label: "ਚੋਣ ਕਰੋ",
    step3Body: "ਆਪਣੀ ਸਤ੍ਹਾ, ਥਾਂ ਅਤੇ ਲੋੜ ਲਈ ਸਹੀ ਕੋਟਿੰਗ ਸਿਸਟਮ ਅਤੇ ਫ਼ਿਨਿਸ਼ ਚੁਣੋ।",
    step4Label: "ਆਰਡਰ ਕਰੋ",
    step4Body:
      "WhatsApp ਉੱਤੇ ਸੌਖਿਆਂ ਆਰਡਰ ਕਰੋ ਅਤੇ ਆਪਣਾ ਪੇਂਟ ਮਟੀਰੀਅਲ ਘਰ ਬੈਠੇ ਲਵੋ।",

    reviewsTitle: "ਸਾਡੇ ਗਾਹਕਾਂ ਤੋਂ ਜਾਣੋ",
    reviewBody:
      "ਇਨ੍ਹਾਂ ਦੇ ਉਤਪਾਦ ਵਧੀਆ ਗੁਣਵੱਤਾ, ਤੇਜ਼ ਸਪਲਾਈ ਅਤੇ ਕਿਫ਼ਾਇਤ ਦਿੰਦੇ ਹਨ — ਬਰਜਰ ਅਤੇ ਏਸ਼ੀਅਨ ਪੇਂਟਸ ਵਰਗੇ ਵੱਡੇ ਬ੍ਰਾਂਡਾਂ ਦੇ ਬਰਾਬਰ। ਕਲਰ ਮੈਚਿੰਗ ਵਿੱਚ ਜੀਵਨ ਪੇਂਟਸ ਦੀ ਮੁਹਾਰਤ ਨਾਲ ਕੋਈ ਵੀ ਸ਼ੇਡ ਬਣਾਇਆ ਜਾ ਸਕਦਾ ਹੈ।",
    reviewName: "ਰਿਸ਼ੀ ਚੋਪੜਾ",
    reviewRole: "ਚੋਪੜਾ ਇੰਡਸਟਰੀਜ਼ ਪ੍ਰਾ. ਲਿ., ਲੁਧਿਆਣਾ",

    footerConnect: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ",
    footerVenture: "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ।",
    footerMade: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਬਣਿਆ ਪੇਂਟ, ਲੁਧਿਆਣਾ ਵਿੱਚ ਡਿਲੀਵਰ।",
    footerRights: "@2026 ਪੇਂਟ ਮੇਟ · ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ",
    footerFine:
      "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ · ਸ਼ੇਡ ਸਿਰਫ਼ ਹਵਾਲੇ ਲਈ ਹਨ; ਅੰਤਿਮ ਉਤਪਾਦ ਵਿੱਚ ਮਾਮੂਲੀ ਫ਼ਰਕ ਆਮ ਹੈ।",

    shopHeroTitle: "ਤੁਹਾਡੀ ਵਨ-ਸਟਾਪ",
    shopHeroTitleAccent: "ਪੇਂਟ ਸ਼ਾਪ",
    shopHeroLead: "ਪੇਂਟ, ਪ੍ਰਾਈਮਰ, ਪੁੱਟੀ, ਔਜ਼ਾਰ ਅਤੇ ਪੇਂਟਰ,",
    shopHeroLeadBold: "ਸਭ ਇੱਕੋ ਥਾਂ।",
    shopIntroBody:
      "ਪੇਂਟ ਮੇਟ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ ਪੇਂਟ ਜੌਬ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ, ਕੀਮਤ ਜਾਣਨ ਅਤੇ ਆਰਡਰ ਕਰਨ ਵਿੱਚ: ਪੇਂਟ, ਪ੍ਰਾਈਮਰ, ਪੁੱਟੀ, ਔਜ਼ਾਰ ਅਤੇ ਪੇਂਟਰ ਸਹਾਇਤਾ। ਜੀਵਨ ਪੇਂਟਸ ਦੇ ਭਰੋਸੇਯੋਗ ਉਤਪਾਦਾਂ ਨਾਲ।",
    heroBadgeDelivery: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਉਸੇ ਦਿਨ / 2 ਦਿਨਾਂ ਵਿੱਚ ਡਿਲੀਵਰੀ",
    heroBadgeShadeMatching: "ਕਸਟਮ ਸ਼ੇਡ ਮੈਚਿੰਗ ਆਮ ਤੌਰ ਉੱਤੇ ਲਗਭਗ 2 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ",

    calcHeading: "ਤੁਹਾਡੇ ਘਰ ਦਾ ਸਾਈਜ਼ ਕੀ ਹੈ?",
    calcOr: "ਜਾਂ",
    calcSetExactArea: "ਸਹੀ ਦੀਵਾਰ ਦਾ ਖੇਤਰਫਲ ਸੈੱਟ ਕਰੋ",
    calcSurface: "ਸਤ੍ਹਾ",
    calcInterior: "ਇੰਟੀਰੀਅਰ",
    calcExterior: "ਐਕਸਟੀਰੀਅਰ",
    calcCoats: "ਕੋਟ",

    paintChooseYourPaint: "ਆਪਣਾ ਪੇਂਟ ਚੁਣੋ",
    paintRecommended: "ਸਿਫ਼ਾਰਸ਼ੀ",
    paintOtherBrands: "ਹੋਰ ਬ੍ਰਾਂਡ",
    paintPricesIndicative:
      "ਹੋਰ ਬ੍ਰਾਂਡਾਂ ਦੀਆਂ ਕੀਮਤਾਂ ਅਨੁਮਾਨਿਤ MRP ਹਨ, ਸਿਰਫ਼ ਸੰਕੇਤ ਲਈ। ਅੰਤਿਮ ਕੀਮਤ WhatsApp ਉੱਤੇ ਤੈਅ ਹੋਵੇਗੀ",
    paintWhyThisPick: "ਇਹ ਕਿਉਂ ਚੁਣੋ",
    tierValue: "ਵੈਲਿਊ",
    tierPremium: "ਪ੍ਰੀਮੀਅਮ",

    addOnsTitle: "ਐਡ ਆਨ",
    addPainter: "ਪੇਂਟਰ ਜੋੜੋ",
    paintPainterNote: "ਪੇਂਟਰ ਦੀ ਮਜ਼ਦੂਰੀ — ਕੰਮ ਮੁਤਾਬਕ ਕੋਟੇਸ਼ਨ WhatsApp ਉੱਤੇ ਤੈਅ ਹੋਵੇਗਾ।",

    shadeHeading: "ਆਪਣੇ ਸ਼ੇਡ ਚੁਣੋ",
    shadeAll: "ਸਾਰੇ",
    shadeCountLabel: (count) => `${count} ਸ਼ੇਡਸ`,
    shadeCustomMatching: "ਕਸਟਮ ਸ਼ੇਡ ਮੈਚਿੰਗ ਆਮ ਤੌਰ ਉੱਤੇ ਲਗਭਗ 2 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ",
    customShadeTitle: "ਕਿਸੇ ਹੋਰ ਬ੍ਰਾਂਡ ਦਾ ਸ਼ੇਡ ਚਾਹੀਦਾ ਹੈ",
    customShadeBrandPlaceholder: "ਬ੍ਰਾਂਡ/ਸ਼ੇਡ ਕਾਰਡ ਦਾ ਨਾਮ",
    customShadeCodePlaceholder: "ਸ਼ੇਡ ਕੋਡ/ਨਾਮ",
    customShadeNotePlaceholder: "ਨੋਟ (ਵਿਕਲਪਿਕ)",
    customShadeHelp:
      "ਪੇਂਟ ਮੇਟ ਜੀਵਨ ਦੀ X-Rite ਸ਼ੇਡ-ਮੈਚਿੰਗ ਨਾਲ ਕਿਸੇ ਵੀ ਕਾਰਡ ਦਾ ਸ਼ੇਡ ਮੈਚ ਕਰ ਸਕਦਾ ਹੈ। ਆਮ ਤੌਰ ਉੱਤੇ ਲਗਭਗ 2 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ।",
    confusedTitle: "ਹਾਲੇ ਵੀ ਉਲਝਣ ਹੈ!",
    confusedBody: "ਆਪਣੇ ਸ਼ੇਡ ਦਾ ਪ੍ਰੀਵਿਊ ਦੇਖੋ।",

    estimateYourEstimate: "ਤੁਹਾਡਾ ਅਨੁਮਾਨ",
    estimateRangeLabel: "ਅਨੁਮਾਨਿਤ ਰੇਂਜ",
    estimatePrimerLabel: "ਪ੍ਰਾਈਮਰ (1 ਕੋਟ)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} ਕੋਟ)`,
    estimatePaintPrimerSubtotal: "ਪੇਂਟ + ਪ੍ਰਾਈਮਰ ਉਪ-ਜੋੜ",
    estimateGstOn: "ਪੇਂਟ + ਪ੍ਰਾਈਮਰ ਉੱਤੇ GST (18%)",
    estimateWallPutty: "ਵਾਲ ਪੁੱਟੀ (GST ਸਮੇਤ)",
    estimateBagsKgLabel: (bags, kg) => `${bags} ਬੈਗ / ${kg} ਕਿੱਲੋ`,
    estimatePainter: "ਪੇਂਟਰ",
    estimatePainterCount: (count) => `${count} ਪੇਂਟਰ`,
    estimateDelivery: "ਡਿਲੀਵਰੀ",
    estimateFree: "ਮੁਫ਼ਤ",
    estimateConfirmedOnWhatsApp: "WhatsApp ਉੱਤੇ ਤੈਅ ਹੋਵੇਗਾ",
    estimateEstimatedTotal: "ਅਨੁਮਾਨਿਤ ਕੁੱਲ ਰਾਸ਼ੀ",
    estimateDiscountNote:
      "ਪਹਿਲਾ ਆਰਡਰ: 5% ਛੋਟ। ਦੂਜਾ ਆਰਡਰ: 10% ਛੋਟ। ਛੋਟ ਦੀ ਪੁਸ਼ਟੀ ਅੰਤਿਮ WhatsApp ਕੋਟੇਸ਼ਨ ਉੱਤੇ ਹੋਵੇਗੀ।",

    deliveryTitle: "ਡਿਲੀਵਰੀ ਕਿੱਥੇ ਚਾਹੀਦੀ ਹੈ?",
    locationNamePlaceholder: "ਤੁਹਾਡਾ ਨਾਮ",
    locationPhonePlaceholder: "ਸੰਪਰਕ ਨੰਬਰ",
    locationNameError: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    locationPhoneError: "ਸਹੀ ਸੰਪਰਕ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    locationLocalityPlaceholder: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਇਲਾਕਾ/ਲੋਕੈਲਿਟੀ ਦਰਜ ਕਰੋ",
    locationOutsideLudhiana: "ਲੁਧਿਆਣਾ ਤੋਂ ਬਾਹਰ? ਡਿਲੀਵਰੀ ਚਾਰਜ ਦੀ ਪੁਸ਼ਟੀ WhatsApp ਉੱਤੇ ਹੋਵੇਗੀ।",
    locationGetQuoteButton: "WhatsApp ਉੱਤੇ ਕੋਟੇਸ਼ਨ ਲਓ",
    locationSending: "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    locationRoughEstimate: "ਇਹ ਸਿਰਫ਼ ਅਨੁਮਾਨਿਤ ਹੈ। ਅੰਤਿਮ ਕੋਟੇਸ਼ਨ WhatsApp ਉੱਤੇ ਤੈਅ ਹੋਵੇਗਾ।",
    locationThanksName: (name) => `ਧੰਨਵਾਦ, ${name}!`,
    locationWillReachOut: (phone) =>
      `ਸਾਡੀ ਟੀਮ ਜਲਦੀ ਹੀ ${phone} ਉੱਤੇ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਕੇ ਤੁਹਾਡੀ ਕੋਟੇਸ਼ਨ ਅਤੇ ਸ਼ੇਡ ਕਨਫਰਮ ਕਰੇਗੀ।`,

    stickyYourEstimate: "ਤੁਹਾਡਾ ਅਨੁਮਾਨ",
    stickyKnowDetails: "ਵੇਰਵਾ ਦੇਖੋ",
    stickyViewBreakdown: "ਅਨੁਮਾਨ ਦਾ ਵੇਰਵਾ ਦੇਖੋ",
    stickyHideBreakdown: "ਅਨੁਮਾਨ ਦਾ ਵੇਰਵਾ ਲੁਕਾਓ",
  },
};
