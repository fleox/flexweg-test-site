<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"
              doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap</title>
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
.url { word-break: break-all; }
.lastmod, .pubdate { white-space: nowrap; color: #4b5563; width: 220px; }
</style>
      </head>
      <body>
        <main>
          <h1>XML Sitemap</h1>
          <p class="meta">This XML sitemap is meant for consumption by search engines.</p>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">
              <p class="count">This index references <xsl:value-of select="count(s:sitemapindex/s:sitemap)"/> sitemaps.</p>
              <table>
                <thead><tr><th>Sitemap URL</th><th>Last modified</th></tr></thead>
                <tbody>
                  <xsl:for-each select="s:sitemapindex/s:sitemap">
                    <tr>
                      <td class="url"><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="lastmod"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
            <xsl:when test="s:urlset">
              <p class="count">This sitemap contains <xsl:value-of select="count(s:urlset/s:url)"/> URLs.</p>
              <table>
                <thead><tr><th>URL</th><th>Last modified</th></tr></thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td class="url"><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="lastmod"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>