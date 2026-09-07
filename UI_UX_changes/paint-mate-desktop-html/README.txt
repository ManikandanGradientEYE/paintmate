PAINT MATE — MOBILE WEBSITE (HTML)
A Jiwan Group Venture
==================================================

HOW TO OPEN
--------------------------------------------------
Double-click index.html. It opens in any browser.

No internet needed. No server needed. No install needed.
Fonts, images and code are all inside this folder.

If you need to EMAIL or FORWARD just one file, send
paint-mate-standalone.html instead. That single file
has every image and font baked inside it, so it works
on its own with nothing else next to it.

The page is responsive and covers BOTH Figma frames:

  - Window 1024px or wider  ->  desktop layout
  - Window under 1024px     ->  mobile layout

To see the mobile version on a laptop, either drag the
window narrow, or press F12 in Chrome, click the phone
icon, and pick "iPhone 12 Pro".


THE TWO PAGES
--------------------------------------------------
Both Figma frames live in this one file.

  1. HOME           index.html          (or index.html#home)
  2. PAINT SHOP     index.html#shop     (the pricing page)

Each page has a mobile and a desktop layout, matching
the two Figma files. Four screens in total, one file.

To reach the Paint Shop / pricing page, either:
  - click any green "GET A QUOTE" button, or
  - add #shop to the end of the address bar

The Paint Shop page has the estimate breakdown
(Rs 9,152, GST, putty, total) and the sticky
"Get Quote on Whatsapp" bar at the bottom.


WHAT IS IN THIS FOLDER
--------------------------------------------------
  index.html    The site. Both pages. Use this one if
                you are going to edit anything.

  paint-mate-standalone.html
                The same site, but with every image and
                font embedded in the one file (1.8 MB).
                Nothing else needs to travel with it.
                Good for emailing or WhatsApping.

  assets/       Photos and paint textures, exported
                straight out of the Figma file.

  fonts/        Anton + Figtree web fonts. Both HTML
                files already have these embedded, so
                these copies are here only for a
                developer who wants to serve them
                properly from a real web server.


NOTES FOR WHOEVER PICKS THIS UP
--------------------------------------------------
Colours, spacing and images are taken from the Figma
file directly, not rebuilt by eye.

  Cream       #FFFBF1     Pale lime   #E9EAC0
  Dark green  #28462E     Mint        #E1ECE8
  Lime        #B3C341     Sand        #F0E4D0

Headings use Anton. Body text uses Figtree. These are
close substitutes — the original Figma text was
flattened to outlines, so the real font names were not
recoverable from the file. Swap them in fonts/ and in
the @font-face block at the top of index.html if you
have the brand originals.

The desktop file resolved the carousels that ran off
the edge of the mobile artboard, so the lists below are
now the real ones from the design, not guesses:
  - Room tabs:     Living Room / Kitchen / Kids Room /
                   Bed Room
  - Shade filters: ALL / Whites / Yellows / Oranges /
                   Pinks / Purples

Where the desktop frame left a section empty, it was
filled from the matching mobile section:
  - Home: the grey placeholder block under the hero is
    the before/after slider.
  - Paint Shop: the ADD ONS card (Wall Puffy, Primer,
    Add Painter) was only drawn on mobile.

Small differences that are in the Figma itself, kept
as drawn: desktop says "WHY US", mobile says "WHY US!";
desktop shows four colour swatches, mobile five; the
desktop Paint Shop header has a GET A QUOTE button and
the mobile one does not; the mobile Paint Shop has a
sticky bottom estimate bar and the desktop puts the
estimate in a sticky right-hand column instead.

The phone browser chrome in the Figma (URL bar, clock,
battery) is mockup dressing, not part of the website,
so it is not in the HTML.


LICENCE
--------------------------------------------------
Anton and Figtree are licensed under the SIL Open Font
License 1.1, which allows bundling and redistribution.
  https://openfontlicense.org

Photography and brand marks belong to Paint Mate /
Jiwan Group.
