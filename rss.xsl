<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"
              doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="fr">
      <head>
        <title>Flux RSS — <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="robots" content="noindex,follow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; color: #1f2937; margin: 0; padding: 32px 16px; background: #ffffff; }
main { max-width: 1024px; margin: 0 auto; }
h1 { font-size: 22px; margin: 0 0 8px; font-weight: 600; }
.meta { color: #6b7280; font-size: 13px; margin: 0 0 24px; }
.count { color: #6b7280; font-size: 13px; margin: 0 0 16px; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; padding: 10px 12px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937; }
td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
tr:nth-child(even) td { background: #fafafa; }
tr:hover td { background: #f3f4f6; }
a { color: #2563eb; text-decoration: none; }
a:hover { text-decoration: underline; }
.title { width: 40%; }
.pubdate { white-space: nowrap; color: #4b5563; width: 200px; }
.description { color: #4b5563; }
</style>
      </head>
      <body>
        <main>
          <h1>Flux RSS — <xsl:value-of select="/rss/channel/title"/></h1>
          <p class="meta">Ce flux RSS est destiné aux lecteurs RSS. Abonnez-vous en copiant l'URL de cette page dans votre lecteur.</p>
          <p class="count">Ce flux contient <xsl:value-of select="count(/rss/channel/item)"/> articles.</p>
          <table>
            <thead>
              <tr>
                <th class="title">Titre</th>
                <th class="pubdate">Publié</th>
                <th class="description">Description</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="/rss/channel/item">
                <tr>
                  <td class="title"><a href="{link}"><xsl:value-of select="title"/></a></td>
                  <td class="pubdate"><xsl:value-of select="pubDate"/></td>
                  <td class="description"><xsl:value-of select="description"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>