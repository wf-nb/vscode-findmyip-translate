
import axios from 'axios';
const querystring = require('querystring');

import { workspace } from 'vscode';
import { ITranslate, ITranslateOptions } from 'comment-translate-manager';

const PREFIXCONFIG = 'FindMyIPTranslate';

const langMaps: Map<string, string> = new Map([
    ['zh-CN', 'ZH'],
    ['zh-TW', 'ZH'],
]);

function convertLang(src: string) {
    if (langMaps.has(src)) {
        return langMaps.get(src);
    }
    return src.toLocaleUpperCase();
}

interface Response {
    translations: {
        'detected_source_language': string;
        text: string;
    }[];
}

export class FindMyIPTranslate implements ITranslate {
    get maxLen(): number {
        return 3000;
    }

    async translate(content: string, { to = 'auto' }: ITranslateOptions) {
        const url = `https://findmyip.net/api/translate.php`;
        const data = {
            'text': content,
            'target_lang': convertLang(to)
        };

        let res = await axios.post<Response>(url,querystring.stringify(data));

        return res.data.translations[0].text;
    }


    link(content: string, { to = 'auto' }: ITranslateOptions) {
        let str = `https://findmyip.net/api/translate.php?text=${encodeURIComponent(content)}&target_lang=${convertLang(to)}`;
        return `[FindMyIP](${str})`;
    }

    isSupported(src: string) {
        return true;
    }
}





