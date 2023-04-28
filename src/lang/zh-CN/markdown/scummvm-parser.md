# ScummVM Parser

This parser imports games from `ScummVM` so that artwork can be chosen for them and they can be added into Steam. If it doesn't work it is because the structure of scummvm.ini has been alterated or the file cannot be opened.

## Recommendation
You might wish to chop off the final parentheses that are part of the `ScummVM` title to use for image lookup, Steam game name etc. Consider applying this regular expression to the name `${/( \(.*?\)$)/|${/:/|${fuzzytitle}|}|}`.

## Compatibility

This parser is currently functional on `Windows` and `Linux` systems only.
