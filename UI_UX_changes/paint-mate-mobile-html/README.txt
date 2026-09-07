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

Best viewed in a narrow window — this is the mobile
design (360px wide). In Chrome you can press F12, then
click the phone icon, and pick "iPhone 12 Pro".


THE TWO PAGES
--------------------------------------------------
Both Figma frames live in this one file.

  1. HOME           index.html          (or index.html#home)
  2. PAINT SHOP     index.html#shop     (the pricing page)

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

Two carousels ran off the edge of the Figma artboard,
so a few items were never drawn:
  - Home, room tabs: Living Room / Bed Room / Kids Room
    are from the file. Kitchen and Exterior are filler.
  - Paint Shop, shade filters: ALL / Whites / Yellows /
    Oranges are from the file. Reds, Greens and Blues
    are filler.
Replace those with the real lists when you have them.

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
