import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from '@reactivex/rxjs';
import 'rxjs/add/operator/map';
import * as d3 from 'd3';


export interface IWordsSource {
  key: string;
  value: number;
}

const stopWords =
  /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/;

const wordSeparators =
  /[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g;

const punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
const spaceRE = /\s+/g;

@Injectable()
export class WordClodService {

  private textInput: string;
  private maxLength: number = 30;

  constructor() {
  }

  parseText(input: string): Array<IWordsSource> {

    let tags: Array<IWordsSource> = [];
    input.replace(punctRE, '').split(wordSeparators)
      .filter((t) => {
        return !stopWords.test(t.toLowerCase());
      })
      .map(t => {
        t = t.substr(0, this.maxLength).toLowerCase();
        tags[t] = (tags[t] || 0) + 1;
      });

    tags = d3.entries(tags).sort((a, b) => {
      return b.value - a.value;
    });
    return tags;
  }
}
