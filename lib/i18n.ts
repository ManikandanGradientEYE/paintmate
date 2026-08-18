export type Language = "en" | "hi" | "pa";

export interface Dictionary {
  headerGetQuote: string;
  headerAboutJiwan: string;
  headerTagline: string;

  heroTitle: string;
  heroSubtitle: string;
  heroDescriptionPrefix: string;
  heroDescriptionBold: string;
  heroDescriptionMiddle: string;
  heroDescriptionBrand: string;
  heroDescriptionSuffix: string;
  heroBadgeDelivery: string;
  heroBadgeShadeMatching: string;
  heroBadgeGst: string;

  calcHeading: string;
  calcOrSetArea: string;
  calcSurface: string;
  calcInterior: string;
  calcExterior: string;
  calcCoats: string;

  paintChooseYourPaint: string;
  paintRecommended: string;
  paintOtherBrands: string;
  paintPricesIndicative: string;
  paintWhyThisPick: string;
  paintPainterNote: string;
  tierValue: string;
  tierPremium: string;

  shadeHeading: string;
  shadeGreens: string;
  shadeBrowns: string;
  shadeGreys: string;
  shadeCustomMatching: string;
  shadeCountLabel: (count: number) => string;
  shadeHaveAnotherCard: string;

  estimateYourEstimate: string;
  estimateRangeLabel: string;
  estimatePrimerLabel: string;
  estimatePaintLabel: (name: string, coats: number) => string;
  estimatePaintPrimerSubtotal: string;
  estimateGstOn: string;
  estimateWallPutty: string;
  estimateBagsKgLabel: (bags: number, kg: number) => string;
  estimateDelivery: string;
  estimateConfirmedOnWhatsApp: string;
  estimateEstimatedTotal: string;
  estimateDiscountNote: string;

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

  catalogHeading: string;
  catalogSubheading: string;
  catalogAddToQuote: string;
  catalogAskOnWhatsApp: string;

  storyHeading: string;
  storyDescription: string;
  storyBadge1: string;
  storyBadge2: string;
  storyBadge3: string;
  storyBadge4: string;
  storyBadge5: string;

  footerText: string;

  stickyEstimatedTotal: string;
  stickyGetQuote: string;
  stickyViewBreakdown: string;
  stickyHideBreakdown: string;
}

