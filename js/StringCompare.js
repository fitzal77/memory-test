class StringCompare {
    //basic similarity -- percentage of correct words. not as useful for single, short words.
    static similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - StringCompare.#editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    //used by similarity function
    static #editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

    //SoundEx -- comparison of how similar two words sound
    static soundAlike(name1,name2) {
        return (this.soundex(name1) == this.soundex(name2));
    }
    static soundex(name)
    {
        let s = [];
        let si = 1;
        let c;

        //              ABCDEFGHIJKLMNOPQRSTUVWXYZ
        let mappings = "01230120022455012623010202";

        s[0] = name[0].toUpperCase();

        for(let i = 1, l = name.length; i < l; i++)
        {
            c = (name[i].toUpperCase()).charCodeAt(0) - 65;

            if(c >= 0 && c <= 25)
            {
                if(mappings[c] != '0')
                {
                    if(mappings[c] != s[si-1])
                    {
                        s[si] = mappings[c];
                        si++;
                    }

                    if(si > 3)
                    {
                        break;
                    }
                }
            }
        }

        if(si <= 3)
        {
            while(si <= 3)
            {
                s[si] = '0';
                si++;
            }
        }

//console.log("Soundex: "+name+"=>"+s.join(""));

        return s.join("");
    }
}