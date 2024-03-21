
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

export class FindMyIPTranslate implements ITranslate {
    get maxLen(): number {
        return 3000;
    }

    async translate(content: string, { to = 'auto' }: ITranslateOptions) {
        const data = {
            'text': content,
            'target_lang': convertLang(to)
        };
        const url = `https://findmyip.net/api/translate.php?${querystring.stringify(data)}`;

        let res = await axios.get(url);

        if (res.data.code !== 200) {
            throw new Error(res.data.error);
        }
        return res.data.data.translate_result;
    }


    link(content: string, { to = 'auto' }: ITranslateOptions) {
        let str = `https://findmyip.net/api/translate.php?text=${encodeURIComponent(content)}&target_lang=${convertLang(to)}`;
        return `[FindMyIP](${str})`;
    }

    isSupported(src: string) {
        return true;
    }
}