export const dictionaries: Record<Language, Dictionary> = {
  en: {
    headerGetQuote: "Get a quote",
    headerAboutJiwan: "About Jiwan",
    headerTagline: "A Jiwan Group Venture",

    heroTitle: "Your one-stop paint shop",
    heroSubtitle: "Paints, primers, putty, tools and painters — all in one place.",
    heroDescriptionPrefix: "Paint Mate helps you ",
    heroDescriptionBold: "plan, price and order",
    heroDescriptionMiddle:
      " everything needed for a paint job — paints, primers, putty, tools and painter support. Featuring trusted products from ",
    heroDescriptionBrand: "Jiwan Paints",
    heroDescriptionSuffix: ".",
    heroBadgeDelivery: "Same / 2-day delivery in Ludhiana",
    heroBadgeShadeMatching: "Custom shade matching usually ready in approx. 2 days",
    heroBadgeGst: "GST billing",

    calcHeading: "What size is your home?",
    calcOrSetArea: "Or set the exact wall area",
    calcSurface: "Surface",
    calcInterior: "Interior",
    calcExterior: "Exterior",
    calcCoats: "Coats",

    paintChooseYourPaint: "Choose your paint",
    paintRecommended: "Recommended",
    paintOtherBrands: "OTHER BRANDS",
    paintPricesIndicative:
      "Prices for other brands are approx. MRP — indicative only. Final price confirmed on WhatsApp.",
    paintWhyThisPick: "WHY THIS PICK",
    paintPainterNote: "Painter labour — quote confirmed on WhatsApp based on scope.",
    tierValue: "Value",
    tierPremium: "Premium",

    shadeHeading: "Pick a shade",
    shadeGreens: "Greens",
    shadeBrowns: "Browns",
    shadeGreys: "Greys",
    shadeCustomMatching: "Custom shade matching usually ready in approx. 2 days.",
    shadeCountLabel: (count) => `${count} shades`,
    shadeHaveAnotherCard: "+ Have a shade from another shade card?",

    estimateYourEstimate: "YOUR ESTIMATE",
    estimateRangeLabel: "est. range",
    estimatePrimerLabel: "Primer (1 coat)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} coat${coats > 1 ? "s" : ""})`,
    estimatePaintPrimerSubtotal: "Paint + primer subtotal",
    estimateGstOn: "GST (18%) on paint + primer",
    estimateWallPutty: "Wall putty (incl. GST)",
    estimateBagsKgLabel: (bags, kg) => `${bags} bag${bags > 1 ? "s" : ""} / ${kg} kg`,
    estimateDelivery: "Delivery",
    estimateConfirmedOnWhatsApp: "Confirmed on WhatsApp",
    estimateEstimatedTotal: "Estimated total",
    estimateDiscountNote:
      "First order: 5% off. Second order: 10% off. Discount confirmed on final WhatsApp quote.",

    locationNamePlaceholder: "Your name",
    locationPhonePlaceholder: "Contact number",
    locationNameError: "Enter your full name",
    locationPhoneError: "Enter a valid contact number",
    locationLocalityPlaceholder: "Enter area/locality in Ludhiana...",
    locationOutsideLudhiana: "Outside Ludhiana? Delivery charge confirmed on WhatsApp.",
    locationGetQuoteButton: "Get quote on WhatsApp",
    locationSending: "Sending...",
    locationRoughEstimate: "Rough estimate only. Final quote confirmed on WhatsApp.",
    locationThanksName: (name) => `Thanks, ${name}!`,
    locationWillReachOut: (phone) =>
      `Our team will reach out on ${phone} shortly to confirm your quote and shade.`,

    catalogHeading: "More from Jiwan Paints",
    catalogSubheading:
      "Featuring trusted products from Jiwan Paints — manufactured in Ludhiana since 1966.",
    catalogAddToQuote: "Add to quote",
    catalogAskOnWhatsApp: "Ask on WhatsApp",

    storyHeading: "The Jiwan Group Story",
    storyDescription:
      "Paint Mate is a Jiwan Group venture, backed by decades of experience in paints, coatings and industrial chemicals. Jiwan Paints brings manufacturing knowledge, shade matching capability and reliable supply support to the platform.",
    storyBadge1: "Backed by Jiwan Group",
    storyBadge2: "Trusted paint manufacturing experience",
    storyBadge3: "Shade matching support",
    storyBadge4: "Local Ludhiana delivery",
    storyBadge5: "GST billing & verified supply",

    footerText:
      "Paint Mate · A Jiwan Group Venture · Shades are for reference; slight variation from the final product is normal.",

    stickyEstimatedTotal: "ESTIMATED TOTAL",
    stickyGetQuote: "Get quote on WhatsApp",
    stickyViewBreakdown: "View estimate breakdown",
    stickyHideBreakdown: "Hide estimate breakdown",
  },
  hi: {
    headerGetQuote: "कोटेशन लें",
    headerAboutJiwan: "जीवन के बारे में",
    headerTagline: "जीवन ग्रुप का उद्यम",

    heroTitle: "आपकी वन-स्टॉप पेंट शॉप",
    heroSubtitle: "पेंट, प्राइमर, पुट्टी, औज़ार और पेंटर — सब एक ही जगह।",
    heroDescriptionPrefix: "पेंट मेट आपकी मदद करता है ",
    heroDescriptionBold: "योजना बनाने, कीमत जानने और ऑर्डर करने में",
    heroDescriptionMiddle:
      " — पेंट जॉब के लिए ज़रूरी पेंट, प्राइमर, पुट्टी, औज़ार और पेंटर सहायता, सब कुछ। ",
    heroDescriptionBrand: "जीवन पेंट्स",
    heroDescriptionSuffix: " के भरोसेमंद उत्पादों के साथ।",
    heroBadgeDelivery: "लुधियाना में उसी दिन / 2 दिन में डिलीवरी",
    heroBadgeShadeMatching: "कस्टम शेड मैचिंग आमतौर पर लगभग 2 दिन में तैयार",
    heroBadgeGst: "GST बिलिंग",

    calcHeading: "आपके घर का साइज़ क्या है?",
    calcOrSetArea: "या सही दीवार का क्षेत्रफल सेट करें",
    calcSurface: "सतह",
    calcInterior: "इंटीरियर",
    calcExterior: "एक्सटीरियर",
    calcCoats: "कोट",

    paintChooseYourPaint: "अपना पेंट चुनें",
    paintRecommended: "अनुशंसित",
    paintOtherBrands: "अन्य ब्रांड",
    paintPricesIndicative:
      "अन्य ब्रांड की कीमतें अनुमानित MRP हैं — केवल संकेत के लिए। अंतिम कीमत WhatsApp पर तय होगी।",
    paintWhyThisPick: "यह क्यों चुनें",
    paintPainterNote: "पेंटर की मज़दूरी — काम के अनुसार कोटेशन WhatsApp पर तय होगा।",
    tierValue: "वैल्यू",
    tierPremium: "प्रीमियम",

    shadeHeading: "शेड चुनें",
    shadeGreens: "हरे",
    shadeBrowns: "भूरे",
    shadeGreys: "स्लेटी",
    shadeCustomMatching: "कस्टम शेड मैचिंग आमतौर पर लगभग 2 दिन में तैयार हो जाती है।",
    shadeCountLabel: (count) => `${count} शेड्स`,
    shadeHaveAnotherCard: "+ किसी और शेड कार्ड से शेड चाहिए?",

    estimateYourEstimate: "आपका अनुमान",
    estimateRangeLabel: "अनुमानित सीमा",
    estimatePrimerLabel: "प्राइमर (1 कोट)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} कोट)`,
    estimatePaintPrimerSubtotal: "पेंट + प्राइमर उप-योग",
    estimateGstOn: "पेंट + प्राइमर पर GST (18%)",
    estimateWallPutty: "वॉल पुट्टी (GST सहित)",
    estimateBagsKgLabel: (bags, kg) => `${bags} बैग / ${kg} किलो`,
    estimateDelivery: "डिलीवरी",
    estimateConfirmedOnWhatsApp: "WhatsApp पर तय होगा",
    estimateEstimatedTotal: "अनुमानित कुल राशि",
    estimateDiscountNote:
      "पहला ऑर्डर: 5% छूट। दूसरा ऑर्डर: 10% छूट। छूट की पुष्टि अंतिम WhatsApp कोटेशन पर होगी।",

    locationNamePlaceholder: "आपका नाम",
    locationPhonePlaceholder: "संपर्क नंबर",
    locationNameError: "अपना पूरा नाम दर्ज करें",
    locationPhoneError: "सही संपर्क नंबर दर्ज करें",
    locationLocalityPlaceholder: "लुधियाना में इलाका/लोकैलिटी दर्ज करें...",
    locationOutsideLudhiana: "लुधियाना के बाहर? डिलीवरी शुल्क की पुष्टि WhatsApp पर होगी।",
    locationGetQuoteButton: "WhatsApp पर कोटेशन लें",
    locationSending: "भेजा जा रहा है...",
    locationRoughEstimate: "यह केवल अनुमानित है। अंतिम कोटेशन WhatsApp पर तय होगा।",
    locationThanksName: (name) => `धन्यवाद, ${name}!`,
    locationWillReachOut: (phone) =>
      `हमारी टीम जल्द ही ${phone} पर आपसे संपर्क करके आपकी कोटेशन और शेड कन्फर्म करेगी।`,

    catalogHeading: "जीवन पेंट्स से और भी उत्पाद",
    catalogSubheading: "जीवन पेंट्स के भरोसेमंद उत्पाद — 1966 से लुधियाना में निर्मित।",
    catalogAddToQuote: "कोटेशन में जोड़ें",
    catalogAskOnWhatsApp: "WhatsApp पर पूछें",

    storyHeading: "जीवन ग्रुप की कहानी",
    storyDescription:
      "पेंट मेट, जीवन ग्रुप का एक उद्यम है, जो पेंट, कोटिंग्स और औद्योगिक रसायनों में दशकों के अनुभव पर आधारित है। जीवन पेंट्स इस प्लेटफ़ॉर्म को निर्माण ज्ञान, शेड मैचिंग क्षमता और भरोसेमंद आपूर्ति सहायता प्रदान करता है।",
    storyBadge1: "जीवन ग्रुप का समर्थन",
    storyBadge2: "भरोसेमंद पेंट निर्माण अनुभव",
    storyBadge3: "शेड मैचिंग सहायता",
    storyBadge4: "स्थानीय लुधियाना डिलीवरी",
    storyBadge5: "GST बिलिंग और सत्यापित आपूर्ति",

    footerText:
      "पेंट मेट · जीवन ग्रुप का उद्यम · शेड केवल संदर्भ के लिए हैं; अंतिम उत्पाद में मामूली अंतर सामान्य है।",

    stickyEstimatedTotal: "अनुमानित कुल राशि",
    stickyGetQuote: "WhatsApp पर कोटेशन लें",
    stickyViewBreakdown: "अनुमान का विवरण देखें",
    stickyHideBreakdown: "अनुमान का विवरण छुपाएं",
  },
  pa: {
    headerGetQuote: "ਕੋਟੇਸ਼ਨ ਲਓ",
    headerAboutJiwan: "ਜੀਵਨ ਬਾਰੇ",
    headerTagline: "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ",

    heroTitle: "ਤੁਹਾਡੀ ਵਨ-ਸਟਾਪ ਪੇਂਟ ਸ਼ਾਪ",
    heroSubtitle: "ਪੇਂਟ, ਪ੍ਰਾਈਮਰ, ਪੁੱਟੀ, ਔਜ਼ਾਰ ਅਤੇ ਪੇਂਟਰ — ਸਭ ਇੱਕੋ ਥਾਂ।",
    heroDescriptionPrefix: "ਪੇਂਟ ਮੇਟ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ ",
    heroDescriptionBold: "ਯੋਜਨਾ ਬਣਾਉਣ, ਕੀਮਤ ਜਾਣਨ ਅਤੇ ਆਰਡਰ ਕਰਨ ਵਿੱਚ",
    heroDescriptionMiddle:
      " — ਪੇਂਟ ਜੌਬ ਲਈ ਲੋੜੀਂਦਾ ਪੇਂਟ, ਪ੍ਰਾਈਮਰ, ਪੁੱਟੀ, ਔਜ਼ਾਰ ਅਤੇ ਪੇਂਟਰ ਸਹਾਇਤਾ, ਸਭ ਕੁਝ। ",
    heroDescriptionBrand: "ਜੀਵਨ ਪੇਂਟਸ",
    heroDescriptionSuffix: " ਦੇ ਭਰੋਸੇਯੋਗ ਉਤਪਾਦਾਂ ਨਾਲ।",
    heroBadgeDelivery: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਉਸੇ ਦਿਨ / 2 ਦਿਨਾਂ ਵਿੱਚ ਡਿਲੀਵਰੀ",
    heroBadgeShadeMatching: "ਕਸਟਮ ਸ਼ੇਡ ਮੈਚਿੰਗ ਆਮ ਤੌਰ 'ਤੇ ਲਗਭਗ 2 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ",
    heroBadgeGst: "GST ਬਿਲਿੰਗ",

    calcHeading: "ਤੁਹਾਡੇ ਘਰ ਦਾ ਸਾਈਜ਼ ਕੀ ਹੈ?",
    calcOrSetArea: "ਜਾਂ ਸਹੀ ਦੀਵਾਰ ਦਾ ਖੇਤਰਫਲ ਸੈੱਟ ਕਰੋ",
    calcSurface: "ਸਤ੍ਹਾ",
    calcInterior: "ਇੰਟੀਰੀਅਰ",
    calcExterior: "ਐਕਸਟੀਰੀਅਰ",
    calcCoats: "ਕੋਟ",

    paintChooseYourPaint: "ਆਪਣਾ ਪੇਂਟ ਚੁਣੋ",
    paintRecommended: "ਸਿਫ਼ਾਰਸ਼ੀ",
    paintOtherBrands: "ਹੋਰ ਬ੍ਰਾਂਡ",
    paintPricesIndicative:
      "ਹੋਰ ਬ੍ਰਾਂਡਾਂ ਦੀਆਂ ਕੀਮਤਾਂ ਅਨੁਮਾਨਿਤ MRP ਹਨ — ਸਿਰਫ਼ ਸੰਕੇਤ ਲਈ। ਅੰਤਿਮ ਕੀਮਤ WhatsApp 'ਤੇ ਤੈਅ ਹੋਵੇਗੀ।",
    paintWhyThisPick: "ਇਹ ਕਿਉਂ ਚੁਣੋ",
    paintPainterNote: "ਪੇਂਟਰ ਦੀ ਮਜ਼ਦੂਰੀ — ਕੰਮ ਮੁਤਾਬਕ ਕੋਟੇਸ਼ਨ WhatsApp 'ਤੇ ਤੈਅ ਹੋਵੇਗਾ।",
    tierValue: "ਵੈਲਿਊ",
    tierPremium: "ਪ੍ਰੀਮੀਅਮ",

    shadeHeading: "ਸ਼ੇਡ ਚੁਣੋ",
    shadeGreens: "ਹਰੇ",
    shadeBrowns: "ਭੂਰੇ",
    shadeGreys: "ਸਲੇਟੀ",
    shadeCustomMatching: "ਕਸਟਮ ਸ਼ੇਡ ਮੈਚਿੰਗ ਆਮ ਤੌਰ 'ਤੇ ਲਗਭਗ 2 ਦਿਨਾਂ ਵਿੱਚ ਤਿਆਰ ਹੋ ਜਾਂਦੀ ਹੈ।",
    shadeCountLabel: (count) => `${count} ਸ਼ੇਡਸ`,
    shadeHaveAnotherCard: "+ ਕਿਸੇ ਹੋਰ ਸ਼ੇਡ ਕਾਰਡ ਤੋਂ ਸ਼ੇਡ ਚਾਹੀਦਾ ਹੈ?",

    estimateYourEstimate: "ਤੁਹਾਡਾ ਅਨੁਮਾਨ",
    estimateRangeLabel: "ਅਨੁਮਾਨਿਤ ਰੇਂਜ",
    estimatePrimerLabel: "ਪ੍ਰਾਈਮਰ (1 ਕੋਟ)",
    estimatePaintLabel: (name, coats) => `${name} (${coats} ਕੋਟ)`,
    estimatePaintPrimerSubtotal: "ਪੇਂਟ + ਪ੍ਰਾਈਮਰ ਉਪ-ਜੋੜ",
    estimateGstOn: "ਪੇਂਟ + ਪ੍ਰਾਈਮਰ 'ਤੇ GST (18%)",
    estimateWallPutty: "ਵਾਲ ਪੁੱਟੀ (GST ਸਮੇਤ)",
    estimateBagsKgLabel: (bags, kg) => `${bags} ਬੈਗ / ${kg} ਕਿੱਲੋ`,
    estimateDelivery: "ਡਿਲੀਵਰੀ",
    estimateConfirmedOnWhatsApp: "WhatsApp 'ਤੇ ਤੈਅ ਹੋਵੇਗਾ",
    estimateEstimatedTotal: "ਅਨੁਮਾਨਿਤ ਕੁੱਲ ਰਾਸ਼ੀ",
    estimateDiscountNote:
      "ਪਹਿਲਾ ਆਰਡਰ: 5% ਛੋਟ। ਦੂਜਾ ਆਰਡਰ: 10% ਛੋਟ। ਛੋਟ ਦੀ ਪੁਸ਼ਟੀ ਅੰਤਿਮ WhatsApp ਕੋਟੇਸ਼ਨ 'ਤੇ ਹੋਵੇਗੀ।",

    locationNamePlaceholder: "ਤੁਹਾਡਾ ਨਾਮ",
    locationPhonePlaceholder: "ਸੰਪਰਕ ਨੰਬਰ",
    locationNameError: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    locationPhoneError: "ਸਹੀ ਸੰਪਰਕ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    locationLocalityPlaceholder: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਇਲਾਕਾ/ਲੋਕੈਲਿਟੀ ਦਰਜ ਕਰੋ...",
    locationOutsideLudhiana: "ਲੁਧਿਆਣਾ ਤੋਂ ਬਾਹਰ? ਡਿਲੀਵਰੀ ਚਾਰਜ ਦੀ ਪੁਸ਼ਟੀ WhatsApp 'ਤੇ ਹੋਵੇਗੀ।",
    locationGetQuoteButton: "WhatsApp 'ਤੇ ਕੋਟੇਸ਼ਨ ਲਓ",
    locationSending: "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    locationRoughEstimate: "ਇਹ ਸਿਰਫ਼ ਅਨੁਮਾਨਿਤ ਹੈ। ਅੰਤਿਮ ਕੋਟੇਸ਼ਨ WhatsApp 'ਤੇ ਤੈਅ ਹੋਵੇਗਾ।",
    locationThanksName: (name) => `ਧੰਨਵਾਦ, ${name}!`,
    locationWillReachOut: (phone) =>
      `ਸਾਡੀ ਟੀਮ ਜਲਦੀ ਹੀ ${phone} 'ਤੇ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਕੇ ਤੁਹਾਡੀ ਕੋਟੇਸ਼ਨ ਅਤੇ ਸ਼ੇਡ ਕਨਫਰਮ ਕਰੇਗੀ।`,

    catalogHeading: "ਜੀਵਨ ਪੇਂਟਸ ਤੋਂ ਹੋਰ ਵੀ",
    catalogSubheading: "ਜੀਵਨ ਪੇਂਟਸ ਦੇ ਭਰੋਸੇਯੋਗ ਉਤਪਾਦ — 1966 ਤੋਂ ਲੁਧਿਆਣਾ ਵਿੱਚ ਤਿਆਰ।",
    catalogAddToQuote: "ਕੋਟੇਸ਼ਨ ਵਿੱਚ ਜੋੜੋ",
    catalogAskOnWhatsApp: "WhatsApp 'ਤੇ ਪੁੱਛੋ",

    storyHeading: "ਜੀਵਨ ਗਰੁੱਪ ਦੀ ਕਹਾਣੀ",
    storyDescription:
      "ਪੇਂਟ ਮੇਟ, ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਇੱਕ ਉੱਦਮ ਹੈ, ਜੋ ਪੇਂਟ, ਕੋਟਿੰਗਸ ਅਤੇ ਉਦਯੋਗਿਕ ਰਸਾਇਣਾਂ ਵਿੱਚ ਦਹਾਕਿਆਂ ਦੇ ਤਜਰਬੇ 'ਤੇ ਆਧਾਰਿਤ ਹੈ। ਜੀਵਨ ਪੇਂਟਸ ਇਸ ਪਲੇਟਫਾਰਮ ਨੂੰ ਨਿਰਮਾਣ ਗਿਆਨ, ਸ਼ੇਡ ਮੈਚਿੰਗ ਸਮਰੱਥਾ ਅਤੇ ਭਰੋਸੇਯੋਗ ਸਪਲਾਈ ਸਹਾਇਤਾ ਦਿੰਦਾ ਹੈ।",
    storyBadge1: "ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਸਮਰਥਨ",
    storyBadge2: "ਭਰੋਸੇਯੋਗ ਪੇਂਟ ਨਿਰਮਾਣ ਤਜਰਬਾ",
    storyBadge3: "ਸ਼ੇਡ ਮੈਚਿੰਗ ਸਹਾਇਤਾ",
    storyBadge4: "ਸਥਾਨਕ ਲੁਧਿਆਣਾ ਡਿਲੀਵਰੀ",
    storyBadge5: "GST ਬਿਲਿੰਗ ਅਤੇ ਤਸਦੀਕਸ਼ੁਦਾ ਸਪਲਾਈ",

    footerText:
      "ਪੇਂਟ ਮੇਟ · ਜੀਵਨ ਗਰੁੱਪ ਦਾ ਉੱਦਮ · ਸ਼ੇਡ ਸਿਰਫ਼ ਹਵਾਲੇ ਲਈ ਹਨ; ਅੰਤਿਮ ਉਤਪਾਦ ਵਿੱਚ ਮਾਮੂਲੀ ਫ਼ਰਕ ਆਮ ਹੈ।",

    stickyEstimatedTotal: "ਅਨੁਮਾਨਿਤ ਕੁੱਲ ਰਾਸ਼ੀ",
    stickyGetQuote: "WhatsApp 'ਤੇ ਕੋਟੇਸ਼ਨ ਲਓ",
    stickyViewBreakdown: "ਅਨੁਮਾਨ ਦਾ ਵੇਰਵਾ ਦੇਖੋ",
    stickyHideBreakdown: "ਅਨੁਮਾਨ ਦਾ ਵੇਰਵਾ ਲੁਕਾਓ",
  },
};
