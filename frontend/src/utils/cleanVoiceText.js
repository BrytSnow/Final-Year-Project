export function cleanVoiceText(text){

    if(!text)
        return "";


    return text
        .replace(
            /\bcomma\b/gi,
            ","
        )
        .replace(
            /\bfull stop\b/gi,
            "."
        )
        .replace(
            /\bquestion mark\b/gi,
            "?"
        )
        .replace(
            /\bnew line\b/gi,
            "\n"
        )
        .trim();

}