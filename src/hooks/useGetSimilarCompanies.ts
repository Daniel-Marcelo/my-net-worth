import * as sanitizeHtml from 'sanitize-html';

export const useGetSimilarCompanies = () => {

    const get = async () => {
        const data = await fetch('/quote/KO');
        // debugger;
        const text = await data.text();
        console.log(text.replace('<!DOCTYPE html>', '').replaceAll('&', '&amp;').split('</head>'))
        const el = document.createElement('body');
        el.innerHTML = text.split('</head>')[1];
        console.log(el)

        const textString = text.split('</head>')[1];
        var doc = new DOMParser().parseFromString(textString.replaceAll(/\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g, '').replaceAll('&&', ''), "text/xml");
        console.log(textString.replaceAll(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g, '').length);
        console.log(textString.length)
        console.log(textString.replaceAll(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g, '').slice(9935 - 95, 9935 + 180))
        // const similarDOM = (el as any).getElementById('similar-by-symbol')
        console.log(doc)
        // console.log(doc.getElementsByClassName('section'))


        // console.log(doc)
        // console.log(similarDOM)
        // debugger;
    }
    return get;
}

