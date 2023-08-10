import { remark } from "remark"
import html from 'remark-html'

export const markdownToHTML = async (markdown) => {
    const result = await remark().use(html).process(markdown);
    const re = /<img src="/gi;
    const plotWithImages = result.value.replace(re, `<img src="${process.env.PUBLIC_STRAPI_URL_WITHOUT_API}`)
    return plotWithImages;
}